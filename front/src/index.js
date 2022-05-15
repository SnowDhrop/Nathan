import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CookiesProvider } from "react-cookie"
// import { Provider } from 'react-redux'
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { applyMiddleware, createStore } from 'redux';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';
// import rootReducer from './reducers'

const root = ReactDOM.createRoot(document.getElementById('root'));

// Création du store de reddux (enlever composeWithDevTools et logger)
// const store = createStore(
//     rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
// )

root.render(
    <CookiesProvider>
        <App />
    </CookiesProvider>
    // <Provider store={store}>
        
    // </Provider>
    
);

