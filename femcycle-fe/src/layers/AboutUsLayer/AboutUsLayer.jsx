import React from 'react';
import BreadCrumbCard from '../../components/BreadCrumbCard/BreadCrumbCard';
import ClientViewCard from '../../components/ClientViewCard/ClientViewCard';
import firstOfferImage from '../../assets/OfferCard/cashback.png';
import secondOfferImage from '../../assets/OfferCard/Frame.png';
import thirdOfferImage from '../../assets/OfferCard/offer3.png';
import fourthOfferImage from '../../assets/OfferCard/offer4.png';
import { Grid, Container } from '@mui/material';
import OfferCard from '../../components/OfferCard/OfferCard';
import { Box } from '@mui/system';
import styles from './AboutUsLayer.module.scss';
import dummy from '../../assets/ClientView/contact.png';
import { Stack } from '@mui/system';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const AboutUsLayer = () => {
    const navigate = useNavigate();
    const offers = [
        {
            'image': firstOfferImage,
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.'
        },
        {
            'image': secondOfferImage,
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.'
        },
        {
            'image': thirdOfferImage,
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.'
        },
        {
            'image': fourthOfferImage,
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.'
        }
    ]
    return (
        <>
            <BreadCrumbCard view="About Us" />
            <Container>
                <Box sx={{ padding: '4rem 0rem', alignItems:'center', justifyContent:'center' }}>
                    <Grid container spacing={0}>
                        <Grid item lg={6} md={8} className={styles['dummy-image']}>
                            <img src={dummy} alt="dummy" />
                        </Grid>
                        <Grid item lg={5} md={8} display={'flex'} direction='column' justifyContent={'space-around'} spacing={1}>
                            <Stack alignItems={'center'}>
                                <p className={styles['text-1']}>Know About Our Ecomerce
                                    Business, History</p>
                                <p className={styles['text-2']}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices mattis aliquam, malesuada diam est. Malesuada sem tristique amet erat vitae eget dolor lobortis. Accumsan faucibus vitae lobortis quis bibendum quam.</p>
                            </Stack>
                            <Button className={styles['contact']} onClick={()=>navigate('/contact-us')}>Contact Us</Button>

                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <p className={styles['features-top']} >Our Features</p>
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
                </Box>
            </Container>
            <ClientViewCard />

        </>
    )
}

export default AboutUsLayer