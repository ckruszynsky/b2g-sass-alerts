import React from 'react';
import { AlertExample } from './feature/alerts/AlertExample';
import { AlertDataProvider } from './feature/alerts/contexts/AlertContext';

function App() {
  return (
    <AlertDataProvider>
      <AlertExample />
    </AlertDataProvider >
  );
}

export default App;
