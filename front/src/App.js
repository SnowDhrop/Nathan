import React, {useState} from 'react'
import { AuthContext } from './components/AppContext';
import Routes from './components/Routes'

function App() {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)

  return (
    <AuthContext.Provider value = {{token, userId}}>
      <Routes setToken={setToken} setUserId={setUserId}/>
    </AuthContext.Provider>
  );
}

export default App;
