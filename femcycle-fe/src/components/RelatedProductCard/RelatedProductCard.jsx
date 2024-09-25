import { Container } from "@mui/system";
import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "./RelatedProduct.module.scss";
import StarOutline from "@mui/icons-material/StarOutline";
import { Box } from "@mui/system";
import cloth from "../../assets/ProductDetailCard/cloth.png";

const RelatedProductCard = (props) => {
    return (
        <Container>
            <Card sx={{ maxWidth: 360 }}>
                <CardMedia sx={{ minHeight: 400 }} image={props?.item?.images[0]?.file ?? cloth} title="green iguana" />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        className={styles["product-name"]}
                    >
                        <span>{props?.item?.name}</span>{" "}

                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        className={styles["product-price"]}
                    >
                        Rs {props?.item?.base_price-props?.item?.discount_price}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default RelatedProductCard;
