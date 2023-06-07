import React from "react";
import { Link } from 'gatsby';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import { useSliderIndex } from "../../context/sliderConext";
import { useLanguage } from "../../context/languageContext";
import { getLocalizedText } from '../helpers/translator';
import Seo from "../seo";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import * as styles from './Swiper.module.css';

const SwiperCarousel = ({ array, isService, isInterier, isModels }) => {
    const { t, language } = useLanguage();

    const inlineStyles = {
        btnStyles: {
            color: '#FDB931',
        }
    }

    const ServiceSwiperComponent = () => {
        const { changeSlide } = useSliderIndex();
        if (typeof window === "undefined") return null;
        const currentSlide = localStorage.getItem('currentSlide');

        const handleScroll = () => {
            localStorage.setItem('scroll', window.pageYOffset);
        }

        return (
            <Swiper
                onSlideChange={(e) => changeSlide(e.activeIndex)}
                initialSlide={currentSlide}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView="auto"
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className={styles.swiperContainer}
            >
                {array?.map((service) => {
                    const { title, image, localizations, category, url } = service.attributes;

                    return (
                        <SwiperSlide className={styles.swiperSlide} key={service.id}>
                            <div className={styles.cardWrapper}>
                                <div className={styles.imageWrapper}>
                                    <img
                                        src={image?.data?.attributes?.url}
                                        alt={title}
                                        effect="blur"
                                        className={styles.image}
                                    />
                                </div>
                                {localizations.data.map((loc, index) => {
                                    const { title: titleEn } = loc.attributes
                                    return (
                                        <p className={styles.title} key={index}>
                                            {getLocalizedText(language, titleEn, title)}
                                        </p>
                                    )
                                }
                                )}
                                <div onClick={() => handleScroll()}>
                                    <Link to={`/${category}/${url}`} className={styles.link}>{t('readMore')} -&gt;</Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}

                <div className={styles.sliderControler}>
                    <div className="swiper-button-prev" style={inlineStyles.btnStyles}></div>
                    <div className="swiper-button-next" style={inlineStyles.btnStyles}></div>
                </div>
            </Swiper>
        );
    };

    const LadiesSwiperComponent = () => (
        <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
            }}
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className={styles.swiperContainer}
        >
            {array?.map((image, id) => {
                // console.log(data);
                return (
                    <SwiperSlide key={id} className={styles.swiperSlide}>
                        <img
                            src={image?.attributes?.url}
                            alt="slide_image"
                            effect="blur"
                            className={styles.image}
                        />
                    </SwiperSlide>
                );
            })}
            <div className={styles.sliderControler}>
                <div className="swiper-button-prev" style={inlineStyles.btnStyles}></div>
                <div className="swiper-button-next" style={inlineStyles.btnStyles}></div>
            </div>
        </Swiper>
    );

    const InterierSwiperComponent = () => (
        <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
            }}
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className={styles.swiperContainer}
        >
            {array?.map((data) => {
                return (
                    <SwiperSlide key={data?.id} className={styles.swiperSlide}>
                        <img
                            src={data?.attributes?.url}
                            alt="galery"
                            className={styles.image}
                        />
                    </SwiperSlide>
                );
            })}
            <div className={styles.sliderControler}>
                <div className="swiper-button-prev" style={inlineStyles.btnStyles}></div>
                <div className="swiper-button-next" style={inlineStyles.btnStyles}></div>
            </div>
        </Swiper>
    );

    return (
        <>
            <Seo title="Graff - салон еротичного масажу у Львові, фото" />
            {isModels && array && <LadiesSwiperComponent />}
            {isInterier && array && <InterierSwiperComponent />}
            {isService && array && <ServiceSwiperComponent />}
        </>
    );
}

export default SwiperCarousel;