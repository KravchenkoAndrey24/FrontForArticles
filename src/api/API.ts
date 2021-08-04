import axios from 'axios'

// const instance = axios.create({
//     baseURL: 'http://localhost:3000/',
// })

axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.baseURL = 'https://ancient-beach-32575.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const token = {
    set(token: any) {
        axios.defaults.headers = {...token};
    },
    unset() {
        // axios.defaults.headers = '';
    },
};



export const authAPI = {
    registration(data: RegistrationDataType) {
          return  axios.post('api/v1/auth', data).then(res => {
              localStorage.setItem('token', JSON.stringify(res.headers))
              token.set(res.headers);
              return  res.data.data
          }).catch(err =>{
          })
    },
    login(data: RegistrationDataType) {
        localStorage.clear()
            return axios.post('api/v1/auth/sign_in', data).then(res => {
                localStorage.setItem('token', JSON.stringify(res.headers))
                token.set(res.headers.authorization);
                return  res.data.data
            })
    },
    logout(){
        //@ts-ignore
        const localToken = JSON.parse(localStorage.getItem('token'))
        token.set(localToken)
        return axios.delete('api/v1/auth/sign_out').then(res => {
            localStorage.clear()
        }).catch(err => {
            localStorage.clear()
        })
    },
    isAuth(){
        let tokenLocal = localStorage.getItem('token')
        if(tokenLocal !== null){
            token.set(tokenLocal);
        } else {
            localStorage.clear()
            token.unset()
        }
        return axios.get('current_user', {withCredentials: true}).then(res => {
            return res.data
        }).catch(err => {
            token.unset()
            localStorage.clear()
            return Promise.reject()
        })
    }
}

export const articlesApi = {
    getArticles(){
        return axios.get('articles')
    },
    addArticle(articleBody: ArticleBodyType){
        return axios.post('articles', {...articleBody})
    },
    deleteArticle(articleId: number) {
        return axios.delete(`articles/${articleId}`)
    }
}

export type RegistrationDataType = {
    email: string
    password: string
}


export type ArticleBodyType = {
    user_id: number
    title: string
    body: string
}