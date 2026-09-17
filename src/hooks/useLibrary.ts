import { useCallback, useState } from 'react';
import { getLibrary, newId, saveLibrary } from '../storage';
import type { FoodItem } from '../types';

export function useLibrary() {
  const [library, setLibrary] = useState<FoodItem[]>(getLibrary);

  const persist = useCallback((items: FoodItem[]) => {
    setLibrary(items);
    saveLibrary(items);
  }, []);

  const addFoodItem = useCallback(
    (item: Omit<FoodItem, 'id'>) => {
      const newItem: FoodItem = { ...item, id: newId() };
      persist([...library, newItem].sort((a, b) => a.name.localeCompare(b.name)));
      return newItem;
    },
    [library, persist],
  );

  const updateFoodItem = useCallback(
    (id: string, patch: Partial<Omit<FoodItem, 'id'>>) => {
      persist(library.map((item) => (item.id === id ? { ...item, ...patch } : item)));
    },
    [library, persist],
  );

  const deleteFoodItem = useCallback(
    (id: string) => {
      persist(library.filter((item) => item.id !== id));
    },
    [library, persist],
  );

  return { library, addFoodItem, updateFoodItem, deleteFoodItem };
}
