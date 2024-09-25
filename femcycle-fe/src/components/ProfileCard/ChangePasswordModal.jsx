import React from 'react';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import styles from './ChangePasswordModal.module.scss';
import OtpInput from 'react-otp-input';
import change from '../../assets/changePassword/change.png';
import { TextField } from '@mui/material';
import { post } from '../../API/axios';
import { toast } from 'react-toastify';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { FormHelperText } from '@mui/material';
import { useForm } from "react-hook-form";
import CancelIcon from '@mui/icons-material/Cancel';

const schema = yup.object().shape({
    old_password: yup
        .string()
        .required("old password is a required field"),
    password: yup
        .string()
        .min(6)
        .max(15)
        .required("Password is a required field"),
    repeat_password: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
});
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const ChangePasswordModal = (props) => {
    // const [open, setOpen] = React.useState(false);
    const [otp, setOTP] = React.useState();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    // const handleClickOpen = () => {
    //     props?.setOTPModalOpen(true);
    // };


    const handleClose = () => {
        props?.setOpenChange(false);
    };
    const handleOTPChange = (otp) => {
        setOTP(otp);
    }
    const onSubmit = async (data) => {
        const submitData = {
            "old_password": data.old_password,
            "password": data.password,
            "repeat_password": data.repeat_password
        }
        post(`/user/${'me'}/password/`, submitData).then((response) => {
            if (response.status === 200 || response.status === 201) {
                toast.success(response.data?.detail);
                handleClose();
            }
            else {
                if(response?.response?.data?.old_password){
                    toast.error(response?.response?.data?.old_password[0]);
                }
            }
        })
    }

    return (
        <Container>
            <Dialog
                open={props?.otpModalOpen}
                TransitionComponent={Transition}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                className={styles['dialog-for-otp']}
                fullWidth
            >
                <DialogTitle className={styles['otp-dialog-title']}>{"Fill the following forms"} <CancelIcon fontSize='large' className={styles['close-icon']} onClick={() => props?.setOpenChange(false)} /></DialogTitle>
                <DialogContent className={styles['dialog-content-box']}
                    component="form"
                    autoComplete="off"
                >

                    <img src={change} alt="change" className={styles['dialog-content-img']} />
                    <p className={styles['set-new-password']}>Change Password</p>
                    <p className={styles['set-password-info']}>Enter your current password to verify its you.</p>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles['dialog-content-box']}>
                        {/* <OtpInput
                            value={otp}
                            onChange={handleOTPChange}
                            numInputs={6}
                            separator={<span>-</span>}
                            inputStyle={styles['input-style']}
                            containerStyle={styles['container-style']}
                        /> */}
                        <TextField
                            label="current password"
                            id="outlined-required"
                            size='large'
                            type={'password'}
                            className={styles['input-field']}
                            // onChange={(e) => setPassword(e.target.value)}
                            {...register('old_password')}
                        />
                        {errors.old_password?.message && <FormHelperText id="component-error-text" sx={{ color: 'red', textAlign: 'left' }}>{errors.old_password?.message}</FormHelperText>}

                        <TextField
                            label="new password"
                            id="outlined-required"
                            size='large'
                            type={'password'}
                            className={styles['input-field']}
                            // onChange={(e) => setPassword(e.target.value)}
                            {...register('password')}

                        />
                        {errors.password?.message && <FormHelperText id="component-error-text" sx={{ color: 'red', textAlign: 'left' }}>{errors.password?.message}</FormHelperText>}

                        <TextField

                            label="repeat password"
                            id="outlined-required"
                            size='large'
                            type={'password'}
                            className={styles['input-field']}
                            // onChange={(e) => setRepeatPassword(e.target.value)}
                            {...register('repeat_password')}
                        />
                        {errors.repeat_password?.message && <FormHelperText id="component-error-text" sx={{ color: 'red', textAlign: 'left' }}>{errors.repeat_password?.message}</FormHelperText>}

                        <Button variant={'contained'} fullWidth className={styles['proceed']} type='submit'>Reset Password</Button>

                    </form>
                    {/* //onClick={() => handleClick()} */}
                </DialogContent>
            </Dialog>
        </Container >
    )
}

export default ChangePasswordModal