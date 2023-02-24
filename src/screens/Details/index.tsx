import React, { useEffect, useState } from 'react';

import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native';
import { ChartBar } from '../../components/ChartBar';
import { Card } from '../../components/Card';
import { ChartPie } from '../../components/ChartPie';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { BoxCard, Container, Title } from './styles';
import { VictoryPie, VictoryTooltip } from 'victory-native';
import { CardSpending } from '../../components/CardSpending';
import { Selected } from '../../components/Selected';
import { CardDeputs } from '../../components/CardDeputs';
import { Info } from '../../components/Info';

export function Details() {
  const data01 = [
    { quarter: 'Jan', earnings: 130 },
    { quarter: 'Fev', earnings: 165 },
    { quarter: 'Mar', earnings: 142 },
    { quarter: 'Abr', earnings: 190 },
    { quarter: 'Mai', earnings: 190 },
    { quarter: 'Jun', earnings: 190 },
    { quarter: 'Jul', earnings: 190 },
    { quarter: 'Ago', earnings: 190 },
    { quarter: 'Set', earnings: 190 },
    { quarter: 'Out', earnings: 190 },
    { quarter: 'Nov', earnings: 190 },
    { quarter: 'Dez', earnings: 300 },
  ];
  const MONTHS = [
    { label: 'Janeiro', value: '1' },
    { label: 'Fevereiro', value: '2' },
    { label: 'Março', value: '3' },
  ];
  const [month, setMonth] = useState<any>('1');
  const [year, setYear] = useState<any>('Janeiro');

  const API_URL = 'https://dadosabertos.camara.leg.br/api/v2';
  const queryClient = useQueryClient();

  // const deputy = useQuery<any>(
  //   ['deputy',id],
  //   async () => {
  //     const response = await axios.get(
  //       `${API_URL}/deputados/${id}`
  //     );
  //     return response.data;
     
  //   },
  // );
  const { data, isFetched, isLoading,isSuccess, isError ,error } = useQuery<any>(
    ['deputyExpenses',month],
    async () => {
      const response = await axios.get(
        `${API_URL}/deputados/${204536}/despesas?ano=2022&mes=${month}`
      );
      return response.data;
     
    },
    {
      //refetchOnWindowFocus: true,
      //staleTime: 1000 * 30, //30seg
      // refetchInterval: 1000 * 20, //20seg
      //retry: 4,
      //initialData:[]//sempre os isLoading vai ser false;
    }
  );
  // {data.dados.map((item)=>(
  //   [
  //     { x: item.tipoDespesa, y: item.valorDocumento },

  //   ]
  //   ))}
  const dataId = [
    { x: 'Despesas com saúde', y: 30 },
    { x: 'Despesas com educação', y: 50 },
    { x: 'Despesas com transporte', y: 60 },
  ];

  // console.log(
  //   'Data02',data.dados
  // );
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState('');
  const [dataChart, setDataChart] = useState<any[]>([]);
 
  function handleCardOnPress(id: string) {
    setSelected((prev) => (prev === id ? '' : id));
  }

  const coresUsadas = new Set();
  function gerarCorAleatoria() {
    const letras = '0123456789ABCDEF';
    let cor = '#';
    for (let i = 0; i < 6; i++) {
      cor += letras[Math.floor(Math.random() * 16)];
    }
    if (coresUsadas.has(cor)) {
      return gerarCorAleatoria();
    }
    coresUsadas.add(cor);
    return cor;
  }
  function sumValues(items: any[]): number {
    return items.reduce((total, item) => total + parseFloat(item.value), 0);
  }
  function amountsSpentPerMonth(items: any[]){
    const gastos =  items.map((item) => ({
      id: item.numDocumento,
      label: item.nomeFornecedor,
      value: item.valorDocumento,
      color: gerarCorAleatoria(),
    }));
    const valoresPorRotulo = {};
    gastos.forEach((item) => {
      const { label, value } = item;
      if (valoresPorRotulo[label]) {
        valoresPorRotulo[label] += value;
      } else {
        valoresPorRotulo[label] = value;
      }
    });
    const amounts = Object.keys(valoresPorRotulo).map((label, id) => {
      return {
        id,
        label,
        value: valoresPorRotulo[label].toFixed(2),
        color: gerarCorAleatoria(),
      };
    });
    console.log('Data', amounts);
    return amounts
  }

useEffect(()=>{
  if(isSuccess){
    const amounts =  amountsSpentPerMonth(data.dados)
    const totalValue = sumValues(amounts);
    setTotal(totalValue);
    setDataChart(amounts);
  }
},[month])

 
// console.log('Total', totalValue);
  //  console.warn('EX', dataChart);


console.log('Mes',month)
  return (
    <Container>
      {isError&&<Text>Error</Text>}
      <ScrollView>
     
        <View style={{ marginTop: 60, marginBottom: 60, paddingLeft: 10 }}>
          <Info
            name={''}
            cpf={''}
            dataOfBirth={''}
            nationality={''}
            politicalParty={''}
            schooling={''}
            sex={''}
            signature={'aass'}
          />
        </View>

      

        <Title>Gastos</Title>
        <ChartBar data={data01} />

        {/* <Selected selectedValue={year} onValueChange={setYear} /> */}
        <Selected
          selectedValue={month}
          onValueChange={setMonth}
          data={MONTHS}
        />
        <VictoryPie
          data={dataChart}
          x="label"
          y="value"
          colorScale={dataChart.map((expense) => expense.color)}
          innerRadius={80}
          padAngle={3}
          animate={{
            easing: 'bounce',
          }}
          style={{
            labels: {
              fill: '#FFF',
            },
            data: {
              fillOpacity: ({ datum }) =>
                datum.id === selected || selected === '' ? 1 : 0.3,
              stroke: ({ datum }) =>
                datum.id === selected ? datum.color : 'none',
              strokeOpacity: 0.5,
              strokeWidth: 10,
            },
          }}
          labelComponent={
            <VictoryTooltip
              renderInPortal={false}
              flyoutStyle={{
                stroke: 0,
                fill: ({ datum }) => datum.color,
              }}
            />
          }
        />
      {isLoading ? (
          <ActivityIndicator color={'red'} />
        ) : (
        <FlatList
          data={dataChart}
          keyExtractor={(item) => item.numDocumento}
          renderItem={({ item }) => (
            <>
              <BoxCard>
                <CardSpending
                  data={item}
                  selected={false}
                  onPress={() => handleCardOnPress(item.numDocumento)}
                />
              </BoxCard>
            </>
          )}
          showsVerticalScrollIndicator={false}
        />
        )}
      </ScrollView>
    </Container>
  );
}
