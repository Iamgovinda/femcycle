import React from 'react';
import styles from './Item.module.scss';
import img1 from '../../assets/Carousel/candle.png';
import chair from '../../assets/Carousel/chair.png';
import backgroundImage from '../../assets/Carousel/back.png';
import discountBoard from '../../assets/Carousel/discount.png';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';


const Item = (props) => {
    const navigate = useNavigate();
    return (
        // <div className={styles['parent']}>
        //     <div className={styles['left']}>
        //         <div className={styles['bulb']}>
        //             <img src={img1} alt="" className={styles['bulb_img']} />
        //         </div>
        //         <div className={styles['info']}>
        //             <p className={styles['top_info']}>Best Furniture For Your Castle...</p>
        //             <p className={styles['mid_info']}>Find The Eye Catching Discount Items </p>
        //             <p className={styles['bottom_info']}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus error iure et maiores deleniti est.</p>
        //             <Button className={styles['shop_now_btn']} variant="contained" onClick={()=>navigate(`/product-details/${props?.item?.uuid}`)}>Shop Now</Button>
        //         </div>
        //     </div>
        //         <div className={styles['right']}>
        //             <img src={backgroundImage} alt="backImage" className={styles['backgroundImage']} />
        //             <img src={props?.item?.images?.[0]?.file ?? chair} alt="chair" className={styles['chair']} />
        //             {/* <img src={discountBoard} alt="" className={styles['discountBoard']} /> */}
        //             <div className={styles['discount']}>
        //                 {props?.item?.discount_per}%
        //                 off     
        //             </div>
        //     </div>
        // </div>
        <Grid container className={styles['parent']}>
            <Grid item lg={7} className={styles['left']}>
                <div className={styles['bulb']}>
                <img src={img1} alt="" className={styles['bulb_img']} />
                </div>
                <div className={styles['info']}>
                <p className={styles['top_info']}>Best Furniture For Your Castle...</p>
                <p className={styles['mid_info']}>Find The Eye Catching Discount Items </p>
                <p className={styles['bottom_info']}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus error iure et maiores deleniti est.</p>
                <Button className={styles['shop_now_btn']} variant="contained" onClick={() => navigate(`/product-details/${props?.item?.uuid}`)}>Shop Now</Button>
                </div>
            </Grid>
            <Grid item lg={5}>
                <div className={styles['right']}>
                    <img src={backgroundImage} alt="backImage" className={styles['backgroundImage']} />
                    <img src={props?.item?.images?.[0]?.file ?? chair} alt="chair" className={styles['chair']} />

                    {/* <img src={discountBoard} alt="" className={styles['discountBoard']} /> */}
                    <div className={styles['discount']}>
                        {props?.item?.discount_per}%
                        off
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default Item