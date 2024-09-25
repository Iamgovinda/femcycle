import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import shopGridImage from "../../assets/Shops/shopImage.png";
import { Box } from '@mui/material';
import styles from './ShopGridCard.module.scss';
import { useNavigate } from 'react-router-dom';

export default function ShopGridCard(props) {
    const navigate = useNavigate();
    return (
        <Card sx={{ maxWidth: 345 }} className={styles['parent']} onClick={()=>navigate(`/product-details/${props?.item?.uuid}`)}>
            <Box className={styles['shop-image-parent']}>
                <img src={props?.item?.images[0]?.file ?? shopGridImage} alt="" style={{maxHeight:'11.3rem'}}/>
            </Box>
            <CardContent className={styles['text-parent']}>
                <Typography className={styles['text-top']}>
                    {props?.item?.name}
                </Typography>
                <Box className={styles['box-parent']}>
                    <Box className={styles['box-1']}></Box>
                    <Box className={styles['box-2']}></Box>
                    <Box className={styles['box-3']}></Box>
                </Box>
                <Typography className={styles['text-bottom']}>
                    <span className={styles['span-1']}>Rs {props?.item?.base_price - props?.item?.discount_price?? 0} </span><span className={styles['span-2']}>Rs {props?.item?.base_price}</span>
                </Typography>
            </CardContent>
        </Card>
    );
}