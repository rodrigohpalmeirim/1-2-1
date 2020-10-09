import React, { Component } from "react";
import "./App.css";
import { IconPattern } from "./IconPattern";
import { Waves } from "./Waves";
import { faArrowRight, faDesktop, faSatellite, faSatelliteDish, faMobileAlt, faWifi, faPaperPlane, faBroadcastTower, faGlobeAmericas, faUser, faTabletAlt, faFileUpload, faFile, faFileAlt, faFileAudio, faFileVideo, faFileImage, faFilePdf, faFileArchive } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileList } from "./FileList"
import { ConnectionPannel } from "./ConnectionPanel";

const CHUNK_SIZE = 64 * 1024;

var msgConnection;
var peerId;
var localFiles = {};
var downloadPercent = {};
var uploadPercent = {};

export default class FileTransferApp extends Component {
    constructor(props) {
        super(props);

        this.resizeHandler = this.resizeHandler.bind(this);
        this.connect = this.connect.bind(this);
        this.connectionHandler = this.connectionHandler.bind(this);
        this.fileHandler = this.fileHandler.bind(this);
        this.removeFile = this.removeFile.bind(this);

        this.state = {
            connected: false,
            localFilesInfo: {},
            peerFilesInfo: {},
        };
    }

    componentDidMount() {
        window.addEventListener("resize", this.resizeHandler);
        this.props.peer.on("connection", this.connectionHandler);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeHandler);
        try { msgConnection.close(); } catch {}
    }

    resizeHandler() {
        this.forceUpdate()
    }

    connect(id) {
        const connection = this.props.peer.connect(id);
        this.connectionHandler(connection);
    }

    connectionHandler(connection) {
        if (!this.state.connected) {                // Message connection
            connection.on("open", () => {
                this.setState({ connected: true });
                if (Object.keys(this.state.localFilesInfo).length)
                    msgConnection.send(this.state.localFilesInfo);
            });

            connection.on("close", () => {
                this.setState({
                    connected: false,
                    peerFilesInfo: {}
                });
                downloadPercent = {};
                uploadPercent = {};
            });

            connection.on("data", (data) => {
                if (data.toString().includes("DOWNLOAD:")) {
                    this.sendFile(localFiles[data.split("DOWNLOAD:")[1]]);
                } else {
                    this.setState({ peerFilesInfo: data });
                }
            });

            msgConnection = connection;
            peerId = connection.peer;
        } else {                                    // File connection
            var fileParts = [];
            var interval;
            var percent;
            connection.on("data", (data) => {
                fileParts.push(data);
                const chunks = connection.metadata.fileSize / CHUNK_SIZE;
                if (interval === undefined) {
                    this.forceUpdate();
                    percent = Math.min(100, Math.round(fileParts.length / chunks * 100));
                    downloadPercent[connection.metadata.fileName] = percent;
                    interval = setInterval(() => {
                        percent = Math.min(100, Math.round(fileParts.length / chunks * 100));
                        downloadPercent[connection.metadata.fileName] = percent;
                        this.forceUpdate();
                        connection.send(percent);
                    }, 200);
                }
                if (Math.ceil(chunks) === fileParts.length) {
                    this.saveFile(new Blob(fileParts), connection.metadata.fileName);
                    clearInterval(interval);
                    downloadPercent[connection.metadata.fileName] = 100;
                    this.forceUpdate();
                    connection.send(100);
                }
            });

            connection.on("close", () => {
                clearInterval(interval);
                delete downloadPercent[connection.metadata.fileName];
                this.forceUpdate();
                return;
            });
        }
    }

    saveFile(blob, fileName) {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    }

    fileHandler(e) {
        var filesInfo = this.state.localFilesInfo;
        for (const file of e.target.files) {
            filesInfo[file.name] = { size: file.size, type: file.type };
            localFiles[file.name] = file;
        }

        if (Object.keys(filesInfo).length) {
            this.setState({ localFilesInfo: filesInfo });
            if (this.state.connected)
                msgConnection.send(filesInfo);
        }

        e.target.value = "";
    }

    removeFile(fileName) {
        const temp = this.state.localFilesInfo;
        delete temp[fileName];
        this.setState({ localFilesInfo: temp });
        delete localFiles[fileName];
        delete uploadPercent[fileName];
        if (this.state.connected)
            msgConnection.send(temp);
    }

    sendFile(file) {
        try {
            var fileSize = file.size;
            var fileName = file.name;
        } catch (e) {
            return;
        }
        var offset = 0;

        const connection = this.props.peer.connect(peerId, {
            ordered: true,
            reliable: true,
            serialization: "none",
            metadata: { fileName: fileName, fileSize: fileSize }
        });

        function readchunk() {
            var r = new FileReader();
            var blob = file.slice(offset, CHUNK_SIZE + offset);
            r.onload = function (e) {
                if (!e.target.error) {
                    offset += CHUNK_SIZE;
                    connection.send(e.target.result);
                    if (offset >= fileSize)
                        return;
                } else {
                    console.log("Read error: " + e.target.error);
                    return;
                }
                readchunk();
            };
            r.readAsArrayBuffer(blob);
        }

        connection.on("open", () => readchunk());

        connection.on("data", data => {
            uploadPercent[fileName] = data;
            if (!localFiles[fileName]) {
                connection.close(); // TODO move this somewhere else
                delete uploadPercent[fileName];
            }
            this.forceUpdate();
        });
    }

    render() {
        return (
            <div className="App" style={{ height: window.innerHeight, flexDirection: (window.innerWidth > window.innerHeight) ? "row" : "column" }}>
                <div id="background">
                    <Waves />
                    <IconPattern
                        icons={[faSatellite, faSatelliteDish, faMobileAlt, faWifi, faPaperPlane, faBroadcastTower, faGlobeAmericas, faUser, faDesktop, faTabletAlt, faFileAlt, faFileAudio, faFileVideo, faFileImage, faFileArchive]}
                        num={5}
                        margin={50}
                        samples={20}
                        color={"#2E3440"}
                        iconSize={50}
                        width={window.innerWidth}
                        height={window.innerHeight * 0.5}
                    />
                </div>
                <div id="panel">
                    <FileList files={this.state.localFilesInfo} percent={uploadPercent} removeAction={this.removeFile} />
                    <br /><br />
                    <span id="id" className="item-title">Share files</span>
                    <input type="file" multiple onChange={this.fileHandler} id="upload-button" style={{ position: "absolute", display: "none" }} />
                    <label htmlFor="upload-button" className="big-icon-button" style={{ width: 41, height: 41 }}>
                        <FontAwesomeIcon icon={faFileUpload} />
                    </label>
                </div>
                {this.state.connected ?
                    <div id="panel">
                        <span id="id" className="item-title">Download files</span>
                        {Object.keys(this.state.peerFilesInfo).length ?
                            <FileList files={this.state.peerFilesInfo} percent={downloadPercent} clickAction={(name) => msgConnection.send("DOWNLOAD:" + name)} /> :
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: 0.5 }}>
                                <br />
                                <span style={{ maxWidth: "75%" }}>Waiting for peer to share files...</span>
                            </div>
                        }
                    </div> :
                    <ConnectionPannel id={this.props.id} icon={faArrowRight} action={this.connect} />
                }
            </div>
        );
    }
}