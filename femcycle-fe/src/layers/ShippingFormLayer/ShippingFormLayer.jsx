import React, { useState, useEffect } from "react";
import BreadCrumbCard from "../../components/BreadCrumbCard/BreadCrumbCard";
import ShippingDetailForm from "../../components/ShippingDetail/ShippingDetailForm";
import { Container, Grid, Stack, Box } from "@mui/material";
import ProductView from "../../components/CartTable/ProductView";
import styles from "./ShippingFormLayer.module.scss";
import CartTotal from "../../components/CartTable/CartTotal";
import product from '../../assets/Cart/product.png';
import { get } from "../../API/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ShippingFormLayer = () => {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if(isLoading)
    {
      get(`/order/`).then((response) => {
        if (response.status === 200) {
          setOrderData(response.data.results);
          setDisabled(!response.data.results[0]?.has_previous_shipping_details);
          setIsLoading(false);
          
        } else {
          toast.error("Couldn't fetch orders");
        }
      });
    }
  }, [isLoading, orderData]);


  const data = [
  ];
  //eslint-disable-next-line
  const order_product_data_fill = orderData.map((item)=>{
    return (
      data.push(
        {
          image:item?.produt?.images[0]?.file ?? product,
          name:item?.product?.name,
          color:'Brown',
          size:'XXL',
          price: (item?.product?.base_price - item?.product?.discount_price)*item?.quantity
        }
      )
    )
  })

  if(orderData?.length<1){
    navigate('/');
  }

  // const addShippingDetails = (data) => {
  //   setShippingData(data);
  // }
  return (
    <>
      <BreadCrumbCard view="Shipping Detail Form" />
      <Container sx={{ padding: "4rem 0 4rem 0" }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item lg={8} md={6}>
            <ShippingDetailForm setDisabled={setDisabled}/>
          </Grid>
          <Grid item lg={4} md={4}>
            <Stack>
              {data?.map((item, index) => {
                return (
                  <Box className={styles["product-list"]}>
                    <ProductView
                      item={item}
                      key={index}
                      displayCloseBtn={false}
                    />
                    <p>Rs {item.price}</p>
                  </Box>
                );
              })}
            </Stack>
            <CartTotal sum={orderData[0]?.total_price} proceed_to_checkout={true} disabled={disabled} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ShippingFormLayer;
