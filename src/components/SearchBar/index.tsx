import React from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { Container, Input, SearchButton } from './styles';
interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
}

export function SearchBar({
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
}: Props) {
  return (
    <Container>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
      <SearchButton onPress={onSubmitEditing}>
        <FontAwesome name="search" size={24} color="black" />
      </SearchButton>
    </Container>
  );
}
