import React from "react"
import { graphql, useStaticQuery } from "gatsby";
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import Seo from "../seo";
import { getLocalizedText } from '../helpers/translator';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper";

import { useLanguage } from '../../context/languageContext';
import ModelsDialog from "../ModelsDialog/ModelsDialog";
import * as styles from './ladies.module.css';

const Ladies = () => {
    const { t, language } = useLanguage();
    const [openDialog, setOpenDialog] = useState(false);
    const [arr, setArr] = useState([]);

    const data = useStaticQuery(graphql`
        query {
            rest {
                models {
                    data {
                        id
                        attributes {
                            image {
                                data {
                                    attributes {
                                        url
                                    }
                                }
                            }
                            name
                            localizations {
                                    data {
                                    attributes {
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    const Models = data?.rest?.models?.data;

    if (!Models || Models.length === 0) {
        return null;
    }

    const handleOpenDialog = (imagesArray) => {
        setArr([]);
        if (imagesArray) {
            setArr(imagesArray?.data);
        }
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    return (
        <>
            <Seo title="Graff - салон еротичного масажу у Львові, найкращі дівчата" />
            <div className={styles.wrapper} id="ladies">
                <p className={styles.title}>{t('ladies')}</p>
                <div className={styles.flexWrapper}>
                    <div className={styles.cardWrapper}>
                        {Models?.map((ladie) => {
                            const { name, image, localizations } = ladie.attributes;
                            const { url } = image?.data?.[0]?.attributes;
                            return (
                                <div className={styles.card} key={ladie.id}>
                                    <div className={styles.content}>
                                        <div className={styles.imgBx} onClick={() => handleOpenDialog(image)}>
                                            <LazyLoadImage src={url} alt="Graff - салон еротичного масажу, наші дівчата" className={styles.image} />
                                        </div>
                                    </div>

                                    <ul className={styles.sci}>
                                        <li>
                                            {localizations.data.map((loc, index) => {
                                                const { name: nameEn } = loc.attributes
                                                return (
                                                    <p className={styles.ladyText} key={index}>
                                                        {getLocalizedText(language, nameEn, name)}
                                                    </p>
                                                )
                                            })}
                                        </li>
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={styles.mobileSlides}>
                    <Swiper
                        effect={"cards"}
                        grabCursor={true}
                        modules={[EffectCards]}
                        className="mySwiper"
                    >
                        {Models?.map((ladie) => {
                            const { name, image, localizations } = ladie.attributes;
                            const { url } = image?.data?.[0]?.attributes;
                            return (
                                <SwiperSlide key={ladie.id}>
                                    <div className={styles.card}>
                                        <div className={styles.content}>
                                            <div className={styles.imgBx} onClick={() => handleOpenDialog(image)}>
                                                <LazyLoadImage src={url} alt="Graff - салон еротичного масажу, наші дівчата" className={styles.image} />
                                            </div>
                                        </div>

                                        <ul className={styles.sci}>
                                            <li>
                                                {localizations.data.map((loc, index) => {
                                                    const { name: nameEn } = loc.attributes
                                                    return (
                                                        <p className={styles.ladyText} key={index}>
                                                            {getLocalizedText(language, nameEn, name)}
                                                        </p>
                                                    )
                                                })}
                                            </li>
                                        </ul>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
                <ModelsDialog isModels={true} isOpenDialog={openDialog} handleClose={() => handleCloseDialog()} imagesArray={arr.length >= 1 && arr} />
            </div>
        </>
    )
}

export default Ladies;
