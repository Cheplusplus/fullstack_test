import { useState, useEffect, useRef } from 'react'

const Login = ({onLogin}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    
    const onSubmit = (e) => {
        e.preventDefault()
        //Do relevent checks here
        if (!username || !password) {
            alert('All fields are required')
        }
        
        onLogin(username, password)
    }

    return(
        <form method='post' className='add-form' onSubmit={onSubmit}>
            <div className='form-group'>
                <label>Username</label>
                <input type='text' 
                className='form-control' 
                placeholder='username' 
                name='username'
                value={username}
                onChange={ (e) => setUsername(e.target.value) }  />
            </div>
            <div className='form-group'>
                <label>Password</label> 
                <input type='password'
                className='form-control'
                placeholder='password'
                name='password' 
                value={password}
                onChange={ (e) => setPassword(e.target.value) } />
            </div>
            <input type='submit' value='Login' className="btn btn-block" />
        </form>
    )

}

export default Login