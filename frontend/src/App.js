import React from 'react';
import Frontpage from './Frontpage';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <div className="App">
      <Analytics />
      <Frontpage />
    </div>
    
  );
}

export default App;
