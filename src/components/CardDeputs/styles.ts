import styled from 'styled-components/native';


export const Container = styled.TouchableOpacity`
  background-color: #9ec7cc;
  border-radius: 5px;
  width: 100%;
  height: 100px;
  flex-direction: row ;
  padding:16px;
  align-items:center;
  margin-bottom: 30px;
`;
export const Photo = styled.Image`
width:40px;
height:40px;
margin-left:10px;
  border-radius: 6px;
`;
export const Box = styled.View`
flex-direction: column;
margin-left: 10px;
`;
export const PoliticalParty = styled.Text`
 font-size: 10px;
 font-family: 'Oswald-Regular';
 color: #343b44;
 text-align:justify;
  
`;
export const Name = styled.Text`
  font-size: 20px;
  font-family: 'Oswald-Regular';
  color: #343b44;
  text-align:justify;
 
`;
