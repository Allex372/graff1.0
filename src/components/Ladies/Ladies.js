import React from "react"
import { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import axios from "axios";
import CircularProgress from '@mui/joy/CircularProgress';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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

    const { isLoading, isFetching, data } = useQuery(
        'modelData',
        () =>
            axios.get(
                'https://whispering-shore-87525.herokuapp.com/api/models?populate=*',
                {
                    headers: {
                        Authorization:
                            'Bearer a841dc75e9e097f8d4c9c8f9ee35ccd2a04a38d43c93a0162b962bb0059715d700cd888f1da1907c16c48e2e2e927c3ed2b73d026366116b1de8adfb879dd78cb0737ccc3a44ba5e348c4ab9d8b1e47257d59809be54bc488c62f59888e6137347f49721b85199f9881f57fe1d0bba33407d82410ded87aa8432639b84404224',
                    },
                }
            ).then(response => response.data),
        {
            refetchOnWindowFocus: false,
            staleTime: 120000,
            cacheTime: 600000,
        }
    );

    const Models = useMemo(() => (data ? data : []), [data]);

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

    if (isLoading || isFetching) return <CircularProgress color="neutral" className={styles.CircularProgress} />

    return (
        <div className={styles.wrapper} id="ladies">
            <p className={styles.title}>{t('ladies')}</p>
            <div className={styles.flexWrapper}>
                <div className={styles.cardWrapper}>
                    {Models?.data?.map((ladie) => {
                        const { name, image, localizations } = ladie.attributes;
                        const { url } = image?.data?.[0]?.attributes;
                        return (
                            <div className={styles.card} key={ladie.id}>
                                <div className={styles.content}>
                                    <div className={styles.imgBx} onClick={() => handleOpenDialog(image)}>
                                        <LazyLoadImage src={url} alt={name} className={styles.image} />
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
                    {Models?.data?.map((ladie) => {
                        const { name, image, localizations } = ladie.attributes;
                        const { url } = image?.data?.[0]?.attributes;
                        return (
                            <SwiperSlide key={ladie.id}>
                                <div className={styles.card}>
                                    <div className={styles.content}>
                                        <div className={styles.imgBx} onClick={() => handleOpenDialog(image)}>
                                            <LazyLoadImage src={url} alt={name} className={styles.image} />
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
    )
}

export default Ladies;