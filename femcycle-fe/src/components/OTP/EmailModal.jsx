import React, { useState } from 'react';
import { Container} from '@mui/system';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import styles from './EmailModal.module.scss';
import resetPassImg from '../../assets/changePassword/passwordreset.png';
import { TextField } from '@mui/material';
import { post } from '../../API/axios';
import { toast } from 'react-toastify';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const EmailModal = (props) => {
    const [email, setEmail] = useState();
    // const handleClickOpen = () => {
    //     props?.setOpen(true);
    // };

    const handleClose = () => {
        props?.setOpen(false);
    };

    const handleProcess = () => {
        if (email) {
            post(`/accounts/password/reset/`, { 'email': email }).then((response) => {
                if (response.status === 200) {
                    toast.success(response.data?.detail);
                    props?.setUserEmail(email);
                    handleClose();
                    props?.setOTPModalOpen(true);

                }
                else{
                    toast.error(response.response?.data?.email?.detail)
                }
                
            })
        }
    }
    return (
        <Container>
            <Dialog
                open={props?.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                className={styles['dialog-for-otp']}
                maxWidth={'sm'}
            >
                <DialogTitle className={styles['otp-dialog-title']}>{"Forgot Password"}</DialogTitle>
                <DialogContent className={styles['dialog-content']}>
                    <img src={resetPassImg} alt="" className={styles['reset-pass-img']} />
                    <p className={styles['text-reset-password']}>Reset Password</p>
                    <p className={styles['text-enter-your-email']}>Enter your registered email address</p>
                    <TextField
                        fullWidth
                        label="Email"
                        id="outlined-required"
                        placeholder='Email Address'
                        size='small'
                        type={'email'}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button variant={'contained'} fullWidth className={styles['proceed']} onClick={() => handleProcess()}>Proceed</Button>
                </DialogContent>
            </Dialog>
        </Container>
    )
}

export default EmailModal