import React from 'react';
import { useState, useContext } from 'react'
import '../../styles/register.css'
import { validName, validEmail, validPassword } from '../Regex.jsx'
import Login from './Login';

const Register = () => {

    const [formSubmit, setFormSubmit] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    //  Errors
    const [firstNameError, setFirstNameError] = useState(null)
    const [lastNameError, setLastNameError] = useState(null)
    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [passwordConfirmationError, setPasswordConfirmationError] = useState(null)
    const [registeredError, setRegisteredError] = useState(null)


    const firstNameValidForm = (e) => {
        setFirstName(e.target.value)
        if (!validName.test(firstName)) {
            setFirstNameError("Veuillez rentrer votre prénom")
        } else {
            setFirstNameError(null)
        }
    }

    const lastNameValidForm = (e) => {
        setLastName(e.target.value)
        if (!validName.test(lastName)) {
            setLastNameError("Veuillez rentrer votre nom")
        } else {
            setLastNameError(null)
        }
    }



    const passwordValidForm = (e) => {
        setPassword(e.target.value)
        if (!validPassword.test(password)) {
            setPasswordError('Votre mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un caractère spécial (-_?!), un chiffre et 8 à 16 caractères')
        } else {
            setPasswordError(null)
        }
    }



    const handleRegister = async (e) => {
        e.preventDefault()

        setEmailError(null)
        setPasswordError(null)
        setPasswordConfirmationError(null)

        if (!firstNameError ||
            !lastNameError ||
            !passwordError
        ) {
            if (!validEmail.test(email)) {
                setEmailError("Veuillez rentrer votre adresse mail")
            } else {
                if (password !== passwordConfirmation) {
                    setPasswordConfirmationError("Les mots de passe ne correspondent pas")
                } else {
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            firstName,
                            lastName,
                            email,
                            password
                        })
                    }

                    fetch('http://localhost:3000/api/auth/signup', requestOptions)
                        .then(async res => {
                            const isJson = res.headers.get('content-type')?.includes('application/json')
                            const data = isJson && await res.json()

                            if (!res.ok) {
                                const error = (data && data.message) || res.status
                                return Promise.reject(error)
                            } else {
                                setFormSubmit(true)
                            }
                        })
                        .catch(err => {
                            if (err === "User already registered") {
                                setRegisteredError('Utilisateur déjà enregistré')
                            } else {
                                return err
                            }
                        })
                }
            }
        }
    }

    return (
        <>
            {formSubmit ? (
                <>
                    {/* <Login /> */}
                    <h4 className='success'>Enregistrement réussi, veuillez vous connecter</h4>
                </>
            ) : (
                <div className='log_register'>
                    {registeredError && <div className='registered_error error'>{registeredError}</div>}
                    <form className='register_form' onSubmit={handleRegister} action=''>
                        <label htmlFor='firstName'>Prénom</label>
                        <input
                            type='text'
                            id='firstName'
                            placeholder='Nikola'
                            onChange={firstNameValidForm}
                            value={firstName}
                        />
                        {firstNameError && <div className='error'>{firstNameError}</div>}
                        <br />

                        <label htmlFor='lastName'>Nom</label>
                        <input
                            type='text'
                            id='lastName'
                            placeholder='Tesla'
                            onChange={lastNameValidForm}
                            value={lastName}
                        />
                        {lastNameError && <div className='error'>{lastNameError}</div>}
                        <br />

                        <label htmlFor='mail'>Email</label>
                        <input
                            type='email'
                            id='mail'
                            placeholder='nikola.tesla@inventor.fr'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        {emailError && <div className='error'>{emailError}</div>}
                        <br />

                        <label htmlFor='password'>Mot de passe</label>
                        <input
                            type='password'
                            id='password'
                            placeholder='?NikoTes123!'
                            onChange={passwordValidForm}
                            value={password}
                        />
                        {passwordError && <div className='error'>{passwordError}</div>}
                        <br />

                        <label htmlFor='password_confirmation'>Confirmez votre mot de passe</label>
                        <input
                            type='password'
                            id='password_confirmation'
                            placeholder='?NikoTes123!'
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            value={passwordConfirmation}
                        />
                        {passwordConfirmationError && <div className='password_confirmation error'>{passwordConfirmationError}</div>}
                        <br />

                        <input type='submit' value="S'inscrire" className='log_submit' />
                    </form>
                </div>
            )}

        </>

    );
};

export default Register;