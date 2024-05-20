import React from 'react';
import { useNavigate } from 'react-router-dom';

function StepFour() {
  let navigate = useNavigate();
  return (
    <div>
      <h1>Step 4</h1>
      <button onClick={() => navigate('/step4')}>Next</button>
    </div>
  );
}

export default StepFour;
