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
import { calculateAge } from "../../utils/common";

// const phoneRegExp =
//     /^((\\+[1-9]{1,9}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const PredictionLayer = () => {
    const { user } = useUserContext();

    const schema = yup.object().shape({});
    const defaultValues = {};
    console.log("default value: ", user);
    if (user?.dob) {
        console.log("user.dob: ", user?.dob);
        defaultValues["age"] = calculateAge(user?.dob);
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
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
                let data = response.data;
                let predicted_next_ovulation_date = new Date(
                    data["predicted_next_ovulation_date"]
                ).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
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
                                    <p className={styles["text-1"]}>Predict Your Menstruation</p>
                                    <p className={styles["text-common"]}>Available every time.</p>
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
                                        <small>
                                            <i>Your current age</i>
                                        </small>
                                    </Grid>
                                    <Grid item lg={6} sm={12} md={12}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            label="Cycle Length*"
                                            placeholder=""
                                            {...register("length_of_cycle")}
                                        ></TextField>
                                        <small>
                                            <i>Length of your menstrual cycle (in days)</i>
                                        </small>
                                    </Grid>
                                </Grid>

                                <div>
                                    <TextField
                                        type="number"
                                        fullWidth
                                        label="Menses Length*"
                                        placeholder=""
                                        {...register("length_of_menses")}
                                    ></TextField>
                                    <small>
                                        <i>Number of days of menstruation</i>
                                    </small>
                                </div>

                                <div>
                                    {" "}
                                    <TextField
                                        type="number"
                                        fullWidth
                                        label="Luteal Phase Length*"
                                        placeholder=""
                                        {...register("length_of_luteal")}
                                    ></TextField>
                                    <small>
                                        <i>Duration of your luteal phase (in days)</i>
                                    </small>
                                </div>

                                <div>
                                    <TextField
                                        type="number"
                                        fullWidth
                                        label="Total Number of High Days*"
                                        placeholder=""
                                        {...register("total_num_of_high_days")}
                                    ></TextField>
                                    <small>
                                        <i>Total number of days with high fertility signs</i>
                                    </small>
                                </div>

                                <div>
                                    <TextField
                                        type="number"
                                        fullWidth
                                        label="Total Number of Peak Days*"
                                        placeholder=""
                                        {...register("total_num_of_peak_days")}
                                    ></TextField>
                                    <small>
                                        <i>Total number of peak fertility days</i>
                                    </small>
                                </div>

                                <div>
                                    <TextField
                                        type="number"
                                        fullWidth
                                        label="Total Fertility Days*"
                                        placeholder=""
                                        {...register("total_days_of_fertility")}
                                    ></TextField>
                                    <small>
                                        <i>Total number of fertile days in your cycle</i>
                                    </small>
                                </div>

                                <div>
                                    <TextField
                                        type="number"
                                        fullWidth
                                        label="BMI*"
                                        placeholder=""
                                        {...register("bmi")}
                                    ></TextField>
                                    <small>
                                        <i>Your Body Mass Index (BMI)</i>
                                    </small>
                                </div>
                                <div>
                                    <TextField
                                        type="date"
                                        fullWidth
                                        label="Prediction Date*"
                                        placeholder="Prediction date"
                                        {...register("prediction_date")}
                                    ></TextField>
                                    <small>
                                        <i>Select the date to start predictions from</i>
                                    </small>
                                </div>

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
