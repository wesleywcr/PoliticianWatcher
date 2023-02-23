import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  margin: 10px;
`;

export const Input = styled.TextInput`
  flex: 1;
  height: 50px;
  padding: 10px;
  font-size: 16px;
`;

export const SearchButton = styled.TouchableOpacity`
  padding: 10px;
`;

const SearchIcon = styled.Image`
  width: 20px;
  height: 20px;
`;
