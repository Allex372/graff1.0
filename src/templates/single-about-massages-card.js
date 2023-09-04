import React, { useState, useEffect } from "react";
import { StaticImage } from "gatsby-plugin-image";
import { navigate } from 'gatsby';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import Seo from "../components/seo";
import LanguageProvider from "../context/languageContext";
import { getLocalizedText } from '../components/helpers/translator';
import { useLanguage } from "../context/languageContext";

import * as styles from './single-about-massage.module.css';


const SingleAboutMassagesCard = ({ pageContext }) => {
    const { language } = useLanguage();
    const [freshBlog, setFreshBlog] = useState();

    useEffect(() => {
        const foundService = pageContext?.fetchedMassages?.find(service => service?.attributes?.url === pageContext.url);
        if (foundService) {
            fetchFetchData(+foundService?.id);
        }
    }, [pageContext]);

    const fetchFetchData = async (data) => {
        if (data) {
            try {
                const token = '24da86087f116291ec96ad43dab23b303ab9953b419db27224d705a0241d95806bf312d2019a0b39046444ea84e06fcfcfb764fdc28ec15d5a40f24368c343ea99c9c413aa61aa28cd472da495c88e21486f4769d9199cb861a55ef9b89af31d80ee1e8983e6adb6e0b05ab2b45bd9d56b617d96d16b69a7ca9bd059e17d5f27';
                const response = await fetch(`https://vast-fjord-05237.herokuapp.com/api/about-massages/${data}?populate=image,localizations`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const responseData = await response.json();
                const fetchedService = responseData.data;
                setFreshBlog(fetchedService);
            } catch (error) {
                console.error(error);
            }
        }

    };

    if (!freshBlog) {
        return null;
    }

    const localizedData = {};
    freshBlog?.attributes?.localizations?.data?.forEach((loc) => {
        const { locale, text, title, titleSEO, descriptionSEO, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10 } = loc.attributes;
        localizedData[locale] = { text, title, titleSEO, descriptionSEO, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10 };
    });

    const { descriptionSEO, titleSEO, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, title } = freshBlog?.attributes || '';

    return (
        <>
            <Seo
                title={`${getLocalizedText(language, localizedData.en?.titleSEO, titleSEO, localizedData.ru?.titleSEO)}`}
                description={`${getLocalizedText(language, localizedData.en?.descriptionSEO, descriptionSEO, localizedData.ru?.descriptionSEO)}`} />
            <div className={styles.bg}>
                <div className={styles.menuIcon} onClick={() => navigate('/about-massages/')}>
                    <StaticImage height={20} width={20} alt="back" src='../images/arrow-left.png' />
                </div>
                <div className={styles.infoWrapper}>
                    <div className={styles.colorWrapper}>

                        <React.Fragment>
                            <p className={styles.title}>
                                {getLocalizedText(language, localizedData.en?.title, title, localizedData.ru?.title)}
                            </p>
                            <div className={styles.imgWrapper}>
                                <LazyLoadImage
                                    src={freshBlog?.attributes?.image?.data?.attributes?.url}
                                    alt={freshBlog?.attributes?.altForImage}
                                    effect="blur"
                                    className={styles.image}
                                />
                            </div>
                            <div className={styles.description}>
                                {localizedData.en?.p1 ? <p>{getLocalizedText(language, localizedData.en?.p1, p1, localizedData.ru?.p1)}</p> : <p>{p1}</p>}
                                {localizedData.en?.p2 ? <p>{getLocalizedText(language, localizedData.en?.p2, p2, localizedData.ru?.p2)}</p> : <p>{p2}</p>}
                                {localizedData.en?.p3 ? <p>{getLocalizedText(language, localizedData.en?.p3, p3, localizedData.ru?.p3)}</p> : <p>{p3}</p>}
                                {localizedData.en?.p4 ? <p>{getLocalizedText(language, localizedData.en?.p4, p4, localizedData.ru?.p4)}</p> : <p>{p4}</p>}
                                {localizedData.en?.p5 ? <p>{getLocalizedText(language, localizedData.en?.p5, p5, localizedData.ru?.p5)}</p> : <p>{p5}</p>}
                                {localizedData.en?.p6 ? <p>{getLocalizedText(language, localizedData.en?.p6, p6, localizedData.ru?.p6)}</p> : <p>{p6}</p>}
                                {localizedData.en?.p7 ? <p>{getLocalizedText(language, localizedData.en?.p7, p7, localizedData.ru?.p7)}</p> : <p>{p7}</p>}
                                {localizedData.en?.p8 ? <p>{getLocalizedText(language, localizedData.en?.p8, p8, localizedData.ru?.p8)}</p> : <p>{p8}</p>}
                                {localizedData.en?.p9 ? <p>{getLocalizedText(language, localizedData.en?.p9, p9, localizedData.ru?.p9)}</p> : <p>{p9}</p>}
                                {localizedData.en?.p10 ? <p>{getLocalizedText(language, localizedData.en?.p10, p10, localizedData.ru?.p10)}</p> : <p>{p10}</p>}
                            </div>
                        </React.Fragment>
                    </div>
                </div>
            </div>
        </>
    )
}

const SingleMassagesWithContext = (props) => {
    return (
        <LanguageProvider>
            <SingleAboutMassagesCard {...props} />
        </LanguageProvider>
    )
};

export default SingleMassagesWithContext;