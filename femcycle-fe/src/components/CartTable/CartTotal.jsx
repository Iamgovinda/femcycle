import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Button, Stack, Modal } from '@mui/material';
import styles from './CartTotal.module.scss';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useNavigate } from 'react-router-dom';
import KhaltiCheckout from 'khalti-checkout-web';
import { get, post } from "../../API/axios";
import { toast } from 'react-toastify';
import { useCartContext } from '../../context/CartCountContex';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
};

const CartTotal = (props) => {
    const {setCartCountData} = useCartContext();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    let config = {
        // replace this key with yours
        "publicKey": "test_public_key_ee9e935790034a3eb984554b9e8c44ca",
        "productIdentity": "1234567890",
        "productName": "Drogon",
        "productUrl": "http://gameofthrones.com/buy/Dragons",
        "eventHandler": {
            onSuccess(payload) {
                // hit merchant api for initiating verfication
                post(`/order/payment-verification/`, { 'total_price': payload['amount'] / 100, 'token': payload['token'] }).then((response) => {
                    if (response.status === 200) {
                        toast.success("Payment successfull");
                        setCartCountData(true);
                        navigate('/order-completed')
                    }
                })
            },
            // onError handler is optional
            onError(error) {
                console.log("eror");

                // handle errors
                console.log(error);
            },
            onClose() {
                console.log('widget is closing');
            }
        },
        "paymentPreference": ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
    };
    const handleClick = () => {
        let checkout = new KhaltiCheckout(config);
        get(`/order/payment-method/?method=KHALTI`).then((response) => {
            if (response.status === 200) {
                setOpen(false);
            }
        })
        setOpen(false);
        checkout.show({ amount: props?.sum*100 });
    }

    const cashOnDelivery = (uuid) => {
        get(`/order/payment-method/?method=CASH_ON_DELIVERY`).then((response) => {
            if (response.status === 200) {
                toast.success('Thankyou for Submitting Payment method. Please Check Your Email');
                setOpen(false);
                setCartCountData(true);
                navigate('/order-completed')
            }
        })
    }
    return (
        <Stack gap={2} marginTop={4}>
            <Typography className={styles['cart-topic']}> Cart Totals</Typography>
            <Stack className={styles['stack-element']} gap={5} borderRadius={3}>
                <Box className={styles['stack-texts-box']}>
                    <span>Subtotals:</span> <span>Rs {props?.sum}</span>
                </Box>
                <Box className={styles['stack-texts-box']}>
                    <span>Totals:</span> <span>Rs {props?.sum}</span>
                </Box>
                <Box className={styles['stack-confirmation']}>
                    <CheckCircleRoundedIcon className={styles['icon']} fontSize='sm' /><span>Shipping & taxes calculated at checkouts</span>
                </Box>
                <Button disabled={(props?.proceed_to_checkout) ? ((props?.proceed_to_checkout && props?.disabled)) : false} variant={'contained'} className={styles['btn']} onClick={() => (props?.proceed_to_checkout ? (handleOpen()) : (navigate('/shipping-detail')))}>{
                    props?.proceed_to_checkout ? ('Proceed To Checkout') : ('Fill Shipping Details')
                }</Button>

            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" className={styles['modal-title']} variant="h6" component="h2">
                        Choose your Payment Type
                    </Typography>
                    <Box className={styles["modal-btn-box"]}>
                        <Button className={styles['modal-btn']} variant='contained' onClick={() => cashOnDelivery(props?.uuid)}>Cash On Delivery</Button>
                        <Button className={styles['modal-btn']} variant='contained' onClick={() => handleClick()}>Khalti</Button>
                    </Box>
                </Box>
            </Modal>
        </Stack>
    )
}

export default CartTotal