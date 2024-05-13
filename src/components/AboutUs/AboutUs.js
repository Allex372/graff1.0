import React, { useEffect, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import "react-lazy-load-image-component/src/effects/blur.css";

import Seo from "../seo";
import { getLocalizedText } from "../helpers/translator";
import { useLanguage } from "../../context/languageContext";

import video from "../../images/video.mp4";

import * as styles from "./About_us.module.css";

const AboutUs = () => {
  const { language } = useLanguage();
  const [fetchedServices, setFetchedServices] = useState(null);
  const [isFetchedModelNew, setIsFetchedModelNew] = useState(false);

  useEffect(() => {
    fetchFetchData();
  }, []);

  const data = useStaticQuery(graphql`
    query {
      rest {
        abouts {
          data {
            id
            attributes {
              updatedAt
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
              text
              title
            }
          }
        }
      }
    }
  `);

  const Abouts = data?.rest?.abouts?.data;

  const fetchFetchData = async () => {
    try {
      const token =
        "24da86087f116291ec96ad43dab23b303ab9953b419db27224d705a0241d95806bf312d2019a0b39046444ea84e06fcfcfb764fdc28ec15d5a40f24368c343ea99c9c413aa61aa28cd472da495c88e21486f4769d9199cb861a55ef9b89af31d80ee1e8983e6adb6e0b05ab2b45bd9d56b617d96d16b69a7ca9bd059e17d5f27";
      const response = await fetch(
        "https://vast-fjord-05237.herokuapp.com/api/abouts?populate=*",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setFetchedServices(data.data);
    } catch (error) {
      setFetchedServices([]);
    }
  };

  useEffect(() => {
    if (fetchedServices && fetchedServices?.length && Abouts.length) {
      if (
        fetchedServices.length >= Abouts.length ||
        fetchedServices.length <= Abouts.length
      ) {
        setIsFetchedModelNew(true);
      }
      fetchedServices?.map((fetchedService) => {
        const matchedService = Abouts.find(
          (service) => service.id == fetchedService.id
        );
        if (
          matchedService &&
          matchedService.attributes.updatedAt !==
            fetchedService.attributes.updatedAt
        ) {
          setIsFetchedModelNew(true);
        }
        return fetchedService;
      });
    }
  }, [fetchedServices, Abouts]);

  if (!Abouts || Abouts.length === 0) {
    return null;
  }

  const { localizations, text } = Abouts?.[0]?.attributes;

  return (
    <>
      <Seo title="Graff - еротичний масаж Львів" />
      <div id="about" className={styles.wrapper}>
        {isFetchedModelNew && fetchedServices?.length ? (
          fetchedServices.map((el) => {
            const { localizations, text } = el?.attributes;
            return (
              <div className={styles.infoWrapper}>
                <div className={styles.videoWrapper}>
                  <video
                    src={video}
                    className={styles.infoImgWrapper}
                    playsInline
                    loop
                    muted
                    autoPlay={true}
                    controls
                  ></video>
                </div>
                <div className={styles.textWrapper}>
                  <p className={styles.descriptionTitle}>«Graff»</p>
                  {localizations?.data?.map((loc, index) => {
                    let textEn = "";
                    let textRu = "";
                    if (loc.attributes.locale === "en") {
                      textEn = loc.attributes.text;
                    } else if (loc.attributes.locale === "ru") {
                      textRu = loc.attributes.text;
                    }
                    return (
                      <p key={index} className={styles.description}>
                        {getLocalizedText(language, textEn, text, textRu)}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.infoWrapper}>
            <div className={styles.videoWrapper}>
              <video
                src={video}
                className={styles.infoImgWrapper}
                playsInline
                loop
                muted
                autoPlay={true}
                controls
              ></video>
            </div>
            <div className={styles.textWrapper}>
              <p className={styles.descriptionTitle}>«Graff»</p>
              {localizations?.data?.map((loc, index) => {
                const { text: textEn } = loc.attributes;
                return (
                  <p key={index} className={styles.description}>
                    {getLocalizedText(language, textEn, text)}
                  </p>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AboutUs;
