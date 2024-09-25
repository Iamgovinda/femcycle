import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./CartTable.module.scss";
import ProductView from "./ProductView";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { get, patch, post, remove } from "../../API/axios";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-toastify";
import { useCartContext } from "../../context/CartCountContex";
const CartTable = (props) => {
    // const [quantity, setQuantity] = React.useState();
    // console.log("Propsss: ", props);
    const {setCartCountData} = useCartContext();
    const addQuantity = (uuid, qua, tot_qua) => {
        const quantity = (qua) < (tot_qua+qua) ? qua + 1 : qua;
        patch(`/order/${uuid}/`, { quantity: quantity }).then((response) => {
            if (response.status) {
                props?.setIsLoading(true);
            }
        });
    };
    const subtractQuantity = (uuid, qua) => {
        const quantity = qua > 1 ? qua - 1 : 1;
        patch(`/order/${uuid}/`, { quantity: quantity }).then((response) => {
            if (response.status) {
                props?.setIsLoading(true);
            }
        });
    };
    function createData(uuid, product, price, quantity, total) {
        return { uuid, product, price, quantity, total };
    }

    const rows = [];
    props?.item?.map((item) => {
        return rows.push(
            createData(
                item?.uuid,
                {
                    name: item?.product?.name,
                    color: "Brown",
                    size: "XXL",
                    image: item?.product?.images[0]?.file,
                    quantity: item?.product?.quantity,
                },
                item?.product?.base_price - item?.product?.discount_price,
                item?.quantity,
                item?.quantity *
                (item?.product?.base_price - item?.product?.discount_price)
            )
        );
    });

    const deleteOrder= (uuid)  => {
        post(`/order/${uuid}/remove-order/`).then((response)=>{
            if(response.status===201 || response.status==200){
                toast.success('Order Removed');
                setCartCountData(true);
                props?.setIsLoading(true);
            }
        })
    }

    const clearCart = (uuid) =>{
        get(`/order/clear-order/`).then((response)=>{
            if(response.status===200){
                toast.success('Cart Cleared');
                setCartCountData(true);
                props?.setIsLoading(true);
            }
        })
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={styles["table-ceil"]}>Product</TableCell>
                            <TableCell className={styles["table-ceil"]} align="right">
                                Price
                            </TableCell>
                            <TableCell className={styles["table-ceil"]} align="right">
                                Quantity
                            </TableCell>
                            <TableCell className={styles["table-ceil"]} align="right">
                                Total
                            </TableCell>
                            <TableCell className={styles["table-ceil"]} align="right">
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    className={styles["table-cell"]}
                                >
                                    <ProductView item={row.product} />
                                </TableCell>
                                <TableCell align="right" className={styles["table-cell"]}>
                                    Rs {row.price}
                                </TableCell>
                                <TableCell align="right" className={styles["table-cell"]}>
                                    <div
                                        className={styles["box-quantity"]}
                                    // onClick={() =>
                                    //   addQuantity(row.uuid, row.quantity, row.product.quantity)
                                    // }
                                    >
                                        <div
                                            className={styles["plus"]}
                                            onClick={() =>
                                                addQuantity(row.uuid, row.quantity, row.product.quantity)
                                            }
                                        >
                                            <AddIcon />
                                        </div>{" "}
                                        {row.quantity}{" "}
                                        <div
                                            className={styles["minus"]}
                                            onClick={() => subtractQuantity(row.uuid, row.quantity)}
                                        >
                                            <RemoveIcon />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="right" className={styles["table-cell"]}>
                                    {row.total}
                                </TableCell>
                                <TableCell align="right" className={styles["table-cell"]}>
                                    <DeleteIcon size='large' className={styles['delete-icon']} onClick={()=>deleteOrder(row.uuid)}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box className={styles["button-section"]}>
                <Button className={styles["btn"]} onClick={()=>clearCart()}>Clear Cart</Button>
            </Box>
        </>
    );
};

export default CartTable;
