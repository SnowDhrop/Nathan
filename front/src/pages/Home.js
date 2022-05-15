import React, { useContext, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { AuthContext } from '../components/AppContext';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import CreatePost from '../components/Post/CreatePost';
import DisplayPosts from '../components/Post/DisplayPosts';
import '../styles/home.css'

const Home = () => {

    const token = useContext(AuthContext).token
    const userId = useContext(AuthContext).userId

    const [tokenCookie, setTokenCookie] = useCookies()

    const [posts, setPosts] = useState('')

    const [reload, setReload] =useState(true);

    let history = useHistory();

    const getBack = (error) => {
        history.push('/log?err='+error)
    }

    return (
        <div className='home'>
            {tokenCookie ? (
                <>
                    <NavBar posts={posts} setPosts={setPosts}/> 

                    <CreatePost reload={reload} setReload={setReload} />

                    <DisplayPosts reload={reload} setReload={setReload} posts={posts} setPosts={setPosts}/>
                    
                </>

            ) : (
                 {getBack}  
            )}
        </div>
    )}


export default Home;