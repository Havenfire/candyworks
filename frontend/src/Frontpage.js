import React, { useState, useRef } from 'react';
import './Frontpage.css';
import img1 from './images/image-1.jpg';
import img2 from './images/image-2.jpg';
import img3 from './images/image-3.jpg';
import img4 from './images/image-4.jpg';
import img5 from './images/image-5.jpg';
import bfs from './BFS_script24.js';

const LETTER_MAPPINGS = { '1': 'B', '2': 'P', '3': 'G', '4': 'L', '5': 'R' };

function Frontpage() {
  const [inputValue, setInputValue] = useState("");
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
  const [rightInputValue, setRightInputValue] = useState("");
  const [isRightPlaceholderVisible, setIsRightPlaceholderVisible] = useState(true);
  const [candyCount, setCandyCount] = useState("");
  const [bfsResult, setBfsResult] = useState({ found: false, allPaths: [] });

  const [exchangeInputs, setExchangeInputs] = useState([
    { id: 1, left: "", right: "" },
    { id: 2, left: "", right: "" },
    { id: 3, left: "", right: "" },
    { id: 4, left: "", right: "" },
  ]);

  const editableDivRef = useRef(null);
  const [currentFocus, setCurrentFocus] = useState("");



  function handleKeyDown(event) {
    const key = event.key;
    const candyNames = { '1': 'Candy 1', '2': 'Candy 2', '3': 'Candy 3', '4': 'Candy 4', '5': 'Candy 5' };

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
          setRightInputValue(prev => updateMainAndStarting(prev, 30));
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
      setRightInputValue("");
    }
  }



  function handleImageClick(imageName) {
    setInputValue(prev => `${prev}${imageName}, `); // Appends the clicked image name to the current value
    // Wait for the state to update, then focus on the editable div
    setTimeout(() => {
      editableDivRef.current.focus();
    }, 0);
  }

  const handleSubmit = () => {
    // Parsing startingComponents and targetComponents with spaces and commas removed
    const parseComponents = (input) => input.split(',')
      .map(s => s.trim().replace(/\s+/g, '')) // Remove all spaces
      .filter(s => s !== ''); // Remove empty strings

    const startingComponents = parseComponents(rightInputValue);
    const targetComponents = parseComponents(inputValue);

    let yourRecipes = {};
    exchangeInputs.forEach((exchange) => {
      // Ensure inputs and outputs are properly parsed and trimmed
      const inputs = exchange.left.split(',').map(s => s.trim()).filter(Boolean);
      const outputs = exchange.right.split(',').map(s => s.trim()).filter(Boolean);
      
      // Use the exchange ID as the main key
      if (inputs.length > 0 && outputs.length > 0) {
        yourRecipes[exchange.id] = {
          inputs: inputs,
          outputs: outputs
        };
      }
    });


    const simpleExchange = {
      "BBB": ["P", "G", "L", "R"],
      "PPP": ["B", "G", "L", "R"],
      "GGG": ["B", "P", "L", "R"],
      "LLL": ["B", "P", "G", "R"],
      "RRR": ["B", "P", "G", "L"],
    };

    // Adjust simpleExchange processing as needed since commas are removed now

    const maxCandies = parseInt(candyCount, 10) || 24; // Use a default if not specified
    const maxDepth = 5;

    // Call the BFS function with the prepared parameters
    const [found, allPaths] = bfs(startingComponents, yourRecipes, simpleExchange, targetComponents, maxCandies, maxDepth);

    // Use the BFS results. For example, updating the React state to display results
    setBfsResult({ found, allPaths });

    console.log("BFS Search Found:", found);
    console.log("Paths:", allPaths);
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
                    {bfsResult.allPaths.map((path, pathIndex) => (
                      <div key={pathIndex}>
                        <h3>Path {pathIndex + 1}:</h3>
                        <ul>
                          {path.map((step, stepIndex) => {
                            // Assuming step is an object or a way to identify the exchange, adjust as necessary
                            const inputCandy = step.input; // Adjust according to your actual data structure
                            const outputCandy = step.output; // Adjust according to your actual data structure
                            return (
                              <li key={stepIndex}>{`${inputCandy} Exchanged for ${outputCandy}`}</li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  bfsResult.allPaths.length > 0 && <p>No paths found matching the criteria.</p>
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
              dangerouslySetInnerHTML={{ __html: isRightPlaceholderVisible ? 'Press keys 1, 2, 3, 4, or 5 to insert a candy.' : rightInputValue }}
              onInput={e => {
                if (!e.currentTarget.textContent.trim()) {
                  setIsRightPlaceholderVisible(true);
                } else {
                  setIsRightPlaceholderVisible(false);
                }
                setRightInputValue(e.currentTarget.textContent);
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
              placeholder="Enter Max Candies (1-30)"
              className="candy-count-input"
            />
          </div>
          <p>Exchange Candies</p>
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
