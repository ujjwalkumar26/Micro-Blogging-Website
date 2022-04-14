import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/SignIn';
import Register from './pages/SignUp';
import MenuBar from './components/MenuBar';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <>
    <MenuBar/>
    <Router>
      <Routes>
        <Route exact path = '/' element = {<Home/>}/>
        <Route exact path = '/signin' element = {<Login/>}/>
        <Route exact path = '/signup' element = {<Register/>}/>
        <Route path="*" element = {<PageNotFound/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;