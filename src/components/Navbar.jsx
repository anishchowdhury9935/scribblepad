import React, { useState, useContext, useEffect } from 'react'
import noteContext from '../context/noteContext';
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserDetails from './UserDetails';
export default function Navbar(props) {
    const location = useLocation()
    const context = useContext(noteContext)
    const navigate = useNavigate()
    const { allAlert,getNotes } = context;
    const [ModeName, setModeName] = useState("Light mode")
    const [BootmodeName, setBootmodeName] = useState("dark")
    const [icon, seticon] = useState("sun")
    const [icon_color, seticon_color] = useState({ "color": "white" })
    const [Link_color, setLink_color] = useState("dark")
    const [Sign_color, setSign_color] = useState("light")
    const body = document.querySelector('body');
    const [Title_text, seTtitle_text] = useState("Home")
    let [LogOut_style,setLogOut_style] = useState({"display": "block"})
    body.style.transitionDuration = "0.4s"
    document.title = "Scribble pad "+`| ${Title_text}`
    const togle_mode = () => {
        const nav = document.querySelector('label');
        if (localStorage.getItem('mode') !== 'true'){
            localStorage.setItem('mode','true')
            body.style.color = "white"
            body.style.backgroundColor = 'rgb(24, 0, 45)'
            nav.style.color = "rgb(8, 8, 65)";
            setModeName('Dark mode')
            seticon('moon')
            setBootmodeName(" ")
            seticon_color({ "color": "#080841" });
            setLink_color("light")
            setSign_color("dark")
        } else {
            localStorage.setItem('mode','false')
            body.style.color = "rgb(8, 8, 65)"
            nav.style.color = "white";
            body.style.backgroundColor = 'white'
            setModeName('Light mode')
            setBootmodeName("dark")
            seticon("sun")
            seticon_color({ "color": "white" });
            setLink_color("dark")
            setSign_color("light")
        }
    };
    // logout
    const LogOut = () => {
        localStorage.setItem('token', '');
        localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNzA0NDY5NDk3fQ.uZX3xZzBt5GJY0ZhhtDQ9kPkTRURtvwcKq8wAYcnKPM");
        allAlert('you have loged out', 'danger')
        navigate('/login')
        window.location.reload();
    }
    let title_text_func = ()=> {
        if (location.pathname === location.pathname) {
            seTtitle_text(`${location.pathname.slice(1)}`)
        }
    }
    useEffect(()=>{if (localStorage.getItem('token') === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNzA0NDY5NDk3fQ.uZX3xZzBt5GJY0ZhhtDQ9kPkTRURtvwcKq8wAYcnKPM') {
        setLogOut_style({"display":"none"})
        
    }togle_mode()},[])
    useEffect(()=>{
        title_text_func()
    },[location.pathname])
    return (
        <div className="Navbar" >
            <nav className="navbar navbar-expand-lg bg-body-tertiary " data-bs-theme={`${BootmodeName}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">{props.companyName}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item ">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                            <li className="nav-item ">
                                <Link className={`nav-link ${location.pathname === "/AddNote" ? "active" : ""}`} to="/AddNote">Add notes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/yournotes" ? "active" : ""}`} to="/yournotes" onClick={getNotes}>Your notes</Link>
                            </li>
                            <li className="btn-group dropend nav-item">
                                <button type="button" className={`btn btn-${Sign_color} dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false" >
                                    Log/Sign
                                </button>
                                <form className="dropdown-menu " role="search" >
                                    <Link className={`btn btn-${Sign_color} mx-1`} to="/signup" role="button">Sign up</Link>
                                    <Link className={`btn btn-${Link_color}`} to="/login" role="button" id='login'>Login</Link>
                                </form>
                            </li>
                        </ul>
                        <div style={{ "display": "flex", "alignItems": "center" }}>
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{ "color": "white" }}>{ModeName}</label>
                            <i className={`fa-solid fa-${icon} fa-xl`} style={{ ...icon_color, "cursor": "pointer", "margin": "0 0.4em 0 0.4em" }} onClick={togle_mode}></i>
                            <div className="mobile-user" style={{ "display": "none" }}>
                                <UserDetails drop_center="dropdown" />
                            </div>
                            <div className="desktop-user">
                                <UserDetails drop_left="dropstart" />
                            </div>
                            <div className='logout' style={LogOut_style}>
                                <button type="button" className={`btn btn-${Sign_color}`} aria-expanded="false" onClick={LogOut} >
                                    logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

