import React, {useContext } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { AuthProvider, AuthContext } from './context/auth';
import { Link } from "react-router-dom";


function App() {
  const { user } = useContext(AuthContext);
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route exact path = '/' element = {<Home/>}/>
        <Route exact path = '/signin' element = {user ? <Link to = "/"/> : <SignIn /> } />
        <Route exact path = '/signup'  element = {user ? <Link to = "/"/> : <SignUp /> }/>
        <Route path="*" element ={ <Link to = '/'/>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;