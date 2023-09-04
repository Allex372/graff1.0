import React, { useEffect, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import axios from "axios";

import Seo from "../../seo";
import { useLanguage } from "../../../context/languageContext";
import { getLocalizedText } from '../../helpers/translator';
import * as styles from './PriceTable.module.css';

const PricingTable = () => {
    const { t, language } = useLanguage();
    const [fetchedPrices, setFetchedPrices] = useState(null);
    const [isFetchedModelNew, setIsFetchedModelNew] = useState(false);

    useEffect(() => {
        fetchFetchData();
    }, []);

    const data = useStaticQuery(graphql`
        query {
            rest {
                prices(pagination: {limit: 20}) {
                    data {
                        attributes {
                        title
                        time3
                        time2
                        time1
                        girl3time3price
                        girl2time2price
                        girl2time1price
                        girl1time3price
                        girl1time2price
                        girl1time1price
                            localizations {
                                data {
                                    attributes {
                                        title
                                        time3
                                        time2
                                        time1
                                        girl3time3price
                                        girl2time2price
                                        girl2time1price
                                        girl1time3price
                                        girl1time2price
                                        girl1time1price
                                        updatedAt
                                    }
                                }
                            }
                        }
                        id
                    }
                }
            }
        }
    `);

    const fetchFetchData = async () => {
        try {
            const token = '24da86087f116291ec96ad43dab23b303ab9953b419db27224d705a0241d95806bf312d2019a0b39046444ea84e06fcfcfb764fdc28ec15d5a40f24368c343ea99c9c413aa61aa28cd472da495c88e21486f4769d9199cb861a55ef9b89af31d80ee1e8983e6adb6e0b05ab2b45bd9d56b617d96d16b69a7ca9bd059e17d5f27';
            const response = await fetch('https://vast-fjord-05237.herokuapp.com/api/prices?populate=*', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setFetchedPrices(data.data);
        } catch (error) {
            // Обробка помилки, наприклад, встановлення пустого масиву для fetchedModels
            setFetchedPrices([]);
            console.error('Помилка при отриманні даних:', error);
        }
    };

    const Prices = data?.rest?.prices?.data;

    useEffect(() => {
        if (fetchedPrices && fetchedPrices?.length && Prices.length) {
            fetchedPrices?.map((fetchedPrice) => {
                const matchedService = Prices.find((price) => price.id == fetchedPrice.id);
                if (matchedService && matchedService.attributes.updatedAt !== fetchedPrice.attributes.updatedAt) {
                    setIsFetchedModelNew(true);
                }
                return fetchedPrices;
            });
        }
    }, [fetchedPrices, Prices]);

    if (!Prices || Prices.length === 0) {
        return null;
    }

    return (
        <>
            <Seo title="Graff - еротичний масаж Львів" />
            <p className={styles.title}>{t('price')}</p>

            <div className={styles.shareWrapper}>
                <p className={styles.shareTitle}>{t('share')}</p>
                <div className={styles.shareListContainer}>
                    <ul className={styles.shareList}>
                        <li>{t('share1')}</li>
                        <li>{t('share2')}</li>
                        <li>{t('share3')}</li>
                        <li>{t('share4')}</li>
                        <li>{t('share5')}</li>
                        <li>{t('share6')}</li>
                    </ul>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <div className={styles.tblHeader}>
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <thead>
                            <tr>
                                <th aria-hidden="true"></th>
                                <th>Час</th>
                                <th>1 дівчина</th>
                                <th>2 дівчини</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className={styles.tblContent}>
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <tbody>
                            {(isFetchedModelNew && fetchedPrices.length) ?
                                fetchedPrices?.map((data, index) => {
                                    const {
                                        girl1time1price,
                                        girl1time2price,
                                        girl1time3price,
                                        girl2time1price,
                                        girl2time2price,
                                        girl3time3price,
                                        localizations,
                                        time1,
                                        time2,
                                        time3,
                                        title
                                    } = data?.attributes;

                                    const localizedTitles = {};
                                    localizations?.data?.forEach((loc) => {
                                        const { locale, title } = loc.attributes;
                                        localizedTitles[locale] = title;
                                    });

                                    return (
                                        <tr key={index}>
                                            <td className={styles.imperial}>
                                                {getLocalizedText(language, localizedTitles.en, title, localizedTitles.ru)}
                                            </td>
                                            <td>
                                                <p>{time1}</p>
                                                <p>{time2}</p>
                                                <p>{time3}</p>
                                            </td>
                                            <td>
                                                <p>{girl1time1price}</p>
                                                <p>{girl1time2price}</p>
                                                <p>{girl1time3price}</p>
                                            </td>
                                            <td>
                                                <p>{girl2time1price}</p>
                                                <p>{girl2time2price}</p>
                                                <p>{girl3time3price}</p>
                                            </td>
                                        </tr>
                                    )
                                })
                                : Prices?.map((data, index) => {
                                    const {
                                        girl1time1price,
                                        girl1time2price,
                                        girl1time3price,
                                        girl2time1price,
                                        girl2time2price,
                                        girl3time3price,
                                        localizations,
                                        time1,
                                        time2,
                                        time3,
                                        title
                                    } = data?.attributes;

                                    const localizedTitles = {};
                                    localizations?.data?.forEach((loc) => {
                                        const { locale, title } = loc.attributes;
                                        localizedTitles[locale] = title;
                                    });

                                    return (
                                        <tr key={index}>
                                            <td className={styles.imperial}>
                                                {getLocalizedText(language, localizedTitles.en, title, localizedTitles.ru)}
                                            </td>
                                            <td>
                                                <p>{time1}</p>
                                                <p>{time2}</p>
                                                <p>{time3}</p>
                                            </td>
                                            <td>
                                                <p>{girl1time1price}</p>
                                                <p>{girl1time2price}</p>
                                                <p>{girl1time3price}</p>
                                            </td>
                                            <td>
                                                <p>{girl2time1price}</p>
                                                <p>{girl2time2price}</p>
                                                <p>{girl3time3price}</p>
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default PricingTable;

