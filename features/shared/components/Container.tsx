import { StyleSheet, View, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container: React.FC<ViewProps> = ({ children, style, ...rest }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.view, style]} {...rest}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },

  view: {
    gap: 10,
    width: '100%',
    height: '100%',
  },
});
