import React from 'react'
import { ReactNode } from 'react';
import { Dimensions, Text, View } from 'react-native';

import { Box, Container, Name } from './styles';
import { FlashList } from "@shopify/flash-list";
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { CardDeputs } from '../../components/CardDeputs';

const DATA = [
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
];

export interface List {
  id:number;
  nome:string;
  siglaPartido:string;
  urlFoto:string;
  
  
}
const API_URL = 'https://dadosabertos.camara.leg.br/api/v2';
export function Home() {
  const queryClient = useQueryClient();

  const { data, isFetched, isLoading, error } = useQuery<List[]>(
    ['deputy'],
    async () => {
      const response = await axios.get(`${API_URL}/deputados`);
      return response.data.dados;
      //throw new Error('');
    },
    {
      //refetchOnWindowFocus: true,
    // staleTime: 1000 * 30, //30seg
      //refetchInterval: 1000 * 20, //20seg
      //retry: 4,
      //initialData:[]//sempre os isLoading vai ser false;
    }
  );
 //console.log('data',data[])
  return (
    <Container>
      <Box>
     <FlashList
      data={data}
      renderItem={({ item }) => 
    
      <CardDeputs 
      key={item.id}
      name={item.nome} 
      party={item.siglaPartido} 
      photo={item.urlFoto} 
      
      />
    
    }
      estimatedItemSize={200}
    />
    </Box>
    </Container>
  );
}
