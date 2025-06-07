import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateCreator, create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { Item } from '@/features/items/interfaces/item.interfaces';
import { generateId } from '@/shared/utils/generateId';

export interface ItemSlice {
  items: Item[];

  getItems: () => Promise<void>;
  saveItems: () => Promise<void>;
  addItem: (item: Omit<Item, 'id'>) => void;
  getItemById: (id: string) => Item | undefined;
  updateItem: (item: Item) => void;
  removeItem: (id: string) => void;
  removeItemsByListId: (listId: string) => void;
  toggleIsPurchased: (id: string) => void;
}

export const createItemSlice: StateCreator<ItemSlice, [['zustand/immer', never]]> = (set, get) => ({
  items: [],

  getItems: async () => {
    try {
      const items = await AsyncStorage.getItem('items');
      set({ items: JSON.parse(items || '[]') });
    } catch (error) {
      console.error('No se pudo recuperar los items', error);
    }
  },

  saveItems: async () => {
    try {
      await AsyncStorage.setItem('items', JSON.stringify(get().items));
    } catch (error) {
      console.error('No se pudo guardar los items', error);
    }
  },

  addItem: (item: Omit<Item, 'id'>) => {
    set((state) => {
      state.items.unshift({ id: generateId(), ...item });
    });

    get().saveItems();
  },

  getItemById: (id: string) => {
    return get().items.find((item) => item.id === id);
  },

  updateItem: (item: Item) => {
    set((state) => {
      const index = state.items.findIndex((stateItem) => stateItem.id === item.id);

      if (index !== -1) {
        state.items[index] = item;
      }
    });

    get().saveItems();
  },

  removeItem: (id: string) => {
    set((state) => {
      state.items = state.items.filter((item) => item.id !== id);
    });

    get().saveItems();
  },

  removeItemsByListId: (listId: string) => {
    set((state) => {
      state.items = state.items.filter((item) => item.listId !== listId);
    });

    get().saveItems();
  },

  toggleIsPurchased: (id: string) => {
    set((state) => {
      state.items = state.items.map((item) =>
        item.id === id ? { ...item, isPurchased: !item.isPurchased } : item
      );
    });

    get().saveItems();
  },
});

export const useItemStore = create<ItemSlice>()(immer(createItemSlice));
