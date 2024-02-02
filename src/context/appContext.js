import React, { useReducer, useContext } from 'react';
import reducer from './reducer';
import axios from 'axios';

import { DISPLAY_ALERT,
         CLEAR_ALERT,
         TOGGLE_SIDEBAR,
         REGISTER_USER_BEGIN,
         REGISTER_USER_SUCCESS,
         REGISTER_USER_ERROR,
         LOGIN_USER_BEGIN,
         LOGIN_USER_SUCCESS,
         LOGIN_USER_ERROR,
         LOGOUT_USER,
         ADD_TEST_BEGIN,
         ADD_TEST_SUCCESS,
         ADD_TEST_ERROR,
         GET_TEST_BEGIN,
         GET_TEST_SUCCESS,
         GET_TEST_ERROR } from './actions';

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    tests: [],
    subject: '',
    chapters: '',
    examDt: '',
    totalMarks: 0,
    // userLocation: userLocation || '',    
    showSidebar: false,
    // isEditing: false,
    // editjobId: '',
    // position: '',
    // company: '',
    // jobLocation: userLocation || '',
    // jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    // jobType: 'full-time',
    // statusOptions: ['interview', 'declined', 'pending'],
    // status: 'pending',
    // jobs: [],
    // totalJobs: 0,
    // numOfPages: 1,
    // page: 1
}

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const authReq = axios.create({
        // baseURL: 'http://localhost:4000/api/v1'
        baseURL: 'https://test-mgmt.onrender.com/api/v1'
    })

    // Req interceptor
    authReq.interceptors.request.use(
        (config) => {
            config.headers['Authorization'] = `Bearer ${state.token}`
            return config
        }, (error) => {
            return Promise.reject(error)
        }
    )

    // Res interceptor
    authReq.interceptors.response.use(
        (response) => {
            return response
        }, (error) => {
            if (error.response.status === 401 || error.response.status === 500) {
                // logoutuser()
            }
            Promise.reject(error)
        }
    )

    const displayAlert = () => {
        console.log('displayAlert');
        dispatch({ type: DISPLAY_ALERT });
        clearAlert() 
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT });
        }, 3000);
    }

    const addUserToLocalStorage = ({ user, token }) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);        
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })                
        try {
            const response = await axios.post('http://localhost:4000/api/v1/auth/register', currentUser)
            console.log(response);
            // console.log(currentUser)
            const { user, token } = response.data;
            dispatch({ type: REGISTER_USER_SUCCESS, payload: {user, token}})
            addUserToLocalStorage({ user, token });
        } catch (error) {
            console.log(error.response)
            dispatch({ type: REGISTER_USER_ERROR, payload: { msg: error.response.msg }})
        }
        clearAlert()
    }

    const loginUser = async (userInfo) => {
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
            const response = await authReq.post('/auth/login', userInfo)
            console.log('RESP', response);
            const {user, token} = response.data
            dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token } })
            addUserToLocalStorage({ user, token })
        } catch (error) {
            console.log(error.response)
            dispatch({ type: LOGIN_USER_ERROR, payload: { msg: error.response.msg }})
        }
        clearAlert()
    }

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER });
        removeUserFromLocalStorage();
    }

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR })
    }

    const addTest = async (testInfo) => {
        dispatch({ type: ADD_TEST_BEGIN })
        console.log('testInfo', testInfo);
        try {
            const response = await authReq.post('/test/add-test', testInfo)            
            dispatch({ type: ADD_TEST_SUCCESS, payload: {msg: response.msg}})
        } catch (error) {
            console.log('Error', error.response)
            dispatch({ type: ADD_TEST_ERROR, payload: { msg: error.response.msg }})
        }
        clearAlert()
    }

    const getTests = async () => {
        dispatch({ type: GET_TEST_BEGIN });
        try {
            const response = await authReq.get('/test')        
            const { allTest } = response.data;
            dispatch({ type: GET_TEST_SUCCESS, payload: {allTest}})
        } catch (error) {
            console.log('Error', error.response)
            dispatch({ type: GET_TEST_ERROR, payload: { msg: error.response.msg }})
        }    
    }

    const getTestById = (testList, id) => {        
        return testList.find(test => test._id === id)
    }

    return <AppContext.Provider value={{ ...state, displayAlert, registerUser, loginUser, logoutUser, toggleSidebar, addTest, getTests, getTestById }}>{children}</AppContext.Provider>
}

// custom hook
const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }