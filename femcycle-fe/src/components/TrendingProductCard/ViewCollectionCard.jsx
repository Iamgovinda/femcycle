import React from 'react';
import styles from './Cards.module.scss';
import viewCollection from '../../assets/TrendingProduct/collection.png';
import { Card } from '@mui/material';

const ViewCollectionCard = () => {
    return (
        <Card sx={{ minWidth: 230 }} className={styles['vc_parent']}>
            <p className={styles['snc_off']}>
                23% off in all products
            </p>
            <div className={styles["vc_bottom"]} >
                <p className={styles['shop_now']}>View Collection</p>
                <img src={viewCollection} alt="" style={{float: 'right',}} className={styles['vc_image']}/>
            </div>

        </Card>
    )
}

export default ViewCollectionCard