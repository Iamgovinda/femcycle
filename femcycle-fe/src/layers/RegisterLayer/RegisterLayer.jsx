import React from 'react';
import BreadCrumbCard from '../../components/BreadCrumbCard/BreadCrumbCard';
import { Container } from '@mui/system';
import RegisterCard from '../../components/Register/RegisterCard';
const RegisterLayer = () => {
    return (
        <>
            <BreadCrumbCard view="Register" />
            <Container>
                <RegisterCard />
            </Container>
        </>
    )
}

export default RegisterLayer