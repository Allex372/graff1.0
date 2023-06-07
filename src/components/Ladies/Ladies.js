import React, { useState, useEffect } from "react";
import axios from "axios";
import { graphql, useStaticQuery } from "gatsby";
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
    const [fetchedModels, setFetchedModels] = useState(null);
    const [isFetchedModelNew, setIsFetchedModelNew] = useState(false);

    useEffect(() => {
        fetchFetchData();
    }, []);

    const data = useStaticQuery(graphql`
        query {
            rest {
                models {
                    data {
                        id
                        attributes {
                            updatedAt
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

    useEffect(() => {
        if (fetchedModels && fetchedModels?.length && Models.length) {

            fetchedModels?.map((fetchedModel) => {
                const matchedModel = Models.find((model) => model.id == fetchedModel.id);
                if (matchedModel && matchedModel.attributes.updatedAt !== fetchedModel.attributes.updatedAt) {
                    setIsFetchedModelNew(true);
                }
                return fetchedModel;
            });
        }
    }, [fetchedModels, Models]);

    if (!Models || Models.length === 0) {
        return null;
    }

    const fetchFetchData = async () => {
        try {
            const token = '571ed7986473215e45d999825cca0187c80a0561cf3246a38e6aa437a408bda689eacd923909bdebf75b17ae696f35208f876bc02fb3e7479f20c89e4d3711e66bfa7795d9b8a2f8122f4d8f9a63e2d306259f4048eb8048a7d27fadfde000139d1909b1abd9bde84980162a303658a65e18346446b6e5c19e42631ec1a6aeaa';
            const response = await fetch('https://whispering-shore-87525.herokuapp.com/api/models?populate=*', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setFetchedModels(data.data);
        } catch (error) {
            setFetchedModels([]);
        }
    };

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
                        {(isFetchedModelNew && fetchedModels.length) ?
                            fetchedModels?.map((ladie) => {
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
                            })
                            : Models?.map((ladie) => {
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
                        {isFetchedModelNew ?
                            fetchedModels?.map((ladie) => {
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
                            })
                            : Models?.map((ladie) => {
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
