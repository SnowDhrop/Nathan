import React from 'react';
import '../styles/base.css'
import '../styles/navBar.css'
import { NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

const Navbar = ({posts, setPosts}) => {

    const [cookies, setCookies, removeCookies] = useCookies()

    const history = useHistory()

    const logOut = () => {
        removeCookies('token')
        removeCookies('userId')
        history.push('/log')
    }
    
    return (
        < div className='navBar'>
            <nav>

                <div className='logo'>
                    <NavLink exact to="/home">
                        <img src='./images/logos/icon-left-font-monochrome-black.svg' alt='Icone Groupomania' className='logo_img' />
                    </NavLink>

                </div>


                <ul className='links'>
                    <li className='profil'>
                        <NavLink exact to='/profil'>
                            Profil
                        </NavLink>
                    </li>
                    <li className='log_out'>
                    <button
                        type='button'
                        className='button_log_out'
                        name='button_log_out'
                        onClick={logOut}
                        >
                            Se déconnecter
                        </button>
                    </li>

                </ul>
            </nav>
            <div className='border_shadow'></div>
        </div>

    );
};

export default Navbar;