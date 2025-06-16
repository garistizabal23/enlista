import Feather from '@expo/vector-icons/Feather';
import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Item } from '@/features/items/interfaces/item.interfaces';
import { useItemStore } from '@/features/items/stores/item.store';
import { Checkbox } from '@/features/shared/components/Checkbox';
import { PressableButton } from '@/features/shared/components/PressableButton';
import { formatCurrency } from '@/features/shared/utils/formatCurrency';

interface Props {
  item: Item;
}

export const ItemCard: React.FC<Props> = ({ item }) => {
  const removeItem = useItemStore((state) => state.removeItem);
  const toggleIsPurchased = useItemStore((state) => state.toggleIsPurchased);

  const handleDelete = async (e: GestureResponderEvent) => {
    e.stopPropagation();
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    removeItem(item.id);
  };

  const handleToggleIsPurchased = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleIsPurchased(item.id);
  };

  return (
    <Pressable
      onLongPress={handleToggleIsPurchased}
      style={[styles.card, item.isPurchased ? styles.purchased : styles.pending]}
    >
      <Checkbox isChecked={item.isPurchased} onPress={handleToggleIsPurchased} />

      <View style={{ gap: 2 }}>
        <Text style={[{ fontWeight: '600' }, item.isPurchased && styles.purchasedTitle]}>
          {item.name}
        </Text>
        <Text style={{ fontSize: 14, color: '#6a7282' }}>
          Cantidad: {item.quantity} • Precio {formatCurrency(item.price)}
        </Text>
        <Text style={{ fontSize: 14, color: '#00a63e', fontWeight: '500' }}>
          Subtotal: {formatCurrency(item.price * item.quantity)}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 5 }}>
        <Link href={`/${item.listId}/items/${item.id}/edit`} asChild>
          <PressableButton size="icon" variant="ghost">
            <Feather name="edit-3" size={18} color="#155dfc" variant="ghost" />
          </PressableButton>
        </Link>
        <PressableButton size="icon" variant="ghost">
          <Feather name="trash-2" size={18} color="#fb2c36" onPress={handleDelete} />
        </PressableButton>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  pending: {
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
  },

  purchased: {
    borderColor: '#b9f8cf',
    backgroundColor: '#f0fdf4',
  },

  purchasedTitle: {
    color: '#6a7282',
    textDecorationLine: 'line-through',
  },
});
