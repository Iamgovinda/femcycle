import React from 'react';
import miniImage from '../../assets/TrendingProduct/mini_image.png';
import styles from './Cards.module.scss';
const MiniTrendingCard = () => {
  return (
    <div className={styles["mt_parent"]}>
        <div className={styles["img_top"]}>
            <img src={miniImage} alt="mini_image" />
        </div>
        <div>
            <p className={styles['top']}>Executive Seat chair</p>
            <p className={styles['bottom']}>$32.00</p>
        </div>
    </div>
  )
}

export default MiniTrendingCard