import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const EmptyState: React.FC<Props> = ({ title, description, children }) => {
  return (
    <View style={styles.container}>
      <Feather name="package" size={60} color="#d1d5dc" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#6a7282',
  },

  description: {
    color: '#99a1af',
  },
});
