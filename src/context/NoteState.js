import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    const [Alert, setAlert] = useState("")
    const [AlertStyle, setAlertStyle] = useState({ "display": "none" })
    const [AlertType, setAlertType] = useState("success") // there is two types of AlertType DANGER , SUCCESS
    const host = "https://inotebook-fguk.onrender.com:5000"
    // const host = "http://localhost:5000"
    // first login
    localStorage.getItem("token") === null && localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNzA0NDY5NDk3fQ.uZX3xZzBt5GJY0ZhhtDQ9kPkTRURtvwcKq8wAYcnKPM")
    let auth_token = localStorage.getItem('token')
    const notesinitial = []
    const [notes, setnotes] = useState(notesinitial)
    //get all notes
    const getNotes = async () => {
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
                const data = await response.json();
                callback(data, null);
            } catch (error) {
                callback([], error);
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
    function allAlert(setAlert$="", setAlertType$="danger", setAlertStyle$={"display": "none"}) {
        const _docstring = "setAlert$,setAlertStyle$,setAlertType$"
        setAlert(setAlert$)
        setAlertStyle(setAlertStyle$)
        setAlertType(setAlertType$)
    }
    const value = { notes, Alert, setnotes, addnote, deleteNote, editNote, getNotes, AlertStyle, AlertType, allAlert}
    return (
        <NoteContext.Provider value={value}>
            {props.children}
        </NoteContext.Provider>

    )
}


export default NoteState;
