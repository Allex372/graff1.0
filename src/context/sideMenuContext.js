import * as React from 'react';
import { createContext, useContext, useState } from "react";

const Context = createContext();

const SideMenuContextProvide = ({ children }) => {
    const [isMenuClose, setIsMenuClose] = useState(false);

    return <Context.Provider value={{ isMenuClose, setIsMenuClose }}>{children}</Context.Provider>;
}

export default SideMenuContextProvide;

export const useSideMenuOpen = () => useContext(Context);