import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    const notesinitial = []
    const [notes, setnotes] = useState(notesinitial)
    const [Progress, setProgress] = useState(0)
    const [Alert, setAlert] = useState("")
    const [AlertStyle, setAlertStyle] = useState({ "display": "none" })
    const [AlertType, setAlertType] = useState("success") // there is two types of AlertType DANGER , SUCCESS
    const host = "https://inotebook-backend-95j7.onrender.com" 
    // const host = "http://localhost:5000"
    // first login
    localStorage.getItem("token") === null && localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNzA0NDY5NDk3fQ.uZX3xZzBt5GJY0ZhhtDQ9kPkTRURtvwcKq8wAYcnKPM")
    let auth_token = localStorage.getItem('token')
    //get all notes
    const getNotes = async () => {
        setProgress(18)
        const url = `${host}/api/users/notes/fetchallnotes`;
        // fetch api  
        async function fetchDataAndRespond(url, callback) {
            try {
                const response = await fetch(url, {
                    method: 'get',
                    headers: {
                        "content-type": "application/json",
                        "auth-token": auth_token
                    }
                });
                setProgress(57)
                const data = await response.json();
                setProgress(80)
                callback(data, null);
            } catch (error) {
                callback([], error);
            }finally{
                setProgress(100)
            }
        }
        // calling the above method
        fetchDataAndRespond(url, (data, error) => {
            setnotes(data)
        })
    }
    const addnote = async ({ title, description, tag }) => {
        // fetch api 
        const url = `${host}/api/users/notes/addnotes`
        const response = await fetch(url, {
            method: 'post',
            headers: {
                "content-type": "application/json",
                "auth-token": auth_token
            },
            body: JSON.stringify({ title, description, tag })
        })
        const note = await response.json();
        // logic for adding notes
        if (Array.isArray(note.errors)){
            allAlert(note.errors[0].msg,"danger")
        }else{
            allAlert("note added","success")
        }
        setnotes(notes.concat(note))
    }
    //delete a Note
    const deleteNote = async (id) => {
        const deletenotes = notes.filter((note) => { return note._id !== id })
        setnotes(deletenotes)
        const url = `${host}/api/users/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: 'delete',
            headers: {
                "content-type": "application/json",
                "auth-token": auth_token
            }
        })
        const data = await response.json();
    }
    // edit a Note
    const editNote = async (id, title, description, tag) => {
        // fetch api 
        const url = `${host}/api/users/notes/updatenote/${id}`
        const response = await fetch(url, {
            method: 'put',
            headers: {
                "content-type": "application/json",
                "auth-token": auth_token
            },
            body: JSON.stringify({ title, description, tag })
        })
        // logic for edit the note
        notes.forEach((obj) => {
            if (obj.id === id) {
                obj.title = title;
                obj.description = description;
                obj.tag = tag;
            }
        })
    }
    // all Alert, setAlert, AlertStyle, setAlertStyle, AlertType, setAlertType
    function allAlert(setAlert$="", setAlertType$="danger", setAlertStyle$={"display": "flex"}) {
        const _docstring = "---| You have to give the argument in this manner => setAlert$,setAlertType$,setAlertStyle$ |---"
        setAlert(setAlert$)
        setAlertType(setAlertType$)
        setAlertStyle(setAlertStyle$)
        return _docstring
    }
    const value = { notes, Alert, setnotes, addnote, deleteNote, editNote, getNotes, AlertStyle, AlertType, allAlert,Progress,setProgress}
    return (
        <NoteContext.Provider value={value}>
            {props.children}
        </NoteContext.Provider>

    )
}

export default NoteState;
