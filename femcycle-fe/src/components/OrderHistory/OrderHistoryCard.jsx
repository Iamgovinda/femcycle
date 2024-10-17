import React, { useEffect, useState } from 'react';
import styles from './OrderHistoryCard.module.scss';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { get } from '../../API/axios';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

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
                <TableContainer component={Paper} >
                    <Table>
                        {/* Table Head */}
                        <TableHead>
                            <TableRow>
                                <TableCell>SN</TableCell>
                                <TableCell>BMI</TableCell>
                                <TableCell>Ovulation Pred</TableCell>
                                <TableCell>Mens Pred</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>

                        {/* Table Body */}
                        <TableBody>
                            {
                                recentPredictions.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item?.bmi}</TableCell>
                                        <TableCell>{item?.predicted_next_ovulation_date}</TableCell> {/* Replace with actual data if needed */}
                                        <TableCell>{item?.predicted_next_mensuration_date}</TableCell> {/* Replace with actual data if needed */}
                                        <TableCell>{item?.status}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </>
    )
}

export default PredictionHistory