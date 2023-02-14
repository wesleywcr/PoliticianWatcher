import React from 'react'
import { Text } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Details } from './src/screens/Details';
import { Home } from './src/screens/Home';
const queryClient = new QueryClient();

export  function App() {
  return (
 <QueryClientProvider client={queryClient }>
<Details/>
 </QueryClientProvider>
  );
}
