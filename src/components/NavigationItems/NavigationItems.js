import React from "react"
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { Link } from "gatsby";

import Seo from "../seo";
import { useLanguage } from '../../context/languageContext';
import { useSideMenuOpen } from "../../context/sideMenuContext";


import * as styles from './header.module.css';

const NavigationItems = () => {
  const { t } = useLanguage();
  const { setIsMenuClose } = useSideMenuOpen();

  const handleLinkClicked = () => {
    setIsMenuClose(true);
  }
  return (
    <header className={styles.wrapper}>
      <Seo title="Graff - еротичний масаж Львів" />

      <ul className={styles.listWrapper}>

        <div onClick={() => handleLinkClicked()}>
          <AnchorLink className={styles.links} to="#about">
            <li>{t('aboutUs')}</li>
          </AnchorLink>
        </div>

        <div onClick={() => handleLinkClicked()}>
          <AnchorLink className={styles.links} to="#ladies">
            <li>{t('ladies')}</li>
          </AnchorLink>
        </div>

        <div onClick={() => handleLinkClicked()}>
          <AnchorLink className={styles.links} to="#services">
            <li>{t('services')}</li>
          </AnchorLink>
        </div>

        <div onClick={() => handleLinkClicked()}>
          <AnchorLink className={styles.links} to="#galery">
            <li>{t('interior')}</li>
          </AnchorLink>
        </div>

        <div onClick={() => handleLinkClicked()}>
          <Link className={styles.links} to="/about-massages">
            <li>{t('aboutMassages')}</li>
          </Link>
        </div>

        <div onClick={() => handleLinkClicked()}>
          <AnchorLink className={styles.links} to="#rules">
            <li>{t('rules')}</li>
          </AnchorLink>
        </div>

      </ul>
    </header>
  )
}

export default NavigationItems
