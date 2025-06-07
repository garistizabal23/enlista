import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  maxWidth?: boolean;
}

export const Input: React.FC<Props> = ({ label, error, maxWidth, style, ...rest }) => {
  return (
    <View style={{ gap: 2, flex: maxWidth ? 1 : undefined }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput style={[styles.input, style, error && styles.inputError]} {...rest} />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 16,
  },

  label: {
    fontWeight: '500',
    fontSize: 16,
  },

  inputError: {
    borderColor: '#e7000b',
  },

  error: {
    color: '#e7000b',
    fontSize: 12,
  },
});
