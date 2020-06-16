import React, { Component } from "react";
import "./App.css";
import "./Spinner.css";
import Peer from "peerjs";
import { Spinner } from "./Spinner";
import { faArrowRight, faPhone, faPhoneSlash } from '@fortawesome/free-solid-svg-icons'
import { ActionInput } from "./ActionInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

var mediaStream;
var peer;
var mediaConnections = [];
var caller;
var incomingCall;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.getId = this.getId.bind(this);
    this.call = this.call.bind(this);
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);

    this.state = {
      username: "",
      id: "",
      ringing: false,
      call: false,
    }
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then(function (stream) {
        var video = document.getElementById("camera");
        video.srcObject = stream;
        video.onloadedmetadata = function () {
          video.play();
        };
        mediaStream = stream;
      });

    this.getId();

    window.addEventListener("resize", () => this.forceUpdate());
  }

  getId() {
    peer = new Peer();

    peer.on("open", (id) => {
      this.setState({ id: id });
    });

    peer.on("call", (incoming) => {
      caller = incoming.metadata.username;
      incomingCall = incoming;
      this.setState({ ringing: true });
    });
  }

  call(id) {
    const mediaConnection = peer.call(id, mediaStream, { metadata: { username: this.state.username } });

    mediaConnections.push(mediaConnection);

    mediaConnection.on("stream", (stream) => {
      this.setState({ call: true });
      var video = document.getElementById("incoming-video");
      video.srcObject = stream;
      video.onloadedmetadata = (e) => {
        video.play();
      };
    });
  }

  accept() {
    incomingCall.answer(mediaStream);
    mediaConnections.push(incomingCall);
    this.setState({ call: true });
    incomingCall.on("stream", (stream) => {
      var video = document.getElementById("incoming-video");
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
      };
    });
    this.setState({ ringing: false });
  }

  reject() {
    incomingCall.close();
    this.setState({ ringing: false });
  }

  render() {
    return (
      <div className="App" style={{ height: window.innerHeight, flexDirection: (window.innerWidth > window.innerHeight) ? "row" : "column" }}>
        <video id="camera" muted style={!this.state.call ? {} : { position: "absolute", right: 20, bottom: 20, maxHeight: 300, maxWidth: 300 }} />
        <div className="spacer" />
        {!this.state.call ?
          <div id="panel">
            {!this.state.username ? <div>
              <ActionInput placeholder="Enter your name" maxLength={40} icon={faArrowRight} autoFocus={true} action={(name) => { this.setState({ username: name }) }} />
            </div> :
              !this.state.id ? <Spinner /> :
                <div>
                  <p id="id">Your ID: <span className="clickable-text" onClick={(event) => { navigator.clipboard.writeText(event.target.textContent) }}>{this.state.id}</span></p>
                  <br />
                  <ActionInput placeholder="Enter peer ID" icon={faPhone} autoFocus={true} action={this.call} />
                </div>
            }
            {/* <button onClick={this.getId}>Get ID</button> */}
          </div> :
          <video id="incoming-video" />
        }
        {this.state.ringing && <div className="popup">
          <p style={{ margin: 10 }}>{caller} is calling you</p>
          <button className="icon-button" onClick={() => this.reject()} style={{ backgroundColor: "#BF616A" }}>
            <FontAwesomeIcon icon={faPhoneSlash} />
          </button>
          <button className="icon-button" onClick={() => this.accept()} style={{ backgroundColor: "#A3BE8C" }}>
            <FontAwesomeIcon icon={faPhone} />
          </button>
        </div>}
      </div>
    );
  }
}