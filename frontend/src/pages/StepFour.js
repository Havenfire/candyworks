import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WizardContext } from '../WizardContext';

import './StepFour.css';
import '../global.css';
import { COLORS } from '../values/colors';
import img1 from '../images/midgate_mudball.png';
import img2 from '../images/shade_shore_sugarworms.png';
import img3 from '../images/skywrath_squawksicles.png';
import img4 from '../images/goldlake_glitterfish.png';
import img5 from '../images/oglodi_trail_jerky.png';

const StepFour = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { recipes, setRecipes } = useContext(WizardContext);
  const [, setInputValue] = useState("");
  const [, setStartingInputValue] = useState("");

  const [currentFocus, setCurrentFocus] = useState("");
  const [exchangeInputs, setExchangeInputs] = useState([
    { id: 1, left: "", right: "" },
    { id: 2, left: "", right: "" },
    { id: 3, left: "", right: "" },
    { id: 4, left: "", right: "" },
  ]);

  const candies = [
    { id: 1, image: img1, name: "Midgate Mudball" },
    { id: 2, image: img2, name: "Shade Shore Sugarworms" },
    { id: 3, image: img3, name: "Skywrath Squawksicles" },
    { id: 4, image: img4, name: "Goldlake Glitterfish" },
    { id: 5, image: img5, name: "Oglodi Trail Jerky" },
  ];

  const addItem = (image, listIndex, side) => {
    
    setExchangeInputs(prevLists => {
      const newLists = [...prevLists];
      const newItem = { ...newLists[listIndex] };
      const newCount = (newItem[side].match(/<img/g) || []).length;
      if (newCount < 4) {
        newItem[side] = `${newItem[side]}<img src="${image}" alt="${image}" style="width: 30px; height: 30px;" /> `;
        newLists[listIndex] = newItem;
      }
      return newLists;
    });
  };

  const handleKeyDown = (event) => {
    const key = event.key;
    const candyImages = {
      '1': img1,
      '2': img2,
      '3': img3,
      '4': img4,
      '5': img5
    };

    if (candyImages[key]) {
      event.preventDefault(); // Prevent the default key press behavior

      switch (currentFocus) {
        case 'mainInput':
          setInputValue(prev => {
            const newCount = (prev.match(/<img/g) || []).length;
            return newCount < 4 ? `${prev}<img src="${candyImages[key]}" alt="Candy ${key}" style="width: 30px; height: 30px;" /> ` : prev;
          });
          break;
        case 'rightInput':
          setStartingInputValue(prev => {
            const newCount = (prev.match(/<img/g) || []).length;
            return newCount < 4 ? `${prev}<img src="${candyImages[key]}" alt="Candy ${key}" style="width: 30px; height: 30px;" /> ` : prev;
          });
          break;
        default:
          const match = currentFocus.match(/exchange(\d+)(Left|Right)/);
          if (match) {
            const index = parseInt(match[1], 10);
            const side = match[2].toLowerCase(); // 'left' or 'right'
            addItem(candyImages[key], index, side);
          }
          break;
      }
    }
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  const handleKeyPress = (event) => {
    let active = document.activeElement;
    if (active.tagName === "INPUT") {
      const listIndex = parseInt(active.getAttribute('data-list-index'));
      const isInput = active.getAttribute('data-input') === 'true';
      const itemName = event.key;
      const candy = candies.find(candy => candy.name.toLowerCase().startsWith(itemName.toLowerCase()));
      if (candy) {
        addItem(candy.image, listIndex, isInput ? 'input' : 'output');
      }
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
  },);


  useEffect(() => {
    setExchangeInputs(recipes || [
      { id: 1, left: "", right: "" },
      { id: 2, left: "", right: "" },
      { id: 3, left: "", right: "" },
      { id: 4, left: "", right: "" },
    ]);
  }, [recipes]);

  const goToNext = () => {
    setRecipes(exchangeInputs)
    navigate('/step5');
  };

  const goToPrevious = () => {
    setRecipes(exchangeInputs)
    navigate('/step3');
  };

  return (
    <div className="wizard-main-box">
      <div className="the-crownfall-container">
        <p style={{ color: COLORS.red, fontSize: 24 }} className="the-crownfall">— The Crownfall —</p>
        <p style={{ fontSize: 56 }} className="candyworks-calculator">Candyworks Calculator</p>
      </div>

      <div className="frame-parent">
        <div className="step-label">
          <div style={{ color: COLORS.red, fontSize: 16 }} className="the-crownfall-container">Step 4</div>
          <div style={{ fontSize: 32 }} className="what-candies-do">Input your recipes.</div>
        </div>
        <div className="click-the-to-select-a-candy-parent">
          <div style={{ color: COLORS.grey, fontSize: 14 }} className="info-text">
            Inputs go in the left, Outputs go on the right. Tap the corresponding key to insert, backspace to delete.
          </div>
          <div className="frame-group">
            {candies.map((candy, index) => (
              <div key={index} className="goldlake-glitterfish-parent">
                <img
                  className="goldlake-glitterfish-icon"
                  alt={`ID: ${candy.id}`}
                  src={candy.image}
                />
                <div className="div">= {candy.id}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="frame-wrapper">
          <div className="recipe-items-wrapper">
            {exchangeInputs.map((input, index) => (
              <div key={index} className="exchange-div">
                <div
                  className="editable-div exchange-input left"
                  contentEditable
                  dangerouslySetInnerHTML={{ __html: input.left }}
                  onFocus={() => setCurrentFocus(`exchange${index}Left`)}
                  onKeyDown={handleKeyDown}
                  tabIndex="0"
                ></div>
                <div
                  className="editable-div exchange-input right"
                  contentEditable
                  dangerouslySetInnerHTML={{ __html: input.right }}
                  onFocus={() => setCurrentFocus(`exchange${index}Right`)}
                  onKeyDown={handleKeyDown}
                  tabIndex="0"
                ></div>
              </div>
            ))}
          </div>
        </div>

        <div className="of-4-parent">
          <div className="of-4">4 of 4</div>
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

export default StepFour;
