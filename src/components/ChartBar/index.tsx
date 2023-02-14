import React from "react";
import { View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

const data = [
  { quarter: 'Jan', earnings: 13000 },
  { quarter: 'Fev', earnings: 16500 },
  { quarter: 'Mar', earnings: 14250 },
  { quarter: 'Abr', earnings: 19000 },
  { quarter: 'Mai', earnings: 19000 },
  { quarter: 'Jun', earnings: 19000 },
  { quarter: 'Jul', earnings: 19000 },
  { quarter: 'Ago', earnings: 19000 },
  { quarter: 'Set', earnings: 19000 },
  { quarter: 'Out', earnings: 19000 },
  { quarter: 'Nov', earnings: 19000 },
  { quarter: 'Dez', earnings: 19000 },
];

export function ChartBar() {
  return (
    <View>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryBar data={data} x="quarter" y="earnings" />
      </VictoryChart>
    </View>
  );
}
