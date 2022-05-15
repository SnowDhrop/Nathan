import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import '../../styles/displayComm.css'
import UpdateComm from './UpdateComm';
import DeleteComm from './DeleteComm'

const DisplayComm = ({ post, reload, setReload, isAdmin }) => {
    const [comms, setComms] = useState(null)
    const [cookies, setCookies] = useCookies()

    const commArray = []
    const getAllComm = () => {

        for (let x = 0; x < post.Comm.length; x++) {
            // Gestion des données
            const firstName = post.Comm[x].User.firstName
            const lastName = post.Comm[x].User.lastName
            const content = post.Comm[x].content
            const userId = post.Comm[x].userId
            const commId = post.Comm[x].id

            //              Gestion des dates
            const createdAt = post.Comm[x].createdAt
            const updatedAt = post.Comm[x].updatedAt

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


            const dom =
                <div key={post.Comm[x].id} className='comm'>


                    <li className='comm_name'>
                        {firstName} {lastName}
                    </li>

                    <li className='comm_content'>
                        {content}
                    </li>
                    <div className='comm_dates'>
                        <li>
                            Créé le {createdAtDay} à {createdAtHour[0]}
                        </li>

                        {createdAt !== updatedAt &&
                            <li>
                                Modifié le {updatedAtDay} à {updatedAtHour[0]}
                            </li>}
                    </div>


                    {(cookies.userId == userId || isAdmin === 1) &&
                        <div className='comm_buttons'>
                            <UpdateComm
                                reload={reload}
                                setReload={setReload}
                                contentOriginal={content}
                                commId = {commId}
                            />

                            <DeleteComm
                                reload={reload}
                                setReload={setReload}
                                commId = {commId}
                            />
                        </div>}


                </div>

            commArray.push(dom)
        }
        return <div className='blocComm'>{commArray}</div>
    }

    const GetAllComm = getAllComm
    return (
        <div>
            <GetAllComm />
        </div>
    );
};

export default DisplayComm;