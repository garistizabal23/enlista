import { useLocalSearchParams, useRouter } from 'expo-router';

import { ItemForm, type ItemFormValues } from '@/features/items/components/ItemForm';
import { useItem } from '@/features/items/hooks/useItem';
import { useItemStore } from '@/features/items/stores/item.store';
import { BackButton } from '@/shared/components/BackButton';
import { Container } from '@/shared/components/Container';
import { EmptyState } from '@/shared/components/EmptyState';
import { Heading } from '@/shared/components/Heading';

const EditItemScreen = () => {
  const { listId, itemId } = useLocalSearchParams();
  const router = useRouter();

  const updateItem = useItemStore((state) => state.updateItem);

  const { item } = useItem(itemId.toString());

  const handleSubmit = (values: ItemFormValues) => {
    if (!item) return;

    updateItem({
      id: item.id,
      isPurchased: item.isPurchased,
      listId: item.listId,
      ...values,
    });

    router.replace(`/${listId}/items`);
  };

  return (
    <Container>
      <Heading title="Editar artículo" hasBackButton />

      {item ? (
        <ItemForm
          buttonLabel="Guardar cambios"
          onSubmit={handleSubmit}
          initialValues={{
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          }}
        />
      ) : (
        <EmptyState
          title="Artículo no encontrado"
          description="El artículo que estás buscando no existe"
        >
          <BackButton />
        </EmptyState>
      )}
    </Container>
  );
};

export default EditItemScreen;
