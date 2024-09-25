import { React, useState } from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Stack, TextField } from '@mui/material';
import styles from './LoginCard.module.scss';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { loginPOST, post } from '../../API/axios';
import { setToken } from '../../utils/token';
import { useNavigate, Link } from 'react-router-dom';
import config from '../../config';
import EmailModal from '../OTP/EmailModal';
import OTP from '../OTP/OTP';
const schema = yup.object().shape({
  username: yup.string().required("Email is a required field"),
  password: yup.string().required("Password is a required field"),
});

const LoginCard = () => {
  const [open, setOpen] = useState();
  const [otpModalOpen, setOTPModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClick = () =>{
    setOpen(true);
  }

  const onSubmit = async (data) => {
    loginPOST("accounts/auth/obtain/", data)
      .then((res) => {    //Group validation is remaining
        setToken({
          name: config.tokenName,
          value: JSON.stringify(res.data.token)
        })
        toast.success("Login Successful");
        navigate('/');
      }).catch((err) => {
        console.log(err);
        if (err.response.data.code === "UNAUTHED") {
          toast.error("Make sure you are a normal user to login. Please try again!")
        } else if (err.response.data.detail) {
          toast.error(err.response.data.detail?.[0]);
        } else if (err.response.data.non_field_errors) {
          toast.error("Login Failed! Please try again.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      })
  }
  return (
    <Box className={styles['parent']}>
      <Stack spacing={3} className={styles['parent-stack']}>
        <Typography className={styles['login']}>Login</Typography>
        <Typography className={styles['login-text-common']}>Please login using account detail bellow.</Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className={styles['textfield-box']}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            fullWidth
            label="Email"
            id="outlined-required"
            placeholder='Email Address'
            {...register("username")}
          />
          <TextField
            fullWidth
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            {...register("password")}
          />

          <Typography className={styles['login-text-forgot-password']} onClick={()=>handleClick()}>Forgot your password?</Typography>
          <Button className={styles['btn-signin']} type="submit">Sign In</Button>
        </Box>
        <Typography className={styles['login-text-common']}>Don’t have an Account? <Link to={'/register'}>Create account</Link></Typography>

        {open && <EmailModal open={open} setOpen={setOpen} setOTPModalOpen={setOTPModalOpen} setUserEmail={setUserEmail}/>}
          {otpModalOpen && <OTP otpModalOpen={otpModalOpen} setOTPModalOpen={setOTPModalOpen} userEmail={userEmail}/> }
      </Stack>
    </Box>
  )
}

export default LoginCard