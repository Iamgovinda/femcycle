import React from 'react';
import { Box } from '@mui/system';
import { Container } from '@mui/system';
import { Typography } from '@mui/material';
import styles from "./BreadCrumbCard.module.scss";

const BreadCrumbCard = (props) => {
    return (
        <Box sx={{ backgroundColor: "#F6F5FF", minHeight: "220px", display: "flex", alignItems: "center" }}>
            <Container sx={{ alignItem: "flex-start", display: "flex", gap: "10px", flexDirection: "column" }} >
                <Typography className={styles['text-1']}>
                    {props.view} 
                </Typography>
                <Box>
                    <span className={styles['text-2']}>Home. </span><span className={styles['text-2']}>Page. </span><span className={styles['text-3']}>{props.view}</span>
                </Box>
            </Container>
        </Box>
    )
}

export default BreadCrumbCard