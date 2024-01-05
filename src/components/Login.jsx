import React,{useContext} from 'react'
import { useNavigate  } from "react-router-dom";
import noteContext from '../context/noteContext';
export default function Login() {
    const context = useContext(noteContext)
    const {allAlert } = context;
    const navigate = useNavigate()
    const Onsubmit = async (e) => {
        e.preventDefault()
        const email = document.getElementById("exampleInputEmail1").value
        const password = document.getElementById("exampleInputPassword1").value
        const host = "https://inotebook-backend-odkj.onrender.com" 
        // const host = "http://localhost:5000"
        // fetch api 
        const url = `${host}/api/users/auth/Login`
        const response = await fetch(url, {
            method: 'post',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json();
        if (json.authdata) { 
            localStorage.setItem("token", json.authdata)
            navigate('/')
            window.location.reload();
            allAlert("you have logged in successfully✅","success",{"display": "block"})
        }else{
            allAlert(json.errors,"danger",{"display": "block"})
        }
    }
    return (
        <div className='my-4'style={{"display":"flex"}}>
            <div style={{"width":"32em"}}>
                <form onSubmit={Onsubmit}>
                <h3 style={{"marginLeft":"43%"}}>Login</h3>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label"><div>Email address:</div><div style={{"fontSize":"0.9em"}}>We'll never share your email with anyone else.</div></label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password:</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
            <div>

            </div>
        </div>
    )
}
