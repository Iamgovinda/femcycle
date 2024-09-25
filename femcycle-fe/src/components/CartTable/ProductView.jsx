import React from 'react';
import { Box } from '@mui/system';
import { Container } from '@mui/material';
import { Stack } from '@mui/material';
import product from '../../assets/Cart/product.png';
import { Typography } from '@mui/material';
import styles from './ProductView.module.scss';
import CancelIcon from '@mui/icons-material/Cancel';
// import {Button} from '@mui/material';

const ProductView = (props) => {
    return (
        <Container className={styles['main-container']}>
            <Box className={styles['image-box']}>
                <img src={props?.item?.image ?? product} alt="product" />
                {props?.displayCloseBtn && (
                    
                    <CancelIcon fontSize='sm' className={styles['cross-icon']} />
                )}
                
            </Box>
            <Stack>
                <Typography className={styles['product-name']}>{props.item?.name}</Typography>
                <Typography className={styles['product-common']}>Company: {props.item?.manufacturer ?? "ABC company"}</Typography>
                <Typography className={styles['product-common']}>Code: {props.item?.code ?? "hiuwrenjkf2"}</Typography>
            </Stack>
        </Container>
    )
}

export default ProductView