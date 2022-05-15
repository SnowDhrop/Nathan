import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import DeleteUser from './DeleteUser';
import UpdateUser from './UpdateUser';
import '../../styles/displayUser.css'

const DisplayUser = () => {
    const [cookies, setCookies] = useCookies()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [updatedAt, setUpdatedAt] = useState('')

    const [reload, setReload] = useState(true)

    const [updateOn, setUpdateOn] = useState(false)

    useEffect(() => {
        loadUser()
    }, [reload])

    const userId = cookies.userId

    const bearer = 'Bearer ' + cookies.token


    let history = useHistory();
    const getBack = (error) => {
        history.push('/log?err=' + error)
    }

    const loadUser = () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': bearer
            }
        }

        fetch('http://localhost:3000/api/auth/' + userId, requestOptions)
            .then(async res => {
                const isJson = res.headers.get('content-type')?.includes('application/json')
                const data = isJson && await res.json()

                if (!res.ok) {
                    if (data.error === "Requête non authentifiée") {
                        const error = data.error;
                        getBack(error)
                    }
                }

                setFirstName(data.user.firstName)
                setLastName(data.user.lastName)
                setEmail(data.user.email)
            })
            .catch(err => {
                const error = 'Erreur serveur'
                console.log(error)
                getBack(error)
            })

    }

    const LoadUser = loadUser;
    return (
        <div className='log_display'>
            <LoadUser />
            {updateOn === false &&
            <div className='bloc_informations'>
                <div className='informations_display'>
                    <ul>
                        <li>{firstName}</li>
                        <li>{lastName}</li>
                        <li>{email}</li>
                    </ul>

                    <button
                        type='button'
                        onClick={() => setUpdateOn(true)}
                        name='login_update'
                        className='login_update'
                    >
                        Modifier mes informations
                    </button>
                </div>
                </div>
            }


            {updateOn === true &&
                <UpdateUser 
                firstNameOriginal={firstName}
                lastNameOriginal={lastName}
                emailOriginal={email}
                setUpdateOn={setUpdateOn}
                reload={reload}
                setReload={setReload}
                />
            }

            <DeleteUser 
            reload={reload}
            setReload={setReload}
            />
        </div>
    );
};

export default DisplayUser;