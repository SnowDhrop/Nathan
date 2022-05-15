import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import '../../styles/deleteUser.css'

const DeleteUser = ({reload, setReload}) => {
    const [cookies, setCookies, removeCookies] = useCookies()

    let history = useHistory();

    const getBack = (error) => {
        history.push('/log?err=' + error)
    }

    const deleteButton = () => {
        const bearer = 'Bearer ' + cookies.token

        const userId = cookies.userId

        const requestOptions = {
            method: 'DELETE',
            headers:{
                'Content-type': 'application/json',
                'Authorization': bearer
            }
        }

        fetch('http://localhost:3000/api/auth/'+userId, requestOptions)
        .then(async res => {
            const isJson = res.headers.get('content-type')?.includes('application/json')
            const data = isJson && await res.json()

            if (!res.ok) {
                if (data.error === "Requête non authentifiée") {
                    const error = data.error;
                    getBack(error)
                }
            }

            removeCookies("token")
            removeCookies("userId")

            history.push('/log')

        })
        .catch(err => {
            const error = 'Erreur serveur'
            console.log(err)
            getBack(error)
        })
    }
    return (
        <div className='delete_bloc'>
            <button
                type='button'
                className='button_delete'
                name='button_delete'
                onClick={deleteButton}
            >
                Supprimer mon profil
            </button>
        </div>
    );
};

export default DeleteUser;