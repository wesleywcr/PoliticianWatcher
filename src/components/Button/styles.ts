import styled, { css } from 'styled-components/native';


export type ButtonVariant = 'primary' | 'secondary' | 'outline';

type ButtonContainerProps = {
  variant: ButtonVariant
}

type ColorTextProps = {
  variant: ButtonVariant
}

const backgroundVariant = {
  primary: '#16003B',
  secondary: '#006E7F',//#006E7F
  outline: 'tranparent',
}
const textVariant = {
  primary: '#fcda3c',
  secondary: '#fff',
  outline: '#000',
}

export const ButtonContainer = styled.TouchableOpacity<ButtonContainerProps>`
 width: 80%;
 border-radius:5px;
 padding: 18px;
 margin-top: 50px;

 ${props => {
    return css`
 background-color:${backgroundVariant[props.variant]};
 border: solid 1px ${props.variant === 'primary' ?
        backgroundVariant[props.variant] : props.variant === 'secondary' ?
          '#006E7F' : '#000'};
`
  }}
`;

export const Title = styled.Text<ColorTextProps>`
  text-align: center;
  font-size: 14px;
  font-weight: 700;
 
  ${props => {
    return css`color:${textVariant[props.variant]};`
  }}

`;

