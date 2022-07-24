import React from "react";
import Home from "./home/home";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import "./App.scss";
import io from "socket.io-client";
import Login from "./Login/Login";
import Register from "./Register/Register";
import {CallProvider} from "./Contexts/CallContext";

const socket = io.connect('http://localhost:3000/');
const App = () => {
    const user  = JSON.parse(localStorage.getItem("user"));
  return (
      <Router>
        <div className="App">
          <Routes>
              <Route path="/login" element={ <Login />}/>
              <Route path="/register" element={ <Register socket={socket} />}/>
              <Route path="/" element={ <CallProvider socket={socket} user={user}><Home socket={socket} user={user}/></CallProvider>}/>
          </Routes>
        </div>
      </Router>
  );
};

export default App;
