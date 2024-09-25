import React from 'react'
import BreadCrumbCard from '../../components/BreadCrumbCard/BreadCrumbCard'
import LoginCard from '../../components/LoginCard/LoginCard'
import { Container } from '@mui/system'

const LoginLayer = () => {
    return (
        <>
            <BreadCrumbCard view="Login" />
            <Container>
                <LoginCard />
            </Container>
        </>
    )
}

export default LoginLayer