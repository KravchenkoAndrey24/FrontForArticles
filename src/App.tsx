import React, {useEffect} from 'react';
import './App.module.css';
import {Route, Switch, useLocation} from "react-router-dom";
import Registration from './components/Registration';
import {Todolist} from "./components/todolist/Todolist";
import { Login } from './components/Login';
import style from './App.module.css'
import Navbar from './components/Navbar';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router";
import {Preloader} from "./components/preloader/Preloader";
import {AppStateType} from "./redux/reduxStore";
import { setIsAuth } from './redux/isAuthReducer';
import axios from 'axios';
import {setUserData} from "./redux/userDataReducer";

export const PATH = {
    registration: '/registration',
    login: '/login',
    todolist: '/todolist'
}

function App() {
    const dispatch = useDispatch();
    const status = useSelector<AppStateType>(state => state.app.status)

    const location = useLocation()
    const rawToken = new URLSearchParams(location.search).get('token');
 
    useEffect(() => {
        if(rawToken){
            const decodeToken = atob(rawToken)
            localStorage.setItem('token', decodeToken)
        }
        const localRawToken = localStorage.getItem('token')
        if(localRawToken){
            const token = JSON.parse(localRawToken)
            axios.get('http://localhost:3000/me', {headers: {
              'access-token': token['access-token'],
              'expiry': token.expiry,
              'client': token.client,
              'uid': token.uid,
              'token-type': 'Bearer'  
          }}).then(res => {
              dispatch(setUserData(res.data));
              dispatch(setIsAuth(true))
          }).catch(err => {
              dispatch(setIsAuth(false));
              localStorage.clear()
            })
        }
    }, [rawToken]);

  
  return (
    <div className="App">
        <div className={style.navBar}><Navbar /></div>
        {status === 'loading' && <div className={style.preLoader}><Preloader /></div>}
      <Switch>
          <Route path={PATH.registration} render={() => <Registration />} />
          <Route path={PATH.login} render={() => <Login />} />
          <Route path={PATH.todolist} render={() => <Todolist />} />
          <Redirect to={PATH.login} />
      </Switch>
    </div>
  );
}

export default App;
