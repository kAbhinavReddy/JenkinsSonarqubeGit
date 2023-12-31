import React, { useEffect } from 'react';
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen';
import { useNavigate } from 'react-router-dom';


function App() {
  const user=useSelector(selectUser);
  const dispatch =useDispatch();
  
  useEffect(()=>{
     const unsubscribe= auth.onAuthStateChanged(userAuth=>{
        if(userAuth){
           dispatch(login({
                uid:userAuth.uid,
                email:userAuth.email,

           }))
          
        }
        else{
              dispatch(logout())
        }
      })
      
      return unsubscribe
  },[dispatch])

  return (
    <div className="App">
      <Router>
      {user ? (
        <Routes>
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/' element={<HomeScreen />} />
        </Routes>
      ) : (
        <LoginScreen />
      )}
    </Router>

    </div>
  );
}

export default App;
