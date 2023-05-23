import * as React from 'react';
import { createContext, useContext } from "react";

const Context = createContext();

const SliderContextProvide = ({ children }) => {

    const changeSlide = (index) => {
        localStorage.setItem('currentSlide', JSON.stringify(index));
    }

    return <Context.Provider value={{ changeSlide }}>{children}</Context.Provider>;
}

export default SliderContextProvide;

export const useSliderIndex = () => useContext(Context);