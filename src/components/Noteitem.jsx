import React, { useContext } from 'react'
import noteContext from '../context/noteContext'
export default function Noteitem(props) {
    const context = useContext(noteContext)
    const { note,updatenote } = props
    const { deleteNote,getNotes } = context
    return (
        <div className="col-md-4  my-2" >
            <div className="card">
                <div className="card-body">
                    <div style={{"display":"flex","justifyContent":"space-between"}}>
                        <h5 className="card-title">{note.title}</h5>
                        <span class="badge bg-dark" style={{"maxHeight":"2em"}}>{note.tag}</span>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <i className="fa-solid fa-trash" onClick={()=>{deleteNote(note._id);}}></i>
                        <i className="fa-regular fa-pen-to-square fa-rotate-180" onClick={()=>{updatenote(note,note._id)}}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
