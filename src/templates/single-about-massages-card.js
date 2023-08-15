import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { navigate } from 'gatsby';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import Seo from "../components/seo";
import { getLocalizedText } from '../components/helpers/translator';
import { useLanguage } from "../context/languageContext";
import LanguageProvider from '../context/languageContext';

import * as styles from './single-about-massage.module.css';


const SingleAboutMassagesCard = ({ data }) => {
    const { language } = useLanguage();
    const [fetchedServices, setFetchedServices] = useState(null);
    const [isFetchedServiceNew, setIsFetchedServiceNew] = useState(false);

    const Service = data?.rest?.aboutMassages?.data;

    useEffect(() => {
        fetchFetchData();
    }, []);

    const fetchFetchData = async () => {
        try {
            const token = '24da86087f116291ec96ad43dab23b303ab9953b419db27224d705a0241d95806bf312d2019a0b39046444ea84e06fcfcfb764fdc28ec15d5a40f24368c343ea99c9c413aa61aa28cd472da495c88e21486f4769d9199cb861a55ef9b89af31d80ee1e8983e6adb6e0b05ab2b45bd9d56b617d96d16b69a7ca9bd059e17d5f27';
            const response = await fetch(`https://vast-fjord-05237.herokuapp.com/api/about-massages/${+Service[0].id}?populate=image,localizations`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setFetchedServices(data.data);
        } catch (error) {
            setFetchedServices([]);
        }
    };

    useEffect(() => {
        if (fetchedServices && Service.length) {
            const matchedService = Service.find((service) => service.id == fetchedServices.id);
            if (matchedService && matchedService.attributes.updatedAt !== fetchedServices.attributes.updatedAt) {
                setIsFetchedServiceNew(true);
            }
        }
    }, [fetchedServices, Service]);

    if (!Service || Service.length === 0) {
        return null;
    }

    const { image, localizations, description, title, id, altForImage } = Service?.[0]?.attributes;

    const img = image?.data?.attributes?.url

    return (
        <>
            <Seo title="Graff - еротичний масаж Львів" />
            {isFetchedServiceNew ?
                (<div className={styles.bg} key={fetchedServices?.id}>
                    <div className={styles.menuIcon} onClick={() => navigate(-1)}>
                        <StaticImage height={20} width={20} alt="back" src='../images/arrow-left.png' />
                    </div>
                    <div className={styles.infoWrapper}>
                        <div className={styles.colorWrapper}>
                            {fetchedServices?.attributes?.localizations?.data?.map((loc, index) => {
                                const { title: titleEn, description: descriptionEn } = loc?.attributes;
                                return (
                                    <React.Fragment key={index}>
                                        <p className={styles.title}>
                                            {getLocalizedText(language, titleEn, fetchedServices?.attributes?.title)}
                                        </p>
                                        <div className={styles.imgWrapper}>
                                            <LazyLoadImage
                                                src={fetchedServices?.attributes?.image?.data?.attributes?.url}
                                                alt={altForImage}
                                                effect="blur"
                                                className={styles.image}
                                            />
                                        </div>
                                        <p className={styles.description}>{getLocalizedText(language, descriptionEn, fetchedServices?.attributes?.description)}</p>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    </div>
                </div >)
                :
                (<div className={styles.bg} key={id}>
                    <div className={styles.menuIcon} onClick={() => navigate(-1)}>
                        <StaticImage height={20} width={20} alt="back" src='../images/arrow-left.png' />
                    </div>
                    <div className={styles.infoWrapper}>
                        <div className={styles.colorWrapper}>
                            {localizations?.data?.map((loc, index) => {
                                const { title: titleEn, description: descriptionEn } = loc?.attributes;
                                return (
                                    <React.Fragment key={index}>
                                        <p className={styles.title}>
                                            {getLocalizedText(language, titleEn, title)}
                                        </p>
                                        <div className={styles.imgWrapper}>                                        <LazyLoadImage
                                            src={img}
                                            alt={altForImage}
                                            effect="blur"
                                            className={styles.image}
                                        />
                                        </div>
                                        <p className={styles.description}>{getLocalizedText(language, descriptionEn, description)}</p>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    </div>
                </div >)
            }
        </>
    )
}

const SingleServiceWithContext = (props) => (
    <LanguageProvider>
        <SingleAboutMassagesCard {...props} />
    </LanguageProvider>
);

export default SingleServiceWithContext;

export const query = graphql`
  query($url: String) {
      rest {
        aboutMassages(filters: { url: { eq: $url } }) {
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
                    updatedAt
                    altForImage
                    }
                }
        }
      }
    }
`;