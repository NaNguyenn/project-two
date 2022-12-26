import React, { useContext } from 'react'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { AuthContext } from '../context/authContext'

const Account = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })

    const [err, setError] = useState(null)

    const navigate = useNavigate()

    const { login } = useContext(AuthContext)

    //HANDLE INPUT
    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    //REGISTER
    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            await axios.post("auth/register", inputs)
            navigate("/")
        } catch (err) {
            setError(err.response.data)
        }
    }

    //LOGIN
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            // await axios.post("auth/login", inputs)
            await login(inputs)
            navigate("/")
        } catch (err) {
            setError(err.response.data)
        }
    }

    return (
        <div className='auth'>
            <h1>
                Your Account
            </h1>
            <form>
                <input required name='username' type="text" placeholder='username' onChange={handleChange} />
                <input required name='password' type="password" placeholder='password' onChange={handleChange} />
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleRegister}>Register</button>
                {err && <div className='errorMessage'>{err}</div>}
            </form>
        </div>
    )
}

export default Account