import { useRouter } from 'expo-router';

import { ListForm, type ListFormValues } from '@/features/lists/components/ListForm';
import { useListStore } from '@/features/lists/stores/list.store';
import { Container } from '@/features/shared/components/Container';
import { Heading } from '@/features/shared/components/Heading';

const CreateListScreen = () => {
  const addList = useListStore((state) => state.addList);
  const router = useRouter();

  const handleSubmit = (values: ListFormValues) => {
    addList(values.name);
    router.replace('/');
  };

  return (
    <Container>
      <Heading title="Nueva Lista" hasBackButton/>

      <ListForm buttonLabel="Crear Lista" onSubmit={handleSubmit} />
    </Container>
  );
};

export default CreateListScreen;
