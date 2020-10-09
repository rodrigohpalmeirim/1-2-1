import React from "react";
import { ActionInput } from "./ActionInput";
import { Spinner } from "./Spinner";

export function ConnectionPannel(props) {
    return <div id="panel">
        {!props.id ? <Spinner /> :
            <div>
                <span id="id" className="item-title">Your ID</span>
                <span className="clickable-text" onClick={(event) => { navigator.clipboard.writeText(event.target.textContent) }}>{props.id}</span>
                <br /><br /><br />
                <ActionInput placeholder="Enter peer's ID" icon={props.icon} autoFocus={true} action={props.action} />
            </div>
        }
    </div>;
}