import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import { StateProvider } from "./src/context/aboutMassagesProvider";

export const wrapRootElement = ({ element }) => (
    <StateProvider>
        {element}
    </StateProvider>
);

