import React, { useState } from "react";
import { Box, Container } from "@mui/system";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import styles from "./ProductDescriptionCard.module.scss";
import { Rating } from "@mui/material";
// import ReactECharts from 'echarts-for-react';
const ProductDescriptionCard = (props) => {
    const [tab, setTab] = useState("additional_info");
    const option2 = {
        tooltip: {
            trigger: "item",
        },
        legend: {
            show: false,
        },
        series: [
            {
                name: "Product Ratings",
                color: ["#461bf2", "#7407e8", "#05d9f5", "#05f535", "#f50529"],
                type: "pie",
                radius: ["90%", "70%"],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 5,
                    borderColor: "#fff",
                    borderWidth: 2,
                },
                label: {
                    show: true,
                    position: "center",
                    formatter: [`{a|${props.productRatings?.overall_ratings?.total ?? 0}}`, `{b|Reviews}`].join("\n"),
                    rich: {
                        a: {
                            fontSize: 36,
                            fontWeight: 600,
                        },
                        b: {
                            fontSize: 24,
                            color: "#808080",
                        },
                    },
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: "18",
                        fontWeight: "bold",
                    },
                },
                labelLine: {
                    show: false,
                },
                data: [
                    { value: props.productRatings?.overall_ratings?.five_count, name: "Five Stars" },
                    { value: props.productRatings?.overall_ratings?.four_count, name: "Four Stars" },
                    { value: props.productRatings?.overall_ratings?.three_count, name: "Three Stars" },
                    { value: props.productRatings?.overall_ratings?.two_count, name: "Two Stars" },
                    { value: props.productRatings?.overall_ratings?.one_count, name: "One Star" },

                ],
            },
        ],
    };

    return (
        <Box className={styles["parent"]}>
            <Container>
                <Box className={styles["top-texts"]}>
                    <Typography
                        className={tab === 'additional_info' ? `${styles['active-tab']} ${styles["texts-1"]}` : styles["texts-1"]}
                        onClick={() => setTab("additional_info")}
                    >
                        Reviews & Ratings
                    </Typography>
                    <Typography
                        className={tab === 'description' ? `${styles['active-tab']} ${styles["texts-1"]}` : styles["texts-1"]}
                        onClick={() => {
                            setTab("description");
                        }}
                    >
                        Description
                    </Typography>
                    <Typography
                        className={tab === 'features' ? `${styles['active-tab']} ${styles["texts-1"]}` : styles["texts-1"]}
                        onClick={() => setTab("features")}
                    >
                        Features
                    </Typography>

                </Box>
                {/* <Box>
                        <Typography className={styles['mid-top']}>Varius tempor.</Typography>
                        <Typography className={styles['texts-2']}>Aliquam dis vulputate vulputate integer sagittis. Faucibus dolor ornare faucibus vel sed et eleifend habitasse amet. Montes, mauris varius ac est bibendum. Scelerisque a, risus ac ante. Velit consectetur neque, elit, aliquet. Non varius proin sed urna, egestas consequat laoreet diam tincidunt. Magna eget faucibus cras justo, tortor sed donec tempus. Imperdiet consequat, quis diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .</Typography>
                    </Box> */}
                <Box>
                    {tab === "description" && (
                        <>
                            <Typography className={styles["mid-top"]}>
                                Descriptions
                            </Typography>
                            <Box className={styles["description"]}>
                                {props?.productDetail?.description}
                            </Box>
                        </>
                    )
                    }
                    {
                        tab === "features" && (

                            <>
                                <Typography className={styles["mid-top"]}>
                                    Features
                                </Typography>
                                <ul>
                                    {
                                        props?.productDetail?.features?.map((item) => {
                                            return (
                                                <li className={styles['texts-2']}>{item?.title}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </>
                        )
                    }

                    {
                        tab === "additional_info" && (

                            <>
                                <Typography className={styles["mid-top"]}>
                                    Reviews & Ratings
                                </Typography>
                                <Grid container>
                                    {/* // <>
                                            //     <p className={styles['texts-2']}>Base Price: Rs {props?.productDetail?.base_price}</p>
                                            //     <p className={styles['texts-2']}>Discount Price: Rs {props?.productDetail?.discount_price}</p>
                                            //     <p className={styles['texts-2']}>Code: {props?.productDetail?.code}</p>
                                            //     <p className={styles['texts-2']}>Ratings: {props?.productDetail?.total_ratings}</p>
                                            // </> */}
                                    <Grid item lg={3}>
                                        <div className={styles['rating-box']}>
                                            <Rating
                                                name="size-large"
                                                value={5}
                                                readOnly
                                                size="large"

                                            />
                                            <p className={styles['rating-review']}>{props.productRatings?.overall_ratings?.five_count} Reviews</p>

                                        </div>
                                        <div className={styles['rating-box']}>
                                            <Rating
                                                name="size-large"
                                                value={4}
                                                readOnly
                                                size="large"

                                            />
                                            <p className={styles['rating-review']}>{props.productRatings?.overall_ratings?.four_count} Reviews</p>

                                        </div>
                                        <div className={styles['rating-box']}>
                                            <Rating
                                                name="size-large"
                                                value={3}
                                                readOnly
                                                size="large"
                                            />
                                            <p className={styles['rating-review']}>{props.productRatings?.overall_ratings?.three_count} Reviews</p>

                                        </div>
                                        <div className={styles['rating-box']}>
                                            <Rating
                                                name="size-large"
                                                value={2}
                                                readOnly
                                                size="large"

                                            />
                                            <p className={styles['rating-review']}>{props.productRatings?.overall_ratings?.two_count} Reviews</p>

                                        </div>
                                        <div className={styles['rating-box']}>
                                            <Rating
                                                name="size-large"
                                                value={1}
                                                readOnly
                                                size="large"

                                            />
                                            <p className={styles['rating-review']}>{props.productRatings?.overall_ratings?.one_count} Reviews</p>

                                        </div>
                                    </Grid>
                                    <Grid item lg={4}>
                                        <div className={styles['chart']}>
                                            {/* <ReactECharts option={option2} /> */}
                                        </div>
                                    </Grid>

                                </Grid>


                            </>)
                    }
                    {/* <ul>
                            <li className={styles['texts-2']}>Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .</li>
                            <li className={styles['texts-2']}>Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .</li>
                            <li className={styles['texts-2']}>Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .</li>
                            <li className={styles['texts-2']}>Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .</li>
                            <li className={styles['texts-2']}>Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .</li>
                        </ul> */}
                </Box>
            </Container>
        </Box>
    );
};

export default ProductDescriptionCard;
