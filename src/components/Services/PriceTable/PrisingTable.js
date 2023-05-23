import React, { useMemo } from "react";
import { useQuery } from 'react-query';
import CircularProgress from '@mui/joy/CircularProgress';
import axios from "axios";

import { useLanguage } from "../../../context/languageContext";
import { getLocalizedText } from '../../helpers/translator';
import * as styles from './PriceTable.module.css';

const PricingTable = () => {
    const { t, language } = useLanguage();

    const { isLoading, isFetching, data } = useQuery(
        'priceData',
        () =>
            axios.get(
                'https://whispering-shore-87525.herokuapp.com/api/prices?populate=*',
                {
                    headers: {
                        Authorization:
                            'Bearer a841dc75e9e097f8d4c9c8f9ee35ccd2a04a38d43c93a0162b962bb0059715d700cd888f1da1907c16c48e2e2e927c3ed2b73d026366116b1de8adfb879dd78cb0737ccc3a44ba5e348c4ab9d8b1e47257d59809be54bc488c62f59888e6137347f49721b85199f9881f57fe1d0bba33407d82410ded87aa8432639b84404224',
                    },
                }
            ).then(response => response.data),
        {
            refetchOnWindowFocus: false,
            staleTime: 120000,
            cacheTime: 600000,
        }
    );

    const Prices = useMemo(() => (data ? data : []), [data]);

    if (isLoading || isFetching) return <CircularProgress color="neutral" className={styles.CircularProgress} />

    return (
        <>
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
                            {Prices?.data?.map((data, index) => {
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
