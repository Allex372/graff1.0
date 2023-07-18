import React, { Suspense } from "react";
import '../../18n';

import LanguageProvider from '../context/languageContext';

import BaseLayout from "../components/Base_layout/BaseLayout"
import Seo from "../components/seo";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import AboutMassagesPreviewCard from "../components/AboutMassagesPreviewCard/AboutMassagesPreviewCard";

import * as styles from "../components/about-massages.module.css";

const AboutMassages = () => {
    return (
        <>
            <Seo title="Graff - еротичний масаж Львів" />
            <LanguageProvider>
                <Suspense fallback='Loading...'>
                    <div className={styles.mainWrapper}>
                        <BaseLayout>
                            <div className={styles.cardWrapper}>
                                <AboutMassagesPreviewCard />
                            </div>
                        </BaseLayout>
                    </div>
                </Suspense>
            </LanguageProvider>
            <ScrollToTop showBelow={250} />
        </>
    )
}

export default AboutMassages