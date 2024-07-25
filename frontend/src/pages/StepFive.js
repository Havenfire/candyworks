import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WizardContext } from '../WizardContext';
import { COLORS } from '../values/colors';
import img1 from '../images/midgate_mudball.png';
import img2 from '../images/shade_shore_sugarworms.png';
import img3 from '../images/skywrath_squawksicles.png';
import img4 from '../images/goldlake_glitterfish.png';
import img5 from '../images/oglodi_trail_jerky.png';
import bfs from '../bfs.js';

const StepFive = () => {
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const contextOutput = useContext(WizardContext);
    let recipesLetters = contextOutput.recipesLetters;

    let startingCandies = contextOutput.startingCandies;
    let targetCandies = contextOutput.targetCandies;
    let inventoryLimit = contextOutput.inventoryLimit;
    const [bfsResult, setBfsResult] = useState({ status: 'unknown', allPaths: [], maxPath: [] });

    const candies = [
        { id: 1, image: img1, name: "Midgate Mudball", color: "B" },
        { id: 2, image: img2, name: "Shade Shore Sugarworms", color: "P" },
        { id: 3, image: img3, name: "Skywrath Squawksicles", color: "Y" },
        { id: 4, image: img4, name: "Goldlake Glitterfish", color: "O" },
        { id: 5, image: img5, name: "Oglodi Trail Jerky", color: "R" },
    ];

    const simpleExchange = {
        "B, B, B": ["P", "Y", "O", "R"],
        "P, P, P": ["B", "Y", "O", "R"],
        "Y, Y, Y": ["B", "P", "O", "R"],
        "O, O, O": ["B", "P", "Y", "R"],
        "R, R, R": ["B", "P", "Y", "O"],
    };

    const submitForm = () => {
        let input_startingC = [];
        let input_targetC = [];

        for (let i = 0; i < startingCandies.length; i++) {
            input_startingC.push(candies[startingCandies[i]["id"] - 1]["color"]);
        }

        for (let i = 0; i < targetCandies.length; i++) {
            input_targetC.push(candies[targetCandies[i]["id"] - 1]["color"]);
        }

        let input_recipes = {};
        input_recipes[recipesLetters[0]["left"]] = recipesLetters[0]["right"];
        input_recipes[recipesLetters[1]["left"]] = recipesLetters[1]["right"];
        input_recipes[recipesLetters[2]["left"]] = recipesLetters[2]["right"];
        input_recipes[recipesLetters[3]["left"]] = recipesLetters[3]["right"];

        let [found, allPaths, maxPath] = bfs(input_startingC, input_recipes, simpleExchange, input_targetC, inventoryLimit, 5);
        setBfsResult({ status: found ? 'true' : 'false', allPaths, maxPath });
    };

    const goToPrevious = () => {
        navigate('/step4');
    };

    const formatNestedArray = (nestedArray) => {
        if (nestedArray === undefined) {
            return null; // Return null for React to render nothing
        }
    
        return nestedArray.map((group, groupIndex) => (
            <div key={groupIndex}>
                {group.map((subgroup, subgroupIndex) => (
                    <div key={subgroupIndex} style={{ display: 'inline-block', margin: '5px' }}>
                        {subgroup.map(letter => {
                            const candy = candies.find(c => c.color === letter);
                            return candy ? <img src={candy.image} alt={candy.name} key={candy.id} style={{ width: '50px', height: '50px' }} /> : null;
                        })}
                    </div>
                ))}
            </div>
        ));
    };

    return (
        <div className="wizard-main-box">
            <div className="the-crownfall-container">
                <p style={{ color: COLORS.red, fontSize: 24 }} className="the-crownfall">— The Crownfall —</p>
                <p style={{ fontSize: 56 }} className="candyworks-calculator">Candyworks Calculator</p>
            </div>

            <div className="frame-parent">
                <div className="step-label">
                    <div style={{ color: COLORS.red, fontSize: 16 }} className="the-crownfall-container">Results</div>
                    <div style={{ fontSize: 32 }} className="what-candies-do">Algorithm Output</div>
                </div>
                <div className="click-the-to-select-a-candy-parent">
                    <div style={{ color: COLORS.grey, fontSize: 14 }} className="info-text">
                        Click Submit and wait for the algorithm to load.
                    </div>
                </div>
                <div className="frame-wrapper">
                    <div className="selected-items-wrapper">
                        <div className="frame-container" ref={menuRef}>
                            <div className="results-display">
                                {bfsResult.status === 'unknown' && (
                                    <p>Click submit to see the results.</p>
                                )}
                                {bfsResult.status === 'true' && (
                                    <div>
                                        <h2>Results Found:</h2>
                                        <pre>{formatNestedArray(bfsResult.maxPath, null, 2)}</pre>
                                    </div>
                                )}
                                {bfsResult.status === 'false' && (
                                    <p>No paths found matching the criteria. Wait for new candies or recipes.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="of-4-parent">
                    <div className="of-4">5 of 5</div>
                    <div className="previous-wrapper">
                        <button className="previous-button" onClick={goToPrevious}>Previous</button>
                    </div>
                    <div className="next-step-wrapper">
                        <button className="next-step-button" onClick={submitForm}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepFive;
