import React,{useState} from 'react'

export default function UserDetails(props) {
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Date, setDate] = useState('')
    async function LogDtails () {
        try {
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
        } catch (error) {
            
        }
    }
    LogDtails()
    return (
        <div>                          
            <div className={`btn-group ${props.drop_left} mx-1 ${props.drop_center}`}>
                <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    {Name}
                </button>
                <ul className="dropdown-menu">
                    <li className=" px-4 py-1 email dropdown-item"style={{"cursor":"pointer"}}onClick={(e)=>{navigator.clipboard.writeText(Email);e.preventDefault();}}>{Email}</li>
                    <li><hr className="dropdown-divider" /></li>
                    <li className=" px-4 py-1 dropdown-item"style={{"cursor":"pointer"}}>Joined in: {Date.slice(0,10)}</li>
                </ul>
            </div></div>
    )
}
