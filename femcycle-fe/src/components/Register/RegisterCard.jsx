import React from 'react';
import { Box } from '@mui/system';
import { Stack, Container } from '@mui/system';
import styles from './RegisterCard.module.scss';
import { Typography, TextField, FormHelperText } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { post, registerPOST } from '../../API/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Dialog, Slide } from '@mui/material';
import OtpInput from 'react-otp-input';
import otpImage from '../../assets/changePassword/otp.jpg';
// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'white',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,

// };
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const phoneRegExp =
    /^((\\+[1-9]{1,9}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const RegisterCard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [otp, setOTP] = React.useState();
  const [email, setEmail] = React.useState();
  const handleClose = () => setOpen(false);
  const schema = yup.object().shape({
    password: yup
      .string()
      .min(6)
      .max(15)
      .required("Password is a required field"),
    repeat_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    phone_number: yup.string().min(10, "cannot be less than 10 digits").max(10, "cannot be more than 10 digits").matches(phoneRegExp, "Phone number is not valid."),
    email: yup.string().email("Not valid email").required("Email is a required field"),
    name: yup.string().required("Full Name is a required field"),
    
  }
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setEmail(data['email']);
    registerPOST("accounts/register/", data)

      .then((res) => {    //Group validation is remaining

        toast.success("Registration Successful");
        setOpen(true);
      }).catch((err) => {
        if (err.response.data.detail) {
          toast.error(err.response.data.detail?.[0]);
        } else if (err.response.data.non_field_errors) {
          toast.error("Registration Failed! Please try again.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      })
  }
  const handleClickButton = () => {
    const data = {
      'email': email,
      'otp': otp
    }
    post(`/accounts/otp-activate/`, data)
      .then((response) => {
        if (response.status === 200) {
          toast.success('Account Verified SuccessFully');
          setOpen(false);
          navigate('/')
        }
        else {
          toast.error(response?.response?.data?.non_field_errors[0])
        }
      }).catch((err) => {
        console.log(err);
        toast.error("something went wrong");
      })
  }
  const handleOTPChange = (otp) => {
    setOTP(otp);
  }
  return (
    <>
      <Box className={styles['parent']}>
        <Stack spacing={3} className={styles['parent-stack']}>
          <Typography className={styles['login']}>Register</Typography>
          <Typography className={styles['login-text-common']}>Please register using account detail bellow.</Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            TransitionComponent={Transition}
            className={styles['textfield-box']}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              fullWidth
              type={'text'}
              label="Full Name"
              id="outlined-required first_name"
              placeholder='Full Name'
              {...register('name')}
            />
            {errors.name?.message && <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{errors.name?.message}</FormHelperText>}
            <TextField
              fullWidth
              type={'email'}
              label="Email"
              id="outlined-required email"
              placeholder='Email Address'
              {...register('email')}
            />
            {errors.email?.message && <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{errors.email?.message}</FormHelperText>}
            <TextField
              fullWidth
              type={'number'}
              label="Phone Number"
              id="outlined-required phone_number"
              placeholder='Phone Number'
              {...register('phone_number')}
            />
            {errors.phone_number?.message && <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{errors.phone_number?.message}</FormHelperText>}

            <TextField
              fullWidth
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register('password')}
            />
            {errors.password?.message && <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{errors.password?.message}</FormHelperText>}

            <TextField
              fullWidth
              id="outlined-password-input confirm_password"
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
              {...register('repeat_password')}
            />
            {errors.repeat_password?.message && <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{errors.repeat_password?.message}</FormHelperText>}

            <Button className={styles['btn-signin']} type="submit">Register</Button>
          </Box>
          <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            aria-describedby="alert-dialog-slide-description"
          >
            <Typography id="modal-modal-title" variant="h6" component="h2" className={styles['otp-dialog-title']}>
              OTP verification
            </Typography>
            <Container className={styles['dialog-box']}>
              <img src={otpImage} alt="" className={styles['otp-img']} />
              <p className={styles['activate-your-account']}>Activate Your Account</p>
              <OtpInput
                value={otp}
                onChange={handleOTPChange}
                numInputs={6}
                separator={<span>-</span>}
                inputStyle={styles['input-style']}
                containerStyle={styles['container-style']}
              />
              <Button variant='contained' onClick={() => handleClickButton()} className={styles['verify-btn']}>Verify</Button>
            </Container>
          </Dialog>
          <Typography className={styles['login-text-common']}>Don’t have an Account? <Link to={'/login'}>login</Link></Typography>
        </Stack>
      </Box>
    </>
  )
}

export default RegisterCard