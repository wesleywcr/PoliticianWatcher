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
  useImage,
  Image,
} from '@shopify/react-native-skia';

import OswaldFont from '../../assets/fonts/Oswald-Regular.ttf';
import OswaldFontBold from '../../assets/fonts/Oswald-Bold.ttf';
import OswaldFontSemiBold from '../../assets/fonts/Oswald-SemiBold.ttf';
import LobsterFont from '../../assets/fonts/Lobster-Regular.ttf';
const width = Dimensions.get('window').width - 24;
const height = 350;

const circle = Skia.Path.Make();
circle.addCircle(30, -10, 50);
interface InfoProps {
  name: string;
  sex: string;
  dataOfBirth: string;
  cpf: string;
  politicalParty: string;
  schooling: string;
  nationality: string;
  signature: string;
}
export function Info({
  name,
  sex,
  dataOfBirth,
  cpf,
  politicalParty,
  schooling,
  nationality,
  signature,
}: InfoProps) {
  const Brasao = useImage(require('../../assets/images/brasao.png'));
  const Chip = useImage(require('../../assets/images/chip.png'));
  const Profile = useImage(
    'https://www.camara.leg.br/internet/deputado/bandep/204536.jpg'
  );
  const font = useFont(OswaldFont, 18);
  const fontBold = useFont(OswaldFontBold, 18);
  const fontSemiBold = useFont(OswaldFontSemiBold, 18);
  const fontAss = useFont(LobsterFont, 20);
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
          x={40}
          y={45}
          font={fontBold}
          style={'fill'}
          color={'#000'}
          text="REPÚBLICA FEDERATIVA DO BRASIL"
        />
        {Brasao && Chip && Profile && (
          <>
            <Image
              image={Brasao}
              fit="contain"
              x={-15}
              y={30}
              width={120}
              height={120}
            />
            {/* <Image
          image={Chip}
          fit="contain"
          x={10}
          y={130}
          width={80}
          height={80}
        /> */}
            <Image
              image={Profile}
              fit="contain"
              x={275}
              y={80}
              width={90}
              height={90}
            />
          </>
        )}

        <Circle cx={width - 30} cy={40} r={20} color="#9f9c20" />
        <Text x={329} y={45} font={fontSemiBold} color={'#000'} text="BR" />
        <Text
          x={85}
          y={height - 250}
          font={font}
          color="#343b44"
          text="Nome:"
        />
        <Text
          x={85}
          y={height - 230}
          font={font}
          color="#343b44"
          text="Sexo:"
        />
        <Text
          x={85}
          y={height - 210}
          font={font}
          color="#343b44"
          text="Data de Nascimento:"
        />
        <Text
          x={85}
          y={height - 190}
          font={font}
          color={'#343b44'}
          text="CPF:"
        />
        <Text
          x={130}
          y={height - 250}
          font={font}
          color="#343b44"
          text={name}
        />
        <Text x={130} y={height - 230} font={font} color="#343b44" text={sex} />
        <Text
          x={240}
          y={height - 210}
          font={font}
          color="#343b44"
          text={dataOfBirth}
        />
        <Text x={120} y={height - 190} font={font} color="#343b44" text={cpf} />
        <Text
          x={20}
          y={height - 90}
          font={font}
          color="#343b44"
          text="Partido:"
        />

        <Text
          x={20}
          y={height - 70}
          font={font}
          color="#343b44"
          text="Escolaridade:"
        />
        <Text
          x={20}
          y={height - 50}
          font={font}
          color="#343b44"
          text="Nacionalidade:"
        />
        <Text
          x={80}
          y={height - 90}
          font={fontSemiBold}
          color="#000"
          text={politicalParty}
        />
        <Text
          x={125}
          y={height - 70}
          font={fontSemiBold}
          color="#000"
          text={schooling}
        />
        <Text
          x={130}
          y={height - 50}
          font={fontSemiBold}
          color="#000"
          text={nationality}
        />

        <Text
          x={140}
          y={height - 25}
          font={fontAss}
          color="#000"
          text={signature}
        />
        <Circle cx={width - 45} cy={315} r={20} color="#00a745" />
        <Text
          x={width - 55}
          y={height - 29}
          font={fontSemiBold}
          color="#000"
          text={`SP`}
        />
      </Group>
    </Canvas>
  );
}
