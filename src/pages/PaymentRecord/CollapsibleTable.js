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
                        className='iconbutton'
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
                                className='alreadypaybtn' disable="true">{row.paystate}</span>
                            :
                            <button className='paybtn'>去繳費</button>
                    }
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography className='detailtitle' align='center' variant="h6" gutterBottom component="div">
                                繳費細項
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className='title' align="center">課程類別</TableCell>
                                        <TableCell
                                            className='title' align="center">課程數量</TableCell>
                                        <TableCell
                                            className='title' align="center">金額$</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.Detail.map((historyRow) => (
                                        <TableRow key={historyRow.classname}>
                                            <TableCell className='detailclass' align='center' component="th" scope="row">
                                                {historyRow.classname}
                                            </TableCell>
                                            <TableCell className='detailclass' align='center'>{historyRow.amount}</TableCell>
                                            <TableCell className='detailclass' align='center'>{historyRow.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className='title' align="center">總計 : </TableCell>
                                        <TableCell className='title' align="center">  </TableCell>
                                        <TableCell className='title' align="center">
                                            {
                                                row.Detail.map(({ price, amount }) => price * amount).reduce((sum, i) => sum + i, 0)
                                            }
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
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
                window.location.href = "/"
            }
        });
    }, [])


    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell className='title' align="center">明細</TableCell>
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
        </Paper>
    );
}