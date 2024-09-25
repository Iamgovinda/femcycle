import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import styles from "./UpperNavBar.module.scss";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from "react-router-dom";
import { get } from "../../API/axios";
import { useUserContext } from "../../context/UserContext";
import LogoutIcon from '@mui/icons-material/Logout';
import { removeToken } from "../../utils/token";
import { toast } from "react-toastify";
import { useCartContext } from "../../context/CartCountContex";

// import MenuIcon from '@mui/icons-material/Menu';

const UpperNavBar = (props) => {
  const [language, setLanguage] = React.useState('English');
  const [currency, setCurrency] = React.useState('USD');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElForCurrency, setAnchorElForCurrency] = React.useState(null);
  const open = Boolean(anchorEl);
  const openForCurrency = Boolean(anchorElForCurrency);
  const { user, setUserData } = useUserContext();
  const isAuthed = localStorage.getItem("token");
  // const [loading, setLoading] = React.useState(true);
  const { cart, setCartCountData } = useCartContext();
  const [cartCount, setCartCount] = useState();

  useEffect(() => {
    if (isAuthed && !user) {
      get(`/user/${"me"}/`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((err) => { });
    }
    //eslint-disable-next-line
  }, [isAuthed, user]);

  useEffect(() => {
    if (isAuthed && cart) {
      get(`/order/`)
        .then((response) => {
          setCartCount(response.data?.page?.count);
          setCartCountData(false);
        })
        .catch((err) => { });
    }
    //eslint-disable-next-line
  }, [isAuthed, cart]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickForCurrency = (event) => {
    setAnchorElForCurrency(event.currentTarget);
  }
  const handleClose = (language) => {
    setAnchorEl(null);
    setLanguage(language);
  };
  const handleCloseForCurrency = (currency) => {
    setAnchorElForCurrency(null);
    setCurrency(currency);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken({ name: 'token' });
    window.location.reload();
    toast.success('Logged out successfully!');
  }
  // const menuItems = ['Login', 'Cart', 'WishList']
  return (
    <div className={styles["parent"]}>
      <Container className={styles["upperNav"]}>

        <div className={styles["left"]}>
          <div className={styles["email"]}>
            <EmailOutlinedIcon fontSize="lg" />
            <p>contact.hecktoapp@gmail.com</p>
          </div>
          <div className={styles["phone"]}>
            <LocalPhoneOutlinedIcon fontSize="lg" color="red" />
            <p>(+977)9813293156</p>
          </div>
        </div>

        <div className={styles["right"]}>
          <div
            className={styles['language']}
            id="language-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            {language}
            <ArrowDropDownOutlinedIcon style={{ color: 'white' }} fontSize='medium' />

          </div>
          <Menu
            id="language-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose(language)}
            MenuListProps={{
              'aria-labelledby': 'language-button',
            }}
          >
            <MenuItem onClick={() => handleClose("English")} >English</MenuItem>
            <MenuItem onClick={() => handleClose("Nepali")} >Nepali</MenuItem>
            <MenuItem onClick={() => handleClose("Spanish")} >Spanish</MenuItem>
          </Menu>


          {
            !isAuthed ? (
              <div >
                <Link to={'/login'} className={styles['login']}>
                  <p>Login</p>
                  <PersonOutlineOutlinedIcon />
                </Link>
              </div>
            ) : (

              <div className={styles['login']} onClick={() => navigate('/profile')}>
                <p>{user?.name}</p>
                <PersonOutlineOutlinedIcon />
                <LogoutIcon className={styles['logout']} onClick={() => handleLogout()} />
              </div>

            )
          }

        </div>

      </Container>
    </div>
  );
};

export default UpperNavBar;
