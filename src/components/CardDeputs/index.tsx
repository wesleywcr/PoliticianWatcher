
import React from 'react'
import { Box, Container, Name, Photo, PoliticalParty } from './styles';

interface CardDeputsProps {
  name:string;
  photo:string;
  party:string;
}

export function CardDeputs({ name,party,photo}: CardDeputsProps) {
  return (
    <Container>
     <Photo  source={{uri:`${photo}`}}/>
     <Box>
      <Name>{name}</Name>
     <PoliticalParty>{party}</PoliticalParty>
     </Box>
    </Container>
  );
}
