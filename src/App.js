import React, { Component } from "react";
import Peer from "peerjs";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import VideocallApp from "./VideocallApp";
import { IconPattern } from "./IconPattern";
import { faPhone, faVideo, faDesktop, faSatellite, faSatelliteDish, faMobileAlt, faComments, faWifi, faPaperPlane, faBroadcastTower, faMicrophoneAlt, faHeadphones, faVolumeUp, faGlobeAmericas, faUser, faTabletAlt, faFile, faFileAlt, faFileAudio, faFileVideo, faFileImage, faFileArchive } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileTransferApp from "./FileTransferApp";
import { Waves } from "./Waves";

var peer;

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
        }

        peer = new Peer(null, {
            host: "rod-peerjs-server.herokuapp.com",
            port: "443",
            secure: true,
        });
    }

    componentDidMount() {
        window.addEventListener("resize", () => this.forceUpdate());
        
        peer.on("open", (id) => {
            this.setState({ id: id });
        });
    }

    render() {
        return (
            <HashRouter basename='/'>
                <Switch>
                    <Route path="/videocall">
                        <VideocallApp peer={peer} id={this.state.id} />
                    </Route>
                    <Route path="/filetransfer">
                        <FileTransferApp peer={peer} id={this.state.id} />
                    </Route>
                    <Route path="/">
                        <div className="App" style={{ height: window.innerHeight, flexDirection: (window.innerWidth > window.innerHeight) ? "row" : "column" }}>
                            <div id="background">
                                <Waves />
                                <IconPattern
                                    icons={[faSatellite, faSatelliteDish, faMobileAlt, faComments, faPhone, faWifi, faPaperPlane, faBroadcastTower, faMicrophoneAlt, faHeadphones, faVideo, faVolumeUp, faGlobeAmericas, faUser, faDesktop, faTabletAlt, faFileAlt, faFileAudio, faFileVideo, faFileImage, faFileArchive]}
                                    num={5}
                                    margin={50}
                                    samples={20}
                                    color={"#2E3440"}
                                    iconSize={50}
                                    width={window.innerWidth}
                                    height={window.innerHeight * 0.5}
                                />
                            </div>
                            <Link className="card-link" to="/filetransfer" style={{ zIndex: 1 }}>
                                <div className="card">
                                    <h1>File Transfer</h1>
                                    <FontAwesomeIcon icon={faFile} />
                                </div>
                            </Link>
                            <Link className="card-link" to="/videocall" style={{ zIndex: 1 }}>
                                <div className="card">
                                    <h1>Videocall</h1>
                                    <FontAwesomeIcon icon={faVideo} />
                                </div>
                            </Link>
                        </div>
                    </Route>
                </Switch>
            </HashRouter>
        );
    }
}