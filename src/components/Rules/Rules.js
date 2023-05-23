import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import CircularProgress from '@mui/joy/CircularProgress';

import { useLanguage } from '../../context/languageContext';
import * as styles from './Rules.module.css';

const Rules = () => {
    const { t, language } = useLanguage();

    const { isLoading, isFetching, data } = useQuery(
        'rulesData',
        () =>
            fetch(
                'https://whispering-shore-87525.herokuapp.com/api/rules?populate=*', {
                headers: {
                    Authorization: 'Bearer a841dc75e9e097f8d4c9c8f9ee35ccd2a04a38d43c93a0162b962bb0059715d700cd888f1da1907c16c48e2e2e927c3ed2b73d026366116b1de8adfb879dd78cb0737ccc3a44ba5e348c4ab9d8b1e47257d59809be54bc488c62f59888e6137347f49721b85199f9881f57fe1d0bba33407d82410ded87aa8432639b84404224',
                },
            }).then((response) => response.json()),
        {
            refetchOnWindowFocus: false
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
                            title,
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
                                        return (
                                            <React.Fragment key={index}>
                                                <p className={styles.text}>
                                                    {language === 'en' ? loc.attributes.description : description}
                                                </p>

                                                <ul className={styles.rulesList}>
                                                    <li className={styles.textPlayfair}>
                                                        {language === 'en' ? loc.attributes.rule1 : rule1}
                                                    </li>
                                                    <li className={styles.textPlayfair}>{language === 'en' ? loc.attributes.rule2 : rule2}</li>
                                                    <li className={styles.textPlayfair}>{language === 'en' ? loc.attributes.rule3 : rule3}</li>
                                                    <li className={styles.textPlayfair}>{language === 'en' ? loc.attributes.rule4 : rule4}</li>
                                                    <li className={styles.textPlayfair}>{language === 'en' ? loc.attributes.rule5 : rule5}</li>
                                                    <li className={styles.textPlayfair}>{language === 'en' ? loc.attributes.rule6 : rule6}</li>
                                                    <li className={styles.textPlayfair}>{language === 'en' ? loc.attributes.rule7 : rule7}</li>
                                                </ul>
                                            </React.Fragment>
                                        )
                                    }
                                    )}
                            </React.Fragment>
                        )
                    })
                }
                {/* {

                    Rules?.data && Rules?.data[0]?.attributes?.localizations?.data?.map((loc, index) => {
                        return (
                            <React.Fragment key={index}>
                                <p className={styles.text}>
                                    {language === 'en' ? loc.attributes.description : description.data.description}
                                </p>

                                <ul className={styles.rulesList}>
                                    <li className={styles.textPlayfair}>
                                        {language === 'en' ? loc.attributes.rule1 : rule1.data.rule1}
                                    </li>
                                    <li className={styles.textPlayfair}>{language === 'en' ? loc.attributes.rule2 : rule2.data.rule2}</li>
                                    <li className={styles.textPlayfair}>{language === 'en' ? loc.attributes.rule3 : rule3.data.rule3}</li>
                                    <li className={styles.textPlayfair}>{language === 'en' ? loc.attributes.rule4 : rule4.data.rule4}</li>
                                    <li className={styles.textPlayfair}>{language === 'en' ? loc.attributes.rule5 : rule5.data.rule5}</li>
                                    <li className={styles.textPlayfair}>{language === 'en' ? loc.attributes.rule6 : rule6.data.rule6}</li>
                                    <li className={styles.textPlayfair}>{language === 'en' ? loc.attributes.rule7 : rule7.data.rule7}</li>
                                </ul>
                            </React.Fragment>
                        )
                    })} */}
            </div>
        </div>
    )
}

export default Rules;