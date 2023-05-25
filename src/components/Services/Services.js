import React, { useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";

import SwiperCarousel from "../Swiper/Swiper";
import Seo from "../seo";
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

  const data = useStaticQuery(graphql`
        query {
            rest {
              services {
                data {
                  id
                  attributes {
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

  const Services = data?.rest?.services?.data;

  if (!Services || Services.length === 0) {
    return null;
  }

  return (
    <>
      <Seo title="Graff - салон еротичного масажу, наші послуги" />
      <div className={styles.wrapper} id="services">
        <p className={styles.title}>{t('services')}</p>

        <div className={styles.container}>
          <SwiperCarousel array={Services} isService={true} />
          <div className={styles.tableWrapper}>
            <PricingTable />
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;

