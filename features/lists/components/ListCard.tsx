import { PressableButton } from '@/shared/components/PressableButton';
import Feather from '@expo/vector-icons/Feather';
import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native';


import { useItemStore } from '@/features/items/stores/item.store';
import { useList } from '@/features/lists/hooks/useList';
import type { List } from '@/features/lists/interfaces/list.interfaces';
import { useListStore } from '@/features/lists/stores/list.store';
import { formatCurrency } from '@/shared/utils/formatCurrency';

interface Props {
  list: List;
}

export const ListCard: React.FC<Props> = ({ list }) => {
  const removeList = useListStore((state) => state.removeList);

  const removeItemsByListId = useItemStore((state) => state.removeItemsByListId);

  const { listItemsCount, listPurchasedItemsCount, listTotal } = useList(list.id);

  const handleDelete = async (e: GestureResponderEvent) => {
    e.stopPropagation();
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    removeItemsByListId(list.id);
    removeList(list.id);
  };

  return (
    <Link href={`/${list.id}/items`} asChild>
      <Pressable style={styles.card}>
        <View style={{ gap: 2 }}>
          <Text style={{ fontWeight: '600' }}>{list.name}</Text>
          <Text style={{ fontSize: 14, color: '#6a7282' }}>
            {listItemsCount} artículos • {listPurchasedItemsCount} comprados
          </Text>
          <Text style={{ fontSize: 14, color: '#00a63e', fontWeight: '500' }}>
            Total: {formatCurrency(listTotal)}
          </Text>
        </View>
        <PressableButton size="icon" variant="ghost">
          <Feather name="trash-2" size={18} color="#fb2c36" onPress={handleDelete} />
        </PressableButton>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});
