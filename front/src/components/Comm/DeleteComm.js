import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import '../../styles/deleteComm.css'

const DeleteComm = ({reload, setReload, commId}) => {
    const [cookies, setCookies] = useCookies();

    const bearer = 'Bearer ' + cookies.token

    let history = useHistory();
    const getBack = (error) => {
        history.push('/log?err=' + error)
    }

    const deleteButton = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Authorization': bearer
            }
        }

        fetch('http://localhost:3000/api/comm/'+commId, requestOptions)
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
        <div className='deleteBloc'>
            <button
            onClick={deleteButton}
            name='deleteComm'
            className='delete_comm'
            type='button'>
                Supprimer le commentaire
            </button>
        </div>
    );
};

export default DeleteComm;