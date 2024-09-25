import React, { useEffect } from 'react'
import BreadCrumbCard from '../../components/BreadCrumbCard/BreadCrumbCard';
import { Container, Box, Grid } from '@mui/material';
import { useUserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { get } from '../../API/axios';
import styles from './ProfileLayer.module.scss';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import PredictionHistory from '../../components/OrderHistory/OrderHistoryCard';
import ProfileInfoCard from '../../components/ProfileInfoCard/ProfileInfoCard';

const ProfileLayer = () => {
    const { user, setUserData } = useUserContext();
    const isAuthed = localStorage.getItem("token");
    useEffect(() => {
        if (!user && isAuthed) {
            get(`/user/me/`)
                .then((response) => {
                    setUserData(response.data);
                })
                .catch((err) => {
                    toast.error("Couldn't fetch user.");
                });
        }
        //eslint-disable-next-line
    }, [user, isAuthed]);
    return (

        <>
            <BreadCrumbCard view="Profile" />
            <Container>
                <Grid container spacing={3} marginTop={4}>
                    <Grid item lg={5}>
                        <ProfileCard user={user} />
                    </Grid>
                    <Grid item lg={7}>
                        <ProfileInfoCard user={user} />
                        <PredictionHistory username={user?.username} />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default ProfileLayer