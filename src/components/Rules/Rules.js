import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import CircularProgress from '@mui/joy/CircularProgress';

import Token from '../constants/constants';
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
                            `Bearer ${Token.access}`,
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