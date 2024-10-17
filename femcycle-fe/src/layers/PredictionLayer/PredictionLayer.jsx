import React from "react";
import { Container, Box, TextField } from "@mui/material";
import styles from "./PredictionLayer.module.scss";
import { Grid, Button } from "@mui/material";
import BreadCrumbCard from "../../components/BreadCrumbCard/BreadCrumbCard";
import contactUsImage from "../../assets/ContactUs/Contact.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { post } from "../../API/axios";
import { toast } from "react-toastify";
// import { useNavigate } from 'react-router-dom';
import { useUserContext } from "../../context/UserContext";

// const phoneRegExp =
//     /^((\\+[1-9]{1,9}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const PredictionLayer = () => {
    const { user } = useUserContext();

    const schema = yup.object().shape({});

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        console.log("onSubmit function called");
        console.log("Form data:", data);
        try {
            const response = await post(
                `/user/${user.username}/post-user-data/`,
                data
            );
            if (response.status === 200 || response.status === 201) {
                let data = response.data
                let predicted_next_ovulation_date = new Date(data["predicted_next_ovulation_date"]).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
                toast.success(`Next Evulation Date: ${predicted_next_ovulation_date}`);
            } else {
                toast.error("Unable to predict.");
            }
        } catch (error) {
            console.error("API error:", error);
            toast.error("An error occurred while predicting.");
        }
    };
    return (
        <>
            <BreadCrumbCard view="Predict Mensuration" />
            <Box>
                <Container>
                    <form
                        onSubmit={handleSubmit(onSubmit, (errors) =>
                            console.log("Form submission errors:", errors)
                        )}
                        autoComplete="off"
                    >
                        <Grid container spacing={0} marginTop={15}>
                            <Grid item lg={6} display="flex" flexDirection={"column"} gap={5}>
                                <Box>
                                    <p className={styles["text-1"]}>Predict Your Mensuration</p>
                                    <p className={styles["text-common"]}>Available everytime.</p>
                                </Box>

                                <Grid container spacing={3}>
                                    <Grid item lg={6} sm={12} md={12}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            label="Age*"
                                            placeholder=""
                                            {...register("age")}
                                        ></TextField>
                                        <small><i>Your age</i></small>
                                    </Grid>
                                    <Grid item lg={6} sm={12} md={12}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            name={"length_of_cycle"}
                                            label="Cycle Length*"
                                            placeholder=""
                                            {...register("length_of_cycle")}
                                        ></TextField>
                                        <small><i>Mens Cycle Length</i></small>
                                    </Grid>
                                </Grid>
                                <TextField
                                    type="number"
                                    fullWidth
                                    name={"length_of_menses"}
                                    label="Mens Length*"
                                    placeholder=""
                                    {...register("length_of_menses")}
                                ></TextField>

                                <TextField
                                    type="number"
                                    fullWidth
                                    name={"length_of_luteal"}
                                    label="Luteal Length*"
                                    placeholder=""
                                    {...register("length_of_luteal")}
                                ></TextField>

                                <TextField
                                    type="number"
                                    fullWidth
                                    name={"total_num_of_high_days"}
                                    label="Total Number High Days*"
                                    placeholder=""
                                    {...register("total_num_of_high_days")}
                                ></TextField>

                                <TextField
                                    type="number"
                                    fullWidth
                                    name={"total_num_of_peak_days"}
                                    label="Total Number Pick Days*"
                                    placeholder=""
                                    {...register("total_num_of_peak_days")}
                                ></TextField>
                                <TextField
                                    type="number"
                                    fullWidth
                                    name={"total_days_of_fertility"}
                                    label="Total Fertility Days*"
                                    placeholder=""
                                    {...register("total_days_of_fertility")}
                                ></TextField>
                                <TextField
                                    type="number"
                                    fullWidth
                                    name={"bmi"}
                                    label="BMI*"
                                    placeholder=""
                                    {...register("bmi")}
                                ></TextField>
                                <TextField
                                    type="date"
                                    fullWidth
                                    name={"prediction_date"}
                                    placeholder="prediction date"
                                    {...register("prediction_date")}
                                ></TextField>

                                <Button className={styles["btn"]} type="submit">
                                    Submit
                                </Button>
                            </Grid>
                            <Grid item lg={6}>
                                <img
                                    src={contactUsImage}
                                    alt=""
                                    className={styles["contact-us-img"]}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default PredictionLayer;
