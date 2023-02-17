import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './PaymentRecord.scss'
import firebase from "../firebase";
import { useEffect } from 'react';

// function createData(month, paystate) {
//     return {
//         month,
//         paystate,
//         detail: [
//             {
//                 classtype: '安親班',
//                 classamount: '3月',
//                 amount: 7300,
//             },
//             {
//                 classtype: '英文班',
//                 classamount: '8堂',
//                 amount: 2000,
//             },
//         ],
//     };
// }

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align='center'>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                    {row.month}
                </TableCell>
                <TableCell align="center">
                    {
                        row.paystate ?
                            <span
                                key={row.paystate}
                                className='text-success fw-7'>{row.paystate}</span>
                            :
                            <button className='paybtn'>去繳費</button>
                    }
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                明細
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>課程類別</TableCell>
                                        <TableCell align="center">金額$</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {row.map((detailRow) => (
                                        <TableRow key={detailRow.detail.class}>
                                            <TableCell component="th" scope="row">
                                                {detailRow.detail.class}
                                            </TableCell>
                                            <TableCell align="center">{detailRow.detail.amount}</TableCell>
                                        </TableRow>
                                    ))} */}
                                    <TableRow key={row.detail.class}>
                                        <TableCell component="th" scope="row">
                                            {row.detail.class}
                                        </TableCell>
                                        <TableCell align="center">{row.detail.amount}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        paystate: PropTypes.string.isRequired,
        month: PropTypes.string.isRequired,
    }).isRequired,
};

export default function CollapsibleTable() {
    const [datas, setDatas] = React.useState([]);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            // const currentMonth = new Date().toJSON().slice(0, 7);
            if (user) {
                const dbRef = firebase.database().ref();
                dbRef.child("Users").child(user.uid).child("payrecord").get().then((snapshot) => {
                    if (snapshot.exists()) {
                        setDatas(snapshot.val());
                    } else {
                        setDatas()
                    }
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                window.location.href = "/login"
            }
        });
    }, [])


    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align="center">月份</TableCell>
                        <TableCell align="center">繳費狀態</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {datas.map((row) => (
                        <Row key={row.month} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}