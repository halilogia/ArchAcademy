import { useState, useEffect } from 'react';

// T: Saklanacak verinin tipi (string, number, object array...)
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // 1. Başlangıç Değeri (Lazy Initialization)
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Server-side rendering (SSR) kontrolü (Next.js vs. için hazırlık)
      if (typeof window === 'undefined') {
        return initialValue;
      }

      const item = window.localStorage.getItem(key);
      // Eğer localStorage'da varsa onu parse et, yoksa başlangıç değerini dön
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // 2. Değer Değiştirme Fonksiyonu
  const setValue = (value: T) => {
    try {
      // State'i güncelle
      setStoredValue(value);
      
      // LocalStorage'a yaz
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error saving localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
