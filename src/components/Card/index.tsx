import React from 'react'
import { Dimensions } from "react-native";
import {
  Canvas,
  RoundedRect,
  LinearGradient,
  vec,
  Circle,
  Group,
  Skia,
} from "@shopify/react-native-skia";

const width = Dimensions.get("window").width - 24;
const height = 200;

const circle = Skia.Path.Make();
circle.addCircle(30, -10, 50);
export function Card() {
  return (
    <Canvas style={{ height, width }}>
      <RoundedRect x={0} y={0} height={height} width={width} r={10}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(256, 256)}
          colors={["#5B9A93", "#2E645F", "#40534D", "#5B9A93"]}
        />
      </RoundedRect>

      <Group blendMode="overlay">
        <Circle cx={width - 60} cy={40} r={20} color="#D6A485" />
        <Circle cx={width - 40} cy={40} r={20} color="#98504B" />
      </Group>
    </Canvas>
  );
}
