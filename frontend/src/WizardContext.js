import React, { createContext, useState } from 'react';

// Creating the context
export const WizardContext = createContext(null);

// Context provider component
export const WizardProvider = ({ children }) => {
  const [inventoryLimit, setInventoryLimit] = useState(20); // Default value for inventory limit
  const [startingCandies, setStartingCandies] = useState([]); // Default value for starting candies
  const [targetCandies, setTargetCandies] = useState([]); // Default value for starting candies
  const [recipes, setRecipes] = useState([
    { id: 1, left: "", right: "" },
    { id: 2, left: "", right: "" },
    { id: 3, left: "", right: "" },
    { id: 4, left: "", right: "" },
  ]);


  return (
    <WizardContext.Provider value={{
      inventoryLimit,
      setInventoryLimit,
      startingCandies,
      setStartingCandies,
      targetCandies,
      setTargetCandies,
      recipes,
      setRecipes,
    }}>
      {children}
    </WizardContext.Provider>
  );
};
