import React from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import styles from './ClientViewCard.module.scss';
import clientView from '../../assets/ClientView/Client.png';
import { Container } from '@mui/system';
const ClientViewCard = () => {
    return (
        <>
            <Box sx={{ backgroundColor: '#FBFBFF', padding: '2rem', margin: '3rem 0rem' }}>
                <Container className={styles['parent']}>
                    <Typography className={styles['text-1']} >Our Client Say!</Typography>
                    <Box display={'flex'} gap={2} className={styles['info-box']}>
                        <img src={clientView} alt="" />
                        <img src={clientView} alt="" />
                        <img src={clientView} alt="" />
                    </Box>
                    <Box>
                        <Typography className={styles['name']}>Selina Gomez</Typography>
                        <Typography className={styles['post']}>Ceo At Webecy Digital</Typography>
                    </Box>
                    <Typography className={styles['description']} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non duis ultrices quam vel dui sollicitudin aliquet id arcu. Nam vitae a enim nunc, sed sapien egestas ac nam. Tristique ultrices dolor aliquam lacus volutpat praesent.s</Typography>
                </Container>
            </Box>
        </>
    )
}

export default ClientViewCard