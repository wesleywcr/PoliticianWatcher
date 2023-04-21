import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import { useFocusEffect } from 'expo-router';
import { useSearchParams } from 'expo-router';
import { useQuery } from 'react-query';
import { Info } from '../../src/components/Info';

import { Selected } from '../../src/components/Selected';
import { VictoryPie, VictoryTooltip } from 'victory-native';
import { CardSpending } from '../../src/components/CardSpending';
import { IDeputsResponse } from '../../src/models';
import {
  BoxCard,
  Container,
  Title,
  Tot,
} from '../../src/styles/Details/styles';
export default function Det() {
  const { id } = useSearchParams();
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState('');
  const [dataChart, setDataChart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState<any>('2');

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

  const API_URL = 'https://dadosabertos.camara.leg.br/api/v2';

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

        return response.data;
      },
      {
        enabled: !!id,
        refetchOnWindowFocus: true,
        //staleTime: 1000 * 30, //30seg
        // refetchInterval: 1000 * 20, //20seg
        retry: 4,
      }
    );

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

  useFocusEffect(
    useCallback(() => {
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
      }
    }, [month, id, data])
  );
  return (
    <Container>
      {isError && <Text>Error</Text>}
      <ScrollView showsVerticalScrollIndicator={false}>
        {deputy.isLoading ? (
          <ActivityIndicator color={'#051e53'} size={24} />
        ) : (
          <View style={{ marginTop: 60, marginBottom: 60, padding: 16 }}>
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

        <Selected
          selectedValue={month}
          onValueChange={setMonth}
          data={MONTHS}
        />

        {isLoading && !isSuccess ? (
          <>
            <ActivityIndicator color={'#051e53'} size={24} />
          </>
        ) : (
          <>
            {dataChart.length === 0 && <Text>Informações não escontradas</Text>}
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
            <Tot>{`Total: R$ ${total
              .toFixed(2)
              .toString()
              .replace('.', ',')}`}</Tot>
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
