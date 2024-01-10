import React, { useState, useEffect,useContext } from 'react'
import Loder from './Loder'
import noteContext from '../context/noteContext'
export default function UserDetails(props) {
    const context = useContext(noteContext);
    const { allAlert } = context;
    const [visible, setvisible] = useState(false)
    const [Name, setName] = useState(localStorage.getItem('token') === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNzA0NDY5NDk3fQ.uZX3xZzBt5GJY0ZhhtDQ9kPkTRURtvwcKq8wAYcnKPM" ? "Guest" : " ")
    const [Email, setEmail] = useState(`guest${Math.floor(Math.random() * 300 + 100)}@gmail.com`)
    const [date, setDate] = useState("")
    async function LogDtails() {
        try {
            setvisible(true)
            const host = "https://inotebook-backend-95j7.onrender.com"
            // const host = "http://localhost:5000"
            const auth_token = localStorage.getItem('token');
            const url = `${host}/api/users/auth/getUser`
            const response = await fetch(url, {
                method: 'get',
                headers: {
                    "content-type": "application/json",
                    "auth-token": auth_token
                }
            })
            const data = await response.json();
            setEmail(data.email)
            setName(data.name)
            setDate(data.date)
            setvisible(false)
        } catch (error) {

        } finally {
            setvisible(false)
        }
    }
    useEffect(() => {
        LogDtails()
    }, [])
    return (
        <div>
            <div className={`btn-group ${props.drop_left} mx-1 ${props.drop_center}`}>
                <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ "display": "flex", "alignItems": "center" }}>
                    <div style={{ "display": "flex" }}>
                        <Loder visible={visible} height={'26'} weight={'26'} color={"#18002D"} />
                        {Name}
                    </div>
                </button>
                <ul className="dropdown-menu">
                    <li className=" px-4 py-1 email dropdown-item" style={{ "cursor": "pointer" }} onClick={(e) => { navigator.clipboard.writeText(Email); e.preventDefault(); allAlert("copied✅","success"); }}>{Email}</li>
                    <li><hr className="dropdown-divider" /></li>
                    <li className=" px-4 py-1 dropdown-item" style={{ "cursor": "pointer" }}>Joined in: {date.slice(0, 10)}</li>
                </ul>
            </div>
        </div>
    )
}
