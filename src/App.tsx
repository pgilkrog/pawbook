import React from 'react';

import './App.css';
import { Toolbar } from './components/Navigations/Toolbar/Toolbar';
import { ProviderAuth } from './hooks/use-auth';
import { PrivateRoutes } from './PrivateRoutes';

const App: React.FC = () => {

  return (
    <div className="App">
      <ProviderAuth>
          <Toolbar />
          <div className="ContentWrap">
            <PrivateRoutes />        
          </div>
      </ProviderAuth>
    </div>    
  );
}

export default App;