import React, { useState } from 'react';
import { ReactNode } from 'react';
import { ActivityIndicator, Dimensions, Text, View } from 'react-native';

import { Box, Container, Name } from './styles';
import { FlashList } from '@shopify/flash-list';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { CardDeputs } from '../../components/CardDeputs';
import { SearchBar } from '../../components/SearchBar';

const DATA = [
  {
    title: 'First Item',
  },
  {
    title: 'Second Item',
  },
];

export interface List {
  id: number;
  nome: string;
  siglaPartido: string;
  urlFoto: string;
}
const API_URL = 'https://dadosabertos.camara.leg.br/api/v2';
export function Home() {
  const queryClient = useQueryClient();
  const [searchDeputy, setSearchDeputy] = useState('');

  const { data, isFetched, isLoading, isError, error } = useQuery<List[]>(
    ['deputy', searchDeputy],
    async () => {
      const response = await axios.get(
        `${API_URL}/deputados?idLegislatura=57&nome=${searchDeputy}`
      );
      return response.data.dados;
    },
    {
      //refetchOnWindowFocus: true,
      // staleTime: 1000 * 30, //30seg
      //refetchInterval: 1000 * 20, //20seg
      //retry: 4,
      //initialData:[]//sempre os isLoading vai ser false;
    }
  );
  // console.log('data', data);

  function handleSearch() {
    console.log('Searching for', searchDeputy);
    // setSearchText(search);
  }
  return (
    <Container>
      <SearchBar
        placeholder="Pesquise por deputado"
        value={searchDeputy}
        onChangeText={setSearchDeputy}
        onSubmitEditing={handleSearch}
      />
      <Box>
        {isLoading ? (
          <ActivityIndicator color={'red'} />
        ) : (
          <FlashList
            data={data}
            renderItem={({ item }) => (
              <CardDeputs
                key={item.id}
                name={item.nome}
                party={item.siglaPartido}
                photo={item.urlFoto}
              />
            )}
            estimatedItemSize={200}
          />
        )}
      </Box>
    </Container>
  );
}
