import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import { Input } from '@/features/shared/components/Input';
import { PressableButton } from '@/features/shared/components/PressableButton';

export interface ItemFormValues {
  name: string;
  price: number;
  quantity: number;
}

interface Props {
  onSubmit: (values: ItemFormValues) => void;
  buttonLabel: string;
  initialValues?: ItemFormValues;
}

const defaultValues: ItemFormValues = {
  name: '',
  price: 50,
  quantity: 1,
};

export const ItemForm: React.FC<Props> = ({ onSubmit, buttonLabel, initialValues }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemFormValues>({
    defaultValues: initialValues || defaultValues,
  });

  return (
    <View style={{ gap: 10 }}>
      <Controller
        control={control}
        rules={{
          required: { value: true, message: 'El nombre es obligatorio' },
          minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Nombre del artículo"
            placeholder="Escribe el nombre del artículo"
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
        <Controller
          control={control}
          rules={{
            required: { value: true, message: 'El precio es obligatorio' },
            min: { value: 1, message: 'El precio debe ser mayor a 0' },
            pattern: { value: /^-?\d+(\.\d+)?$/, message: 'El precio debe ser un número' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              maxWidth
              label="Precio"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value.toString()}
              error={errors.price?.message}
              keyboardType="numeric"
            />
          )}
          name="price"
        />

        <Controller
          control={control}
          rules={{
            required: { value: true, message: 'La cantidad es obligatoria' },
            min: { value: 1, message: 'La cantidad debe ser mayor a 0' },
            pattern: { value: /^-?\d+$/, message: 'La cantidad debe ser un número entero' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              maxWidth
              label="Cantidad"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value.toString()}
              error={errors.quantity?.message}
              keyboardType="numeric"
            />
          )}
          name="quantity"
        />
      </View>

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
