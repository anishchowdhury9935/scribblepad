import React, { useContext } from "react"
import noteContext from '../context/noteContext';
export default function Alert() {
    const {Alert,AlertStyle,allAlert,AlertType} = useContext(noteContext)
        setTimeout(() => {
            allAlert("","",{"display": "none"})
        }, 12000)
    return (
        <div style={{...AlertStyle,"position":"absolute","marginTop":"0.25em","marginLeft":"0.25em","width":"99.5vw"}} id="alert-qp30">
            <div style={{"width":"auto","display":"flex","justifyContent":"flex-end"}}>
                <div className={`alert alert-${AlertType}`} role="alert">
                    {Alert}
                </div>
            </div>
        </div>
    )
}
