import React, { useMemo } from "react";
import { useQuery } from 'react-query';
import { StaticImage } from "gatsby-plugin-image";
import axios from "axios";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { navigate } from 'gatsby';
import CircularProgress from '@mui/joy/CircularProgress';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import Token from "../components/constants/constants";
import { getLocalizedText } from '../components/helpers/translator';
import { useLanguage } from "../context/languageContext";
import LanguageProvider from '../context/languageContext';

import * as styles from './single-service.module.css';

const queryClient = new QueryClient();

const SingleService = ({ pageContext: { id } }) => {
  const { language } = useLanguage();

  const { isLoading, isFetching, data } = useQuery(
    'oneServiceData',
    () =>
      axios.get(
        `https://whispering-shore-87525.herokuapp.com/api/services/${id}?populate=*`,
        {
          headers: {
            Authorization:
              `Bearer ${Token.access}`,
          },
        }
      ).then(response => response.data),
    {
      refetchOnWindowFocus: false,
    }
  );

  const Service = useMemo(() => (data ? data : []), [data]);

  if (isLoading || isFetching) return <CircularProgress color="neutral" className={styles.CircularProgress} />

  if (!isLoading || !isFetching) {
    const { localizations, image, title, text } = Service?.data?.attributes;
    const { url } = image?.data?.attributes;

    return (
      <div className={styles.bg}>
        <div className={styles.menuIcon} onClick={() => navigate(-1)}>
          <StaticImage height={20} width={20} alt="back" src='../images/arrow-left.png' />
        </div>
        <div className={styles.infoWrapper}>
          <LazyLoadImage
            src={url}
            alt={title}
            effect="blur"
            className={styles.image}
          />
          <div className={styles.imageWrapper}>
          </div>
          {localizations?.data?.map((loc, index) => {
            const { title: titleEn, text: textEn } = loc?.attributes;
            return (
              <React.Fragment key={index}>
                <p className={styles.title}>
                  {getLocalizedText(language, titleEn, title)}
                </p>
                <p className={styles.description}>{getLocalizedText(language, textEn, text)}</p>
              </React.Fragment>
            )
          })}
        </div>
      </div >
    )
  }
}

const SingleServiceWithContext = (props) => (
  <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <SingleService {...props} />
    </QueryClientProvider>
  </LanguageProvider>
);

export default SingleServiceWithContext;