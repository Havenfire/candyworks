import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './StepTwo.css';
import '../global.css';
import { WizardContext } from '../WizardContext';

import { COLORS } from '../values/colors';

const StepTwo = () => {
  const navigate = useNavigate();
  const { inventoryLimit, setInventoryLimit } = useContext(WizardContext);

  const [value, setValue] = useState(30);

  useEffect(() => {
    const fixedValue = 30;
    setValue(inventoryLimit || fixedValue);
    setInventoryLimit(fixedValue);

    const timer = window.setTimeout(() => {
      navigate('/step3');
    }, 300);

    return () => window.clearTimeout(timer);
  }, [inventoryLimit, navigate, setInventoryLimit]);

  const goToPrevious = () => {
    setInventoryLimit(value);
    navigate('/step1');
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
            This year the inventory limit is fixed at 30 slots. You will be moved to the next step automatically.
          </div>
        </div>
        <div className="frame-wrapper">
          <div className="frame-container-row">
            <div className="text-wrapper">
              <input type="text" className="text-box" value={value} readOnly />
            </div>
          </div>
        </div>

        <div className="of-4-parent">
          <div className="of-4">2 of 5</div>
          <div className="previous-wrapper">
            <button className="previous-button" onClick={goToPrevious}>Previous</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
