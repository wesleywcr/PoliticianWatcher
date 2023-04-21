import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Box, Container, Name } from '../../src/styles/Home/styles';
import { FlashList } from '@shopify/flash-list';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

import { SearchBar } from '../../src/components/SearchBar';
import { CardDeputs } from '../../src/components/CardDeputs';

export interface List {
  id: number;
  nome: string;
  siglaPartido: string;
  urlFoto: string;
}

const API_URL = 'https://dadosabertos.camara.leg.br/api/v2';
export default function Home() {
  const router = useRouter();
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
      refetchOnWindowFocus: true,
      retry: 4,
    }
  );
  console.log('data', data);

  function handleSearch() {
    console.log('Searching for', searchDeputy);
  }
  function handleDetails(id: number) {
    console.log('ID', id);
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
          <ActivityIndicator color={'#051e53'} size={24} />
        ) : (
          <FlashList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CardDeputs
                key={item.id}
                name={item.nome}
                party={item.siglaPartido}
                photo={item.urlFoto}
                onPress={() => {
                  router.push(`/details/${item.id}`);
                }}
              />
            )}
            estimatedItemSize={200}
          />
        )}
      </Box>
    </Container>
  );
}
