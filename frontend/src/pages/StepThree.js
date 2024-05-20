import React from 'react';
import { useNavigate } from 'react-router-dom';

function StepThree() {
  let navigate = useNavigate();
  return (
    <div>
      <h1>Step 3</h1>
      <button onClick={() => navigate('/step4')}>Next</button>
    </div>
  );
}

export default StepThree;
