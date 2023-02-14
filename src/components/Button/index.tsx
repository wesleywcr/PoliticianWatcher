import React from 'react';

import { ButtonContainer, ButtonVariant, Title } from './styles';

type ButtonProps = {
  variant: ButtonVariant;
};

export function Button({ variant = 'primary' }: ButtonProps) {
  return (
    <ButtonContainer variant={variant}>
      <Title variant={variant}>Enviar</Title>
    </ButtonContainer>
  );
}
