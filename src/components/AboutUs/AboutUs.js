import React, { useMemo } from "react";
import { useQuery } from 'react-query';
import axios from 'axios';
import CircularProgress from '@mui/joy/CircularProgress';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { getLocalizedText } from '../helpers/translator';
import { useLanguage } from '../../context/languageContext';

import * as styles from './About_us.module.css';

const AboutUs = () => {
    const { language } = useLanguage();

    const { isLoading, isFetching, data } = useQuery(
        'repoData',
        () =>
            axios.get(
                'https://whispering-shore-87525.herokuapp.com/api/abouts?populate=*',
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

    const Abouts = useMemo(() => (data ? data : []), [data]);


    if (isLoading || isFetching) return <CircularProgress color="neutral" className={styles.CircularProgress} />

    if (!isLoading && Abouts?.data?.length > 0) {

        const { image, localizations, text } = Abouts?.data?.[0]?.attributes;

        return (
            <>
                <div id="about" className={styles.wrapper}>
                    <div className={styles.infoWrapper}>
                        <div className={styles.infoImgWrapper}>
                            <LazyLoadImage
                                src={
                                    image?.data[0]?.attributes?.url
                                }
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
    }
};

export default AboutUs;