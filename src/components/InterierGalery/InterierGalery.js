import React from "react";
import { graphql, useStaticQuery } from "gatsby";

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

    return (
        <>
            <Seo title="Graff - салон еротичного масажу у Львові, інтер`єр" />
            <div className={styles.wrapper} id="galery">
                <p className={styles.title}>{t('interior')}</p>
                <div className={styles.container}>
                    <SwiperCarousel array={image} isInterier={true} />
                </div >
            </div >
        </>
    )
}

export default InterierGalery;

