import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "./ToolBarCard.module.scss";
import WindowIcon from "@mui/icons-material/Window";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const ToolBarCard = (props) => {
    const handlePerPage = (value) =>{
        props?.setLimit(value);
    }
    const handleChange = (event) => {
        props?.setOrdering(event.target.value);
      };
    return (
        <Box
            className={styles["box-parent"]}
            sx={{ display: "flex", justifyContent: "space-between" }}
        >
            <Box className={styles["box-left"]}>
                <Typography className={styles["text-1"]}>
                    Ecommerce Acceories & Fashion item
                </Typography>
                <Typography className={styles["text-2"]}>
                    About {props.count} results (0.62 seconds)
                </Typography>
            </Box>
            <Box className={styles["box-right"]}>
                <Box className="box-1">
                    <span>per page: </span>{" "}
                    <input type="number" style={{ width: "2.5rem" }} onChange={(e)=>handlePerPage(e.target.value)} min={1}/>
                </Box>
                <Box className="box-2">
                    <span>Sort By:</span>{" "}
                    <select name="" id="" onChange={handleChange}>
                        <option className={styles["sort_by"]} value="title" >name</option>
                        <option className={styles["sort_by"]} value="quantity" >quantity</option>
                        <option className={styles["sort_by"]} value="base_price">price</option>
                    </select>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <span>View: </span> <WindowIcon
                        onClick={()=>props.setView('Grid') }
                        className={styles['grid-view']}
                    /> <FormatListBulletedIcon
                        onClick={()=>props.setView('List') }
                        className={styles['list-view']}
                    />
                    {/* <input type="text" style={{ width: "5rem", marginLeft: "1rem" }} /> */}
                </Box>
            </Box>
        </Box>
    );
};

export default ToolBarCard;
