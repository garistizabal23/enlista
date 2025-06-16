import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateCreator, create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { List } from '@/features/lists/interfaces/list.interfaces';
import { generateId } from '@/features/shared/utils/generateId';

export interface ListSlice {
  lists: List[];

  getLists: () => Promise<void>;
  saveLists: () => Promise<void>;
  addList: (name: string) => void;
  getListById: (id: string) => List | undefined;
  updateList: (id: string, name: string) => void;
  removeList: (id: string) => void;
}

export const createListSlice: StateCreator<ListSlice, [['zustand/immer', never]]> = (set, get) => ({
  lists: [],

  getLists: async () => {
    try {
      const lists = await AsyncStorage.getItem('lists');
      set({ lists: JSON.parse(lists || '[]') });
    } catch (error) {
      console.error('No se pudo recuperar las listas', error);
    }
  },

  saveLists: async () => {
    try {
      await AsyncStorage.setItem('lists', JSON.stringify(get().lists));
    } catch (error) {
      console.error('No se pudo guardar las listas', error);
    }
  },

  addList: (name: string) => {
    set((state) => {
      state.lists.unshift({ id: generateId(), name });
    });

    get().saveLists();
  },

  getListById: (id: string) => {
    return get().lists.find((list) => list.id === id);
  },

  updateList: (id: string, name: string) => {
    set((state) => {
      const list = state.lists.find((list) => list.id === id);

      if (list) {
        list.name = name;
      }
    });

    get().saveLists();
  },

  removeList: (id: string) => {
    set((state) => {
      state.lists = state.lists.filter((list) => list.id !== id);
    });

    get().saveLists();
  },
});

export const useListStore = create<ListSlice>()(immer(createListSlice));
