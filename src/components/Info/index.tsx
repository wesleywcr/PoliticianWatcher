import React from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import {
  Canvas,
  RoundedRect,
  LinearGradient,
  vec,
  Circle,
  Group,
  Skia,
  useFont,
  Text,
  TextPath,
  Blur,
  BlurMask,
} from '@shopify/react-native-skia';

import OswaldFont from '../../assets/fonts/Oswald-Regular.ttf';
const width = Dimensions.get('window').width - 24;
const height = 350;

const circle = Skia.Path.Make();
circle.addCircle(30, -10, 50);
export function Info() {
  const font = useFont(OswaldFont, 18);
  if (font === null) {
    return <ActivityIndicator />;
  }
  return (
    <Canvas style={{ height, width }}>
      {/* blendMode="exclusion" */}
      <Group>
        <RoundedRect
          x={0}
          y={0}
          height={height}
          width={width}
          r={20}

          //   color="#051e53"
        />
        <LinearGradient
          start={vec(10, 10)}
          end={vec(356, 156)}
          colors={['#9ec7cc', '#daecee']}
        />
        {/* <BlurMask blur={10} style={'inner'}/> */}
        <Text
          x={100}
          y={45}
          font={font}
          color={'#000'}
          text="REPÚBLICA FEDERATIVA DO BRASIL"
        />
        <Circle cx={width - 100} cy={40} r={20} color="#9f9c20" />
        <Text x={260} y={45} font={font} color={'#000'} text="BR" />
        <Text x={20} y={50} font={font} color={'#f9336a'} text="Deputado" />
        <Text x={70} y={height - 250} font={font} color="#f9336a" text="NOME" />
        <Text x={70} y={height - 230} font={font} color="#f9336a" text="SEXO" />
        <Text
          x={70}
          y={height - 210}
          font={font}
          color="#f9336a"
          text="NACIONALIDADE"
        />
        <Text
          x={70}
          y={height - 190}
          font={font}
          color="#f9336a"
          text="DATA DE NASC"
        />
        <Text
          x={70}
          y={height - 90}
          font={font}
          color="#f9336a"
          text="Partido"
        />
        <Text x={120} y={height - 90} font={font} color="#000" text="PFRP" />

        <Text
          x={20}
          y={height - 30}
          font={font}
          color="#f9336a"
          text="Escolaridade:"
        />
        <Text x={110} y={height - 30} font={font} color="#000" text="PFRP" />

        <Text
          x={width - 60}
          y={height - 30}
          font={font}
          color="#f9336a"
          text="000"
        />
      </Group>
    </Canvas>
  );
}
