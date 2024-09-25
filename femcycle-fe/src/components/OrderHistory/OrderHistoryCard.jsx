import React, { useEffect, useState } from 'react';
import styles from './OrderHistoryCard.module.scss';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { get } from '../../API/axios';
import { useNavigate } from 'react-router-dom';


const PredictionHistory = (props) => {
    const [recentPredictions, setrecentPredictions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        get(`/user/${props?.username}/get-user-data`).then((response) => {
            if (response.status === 200) {
                setrecentPredictions(response.data.slice(0, 4));
            }
        })
    }, [])
    return (
        <>
            <Box className={styles['profile-info-main']}>
                <p className={styles['profile-info-title']} >My Prediction Histories <span className={styles['text-view-all-orders']} onClick={() => { navigate('/order-history') }}>View all predictions</span></p>
                <Grid container className={styles['info']} spacing={1}>
                    <Grid item className={styles['info-title']} lg={1}>
                        <p>SN</p>
                    </Grid>
                    <Grid item className={styles['info-title']} lg={3}>
                        <p>Cycle Length</p>
                    </Grid>
                    <Grid item className={styles['info-title']} lg={2}>
                        <p>High Days</p>
                    </Grid>
                    <Grid item className={styles['info-title']} lg={1.5}>
                        <p>BMI</p>
                    </Grid>
                    <Grid item className={styles['info-title']} lg={2}>
                        <p>Prediction</p>
                    </Grid>
                    <Grid item className={styles['info-title']} lg={2}>
                        <p>Status</p>
                    </Grid>
                </Grid>
                <Grid container className={styles['info']} spacing={1}>
                    {
                        recentPredictions.map((item, index) => {
                            return (
                                <>
                                    <Grid item className={styles['info-detail']} lg={1}>
                                        <p>{index + 1}</p>
                                    </Grid>
                                    <Grid item className={styles['info-detail']} lg={3}>
                                        <p>{item?.age}</p>
                                    </Grid>
                                    <Grid item className={styles['info-detail']} lg={2}>
                                        <p>{item?.length_of_cycle}</p>
                                    </Grid>
                                    <Grid item className={styles['info-detail']} lg={1.5}>
                                        <p>{item?.total_num_of_high_days}</p>
                                    </Grid>
                                    <Grid item className={styles['info-detail']} lg={2}>
                                        <p>0</p>
                                    </Grid>
                                    <Grid item className={styles['info-detail']} lg={2}>
                                        <p>Good</p>
                                    </Grid>
                                </>
                            )
                        })
                    }
                </Grid>
            </Box>

        </>
    )
}

export default PredictionHistory