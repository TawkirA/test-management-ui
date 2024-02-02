import { initialState } from "./appContext.js";

import { REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER,
    DISPLAY_ALERT,
    CLEAR_ALERT,
    TOGGLE_SIDEBAR,
    ADD_TEST_BEGIN,
    ADD_TEST_SUCCESS,
    ADD_TEST_ERROR,
    GET_TEST_BEGIN,
    GET_TEST_SUCCESS,
    GET_TEST_ERROR
} from './actions';

const reducer = (state, action) => {
    
    if (action.type === DISPLAY_ALERT) {
        console.log('ALERT')
        return { ...state, showAlert: true, alertType: 'danger', alertText: 'Provide all the values' }
    }
    
    if (action.type === CLEAR_ALERT) {
        return { ...state, showAlert: false, alertType: '', alertText: '' }
    }

    if (action.type === TOGGLE_SIDEBAR) {
        return { ...state, showSidebar: !state.showSidebar }
    }

    if (action.type === REGISTER_USER_BEGIN) {
        return { ...state, isLoading: true }
    }
    if (action.type === REGISTER_USER_SUCCESS) {
        return { ...state, isLoading: false, user: action.payload.user, token: action.payload.token, showAlert: true, alertType: 'success', alertText: "Registered successfully!"}
    }

    if (action.type === REGISTER_USER_ERROR) {
        return { ...state, isLoading: false, showAlert: true, alertType: 'danger', alertText: "Unable to register user. Try again."}
    }

    if (action.type === LOGIN_USER_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === LOGIN_USER_SUCCESS) {
        return { ...state,
                 isLoading: false,
                 showAlert: true,
                 user: action.payload.user,
                 token: action.payload.token,
                 alertType: 'success',
                 alertText: "Login successful. Redirecting..."
                }
    }

    if (action.type === LOGIN_USER_ERROR) {
        return { ...state,
                 isLoading: false,
                 showAlert: true,                 
                 alertType: 'danger',
                 alertText: action.payload.msg
                }
    }

    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            token: null            
        }
    }

    if (action.type === ADD_TEST_BEGIN) {
        return { ...state, isLoading: true}
    }

    if (action.type === ADD_TEST_SUCCESS) {
        return { ...state, isLoading: false, showAlert: true, alertType: 'success', alertText:'Test added successfully!'}
    }

    if (action.type === ADD_TEST_ERROR) {        
        return { ...state, isLoading: false, showAlert: true, alertType: 'danger', alertText:'Unable to complete request. Please try again.'}
    }

    if (action.type === GET_TEST_BEGIN) {
        return { ...state, isLoading: true}
    }

    if (action.type === GET_TEST_SUCCESS) {
        return { ...state, isLoading: false, tests: action.payload.allTest, showAlert: true, alertType: 'success', alertText:'Test added successfully!'}
    }

    if (action.type === ADD_TEST_ERROR) {
        console.log('CHK')
        return { ...state, isLoading: false, showAlert: true, alertType: 'danger', alertText:'Unable to complete request. Please try again.'}
    }

    throw new Error(`no such action: ${action.type}`);
}

export default reducer