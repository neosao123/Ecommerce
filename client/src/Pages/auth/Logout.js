import React, { useState, useEffect } from 'react';
// import authh from '../../firebase';
import { useDispatch } from 'react-redux';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Logout = () =>{

    const navigate = useNavigate();
    let dispatch = useDispatch();

    console.log('logout');
    const auth = getAuth();
    signOut(auth);

    dispatch({
        type:'LOGOUT',
        payload: null
    });

    navigate('/login');
    
  }

export default Logout