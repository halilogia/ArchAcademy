import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { VirtualList } from '../../presentation/components/common/VirtualList';

afterEach(cleanup);

const items = (count: number) => Array.from({ length: count }, (_, index) => ({ id: `row-${index}`, label: `Row ${index}` }));

const harness = (count: number, columns = 1) =>
  render(
    <VirtualList
      items={items(count)}
      height={600}
      columns={columns}
      estimatedRowHeight={100}
      getKey={(item) => item.id}
      renderItem={(item) => <div style={{ height: 100 }}>{item.label}</div>}
    />
  );

const list = () => screen.getByTestId('virtual-list');
const renderedCount = () => Number(list().getAttribute('data-rendered-count'));
const totalCount = () => Number(list().getAttribute('data-total-count'));

const scrollTo = (top: number) => {
  const node = list();
  Object.defineProperty(node, 'scrollTop', { value: top, writable: true, configurable: true });
  fireEvent.scroll(node, { target: { scrollTop: top } });
};

describe('VirtualList', () => {
  it('mounts only a window of a large list', () => {
    harness(2000);
    expect(totalCount()).toBe(2000);
    expect(renderedCount()).toBeLessThan(20);
  });

  it('mounts a different window after scrolling', () => {
    harness(2000);
    const first = screen.getByText('Row 0');
    act(() => scrollTo(50_000));
    expect(first).not.toBeInTheDocument();
    expect(screen.getByText('Row 500')).toBeInTheDocument();
  });

  it('chunks items into rows for multi column layouts', () => {
    render(
      <VirtualList
        items={items(100)}
        height={600}
        columns={3}
        estimatedRowHeight={100}
        getKey={(item) => item.id}
        renderItem={(item) => <div style={{ height: 100 }}>{item.label}</div>}
      />
    );
    expect(list().getAttribute('data-columns')).toBe('3');
    expect(totalCount()).toBe(100);
    expect(renderedCount()).toBeLessThan(100);
  });

  it('keeps the scroll container height and reserves the full scroll height', () => {
    harness(500);
    const spacer = list().firstElementChild as HTMLElement;
    expect(Number(spacer.style.height.replace('px', ''))).toBeGreaterThan(40_000);
  });

  it('renders the empty state when there is nothing to show', () => {
    render(
      <VirtualList
        items={[]}
        height={300}
        getKey={(item: { id: string }) => item.id}
        renderItem={(item) => <div>{item.id}</div>}
        emptyState={<span>Nothing here</span>}
      />
    );
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('tolerates a column count below one', () => {
    render(
      <VirtualList
        items={items(10)}
        height={300}
        columns={0}
        getKey={(item) => item.id}
        renderItem={(item) => <div>{item.label}</div>}
      />
    );
    expect(list().getAttribute('data-columns')).toBe('1');
  });
});
