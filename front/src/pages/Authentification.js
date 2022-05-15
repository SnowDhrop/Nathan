import React from 'react';
import Log from '../components/Log'

const Authentification = ({setToken, setUserId}) => {
    return (
        <div>
            <Log setToken={setToken} setUserId={setUserId}/>  
        </div>
    );
};

export default Authentification;