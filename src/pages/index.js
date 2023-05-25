import React, { lazy, Suspense } from "react";
import '../../18n';

import LanguageProvider from '../context/languageContext';

import Layout from "../components/layout"
import BaseLayout from "../components/Base_layout/BaseLayout"
import GradientLine from "../components/GradientLine/GradientLine";
import Seo from "../components/seo";
import SliderContextProvide from "../context/sliderConext";
import SideMenuContextProvide from "../context/sideMenuContext";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

import * as styles from "../components/index.module.css";

const LogoScreen = lazy(() => import('../components/logoScreen/LogoScreen.js'));
const AboutUs = lazy(() => import('../components/AboutUs/AboutUs'));
const Services = lazy(() => import('../components/Services/Services'));
const InterierGalery = lazy(() => import('../components/InterierGalery/InterierGalery'));
const Ladies = lazy(() => import('../components/Ladies/Ladies'));
const Rules = lazy(() => import('../components/Rules/Rules'));

const IndexPage = () => {
  return (
    <>
      <Seo title="Graff - салон еротичного масажу" />
      <div className={styles.mainWrapper}>
        <LanguageProvider>
          <Suspense fallback='Loading...'>

            <Layout>
              <SideMenuContextProvide>
                <LogoScreen />
              </SideMenuContextProvide>

            </Layout>

            <SliderContextProvide>
              <BaseLayout>
                <AboutUs />
                <div className={styles.lineWrapper}>
                  <GradientLine />
                </div>
                <Ladies />
                <div className={styles.lineWrapper}>
                  <GradientLine />
                </div>
                <Services />
                <div className={styles.lineWrapper}>
                  <GradientLine />
                </div>
                <InterierGalery />
                <div className={styles.lineWrapper}>
                  <GradientLine />
                </div>
                <Rules />

              </BaseLayout>
            </SliderContextProvide>

          </Suspense>
        </LanguageProvider>

        <ScrollToTop showBelow={250} />
      </div>
    </>
  )
}

export default IndexPage