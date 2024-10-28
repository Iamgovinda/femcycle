import React from "react";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import styles from "./ProfileInfoCard.module.scss";
import { calculateAge } from "../../utils/common";

const ProfileInfoCard = (props) => {
    return (
        <>
            <Box className={styles["profile-info-main"]}>
                <p className={styles["profile-info-title"]}>Personal Informations</p>
                <Grid container className={styles["info"]}>
                    <Grid item className={styles["info-key"]} lg={4}>
                        <p>Name</p>
                        <p>Phone</p>
                        <p>Gender</p>
                        <p>Address</p>
                        {props?.user?.dob && (
                            <>
                                <p>Date of Birth</p>
                                <p>Age</p>
                            </>
                        )}
                    </Grid>
                    <Grid item className={styles["info-detail"]} lg={6}>
                        <p>{props?.user?.name}</p>
                        <p>{props?.user?.phone_number}</p>
                        <p>{props?.user?.gender ?? "N/A"}</p>
                        <p>{props?.user?.address ?? "N/A"}</p>
                        {props?.user?.dob && (
                            <>
                                <p>{props?.user?.dob}</p>
                                <p>{calculateAge(props?.user?.dob)}</p>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default ProfileInfoCard;
