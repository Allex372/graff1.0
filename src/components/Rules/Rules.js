import React from 'react';

import Seo from '../seo';
import { useLanguage } from '../../context/languageContext';
import * as styles from './Rules.module.css';

const Rules = () => {
    const { t } = useLanguage();

    return (
        <>
            <Seo title="Graff - еротичний масаж Львів" />
            <div className={styles.wrapper} id='rules'>
                <p className={styles.title}>{t('rules')}</p>
                <div className={styles.container}>
                    <ul className={styles.rulesList}>
                        <li>{t('rule1')}</li>
                        <li>{t('rule2')}</li>
                        <li>{t('rule3')}</li>
                        <li>{t('rule4')}</li>
                        <li>{t('rule5')}</li>
                    </ul>

                    <p>{t('ruleP1')}</p>

                    <p className={styles.advantages}>{t('ruleP2')}</p>
                    <ul className={styles.advantagesList}>
                        <li><span className={styles.highlight}>{t('subRuleTitle1')}</span> - {t('subRule1')}</li>
                        <li><span className={styles.highlight}>{t('subRuleTitle2')}</span> - {t('subRule2')}</li>
                        <li><span className={styles.highlight}>{t('subRuleTitle3')}</span> - {t('subRule3')}</li>
                        <li><span className={styles.highlight}>{t('subRuleTitle4')}</span></li>
                        <li><span className={styles.highlight}>{t('subRuleTitle5')}</span></li>
                        <li><span className={styles.highlight}>{t('subRuleTitle6')}</span> - {t('subRule6')}</li>
                        <li><span className={styles.highlight}>{t('subRuleTitle7')}</span> - {t('subRule7')}</li>
                        <li><span className={styles.highlight}>{t('subRuleTitle8')}</span> - {t('subRule8')}</li>
                        <li><span className={styles.highlight}>{t('subRuleTitle9')}</span> - {t('subRule9')}</li>
                    </ul>
                </div>

            </div>
        </>
    )
}

export default Rules;

