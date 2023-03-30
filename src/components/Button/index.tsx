import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { ButtonContainer, ButtonVariant, Title } from './styles';

type ButtonProps = TouchableOpacityProps & {
  variant: ButtonVariant;
};

export function Button({ variant = 'primary' }: ButtonProps) {
  return (
    <ButtonContainer variant={variant}>
      <Title variant={variant}>Enviar</Title>
    </ButtonContainer>
  );
}
