import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { Text } from 'react-native';

import { PressableButton } from '@/shared/components/PressableButton';

export const BackButton = () => {
  return (
    <Link asChild href="..">
      <PressableButton>
        <Ionicons name="return-up-back" size={24} color="#fff" />
        <Text style={{ color: '#fff' }}>Volver</Text>
      </PressableButton>
    </Link>
  );
};
