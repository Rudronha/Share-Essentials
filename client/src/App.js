import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import './App.css';
import { UserContext } from './context/userContext';

function App() {
  const {user}  = useContext(UserContext);
  //console.log(user.userId);
  
  return (
    <Router>
      <div className="App">
        <Routes>
          
          {user?<Route path="/home/*" element={<Home/>} />:
            (<>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>)
          }
        </Routes>
      </div>
    </Router>
  );
}

export default App;
