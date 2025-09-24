import React, { createContext, useState } from "react";

export const BasicContext = createContext();

export const BasicProvider = ({ children }) => {
  const [data, setData] = useState();

  const updateData = (newData) => {
    setData(newData);
  };
  const contextValue = { data, updateData };

  return (
    <BasicContext.Provider value={contextValue}>
      {children}
    </BasicContext.Provider>
  );
};
