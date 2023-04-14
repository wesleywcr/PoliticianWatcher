import React from 'react';
import { useFonts } from 'expo-font';
import {  Slot } from 'expo-router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Oswald-Regular': require('../src/assets/fonts/Oswald-Regular.ttf'),
    'Oswald-Bold': require('../src/assets/fonts/Oswald-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      {fontsLoaded ? <Slot /> : <ActivityIndicator color={'red'} />}
    </QueryClientProvider>
 
  );
}
