import React, { useState } from 'react';
import { ReactNode } from 'react';
import { ActivityIndicator, Dimensions, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
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
//const queryClient = new QueryClient();

const API_URL = 'https://dadosabertos.camara.leg.br/api/v2';
export default function Home() {
  const router = useRouter();
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
      // refetchOnWindowFocus: true,
      // staleTime: 1000 * 30, //30seg
      //refetchInterval: 1000 * 20, //20seg
      //retry: 4,
      //initialData: [], //sempre os isLoading vai ser false;
    }
  );
  console.log('data', data);

  function handleSearch() {
    console.log('Searching for', searchDeputy);
    // setSearchText(search);
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
          <ActivityIndicator color={'red'} />
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
// import React from 'react';
// import { Text, View } from 'react-native';
// import { Link } from 'expo-router';

// export default function Home() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text style={{ fontSize: 70 }}>LINK</Text>
//       <Link href={'/details/5'}>Ver deputado</Link>
//     </View>
//   );
// }
