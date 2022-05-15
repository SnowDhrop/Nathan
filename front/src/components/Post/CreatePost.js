import React from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import '../../styles/createPost.css';
import { useHistory } from 'react-router-dom';

const CreatePost = ({reload, setReload}) => {
    


    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)

    const [cookies, setCookies] = useCookies()


    const [error, setError] = useState(null)

   

    let history = useHistory();
    
    const getBack = (error) => {
        history.push('/log?err=' + error)
    }

    const formData = new FormData()

    const createPost = (form) => {
        form.preventDefault();

        const bearer = 'Bearer ' + cookies.token
        
        setError(null)

        if (image){
            formData.append('image', image)
        }

        if (title && content){
            formData.append('title', title)
            formData.append('content', content)
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': bearer
            },
            body: formData
        }

        fetch('http://localhost:3000/api/post/', requestOptions)
            .then(async res => {
                const isJson = res.headers.get('content-type')?.includes('application/json')
                const data = isJson && await res.json() || res.status


                if (!res.ok){
                    if (data.error === "Requête non authentifiée"){
                        getBack(data.error)
                    }else if (data.error === 'Remplir champs'){
                        setError("Veuillez mettre au moins un titre et un contenu et n'utiliser que des fichiers jpg/jpeg/png")   
                    }
                    
                } else {
                    if (reload === true){
                        setReload(false)
                    }else{
                        setReload(true)
                    }

                    setTitle('')
                    setContent('')
                    setImage('')
                }
            })
            .catch((error) => {
                setError(error)
            })
    }

    return (
        <div className='post_create'>
            {error && <div className='error'>{error}</div> }
            
            <form className='post_form' action='' onSubmit={createPost}>
                <input
                    type='text'
                    id='form_title'
                    placeholder='Titre'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    name='title'
                />
                <br />

                <textarea
                    placeholder='Ecrivez votre post'
                    id='form_content_post'
                    rows='10' cols='50'
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    name='content'
                />

                <br />

                <input
                    type='file'
                    id='form_attachment'
                    onChange={(e) => setImage(e.target.files[0])}
                    name='file'
                />
                <label htmlFor='form_attachment'>jpg/jpeg/png</label>
                <br />

                <input type='submit' value='Publier' className='form_submit' />
            </form>
        </div>
    );
};

export default CreatePost;