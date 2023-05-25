import React from 'react';
import { graphql, useStaticQuery } from "gatsby";

import Seo from '../seo';
import { getLocalizedText } from '../helpers/translator';
import { useLanguage } from '../../context/languageContext';
import * as styles from './Rules.module.css';

const Rules = () => {
    const { t, language } = useLanguage();

    const data = useStaticQuery(graphql`
        query {
            rest {
                rules {
                    data {
                        attributes {
                        rule7
                        rule6
                        rule5
                        rule4
                        rule3
                        rule2
                        rule1
                        description
                            localizations {
                                data {
                                    attributes {
                                        rule7
                                        rule6
                                        rule5
                                        rule4
                                        rule3
                                        rule2
                                        rule1
                                        description
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    const Rules = data?.rest?.rules?.data;

    if (!Rules || Rules.length === 0) {
        return null;
    }

    return (
        <>
            <Seo title="Graff - салон еротичного масажу у Львові, правила відвідування" />
            <div className={styles.wrapper} id='rules'>
                <p className={styles.title}>{t('rules')}</p>

                <div className={styles.infoWrapper}>
                    {
                        Rules?.map((el) => {
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
        </>
    )
}

export default Rules;

