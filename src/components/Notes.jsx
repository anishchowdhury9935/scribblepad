import { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/noteContext';
import Noteitem from './Noteitem';
const img =  require('../image/illustration.png')
export default function Notes() {
    const context = useContext(noteContext)
    const { notes, getNotes, editNote,allAlert } = context;
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "", id: "" })
    const ref = useRef(null)
    useEffect(() => {
        getNotes()
        console.log('run');
    },[note])
    let updatenote = (curentnote, id) => {
        ref.current.click()
        setNote({ etitle: curentnote.title, edescription: curentnote.description, etag: curentnote.tag, id: id })
    }
    const handleonclick = (e) => {
        e.preventDefault()
        editNote(note.id, note.etitle, note.edescription, note.etag)
        allAlert('updated successfully',"success")
        getNotes()
    } 
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value })
        getNotes()
    }
    let obj_notes = {"width":"100%","display":"none","flexDirection":"column","alignItems":"center","height":"32vh"};
    let obj_your = {"display":"block"};
    const notes_Nothing = ()=>{
        if (obj_notes.display !=="flex" && obj_your.display !=="none") {
            obj_notes.display ="flex"
            obj_your.display ="none"
        }else{
            obj_notes.display ="none"
            obj_your.display ="block"
        }
    }
    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref} style={{ "visibility": "hidden" }}>
                Launch demo modal
            </button>
            <div style={{ "position": "absolute", "width": "100vw","marginLeft":"-46px","color":"rgb(24, 0, 45)" }}>
                <div className="modal fade modal-dialog modal-dialog-centered" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ "transition": "all", "transitionDuration": "0.5s", "display": "none", "margin": "auto" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update your notes</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className='my-3' id='add_notes_form'>
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input htmlFor="title" type="text" className="form-control" id="etitle " name="etitle" placeholder="notes title" value={note.etitle} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">description</label>
                                        <input type="text" className="form-control" id="edescription" name="edescription" placeholder="your description" value={note.edescription} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">tag</label>
                                        <input type="text" className="form-control" id="etag" name="etag" placeholder="your tag" value={note.etag} onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button disabled={note.etitle.length === 0 && note.edescription.length ===0} type="button" className="btn btn-primary" onClick={handleonclick}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <h4 className='your_notes' style={obj_your}>Your notes:</h4>
                <div className="container">
                    {notes.length === 0 && notes_Nothing()}
                    <div className="nothing_notes"style={{...obj_notes,"height":"100%"}}>
                        <h3>You haven't add any notes!</h3>
                        <img src={img} alt="alternatetext"></img >
                    </div>
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updatenote={updatenote} note={note} />
                })}
            </div>
        </div> 
    )
} 
