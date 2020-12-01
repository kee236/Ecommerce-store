import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {listUsers} from '../actions/userActions'
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

const UserListScreen = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList


    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch])

    const deleteHandler = (id) => {
        console.log("wahya")
    }
    return (
        <>
         <h1>Users</h1>
         {loading ? <Loader/> : error ? <Message error={error}/> :(
             <TableContainer className={classes.container}>
                 <TableHead>
                     <TableRow>
                         <TableCell>ID</TableCell>
                         <TableCell>NAME</TableCell>
                         <TableCell>EMAIL</TableCell>
                         <TableCell>Admin</TableCell>
                         <TableCell>Edit</TableCell>
                     </TableRow>
                 </TableHead>
                 <TableBody>
                     {users.map(user => (
                         <TableRow key={user._id}>
                            <TableCell>{user._id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell><a href={`mailto:${user.email}`}>{user.email}</a></TableCell>
                            <TableCell>{user.isAdmin ? (<p>Admin</p>) : (<p>Not admin</p>)}</TableCell>
                            <TableCell>
                                <Link to={`/user/${user._id}/edit`}>
                                    <Button variaant="contained" color="secondary">Edit</Button>
                                </Link>
                                <Button onClick={()=>deleteHandler(user._id)} variant="danger">Del</Button>
                            </TableCell>
                         </TableRow>
                     ))}
                 </TableBody>
             </TableContainer>
         ) }   
        </>
    )
}

export default UserListScreen