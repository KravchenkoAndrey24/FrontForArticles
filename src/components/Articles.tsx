import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/reduxStore";
import {Redirect} from "react-router";
import {PATH} from "../App";
import {addArticleTC, ArticleType, setArticleTC} from "../redux/articlesReducer";
import style from './Articles.module.css'
import {OneArticle} from "./Article";
import { logoutTC } from "../redux/userDataReducer";

export const Articles = () => {

    const dispatch = useDispatch()
    const currentUserEmail = useSelector<AppStateType, string>(state => state.userData.email)
    const isAuth = useSelector<AppStateType, boolean>(state=>state.isAuth.isAuth);
    const articles = useSelector<AppStateType, ArticleType[]>(state=>state.articles)
    const [title, setTitle] = useState<string>('')
    const [body, setBody] = useState<string>('')

    useEffect(()=>{
        dispatch(setArticleTC())
    }, [dispatch])

    if(!isAuth){
        return <Redirect to={PATH.login} />
    }

    const logout = () => {
        dispatch(logoutTC())
    }

    const addArticle = () => {
        dispatch(addArticleTC({title,body, user_id: 1}))
        setBody('')
        setTitle('')
    }
    return <>
        <div className={style.main}>
            <div className={style.newArticleBody}>
                <input type='text' placeholder={'Enter article title'} value={title}
                       onChange={(e)=>setTitle(e.currentTarget.value)}
                />
                <input type='text' placeholder={'Enter article body'} value={body}
                       onChange={(e)=>setBody(e.currentTarget.value)}
                />
                <button onClick={addArticle}>Create new article</button>

                <button onClick={logout}>Logout</button>
            </div>
        <div className={style.bodyTable}>
            <div className={style.borderTable}>
                {currentUserEmail}
                {articles.map(item => {
                            return <OneArticle key={item.id} id={item.id} title={item.title} body={item.body} />
                        })}
            </div>
        </div>
    </div>
</>
}