import React, { useMemo, useEffect } from "react";
import { useQuery } from 'react-query';
import CircularProgress from '@mui/joy/CircularProgress';
import axios from "axios";

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