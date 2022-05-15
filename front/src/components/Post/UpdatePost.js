import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import '../../styles/updatePost.css'

const UpdatePost = ({ reload, setReload, postId, title, content, image }) => {
    const [showUpdatePost, setShowUpdatePost] = useState(null)

    const [updatedTitle, setUpdatedTitle] = useState(title)
    const [updatedContent, setUpdatedContent] = useState(content)
    const [updatedImage, setUpdatedImage] = useState('')

    const [error, setError] = useState(null)

    const [cookies, setCookies] = useCookies()

    const bearer = 'bearer ' + cookies.token

    let history = useHistory();
    const getBack = (error) => {
        history.push('/log?err=' + error)
    }

    const displayUpdatePost = () => {
        setShowUpdatePost(true)
    }

    const hideUpdatePost = () => {
        setShowUpdatePost(false)
    }


    const formData = new FormData()

    const updatePost = (form) => {
        form.preventDefault();

        setError(null)

        if (image) {
            formData.append('image', updatedImage)
        }

        if (title && content) {
            formData.append('title', updatedTitle)
            formData.append('content', updatedContent)
        }

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Authorization': bearer
            },
            body: formData
        }

        fetch('http://localhost:3000/api/post/' + postId, requestOptions)
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
            {showUpdatePost !== true &&
                <button
                    onClick={displayUpdatePost}
                    name='updatePost'
                    className='button_update_post'
                    type='button'>
                    Modifier le post
                </button>}

            {showUpdatePost === true &&
                <div>
                    <form className='update_form' action='' onSubmit={updatePost}>
                        <input
                            type='text'
                            id='form_title'
                            placeholder='Titre'
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            value={updatedTitle}
                            name='update_post_title'
                        />
                        <br />

                        <textarea
                            placeholder='Ecrivez votre post'
                            id='form_content_update'
                            rows='10' cols='50'
                            onChange={(e) => setUpdatedContent(e.target.value)}
                            value={updatedContent}
                            name='content'
                        >
                        </textarea>
                        <br />

                        <input
                            type='file'
                            id='form_attachment'
                            onChange={(e) => setUpdatedImage(e.target.files[0])}
                            name='file'
                        />
                        <label htmlFor='form_attachment'>jpg/jpeg/png</label>
                        <br />

                        <div className='post_update_buttons'>


                            <input type='submit' value='Modifier' className='form_submit' />

                            <button
                                onClick={hideUpdatePost}
                                name='updatePost'
                                className='button_update_post'
                                type='button'>
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            }
        </div>
    );
};

export default UpdatePost;