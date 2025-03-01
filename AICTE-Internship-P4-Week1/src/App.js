import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import SetAvatar from './Pages/Avatar/setAvatar';
import Home from './Pages/Home/Home';




const App = () => {
  return (
    
      <div className="App" style={{backgroundColor:'grey'}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
          
        </Routes>
      </BrowserRouter>
      </div>

  )
}

export default App