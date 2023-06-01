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

  console.log(Service?.[0]?.attributes);

  const { image, localizations, text, title, point1, point2, point3, point4, point5, point6, point7, point8, point9 } = Service?.[0]?.attributes;

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
            const { title: titleEn, text: textEn, point1: point1En, point2: point2En, point3: point3En, point4: point4En, point5: point5En, point6: point6En, point7: point7En, point8: point8En, point9: point9En } = loc?.attributes;
            return (
              <React.Fragment key={index}>
                <p className={styles.title}>
                  {getLocalizedText(language, titleEn, title)}
                </p>
                <p className={styles.description}>{getLocalizedText(language, textEn, text)}</p>
                <div className={styles.ulWrapper}>
                  <ul className={styles.serviceList}>
                    {point1 && <li className={styles.liText}>{getLocalizedText(language, point1En, point1)}</li>}
                    {point2 && <li className={styles.liText}>{getLocalizedText(language, point2En, point2)}</li>}
                    {point3 && <li className={styles.liText}>{getLocalizedText(language, point3En, point3)}</li>}
                    {point4 && <li className={styles.liText}>{getLocalizedText(language, point4En, point4)}</li>}
                    {point5 && <li className={styles.liText}>{getLocalizedText(language, point5En, point5)}</li>}
                    {point6 && <li className={styles.liText}>{getLocalizedText(language, point6En, point6)}</li>}
                    {point7 && <li className={styles.liText}>{getLocalizedText(language, point7En, point7)}</li>}
                    {point8 && <li className={styles.liText}>{getLocalizedText(language, point8En, point8)}</li>}
                    {point9 && <li className={styles.liText}>{getLocalizedText(language, point9En, point9)}</li>}
                  </ul>
                </div>
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
              point1
              point2
              point3
              point4
              point5
              point6
              point7
              point8
              point9
              localizations {
                data {
                  attributes {
                    text
                    title
                    point1
                    point2
                    point3
                    point4
                    point5
                    point6
                    point7
                    point8
                    point9
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