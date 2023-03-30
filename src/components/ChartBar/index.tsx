import React from "react";
import { View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { Container } from "./styles";


interface Props{
  data: {
    quarter: string;
    earnings: number;
}[]
}
export function ChartBar({data}:Props) {
  return (
    <Container>
      <VictoryChart theme={VictoryTheme.grayscale}  >
        <VictoryBar data={data}
          style={{ data: { fill: "#c43a31", } }}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
        alignment="start"
        x="quarter"   
        y="earnings" />
      </VictoryChart>
    </Container>
  );
}
