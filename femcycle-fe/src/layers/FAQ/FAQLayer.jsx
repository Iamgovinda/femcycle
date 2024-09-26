import React from 'react';
import BreadCrumbCard from '../../components/BreadCrumbCard/BreadCrumbCard';
import { Button, Container, TextField } from '@mui/material';
import { Grid, Stack, Box } from '@mui/material';
import styles from './FAQLayer.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { post } from '../../API/axios';
import { toast } from 'react-toastify';

const FAQLayer = () => {
    const schema = yup.object().shape({
        name: yup.string().required("Name is a required field"),
        subject: yup.string().required("Subject is the required field"),
        message: yup.string().required("Message is the required field"),
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
        // setEmail(data['email']);
        post(`/contact/FAQ/`, data).then((response) => {
            if (response.status === 200 || response.status === 201) {
                toast.success("Thanks for asking question.")
            }
            else {
                toast.error("Unable to ask the question.")
            }
        })
    }
    return (
        <>
            <BreadCrumbCard view={'FAQ'} />
            <Container>
                <Grid container spacing={4} justifyContent='center' alignItems={'center'} >
                    <Grid item lg={6}>
                        <Stack>
                            <p className={styles['text-top']}>You can ask everything without fear.</p>
                        </Stack>
                    </Grid>
                    <Grid item lg={6}>
                        <Box className={styles['grid-item-2']}>
                            <Box>
                                <p className={styles['text-form-top']}>Ask a Question</p>
                            </Box>
                            <form
                                noValidate
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <Stack gap={3}>

                                    <TextField
                                        label='Your Name*'
                                        className={styles['textfield-input']}
                                        {...register('name')}
                                    ></TextField>
                                    <TextField
                                        label='Your Subject*'
                                        className={styles['textfield-input']}
                                        {...register('subject')}

                                    ></TextField>
                                    <TextField
                                        label='Type Your Message*'
                                        className={styles['textfield-message']}
                                        {...register('message')}

                                    ></TextField>
                                    <Button className={styles['btn']} type='submit'>Submit</Button>
                                </Stack>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default FAQLayer