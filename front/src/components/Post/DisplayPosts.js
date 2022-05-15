import React from 'react';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import '../../styles/displayPosts.css'
import UpdatePost from './UpdatePost'
import DeletePost from './DeletePost'
import CreateComm from '../Comm/CreateComm';
import DisplayComm from '../Comm/DisplayComm';

const DisplayPosts = ({ reload, setReload, posts, setPosts }) => {
    const images = require.context('../../../public/images/posts', true)

    const [postId, setPostId] = useState(null)
    const [isAdmin, setIsAdmin] = useState(null)

    const [showComms, setShowComms] = useState(false)

    const showCommsFunction = () => {
        setShowComms(true)
    }

    const hideCommsFunction = () => {
        setShowComms(false)
    }

    const [cookies, setCookies] = useCookies()

    const bearer = 'Bearer ' + cookies.token

    let history = useHistory();

    const getBack = (error) => {
        history.push('/log?err=' + error)
    }

    const requestOptionsPosts = {
        method: 'GET',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    }



    const getAllPosts = async (post) => {
        fetch('http://localhost:3000/api/post', requestOptionsPosts)
            .then(async res => {
                const isJson = res.headers.get('content-type')?.includes('application/json')
                const data = isJson && await res.json()

                if (!res.ok) {
                    if (data.error === "Requête non authentifiée") {
                        const error = data.error;
                        getBack(error)
                    }
                }
                console.log(data.posts)
                setPosts(data.posts)
            })
            .catch(err => {
                const error = 'Erreur serveur'
                console.log(err)
                getBack(error)
            })
    }

    const requestOptionsAdmin = {
        method: 'GET',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    }

    const getIsAdmin = async () => {
        fetch('http://localhost:3000/api/auth/' + cookies.userId, requestOptionsAdmin)
            .then(async (res) => {
                const isJson = res.headers.get('content-type')?.includes('application/json')
                const data = isJson && await res.json()

                if (!res.ok) {
                    if (data.error === "Requête non authentifiée") {
                        const error = data.error;
                        getBack(error)
                    }
                }
                setIsAdmin(data.user.isAdmin)
            })
            .catch(err => {
                const error = 'Erreur serveur'
                console.log(err)
                getBack(error)
            })
    }

    useEffect(() => {
        getAllPosts();
        getIsAdmin();
    }, [reload])

    useEffect(() => {
        getAllPosts();
        getIsAdmin();
        displayPosts();
    }, [])



    let postsArray = []

    const displayPosts = () => {

        for (let i = 0; i < posts.length; i++) {
            //          Recup données du post
            const title = posts[i].title
            const content = posts[i].content
            const postId = posts[i].id


            //          Récup données user
            const firstName = posts[i].User.firstName
            const lastName = posts[i].User.lastName

            //              Gestion des dates
            const createdAt = posts[i].createdAt
            const updatedAt = posts[i].updatedAt

            const createdAtSplitted = createdAt.split('T')
            const createdAtDay = new Date(createdAtSplitted[0]).toLocaleDateString(
                'fr-FR', {
                weekday: "long",
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }
            )
            const createdAtHour = createdAtSplitted[1].split('.')

            const updatedAtSplitted = updatedAt.split('T')
            const updatedAtDay = new Date(updatedAtSplitted[0]).toLocaleDateString(
                'fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }
            )
            const updatedAtHour = updatedAtSplitted[1].split('.')

            //              Gestion de l'image
            let image = null

            if (posts[i].image !== null) {
                image = images(`./${posts[i].image}`)
            }

            //              Affichage du DOM
            let dom =
                <div key={posts[i].id} className='post_comm'>
                    <div className='post'>
                        <p className='user'>{firstName} {lastName}</p>
                        <ul className='post_content'>
                            <li className='title'>{title}</li>
                            <li className='content'>{content}</li>

                            {posts[i].image && <li className='image_bloc'><img src={image} alt='Image du post' className='image'/>.</li>}

                            <div className='dates'>
                                <li>Créé le {createdAtDay} à {createdAtHour[0]}</li>
                                {createdAt !== updatedAt && <li>Modifié le {updatedAtDay} à {updatedAtHour[0]}</li>}
                            </div>
                        </ul>
                        <div className='post_buttons'>
                            {(posts[i].userId == cookies.userId || isAdmin === true) &&
                                <UpdatePost
                                    reload={reload}
                                    setReload={setReload}
                                    postId={postId}
                                    title={title}
                                    content={content}
                                    image={image}
                                />}

                            {(posts[i].userId == cookies.userId || isAdmin === true) &&
                                <DeletePost
                                    reload={reload}
                                    setReload={setReload}
                                    postId={postId}
                                />}
                        </div>


                    </div>


                    <div>
                        {showComms === false &&

                            <button
                                type='button'
                                className='button_show_comm'
                                onClick={showCommsFunction}
                            >
                                Voir les commentaires
                            </button>
                        }

                        {showComms === true &&
                            <div className='comm_buttons'>
                                <ul>
                                    <DisplayComm post={posts[i]} reload={reload} setReload={setReload} isAdmin={isAdmin}/>
                                </ul>

                                <CreateComm postId = {postId} reload={reload} setReload={setReload}/>
                                <button
                                    type='button'
                                    className='button_hide_comm'
                                    onClick={hideCommsFunction}
                                >
                                    Cacher les commentaires
                                </button>

                            </div>
                        }

                    </div>
                </div>

            postsArray.push(dom)
        }
        return postsArray

    }

    const Display = displayPosts

    return (
        <div className='display_posts'>
            <Display />
        </div>
    );
};

export default DisplayPosts;