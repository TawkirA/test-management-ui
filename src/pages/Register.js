import { useState, useEffect } from "react";
import { FormRow, Alert }  from '../components';
import { useAppContext } from "../context/appContext";
import { useNavigate } from 'react-router-dom';
import Wrapper from "../assets/wrappers/Register.js";


const initialState = {
    name: '',
    phoneNumber: '',
    password: '',
    isMember: false 
}

const Register = () => {
    const [values, setValues] = useState(initialState);
    const { user, displayAlert, showAlert, registerUser, loginUser } = useAppContext();
    const navigate = useNavigate();

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember })
    }

    const handleChange = (e) => {        
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('Submit') 
        const { name, phoneNumber, password, isMember } = values;
        if ((!isMember && !name) || !phoneNumber || !password) {
            displayAlert();
            return
        }

        const currentUser = {name , phoneNumber, password}        
        if (values.isMember) {
            loginUser(currentUser)
        } else {
            registerUser(currentUser)
        }
    }

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    }, [user, navigate])

    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                <h3>{ values.isMember ? 'Login' : 'Register' }</h3>
                {showAlert}
                {showAlert && <Alert />}
                { !values.isMember && <FormRow name="name" type="text" value={values.name} handleChange={handleChange} /> }
                <FormRow labelText="mobile" name="phoneNumber" type="phone" value={values.phoneNumber} handleChange={handleChange} />
                <FormRow name="password" type="password" value={values.password} handleChange={handleChange} />                
                <button type="submit" className="btn btn-block">submit</button>
                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                    <button type='button' className='member-btn' onClick={toggleMember}>
                        {values.isMember ? 'Register' : 'Login'}    
                    </button>  
                </p>
            </form>
        </Wrapper>
    )    
}

export default Register