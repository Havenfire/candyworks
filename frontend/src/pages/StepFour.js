import React, { useState, useEffect, useContext } from 'react';
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
  const { recipes, setRecipes } = useContext(WizardContext);
  const { recipesLetters, setRecipesLetters } = useContext(WizardContext);
  const [, setInputValue] = useState("");
  const [, setStartingInputValue] = useState("");

  const [currentFocus, setCurrentFocus] = useState("");
  const [exchangeInputs, setExchangeInputs] = useState([
    { id: 1, left: "", right: "" },
    { id: 2, left: "", right: "" },
    { id: 3, left: "", right: "" },
    { id: 4, left: "", right: "" },
  ]);

  const [left1, setLeft1] = useState("");
  const [left2, setLeft2] = useState("");
  const [left3, setLeft3] = useState("");
  const [left4, setLeft4] = useState("");
  const [right1, setRight1] = useState([]);
  const [right2, setRight2] = useState([]);
  const [right3, setRight3] = useState([]);
  const [right4, setRight4] = useState([]);

  const candies = [
    { id: 1, image: img1, name: "Midgate Mudball", color: "B"},
    { id: 2, image: img2, name: "Shade Shore Sugarworms", color: "P"},
    { id: 3, image: img3, name: "Skywrath Squawksicles", color: "Y" },
    { id: 4, image: img4, name: "Goldlake Glitterfish", color: "O" },
    { id: 5, image: img5, name: "Oglodi Trail Jerky", color: "R" },
];

  const addItem = (candy, image, listIndex, side) => {
    const color = candies[candy - 1]["color"];
    console.log("Calling addItem")
    switch(`${side}${listIndex + 1}`) {
      case 'left1':
        if(left1.length <= 9){
          setLeft1(prev => prev === "" ? color : `${prev}, ${color}`);
        }
        break;
      case 'left2':
        if(left2.length <= 9){
          setLeft2(prev => prev === "" ? color : `${prev}, ${color}`);
        }
        break;
      case 'left3':
        if(left3.length <= 9){
          setLeft3(prev => prev === "" ? color : `${prev}, ${color}`);
        }
        break;
      case 'left4':
        if(left4.length <= 9){
          setLeft4(prev => prev === "" ? color : `${prev}, ${color}`);
        }
        break;
      case 'right1':
        if(right1.length < 4){
          setRight1(prev => [...prev, color]);
        }
        break;
      case 'right2':
        if(right2.length < 4){
          setRight2(prev => [...prev, color]);
        }
        break;
      case 'right3':
        if(right3.length < 4){
          setRight3(prev => [...prev, color]);
        }
        break;
      case 'right4':
        if(right4.length < 4){
          setRight4(prev => [...prev, color]);
        }
        break;
      default:
        console.log('Unknown variable:', `${side}${listIndex + 1}`);
    }
   
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
      event.preventDefault();

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
            addItem(key, candyImages[key], index, side);
          }
          break;
      }
    }
  };
  useEffect(() => {
    console.log("Updated left1:", left1);
    console.log("Updated left2:", left2);
    console.log("Updated left3:", left3);
    console.log("Updated left4:", left4);
    console.log("Updated right1:", right1);
    console.log("Updated right2:", right2);
    console.log("Updated right3:", right3);
    console.log("Updated right4:", right4);
  }, [left1, left2, left3, left4, right1, right2, right3, right4]);

  useEffect(() => {

    
    

    setExchangeInputs(recipes || [
      { id: 1, left: "", right: "" },
      { id: 2, left: "", right: "" },
      { id: 3, left: "", right: "" },
      { id: 4, left: "", right: "" },
    ]);
  }, [recipes]);

  useEffect(() => {
    if (recipes && recipes.length === 4) {
      setExchangeInputs(recipes);
    }
  
    if (recipesLetters && recipesLetters.length === 4) {
      setLeft1(recipesLetters[0].left || "");
      setLeft2(recipesLetters[1].left || "");
      setLeft3(recipesLetters[2].left || "");
      setLeft4(recipesLetters[3].left || "");
      setRight1(recipesLetters[0].right || "");
      setRight2(recipesLetters[1].right || "");
      setRight3(recipesLetters[2].right || "");
      setRight4(recipesLetters[3].right || "");
    }
  }, [recipes, recipesLetters]);

  const goToNext = () => {
    let recipe_letters = [
      { id: 1, left: left1, right: right1 },
      { id: 2, left: left2, right: right2 },
      { id: 3, left: left3, right: right3 },
      { id: 4, left: left4, right: right4 },
    ]

    setRecipesLetters(recipe_letters);
    setRecipes(exchangeInputs);
    console.log("Recipe Letters", recipe_letters);
  
    navigate('/step5');
  };
  const goToPrevious = () => {
    let recipe_letters = [
      { id: 1, left: left1, right: right1 },
      { id: 2, left: left2, right: right2 },
      { id: 3, left: left3, right: right3 },
      { id: 4, left: left4, right: right4 },
    ]

    setRecipesLetters(recipe_letters)
    setRecipes(exchangeInputs)
    console.log("Recipe Letters", recipesLetters)
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
          <div className="of-4">4 of 5</div>
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
