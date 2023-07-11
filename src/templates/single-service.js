import React, { useState, useEffect } from "react";
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
  const [fetchedServices, setFetchedServices] = useState(null);
  const [isFetchedServiceNew, setIsFetchedServiceNew] = useState(false);

  const Service = data?.rest?.services?.data;

  useEffect(() => {
    fetchFetchData();
  }, []);

  const fetchFetchData = async () => {
    try {
      const token = '24da86087f116291ec96ad43dab23b303ab9953b419db27224d705a0241d95806bf312d2019a0b39046444ea84e06fcfcfb764fdc28ec15d5a40f24368c343ea99c9c413aa61aa28cd472da495c88e21486f4769d9199cb861a55ef9b89af31d80ee1e8983e6adb6e0b05ab2b45bd9d56b617d96d16b69a7ca9bd059e17d5f27';
      const response = await fetch(`https://vast-fjord-05237.herokuapp.com/api/services/${+Service[0].id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setFetchedServices(data.data);
    } catch (error) {
      setFetchedServices([]);
    }
  };

  useEffect(() => {
    if (fetchedServices && Service.length) {
      const matchedService = Service.find((service) => service.id == fetchedServices.id);
      if (matchedService && matchedService.attributes.updatedAt !== fetchedServices.attributes.updatedAt) {
        setIsFetchedServiceNew(true);
      }
    }
  }, [fetchedServices, Service]);

  if (!Service || Service.length === 0) {
    return null;
  }

  const { image, localizations, text, title, point1, point2, point3, point4, point5, point6, point7, point8, point9,
    time1, time2, time3, girl1time1price, girl1time2price, girl1time3price, girl2time1price, girl2time2price, girl2time3price } = Service?.[0]?.attributes;

  const img = image?.data?.attributes?.url

  return (
    <>
      <Seo title="Graff - еротичний масаж Львів" />
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

                {isFetchedServiceNew ?
                  <>
                    <div className={styles.pricingTable}>
                      <table className={styles.table}>
                        <tbody>
                          {fetchedServices?.attributes?.time1 && <tr className={styles.row}>
                            <td className={styles.cell}>
                              <div className={styles.tableTitle}>{fetchedServices?.attributes?.time1}</div>
                            </td>
                            {fetchedServices?.attributes?.girl1time1price && <td className={styles.cell}>
                              <div className={styles.girls}>1 girl</div>
                              <div className={styles.price}>{fetchedServices?.attributes?.girl1time1price}</div>
                            </td>}
                            {fetchedServices?.attributes?.girl2time1price && <td className={styles.cell}>
                              <div className={styles.girls}>2 girls</div>
                              <div className={styles.price}>{fetchedServices?.attributes?.girl2time1price && fetchedServices?.attributes?.girl2time1price}</div>
                            </td>}
                          </tr>}

                          {fetchedServices?.attributes?.time2 && <tr className={styles.row}>
                            <td className={styles.cell}>
                              <div className={styles.tableTitle}>{fetchedServices?.attributes?.time2}</div>
                            </td>
                            {fetchedServices?.attributes?.girl1time2price && <td className={styles.cell}>
                              <div className={styles.girls}>1 girl</div>
                              <div className={styles.price}>{fetchedServices?.attributes?.girl1time2price && fetchedServices?.attributes?.girl1time2price}</div>
                            </td>}
                            {fetchedServices?.attributes?.girl2time2price && <td className={styles.cell}>
                              <div className={styles.girls}>2 girls</div>
                              <div className={styles.price}>{fetchedServices?.attributes?.girl2time2price && fetchedServices?.attributes?.girl2time2price}</div>
                            </td>}
                          </tr>}

                          {fetchedServices?.attributes?.time3 && <tr className={styles.row}>
                            <td className={styles.cell}>
                              <div className={styles.tableTitle}>{fetchedServices?.attributes?.time3}</div>
                            </td>
                            {fetchedServices?.attributes?.girl1time3price && <td className={styles.cell}>
                              <div className={styles.girls}>1 girl</div>
                              <div className={styles.price}>{fetchedServices?.attributes?.girl1time3price && fetchedServices?.attributes?.girl1time3price}</div>
                            </td>}
                            {fetchedServices?.attributes?.girl2time3price && <td className={styles.cell}>
                              <div className={styles.girls}>2 girls</div>
                              <div className={styles.price}>{fetchedServices?.attributes?.girl2time3price && fetchedServices?.attributes?.girl2time3price}</div>
                            </td>}
                          </tr>}

                        </tbody>
                      </table>
                    </div>
                  </>
                  :
                  <>
                    <div className={styles.pricingTable}>
                      <table className={styles.table}>
                        <tbody>
                          {time1 && <tr className={styles.row}>
                            <td className={styles.cell}>
                              <div className={styles.tableTitle}>{time1}</div>
                            </td>
                            {girl1time1price && <td className={styles.cell}>
                              <div className={styles.girls}>1 girl</div>
                              <div className={styles.price}>{girl1time1price}</div>
                            </td>}
                            {girl2time1price && <td className={styles.cell}>
                              <div className={styles.girls}>2 girls</div>
                              <div className={styles.price}>{girl2time1price && girl2time1price}</div>
                            </td>}
                          </tr>}

                          {time2 && <tr className={styles.row}>
                            <td className={styles.cell}>
                              <div className={styles.tableTitle}>{time2}</div>
                            </td>
                            {girl1time2price && <td className={styles.cell}>
                              <div className={styles.girls}>1 girl</div>
                              <div className={styles.price}>{girl1time2price && girl1time2price}</div>
                            </td>}
                            {girl2time2price && <td className={styles.cell}>
                              <div className={styles.girls}>2 girls</div>
                              <div className={styles.price}>{girl2time2price && girl2time2price}</div>
                            </td>}
                          </tr>}

                          {time3 && <tr className={styles.row}>
                            <td className={styles.cell}>
                              <div className={styles.tableTitle}>{time3}</div>
                            </td>
                            {girl1time3price && <td className={styles.cell}>
                              <div className={styles.girls}>1 girl</div>
                              <div className={styles.price}>{girl1time3price && girl1time3price}</div>
                            </td>}
                            {girl2time3price && <td className={styles.cell}>
                              <div className={styles.girls}>2 girls</div>
                              <div className={styles.price}>{girl2time3price && girl2time3price}</div>
                            </td>}
                          </tr>}

                        </tbody>
                      </table>
                    </div>


                  </>
                }
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
            id
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
              time1
              time2 
              time3 
              girl1time1price 
              girl1time2price
              girl1time3price
              girl2time1price 
              girl2time2price 
              girl2time3price
              updatedAt
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