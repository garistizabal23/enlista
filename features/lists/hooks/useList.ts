import { useEffect, useState } from 'react';

import type { Item } from '@/features/items/interfaces/item.interfaces';
import { useItemStore } from '@/features/items/stores/item.store';
import type { List } from '@/features/lists/interfaces/list.interfaces';
import { useListStore } from '@/features/lists/stores/list.store';

export const useList = (listId: string) => {
  const [list, setList] = useState<List>();
  const [listItems, setListItems] = useState<Item[]>([]);
  const [listTotal, setListTotal] = useState(0);
  const [listItemsCount, setListItemsCount] = useState(0);
  const [listPurchasedItemsCount, setListPurchasedItemsCount] = useState(0);

  const getListById = useListStore((state) => state.getListById);
  const items = useItemStore((state) => state.items);

  useEffect(() => {
    const listById = getListById(listId.toString());
    if (listById) setList(listById);
  }, [getListById, listId]);

  useEffect(() => {
    const itemsByListId = items.filter((item) => item.listId === listId.toString());
    setListItems(itemsByListId);
  }, [items, listId]);

  useEffect(() => {
    setListTotal(listItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
    setListItemsCount(listItems.length);
    setListPurchasedItemsCount(listItems.filter((item) => item.isPurchased).length);
  }, [listItems]);

  return {
    list,
    listItems,
    listTotal,
    listItemsCount,
    listPurchasedItemsCount,
  };
};
