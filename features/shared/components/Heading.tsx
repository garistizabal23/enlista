import Feather from '@expo/vector-icons/Feather';
import { LinkProps } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { BackArrow } from './BackArrow';

interface Props {
  hasBackButton?: boolean;
  backHref?: LinkProps['href'];
  showLogo?: React.ReactNode;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  isSpaceBetween?: boolean;
}

export const Heading: React.FC<Props> = ({
  hasBackButton,
  backHref,
  showLogo,
  title,
  subtitle,
  children,
  isSpaceBetween,
}) => {
  return (
    <View style={styles.container}>
      {hasBackButton && <BackArrow href={backHref} />}

      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            justifyContent: isSpaceBetween ? 'space-between' : 'flex-start',
          }}
        >
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            {showLogo && <Feather name="shopping-cart" size={24} color="#155dfc" />}
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{title}</Text>
          </View>

          {children}
        </View>

        {subtitle && <Text style={{ fontSize: 14, color: '#6a7282' }}>{subtitle}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
