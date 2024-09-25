import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./OrderHistoryCard.module.scss";
import { Container, Box } from "@mui/system";
import { styled } from '@mui/material/styles';
import { get, remove } from "../../API/axios";
// import { toast } from "react-toastify";
import ProductView from "../CartTable/ProductView";
import BreadCrumbCard from "../BreadCrumbCard/BreadCrumbCard";
import noDataImg from '../../assets/ProductCard/no-product-found.png';
import DeleteIcon from '@mui/icons-material/Delete';
import {toast} from 'react-toastify';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const OrderHistoryPage = (props) => {
    const [isLoading, SetIsLoading] = useState(true);
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        if (isLoading) {
            get(`/order/recent-orders/`).then((response) => {
                if (response.status === 200) {
                    setOrderData(response?.data);
                    SetIsLoading(false);
                }
            })
        }
    }, [isLoading, orderData])

    const deleteOrder= (uuid)  => {
        remove(`/order/${uuid}/`).then((response)=>{
            if(response.status===204){
                toast.success('Order History Deleted');
                SetIsLoading(!isLoading);
            }
        })
    }

    function createData(uuid, product, date, price, quantity, total, status) {
        return { uuid, product, date, price, quantity, total, status };
    }

    const rows = [];
    orderData?.map((item) => {
        return rows?.push(
            createData(
                item?.uuid,
                {
                    name: item?.product?.name,
                    color: "Brown",
                    size: "XXL",
                    image: item?.product?.images[0]?.file,
                    quantity: item?.product?.quantity,
                },
                item?.updated_at,
                item?.product?.base_price - item?.product?.discount_price,
                item?.quantity,
                item?.quantity *
                (item?.product?.base_price - item?.product?.discount_price),
                item?.status

            )
        );
    });

    return (
        <>
            <BreadCrumbCard view="My Orders" />

            <Container sx={{ marginTop: "2rem" }}>
                {
                    (orderData && orderData.length > 0) ? (
                        <>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell className={styles["table-ceil"]}>Product</StyledTableCell>
                                            <StyledTableCell className={styles["table-ceil"]}>Ordered At</StyledTableCell>
                                            <StyledTableCell className={styles["table-ceil"]} align="left">
                                                Price
                                            </StyledTableCell>
                                            <StyledTableCell className={styles["table-ceil"]} align="left">
                                                Quantity
                                            </StyledTableCell>
                                            <StyledTableCell className={styles["table-ceil"]} align="left">
                                                Total
                                            </StyledTableCell>
                                            <StyledTableCell className={styles["table-ceil"]} align="left">
                                                Status
                                            </StyledTableCell>
                                            <StyledTableCell className={styles["table-ceil"]} align="left">
                                                Action
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows?.map((row, index) => (
                                            <StyledTableRow
                                                key={index}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <StyledTableCell
                                                    component="th"
                                                    scope="row"
                                                    className={styles["table-cell"]}
                                                >
                                                    <ProductView item={row?.product} />
                                                </StyledTableCell>
                                                <StyledTableCell align="left" className={styles["table-cell"]}>
                                                    Rs {row?.date}
                                                </StyledTableCell>
                                                <StyledTableCell align="left" className={styles["table-cell"]}>
                                                    Rs {row?.price}
                                                </StyledTableCell>
                                                <StyledTableCell align="left" className={styles["table-cell"]}>
                                                    <div
                                                        className={styles["box-quantity"]}
                                                    // onClick={() =>
                                                    //   addQuantity(row.uuid, row.quantity, row.product.quantity)
                                                    // }
                                                    >
                                                        {row?.quantity}{" "}

                                                    </div>
                                                </StyledTableCell>
                                                <StyledTableCell align="left" className={styles["table-cell"]}>
                                                    {row?.total}
                                                </StyledTableCell>
                                                <StyledTableCell align="left" className={styles["table-cell"]}>
                                                    {row?.status}
                                                </StyledTableCell>
                                                <StyledTableCell align="center" className={styles["table-cell"]}>
                                                    <DeleteIcon size='large' className={styles['delete-icon']} onClick={() => deleteOrder(row.uuid)} />
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    ) : (
                        <Box>
                            <img src={noDataImg} alt="" />
                        </Box>
                    )
                }

            </Container>
        </>
    );
};

export default OrderHistoryPage;
