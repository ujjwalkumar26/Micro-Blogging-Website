import React, {useContext } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { AuthProvider, AuthContext } from './context/auth';


function App() {
  const { user } = useContext(AuthContext);
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route exact path = '/' element = {<Home/>}/>
        <Route exact path = '/signin' element = {user ? <Navigate to = "/"/> : <SignIn /> } />
        <Route exact path = '/signup'  element = {user ? <Navigate to = "/"/> : <SignUp /> }/>
        <Route path="*" element ={ <Navigate to = '/'/>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;