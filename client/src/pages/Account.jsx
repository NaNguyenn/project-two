import React from 'react'

const Account = () => {
    return (
        <div className='auth'>
            <h1>
                Your Account
            </h1>
            <form action="">
                <input required type="text" placeholder='username' />
                <input required type="password" placeholder='password' />
                <button>Login</button>
                <button>Register</button>
                <div className='errorMessage'>ERROR</div>
            </form>
        </div>
    )
}

export default Account