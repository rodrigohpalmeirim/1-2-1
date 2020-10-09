import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFileAlt, faFileAudio, faFileVideo, faFileImage, faFilePdf, faFileArchive, faTimesCircle } from "@fortawesome/free-solid-svg-icons"

function sizeString(bytes) {
    if (bytes < 2 ** 10) {
        return Math.round(bytes * 10) / 10 + " B";
    } else if (bytes < 2 ** 20) {
        return Math.round(bytes / 2 ** 10 * 10) / 10 + " KiB";
    } else if (bytes < 2 ** 30) {
        return Math.round(bytes / 2 ** 20 * 10) / 10 + " MiB";
    } else if (bytes < 2 ** 40) {
        return Math.round(bytes / 2 ** 30 * 10) / 10 + " GiB";
    } else if (bytes < 2 ** 50) {
        return Math.round(bytes / 2 ** 40 * 10) / 10 + " TiB";
    } else if (bytes < 2 ** 60) {
        return Math.round(bytes / 2 ** 50 * 10) / 10 + " PiB";
    } else if (bytes < 2 ** 70) {
        return Math.round(bytes / 2 ** 60 * 10) / 10 + " EiB";
    } else if (bytes < 2 ** 80) {
        return Math.round(bytes / 2 ** 70 * 10) / 10 + " ZiB";
    } else if (bytes < 2 ** 90) {
        return Math.round(bytes / 2 ** 80 * 10) / 10 + " YiB";
    }
}

export function FileList(props) {
    return <div className="file-list">
        {Object.keys(props.files).map((fileName) => {
            const file = props.files[fileName];
            var icon = faFile;
            if (file.type.includes("text/")) {
                icon = faFileAlt;
            } else if (file.type.includes("audio/")) {
                icon = faFileAudio;
            } else if (file.type.includes("video/")) {
                icon = faFileVideo;
            } else if (file.type.includes("image/")) {
                icon = faFileImage;
            } else if (file.type.includes("pdf")) {
                icon = faFilePdf;
            } else if (file.type.includes("zip") || file.type.includes("tar")) {
                icon = faFileArchive;
            }
            return props.percent && props.percent[fileName] < 100 ?
                <div key={fileName} className="file" style={{ backgroundColor: "#2E3440" }}>
                    <div className="progress-bar" style={{ width: props.percent[fileName] + "%" }} />
                    <FontAwesomeIcon icon={icon} style={{ fontSize: 50, marginRight: 10, zIndex: 1 }} />
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                        <div style={{ display: "flex", flexDirection: "column", zIndex: 1 }}>
                            <span>{fileName}</span>
                            <span style={{ fontSize: 15 }}>{sizeString(file.size)}</span>
                            <span style={{ fontSize: 15 }}>{props.percent[fileName]}%</span>
                        </div>
                        {props.removeAction &&
                            <FontAwesomeIcon className="remove-button" icon={faTimesCircle} onClick={() => props.removeAction(fileName)} />
                        }
                    </div>
                </div> :
                <div key={fileName} className="file" onClick={() => { if (props.clickAction) props.clickAction(fileName) }} style={!props.clickAction ? {} : { cursor: "pointer", color: "#88C0D0" }}>
                    <FontAwesomeIcon icon={icon} style={{ fontSize: 50, marginRight: 10 }} />
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span>{fileName}</span>
                            <span style={{ fontSize: 15 }}>{sizeString(file.size)}</span>
                        </div>
                        {props.removeAction &&
                            <FontAwesomeIcon className="remove-button" icon={faTimesCircle} onClick={() => props.removeAction(fileName)} />
                        }
                    </div>
                </div>
        })}
    </div>
}