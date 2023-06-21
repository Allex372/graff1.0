import React, { useEffect, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import axios from "axios";

import SwiperCarousel from "../Swiper/Swiper";
import Seo from "../seo";
import { useLanguage } from "../../context/languageContext";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import * as styles from './InterierGarely.module.css';


const InterierGalery = () => {
    const { t } = useLanguage();
    const [fetchedGalery, setFetchedGalery] = useState(null);

    useEffect(() => {
        fetchFetchData();
    }, []);

    const fetchFetchData = async () => {
        try {
            const token = '24da86087f116291ec96ad43dab23b303ab9953b419db27224d705a0241d95806bf312d2019a0b39046444ea84e06fcfcfb764fdc28ec15d5a40f24368c343ea99c9c413aa61aa28cd472da495c88e21486f4769d9199cb861a55ef9b89af31d80ee1e8983e6adb6e0b05ab2b45bd9d56b617d96d16b69a7ca9bd059e17d5f27';
            const response = await fetch('https://vast-fjord-05237.herokuapp.com/api/interiers?populate=*', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setFetchedGalery(data.data);
        } catch (error) {
            setFetchedGalery([]);
            console.error('Помилка при отриманні даних:', error);
        }
    };

    const data = useStaticQuery(graphql`
        query {
            rest {
                interiers {
                    data {
                        attributes {
                            image {
                                data {
                                    attributes {
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    const Interier = data?.rest?.interiers?.data;

    if (!Interier || Interier.length === 0) {
        return null;
    }

    const { image } = Interier?.[0]?.attributes;

    if (fetchedGalery?.length) {
        return (
            <>
                <Seo title="Graff - еротичний масаж Львів" />
                <div className={styles.wrapper} id="galery">
                    <p className={styles.title}>{t('interior')}</p>
                    <div className={styles.container}>
                        <SwiperCarousel array={fetchedGalery[0].attributes.image.data} isInterier={true} />
                    </div >
                </div >
            </>
        )
    } else {
        return (
            <>
                <Seo title="Graff - еротичний масаж Львів" />
                <div className={styles.wrapper} id="galery">
                    <p className={styles.title}>{t('interior')}</p>
                    <div className={styles.container}>
                        <SwiperCarousel array={image.data} isInterier={true} />
                    </div >
                </div >
            </>
        )
    }
}

export default InterierGalery;

