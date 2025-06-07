import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import { Input } from '@/shared/components/Input';
import { PressableButton } from '@/shared/components/PressableButton';

export interface ListFormValues {
  name: string;
}

interface Props {
  onSubmit: (values: ListFormValues) => void;
  buttonLabel: string;
  initialValues?: ListFormValues;
}

const defaultValues: ListFormValues = {
  name: '',
};

export const ListForm: React.FC<Props> = ({ onSubmit, buttonLabel, initialValues }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ListFormValues>({
    defaultValues: initialValues || defaultValues,
  });

  return (
    <View style={{ gap: 10 }}>
      <Controller
        control={control}
        rules={{
          required: { value: true, message: 'El nombre de la lista es obligatorio' },
          minLength: {
            value: 3,
            message: 'El nombre de la lista debe tener al menos 3 caracteres',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Nombre de la lista"
            placeholder="Escribe el nombre de la lista"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.name?.message}
            autoFocus
          />
        )}
        name="name"
      />

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <PressableButton style={{ flex: 1 }} onPress={handleSubmit(onSubmit)} isSubmit>
          <Feather name="check" size={24} color="#fff" />
          <Text style={{ color: '#fff' }}>{buttonLabel}</Text>
        </PressableButton>

        <Link href=".." asChild>
          <PressableButton variant="outline">
            <Feather name="x" size={24} color="#000" />
            <Text style={{ color: '#000' }}>Cancelar</Text>
          </PressableButton>
        </Link>
      </View>
    </View>
  );
};
