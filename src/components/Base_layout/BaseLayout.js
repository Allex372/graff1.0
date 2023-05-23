import React from "react";

import * as styles from './BaseLayout.module.css';

const BaseLayout = ({ children }) => {
    return (
        <>
            <div className={styles.wrapper}>{children}</div>
        </>
    )
}

export default BaseLayout;