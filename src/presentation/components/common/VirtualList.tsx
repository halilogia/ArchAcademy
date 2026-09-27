import React, { ReactNode, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

export interface VirtualListProps<T> {
  items: T[];
  height: number;
  columns?: number;
  estimatedRowHeight?: number;
  overscanRows?: number;
  gap?: number;
  className?: string;
  style?: React.CSSProperties;
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => ReactNode;
  emptyState?: ReactNode;
  'data-testid'?: string;
}

const prefixSums = (heights: number[], count: number): number[] => {
  const sums = new Array<number>(count + 1);
  sums[0] = 0;
  for (let index = 0; index < count; index += 1) {
    sums[index + 1] = sums[index] + (heights[index] ?? 0);
  }
  return sums;
};

const findRowAt = (offsets: number[], position: number): number => {
  let low = 0;
  let high = offsets.length - 2;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    if (offsets[middle + 1] <= position) low = middle + 1;
    else high = middle;
  }
  return Math.max(0, low);
};

/**
 * Row-windowed list. Only the rows intersecting the viewport are mounted, so the DOM
 * stays flat no matter how many items a filter produced. Row heights are measured,
 * so variable-height content is handled, and multi-column layouts are supported by
 * chunking items into rows before windowing.
 */
export function VirtualList<T>({
  items,
  height,
  columns = 1,
  estimatedRowHeight = 320,
  overscanRows = 2,
  gap = 32,
  className,
  style,
  getKey,
  renderItem,
  emptyState,
  ...rest
}: VirtualListProps<T>): React.ReactElement {
  const rowRefs = useRef(new Map<number, HTMLElement>());
  const [scrollTop, setScrollTop] = useState(0);
  const [measured, setMeasured] = useState<Record<number, number>>({});

  const safeColumns = Math.max(1, Math.floor(columns));
  const rowCount = Math.ceil(items.length / safeColumns);

  const rowHeights = useMemo(() => {
    const heights: number[] = [];
    for (let row = 0; row < rowCount; row += 1) {
      heights[row] = measured[row] ?? estimatedRowHeight;
    }
    return heights;
  }, [estimatedRowHeight, measured, rowCount]);

  const offsets = useMemo(() => prefixSums(rowHeights, rowCount), [rowCount, rowHeights]);
  const total = (offsets[rowCount] ?? 0) + (rowCount > 0 ? gap : 0);

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  const captureMeasurements = useCallback(() => {
    const pending: Record<number, number> = {};
    rowRefs.current.forEach((node, row) => {
      const measuredHeight = node.getBoundingClientRect().height;
      if (measuredHeight > 0 && Math.abs(measuredHeight - (measured[row] ?? 0)) > 1) {
        pending[row] = measuredHeight;
      }
    });
    if (Object.keys(pending).length === 0) return;

    // Applied outside the layout phase so a scroll never triggers a synchronous
    // re-measure cascade.
    const frame = requestAnimationFrame(() => {
      setMeasured((previous) => {
        const next = { ...previous, ...pending };
        return JSON.stringify(next) === JSON.stringify(previous) ? previous : next;
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [measured]);

  useLayoutEffect(() => captureMeasurements(), [captureMeasurements, scrollTop, total]);

  if (items.length === 0) {
    return (
      <div className={className} style={{ height, overflowY: 'auto', ...style }} {...rest}>
        {emptyState}
      </div>
    );
  }

  const firstVisible = findRowAt(offsets, scrollTop);
  let lastVisible = firstVisible;
  while (lastVisible < rowCount - 1 && offsets[lastVisible + 1] < scrollTop + height) {
    lastVisible += 1;
  }

  const start = Math.max(0, firstVisible - overscanRows);
  const end = Math.min(rowCount - 1, lastVisible + overscanRows);
  const visibleRows = Array.from({ length: end - start + 1 }, (_, offset) => start + offset);

  const rows = visibleRows.map((row) => {
    const cells: React.ReactNode[] = [];
    for (let column = 0; column < safeColumns; column += 1) {
      const index = row * safeColumns + column;
      if (index >= items.length) break;
      const item = items[index];
      cells.push(
        <React.Fragment key={getKey(item, index)}>{renderItem(item, index)}</React.Fragment>
      );
    }

    return (
      <div
        key={`row-${row}`}
        data-virtual-row={row}
        ref={(node) => {
          if (node) rowRefs.current.set(row, node);
          else rowRefs.current.delete(row);
        }}
        style={{
          position: 'absolute',
          top: offsets[row],
          left: 0,
          right: 0,
          display: 'grid',
          gridTemplateColumns: `repeat(${safeColumns}, minmax(0, 1fr))`,
          gap
        }}
      >
        {cells}
      </div>
    );
  });

  return (
    <div
      onScroll={handleScroll}
      className={className}
      data-testid="virtual-list"
      data-columns={safeColumns}
      data-rendered-rows={rows.length}
      data-rendered-count={rows.length * safeColumns}
      data-total-count={items.length}
      style={{ height, overflowY: 'auto', position: 'relative', ...style }}
      {...rest}
    >
      <div style={{ height: total, position: 'relative' }}>{rows}</div>
    </div>
  );
}

export default VirtualList;
