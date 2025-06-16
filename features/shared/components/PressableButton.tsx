import * as Haptics from 'expo-haptics';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

interface Props extends PressableProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'md' | 'sm' | 'icon';
  style?: StyleProp<ViewStyle>;
  isSubmit?: boolean;
}

export const PressableButton: React.FC<Props> = ({
  children,
  variant = 'default',
  size = 'md',
  style,
  isSubmit,
  onPress,
  disabled,
  ...rest
}) => {
  const handlePress = async (event: GestureResponderEvent) => {
    onPress?.(event);
    if (isSubmit) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        styles[size],
        pressed && { opacity: 0.8 },
        disabled && { opacity: 0.5 },
        style,
      ]}
      {...rest}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    gap: 15,
  },

  default: {
    backgroundColor: '#155dfc',
  },

  outline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  ghost: {
    backgroundColor: 'transparent',
  },

  md: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  icon: {
    padding: 8,
  },
});
