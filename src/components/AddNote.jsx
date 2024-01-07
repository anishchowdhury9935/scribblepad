import React, { useState,useContext,useEffect } from 'react'
import { useNavigate  } from "react-router-dom";
import noteContext from '../context/noteContext';
export default function AddNote() {
    const context = useContext(noteContext)
    const navigate = useNavigate()
    const { addnote,getNotes,allAlert } = context;
    const [note,setNote] = useState({title:"",description:"",tag:""})
    const handleonclick = (e) => {
        e.preventDefault()
        addnote(note); 
        setNote({title:" ",description:" ",tag:" "})
        getNotes()
    }
    const onChange = (e) => {
        setNote({...note,[e.target.name]:e.target.value})
        getNotes()
    }
    function first_signup() {
        if (localStorage.getItem('token') === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNzA0NDY5NDk3fQ.uZX3xZzBt5GJY0ZhhtDQ9kPkTRURtvwcKq8wAYcnKPM") {
            allAlert("please login or sign up first",'danger',{"display": "block"})
            navigate('/Login')
        }
    }
    useEffect(first_signup,[])
    return (
        <div className='my-4' style={{"width":""}}>
            <h4>Add notes:</h4>
            <form className='my-3' id='add_notes_form'>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input htmlFor="title" type="text" className="form-control" id="title " name="title" placeholder="notes title" value={note.title} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">description</label>
                    <input htmlFor="text" className="form-control" id="description" name="description" placeholder="your description" value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">tag</label>
                    <input htmlFor="text" className="form-control" id="tag" name="tag" placeholder="your tag" value={note.tag} onChange={onChange} />
                </div>
                    <button disabled={note.title.length === 0 || note.description.length === 0} type="submit" className="form-control" id="submit_button" onClick={handleonclick}>submit</button>
            </form>
        </div>
    )
}
