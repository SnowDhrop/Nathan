import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import '../../styles/updateUser.css'

const UpdateUser = ({firstNameOriginal, lastNameOriginal, emailOriginal, setUpdateOn, reload, setReload}) => {

    const [cookies, setCookies] = useCookies()

    const [firstName, setFirstName] = useState(firstNameOriginal)
    const [lastName, setLastName] = useState(lastNameOriginal)
    const [email, setEmail] = useState(emailOriginal)

    let history = useHistory();

    const getBack = (error) => {
        history.push('/log?err=' + error)
    }

    const updateUser = () => {
        const bearer = 'Bearer ' + cookies.token

        const userId = cookies.userId

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': bearer
            },
            body: JSON.stringify({firstName, lastName, email})
        }

        fetch('http://localhost:3000/api/auth/' + userId, requestOptions)
        .then(async res => {
            const isJson = res.headers.get('content-type')?.includes('application/json')
            const data = isJson && await res.json()

            if (!res.ok) {
                if (data.error === "Requête non authentifiée") {
                    const error = data.error;
                    getBack(error)
                }
            }

            if (reload === true) {
                setReload(false)
            } else {
                setReload(true)
            }

        })
        .catch(err => {
            const error = 'Erreur serveur'
            console.log(err)
            getBack(error)
        })
    }

    return (
        <div className='user_update_bloc'>
            <form className='user_update' action='' onSubmit={updateUser}>
                <label htmlFor='update_firstName'>Prénom</label>
                <input
                    type='text'
                    name='update_firstName'
                    className='update_firstName'
                    placeholder='Votre prénom'
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}>

                </input>

                <label htmlFor='update_lastName'>Nom</label>
                <input
                    type='text'
                    name='update_lastName'
                    className='update_lastName'
                    placeholder='Votre nom'
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}>

                </input>

                <label htmlFor='update_email'>Email</label>
                <input
                    type='text'
                    name='update_email'
                    className='update_email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}>

                </input>

                <input
                    type='submit'
                    name='update_submit'
                    className='update_submit'
                    value='Modifier les informations'
                >
                </input>

                <button
                    type='button'
                    name='hideUpdate'
                    className='button_hide_update'
                    onClick={() => setUpdateOn(false)}
                >
                    Ne pas modifier mes informations
                </button>
            </form>
        </div>
    );
};

export default UpdateUser;