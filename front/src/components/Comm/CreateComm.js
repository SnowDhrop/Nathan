import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import '../../styles/createComm.css'

const CreateComm = ({ postId, reload, setReload }) => {
    const [content, setContent] = useState('')
    const [error, setError] = useState(null)
    const [cookies, setCookies] = useCookies()



    const bearer = 'Bearer ' + cookies.token

    const createComm = (form) => {
        form.preventDefault()
        setError(null)

        if (content !== '') {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearer
                },
                body: JSON.stringify({ content })
            }

            fetch('http://localhost:3000/api/post/' + postId, requestOptions)
                .then(async res => {
                    const isJson = res.headers.get('content-type')?.includes('application/json')
                    const data = isJson && await res.json() || res.status


                    if (!res.ok) {
                        if (data.error === "Requête non authentifiée") {
                            // getBack(error)
                        } else if (data.error === 'Remplir champs') {
                            setError("Veuillez mettre au moins un titre et un contenu et n'utiliser que des fichiers jpg/jpeg/png")
                        }

                    } else {
                        if (reload === true) {
                            setReload(false)
                        } else {
                            setReload(true)
                        }

                        setContent('')
                    }
                })
                .catch(err => {
                    setError(err)
                })
        }



    }

    return (
        <div className='create_comm'>
            <p>Ajoutez un commentaire</p>
            {error === "Remplir champs" && <p className='error'>Veuillez remplir les champs</p>}
            <form className='input_form' action='' onSubmit={createComm}>
                <textarea
                    id='comm_input'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    name='comm_input'
                    placeholder='Ecrivez votre commentaire'
                    cols='33'
                    rows='5'
                />
                <input type='submit' value='Publier' className='comm_submit' />
            </form>
        </div>
    );
};

export default CreateComm;