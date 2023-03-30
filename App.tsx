import React from 'react';
import { Text } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Details } from './src/styles/Details';
import { Home } from './src/styles/Home';
import { useFonts } from 'expo-font';
const queryClient = new QueryClient();

export function App() {
  const [fontsLoaded] = useFonts({
    'Oswald-Regular': require('./src/assets/fonts/Oswald-Regular.ttf'),
    'Oswald-Bold': require('./src/assets/fonts/Oswald-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
     <Text>Ola</Text>
    </QueryClientProvider>
  );
}
