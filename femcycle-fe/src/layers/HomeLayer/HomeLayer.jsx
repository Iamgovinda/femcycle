import React, { useEffect, useState } from 'react';
import styles from './HomeLayer.module.scss';
import MyCarousel from '../../components/Carousel/Carousel';
import { Container } from '@mui/system';
import OfferCard from '../../components/OfferCard/OfferCard';
import firstOfferImage from '../../assets/OfferCard/cashback.png';
import secondOfferImage from '../../assets/OfferCard/Frame.png';
import thirdOfferImage from '../../assets/OfferCard/offer3.png';
import fourthOfferImage from '../../assets/OfferCard/offer4.png';
// import TopProductLayer from '../TopProductLayer/TopProductLayer';
import BlogImage from '../../assets/BlogCard/Blog.png';
import { Grid } from '@mui/material';

const HomeLayer = () => {



  //eslint-disable-next-line

  const offers = [
    {
      'image': firstOfferImage,
      'description': ' Every Time Available.'
    },
    {
      'image': secondOfferImage,
      'description': 'Every Time Available.'
    },
    {
      'image': thirdOfferImage,
      'description': 'Every Time Available.'
    },
    {
      'image': fourthOfferImage,
      'description': 'Every Time Available.'
    }
  ]

  return (
    <>
      <Container>
        <div className={styles["offer_section"]}>
          <p className={styles["offer_text"]}>Remember when your next period!</p>
          <Grid container alignItems='center' justifyContent='center' spacing={4}>
            {
              offers.map((item, index) => {
                return (
                  <Grid item key={index} lg={3} md={6} sm={6}>
                    <OfferCard
                      item={item}
                    />
                  </Grid>
                )
              })
            }
          </Grid>
        </div>
      </Container>

    </>
  )
}

export default HomeLayer