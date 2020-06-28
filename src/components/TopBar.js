import React from 'react'
import './TopBar.css'

function TopBar(props) {
    let txt
    if (props.stateName == '') txt = ''
    else txt = `: ${props.stateName}`
    return (
        <div className="TopBar">
            COVID Tracker{txt}
        </div>
    )
}

export default TopBar