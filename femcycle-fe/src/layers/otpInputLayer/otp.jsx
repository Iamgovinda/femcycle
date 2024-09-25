import React from 'react';
import BreadCrumbCard from '../../components/BreadCrumbCard/BreadCrumbCard';
import { Container } from '@mui/system';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
const OTPInputLayer = (props) => {
    const [OTP, setOTP] = React.useState();
    return (
        <>
            <BreadCrumbCard view="OTP verification" />
            <Container>
                <Box minHeight={'15rem'} display='flex' justifyContent={'center'} >
                    <div style={{marginTop:'5rem'}} display="flex" alignItems="center">
                        <TextField
                            label="OTP"
                            id="outlined-required otp"
                            placeholder='OTP'
                            onChange={(e) => setOTP(e.target.value)}
                            marginTop="5rem"
                        />
                    </div>
                </Box>
            </Container>
        </>
    )
}

export default OTPInputLayer