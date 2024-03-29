import React,{useContext} from 'react'
import { useNavigate  } from "react-router-dom";
import noteContext from '../context/noteContext';
const login_img = require('../image/login.avif')
export default function Login() {
    const context = useContext(noteContext)
    const {allAlert,setProgress } = context;
    const navigate = useNavigate()
    const Onsubmit = async (e) => {
        e.preventDefault()
        const email = document.getElementById("exampleInputEmail1").value
        const password = document.getElementById("exampleInputPassword1").value
        const host = "https://inotebook-backend-95j7.onrender.com" 
        // fetch api 
        const url = `${host}/api/users/auth/Login`
        setProgress(28)
        const response = await fetch(url, {
            method: 'post',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        setProgress(59)
        const json = await response.json();
        setProgress(92)
        if (json.authdata) { 
            localStorage.setItem("token", json.authdata)
            navigate('/AddNote')
            window.location.reload();
            allAlert("you have logged in successfully✅","success")
            localStorage.setItem('mode','false')
        }else{
            if (json.errors !== undefined ) {
                allAlert(json.errors[0].msg || json.errors || "please enter your Login credentials❌","danger")
            }
        }
        setProgress(100)
    }
    return (
        <div className='my-4 alog'style={{"display":"flex"}}>
            <div style={{"width":"32em"}} className='alog-item'>
                <form onSubmit={Onsubmit}>
                <h3 style={{"marginLeft":"43%"}}>Login</h3>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label"><div>Email address:</div><div style={{"fontSize":"0.9em"}}>We'll never share your email with anyone else.</div></label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password:</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
            <div className='img-log'>
            <img className="img-fluid" src={`${login_img}`} alt=""/>
            </div>
        </div>
    )
}
