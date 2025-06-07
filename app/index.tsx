import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Link } from 'expo-router';
import { FlatList, Text } from 'react-native';

import { ListCard } from '@/features/lists/components/ListCard';
import { useListStore } from '@/features/lists/stores/list.store';
import { Container } from '@/shared/components/Container';
import { EmptyState } from '@/shared/components/EmptyState';
import { Heading } from '@/shared/components/Heading';
import { PressableButton } from '@/shared/components/PressableButton';

const ListsScreen = () => {
  const lists = useListStore((state) => state.lists);

  return (
    <Container>
      <Heading showLogo title="Mis Listas" isSpaceBetween>
        <Link href="/create" asChild>
          <PressableButton size="sm">
            <FontAwesome6 name="plus" size={14} color="#fff" />
            <Text style={{ color: '#fff' }}>Nueva</Text>
          </PressableButton>
        </Link>
      </Heading>

      {lists.length === 0 ? (
        <EmptyState title="No hay listas" description="Crea tu primera lista para empezar">
          <Link asChild href="/create">
            <PressableButton>
              <FontAwesome6 name="plus" size={24} color="#fff" />
              <Text style={{ color: '#fff' }}>Crear Lista</Text>
            </PressableButton>
          </Link>
        </EmptyState>
      ) : (
        <FlatList
          data={lists}
          renderItem={({ item }) => <ListCard list={item} />}
          keyExtractor={(list) => list.id}
        />
      )}
    </Container>
  );
};

export default ListsScreen;
