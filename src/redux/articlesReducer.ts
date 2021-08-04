import {Dispatch} from "redux";
import {ArticleBodyType, articlesApi} from "../api/API";
import { setAppStatusAC } from "./appReducer";

export enum ACTION_TYPES {
    SET_ARTICLES = "SET_ARTICLES",
    ADD_ARTICLE = 'ADD_ARTICLE',
    DELETE_ARTICLE = 'DELETE_ARTICLE'
}

export type ArticlesActionsType = ReturnType<typeof setArticlesAC>
    | ReturnType<typeof addArticleAC>
    | ReturnType<typeof deleteArticleAC>

export type ArticleType = {
    userId: number
    id: number
    title: string
    body: string
}
let initialState: ArticleType[] = []

type initialStateType = typeof initialState;

export const articlesReducer = (state: initialStateType = initialState, action: ArticlesActionsType): initialStateType => {
    switch (action.type) {
        case ACTION_TYPES.SET_ARTICLES:
            return action.articlesData.reverse();
        case ACTION_TYPES.ADD_ARTICLE:
            return  [action.article, ...state]
        case ACTION_TYPES.DELETE_ARTICLE:
            return  state.filter(item => item.id !== action.articleId)
        default:
            return state
    }
}

export const setArticlesAC = (articlesData: ArticleType[]) => ({ type: ACTION_TYPES.SET_ARTICLES, articlesData } as const)
export const addArticleAC = (article: ArticleType) => ({ type: ACTION_TYPES.ADD_ARTICLE, article } as const)
export const deleteArticleAC = (articleId: number) => ({ type: ACTION_TYPES.DELETE_ARTICLE, articleId } as const)



export const setArticleTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    articlesApi.getArticles().then(res => {
        dispatch(setArticlesAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    }).catch( err => {
        dispatch(setAppStatusAC('succeeded'))
        }
    )
}

export const addArticleTC = (articleBody: ArticleBodyType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    articlesApi.addArticle(articleBody).then(res => {
        dispatch(addArticleAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    }).catch( err => {
        dispatch(setAppStatusAC('succeeded'))
        }
    )
}

export const deleteArticleTC = (articleId: number) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    articlesApi.deleteArticle(articleId).then(res => {
        dispatch(deleteArticleAC(articleId))
        dispatch(setAppStatusAC('succeeded'))
    }).catch(err => {
        dispatch(setAppStatusAC('succeeded'))
        }
    )
}



