import React from "react";
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import CircularProgress from '@mui/joy/CircularProgress';
import axios from "axios";

import Token from "../constants/constants";
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

    const { isLoading, isFetching, data } = useQuery(
        'interiersData',
        () =>
            axios.get(
                'https://whispering-shore-87525.herokuapp.com/api/interiers?populate=*',
                {
                    headers: {
                        Authorization:
                            `Bearer ${Token.access}`,
                    },
                }
            ).then(response => response.data),
        {
            refetchOnWindowFocus: false,
            staleTime: 120000,
            cacheTime: 600000,
        }
    );

    const Interiers = useMemo(() => (data ? data : []), [data]);

    if (isLoading || isFetching) return <CircularProgress color="neutral" className={styles.CircularProgress} />

    if (!isLoading && Interiers?.data?.length > 0) {
        const { image } = Interiers?.data?.[0]?.attributes;
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
}

export default InterierGalery;

