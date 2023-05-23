import React, { useMemo, useEffect } from "react";
import { useQuery } from 'react-query';
import CircularProgress from '@mui/joy/CircularProgress';
import axios from "axios";

import Token from "../constants/constants";
import SwiperCarousel from "../Swiper/Swiper";
import { useLanguage } from "../../context/languageContext";
import PricingTable from "./PriceTable/PrisingTable";
import * as styles from './Services.module.css';

const Services = () => {
  const { t } = useLanguage();

  useEffect(() => {
    const pixelToScroll = localStorage.getItem('scroll');
    if (pixelToScroll) {
      window.scrollTo(0, pixelToScroll);
    };
  });

  const { isLoading, isFetching, data } = useQuery(
    'serviceData',
    () =>
      axios.get(
        'https://whispering-shore-87525.herokuapp.com/api/services?populate=*',
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

  const Services = useMemo(() => (data ? data : []), [data]);

  if (isLoading || isFetching) return <CircularProgress color="neutral" className={styles.CircularProgress} />

  return (
    <div className={styles.wrapper} id="services">
      <p className={styles.title}>{t('services')}</p>

      <div className={styles.container}>
        <SwiperCarousel array={Services?.data} isService={true} />
        <div className={styles.tableWrapper}>
          <PricingTable />
        </div>
      </div>
    </div>
  );
}

export default Services;