import React, { createContext, useState } from 'react';

export const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [activePageMenuItem, setActivePageMenuItem] = useState('');
  const [activePageMenuItemIsVisible, setActivePageMenuItemIsVisible] = useState(false);
  /* const [itemsInView, setItemsInView] = useState([]);

  const addItemInView = (item) => {
    setItemsInView([...itemsInView, item]);
  }; */

  return (
    <NavigationContext.Provider
      value={{ activePageMenuItem, setActivePageMenuItem, activePageMenuItemIsVisible, setActivePageMenuItemIsVisible}}
    >
      {children}
    </NavigationContext.Provider>
  );
};
