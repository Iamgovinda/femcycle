import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import styles from "./ShippingDetailForm.module.scss";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Grid, Checkbox } from "@mui/material";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormHelperText } from "@mui/material";
import { useUserContext } from "../../context/UserContext";
import { get, post } from "../../API/axios";

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = yup.object().shape({
    email: yup.string().email("Not valid email").required("Email is a required field"),
    phone_number: yup.string().max(10, "cannot be more than 10").matches(phoneRegExp, "Phone number is not valid."),
    first_name: yup.string().required("First Name is a required field"),
    last_name: yup.string().required("Last Name is a required field"),
    address: yup.string().required("Address is a required field"),
});
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function ShippingDetailForm(props) {
    // const { addShippingDetails } = props;
    const { user, setUserData } = useUserContext();
    const [isYou, setIsYou] = useState(false);
    const isAuthed = localStorage.getItem("token");
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    useEffect(() => {
        if (isAuthed && !user) {
            get(`/user/${"me"}/`)
                .then((response) => {
                    setUserData(response.data);
                })
                .catch((err) => { });
        }
        //eslint-disable-next-line
    }, [isAuthed, user]);

    useEffect(() => {
        if (isYou) {
            setValue("email", user.email);
            setValue("first_name", user.first_name);
            setValue("last_name", user.last_name);
            setValue("phone_number", user.phone_number);
            setValue("country", "Nepal");
            setValue("city", "Lalipur");
        } else {
            setValue("email", "");
        }
        //eslint-disable-next-line
    }, [isYou]);

    const onSubmit = async (data) => {
        post("/shipping/", data)
            .then((res) => {
                if (res.status === 201 || res.status === 200) {
                    toast.success("Submitted Successfully");
                    props.setDisabled(false);
                }
                else {
                    toast.error("Submission unsuccessfull")
                }
            })
    };

    return (
        <Container className={styles["parent"]}>
            <Box className={styles["parent-top"]}>
                <Box className={styles["texts-top"]}>
                    <Typography className={styles["contact-info-text"]}>
                        Contact Information
                    </Typography>
                    <Typography className={styles["do-you-have-account-text"]}>
                        Already have an account? Login
                    </Typography>
                </Box>
                <Box component="form" autoComplete="off">
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-amount">Email</InputLabel>
                        <Input {...register("email")} type="email" />
                        {errors.email?.message && <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{errors.email?.message}</FormHelperText>}
                    </FormControl>
                </Box>
                <Box className={styles["stack-confirmation"]}>
                    <CheckCircleRoundedIcon className={styles["icon"]} fontSize="sm" />
                    <span>Shipping & taxes calculated at checkouts</span>
                </Box>
            </Box>
            <Box>
                <Typography className={styles["shipping-address-text"]}>
                    Shipping Address
                </Typography>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    className={styles["form-bottom"]}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Grid container spacing={1}>
                        <Grid item lg={6}>
                            <FormControl sx={{ m: 1 }} fullWidth variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">
                                    First Name
                                </InputLabel>
                                <Input {...register("first_name")} />
                                {errors.first_name?.message && <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{errors.fist_name?.message}</FormHelperText>}

                            </FormControl>
                        </Grid>
                        <Grid item lg={6}>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">
                                    Last Name
                                </InputLabel>
                                <Input {...register("last_name")} />
                                {errors.last_name?.message && <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{errors.last_name?.message}</FormHelperText>}

                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container direction={"column"}>
                        <Grid item lg={12} md={6} sm={3}>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">
                                    Address
                                </InputLabel>
                                <Input {...register("address")} />
                                {errors.address?.message && <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{errors.address?.message}</FormHelperText>}

                            </FormControl>
                        </Grid>
                        <Grid item lg={12} md={6} sm={4}>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">
                                    Phone Number
                                </InputLabel>
                                <Input {...register("phone_number", { maxLength: 10 })} type="number" />
                                {errors.phone_number?.message && <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{errors.phone_number?.message}</FormHelperText>}
                                {errors?.phone_number &&
                                    errors?.phone_number?.type === "maxLength" && (
                                        <FormHelperText id="component-error-text" sx={{ color: 'red' }}>Phone number should have 10 digits</FormHelperText>
                                    )}
                            </FormControl>
                        </Grid>
                        <Grid item lg={12} md={6} sm={4}>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">
                                    Country
                                </InputLabel>
                                <Input {...register("country")} />
                                {errors.country?.message && <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{errors.country?.message}</FormHelperText>}

                            </FormControl>
                        </Grid>
                        <Grid item lg={12} md={6} sm={4}>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">
                                    City
                                </InputLabel>
                                <Input {...register("city")} />
                                {errors.city?.message && <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{errors.city?.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item lg={6}>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">
                                    Street
                                </InputLabel>
                                <Input {...register("street")} />
                                {errors.street?.message && <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{errors.street?.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item lg={6}>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-amount">
                                    Postal Code
                                </InputLabel>
                                <Input {...register("postal_code")} />
                                {errors.postal_code?.message && <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{errors.postal_code?.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Box className={styles["btn-box"]}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox {...label} onClick={() => setIsYou(!isYou)} />}
                                label="Fill my details"
                            />
                        </FormGroup>
                        <Button className={styles['btn']} type="submit">Submit Shipping Detail</Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
