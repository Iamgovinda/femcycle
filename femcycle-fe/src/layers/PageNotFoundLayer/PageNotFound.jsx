import React from 'react';
import BreadCrumbCard from '../../components/BreadCrumbCard/BreadCrumbCard';
import pageNotFoundImage from '../../assets/NotFound/notFound.png';
import { Box } from '@mui/material';
import { Container } from '@mui/material';
import styles from './PageNotFound.module.scss';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <>
            <BreadCrumbCard view="Page Not Found" />
            <Container>
                <Box className={styles['parent']}>
                    <img src={pageNotFoundImage} alt="not-found" className={styles['not-found-img']}/>
                    <Box>
                        <Button className={styles['btn']}><Link to={'/'} className={styles['link']}>Back To Home</Link></Button>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default PageNotFound