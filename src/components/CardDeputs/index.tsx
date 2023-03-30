import React from 'react';
import { Pressable, TouchableOpacityProps } from 'react-native';
import { Box, Container, Name, Photo, PoliticalParty } from './styles';

interface CardDeputsProps  {
  name: string;
  photo: string;
  party: string;
  onPress: () => void;
}

export function CardDeputs({ name, party, photo,  onPress }: CardDeputsProps) {
  return (
    <Container  onPress={onPress} >
      <Photo source={{ uri: `${photo}` }} />
      <Box>
        <Name>{name}</Name>
        <PoliticalParty>{party}</PoliticalParty>
      </Box>
    </Container>

  );
}
