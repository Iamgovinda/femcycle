import React, { useEffect, useState } from "react";
import { Box, Grid, Stack, Container, Button } from "@mui/material";
import miniPDI from "../../assets/ProductDetailCard/product_detail.png";
import mainPDI from "../../assets/ProductDetailCard/mpd.png";
import styles from "./ProductDetailCard.module.scss";
// import StarOutlineIcon from "@mui/icons-material/StarOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {get, patch, post, remove } from "../../API/axios";
import { toast } from "react-toastify";
import { Rating } from "@mui/material";
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
// import { number } from "yup";
// import {
//   ConstructionOutlined,
//   LocalConvenienceStoreOutlined,
// } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LoginModal from "../loginModal/LoginModal";
import ReactImageZoom from 'react-image-zoom';
import { useCartContext } from "../../context/CartCountContex";


const ProductDetailCard = (props) => {
  const [quantity, setQuantity] = React.useState(2);
  const [value, setValue] = React.useState(2);
  const [productDetail, setProductDetail] = useState(props?.item);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [wished, setWished] = React.useState();
  const { slug } = useParams();
  const navigate = useNavigate();
  const isAuthed = localStorage.getItem("token");
  const {setCartCountData } = useCartContext();
  const addQuantity = () => {
    quantity < productDetail?.quantity && setQuantity((prev) => prev + 1);
  };
  const subtractQuantity = () => {
    quantity > 1 && setQuantity((prev) => prev - 1);
  };

  useEffect(() => {
    if (isLoading) {
      if (slug) {
        get(`/product/` + slug)
          .then((response) => {
            setProductDetail(response.data);
            props?.setProductDetail(response.data);
            props?.setIsLoading(!props?.isLoading);
            setValue(response.data.ratings?.rating);
            setWished(response?.data?.in_wishlist);
            setIsLoading(false);
          })
          .catch((error) => {
            toast.error(error);
            setIsLoading(false);
          });
      }
    }
  }, [slug, isLoading, productDetail]);

  const updateRating = (newValue) => {
    if (productDetail?.ratings?.product_rating_uuid === false) {
      post(`/product/ratings/`, {
        product: productDetail?.uuid,
        ratings: newValue,
      })
        .then((response) => {
          setValue(response.data.ratings);
          setIsLoading(true);
          props?.setIsLoading(!props?.isLoading);
        })
        .catch((error) => {
          toast.error(error);
        });
    } else {
      patch(
        `/product/ratings/` + productDetail?.ratings?.product_rating_uuid + "/",
        { ratings: newValue }
      )
        .then((response) => {
          setValue(response.data.ratings);
          setIsLoading(true);
          props?.setIsLoading(!props?.isLoading);
        })
        .catch((error) => {
          toast.error("Something went wrong");
        });
    }
  };
  const addToCart = (uuid) => {
    const data = {
      product: uuid,
      quantity: quantity,
    };
    post(`/order/`, data).then((response) => {
      if (response?.status === 201 || response?.status === 200) {
        toast.success("Added to cart successfully");
        setCartCountData(true);
        navigate("/");
      } else {
        toast.error(
          response?.response?.data?.error[0] ?? "Something went wrong"
        );
      }
    });
  };
  const addToWishList = (product) => {
    post(`/wishlist/`, { product: product }).then((response) => {
      if (response?.status === 200) {
        setWished(true);
        setIsLoading(true);
      }
    });
  };
  const removeFromWishList = (product) => {
    remove(`/wishlist/${product}/`).then((response) => {
      if (response?.status === 204) {
        setWished(false);
        setIsLoading(true);
      }
    });
  };

  // const ratingChanged = (newRating) => {};
  return (
    <Container className={styles["top"]}>
      <Grid container spacing={3} justifyContent="flex-start">
        {productDetail?.images && productDetail.images.length > 1 && (
          <Grid item lg={2} md={4} sm={6}>
            <Stack gap={2}>
              <img
                src={productDetail?.images?.[0]?.file ?? miniPDI}
                alt="mini_pdi"
                height={151}
                width={155}
              />
              <img
                src={productDetail?.images?.[0]?.file ?? miniPDI}
                alt="mini_pdi"
                height={151}
                width={155}
              />
              <img
                src={productDetail?.images?.[0]?.file ?? miniPDI}
                alt="mini_pdi"
                height={151}
                width={155}
              />
            </Stack>
          </Grid>
        )}
        <Grid item lg={4} display="flex">
          <img
            src={productDetail?.images[0]?.file ?? mainPDI}
            alt="mini_pdi"
            style={{ maxWidth: "22rem" }}
          />
        </Grid>
        <Grid
          item
          lg={6}
          display="flex"
          //eslint-disable-nextline
          direction={"column"}
          justifyContent={"center"}
        >
          <Box>
            <Typography className={styles["text-1"]}>
              {productDetail?.name}
            </Typography>
            <Rating
              name="simple-controlled"
              value={value}
              readOnly={isAuthed?false:true}
              onChange={(event, newValue) => {
                setValue(() => updateRating(newValue));
              }}
            />
          </Box>
          <Box>
            <span className={styles["initial-price"]}>
              Rs {productDetail?.base_price - productDetail?.discount_price}
            </span>{" "}
            <span className={styles["discounted-price"]}>
              Rs {productDetail?.base_price}
            </span>
          </Box>
          <Typography className={styles["text-common"]}>Descriptions</Typography>
          <Typography className={styles["text-description"]}>
            {productDetail?.description}
          </Typography>
          <Box className={styles["box-quantity"]}>
            <div className={styles["plus"]} onClick={() => addQuantity()}>
              <AddIcon />
            </div>{" "}
            <p>{quantity}</p>{" "}
            <div className={styles["minus"]} onClick={() => subtractQuantity()}>
              <RemoveIcon />
            </div>
          </Box>
          <Box
            display={"flex"}
            alignItems="center"
            gap={6}
            style={{ padding: "10px 0 10px 0" }}
          >
            <Button
              variant="contained"
              className={styles["add_to_cart"]}
              size="medium"
              onClick={() =>
                isAuthed ? addToCart(productDetail?.uuid) : setOpen(true)
              }
            >
              Add to Cart
            </Button>{" "}
            {isAuthed &&
          (wished ? (
            <span>
              <FavoriteIcon
                className={styles["icon"]}
                onClick={() => removeFromWishList(productDetail?.in_wishlist)}
                style={{ color: "red" }}
              />
            </span>
          ) : (
            <span>
              <FavoriteBorderIcon
                className={styles["icon"]}
                onClick={() => addToWishList(productDetail?.uuid)}
              />
            </span>
          ))}
          </Box>
          <LoginModal open={open} setOpen={setOpen} />
          <Typography className={styles["text-common"]}>
            Categories:{" "}
            <span>
              {productDetail?.category?.map((item, index) => {
                return (
                  <span
                    style={{ marginLeft: "10px", fontWeight: "200" }}
                    key={index}
                  >
                    {item?.title},
                  </span>
                );
              })}
            </span>
          </Typography>
          {/* <Box display={"flex"} alignItems="center" gap={2}>
            <span className={styles["text-common"]}>Share</span>
            <FacebookIcon fontSize="medium" />{" "}
            <InstagramIcon fontSize="medium" />{" "}
            <TwitterIcon fontSize="medium" />
          </Box> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailCard;
