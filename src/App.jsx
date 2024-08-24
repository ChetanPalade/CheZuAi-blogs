import React, { useEffect, useState } from 'react'

import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Auth from './components/Auth'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from "./store";
import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import Edit from "./pages/edit/Edit";
import axios from "axios";

function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn) 
  const dispatch = useDispatch()
  const [isSignup, setisSignup] = useState(false)
  const [blogsData, setBlogsData] = useState([]);
  useEffect(() => {
    if ( localStorage.getItem("userId")){
      dispatch(authActions.signin())
    }
    axios
      .get("https://mern-blog-app-server-production.up.railway.app/api/blogs")
      .then((res) => setBlogsData(res.data))
      .catch((error) => console.log(error));
  }, [blogsData]);

  return (
    <>
     <React.Fragment>
      <header>
        {/* <Header isLoggedIn={isLoggedIn} /> */}
        <Header isSignup={isSignup} setisSignup={setisSignup} />
      </header>
      <main>
        <Routes>
          { !isLoggedIn ? <Route path="/auth" element={<Auth isSignup={isSignup} setisSignup={setisSignup} />} ></Route>:
          <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home blogsData={blogsData} />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit blogsData={blogsData} />} />
        </Routes>
      </BrowserRouter>
      </>}
        </Routes>
      </main>
    </React.Fragment>
    </>
  );
}

export default App;



