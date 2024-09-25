import React from 'react';
import FooterLayer from '../components/Footer/FooterLayer';
import UpperNavBar from '../components/NavBar/UpperNavBar';
import LowerNavBar from '../components/NavBar/LowerNavBar';

const MasterLayer = (props) => {
    return (
        <>
            <UpperNavBar />
            <LowerNavBar />
            {props.children}
            <FooterLayer />
        </>
    )
}

export default MasterLayer