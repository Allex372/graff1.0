import React, { useState, useEffect } from "react";
import { StaticImage } from "gatsby-plugin-image";

import * as styles from './ScrollToTop.module.css';

const ScrollToTop = ({ showBelow }) => {
    const [show, setShow] = useState(showBelow ? false : true);

    const handleScroll = () => {
        if (window.pageYOffset > showBelow) {
            if (!show) setShow(true);
        } else {
            if (show) setShow(false);
        }
    };

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        if (showBelow) {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    });

    return (
        <>
            {show && (
                <div className={styles.menuIcon} onClick={handleClick}>
                    <StaticImage src='../../images/arrow-left.png' alt="back" height={20} width={20} />
                </div>
            )}
        </>
    );
};

export default ScrollToTop;
