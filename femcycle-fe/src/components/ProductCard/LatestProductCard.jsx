import React from 'react';
import styles from './LatestProductCard.module.scss';
import latest_product from '../../assets/ProductCard/latest_product.png';
import { useNavigate } from "react-router-dom";
import { post, remove } from '../../API/axios';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddToCartModal from '../AddToCartModal/AddToCartModal';
import LoginModal from '../loginModal/LoginModal';

const LatestProductCard = (props) => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    // const viewDetails = (uuid) => {
    //     navigate('/product-details/' + uuid);
    // }

    const [wished, setWished] = React.useState(
        !props?.item?.in_wishlist ? false : true
    );
    const [wishListUUID, setWishListUUID] = React.useState(
        props?.item?.in_wishlist ? props?.item?.in_wishlist : ""
    );
    const isAuthed = localStorage.getItem("token");

    const addToWishList = (product) => {
        post(`/wishlist/`, { product: product }).then((response) => {
            if (response?.status === 200) {
                setWishListUUID(response.data.uuid);
                setWished(true);
                props?.setIsLoading(true);
            }
        });
    };
    const removeFromWishList = (product) => {
        remove(`/wishlist/${product}/`).then((response) => {
            if (response?.status === 204) {
                setWished(false);
                props?.setIsLoading(true);
            }
        });
    };
    return (
        // onClick={() => viewDetails(props?.item?.uuid)}
        <div className={styles["parent"]}>
            <div className={styles["top"]}>
                <img src={props?.item?.images[0]?.file ?? latest_product} alt="latest product" style={{ maxHeight: '11rem', maxWidth: '11rem' }} onClick={()=>navigate(`/product-details/${props?.item?.uuid}`)}/>
                <div className={styles["icons"]}>
                <span>
                    <ShoppingCartOutlinedIcon
                        className={styles["icon"]}
                        onClick={() => setOpen(true)}
                    />
                </span>
                {isAuthed &&
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
            </div>
            </div>
            <div className={styles["bottom"]}>
                <p>{props?.item?.name}</p>
                <div className={styles["bottom_right"]}>
                    <p className={styles['current']}>Rs {props?.item?.base_price - props?.item?.discount_price}</p>
                    <p className={styles['initial']}>Rs {props?.item?.base_price}</p>
                </div>
            </div>
        
            {isAuthed ? (
                <AddToCartModal open={open} setOpen={setOpen} item={props?.item} />
            ) : (
                <LoginModal open={open} setOpen={setOpen} />
            )}
        </div>
    )
}

export default LatestProductCard