import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ToggleButton(props) {
    if (props.active)
        return <button className="icon-button" onClick={props.onToggle} style={{backgroundColor: props.activeColor}}>
            <FontAwesomeIcon icon={props.activeIcon} />
        </button>
    else
        return <button className="icon-button" onClick={props.onToggle} style={{backgroundColor: props.inactiveColor || "#BF616A"}}>
            <FontAwesomeIcon icon={props.inactiveIcon || props.activeIcon} />
        </button>
}