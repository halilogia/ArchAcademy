import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../../presentation/hooks/useLocalStorage';

// localStorage mock
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('varsayılan değeri doğru döndürmeli', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('localStorage\'dan değeri okumalı', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify('stored-value'));
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('stored-value');
  });

  it('değeri localStorage\'a kaydetmeli', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    
    act(() => {
      result.current[1]('new-value');
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'test-key',
      JSON.stringify('new-value')
    );
    expect(result.current[0]).toBe('new-value');
  });

  it('nesne değerlerini doğru kaydetmeli', () => {
    const { result } = renderHook(() => useLocalStorage('obj-key', { name: 'test' }));
    
    act(() => {
      result.current[1]({ name: 'updated' });
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'obj-key',
      JSON.stringify({ name: 'updated' })
    );
  });

  it('dizi değerlerini doğru kaydetmeli', () => {
    const { result } = renderHook(() => useLocalStorage('arr-key', [1, 2, 3]));
    
    act(() => {
      result.current[1]([4, 5, 6]);
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'arr-key',
      JSON.stringify([4, 5, 6])
    );
  });

  it('null değeri doğru handle etmeli', () => {
    localStorageMock.getItem.mockReturnValue(null);
    const { result } = renderHook(() => useLocalStorage('null-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('geçersiz JSON\'ı doğru handle etmeli', () => {
    localStorageMock.getItem.mockReturnValue('invalid-json');
    const { result } = renderHook(() => useLocalStorage('invalid-key', 'default'));
    // Geçersiz JSON durumunda varsayılan değer dönmeli
    expect(result.current[0]).toBe('default');
  });

  it('setItem hatasını doğru handle etmeli', () => {
    localStorageMock.setItem.mockImplementationOnce(() => {
      throw new Error('Quota exceeded');
    });
    
    const { result } = renderHook(() => useLocalStorage('error-key', 'default'));
    
    // Hata durumunda uygulama çökmemeli
    act(() => {
      result.current[1]('new-value');
    });

    expect(result.current[0]).toBe('new-value');
  });
});