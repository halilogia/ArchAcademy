import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

describe('CommandPalette Component', () => {
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

  it('Escape ile kapanmalı', async () => {
    renderWithRouter(<CommandPalette />);
    // Aç
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    // Kapat
    fireEvent.keyDown(window, { key: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByPlaceholderText(/search/i)).not.toBeInTheDocument();
    });
  });

  it('arama sonuçları filtrelenmeli', () => {
    renderWithRouter(<CommandPalette />);
    // Aç
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    // Arama yap
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'clean' } });
    // Sonuçlar görünmeli
    expect(screen.getAllByText(/clean architecture/i).length).toBeGreaterThan(0);
  });

  it('sonuç bulunamadığında mesaj göstermeli', () => {
    renderWithRouter(<CommandPalette />);
    // Aç
    fireEvent.keyDown(document, { key: 'k', ctrlKey: true });
    // Olmayan bir şey ara
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'xyznonexistent123' } });
    // Sonuç bulunamadı mesajı
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it('klavye navigasyonu çalışmalı', () => {
    renderWithRouter(<CommandPalette />);
    // Aç
    fireEvent.keyDown(document, { key: 'k', ctrlKey: true });
    const input = screen.getByPlaceholderText(/search/i);
    // Aşağı ok
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    // Yukarı ok
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    // Hata olmamalı
    expect(input).toBeInTheDocument();
  });
});