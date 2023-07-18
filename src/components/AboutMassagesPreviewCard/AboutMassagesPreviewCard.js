import React, { useEffect, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { navigate } from 'gatsby';
import { Link } from 'gatsby';
import 'react-lazy-load-image-component/src/effects/blur.css';

import Seo from "../seo";
import { getLocalizedText } from '../helpers/translator';
import { useLanguage } from '../../context/languageContext';

import * as styles from './AboutMassagesPreviewCard.module.css';

const AboutMassagesPreviewCard = () => {
    const { t, language } = useLanguage();

    const [fetchedMassages, setFetchedAboutMassage] = useState(null);
    const [isFetchedAboutMassageNew, setIsFetchedAboutMassageNew] = useState(false);

    useEffect(() => {
        fetchFetchData();
    }, []);

    const data = useStaticQuery(graphql`
        query {
            rest {
              aboutMassages(pagination: {limit: 1000}) {
                data {
                    id
                    attributes {
                    description
                    image {
                        data {
                        attributes {
                            url
                            }
                        }
                    }
                    localizations {
                        data {
                        attributes {
                            description
                            title
                            }
                        }
                    }
                    url
                    title
                    altForImage
                    }
                }
              }
            }
        }
    `);

    const fetchFetchData = async () => {
        try {
            const token = '24da86087f116291ec96ad43dab23b303ab9953b419db27224d705a0241d95806bf312d2019a0b39046444ea84e06fcfcfb764fdc28ec15d5a40f24368c343ea99c9c413aa61aa28cd472da495c88e21486f4769d9199cb861a55ef9b89af31d80ee1e8983e6adb6e0b05ab2b45bd9d56b617d96d16b69a7ca9bd059e17d5f27';
            const response = await fetch('https://vast-fjord-05237.herokuapp.com/api/about-massages?populate=*', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setFetchedAboutMassage(data.data);
        } catch (error) {
            setFetchedAboutMassage([]);
        }
    };

    const AboutMassages = data?.rest?.aboutMassages?.data;

    useEffect(() => {
        if (fetchedMassages && fetchedMassages?.length && AboutMassages.length) {
            if (fetchedMassages.length >= AboutMassages.length || fetchedMassages.length <= AboutMassages.length) {
                setIsFetchedAboutMassageNew(true);
            }
            fetchedMassages?.map((fetchedService) => {
                const matchedMassages = AboutMassages.find((service) => service.id == fetchedService.id);
                if (matchedMassages && matchedMassages.attributes.updatedAt !== fetchedService.attributes.updatedAt) {
                    setIsFetchedAboutMassageNew(true);
                }
                return fetchedService;
            });
        }
    }, [fetchedMassages, AboutMassages]);

    if (!AboutMassages || AboutMassages.length === 0) {
        return null;
    }

    return (
        <>
            <Seo title="Graff - еротичний масаж Львів" />
            <div className={styles.menuIcon} onClick={() => navigate(-1)}>
                <StaticImage height={20} width={20} alt="back" src='../../images/arrow-left.png' />
            </div>
            {(isFetchedAboutMassageNew && fetchedMassages.length) ?
                fetchedMassages?.map((article) => {
                    const { title, image, localizations, url, id, altForImage } = article.attributes;
                    const { url: imageUrl } = image?.data?.attributes;
                    return (
                        <div className={styles.wrapper} key={id}>
                            <div className={styles.imgWrapper}>
                                <img src={imageUrl} alt={altForImage} />
                            </div>
                            {localizations.data.map((loc, index) => {
                                const { title: titleEn } = loc.attributes
                                return (
                                    <p className={styles.title} key={index}>
                                        {getLocalizedText(language, titleEn, title)}
                                    </p>
                                )
                            })}
                            <Link to={`/about-massages/${url}`} className={styles.link}>{t('readMore')} -&gt;</Link>
                        </div>
                    )
                })
                :
                AboutMassages.map((article) => {
                    const { title, image, localizations, url, id, altForImage } = article.attributes;
                    const { url: imageUrl } = image?.data?.attributes;
                    return (
                        <div className={styles.wrapper} key={id}>
                            <div className={styles.imgWrapper}>
                                <img src={imageUrl} alt={altForImage} />
                            </div>
                            {localizations.data.map((loc, index) => {
                                const { title: titleEn } = loc.attributes
                                return (
                                    <p className={styles.title} key={index}>
                                        {getLocalizedText(language, titleEn, title)}
                                    </p>
                                )
                            })}
                            <Link to={`/about-massages/${url}`} className={styles.link}>{t('readMore')} -&gt;</Link>
                        </div>
                    )
                })}
        </>
    );
};

export default AboutMassagesPreviewCard;
