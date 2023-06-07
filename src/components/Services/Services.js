import React, { useEffect, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import axios from "axios";

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
      const token = '571ed7986473215e45d999825cca0187c80a0561cf3246a38e6aa437a408bda689eacd923909bdebf75b17ae696f35208f876bc02fb3e7479f20c89e4d3711e66bfa7795d9b8a2f8122f4d8f9a63e2d306259f4048eb8048a7d27fadfde000139d1909b1abd9bde84980162a303658a65e18346446b6e5c19e42631ec1a6aeaa';
      const response = await fetch('https://whispering-shore-87525.herokuapp.com/api/services?populate=*', {
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
      <Seo title="Graff - салон еротичного масажу, наші послуги" />
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

