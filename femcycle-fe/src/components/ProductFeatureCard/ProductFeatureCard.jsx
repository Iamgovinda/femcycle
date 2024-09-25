import React from 'react';
import { Grid, Container } from '@mui/material';
import sampleImage from '../../assets/ProductFeatureCard/sofa.png';
import styles from './ProductFeatureCard.module.scss';
import { Button } from '@mui/material';
const ProductFeatureCard = () => {
    return (
        <div className={styles["parent"]}>
            <Container>
                <Grid container justifyContent="center" columnGap={2}>
                    <Grid item md={6}>
                        <img src={sampleImage} alt="" className={styles['img']}/>
                    </Grid>
                    <Grid item md={5} className={styles['feature-section']}>

                        <p className={styles['feature-topic']}>Unique Features Of leatest &
                            Trending Poducts</p>
                        <div>
                            <div className={styles['feature-section-items']}>
                                <div className={styles['feature-section-bullet1']}></div>
                                <p className={styles['features']}>All frames constructed with hardwood solids and laminates</p>
                            </div>
                            <div className={styles['feature-section-items']}>
                                <div className={styles['feature-section-bullet2']}></div>
                                <p className={styles['features']}>Reinforced with double wood dowels, glue, screw</p>
                            </div>
                            <div className={styles['feature-section-items']}>
                                <div className={styles['feature-section-bullet3']}></div>
                                <p className={styles['features']}>Arms, backs and seats are structurally reinforced</p>
                            </div>
                        </div>
                        {/* <ul className={styles['feature-section-items-parent']}>
                                <li className={styles['feature-section-items']}><p>All frames constructed with hardwood solids and laminates</p></li>
                                <li className={styles['feature-section-items']}><p>Reinforced with double wood dowels, glue, screw - nails corner
                                    blocks and machine nails</p></li>
                                <li className={styles['feature-section-items']}><p>Arms, backs and seats are structurally reinforced</p></li>
                            </ul>
                            */}
                        <div className={styles["btn-section"]}>
                            <Button style={{ backgroundColor: "#FB2E86", width: "163px", height: "50px" }} variant="contained">Add to Cart</Button>
                            <div>
                                <p className={styles['name']}>B&B Italian Sofa </p>
                                <p className={styles['price']}>$32.00</p>
                            </div>
                        </div>

                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default ProductFeatureCard