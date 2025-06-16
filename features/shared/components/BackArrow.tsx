import { Link, LinkProps } from 'expo-router';

import { PressableButton } from '@/features/shared/components/PressableButton';
import Feather from '@expo/vector-icons/Feather';

interface Props {
  href?: LinkProps['href'];
}

export const BackArrow: React.FC<Props> = ({ href = '..' }) => {
  return (
    <Link href={href} asChild>
      <PressableButton size="icon" variant="ghost">
        <Feather name="arrow-left" size={24} color="black" variant="ghost" />
      </PressableButton>
    </Link>
  );
};
