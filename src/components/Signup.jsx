import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
const sign_in_img = require('../image/sign_in.png')
export default function Signup() {
    const navigate = useNavigate()
    const Onsubmit = async (e) => {
        e.preventDefault()
        const name = document.getElementById("exampleInputName1").value
        const email = document.getElementById("exampleInputEmail1").value
        const password = document.getElementById("exampleInputPassword1").value
        const host = "https://inotebook-backend-95j7.onrender.com" 
        // const host = "http://localhost:5000"
        // fetch api 
        const url = `${host}/api/users/auth/CreateUser`
        const response = await fetch(url, {
            method: 'post',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })
        const json = await response.json();
        if (json.authdata) {
            localStorage.setItem("token", json.authdata)
            navigate('/')
            window.location.reload();
        } else {
            alert("Please enter")
        }
    }
    const [Disablesign, setDisablesign] = useState('')
    function disable_sign_in() {
        const password = document.getElementById("exampleInputPassword1").value
        const confirmPassword = document.getElementById("exampleInputconfirmPassword1").value
        console.log(password);
        if (password !== confirmPassword) { setDisablesign('disabled') } else { setDisablesign('') }
    }
    return (
        <div className='my-4 alog' style={{ "display": "flex" }}>
            <div style={{ "width": "32em" }} className='alog-item'>
                <h3 style={{ "marginLeft": "22%" }}>It takes only a minute</h3>
                <form onSubmit={Onsubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName1" className="form-label" name='name'>Name:</label>
                        <input type="text" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label" name='email'>Email<div style={{ "fontSize": "0.9em" }}>We'll never share your email with anyone else.</div></label>
                        <input type="email" className="form-control" id="exampleInputEmail1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" name='password'>Password:</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={disable_sign_in} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputconfirmPassword1" className="form-label">Confirm password:</label>
                        <input type="password" className="form-control" id="exampleInputconfirmPassword1" onChange={disable_sign_in} />
                    </div>
                    <button type="submit" className={`btn btn-primary ${Disablesign}`}>Sign in</button>
                </form>
            </div>
            <div className='img-sign'>
            <img className="img-fluid" src={`${sign_in_img}`} alt=""/>
            </div>
        </div>
    )
}
