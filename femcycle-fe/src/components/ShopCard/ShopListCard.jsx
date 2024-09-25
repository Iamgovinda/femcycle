import React from 'react';
import { Box } from '@mui/system';
import shopGridImage from "../../assets/Shops/shopImage.png";
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import styles from './ShopListCard.module.scss';
// import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from "@mui/icons-material/Favorite";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Paper } from '@mui/material';
import { Rating } from '@mui/material';
import AddToCartModal from '../AddToCartModal/AddToCartModal';
import LoginModal from '../loginModal/LoginModal';
import { post, remove } from '../../API/axios';

const ShopListCard = (props) => {

    const [open, setOpen] = React.useState(false);
    const isAuthed = localStorage.getItem("token");

    const [wished, setWished] = React.useState(
        !props?.item?.in_wishlist ? false : true
    );
    const [wishListUUID, setWishListUUID] = React.useState(
        props?.item?.in_wishlist ? props?.item?.in_wishlist : ""
    );

    const addToWishList = (product) => {
        post(`/wishlist/`, { product: product }).then((response) => {
            if (response?.status === 200) {
                setWishListUUID(response.data.uuid);
                setWished(true);
                props?.setIsLoading(!props?.isLoading);
            }
        });
    };
    const removeFromWishList = (product) => {
        remove(`/wishlist/${product}/`).then((response) => {
            if (response?.status === 204) {
                setWished(false);
                props?.setIsLoading(!props?.isLoading);
            }
        });
    };

    return (
        <Grid container columnSpacing={4} marginBottom={5} className={styles['parent']}>
            <Grid item lg={4} display="flex" justifyContent="center" style={{ paddingLeft: '0 !important' }}>
                <Paper children={<img src={props?.item?.images[0]?.file ?? shopGridImage} alt="shop_image" style={{ maxWidth: '20rem' }} />} elevation={2} square={true} className={styles['paper']} />
            </Grid>
            <Grid item lg={8}>
                <Box className={styles['box-parent']}>
                    <Box display={'flex'} gap={'5px'} justifyContent='flex-start' alignItems={'center'}>
                        <Typography className={styles["text-1"]}>{props?.item?.name}</Typography>
                        <Box className={styles["box-1"]}></Box>
                        <Box className={styles["box-2"]}></Box>
                        <Box className={styles["box-3"]}></Box>
                    </Box>
                    <Box display={'flex'} alignItems={"center"}>
                        <span className={styles["price-discounted"]}>Rs {props?.item?.base_price - props?.item?.discount_price} </span> <span className={styles["price-initial"]}>Rs {props?.item?.base_price}</span>
                        <Rating
                            name="disabled"
                            value={(props?.item?.total_ratings > 0) ? props?.item?.total_ratings : 1}
                            color='red'
                            disabled
                            style={{ marginLeft: '5px' }}
                        />
                    </Box>
                    <Box>
                        <Typography className={styles['prod-description']}>
                            {props?.item?.description}
                        </Typography>
                    </Box>
                    <Box display={"flex"} gap={5}>
                        <Box className={styles['icon-box']}><ShoppingCartIcon onClick={() => setOpen(true)} className={styles['add-to-cart-icon']} /></Box>
                        <Box className={styles['icon-box']}>
                            {(isAuthed && !props?.wishlist) &&
                                (wished ? (
                                    <span>
                                        <FavoriteIcon
                                            className={styles["icon"]}
                                            onClick={() => removeFromWishList(wishListUUID)}
                                            style={{ color: "red" }}
                                        />
                                    </span>
                                ) : (
                                    <span>
                                        <FavoriteBorderIcon
                                            className={styles["icon"]}
                                            onClick={() => addToWishList(props?.item?.uuid)}
                                            
                                        />
                                    </span>
                                ))}
                        </Box>

                        {isAuthed ? (
                            <AddToCartModal open={open} setOpen={setOpen} item={props?.item} />
                        ) : (
                            <LoginModal open={open} setOpen={setOpen} />
                        )}
                    </Box>
                </Box>
            </Grid>
        </Grid>

    )
}

export default ShopListCard