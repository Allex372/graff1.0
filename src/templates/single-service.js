import React from "react";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { navigate } from 'gatsby';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import Seo from "../components/seo";
import { getLocalizedText } from '../components/helpers/translator';
import { useLanguage } from "../context/languageContext";
import LanguageProvider from '../context/languageContext';

import * as styles from './single-service.module.css';

const SingleService = ({ data }) => {
  const { language } = useLanguage();

  const Service = data?.rest?.services?.data;

  if (!Service || Service.length === 0) {
    return null;
  }

  const { image, localizations, text, title } = Service?.[0]?.attributes;

  const img = image?.data?.attributes?.url

  return (
    <>
      <Seo title="Graff - салон еротичного масажу у Львові, найкращі послуги" />
      <div className={styles.bg}>
        <div className={styles.menuIcon} onClick={() => navigate(-1)}>
          <StaticImage height={20} width={20} alt="back" src='../images/arrow-left.png' />
        </div>
        <div className={styles.infoWrapper}>
          <LazyLoadImage
            src={img}
            alt="Graff салон еротичного масажу, послуги"
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
    </>
  )
}

const SingleServiceWithContext = (props) => (
  <LanguageProvider>
    <SingleService {...props} />
  </LanguageProvider>
);

export default SingleServiceWithContext;

export const query = graphql`
  query($url: String) {
      rest {
        services(filters: { url: { eq: $url } }) {
          data {
            attributes {
              url
              category
              text
              title
              localizations {
                data {
                  attributes {
                    text
                    title
                  }
                }
              }
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
`;