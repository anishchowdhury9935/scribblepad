import React, { useContext } from "react"
import noteContext from '../context/noteContext';
export default function Alert() {
    const {Alert,AlertStyle,allAlert,AlertType} = useContext(noteContext)
    setTimeout(() => {
        allAlert("","",{"display": "none"})
    }, 5000);
    return (
        <div style={{...AlertStyle,"position":"absolute","marginTop":"4px","marginLeft":"4px"}}>
            <div className={`alert alert-${AlertType}`} role="alert">
                {Alert}
            </div>
        </div>
    )
}
