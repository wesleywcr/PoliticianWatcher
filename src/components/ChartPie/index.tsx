import React from 'react';
import { ReactNode } from 'react';
import { Text } from 'react-native';
import { VictoryChart, VictoryPie, VictoryTheme } from 'victory-native';

import { Container } from './styles';

interface ChartPieProps {
  data:any[];
}

export function ChartPie({ data }: ChartPieProps) {
  return (
    <Container>
     <VictoryChart theme={VictoryTheme.material}>
        <VictoryPie
          data={data}
          x="x"
          y="y"
        />
      </VictoryChart>
    </Container>
  );
}
