import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import Authentification from '../../pages/Authentification';

const index = ({setToken, setUserId}) => {
    return (
        <Router>
            <Switch>
                <Route path='/home' exact component={Home} />

                <Route path='/profil' exact component={Profil} />

                <Route path='/trending' exact component={Trending} />
                
                <Route path='/log'>
                    <Authentification setToken={setToken} setUserId={setUserId}/>
                </Route>

                <Redirect to='/home' />
            </Switch>
        </Router>
    );
};

export default index;