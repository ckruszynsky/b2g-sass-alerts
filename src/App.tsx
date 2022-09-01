import React from 'react';
import { AlertExample } from './feature/alerts/AlertExample';
import AlertContextProvider from './feature/alerts/contexts/AlertContext';


function App() {
  return (
    <AlertContextProvider>
      <AlertExample />
    </AlertContextProvider >
  );
}

export default App;
