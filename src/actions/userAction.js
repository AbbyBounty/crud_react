import {
    USER_ADD_FAIL,
    USER_ADD_REQUEST,
    USER_ADD_SUCCESS,
    USER_FETCH_FAIL,
    USER_FETCH_REQUEST,
    USER_FETCH_SUCCESS,
} from '../constant/userConstant'
import axios from 'axios'

export const getUsers = () => {
    return (dispatch) => {
        dispatch({
            type: USER_FETCH_REQUEST,
        })



        const url = 'http://localhost:8000/users'
        axios
            .get(url)
            .then((response) => {
                dispatch({
                    type: USER_FETCH_SUCCESS,
                    payload: response.data,
                })
            })
            .catch((error) => {
                dispatch({
                    type: USER_FETCH_FAIL,
                    payload: error,
                })
            })
    }
}


export const addUser = (name, salary) => {
    return (dispatch) => {
        dispatch({
            type: USER_FETCH_REQUEST,
        })

        const body = {
            employee_salary: salary,
            employee_name: name
        }

        const url = 'http://localhost:8000/users'
        axios
            .post(url, body)
            .then((response) => {
                dispatch({
                    type: USER_FETCH_SUCCESS,
                    payload: response.data,
                })
            })
            .catch((error) => {
                dispatch({
                    type: USER_FETCH_FAIL,
                    payload: error,
                })
            })
    }
}


export const deleteUser = (id) => {
    return (dispatch) => {
        dispatch({
            type: USER_FETCH_REQUEST,
        })



        const url = 'http://localhost:8000/users/' + id
        axios
            .delete(url)
            .then((response) => {
                dispatch({
                    type: USER_FETCH_SUCCESS,
                    payload: response.data,
                })
            })
            .catch((error) => {
                dispatch({
                    type: USER_FETCH_FAIL,
                    payload: error,
                })
            })
    }
}



export const updateUser = (id, salary, name) => {
    return (dispatch) => {
        dispatch({
            type: USER_FETCH_REQUEST,
        })

        const body = {
            employee_salary: salary,
            employee_name: name,
            permission_level:400
        }


        const url = 'http://localhost:8000/users/' + id
        axios
            .put(url, body)
            .then((response) => {
                dispatch({
                    type: USER_FETCH_SUCCESS,
                    payload: response.data,
                })
            })
            .catch((error) => {
                dispatch({
                    type: USER_FETCH_FAIL,
                    payload: error,
                })
            })
    }
}