import React from 'react';
import styles from './TopProductCard.module.scss';
import product from '../../assets/TopProductCard/top_image.png';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const TopProductCard = (props) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
      navigate('/search', {
        state: {
          type: "category",
          text: props?.items?.title
        }
      })
  }
    return (
        <Container>
            <div className={styles["main"]} onClick={(e)=>handleClick(e)}>
                <div className={styles["top"]}>
                    <img src={props?.items?.image?.file ?? product} alt="product" className={styles['cat-img']}/>
                </div>
                <p className={styles['mid']}>{props?.items?.title}</p>
                <p className={styles['bottom']}>Available: {props?.items?.products_count}</p>
            </div>
        </Container>
    )
}

export default TopProductCard