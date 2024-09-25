import React, { useState } from 'react';
import { Grid, Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Nav/logo.png';
import styles from './FooterLayer.module.scss';
import SearchBar from '../SearchBar/SearchBar';

import { Link } from 'react-router-dom';
const FooterLayer = () => {
    const navigate = useNavigate();
    const handleClick = (text) => {
        navigate('/search', {
            state: {
                type: "category",
                text: text
            }
        })
    }
    return (
        <div className={styles['footer']}>
            <Container >
                <Grid container gap={6}>

                    <Grid item md={3}>
                        <Stack gap={4}>
                            <div className="logo">
                                <img src={logo} alt="logo" />
                            </div>
                            {/* <SearchBar /> */}
                            <div>
                                <p className={styles['info']}>Contact Info</p>
                                <p className={styles['info']}>Kalanki, Kathmandu</p>
                            </div>
                        </Stack>
                    </Grid>

                    <Grid item md={2}>
                        <p className={styles["customer-care"]}>
                            Customer Care
                        </p>
                        <p className={styles["customer-care-item"]} onClick={() => navigate('/contact-us')}>Contact</p>
                        <p className={styles["customer-care-item"]} onClick={() => navigate('/about')}>About</p>
                        <p className={styles["customer-care-item"]} onClick={() => navigate('/faq')}>FAQ</p>
                    </Grid>
                    <Grid item md={3}>
                        <p className={styles["pages"]}>
                            Pages
                        </p>
                        <p><Link to={'predict-mensuration'} className={styles["page"]}>Prediction</Link></p>
                        <p className={styles["customer-care-item"]} onClick={() => navigate('/profile')}>My Account</p>
                    </Grid>

                </Grid>
            </Container>
        </div>
    )
}

export default FooterLayer