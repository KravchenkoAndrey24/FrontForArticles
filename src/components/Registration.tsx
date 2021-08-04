import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from  './Registration.module.css'
import { Redirect } from 'react-router';
import { AppStateType } from '../redux/reduxStore';
import { PATH } from '../App';

import {useForm} from "react-hook-form";
import {RegistrationDataType} from "../api/API";
import { registrationTC } from '../redux/userDataReducer';

const Registration = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector<AppStateType, boolean>(state => state.isAuth.isAuth)


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

    if (isAuth) {
        return <Redirect to={PATH.articles} />
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
                    {errors.email && <p className={style.formInputError}>Неверно заполнено поле email</p>}
                    <div className={style.formInput}>
                        <input placeholder='Enter your email' {...register('email', {required: true, pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i})}/>
                    </div>
                    {errors.password && <p className={style.formInputError}>Поле password должно быть не менее 8 символов</p>}
                    <div className={style.formInput}>
                        <input placeholder='Enter your password' type='password' {...register('password', {required: true, minLength: 6})}/>
                    </div> 
                    <button className={style.loginButton} type={'submit'}>Sign up</button>
                </form>
            </div>
        </div>
    );
}
export default Registration;