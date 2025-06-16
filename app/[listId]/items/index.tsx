import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as Haptics from 'expo-haptics';
import { Link, useLocalSearchParams } from 'expo-router';
import { FlatList, Text, View } from 'react-native';

import { ItemCard } from '@/features/items/components/ItemCard';
import { useItemStore } from '@/features/items/stores/item.store';
import { useList } from '@/features/lists/hooks/useList';
import { BackButton } from '@/features/shared/components/BackButton';
import { Container } from '@/features/shared/components/Container';
import { EmptyState } from '@/features/shared/components/EmptyState';
import { Heading } from '@/features/shared/components/Heading';
import { PressableButton } from '@/features/shared/components/PressableButton';
import { formatCurrency } from '@/features/shared/utils/formatCurrency';

const ListDetailScreen = () => {
  const { listId } = useLocalSearchParams();

  const removeItemsByListId = useItemStore((state) => state.removeItemsByListId);

  const { list, listItems, listTotal, listItemsCount } = useList(listId.toString());

  const handleRemoveAllListItems = async () => {
    if (!list) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    removeItemsByListId(list.id);
  };

  if (!list)
    return (
      <Container>
        <EmptyState title="Lista no encontrada" description="La lista que estás buscando no existe">
          <BackButton />
        </EmptyState>
      </Container>
    );

  return (
    <Container>
      <Heading
        title={list.name}
        subtitle={`${listItemsCount} artículos • Total: ${formatCurrency(listTotal)}`}
        hasBackButton
        backHref="/"
      >
        <Link href={`/${list.id}/edit`} asChild>
          <PressableButton size="icon" variant="ghost">
            <Feather name="edit-3" size={24} color="#155dfc" />
          </PressableButton>
        </Link>
      </Heading>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Link asChild href={`/${list.id}/items/create`}>
          <PressableButton style={{ flex: 1 }}>
            <FontAwesome6 name="plus" size={24} color="#fff" />
            <Text style={{ color: '#fff' }}>Agregar Artículo</Text>
          </PressableButton>
        </Link>

        {listItemsCount > 0 && (
          <PressableButton variant="outline" onPress={handleRemoveAllListItems}>
            <Feather name="trash-2" size={18} color="#fb2c36" />
          </PressableButton>
        )}
      </View>

      {listItemsCount === 0 ? (
        <EmptyState title="Lista vacía" description="Agrega artículos a tu lista de compras">
          <Link asChild href={`/${list.id}/items/create`}>
            <PressableButton>
              <FontAwesome6 name="plus" size={24} color="#fff" />
              <Text style={{ color: '#fff' }}>Agregar Artículo</Text>
            </PressableButton>
          </Link>
        </EmptyState>
      ) : (
        <FlatList
          data={listItems}
          renderItem={({ item }) => <ItemCard item={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </Container>
  );
};

export default ListDetailScreen;
