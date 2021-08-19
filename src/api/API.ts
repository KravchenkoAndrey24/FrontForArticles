import axios from 'axios'
import { todoItemBodyType } from '../redux/todolistReducer';


// axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.baseURL = 'https://shrouded-caverns-92109.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const token = {
    set(token: any) {
        axios.defaults.headers = {...token};
    },
    unset(){
        axios.defaults.headers = '';
    }
};

export const authAPI = {
    registration(data: RegistrationDataType) {
          return  axios.post('api/v1/auth', data).then(res => {
              localStorage.setItem('token', JSON.stringify(res.headers))
              token.set(res.headers);
              return  res.data.data
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
        }
        return axios.get('current_user', ).then(res => {
            return res.data
        }).catch(err => {
            localStorage.clear()
            return Promise.reject()
        })
    }
}

export const todolistApi = {
    getTokenFromLocal() {
        const localRawToken = localStorage.getItem('token')
        if(localRawToken) {
            const localToken = JSON.parse(localRawToken)
            token.set(localToken)
        } else {
            token.unset()
        }
    },
    getTodolist(){
        this.getTokenFromLocal()
        return  axios.get("api/v1/todo_items")
    },
    addTodoItem(todoItemBody : todoItemBodyType){
        this.getTokenFromLocal()
        return axios.post('api/v1/todo_items', todoItemBody)
    },
    deleteTodoItem(todoItemId: number) {
        this.getTokenFromLocal()
        return axios.delete(`api/v1/todo_items/${todoItemId}`)
    },
    updateTodoItem(todoItemId: number, edit_complete: boolean, edit_title: string, ) {
        this.getTokenFromLocal()
        return axios.put(`api/v1/todo_items/${todoItemId}`, {edit_complete, edit_title })
    }
}

export type RegistrationDataType = {
    email: string
    password: string
}
