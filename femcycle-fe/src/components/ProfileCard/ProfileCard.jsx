import React from "react";
import { Box, Button } from "@mui/material";

import styles from "./ProfileCard.module.scss";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";

import { removeToken } from "../../utils/token";
import { toast } from "react-toastify";
import ProfileEditModal from "./ProfileEditModal";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "./ChangePasswordModal";

const ProfileCard = (props) => {
  const [open, setOpen] = React.useState(false);
  const [openChange, setOpenChange] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClick = () => {
    let inputBtn = document.getElementById("my_input");
    inputBtn.click();
  };

  const handleLogout = () => {
    removeToken({ name: "token" });
    navigate('/');
    toast.success("Logged out successfully!");
  };

  return (
    <>
      <Box className={styles["profile-box"]}>
        <Box className={styles["top"]}>
          <img
            src={
              props?.user?.profile_picture ??
              "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
            }
            alt="profile"
            className={styles["profileImage"]}
          />
          <p>{props?.user?.email}</p>
          <p>{props?.user?.phone_number}</p>
        </Box>
        <Box className={styles["account"]}>
          <p className={styles["account-p-1"]}>Account</p>
          <Button className={styles["account-p-2"]} onClick={handleClickOpen}>
            Edit Profile
          </Button>
        </Box>
        <Box className={styles['change-password']} onClick={()=>setOpenChange(true)}>
          <LockIcon className={styles['icon']} /><span>Change Password</span>
        </Box>
        {open && <ProfileEditModal open={open} setOpen={setOpen} user={props?.user} />}
        {openChange && <ChangePasswordModal otpModalOpen={openChange}  setOpenChange={setOpenChange} />}
        <Box className={styles["logout"]} onClick={() => handleLogout()}>
          <LogoutIcon className={styles["icon"]} />
          <span>Sign Out</span>
        </Box>
      </Box>
    </>
  );
};

export default ProfileCard;
