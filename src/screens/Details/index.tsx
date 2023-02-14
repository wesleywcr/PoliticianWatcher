import React, { useState } from 'react'

import { ScrollView, View } from 'react-native';
import { ChartBar } from '../../components/ChartBar';
import { Card } from '../../components/Card';
import { ChartPie } from '../../components/ChartPie';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { Container } from './styles';

export function Details() {
  const API_URL = 'https://dadosabertos.camara.leg.br/api/v2';
const queryClient = useQueryClient();

  const { data, isFetched, isLoading, error } = useQuery<any>(
    ['deputy'],
    async () => {
      const response = await axios.get(`${API_URL}/deputados/${204536}/despesas?ano=2023&mes=1`);
      return response.data;
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
  {data.dados.map((item)=>(
    [
      { x: item.tipoDespesa, y: item.valorDocumento },
 
    ]
    ))}
  const dataId = [
    { x: 'Despesas com saúde', y: 30 },
    { x: 'Despesas com educação', y: 50 },
    { x: 'Despesas com transporte', y: 60 }
  ];
  console.log('Data',data.dados.map((item)=> item.tipoDespesa))
  console.log('Data02',data.dados.map((item)=>(
    [
      { x: item.tipoDespesa, y: item.valorDocumento },
 
    ]
    )))
  return (
   <Container>
    <ScrollView>
    <ChartBar />

    <View >
      <Card />
    </View>
  
      <ChartPie data={dataId}/> 
    </ScrollView>
    </Container>
  );
}

