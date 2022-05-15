import React, { useState } from 'react';
import { Cookies, useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import '../../styles/updateComm.css'

const UpdateComm = ({ reload, setReload, commId, contentOriginal }) => {
    const [showUpdateComm, setShowUpdateComm] = useState(false)
    const [updatedContent, setUpdatedContent] = useState(contentOriginal)
    const [error, setError] = useState(null)
    const [cookies, setCookies] = useCookies()

    let history = useHistory();
    const getBack = (error) => {
        history.push('/log?err=' + error)
    }

    const displayUpdateComm = () => {
        setShowUpdateComm(true)
    }

    const hideUpdateComm = () => {
        setShowUpdateComm(false)
    }

    const updateComm = (form) => {
        if (updatedContent) {
            form.preventDefault()

            const bearer = 'Bearer ' + cookies.token

            setError(null)

            const content = updatedContent

            console.log(content)
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': bearer
                },
                body: JSON.stringify({ content })
            }

            fetch('http://localhost:3000/api/comm/' + commId, requestOptions)
                .then(async res => {
                    const isJson = res.headers.get('content-type')?.includes('application/json')
                    const data = isJson && await res.json()

                    if (!res.ok) {
                        if (data.error === "Requête non authentifiée") {
                            const error = data.error;
                            getBack(error)
                        }
                    }

                    console.log(commId)
                    console.log(res)
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
    }

    return (
        <div>
            {showUpdateComm === false &&
                <button
                    type='button'
                    className='comm_update_show_button'
                    name='comm_update_show_button'
                    onClick={displayUpdateComm}
                >
                    Modifier le commentaire
                </button>
            }

            {showUpdateComm === true &&
                <form className='update_comm_form' action='' onSubmit={updateComm} >
                    <textarea
                        className='update_comm_textarea'
                        value={updatedContent}
                        placeholder='Modifiez votre commentaire'
                        onChange={(e) => setUpdatedContent(e.target.value)}
                        name='update_comm_content'
                    />

                    <div className='buttons'>
                        <input type='submit' value='Modifier' className='form_submit' /> <br />

                        <button
                            type='button'
                            className='comm_update_button_cancel'
                            name='comm_update_button_cancel'
                            onClick={hideUpdateComm}
                        >
                            Annuler
                        </button>
                    </div>


                </form>
            }
        </div>
    );
};

export default UpdateComm;