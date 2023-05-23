import React from "react";
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as styles from './ServicesCard.module.css';

const ServicesCard = ({ category, title, url, image }) => {
    const img = getImage(image);

    return (
        <div className={styles.cardWrapper}>
            <div className={styles.imageWrapper}>
                <GatsbyImage
                    image={img}
                    alt={title}
                    loading="lazy"
                    className={styles.image}
                />
            </div>
            <p className={styles.title}>{title}</p>
            <Link to={`/${category}/${url}`} className={styles.link}>Читати більше -&gt;</Link>
        </div>
    );
}

export default ServicesCard;
