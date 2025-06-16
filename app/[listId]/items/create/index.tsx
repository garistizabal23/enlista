import { useLocalSearchParams, useRouter } from 'expo-router';

import { ItemForm, type ItemFormValues } from '@/features/items/components/ItemForm';
import { useItemStore } from '@/features/items/stores/item.store';
import { Container } from '@/features/shared/components/Container';
import { Heading } from '@/features/shared/components/Heading';

const CreateItemScreen = () => {
  const { listId } = useLocalSearchParams();
  const addItem = useItemStore((state) => state.addItem);
  const router = useRouter();

  const handleSubmit = (values: ItemFormValues) => {
    addItem({
      listId: listId.toString(),
      isPurchased: false,
      ...values,
    });

    router.replace(`/${listId}/items`);
  };

  return (
    <Container>
      <Heading title="Nuevo artículo" hasBackButton />

      <ItemForm buttonLabel="Agregar" onSubmit={handleSubmit} />
    </Container>
  );
};

export default CreateItemScreen;
