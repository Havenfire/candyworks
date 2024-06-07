import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WizardContext } from '../WizardContext';

import './StepOne.css';
import '../global.css';
import { COLORS } from '../values/colors';
import img1 from '../images/midgate_mudball.png';
import img2 from '../images/shade_shore_sugarworms.png';
import img3 from '../images/skywrath_squawksicles.png';
import img4 from '../images/goldlake_glitterfish.png';
import img5 from '../images/oglodi_trail_jerky.png';

const StepThree = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const menuRef = useRef(null);
  const { targetCandies, setTargetCandies } = useContext(WizardContext);

  // Create an array of objects representing the candies
  const candies = [
    { id: 1, image: img1, name: "Midgate Mudball" },
    { id: 2, image: img2, name: "Shade Shore Sugarworms" },
    { id: 3, image: img3, name: "Skywrath Squawksicles" },
    { id: 4, image: img4, name: "Goldlake Glitterfish" },
    { id: 5, image: img5, name: "Oglodi Trail Jerky" },
  ];

  // Sort the candies array by ID
  candies.sort((a, b) => a.id - b.id);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const addItem = (index) => {
    const newItem = candies[index];
    const newSelectedItems = [...selectedItems, newItem].sort((a, b) => a.id - b.id);
    if (selectedItems.length < 30) {
      setSelectedItems(newSelectedItems);
    }
    setIsMenuOpen(false); // Close menu after selection
  };

  const removeItem = (index) => {
    const newItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(newItems);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key >= '1' && event.key <= '5') {
      const index = parseInt(event.key) - 1;
      addItem(index);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  useEffect(() => {
    setSelectedItems(targetCandies || []);
  }, [targetCandies]);
  

  const goToNext = () => {
    setTargetCandies(selectedItems);
    navigate('/step4');
  };

  const goToPrevious = () => {
    setTargetCandies(selectedItems);
    navigate('/step2');
  };

  return (
    <div className="wizard-main-box">
      <div className="the-crownfall-container">
        <p style={{ color: COLORS.red, fontSize: 24 }} className="the-crownfall">— The Crownfall —</p>
        <p style={{ fontSize: 56 }} className="candyworks-calculator">Candyworks Calculator</p>
      </div>

      <div className="frame-parent">
        <div className="step-label">
          <div style={{ color: COLORS.red, fontSize: 16 }} className="the-crownfall-container">Step 3</div>
          <div style={{ fontSize: 32 }} className="what-candies-do">Enter the candies you have</div>
        </div>
        <div className="click-the-to-select-a-candy-parent">
          <div style={{ color: COLORS.grey, fontSize: 14 }} className="info-text">
            Click the + to select a candy, or tap the matching shortcut key.
          </div>
          <div className="frame-group">
            {candies.map((candy, index) => (
              <div key={index} className="goldlake-glitterfish-parent">
                <img
                  className="goldlake-glitterfish-icon"
                  alt={`Candy ${candy.id}`}
                  src={candy.image}
                />
                <div className="div">= {candy.id}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="frame-wrapper">
          <div className="selected-items-wrapper">
            {Array.from({ length: 3 }).map((_, row) => {
              const startIndex = row * 10;
              const endIndex = startIndex + 10;
              if (startIndex < selectedItems.length) { // Only create the row if items exist for it
                return (
                  <div key={row} className="row-container">
                    {selectedItems.slice(startIndex, endIndex).map((item, index) => (
                      <div key={index} className="selected-item-container">
                        <img src={item.image} alt={item.name} className="selected-item-icon" />
                        <button className="selected-items-remove" onClick={() => removeItem(startIndex + index)}>X</button>
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            })}
            <div className="frame-container" ref={menuRef}>
              <div className="wrapper">
                <button className="menu-button" onClick={toggleMenu}>+</button>

                {isMenuOpen && (
                  <div className="menu">
                    {candies.map((candy, index) => (
                      <button key={index} className="menu-item" onClick={() => addItem(index)}>
                        <img src={candy.image} alt={`Option ${candy.id}`} />
                        <p>{candy.name}</p>
                      </button>
                    ))}
                  </div>
                )}
                
              </div>
              <div className='spacer'>
              X
            </div>
            </div>

          </div>
        </div>

        <div className="of-4-parent">
          <div className="of-4">3 of 4</div>
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

export default StepThree;
