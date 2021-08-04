import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';
import {PATH} from "../App";

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to={PATH.registration} activeClassName={s.activeLink}>Registration</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={PATH.login} activeClassName={s.activeLink}>Login</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={PATH.articles} activeClassName={s.activeLink}>Articles</NavLink>
            </div>


        </nav>
    );
}
export default Navbar