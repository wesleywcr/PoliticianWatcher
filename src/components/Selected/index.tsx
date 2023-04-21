import React from 'react';
import { Picker } from '@react-native-picker/picker';

import { Container } from './styles';

type MonthsProps =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';

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
          backgroundColor: '#9ec7cc',
          height: 50,
          flex: 1,
          borderRadius: 36,
          padding: 16,
          marginTop: 20,
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        {data.map((item) => (
          <Picker.Item
            key={item.label}
            label={item.label}
            value={item.value}
            style={{
              fontSize: 16,
              fontFamily: 'Oswald-Regular',
              color: '#343b44',
            }}
          />
        ))}
      </Picker>
    </Container>
  );
}
