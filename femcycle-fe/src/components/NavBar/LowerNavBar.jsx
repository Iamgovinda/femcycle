import * as React from "react";
import { Container } from "@mui/system";
import style from "./LowerNavBar.module.scss";
import logo from "../../assets/Nav/logo.png";
import SearchBar from "../SearchBar/SearchBar";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
export default function LowerNavBar() {
    const [anchorElForPages, setAnchorElForPages] = React.useState(null);
    const open_page = Boolean(anchorElForPages);
    const [pageName, setPageName] = React.useState("Category");
    const handleClickForPages = (event) => {
        setAnchorElForPages(event.currentTarget);
    };
    const handleCloseForPages = (page) => {
        setAnchorElForPages(null);
        setPageName(page);
        navigate('/search', {
            state: {
                type: "category",
                text: page
            }
        })
    };
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // const toShopLayer = () => {
    //     window.location.replace("/shop-layer")
    // }
    const menuItems = ["Home", "Pages", "Product", "Blog", "Shop", "Contact"];

    return (
        <div className={style["parent"]}>
            <Container className={style["lowerNavBar"]}>
                <div className={style["left"]}>
                    <div className="logo_section">
                        <Link to={"/"}>
                            <h1>Mensuration Diary</h1>
                        </Link>
                    </div>
                    <div className={style["menu"]}>

                        <Link className={style["common-menu-txt"]} to={"/predict-mensuration"}>
                            Predict
                        </Link>
                    </div>


                </div>

            </Container>
        </div>
    );
}
