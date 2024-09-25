import { React } from "react";
import { Box, Container } from "@mui/system";
import { Typography } from "@mui/material";
import { Stack, TextField } from "@mui/material";
import styles from "./LoginModal.module.scss";
import { Button, Modal } from "@mui/material";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { loginPOST } from "../../API/axios";
import { setToken } from "../../utils/token";
import { useNavigate, Link } from "react-router-dom";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import RemoveIcon from '@mui/icons-material/Remove';
import config from "../../config";
const schema = yup.object().shape({
  username: yup.string().required("Email is a required field"),
  password: yup.string().required("Password is a required field"),
});
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

const LoginModal = (props) => {
  const navigate = useNavigate();
  // const handleOpen = () => props.setOpen(true);
  const handleClose = () => props.setOpen(false);
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    loginPOST("accounts/auth/obtain/", data)
      .then((res) => {
        //Group validation is remaining
        setToken({
          name: config.tokenName,
          value: JSON.stringify(res.data.token),
        });
        props.setOpen(false);
        toast.success("Login Successful");
        navigate("/");
      })
      .catch((err) => {
        if (err.response.data.code === "UNAUTHED") {
          toast.error(
            "Make sure you are a normal user to login. Please try again!"
          );
        } else if (err.response.data.detail) {
          toast.error(err.response.data.detail?.[0]);
        } else if (err.response.data.non_field_errors) {
          toast.error("Login Failed! Please try again.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      });
  };

  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container className={styles['top']}>
      <HighlightOffIcon fontSize='medium' className={styles['close-btn']} onClick={() => handleClose()} color="error" />
      <Box className={styles["parent"]}>
        <Stack spacing={3} className={styles["parent-stack"]}>
          <Typography className={styles["login"]}>Please Login First</Typography>
          <Typography className={styles["login-text-common"]}>
            Please login using account detail bellow.
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            className={styles["textfield-box"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              fullWidth
              label="Email"
              id="outlined-required"
              placeholder="Email Address"
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

            <Typography className={styles["login-text-common"]}>
              Forgot your password?
            </Typography>
            <Button className={styles["btn-signin"]} type="submit">
              Sign In
            </Button>
          </Box>
          <Typography className={styles["login-text-common"]}>
            Don’t have an Account? <Link to={"/register"}>Create account</Link>
          </Typography>
        </Stack>
      </Box>
      </Container>
    </Modal>
  );
};

export default LoginModal;
