import React, { useContext,useEffect } from 'react';
import Notes from './Notes'; 
import noteContext from '../context/noteContext';
import { useNavigate } from 'react-router-dom';
export default function YourNotes() {
    const navigate = useNavigate()
    const context = useContext(noteContext)
    const { allAlert,getNotes,setProgress } = context;
    function first_signup() {
        if (localStorage.getItem('token') === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNzA0NDY5NDk3fQ.uZX3xZzBt5GJY0ZhhtDQ9kPkTRURtvwcKq8wAYcnKPM") {
            allAlert("please login or sign up first",'danger')
            navigate('/login')
        }
    } 
    useEffect(()=>{
        first_signup()
        getNotes()
        return setProgress(0)
    },[])
    return (
        <>
        <Notes />
        </>
    )
} 
