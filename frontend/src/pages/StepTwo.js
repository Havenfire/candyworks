import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './StepTwo.css';
import '../global.css';
import { WizardContext } from '../WizardContext';

import { COLORS } from '../values/colors';

const StepTwo = () => {
  const navigate = useNavigate();
  const { inventoryLimit, setInventoryLimit } = useContext(WizardContext); // Corrected to use WizardContext

  const [value, setValue] = useState(20);

  useEffect(() => {
    setValue(inventoryLimit || 20);
  }, [inventoryLimit]);

  const increment = () => {
    if (value < 30) {
      setValue(value + 1);
    }
  };

  const decrement = () => {
    if (value > 20) {
      setValue(value - 1);
    }
  };
  const goToNext = () => {
    setInventoryLimit(value); // Update the context when leaving the page
    navigate('/step3');
  };

  const goToPrevious = () => {
    setInventoryLimit(value); // Update the context when leaving the page
    navigate('/step1'); // Corrected the route string
  };

  return (
    <div className="wizard-main-box">
      <div className="the-crownfall-container">
        <p style={{ color: COLORS.red, fontSize: 24 }} className="the-crownfall">— The Crownfall —</p>
        <p style={{ fontSize: 56 }} className="candyworks-calculator">Candyworks Calculator</p>
      </div>

      <div className="frame-parent">
        <div className="step-label">
          <div style={{ color: COLORS.red, fontSize: 16 }} className="the-crownfall-container">Step 2</div>
          <div style={{ fontSize: 32 }} className="what-candies-do">Enter Your Inventory Limit</div>
        </div>
        <div className="click-the-to-select-a-candy-parent">
          <div style={{ color: COLORS.grey, fontSize: 14 }} className="info-text">
            Select how many slots you have unlocked for your candy inventory. (Minimum 20, maximum 30)
          </div>
        </div>
        <div className="frame-wrapper">
          <div className="frame-container-row">
            <div className="big-wrapper">
              <button
                className={`adj-button ${value === 20 ? 'faded' : ''}`}
                onClick={decrement}
                disabled={value === 20}
              >
                -
              </button>
            </div>
            
            <div className="text-wrapper">
              <input type="text" className="text-box" value={value} defaultValue={20} />
            </div>  

            <div className="big-wrapper">
              <button
                className={`adj-button ${value === 30 ? 'faded' : ''}`}
                onClick={increment}
                disabled={value === 30}
              >
                +
              </button>
            </div>
          </div>

        </div>

        <div className="of-4-parent">
          <div className="of-4">2 of 4</div>
          <div className="previous-wrapper">
            <button className="previous-button" onClick={goToPrevious}>Previous</button>
          </div>
          <div className="next-step-wrapper">
            <button className="next-step-button" onClick={goToNext}>Next Step</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
