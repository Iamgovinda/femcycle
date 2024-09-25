import React from 'react';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import styles from './OTP.module.scss';
import OtpInput from 'react-otp-input';
import change from '../../assets/changePassword/change.png';
import { TextField } from '@mui/material';
import { post } from '../../API/axios';
import { toast } from 'react-toastify';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { FormHelperText } from '@mui/material';
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
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
const OTP = (props) => {
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
        props?.setOTPModalOpen(false);
    };
    const handleOTPChange = (otp) => {
        setOTP(otp);
    }
    const onSubmit = async (data) => {
        const submitData = {
            "email": props?.userEmail,
            "password": data.password,
            "repeat_password": data.repeat_password,
            "otp": otp
        }
        post(`/accounts/password/reset/confirm/`, submitData).then((response) => {
            if (response.status === 200 || response.status === 201) {
                toast.success(response.data?.detail);
                handleClose();
            }
            else {
                toast.error("Some Error occured");
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
            >
                <DialogTitle className={styles['otp-dialog-title']}>{"Please Enter Your 6 Digit Verification Code"}</DialogTitle>
                <DialogContent className={styles['dialog-content-box']}
                    component="form"
                    autoComplete="off"
                >

                    <img src={change} alt="change" className={styles['dialog-content-img']} />
                    <p className={styles['set-new-password']}>Set New Password</p>
                    <p className={styles['set-password-info']}>A OTP has been emailed to {props?.userEmail} use the OTP to your password</p>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles['dialog-content-box']}>
                        <OtpInput
                            value={otp}
                            onChange={handleOTPChange}
                            numInputs={6}
                            separator={<span>-</span>}
                            inputStyle={styles['input-style']}
                            containerStyle={styles['container-style']}
                        />
                        <TextField
                            label="password"
                            id="outlined-required"
                            size='small'
                            type={'password'}
                            className={styles['input-field']}
                            // onChange={(e) => setPassword(e.target.value)}
                            {...register('password')}

                        />
                        {errors.password?.message && <FormHelperText id="component-error-text" sx={{ color: 'red', textAlign:'left' }}>{errors.password?.message}</FormHelperText>}

                        <TextField

                            label="repeat password"
                            id="outlined-required"
                            size='small'
                            type={'password'}
                            className={styles['input-field']}
                            // onChange={(e) => setRepeatPassword(e.target.value)}
                            {...register('repeat_password')}
                        />
                        {errors.repeat_password?.message && <FormHelperText id="component-error-text" sx={{ color: 'red', textAlign:'left' }}>{errors.repeat_password?.message}</FormHelperText>}

                        <Button variant={'contained'} fullWidth className={styles['proceed']} type='submit'>Reset Password</Button>

                    </form>
                    {/* //onClick={() => handleClick()} */}
                </DialogContent>
            </Dialog>
        </Container >
    )
}

export default OTP