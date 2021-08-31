import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Registration.module.scss'
import { Redirect } from 'react-router';
import { AppStateType } from '../redux/reduxStore';
import { PATH } from '../App';
import {useForm} from "react-hook-form";
import {RegistrationDataType} from "../api/API";
import { registrationTC } from '../redux/userDataReducer';
import {setAppStatusAC, setErrorsAC} from "../redux/appReducer";
import {NavLink} from "react-router-dom";

const Registration = () => {

    const dispatch = useDispatch();
    const isAuth = useSelector<AppStateType, boolean>(state => state.isAuth.isAuth)
    const resError = useSelector<AppStateType, string>(state => state.app.error)
    const isRedirect = useSelector<AppStateType, boolean>(state => state.isAuth.isRedirect);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm()
    const sendRegistrationData = (data: RegistrationDataType) => {
        dispatch(registrationTC(data))
        reset()
    }
    if (isRedirect && isAuth) {
        return <Redirect to={PATH.todolist} />
    }
    return (
        <div className={style.main}>
            <div className={style.mainBlock}>
                <div className={style.title}>
                    Blog
                </div>
                <div className={style.subTitle}>
                    Sign Up
                </div>
                <form onSubmit={handleSubmit(sendRegistrationData)} className={style.form}>
                    <div className={style.formInput}>
                        <input onFocus={()=>{dispatch(setErrorsAC(''))}} placeholder='Enter your email' {...register('email', {required: true, pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i})}/>
                        {errors.email && <p className={style.formInputError}>Invalid email field</p>}
                        {resError && <p className={style.formInputError}>{resError}</p>}
                    </div>
                    <div className={style.formInput}>
                        <input onFocus={()=>{dispatch(setErrorsAC(''))}} placeholder='Enter your password' type='password' {...register('password', {required: true, minLength: 6})}/>
                        {errors.password && <p className={style.formInputError}>Password must be more than 6 characters</p>}
                    </div> 
                        <button className={style.loginButton} type={'submit'}>Sign up</button>
                        <a onClick={()=>{dispatch(setAppStatusAC('loading'))}} className={style.signInGit} href="https://shrouded-caverns-92109.herokuapp.com/api/v1/auth/github">Sign up with GitHub</a>
                        <a onClick={()=>{dispatch(setAppStatusAC('loading'))}} className={style.signInGit}  href="https://shrouded-caverns-92109.herokuapp.com/api/v1/auth/google_oauth2">Sign in with Google</a>
                </form>
                <div className={style.askAboutAccount}>
                    <span>Do you have an account?</span>
                </div>
                <div className={style.singUp}>
                    <span><NavLink to={PATH.login}>Sign In</NavLink></span>
                </div>
            </div>
        </div>
    );
}
export default Registration;
