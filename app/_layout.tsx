import { useItemStore } from '@/features/items/stores/item.store';
import { useListStore } from '@/features/lists/stores/list.store';
import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const getLists = useListStore((state) => state.getLists);

  const getItems = useItemStore((state) => state.getItems);

  useEffect(() => {
    getLists();
  }, [getLists]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <SafeAreaProvider>
      <Slot />
    </SafeAreaProvider>
  );
}
