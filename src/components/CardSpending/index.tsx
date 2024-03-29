import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Tag, Title, Amount } from './styles';

export type CardProps = {
  id: string;
  label: string;
  value: number;
  color: string;
};

type Props = TouchableOpacityProps & {
  selected: boolean;
  data: CardProps;
};

export function CardSpending({ data, selected, ...rest }: Props) {
  return (
    <Container selected={selected} color={data.color} {...rest}>
      <Tag color={data.color} />

      <Title>{data.label}</Title>

      <Amount>
        {`R$${data.value.toString().replace('.', ',')}`}
      </Amount>
    </Container>
  );
}
