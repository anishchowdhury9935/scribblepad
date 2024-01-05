import React,{useContext,useEffect} from 'react'
import Notes from './Notes'; 
import noteContext from '../context/noteContext';
export default function Home() {
    const context = useContext(noteContext)
    const { allAlert } = context;
    function first_signup() {
        if (localStorage.getItem('token')=== "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNzA0NDY5NDk3fQ.uZX3xZzBt5GJY0ZhhtDQ9kPkTRURtvwcKq8wAYcnKPM") {
            allAlert("please login or sign up first",'danger',{"display": "block"})
            // setAlert("please login or sign up first");
            // setAlertType('danger')
            // setAlertStyle({"display": "block"});
        }
    }
    useEffect(first_signup,[])
    return (
        <>
        <Notes />
        </>
    )
} 
