import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import CircularProgress from '@mui/joy/CircularProgress';

import { getLocalizedText } from '../helpers/translator';
import { useLanguage } from '../../context/languageContext';
import * as styles from './Rules.module.css';

const Rules = () => {
    const { t, language } = useLanguage();

    const { isLoading, isFetching, data } = useQuery(
        'rulesData',
        () =>
            axios.get(
                'https://whispering-shore-87525.herokuapp.com/api/rules?populate=*',
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

    const Rules = useMemo(() => (data ? data : []), [data]);

    if (isLoading || isFetching) return <CircularProgress color="neutral" className={styles.CircularProgress} />

    return (
        <div className={styles.wrapper} id='rules'>
            <p className={styles.title}>{t('rules')}</p>

            <div className={styles.infoWrapper}>
                {
                    Rules?.data?.map((el) => {
                        const {
                            description,
                            localizations,
                            rule1,
                            rule2,
                            rule3,
                            rule4,
                            rule5,
                            rule6,
                            rule7
                        } = el.attributes;
                        return (
                            <React.Fragment key={el.id}>
                                {
                                    localizations?.data?.map((loc, index) => {
                                        const {
                                            description: descriptionEn,
                                            rule1: rule1En,
                                            rule2: rule2En,
                                            rule3: rule3En,
                                            rule4: rule4En,
                                            rule5: rule5En,
                                            rule6: rule6En,
                                            rule7: rule7En
                                        } = loc?.attributes;
                                        return (
                                            <React.Fragment key={index}>
                                                <p className={styles.text}>
                                                    {getLocalizedText(language, descriptionEn, description)}
                                                </p>

                                                <ul className={styles.rulesList}>
                                                    <li className={styles.textPlayfair}>
                                                        {getLocalizedText(language, rule1En, rule1)}
                                                    </li>
                                                    <li className={styles.textPlayfair}>{getLocalizedText(language, rule2En, rule2)}</li>
                                                    <li className={styles.textPlayfair}>{getLocalizedText(language, rule3En, rule3)}</li>
                                                    <li className={styles.textPlayfair}>{getLocalizedText(language, rule4En, rule4)}</li>
                                                    <li className={styles.textPlayfair}>{getLocalizedText(language, rule5En, rule5)}</li>
                                                    <li className={styles.textPlayfair}>{getLocalizedText(language, rule6En, rule6)}</li>
                                                    <li className={styles.textPlayfair}>{getLocalizedText(language, rule7En, rule7)}</li>
                                                </ul>
                                            </React.Fragment>
                                        )
                                    }
                                    )}
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Rules;