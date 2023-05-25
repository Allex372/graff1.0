import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import Seo from "../../seo";
import { useLanguage } from "../../../context/languageContext";
import { getLocalizedText } from '../../helpers/translator';
import * as styles from './PriceTable.module.css';

const PricingTable = () => {
    const { t, language } = useLanguage();

    const data = useStaticQuery(graphql`
        query {
            rest {
                prices {
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

    const Prices = data?.rest?.prices?.data;

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
                            {Prices?.map((data, index) => {
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

