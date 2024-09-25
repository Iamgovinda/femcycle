import React from 'react';
import styles from './OfferCard.module.scss';

const OfferCard = (props) => {
    return (
        <div className={styles["parent"]}>
            <div className="top">
                <img src={props.item.image} alt="" />
            </div>
            <p className={styles['offer_text']}>24/7 Support</p>
            <p className={styles['offer_desc']}>{props.item.description}</p>
        </div>
    )
}

export default OfferCard