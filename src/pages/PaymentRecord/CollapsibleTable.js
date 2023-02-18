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
            <TableRow className='test' sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align='center'>
                    <IconButton
                        aria-label="expand row"
                        size="large"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell className='month' component="th" scope="row" align="center">
                    {row.month}
                </TableCell>
                <TableCell align="center">
                    {
                        row.paystate ?
                            <span
                                key={row.paystate}
                                className='alreadypaybtn' disable>{row.paystate}</span>
                            :
                            <button className='paybtn'>去繳費</button>
                    }
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography className='detailtitle' variant="h6" gutterBottom component="div">
                                明細
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className='detailsecondtitle' align="center">課程類別</TableCell>
                                        <TableCell
                                            className='detailsecondtitle' align="center">金額$</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row.Detail.安親班}>

                                        <TableCell className='detailclass' align='center' component="th" scope="row">
                                            {/* {row.Detail} */}
                                            要放課程
                                        </TableCell>
                                        <TableCell className='detailclass' align="center">{row.Detail.安親班}</TableCell>
                                    </TableRow>
                                </TableBody>
                                <TableBody>
                                    <Typography className='detailtitle' variant="h6" gutterBottom component="div">
                                        總計
                                    </Typography>
                                    <TableCell className='detailsecondtitle' align="center">等等再加總</TableCell>
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
            const currentyear = new Date().getFullYear();
            // const currentMonth = new Date().toJSON().slice(0, 7);
            if (user) {
                const dbRef = firebase.database().ref();
                dbRef.child("Users").child(user.uid).child("payrecord").child(currentyear).get().then((snapshot) => {
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
                        <TableCell className='title' align="center">月份</TableCell>
                        <TableCell className='title' align="center">繳費狀態</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {datas.map((row) => (
                        <Row key={row.Detail.month} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}