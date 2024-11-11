import { useState, useEffect } from 'react';

const STORAGE_TYPES = {
  LOCAL: 'local',
  SESSION: 'session'
} as const;

type StorageType = typeof STORAGE_TYPES[keyof typeof STORAGE_TYPES];

function useStorage<T>(key: string, defaultValue: T, storageType: StorageType = STORAGE_TYPES.LOCAL) {
  const storage = storageType === STORAGE_TYPES.LOCAL ? localStorage : sessionStorage;

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = storage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (error) {
      console.warn('Error parsing storage key:', key, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      storage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn('Error setting storage key:', key, error);
    }
  }, [key, storedValue, storage]);

  const setValue = (value: T | ((val: T) => T)) => {
    setStoredValue((prevValue: T) =>
      typeof value === 'function' ? (value as (val: T) => T)(prevValue) : value
    );
  };

  const removeValue = () => {
    storage.removeItem(key);
    setStoredValue(defaultValue);
  };

  return { value: storedValue, setValue, removeValue };
}

export default useStorage;
