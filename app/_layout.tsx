import React from 'react';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ActivityIndicator, StatusBar } from 'react-native';

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
      <StatusBar barStyle="light-content" backgroundColor={'#121212'} />
      {fontsLoaded ? (
        <Slot />
      ) : (
        <ActivityIndicator color={'#051e53'} size={24} />
      )}
    </QueryClientProvider>
  );
}
