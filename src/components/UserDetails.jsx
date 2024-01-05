import React,{useState} from 'react'

export default function UserDetails() {
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Date, setDate] = useState('')
    async function LogDtails () {
        try {
            const host = "https://inotebook-backend-odkj.onrender.com:10000" 
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
        } catch (error) {
            
        }
    }
    LogDtails()
    return (
        <div>
            <div className="btn-group dropstart mx-1">
                <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    {Name}
                </button>
                <ul className="dropdown-menu">
                    <li className=" px-4 py-1 email"style={{"cursor":"pointer"}}onClick={(e)=>{navigator.clipboard.writeText(Email);e.preventDefault();}}>{Email}</li>
                    <li><hr className="dropdown-divider" /></li>
                    <li className=" px-4 py-1"style={{"cursor":"pointer"}}>Joined in: {Date.slice(0,10)}</li>
                </ul>
            </div></div>
    )
}
