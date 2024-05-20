import React, { createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { UserProvider } from './UserContext';

import StepOne from './pages/StepOne';
import StepTwo from './pages/StepTwo';
import StepThree from './pages/StepThree';
import StepFour from './pages/StepFour';

export const UserContext = createContext(null);

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/step1" element={<StepOne />} />
          <Route path="/step2" element={<StepTwo />} />
          <Route path="/step3" element={<StepThree />} />
          <Route path="/step4" element={<StepFour />} />
          <Route path="/" element={<StepOne />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
