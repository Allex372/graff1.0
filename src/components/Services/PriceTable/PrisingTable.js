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
            const token = '571ed7986473215e45d999825cca0187c80a0561cf3246a38e6aa437a408bda689eacd923909bdebf75b17ae696f35208f876bc02fb3e7479f20c89e4d3711e66bfa7795d9b8a2f8122f4d8f9a63e2d306259f4048eb8048a7d27fadfde000139d1909b1abd9bde84980162a303658a65e18346446b6e5c19e42631ec1a6aeaa';
            const response = await fetch('https://whispering-shore-87525.herokuapp.com/api/prices?populate=*', {
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
            <Seo title="Graff - салон еротичного масажу, ціни наших послуг" />
            <p className={styles.title}>{t('price')}</p>
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

                                    return (
                                        <tr key={index}>
                                            {localizations?.data?.map((loc, index) => {
                                                const { title: titleEn } = loc.attributes;
                                                return (
                                                    <td className={styles.imperial} key={index}>
                                                        {getLocalizedText(language, titleEn, title)}
                                                    </td>
                                                )
                                            }
                                            )}
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

                                    return (
                                        <tr key={index}>
                                            {localizations?.data?.map((loc, index) => {
                                                const { title: titleEn } = loc.attributes;
                                                return (
                                                    <td className={styles.imperial} key={index}>
                                                        {getLocalizedText(language, titleEn, title)}
                                                    </td>
                                                )
                                            }
                                            )}
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

