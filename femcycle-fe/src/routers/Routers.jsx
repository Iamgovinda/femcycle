import { Route, Routes } from "react-router-dom";
import React, { useEffect } from 'react';
import HomeLayer from "../layers/HomeLayer/HomeLayer";
import MasterLayer from "../layers/MasterLayer";
import LoginLayer from "../layers/LoginLayer/LoginLayer";
import AboutUsLayer from "../layers/AboutUsLayer/AboutUsLayer";
import ContactUsLayer from "../layers/ContactUsLayer/ContactUsLayer";
import PageNotFound from "../layers/PageNotFoundLayer/PageNotFound";
import FAQLayer from "../layers/FAQ/FAQLayer";
import RegisterLayer from "../layers/RegisterLayer/RegisterLayer";
import { useUserContext } from "../context/UserContext";
import { get } from "../API/axios";
import { toast } from "react-toastify";
import ProfileLayer from "../layers/ProfileLayer/ProfileLayer";
import PrivateRoutes from "./PrivateRoutes";
import PredictionLayer from "../layers/PredictionLayer/PredictionLayer";

const Routers = () => {
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
    <MasterLayer>
      <Routes>
        <Route path="/" element={<HomeLayer />} />
        <Route path="/login" element={<LoginLayer />} />
        <Route path="/register" element={<RegisterLayer />} />
        <Route path="/about" element={<AboutUsLayer />} />
        <Route path="/contact-us" element={<ContactUsLayer />} />
        <Route path="/FAQ" element={<FAQLayer />} />
        {/* <Route path="/verify-otp" element={<OTP/>}/> */}
        <Route path='*' element={<PageNotFound />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<ProfileLayer />} />
          <Route path="/predict-mensuration" element={<PredictionLayer />} />

        </Route>
      </Routes>
    </MasterLayer>
  )
}

export default Routers