import { useLocalSearchParams, useRouter } from 'expo-router';

import { ListForm, type ListFormValues } from '@/features/lists/components/ListForm';
import { useList } from '@/features/lists/hooks/useList';
import { useListStore } from '@/features/lists/stores/list.store';
import { BackButton } from '@/features/shared/components/BackButton';
import { Container } from '@/features/shared/components/Container';
import { EmptyState } from '@/features/shared/components/EmptyState';
import { Heading } from '@/features/shared/components/Heading';

const EditListScreen = () => {
  const { listId } = useLocalSearchParams();

  const updateList = useListStore((state) => state.updateList);

  const { list } = useList(listId.toString());

  const router = useRouter();

  const handleSubmit = (values: ListFormValues) => {
    if (!list) return;

    updateList(list.id, values.name);

    router.replace(`/${listId}/items`);
  };

  return (
    <Container>
      <Heading title="Editar lista" hasBackButton />

      {list ? (
        <ListForm
          buttonLabel="Guardar cambios"
          initialValues={{ name: list.name }}
          onSubmit={handleSubmit}
        />
      ) : (
        <EmptyState title="Lista no encontrada" description="La lista que estás buscando no existe">
          <BackButton />
        </EmptyState>
      )}
    </Container>
  );
};

export default EditListScreen;
