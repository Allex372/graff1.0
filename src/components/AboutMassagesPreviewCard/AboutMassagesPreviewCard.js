import React, { useEffect, useState } from "react";
import { graphql, useStaticQuery, Link, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import 'react-lazy-load-image-component/src/effects/blur.css';

// import Seo from "../seo";
import { getLocalizedText } from '../helpers/translator';
import { useLanguage } from '../../context/languageContext';
import { useStateContext } from "../../context/aboutMassagesProvider";
import * as styles from './AboutMassagesPreviewCard.module.css';

const AboutMassagesPreviewCard = () => {
    const { t, language } = useLanguage();
    const stateContext = useStateContext();
    const { fetchedMassages } = stateContext ? stateContext : {};
    const [isFetchedAboutMassageNew, setIsFetchedAboutMassageNew] = useState(false);

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
                                    locale
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
            {fetchedMassages?.data?.map((article) => {
                const { title, image, localizations, url, id, altForImage } = article.attributes;
                const { url: imageUrl } = image?.data?.attributes || {};

                const localizedTitles = {};
                localizations?.data?.forEach((loc) => {
                    const { locale, title } = loc.attributes;
                    localizedTitles[locale] = title;
                });

                if (title) {
                    return (
                        <>
                            <div className={styles.menuIcon} onClick={() => navigate('/')}>
                                <StaticImage height={20} width={20} alt="back" src='../../images/arrow-left.png' />
                            </div>

                            <div className={styles.wrapper} key={id}>
                                <div className={styles.imgWrapper}>
                                    {imageUrl && <img src={imageUrl} alt={altForImage} />}
                                </div>

                                <p className={styles.title}>
                                    {getLocalizedText(language, localizedTitles.en, title, localizedTitles.ru)}
                                </p>

                                <Link to={`/about-massages/${url}`} className={styles.link}>{t('readMore')} -&gt;</Link>
                            </div>
                        </>
                    )
                }
            })}
        </>
    );
};

export default AboutMassagesPreviewCard;
