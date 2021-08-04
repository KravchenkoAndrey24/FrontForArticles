import React, { useEffect } from 'react';
import style from './Login.module.css';
import { useDispatch, useSelector } from "react-redux";
import {NavLink, Redirect, useLocation } from 'react-router-dom';
import { AppStateType } from '../redux/reduxStore';
import { PATH } from '../App';
import { useForm } from 'react-hook-form'
import {RegistrationDataType} from "../api/API";
import { loginTC } from '../redux/userDataReducer';

export const Login = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector<AppStateType, boolean>(state => state.isAuth.isAuth)

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm()
    
    if (isAuth) {
        return <Redirect to={PATH.articles} />
    }

    const setUserData = (data: RegistrationDataType) => {
        dispatch(loginTC(data))
        reset()
    }

   


    return  (
            <div className={style.main}>
                <div className={style.mainBlock}>
                    <div className={style.title}>
                        Blog
                    </div>
                    <div className={style.subTitle}>
                        Sign In
                    </div>
                    <form onSubmit={handleSubmit(setUserData)} className={style.form}>
                        {errors.email && <p className={style.formInputError}>Неверно заполнено поле email</p>}
                        <div className={style.formInput}>
                            <input placeholder='Enter your email' {...register('email', {required: true, pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i})}/>
                        </div>
                        {errors.password && <p className={style.formInputError}>Поле password должно быть не менее 8 символов</p>}
                        <div className={style.formInput}>
                            <input placeholder='Enter your password' type='password' {...register('password', {required: true, minLength: 6})}/>
                        </div>
                        <button className={style.loginButton} type={'submit'}>Sign in</button>
                        <a className={style.signInGit} href="http://localhost:3000/api/v1/auth/github">Sign in with GitHub</a>
                    </form>
                    <div className={style.askAboutAccount}>
                        <span>Don’t have an account?</span>
                    </div>
                    <div className={style.singUp}>
                        <span><NavLink to={PATH.registration}>Sign Up</NavLink></span>
                    </div>
                </div>
            </div>
        );
}