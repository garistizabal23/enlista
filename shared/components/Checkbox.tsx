import Feather from '@expo/vector-icons/Feather';
import { Pressable, StyleSheet } from 'react-native';

interface Props {
  isChecked?: boolean;
  onPress?: () => void;
}

export const Checkbox: React.FC<Props> = ({ isChecked = false, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.checkBox, isChecked ? styles.checkBoxChecked : styles.checkBoxUnchecked]}
    >
      {isChecked && <Feather name="check" size={20} color="#fff" />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkBox: {
    width: 25,
    height: 25,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkBoxUnchecked: {
    backgroundColor: '#fff',
    borderColor: '#e5e7eb',
  },

  checkBoxChecked: {
    backgroundColor: '#00a63e',
    borderColor: '#00a63e',
  },
});
