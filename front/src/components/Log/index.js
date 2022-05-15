import React from 'react';
import { useState, useEffect } from 'react'
import Register from './Register';
import Login from './Login';
import '../../styles/base.css'
import '../../styles/log.css'



const Log = ({setToken, setUserId, isAdmin, setIsAdmin}) => {
    const [showLogin, setShowLogin] = useState(true)
    const [showRegister, setShowRegister] = useState(false)

    const [error, setError] = useState(null)

//  Gestion d'une erreur lors du chargement de la page
    const url = new URL (window.location.href)
    const searchParams = new URLSearchParams(url.search)

    let errorMessage = searchParams.get('err')

    useEffect(() => {
        if (errorMessage === 'Requête non authentifiée') {
            setError('Veuillez vous connecter')
        }else if (errorMessage === 'Erreur serveur'){
            setError('Erreur serveur, rechargez la page et réessayez')
        }
    }, [])



    const handleShows = (e) => {
        if (e.target.id === 'register') {
            setShowRegister(true)
            setShowLogin(false)

        } else if (e.target.id === 'login') {
            setShowRegister(false)
            setShowLogin(true)
        }
    }

    return (
        <div className='log_bloc'>
            <img src='./images/logos/icon-left-font-monochrome-black.svg' alt='logo Groupomania' className='log_logo' />
            <div className='log_content'>
                <ul className='log_title'>
                    <li
                        onClick={handleShows}
                        id='register'
                        className={showRegister ? 'log_title_register log_title_register_active' : 'log_title_register'}>
                        S'inscrire
                    </li>

                    <li
                        onClick={handleShows}
                        id='login'
                        className={showLogin ? 'log_title_register log_title_register_active' : 'log_title_login'}>
                        Se connecter
                    </li>
                </ul>

                {error && <div className='error'>{error}</div>}

                {showLogin && <Login setToken={setToken} setUserId={setUserId} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>}
                {showRegister && <Register />}
            </div>
        </div>
    );
};

export default Log;