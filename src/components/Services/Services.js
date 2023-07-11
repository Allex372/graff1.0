import React, { useEffect, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";

import SwiperCarousel from "../Swiper/Swiper";
import Seo from "../seo";
import { useLanguage } from "../../context/languageContext";
import PricingTable from "./PriceTable/PrisingTable";
import * as styles from './Services.module.css';

const Services = () => {
  const { t } = useLanguage();
  const [fetchedServices, setFetchedServices] = useState(null);
  const [isFetchedModelNew, setIsFetchedModelNew] = useState(false);

  useEffect(() => {
    fetchFetchData();
  }, []);

  useEffect(() => {
    const pixelToScroll = localStorage.getItem('scroll');
    if (pixelToScroll) {
      window.scrollTo(0, pixelToScroll);
    };
  });

  const data = useStaticQuery(graphql`
        query {
            rest {
              services(pagination: {limit: 20}) {
                data {
                  id
                  attributes {
                    updatedAt
                    url
                    title
                    text
                    category
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
                  }
                }
              }
            }
        }
    `);

  const fetchFetchData = async () => {
    try {
      const token = '24da86087f116291ec96ad43dab23b303ab9953b419db27224d705a0241d95806bf312d2019a0b39046444ea84e06fcfcfb764fdc28ec15d5a40f24368c343ea99c9c413aa61aa28cd472da495c88e21486f4769d9199cb861a55ef9b89af31d80ee1e8983e6adb6e0b05ab2b45bd9d56b617d96d16b69a7ca9bd059e17d5f27';
      const response = await fetch('https://vast-fjord-05237.herokuapp.com/api/services?populate=*', {
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


  const Services = data?.rest?.services?.data;

  useEffect(() => {
    if (fetchedServices && fetchedServices?.length && Services.length) {
      if (fetchedServices.length >= Services.length || fetchedServices.length <= Services.length) {
        setIsFetchedModelNew(true);
      }
      fetchedServices?.map((fetchedService) => {
        const matchedService = Services.find((service) => service.id == fetchedService.id);
        if (matchedService && matchedService.attributes.updatedAt !== fetchedService.attributes.updatedAt) {
          setIsFetchedModelNew(true);
        }
        return fetchedService;
      });
    }
  }, [fetchedServices, Services]);

  if (!Services || Services.length === 0) {
    return null;
  }

  return (
    <>
      <Seo title="Graff - еротичний масаж Львів" />
      <div className={styles.wrapper} id="services">
        <p className={styles.title}>{t('services')}</p>

        <div className={styles.container}>
          <SwiperCarousel array={(isFetchedModelNew && fetchedServices.length) ? fetchedServices : Services} isService={true} />
          <div className={styles.tableWrapper}>
            <PricingTable />
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;

