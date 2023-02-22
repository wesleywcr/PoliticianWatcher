import React from 'react';
import { Picker } from '@react-native-picker/picker';

import { Container } from './styles';

type MonthsProps = 'Janeiro' | 'Fevereiro' | 'Março';

type Props = {
  selectedValue: MonthsProps;
  onValueChange: (value: MonthsProps) => void;
  data: {
    label: string;
    value: string;
  }[];
};

export function Selected({ selectedValue, onValueChange, data }: Props) {
  
  return (
    <Container>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue: MonthsProps) => onValueChange(itemValue)}
        style={{
          backgroundColor: '#FFF',
          height: 50,
          flex: 1,
          padding: 16,
          marginTop: 20,
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        {data.map((item) => (
          <Picker.Item key={item.label} label={item.label} value={item.label} />
        ))}
      </Picker>
    </Container>
  );
}
