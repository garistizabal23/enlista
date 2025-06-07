import { useEffect, useState } from 'react';

import type { Item } from '@/features/items/interfaces/item.interfaces';
import { useItemStore } from '@/features/items/stores/item.store';

export const useItem = (itemId: string) => {
  const [item, setItem] = useState<Item>();

  const getItemById = useItemStore((state) => state.getItemById);

  useEffect(() => {
    const itemById = getItemById(itemId.toString());
    if (itemById) setItem(itemById);
  }, [getItemById, itemId]);

  return {
    item
  };
};
