import React from 'react';
import { Grid, Stack, Typography, Modal, Box, Button, Container } from '@mui/material';
import miniPDI from '../../assets/ProductDetailCard/product_detail.png';
import mainPDI from '../../assets/ProductDetailCard/mpd.png';
import styles from './AddToCartModal.module.scss';
// import StarOutlineIcon from '@mui/icons-material/StarOutline';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import {post} from '../../API/axios';
import { toast } from 'react-toastify';
import ReactImageZoom from 'react-image-zoom';
import { useCartContext } from '../../context/CartCountContex';
// import { useParams } from 'react-router-dom';
// import { get, patch, post } from '../../API/axios';
// import { toast } from 'react-toastify';
// import { Rating } from '@mui/material';

const AddToCartModal = (props) => {
    const [quantity, setQuantity] = React.useState(2);
    const [productDetail] = React.useState(props.item);
    const handleOpen = () => props.setOpen(true);
    const handleClose = () => props.setOpen(false);
    const navigate = useNavigate()
    const {setCartCountData} = useCartContext();

    const addQuantity = ()=>{
       ( quantity < productDetail?.quantity) && setQuantity(prev => prev + 1);
    }
    const subtractQuantity = ()=>{
        (quantity>1) && setQuantity(prev => prev-1);
     }

     const addToCart = (uuid) => {
        const data = {
            'product': uuid,
            'quantity': quantity
        }
        post(`/order/`, data).then((response) => {
            if(response?.status===201 || response?.status===200){
                toast.success('Added to cart successfully');
                setCartCountData(true);
                navigate('/shopping-cart');
            }
            else{
                toast.error(response?.response?.data?.error[0] ?? 'Something went wrong');
            }
        })
    }

    // const stylee = {width: 100, height: 250, zoomWidth: 400, img:productDetail?.images[0]?.file ?? mainPDI };

    return (
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Container className={styles['top']}>
                <HighlightOffIcon fontSize='medium' className={styles['close-btn']} onClick={() => handleClose()} color="error" />
                <Box>
                    <Grid container spacing={3} justifyContent="flex-start">
                        {
                            productDetail?.images && productDetail.images.length > 1 && (
                                <Grid item lg={2} md={4} sm={6} display="flex" direction="column">
                                    <Stack gap={2}>
                                        <img src={productDetail?.images?.[0]?.file ?? miniPDI} alt="mini_pdi" height={151} width={155} />
                                        <img src={productDetail?.images?.[0]?.file ?? miniPDI} alt="mini_pdi" height={151} width={155} />
                                        <img src={productDetail?.images?.[0]?.file ?? miniPDI} alt="mini_pdi" height={151} width={155} />
                                    </Stack>
                                </Grid>
                            )
                        }
                        <Grid item lg={4} display='flex'>
                            <img src={productDetail?.images[0]?.file ?? mainPDI} alt="mini_pdi" style={{ maxWidth: '22rem' }} />
                            {/* <ReactImageZoom {...stylee}/> */}
                        </Grid>
                        <Grid item lg={6} display="flex" style={{flexDirection:'column'}} justifyContent={'center'}>
                            <Box>
                                <Typography className={styles['text-1']}>{productDetail?.name}</Typography>
                            </Box>
                            <Box>
                                <span className={styles['initial-price']}>Rs {productDetail?.base_price - productDetail?.discount_price}</span>  <span className={styles['discounted-price']}>Rs {productDetail?.base_price}</span>
                            </Box>
                            <Typography className={styles['text-common']}>
                                Descriptions
                            </Typography>
                            <Typography className={styles['text-description']}>
                                {productDetail?.description}
                            </Typography>
                            <Box className={styles['box-quantity']}>
                                <div className={styles['plus']} onClick={()=>addQuantity()}><AddIcon /></div> <p>{quantity}</p> <div className={styles['minus']} onClick={()=>subtractQuantity()}><RemoveIcon /></div>
                            </Box>
                            <Box display={'flex'} alignItems="center" gap={6} style={{ padding: '10px 0 10px 0' }}>
                                <Button variant='contained' className={styles['add_to_cart']} size='medium' onClick={()=>addToCart(productDetail?.uuid)}>Add to Cart</Button> 
                            </Box>
                            <Typography className={styles['text-common']}>
                                Categories: <span>{productDetail?.category?.map((item, index) => {
                                    return (
                                        <span style={{ marginLeft: '10px', fontWeight: '200' }} key={index} >{item?.title},</span>
                                    )
                                })}</span>
                            </Typography>
                            <Typography className={styles['text-common']}>
                                Tags
                            </Typography>
                            <Box display={'flex'} alignItems="center" gap={2}>
                                <span className={styles['text-common']}>
                                    Share
                                </span>
                                <FacebookIcon fontSize='sm' /> <InstagramIcon fontSize='sm' /> <TwitterIcon fontSize='sm' />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Modal>
    )
}

export default AddToCartModal