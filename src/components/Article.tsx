import React from "react";
import style from './Article.module.css'
import {useDispatch} from "react-redux";
import {deleteArticleTC} from "../redux/articlesReducer";

type ArticleType = {
    id: number
    title: string
    body: string
}

export const OneArticle = (props: ArticleType) => {
    const dispatch = useDispatch();

    const deleteArticle = (articleId: number) => {
        dispatch(deleteArticleTC(articleId))
    }

    return (<div className={style.flexCards}>
            <div>{props.title}</div>
            <div>{props.body}</div>
            <div><button onClick={()=>deleteArticle(props.id)}>delete</button></div>
        </div>
    )
}
