import React from "react";
import styles from "./FeaturedProductCard.module.scss";
import product from "../../assets/ProductCard/product.png";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddToCartModal from "../AddToCartModal/AddToCartModal";
import { post, remove } from "../../API/axios";
import LoginModal from "../loginModal/LoginModal";

const FeaturedProductCard = (props) => {
  const [open, setOpen] = React.useState(false);
  const [wished, setWished] = React.useState(
    !props?.items?.in_wishlist ? false : true
  );
  const [wishListUUID, setWishListUUID] = React.useState(
    props?.items?.in_wishlist ? props?.items?.in_wishlist : ""
  );
  const isAuthed = localStorage.getItem("token");

  const navigate = useNavigate();
  const viewDetails = (uuid) => {
    navigate("/product-details/" + uuid);
  };
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
    <>
      <div className={styles["parent"]}>
        <div className={styles["top"]}>
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
                    onClick={() => addToWishList(props?.items?.uuid)}
                  />
                </span>
              ))}
            {/* <span>
              <ZoomInIcon className={styles["icon"]} />
            </span> */}
          </div>
          <img src={props?.items?.images[0]?.file ?? product} alt="" />
          {/* <Zoom
          img={props?.items?.images[0]?.file ?? product}
          zoomScale={3}
          width={1}
          height={1}
        /> */}
          <Button
            variant="contained"
            className={styles["view-details"]}
            onClick={() => viewDetails(props?.items?.uuid)}
          >
            View Details
          </Button>
        </div>
        {isAuthed ? (
          <AddToCartModal open={open} setOpen={setOpen} item={props?.items} />
        ) : (
          <LoginModal open={open} setOpen={setOpen} />
        )}
        <div className={styles["bottom"]}>
          <p className={styles["a"]}>{props?.items?.name}</p>
          <div className={styles["b"]}>
            <div className={styles["b1"]}></div>
            <div className={styles["b2"]}></div>
            <div className={styles["b3"]}></div>
          </div>
          <p className={styles["c"]}>Code -{props?.items?.code}</p>
          <p className={styles["d"]}>
            Rs {props?.items?.base_price - props?.items?.discount_price}
          </p>
        </div>
      </div>
    </>
  );
};

export default FeaturedProductCard;
