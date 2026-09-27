import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CommandPalette from '../../presentation/components/CommandPalette';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  );
};

/**
 * The palette debounces its query, so the tests drive the clock rather than
 * waiting on wall time. That keeps them deterministic under parallel load.
 */
const searchWithDebounce = (value: string) => {
  const input = screen.getByPlaceholderText(/search/i);
  fireEvent.change(input, { target: { value } });
  act(() => {
    vi.advanceTimersByTime(200);
  });
  return input;
};
describe('CommandPalette Component', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('başlangıçta kapalı olmalı', () => {
    renderWithRouter(<CommandPalette />);
    // Command palette varsayılan olarak kapalı
    expect(screen.queryByPlaceholderText(/search/i)).not.toBeInTheDocument();
  });

  it('Ctrl+K ile açılmalı', () => {
    renderWithRouter(<CommandPalette />);
    // Keyboard event simülasyonu
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    // Açık durumda input görünmeli
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('Escape ile kapanmalı', () => {
    renderWithRouter(<CommandPalette />);
    // Aç
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    // Kapat
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByPlaceholderText(/search/i)).not.toBeInTheDocument();
  });

  it('arama sonuçları filtrelenmeli', () => {
    renderWithRouter(<CommandPalette />);
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    searchWithDebounce('clean');
    expect(screen.getAllByText(/clean architecture/i).length).toBeGreaterThan(0);
  });

  it('sonuç bulunamadığında mesaj göstermeli', () => {
    renderWithRouter(<CommandPalette />);
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    searchWithDebounce('xyznonexistent123');
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it('klavye navigasyonu çalışmalı', () => {
    renderWithRouter(<CommandPalette />);
    // Aç
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    const input = screen.getByPlaceholderText(/search/i);
    // Aşağı ok
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    // Yukarı ok
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    // Hata olmamalı
    expect(input).toBeInTheDocument();
  });
});