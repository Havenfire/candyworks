import React, { useState, useRef } from 'react';
import './Frontpage.css';

import img1 from './images/midgate_mudball.png';
import img2 from './images/shade_shore_sugarworms.png';
import img3 from './images/skywrath_squawksicles.png';
import img4 from './images/goldlake_glitterfish.png';
import img5 from './images/oglodi_trail_jerky.png';
import bfs from './bfs.js';

function Frontpage() {
  const [inputValue, setInputValue] = useState("");
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
  const [startingInputValue, setstartingInputValue] = useState("");
  const [isRightPlaceholderVisible, setIsRightPlaceholderVisible] = useState(true);
  const [candyCount, setCandyCount] = useState("");
  const [bfsResult, setBfsResult] = useState({ found: false, allPaths: [], maxPath:[] });

  const [exchangeInputs, setExchangeInputs] = useState([
    { id: 1, left: "", right: "" },
    { id: 2, left: "", right: "" },
    { id: 3, left: "", right: "" },
    { id: 4, left: "", right: "" },
  ]);

  const editableDivRef = useRef(null);
  const [currentFocus, setCurrentFocus] = useState("");

  const candyNames = { '1': 'B', '2': 'P', '3': 'Y', '4': 'O', '5': 'R' };


  function handleKeyDown(event) {
    const key = event.key;

    if (candyNames[key]) {
      event.preventDefault(); // Prevent the default key press behavior

      const updateMainAndStarting = (prevValue, maxCount) => {
        const newValue = `${prevValue}${candyNames[key]}, `;
        const newCount = newValue.split(', ').filter(Boolean).length;
        return newCount <= maxCount ? newValue : prevValue;
      };

      switch (currentFocus) {
        case 'mainInput':
          setInputValue(prev => updateMainAndStarting(prev, 30));
          break;
        case 'rightInput':
          setstartingInputValue(prev => updateMainAndStarting(prev, 30));
          break;
        default:
          const match = currentFocus.match(/exchange(\d+)(Left|Right)/);
          if (match) {
            const index = parseInt(match[1], 10);
            const side = match[2].toLowerCase(); // 'left' or 'right'

            setExchangeInputs(prev => {
              return prev.map((item, idx) => {
                if (idx === index) {
                  const newItem = { ...item };
                  const newCandyValue = `${item[side]}${candyNames[key]}, `;
                  const newCount = newCandyValue.split(', ').filter(Boolean).length;

                  if (newCount <= 4) {
                    newItem[side] = newCandyValue;
                  }
                  return newItem;
                }
                return item;
              });
            });
          }
          break;
      }
    }
  }


  function handleFocus() {
    setCurrentFocus('mainInput'); // Updated to use a string identifier
    if (isPlaceholderVisible) {
      setIsPlaceholderVisible(false);
      setInputValue("");
    }
  }

  function handleRightFocus() {
    setCurrentFocus('rightInput'); // Updated to use a string identifier
    if (isRightPlaceholderVisible) {
      setIsRightPlaceholderVisible(false);
      setstartingInputValue("");
    }
  }



  function handleImageClick(imageName) {
    setInputValue(prev => `${prev}${imageName}, `); // Appends the clicked image name to the current value
    // Wait for the state to update, then focus on the editable div
    setTimeout(() => {
      editableDivRef.current.focus();
    }, 0);
  }
  const formatNestedArray = (nestedArray) => {
    return nestedArray.map(group =>
      group.map(subgroup => subgroup.join('')).join(' ')
    ).join(', ');
  };

  const handleSubmit = () => {
    // Parsing startingComponents and targetComponents with spaces and commas removed
    const parseComponents = (input) => input.split(',')
      .map(s => s.trim().replace(/\s+/g, '')) // Remove all spaces
      .filter(s => s !== ''); // Remove empty strings


    const startingComponents = parseComponents(startingInputValue);
    const targetComponents = parseComponents(inputValue);
    console.log(startingComponents)
    console.log(targetComponents)

    let yourRecipes = {};
    exchangeInputs.forEach((exchange) => {

      // Ensure inputs and outputs are properly parsed and trimmed
      console.log("Input left", exchange.left)
      let inputs = exchange.left.split(',').map(s => s.trim()).filter(Boolean);
      let outputs = exchange.right.split(',').map(s => s.trim()).filter(Boolean);
      
      // Use the exchange ID as the main key
      
      if (inputs.length > 0 && outputs.length > 0) {
        yourRecipes[exchange.left.slice(0, -2)] = outputs
      }

      
    });



    const simpleExchange = {
      "B, B, B": ["P", "Y", "O", "R"],
      "P, P, P": ["B", "Y", "O", "R"],
      "Y, Y, Y": ["B", "P", "O", "R"],
      "O, O, O": ["B", "P", "Y", "R"],
      "R, R, R": ["B", "P", "Y", "O"],
    };

    const maxCandies = parseInt(candyCount, 10) || 20; 
    const maxDepth = 5;

    let [found, allPaths, maxPath] = bfs(startingComponents, yourRecipes, simpleExchange, targetComponents, maxCandies, maxDepth);


    setBfsResult({ found, allPaths, maxPath });

    console.log("BFS Search Found:", found);
    console.log("Paths:", allPaths);
    console.log("max_path:", maxPath);
  };


  return (
    <div className="frontpage-container">
      <div className="header">
        <h1>The Crownfall Candyworks</h1>
      </div>
      <div className="content">
        <div className='central-content-top'>

          <div className="additional-box">
            <h1>Candies</h1>
            <div className="images-container">
              {[img1, img2, img3, img4, img5].map((imgSrc, index) => (
                <button key={index} className="image-button" onClick={() => handleImageClick(`Candy ${index + 1}`)}>
                  <img src={imgSrc} alt={`Candy ${index + 1}`} />
                  <p>{index + 1} = {candyNames[index + 1]}</p>
                  
                </button>

              ))}
            </div>
          </div>

          <div className="central-content">
            <div className="central-box">
              <p>Target Candies</p>
              <div
                className={`editable-div ${isPlaceholderVisible ? 'placeholder' : ''}`}
                contentEditable
                dangerouslySetInnerHTML={{ __html: isPlaceholderVisible ? 'Press keys 1, 2, 3, 4, or 5 to insert a candy.' : inputValue }}
                onInput={e => {
                  if (!e.currentTarget.textContent.trim()) {
                    setIsPlaceholderVisible(true);
                  } else {
                    setIsPlaceholderVisible(false);
                  }
                  setInputValue(e.currentTarget.textContent);
                }}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus} // Ensure this calls the updated handleFocus
                tabIndex="0"
              />
              <button onClick={handleSubmit} className="submit-button">Submit Candies</button>
              {/* Results Section */}
              <div className="results-display">
                {bfsResult.found ? (
                  <div>
                    <h2>Results Found:</h2>
                    <pre>{formatNestedArray(bfsResult.maxPath)}</pre>
                  </div>
                ) : (
                  <p>No paths found matching the criteria.</p>
                )}
              </div>

            </div>
          </div>

        </div>
        <div className="right-content">
          <div className="right-box">
            <p>Starting Candies</p>

            <div
              className={`editable-div ${isRightPlaceholderVisible ? 'placeholder' : ''}`}
              contentEditable
              dangerouslySetInnerHTML={{ __html: isRightPlaceholderVisible ? 'Press keys 1, 2, 3, 4, or 5 to insert a starting candy.' : startingInputValue }}
              onInput={e => {
                if (!e.currentTarget.textContent.trim()) {
                  setIsRightPlaceholderVisible(true);
                } else {
                  setIsRightPlaceholderVisible(false);
                }
                setstartingInputValue(e.currentTarget.textContent);
              }}
              onKeyDown={handleKeyDown}
              onFocus={handleRightFocus} // Ensure this calls the updated handleRightFocus
              tabIndex="0"
            />
            {/* Number input for specifying candy count */}
            <input
              type="number"
              value={candyCount}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (value >= 1 && value <= 30) {
                  setCandyCount(value);
                } else if (!e.target.value) {
                  setCandyCount(""); // Allow clear
                }
              }}
              placeholder="Enter Max Candies (1-30) (Default 20)"
              className="candy-count-input"
            />
          </div>
          <p>Exchange Candies</p>
          <div className='label-IO'>
            <p className='align-left'>Input</p>
            <p className='align-right'>Output</p>

          </div>
          <div className="right-box-exchange">

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

      </div>
    </div>
  );
}

export default Frontpage;
