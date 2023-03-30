import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
flex: 1;
background-color: #121212;
justify-content: center;
align-items: center;

  height: 200px;
`;
export const Box = styled.View`
 width: ${Dimensions.get("screen").width};
  height: 70%;
 padding: 10px 10px;
 margin-top: 70px;
 
  
`;
export const Name = styled.Text`
  font-size: 20px;
  color: #fefefe;
  font-family: 'Oswald-Regular';
  text-align:justify;
  padding:16px ;
  
`;
