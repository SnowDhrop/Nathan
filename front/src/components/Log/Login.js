import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import '../../styles/login.css';
import { useCookies } from 'react-cookie';
import { validEmail, validPassword } from '../Regex.jsx'


const Login = ({ setToken, setUserId }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let history = useHistory();
    
    const [tokenCookie, setTokenCookie, removeTokenCookie] = useCookies(['token'])
    const [userIdCookie, setUserIdCookie, removeUserIdCookie] = useCookies(['userId'])

    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)

    //  Récupère les données utilisateurs et vérifie si les données rentrées concordent
    const handleLogin = async (user) => {
        user.preventDefault()

        setEmailError(null);
        setPasswordError(null);

        if (!validEmail.test(email)) {
            setEmailError('Adresse mail incorrect')
        } else {
            if (!validPassword.test(password)) {
                setPasswordError('Mot de passe incorrect')
            } else {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ email, password }),
                };

                fetch('http://localhost:3000/api/auth/login', requestOptions)
                    .then(async res => {
                        const isJson = res.headers.get('content-type')?.includes('application/json')
                        const data = isJson && await res.json()

                        if (!res.ok) {
                            const error = (data && data.message) || res.status
                            return Promise.reject(error)
                        } else {
                            setToken(data.token);
                            setUserId(data.userId);
                            setTokenCookie('token', data.token, { path: "/", maxAge: 86400 })
                            setUserIdCookie('userId', data.userId, { path: '/', maxAge: 86400 })
                            history.push('/')
                        }
                    })
                    .catch(err => {
                        if (err === 'User not found') {
                            setEmailError('Utilisateur non enregistré')
                        } else if (err === 'Wrong password') {
                            setPasswordError('Mot de passe incorrect')
                        }
                    })
            }
        }
    }

    return (
        <div className='log_login'>
            <form action="" onSubmit={handleLogin} id='login_form' className='login_form'>
                <label htmlFor='mail'>Email</label>
                <input
                    type='text'
                    id='mail'
                    placeholder='nikola.tesla@inventor.fr'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                {emailError && <div className='email_error error'>{emailError}</div>}
                <br />

                <label htmlFor='password'>Mot de passe</label>
                <input
                    type='password'
                    id='password'
                    placeholder='?NikoTes123!'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                {passwordError && <div className='password_error error'>{passwordError}</div>}
                <br />

                <input type='submit' value='Se connecter' className='log_submit' />
            </form>
        </div>
    );
};

export default Login;