import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import Seo from "../seo";
import { getLocalizedText } from '../helpers/translator';
import { useLanguage } from '../../context/languageContext';

import * as styles from './About_us.module.css';

const AboutUs = () => {
    const { language } = useLanguage();

    const data = useStaticQuery(graphql`
        query {
            rest {
                abouts {
                    data {
                        attributes {
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
                                    title
                                    text
                                }
                            }
                        }
                        text
                        title
                        }
                    }
                }
            }
        }
    `);

    const Abouts = data?.rest?.abouts?.data;

    if (!Abouts || Abouts.length === 0) {
        return null;
    }

    const { image, localizations, text } = Abouts?.[0]?.attributes;

    const img = image?.data?.[0]?.attributes?.url

    return (
        <>
            <Seo title="Graff - найкращий салон еротичного масажу у Львові" />
            <div id="about" className={styles.wrapper}>
                <div className={styles.infoWrapper}>
                    <div className={styles.infoImgWrapper}>
                        <LazyLoadImage
                            src={img}
                            alt="img"
                            effect="blur"
                        />
                    </div>
                    <div className={styles.textWrapper}>
                        <p className={styles.descriptionTitle}>«Graff»</p>
                        {localizations?.data?.map((loc, index) => {
                            const { text: textEn } = loc.attributes;
                            return (
                                <p key={index} className={styles.description}>{getLocalizedText(language, textEn, text)}</p>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;
