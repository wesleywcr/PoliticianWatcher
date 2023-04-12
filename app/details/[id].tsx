import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import { useSearchParams } from 'expo-router';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import {
  BoxCard,
  Container,
  Title,
  Tot,
} from '../../src/styles/Details/styles';
import { Info } from '../../src/components/Info';

import { Selected } from '../../src/components/Selected';
import { VictoryPie, VictoryTooltip } from 'victory-native';
import { CardSpending } from '../../src/components/CardSpending';
import { IDeputsResponse } from '../../src/models';

export default function Det() {
  const { id } = useSearchParams();
  console.warn('Id', id);
  const MONTHS = [
    { label: 'Janeiro', value: '1' },
    { label: 'Fevereiro', value: '2' },
    { label: 'Março', value: '3' },
    { label: 'Abril', value: '4' },
    { label: 'Maio', value: '5' },
    { label: 'Junho', value: '6' },
    { label: 'Julho', value: '7' },
    { label: 'Agosto', value: '8' },
    { label: 'Setembro', value: '9' },
    { label: 'Outubro', value: '10' },
    { label: 'Novembro', value: '11' },
    { label: 'Dezembro', value: '12' },
  ];
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState<any>('1');
  const [year, setYear] = useState<any>('Janeiro');

  const API_URL = 'https://dadosabertos.camara.leg.br/api/v2';
  const queryClient = useQueryClient();

  const deputy = useQuery<IDeputsResponse>(
    ['deputy', id],
    async () => {
      const response = await axios.get(`${API_URL}/deputados/${id}`);
      return response.data;
    },
    {
      refetchOnWindowFocus: true,
    }
  );

  const { data, isFetched, isLoading, isSuccess, isError, error } =
    useQuery<any>(
      ['deputyExpenses', month],
      async () => {
        const response = await axios.get(
          `${API_URL}/deputados/${id}/despesas?ano=2023&mes=${month}`
        );
        //  console.warn('Log', response.data.dados);
        return response.data;
      },
      {
        enabled: !!id,
        //    refetchOnWindowFocus: true,
        //staleTime: 1000 * 30, //30seg
        // refetchInterval: 1000 * 20, //20seg
        //   retry: 4,
        //initialData:[]//sempre os isLoading vai ser false;
      }
    );

  const dataId = [
    { x: 'Despesas com saúde', y: 30 },
    { x: 'Despesas com educação', y: 50 },
    { x: 'Despesas com transporte', y: 60 },
  ];

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
  function amountsSpentPerMonth(items: any[]) {
    try {
      setLoading(true);
      const gastos = items.map((item) => ({
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
      return amounts;
    } catch (error: any) {
      console.error('Error', error);
      setLoading(false);
    }
  }

  // console.warn('Data',data.dados)
  //  console.warn('fet', isFetched, 'load', isLoading, 'isSuce', isSuccess);

  //  useFocusEffect(
  //   useCallback(() => {
  //     // if(isSuccess){
  //      console.warn('dt',data?.dados)
  //      const amounts =  amountsSpentPerMonth(data?.dados)
  //      const totalValue = sumValues(amounts);
  //      setTotal(totalValue);
  //      setDataChart(amounts);

  //     // }else{
  //     //  console.error('Error',error)
  //     //    setLoading(false);
  //     // }

  //      },[month,id])
  //  )
  function handleClick() {
    const amounts = amountsSpentPerMonth(data.dados);
    const totalValue = sumValues(amounts);
  }

  useEffect(() => {
    if (data) {
      const gastos = data.dados.map((item) => ({
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
      setDataChart(amounts);
      const totalValue = sumValues(amounts);
      setTotal(totalValue);
      console.log('Data', amounts);
    }
  }, [month, id, data]);

  return (
    <Container>
      {isError && <Text>Error</Text>}
      <ScrollView>
        {deputy.isLoading ? (
          <ActivityIndicator color={'red'} />
        ) : (
          <View style={{ marginTop: 60, marginBottom: 60, paddingLeft: 10 }}>
            <Info
              name={deputy.data.dados.ultimoStatus.nomeEleitoral}
              cpf={deputy.data.dados.cpf}
              dataOfBirth={deputy.data.dados.dataNascimento}
              nationality={deputy.data.dados.municipioNascimento}
              politicalParty={deputy.data.dados.ultimoStatus.siglaPartido}
              schooling={
                deputy.data.dados.escolaridade === null
                  ? 'Não informada'
                  : deputy.data.dados.escolaridade
              }
              sex={deputy.data.dados.sexo}
              signature={deputy.data.dados.ultimoStatus.nome}
              urlImage={String(deputy.data.dados.ultimoStatus.urlFoto)}
              state={String(deputy.data.dados.ultimoStatus.siglaUf)}
            />
          </View>
        )}

        <Title>Gastos</Title>
        {/* <ChartBar data={dataChartPresence} /> */}

        {/* <Selected selectedValue={year} onValueChange={setYear} /> */}
        <Selected
          selectedValue={month}
          onValueChange={setMonth}
          data={MONTHS}
        />

        {isLoading && !isSuccess ? (
          <>
            <ActivityIndicator color={'red'} />
          </>
        ) : (
          <>
            <Tot>{`Total:R$${total}`}</Tot>
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

            <FlatList
              data={dataChart}
              keyExtractor={(item: any) => item.numDocumento}
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
          </>
        )}
      </ScrollView>
    </Container>
  );
}
