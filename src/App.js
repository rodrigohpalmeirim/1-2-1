import React, { Component } from "react";
import "./App.css";
import "./Spinner.css";
import Peer from "peerjs";
import { Spinner } from "./Spinner";
import { faArrowRight, faPhone, faPhoneSlash, faVideo, faVideoSlash, faMicrophone, faMicrophoneSlash, faDesktop } from "@fortawesome/free-solid-svg-icons"
import { ActionInput } from "./ActionInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToggleButton } from "./ToggleButton";
import { Draggable } from "./Draggable";

const videoMargin = 5;

var mediaStream;
var peer;
var activeConnections = {};
var caller;
var incomingMedia;
var captureConnection;
var captureStream;
var ratios = {};
var cameraPos = { x: 0, y: 0 };

export default class App extends Component {
  constructor(props) {
    super(props);

    this.getId = this.getId.bind(this);
    this.call = this.call.bind(this);
    this.accept = this.accept.bind(this);
    this.reject = this.reject.bind(this);
    this.startCall = this.startCall.bind(this);
    this.endCall = this.endCall.bind(this);
    this.initConnection = this.initConnection.bind(this);
    this.cameraResizeHandler = this.cameraResizeHandler.bind(this);

    this.state = {
      username: "",
      id: "",
      ringing: false,
      trayHidden: false,
      call: false,
      audio: true,
      video: true,
      screenShare: false,
      pinned: null,
    }
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.optimizeSize();
      this.forceUpdate();
      this.cameraResizeHandler();
    });

    videoMountedHandler = videoMountedHandler.bind(this);
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(videoMountedHandler);

    function videoMountedHandler(stream) {
      const video = document.getElementById("camera");
      video.srcObject = stream;
      video.onloadedmetadata = function () {
        video.play();
      };
      mediaStream = stream;
      video.onresize = this.cameraResizeHandler;
    }

    this.getId();
  }

  cameraResizeHandler() {
    const video = document.getElementById("camera");
    this.setState({
      cameraWidth: video.clientWidth,
      cameraHeight: video.clientHeight,
    });
    cameraPos = {
      x: video.getBoundingClientRect().x,
      y: video.getBoundingClientRect().y,
    }
  }

  isMobile() {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };

  getId() {
    peer = new Peer(null, {
      host: "peerjs-server.ddns.net",
      port: "9000"
    });

    peer.on("open", (id) => {
      this.setState({ id: id });
    });

    peer.on("call", (incoming) => {
      caller = incoming.metadata.username;
      incomingMedia = incoming;
      if (activeConnections[incoming.metadata.id])
        this.accept();
      else
        this.setState({ ringing: true });
    });

    peer.on("connection", (connection) => {
      if (activeConnections[connection.peer]) {
        activeConnections[connection.peer].data = connection;
        connection.on("open", () => {
          connection.on("data", (data) => this.receiveMessageHandler(connection.peer, data));
        });
      }
    });
  }

  call(id) {
    const mediaConnection = peer.call(id, mediaStream, { metadata: { id: this.state.id, username: this.state.username } });
    if (!activeConnections[id])
      activeConnections[id] = { media: {}, data: null };
    activeConnections[id].media[mediaConnection.connectionId] = mediaConnection;
    this.startCall();
  }

  accept() {
    incomingMedia.answer(mediaStream);
    const id = incomingMedia.metadata.id;
    const connection = peer.connect(id);
    connection.on("open", () => {
      connection.on("data", (data) => this.receiveMessageHandler(connection.peer, data));
    });
    if (!activeConnections[id])
      activeConnections[id] = { media: {}, data: connection };
    activeConnections[id].media[incomingMedia.connectionId] = incomingMedia;
    this.startCall();
    this.setState({ ringing: false });
  }

  reject() {
    incomingMedia.close();
    this.setState({ ringing: false });
  }

  startCall() {
    this.setState({ call: true });
    setTimeout(this.cameraResizeHandler, 1);
    if (this.isMobile()) document.querySelector(".App").requestFullscreen();

    var timeout = setTimeout(() => { this.setState({ trayHidden: true }) }, 2000);
    function showTray() {
      clearTimeout(timeout);
      this.setState({ trayHidden: false });
      timeout = setTimeout(() => { this.setState({ trayHidden: true }) }, 2000);
    }
    showTray = showTray.bind(this);
    document.addEventListener("mousemove", showTray);
    document.addEventListener("click", showTray);
    document.addEventListener("touchstart", showTray);
  }

  receiveMessageHandler(id, data) {
    /* console.log("Received data:", data); */
    if (data === "DISCONNECT") {
      this.disconnectFromPeer(id);
    } else if (data.split(" ")[0] === "CLOSE") {
      const connectionId = data.split(" ")[1];
      if (activeConnections[id].media[connectionId]) {
        activeConnections[id].media[connectionId].close();
        delete activeConnections[id].media[connectionId];
        this.forceUpdate();
      }
    }
  }

  disconnectFromPeer(id) {
    try {
      for (const connectionId in activeConnections[id].media)
        activeConnections[id].media[connectionId].close();
      activeConnections[id].data.close();
      delete activeConnections[id];
    } catch { }

    if (Object.keys(activeConnections).length === 0)
      this.endCall();
  }

  endCall() {
    if (this.state.screenShare) this.endCapture();
    this.setState({ call: false });
    if (document.fullscreen && this.isMobile()) document.exitFullscreen();

    for (const id in activeConnections) {
      try {
        activeConnections[id].data.send("DISCONNECT");
        for (const connectionId in activeConnections[id].media)
          activeConnections[id].media[connectionId].close();
        /* activeConnections[id].data.close(); */
        delete activeConnections[id];
      } catch { }
    }
  }

  initConnection(mediaConnection) {
    const connectionId = mediaConnection.connectionId;
    mediaConnection.on("stream", (stream) => {
      const video = document.getElementById(connectionId);
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
        ratios[connectionId] = stream.getVideoTracks()[0].getSettings().aspectRatio;
        this.optimizeSize();
      }
      video.onresize = () => {
        ratios[connectionId] = stream.getVideoTracks()[0].getSettings().aspectRatio;
        this.optimizeSize();
      }
    });

    mediaConnection.on("close", () => {
      delete ratios[connectionId];
      this.optimizeSize();
    });
  }

  startCapture(displayMediaOptions) {
    navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
      .then(stream => {
        captureStream = stream;
        for (const id in activeConnections)
          captureConnection = peer.call(id, stream, { metadata: { id: this.state.id, username: this.state.username + "'s screenshare" } });
        stream.getVideoTracks()[0].onended = () => this.setState({ screenShare: false });
      })
      .catch(err => { this.setState({ screenShare: false }) });
  }

  endCapture() {
    captureConnection.close();
    captureStream.getTracks().forEach(track => track.stop());

    for (const id in activeConnections)
      activeConnections[id].data.send("CLOSE " + captureConnection.connectionId);
  }

  optimizeSize() {
    var maxArea = 0;
    var optimizedHeight = window.innerHeight;
    for (var i = 1; i <= Object.values(ratios).length; i++) {
      var area = 0;
      var rowHeight = window.innerHeight;
      for (var j = 1; j <= Object.values(ratios).length;) {
        var rowRatio = 0;
        for (var k = j; k < j + i && k <= Object.values(ratios).length; k++) {
          rowRatio += Object.values(ratios)[k - 1];
        }
        rowHeight = Math.min(rowHeight, window.innerHeight / Math.ceil(Object.values(ratios).length / i), window.innerWidth / rowRatio);
        area += rowHeight ** 2 * rowRatio;
        j = k;
      }
      if (area > maxArea) {
        maxArea = area;
        optimizedHeight = rowHeight;
      }
    }
    this.setState({ rowHeight: optimizedHeight - 2 * videoMargin });
  }

  pin(id) {
    if (!this.state.pinned && Object.keys(ratios).length > 1) {
      this.setState({ pinned: id });
    } else {
      this.setState({ pinned: null });
    }
  }

  render() {
    return (
      <div className="App" style={{ height: window.innerHeight, flexDirection: (window.innerWidth > window.innerHeight) ? "row" : "column" }}>
        <Draggable
          disabled={!this.state.call}
          x={!this.state.call ? cameraPos.x : window.innerWidth - this.state.cameraWidth - 20}
          y={!this.state.call ? cameraPos.y : window.innerHeight - this.state.cameraHeight - 20}
          style={{ ...(this.state.call ? {} : { position: "initial" }), ...{ zIndex: 2 } }}
          snap={[
            [20, 20],
            [20, window.innerHeight - this.state.cameraHeight - 20],
            [window.innerWidth - this.state.cameraWidth - 20, 20],
            [window.innerWidth - this.state.cameraWidth - 20, window.innerHeight - this.state.cameraHeight - 20]
          ]}
        >
          <video id="camera" muted style={!this.state.call ? {} : { right: window.innerHeight * 0.02, bottom: window.innerHeight * 0.02, maxHeight: window.innerHeight * 0.3, maxWidth: window.innerWidth * 0.3 }} />
        </Draggable>
        <div className="spacer" />
        {!this.state.call &&
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
          </div>
        }
        {this.state.call && <div id="call">
          {Object.keys(activeConnections).map(id => {
            return Object.values(activeConnections[id].media).map(mediaConnection => {
              const connectionId = mediaConnection.connectionId;
              this.initConnection(mediaConnection);
              return <video className="incoming-video" key={connectionId} id={connectionId} onClick={() => this.pin(connectionId)}
                style={(this.state.pinned === connectionId || Object.keys(ratios).length === 1) ?
                  { position: "absolute", width: "100%", height: "100%", borderRadius: 0, zIndex: 1, cursor: Object.keys(ratios).length === 1 ? "auto" : "pointer" } :
                  { height: this.state.rowHeight, margin: videoMargin }}
              />;
            })
          })}
          <div id="button-tray" style={!this.state.trayHidden ? {} : { bottom: "-5%", opacity: 0 }}>
            {!this.isMobile() && Object.keys(ratios).length > 0 &&
              <ToggleButton active={this.state.screenShare} activeIcon={faDesktop} onToggle={() => {
                this.state.screenShare ? this.endCapture() : this.startCapture();
                this.setState({ screenShare: !this.state.screenShare });
              }} />
            }
            <ToggleButton active={this.state.video} activeIcon={faVideo} inactiveIcon={faVideoSlash} onToggle={() => {
              this.setState({ video: !this.state.video });
              mediaStream.getVideoTracks()[0].enabled = !mediaStream.getVideoTracks()[0].enabled;
            }} />
            <ToggleButton active={this.state.audio} activeIcon={faMicrophone} inactiveIcon={faMicrophoneSlash} onToggle={() => {
              this.setState({ audio: !this.state.audio });
              mediaStream.getAudioTracks()[0].enabled = !mediaStream.getAudioTracks()[0].enabled;
            }} />
            <button className="icon-button" onClick={() => this.endCall()} style={{ backgroundColor: "#BF616A" }}>
              <FontAwesomeIcon icon={faPhoneSlash} />
            </button>
          </div>
        </div>}
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