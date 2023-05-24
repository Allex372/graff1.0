import React from "react";
import Dialog from '@mui/material/Dialog';

import SwiperCarousel from "../Swiper/Swiper";
import Seo from "../seo";
import { StaticImage } from "gatsby-plugin-image";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import * as styles from './ModelsDialog.module.css'

const ModelsDialog = ({ isOpenDialog, handleClose, imagesArray, isModels }) => {
    return (
        <>
            <Seo title="Graff - салон еротичного масажу у Львові" />
            <Dialog onClose={handleClose} open={isOpenDialog}
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }}>
                <div className={styles.menuIcon} style={{ zIndex: isOpenDialog && '2' }} onClick={() => handleClose()}>
                    {isOpenDialog && <StaticImage src='../../images/close-icon.png' alt="close" height={20} width={20} />}
                </div>
                <div className={styles.container}>
                    <SwiperCarousel array={imagesArray} isModels={isModels} />
                </div>
            </Dialog>
        </>
    )
}

export default ModelsDialog;