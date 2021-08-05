import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';
import {PATH} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/reduxStore";
import {logoutTC} from "../redux/userDataReducer";

const Navbar = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<AppStateType, boolean>(state => state.isAuth.isAuth)

    return (
        <nav className={s.nav}>
            {!isAuth ? <><div className={`${s.item} ${s.active}`}>
                            <NavLink to={PATH.registration} activeClassName={s.activeLink}>Registration</NavLink>
                    </div>
                <div className={s.item}>
                    <NavLink to={PATH.login} activeClassName={s.activeLink}>Login</NavLink>
                </div></> : <div className={s.item}>
                <NavLink onClick={()=>dispatch(logoutTC())} to={PATH.login} activeClassName={s.activeLink}>Logout</NavLink>
                </div>
            }
            <div className={s.item}>
                <NavLink to={PATH.todolist} activeClassName={s.activeLink}>Todolist</NavLink>
            </div>


        </nav>
    );
}
export default Navbar