import React from 'react';
import Card from '@mui/material/Card';
import styles from './Cards.module.scss';
import shopNowImage from '../../assets/TrendingProduct/shop_now_image.png';


const ShopNowCard = () => {
    return (
        <Card sx={{ minWidth: 230 }} className={styles['snc_parent']}>
            <p className={styles['snc_off']}>
                23% off in all products
            </p>
            <div className={styles["snc_bottom"]} >
                <p className={styles['shop_now']}>Shop Now</p>

                <img src={shopNowImage} alt="" style={{float: 'right',}} className={styles['shop_now_img']}/>
            </div>

        </Card>
    )
}

export default ShopNowCard