import React from "react";

import Seo from "../seo";
import * as styles from './BaseLayout.module.css';

const BaseLayout = ({ children }) => {
    return (
        <>
            <Seo title="Graff - найкращий салон еротичного масажу у Львові" />
            <div className={styles.wrapper}>{children}</div>
        </>
    )
}

export default BaseLayout;