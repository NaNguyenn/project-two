import React from 'react'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Register = () => {
    const [formValid, setFormValid] = useState(false);

    //INITIALIZE inputs WITH DEFAULT username & password
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    })

    //INITIALIZE error WITH null
    const [err, setError] = useState(null)

    const navigate = useNavigate()

    //HANDLE INPUT
    const handleChange = (e) => {
        //UPDATE inputs WITH NEW VALUE
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setFormValid(e.target.form.checkValidity());
    }

    //REGISTER
    const handleRegister = async (e) => {
        e.preventDefault()
        if (!formValid) {
            setError('Please fill in all required fields.');
            return;
        }
        if (inputs.password !== inputs.confirmPassword) {
            setError('Passwords not matched!');
            return;
        }
        try {
            await axios.post("auth/register", inputs)
            navigate("/account")
        } catch (err) {
            setError(err.response.data)
        }
    }

    return (
        <div className='auth'>
            <h1>
                Sign Up
            </h1>
            <form>
                <input required name='username' type="text" placeholder='username' onChange={handleChange} />
                <input required name='password' type="password" placeholder='password' onChange={handleChange} />
                <input required name='confirmPassword' type="password" placeholder='confirm password' onChange={handleChange} />

                <button onClick={handleRegister} disabled={!formValid}>Register</button>

                {err &&
                    <div className='errorMessage'>
                        {err}
                    </div>
                }
            </form>
            <div className='redirect'>
                <p>Already registered?</p>
                <Link className='link' to="/account">Log in</Link>
            </div>
        </div>
    )
}

export default Register