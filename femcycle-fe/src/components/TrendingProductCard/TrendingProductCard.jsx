import React from 'react';

// import Button from '@mui/material/Button';
import styles from './TrendingProductCard.module.scss';
import trendingProduct from '../../assets/TrendingProduct/trending_product.png';
import { useNavigate } from 'react-router-dom';

const TrendingProductCard = (props) => {
    const navigate = useNavigate()
    return (
        <div className={styles["main"]}>
            <div className={styles["parent"]} onClick={()=>navigate('/product-details/'+props?.item?.uuid)}>
                <div className={styles["img"]}>
                    <img src={props?.item?.images?.[0]?.file ?? trendingProduct} alt="trending-product" className={styles['trending-image']}/>
                </div>
                <p className={styles["name"]}>{props.item.name}</p>
                <div className={styles["price"]}>
                    <p className={styles["discounted"]}>Rs {props?.item?.base_price - props?.item?.discount_price}</p>
                    <p className={styles["initial"]}>Rs{props?.item?.base_price}</p>
                </div>
            </div>
        </div>
    )
}

export default TrendingProductCard