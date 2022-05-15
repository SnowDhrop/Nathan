import React from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import '../../styles/deletePost.css'

const DeletePost = ({reload, setReload, postId}) => {
    const [cookies, setCookies] = useCookies();

    const bearer = "bearer " + cookies.token

    let history = useHistory();
    const getBack = (error) => {
        history.push('/log?err=' + error)
    }


    const deleteButton = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Authorization': bearer
            },
        }

        fetch('http://localhost:3000/api/post/'+postId, requestOptions)
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
        <div>
            <button
            onClick={deleteButton}
            name='deletePost'
            className='delete_post'
            type='button'>
                Supprimer
            </button>
        </div>
    );
};

export default DeletePost;