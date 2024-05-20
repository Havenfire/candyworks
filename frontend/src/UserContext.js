
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    target_items: [],
    starting_itmes: [],
    max_candies: 20,
    recipes: {}
});

  // Function to update user details
  const updateUserDetails = (updates) => {
    setUserDetails(prevDetails => ({ ...prevDetails, ...updates }));
  };

  return (
    <UserContext.Provider value={{ userDetails, updateUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
