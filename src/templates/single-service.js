import React, { useMemo } from "react";
import { useQuery } from 'react-query';
import { StaticImage } from "gatsby-plugin-image";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { navigate } from 'gatsby';
import CircularProgress from '@mui/joy/CircularProgress';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { useLanguage } from "../context/languageContext";
import LanguageProvider from '../context/languageContext';

import * as styles from './single-service.module.css';

const queryClient = new QueryClient();

const SingleService = ({ pageContext: { id } }) => {
  const { language } = useLanguage();

  const { isLoading, isFetching, data } = useQuery(
    'serviceData',
    () =>
      fetch(
        `https://whispering-shore-87525.herokuapp.com/api/services/${id}?populate=*`, {
        headers: {
          Authorization: 'Bearer a841dc75e9e097f8d4c9c8f9ee35ccd2a04a38d43c93a0162b962bb0059715d700cd888f1da1907c16c48e2e2e927c3ed2b73d026366116b1de8adfb879dd78cb0737ccc3a44ba5e348c4ab9d8b1e47257d59809be54bc488c62f59888e6137347f49721b85199f9881f57fe1d0bba33407d82410ded87aa8432639b84404224',
        },
      }
      ).then((response) => response.json()),
    {
      refetchOnWindowFocus: false
    }
  );

  const Service = useMemo(() => (data ? data : []), [data]);

  if (isLoading || isFetching) return <CircularProgress color="neutral" className={styles.CircularProgress} />

  return (
    <div className={styles.bg}>
      <div className={styles.menuIcon} onClick={() => navigate(-1)}>
        <StaticImage height={20} width={20} alt="back" src='../images/arrow-left.png' />
      </div>
      <div className={styles.infoWrapper}>
        <LazyLoadImage
          src={Service?.data?.attributes?.image?.data?.attributes?.url}
          alt={Service?.data?.attributes?.title}
          effect="blur"
          className={styles.image}
        />
        <div className={styles.imageWrapper}>
        </div>
        {Service?.data?.attributes?.localizations?.data?.map((loc, index) => {
          return (
            <React.Fragment key={index}>
              <p className={styles.title}>
                {language === 'en' ? loc?.attributes?.title : Service?.data?.attributes?.title}
              </p>
              <p className={styles.description}>{language === 'en' ? loc?.attributes?.text : Service?.data?.attributes?.text}</p>
            </React.Fragment>
          )
        })}
      </div>
    </div >
  )
}

const SingleServiceWithContext = (props) => (
  <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <SingleService {...props} />
    </QueryClientProvider>
  </LanguageProvider>
);

export default SingleServiceWithContext;