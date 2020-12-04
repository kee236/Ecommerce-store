import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {listOrders} from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    container: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
          width: 800,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
    },
    
  }));

const OrderListScreen = ({history}) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders} = orderList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin



    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        }
        else {
            history.push('/')
        }
    }, [dispatch, history, userInfo])

    return (
        <>
         <h1>Orders</h1>
         {loading ? <Loader/> : error ? <Message error={error}/> : !userInfo ? <Message error={"You have to be an Admin to access this resource"}/> : (
             <TableContainer className={classes.container}>
                 <TableHead>
                     <TableRow>
                         <TableCell>ID</TableCell>
                         <TableCell>USER</TableCell>
                         <TableCell>DATE</TableCell>
                         <TableCell>TOTAL PRICE</TableCell>
                         <TableCell>PAID</TableCell>
                         <TableCell>DELIVERED</TableCell>
                     </TableRow>
                 </TableHead>
                 <TableBody>
                     {orders.map(order => (
                         <TableRow key={order._id}>
                             {console.log(order)}
                            <TableCell>{order._id}</TableCell>
                            <TableCell>{order.user && order.user.name}</TableCell>
                            <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                            <TableCell>${order.totalPrice}</TableCell>
                            <TableCell>{order.isPaid ? (order.createdAt.substring(0, 10)) : (<p>Not Paid</p>)}</TableCell>
                            <TableCell>{order.isDelivered ? (order.deliveredAt.substring(0, 10)) : (<p>Not Delivered</p>)}</TableCell>
                            <TableCell>
                                <Link to={`/order/${order._id}`}>
                                    <Button variaant="contained" color="secondary">Details</Button>
                                </Link>
                            </TableCell>
                         </TableRow>
                     ))}
                 </TableBody>
             </TableContainer>
         ) }   
        </>
    )
}

export default OrderListScreen