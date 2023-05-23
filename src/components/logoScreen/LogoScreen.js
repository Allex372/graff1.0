import React from "react";
import { useState, useEffect } from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import { useSideMenuOpen } from "../../context/sideMenuContext";
import { useLanguage } from '../../context/languageContext';
import NavigationItems from "../NavigationItems/NavigationItems";
import GradientLine from "../GradientLine/GradientLine";
import * as styles from './logo.module.css';

const LogoScreen = () => {
    const { language, setEN, setUA } = useLanguage();

    const [isOpen, setIsOpen] = useState(false);
    const { isMenuClose, setIsMenuClose } = useSideMenuOpen();

    const address = 'Саксаганського 5, Львів';

    useEffect(() => {
        setIsOpen(false);
    }, [isMenuClose]);

    useEffect(() => {
        const body = window.document.getElementsByTagName('body');

        (isOpen && body) ? body[0].style.overflow = 'hidden' : body[0].style.overflow = 'auto';
    }, [isOpen]);

    const handleOpenMobileMenu = () => {
        setIsMenuClose(false);
        setIsOpen(!isOpen);
    }

    const handleChangeLanguage = (languageToChange) => {
        if (languageToChange === 'en') {
            setEN('en');
            setIsMenuClose(true);
        } else {
            setUA('ua');
            setIsMenuClose(true);
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.languages}>
                <span
                    className={language === 'ua' && `${styles.active}`}
                    onClick={() => setUA('ua')}
                >
                    UA
                </span>
                <span>/</span>
                <span
                    className={language === 'en' && `${styles.active}`}
                    onClick={() => setEN('en')}
                >
                    EN
                </span>
            </div>
            <div className={styles.iconContentWrapper}>
                <div className={styles.imageWrapper}>
                    {
                        !isOpen &&
                        <div className={styles.logoWrapper} style={{ zIndex: isOpen && '2' }}>
                            <StaticImage src='../../images/logo.jpeg' alt='logo' />
                        </div>
                    }
                    <div className={styles.menuIcon} style={{ zIndex: isOpen && '2' }} onClick={() => handleOpenMobileMenu()}>
                        {isOpen ? <StaticImage src='../../images/close-icon.png' alt="close" /> : <StaticImage src='../../images/menu-icon.png' alt='open' />}
                    </div>
                </div>
                <div className={styles.contactWrapper}>
                    <div className={styles.contactsInfo}>
                        <a href="tel:+380986374614" target='_blank' rel="noreferrer">
                            <i class="fas fa-phone fa-lg"></i>
                            <span>+380986374614</span>
                        </a>

                        <a href="tg://resolve?domain=telegram_username" target='_blank' rel="noreferrer">
                            <i class="fab fa-telegram fa-lg"></i>
                            <span>Telegram</span>
                        </a>

                        <a href="https://wa.me/1234567890" target='_blank' rel="noreferrer">
                            <i class="fab fa-whatsapp fa-lg"></i>
                            <span>WhatsApp</span>
                        </a>

                        <a href="viber://pa?chatURI=viber_username" target='_blank' rel="noreferrer">
                            <i class="fab fa-viber fa-lg"></i>
                            <span>Viber</span>
                        </a>

                        <Link to={`https://www.google.com/maps/place/${address}`} target="_blank">
                            <i class="fas fa-street-view fa-lg"></i>
                            <span>Саксаганського 5</span>
                        </Link>
                    </div>
                </div>
            </div>


            <GradientLine />
            <div className={styles.headerWrapper}>
                <NavigationItems />
            </div>

            {
                (isOpen && !isMenuClose) &&
                <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
                    <div className={styles.mobileHeaderWrapper}>
                        <NavigationItems />
                        <div className={styles.contactsMobileWrapper}>
                            <div className={styles.contactsInfoMobile}>
                                <a href="tel:+1234567890">
                                    <i class="fas fa-phone"></i>
                                    +1 (234) 567-890
                                </a>

                                <a href="tg://resolve?domain=telegram_username">
                                    <i class="fab fa-telegram"></i>
                                    Telegram
                                </a>

                                <a href="https://wa.me/1234567890">
                                    <i class="fab fa-whatsapp"></i>
                                    WhatsApp
                                </a>

                                <a href="viber://pa?chatURI=viber_username">
                                    <i class="fab fa-viber"></i>
                                    Viber
                                </a>
                            </div>
                        </div>
                        <div className={styles.mobilelanguages}>
                            <span
                                className={language === 'ua' && `${styles.active}`}
                                onClick={() => handleChangeLanguage('ua')}
                            >
                                UA
                            </span>
                            <span>/</span>
                            <span
                                className={language === 'en' && `${styles.active}`}
                                onClick={() => handleChangeLanguage('en')}
                            >
                                EN
                            </span>
                        </div>
                    </div>
                </div>
            }
        </div >
    )

}

export default LogoScreen;