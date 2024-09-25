import React from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Grid } from "@mui/material";
import styles from "./ProfileCard.module.scss";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { FormHelperText } from '@mui/material';
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slide from "@mui/material/Slide";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Container } from "@mui/system";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { patch, get } from "../../API/axios.js";
import { useUserContext } from '../../context/UserContext';
import { yupResolver } from '@hookform/resolvers/yup';

const phoneRegExp =
    /^((\\+[1-9]{1,9}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const schema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    gender: yup.string().required("Gender is a required field"),
    phone_number: yup.string().min(10, "cannot be less than 10 digits").max(10, "cannot be more than 10 digits").matches(phoneRegExp, "Phone number is not valid."),

});

const ProfileEditModal = (props) => {
    // const [setGender] = React.useState("");
    const [profile, setProfile] = React.useState();
    const { user } = props;
    const { setUserData } = useUserContext();



    const handleClose = () => {
        props?.setOpen(false);
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: user,
        resolver: yupResolver(schema)
    });

    // const handleChange = (event) => {
    //     setGender(event.target.value);
    // };
    const onSubmit = (data) => {
        const userData = new FormData()
        userData.append("name", data.name)
        userData.append("gender", data.gender)
        userData.append("phone_number", data.phone_number)
        userData.append("dob", data.dob)
        if (profile) {
            userData.append("profile_picture", profile)
        }
        patch(`/user/${"me"}/`, userData)
            .then((response) => {
                if (response.status === 200) {
                    get(`user/${"me"}/`)
                        .then((response) => {
                            get(`users/${"me"}/`)
                                .then((response) => {
                                    toast.success("Profile Updated successfully!");
                                    setUserData(response.data);
                                    props?.setOpen(!props?.open);
                                })
                                .catch((err) => { });
                        })
                        .catch((err) => { });
                }
            })
    }

    const changeProfile = (e) => {
        setProfile(e.target.files?.[0]);
    };
    return (
        <>
            <Dialog
                open={props?.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                className={styles["profile-dialog-modal"]}
                fullWidth
                maxWidth={"md"}
                style={{ maxHeight: "100rem !important" }}
            >
                <form
                    component="form"
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Box className={styles["profile-edit-modal-top"]}>
                        <DialogTitle className={styles["profile-edit-title"]}>
                            Edit Profile
                        </DialogTitle>
                        <CancelRoundedIcon
                            className={styles["profile-edit-cross-icon"]}
                            onClick={() => props?.setOpen(false)}
                        />
                    </Box>
                    <Container className={styles["profile-edit-modal-container"]}>

                        <Grid container spacing={2}
                        >
                            <Grid item lg={4} className={styles["profile-modal-image-section"]}>
                                <img
                                    src={
                                        (profile) ? URL.createObjectURL(profile) : (
                                            user?.profile_picture ??
                                            "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
                                        )
                                    }
                                    alt="profile"
                                    className={styles["modal-profile-image"]}
                                />
                                <label id="changeProfilePicture" className={styles['changeProfilePicture']}>
                                    <input
                                        type="file"
                                        style={{ display: "none" }}
                                        id="my_input"
                                        onChange={(e) => changeProfile(e)}
                                    />
                                    <span>Change</span>
                                </label>

                            </Grid>
                            <Grid item lg={8}>
                                <label htmlFor="name">Name</label>
                                <FormControl fullWidth>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        type="text"
                                        size="small"
                                        fullWidth
                                        {...register('name')}
                                    />
                                    {errors.name?.message && <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{errors.name?.message}</FormHelperText>}
                                </FormControl>

                                <br />
                                <br />
                                <FormControl fullWidth>
                                    <label id="demo-simple-select-label">Select Gender</label>
                                    <Select
                                        id="demo-simple-select"
                                        value={watch('gender')}
                                        size="small"
                                        {...register('gender')} s
                                    >
                                        <MenuItem value={"MALE"}>Male</MenuItem>
                                        <MenuItem value={"FEMALE"}>Female</MenuItem>
                                    </Select>
                                    {errors.gender?.message && <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{errors.gender?.message}</FormHelperText>}
                                </FormControl>
                                <br />
                                <br />
                                <FormControl fullWidth>
                                    <label htmlFor="phone_number">Phone Number</label>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="phone_number"
                                        type="number"
                                        size="small"
                                        fullWidth
                                        {...register('phone_number')}

                                    />
                                    {errors.phone_number?.message && <FormHelperText id="component-error-text" sx={{ color: 'red' }}>{errors.phone_number?.message}</FormHelperText>}
                                    {errors?.phone_number &&
                                        errors?.phone_number?.type === "maxLength" && (
                                            <FormHelperText id="component-error-text" sx={{ color: 'red' }}>Phone number should have 10 digits</FormHelperText>
                                        )}
                                </FormControl>
                                {/* <FormControl fullWidth>
                <label htmlFor="address">Address</label>
                <TextField
                  autoFocus
                  margin="dense"
                  id="address"
                  type="text"
                  size="small"
                  fullWidth="true"
                />
              </FormControl> */}

                                <br />
                                <br />
                                <FormControl fullWidth>
                                    <label htmlFor="name">DOB</label>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        type="date"
                                        size="small"
                                        fullWidth
                                        {...register('dob')}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Container>
                    <DialogActions className={styles["dialog-actions"]}>
                        <Button
                            className={styles["btn-cancel"]}
                            variant="contained"
                            size="sm"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={styles["btn-update"]}
                            variant="contained"
                            size="sm"
                            type="submit"
                        // onClick={onSubmit}
                        >
                            Update
                        </Button>
                    </DialogActions>
                    {/* </Box> */}
                </form>
            </Dialog>
        </>
    )
}

export default ProfileEditModal