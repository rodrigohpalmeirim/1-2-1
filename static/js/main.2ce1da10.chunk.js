(this["webpackJsonp1-2-1"]=this["webpackJsonp1-2-1"]||[]).push([[0],{16:function(e,t,n){e.exports=n(30)},21:function(e,t,n){},22:function(e,t,n){},23:function(e,t,n){},24:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=24},30:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(13),r=n.n(o),s=(n(21),n(9)),c=n(5),l=n(6),d=n(3),u=n(8),h=n(7),p=(n(22),n(23),n(14)),m=n.n(p);function v(){return i.a.createElement("div",{className:"spinner"},i.a.createElement("div",{className:"cube1"}),i.a.createElement("div",{className:"cube2"}))}var g=n(4),b=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).icons=a.props.icons.sort((function(){return.5-Math.random()})).slice(0,a.props.num||a.props.icons.length),a.posLeft=Array.from(Array(a.props.num||a.props.icons.length)).map((function(){return Math.random()*(window.innerWidth-4*a.props.iconSize)+2*a.props.iconSize})),a.posTop=Array.from(Array(a.props.num||a.props.icons.length)).map((function(){return Math.random()*(window.innerHeight-4*a.props.iconSize)+2*a.props.iconSize})),a}return Object(l.a)(n,[{key:"render",value:function(){var e=this;return i.a.createElement("div",{style:{position:"absolute",width:"100%",height:"100%"}}," ",Object.keys(this.icons).map((function(t){return i.a.createElement(g.a,{key:t,icon:e.icons[t],style:{position:"absolute",left:e.posLeft[t],top:e.posTop[t],color:e.props.color,fontSize:e.props.iconSize}})}))," ")}}]),n}(a.Component);b.defaultProps={color:"white",iconSize:20};var f=n(2),y=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).state={value:""},a}return Object(l.a)(n,[{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"action-input",style:{width:this.props.width}},i.a.createElement("input",{placeholder:this.props.placeholder,maxLength:this.props.maxLength,style:{width:this.props.width-this.props.height-this.props.height/2,height:this.props.height/2,padding:this.props.height/4,fontSize:.44*this.props.height},onChange:function(t){e.setState({value:t.target.value})},onKeyPress:function(t){"Enter"===t.key&&e.state.value&&e.props.action(e.state.value)},autoFocus:this.props.autoFocus}),i.a.createElement("button",{onClick:function(){e.state.value&&e.props.action(e.state.value)},style:{width:this.props.height,height:this.props.height,padding:this.props.height/4,fontSize:.44*this.props.height}},i.a.createElement(g.a,{icon:this.props.icon})))}}]),n}(a.Component);function w(e){return e.active?i.a.createElement("button",{className:"icon-button",onClick:e.onToggle,style:{backgroundColor:e.activeColor}},i.a.createElement(g.a,{icon:e.activeIcon})):i.a.createElement("button",{className:"icon-button",onClick:e.onToggle,style:{backgroundColor:e.inactiveColor||"#BF616A"}},i.a.createElement(g.a,{icon:e.inactiveIcon||e.activeIcon}))}y.defaultProps={width:250,height:41,placeholder:"",autoFocus:!1,maxLength:524288};var k=n(15),E=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).grabHandler=a.grabHandler.bind(Object(d.a)(a)),a.updatePos=a.updatePos.bind(Object(d.a)(a)),a.releaseHandler=a.releaseHandler.bind(Object(d.a)(a)),a.move=a.move.bind(Object(d.a)(a)),a.state={x:a.props.x||0,y:a.props.y||0},a.targetPos={x:a.props.x||0,y:a.props.x||0},a.offset={x:0,y:0},a.dragging=!1,a.interval=null,document.addEventListener("mouseup",a.releaseHandler),document.addEventListener("touchend",a.releaseHandler),a}return Object(l.a)(n,[{key:"componentDidUpdate",value:function(e){(this.props.x&&e.x!==this.props.x||this.props.y&&e.y!==this.props.y)&&(this.targetPos={x:this.props.x||0,y:this.props.y||0},this.move())}},{key:"grabHandler",value:function(e){try{e=e.touches[0]}catch(t){}this.props.disabled||(this.dragging=!0,this.offset={x:e.screenX-this.state.x,y:e.screenY-this.state.y},this.updatePos(e),document.addEventListener("mousemove",this.updatePos),document.addEventListener("touchmove",this.updatePos),this.move())}},{key:"updatePos",value:function(e){try{e=e.touches[0]}catch(t){}this.targetPos={x:e.screenX,y:e.screenY}}},{key:"releaseHandler",value:function(){if(document.removeEventListener("mousemove",this.updatePos),document.removeEventListener("touchmove",this.updatePos),this.dragging=!1,this.props.snap){var e,t=void 0,n=1/0,a=Object(k.a)(this.props.snap);try{for(a.s();!(e=a.n()).done;){var i=e.value,o=Math.sqrt(Math.pow(this.state.x-i[0],2)+Math.pow(this.state.y-i[1],2));o<n&&(t={x:i[0],y:i[1]},n=o)}}catch(r){a.e(r)}finally{a.f()}this.offset={x:0,y:0},this.targetPos=t}}},{key:"move",value:function(){var e=this,t={x:0,y:0};clearInterval(this.interval),this.interval=setInterval((function(){var n={x:(e.targetPos.x-(e.state.x+e.offset.x))*e.props.acceleration,y:(e.targetPos.y-(e.state.y+e.offset.y))*e.props.acceleration};t={x:(t.x+n.x)*e.props.springyness,y:(t.y+n.y)*e.props.springyness},e.setState({x:e.state.x+t.x,y:e.state.y+t.y}),!e.dragging&&Math.pow(t.x,2)+Math.pow(t.y,2)<.01&&Math.pow(n.x,2)+Math.pow(n.y,2)<.01&&clearInterval(e.interval)}),20)}},{key:"render",value:function(){return i.a.createElement("div",{style:Object(s.a)(Object(s.a)({},{position:"absolute",left:this.state.x,top:this.state.y}),this.props.style),onMouseDown:this.grabHandler,onTouchStart:this.grabHandler},this.props.children)}}]),n}(a.Component);E.defaultProps={x:0,y:0,acceleration:.2,springyness:.7,disabled:!1,style:{}};var x,j,O,S,C,H,z={},I={},M={x:0,y:0},T=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).getId=a.getId.bind(Object(d.a)(a)),a.call=a.call.bind(Object(d.a)(a)),a.accept=a.accept.bind(Object(d.a)(a)),a.reject=a.reject.bind(Object(d.a)(a)),a.startCall=a.startCall.bind(Object(d.a)(a)),a.endCall=a.endCall.bind(Object(d.a)(a)),a.initConnection=a.initConnection.bind(Object(d.a)(a)),a.cameraResizeHandler=a.cameraResizeHandler.bind(Object(d.a)(a)),a.state={username:"",id:"",ringing:!1,trayHidden:!1,call:!1,audio:!0,video:!0,screenShare:!1,pinned:null},a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;function t(e){var t=document.getElementById("camera");t.srcObject=e,t.onloadedmetadata=function(){t.play()},x=e,t.onresize=this.cameraResizeHandler}window.addEventListener("resize",(function(){e.optimizeSize(),e.forceUpdate(),e.cameraResizeHandler()})),t=t.bind(this),navigator.mediaDevices.getUserMedia({audio:!0,video:!0}).then(t),this.getId()}},{key:"cameraResizeHandler",value:function(){var e=document.getElementById("camera");this.setState({cameraWidth:e.clientWidth,cameraHeight:e.clientHeight}),M={x:e.getBoundingClientRect().x,y:e.getBoundingClientRect().y}}},{key:"isMobile",value:function(){var e,t=!1;return e=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0),t}},{key:"getId",value:function(){var e=this;(j=new m.a(null,{host:"peerjs-server.ddns.net",port:"9000"})).on("open",(function(t){e.setState({id:t})})),j.on("call",(function(t){O=t.metadata.username,S=t,z[t.metadata.id]?e.accept():e.setState({ringing:!0})})),j.on("connection",(function(t){z[t.peer]&&(z[t.peer].data=t,t.on("open",(function(){t.on("data",(function(n){return e.receiveMessageHandler(t.peer,n)}))})))}))}},{key:"call",value:function(e){var t=j.call(e,x,{metadata:{id:this.state.id,username:this.state.username}});z[e]||(z[e]={media:{},data:null}),z[e].media[t.connectionId]=t,this.startCall()}},{key:"accept",value:function(){var e=this;S.answer(x);var t=S.metadata.id,n=j.connect(t);n.on("open",(function(){n.on("data",(function(t){return e.receiveMessageHandler(n.peer,t)}))})),z[t]||(z[t]={media:{},data:n}),z[t].media[S.connectionId]=S,this.startCall(),this.setState({ringing:!1})}},{key:"reject",value:function(){S.close(),this.setState({ringing:!1})}},{key:"startCall",value:function(){var e=this;this.setState({call:!0}),setTimeout(this.cameraResizeHandler,1),this.isMobile()&&document.querySelector(".App").requestFullscreen();var t=setTimeout((function(){e.setState({trayHidden:!0})}),2e3);function n(){var e=this;clearTimeout(t),this.setState({trayHidden:!1}),t=setTimeout((function(){e.setState({trayHidden:!0})}),2e3)}n=n.bind(this),document.addEventListener("mousemove",n),document.addEventListener("click",n),document.addEventListener("touchstart",n)}},{key:"receiveMessageHandler",value:function(e,t){if("DISCONNECT"===t)this.disconnectFromPeer(e);else if("CLOSE"===t.split(" ")[0]){var n=t.split(" ")[1];z[e].media[n]&&(z[e].media[n].close(),delete z[e].media[n],this.forceUpdate())}}},{key:"disconnectFromPeer",value:function(e){try{for(var t in z[e].media)z[e].media[t].close();z[e].data.close(),delete z[e]}catch(n){}0===Object.keys(z).length&&this.endCall()}},{key:"endCall",value:function(){for(var e in this.state.screenShare&&this.endCapture(),this.setState({call:!1}),document.fullscreen&&this.isMobile()&&document.exitFullscreen(),z)try{for(var t in z[e].data.send("DISCONNECT"),z[e].media)z[e].media[t].close();delete z[e]}catch(n){}}},{key:"initConnection",value:function(e){var t=this,n=e.connectionId;e.on("stream",(function(e){var a=document.getElementById(n);a.srcObject=e,a.onloadedmetadata=function(){a.play(),I[n]=e.getVideoTracks()[0].getSettings().aspectRatio,t.optimizeSize()},a.onresize=function(){I[n]=e.getVideoTracks()[0].getSettings().aspectRatio,t.optimizeSize()}})),e.on("close",(function(){delete I[n],t.optimizeSize()}))}},{key:"startCapture",value:function(e){var t=this;this.setState({screenShare:!0}),navigator.mediaDevices.getDisplayMedia(e).then((function(e){for(var n in H=e,z)C=j.call(n,e,{metadata:{id:t.state.id,username:t.state.username+"'s screenshare"}});e.getVideoTracks()[0].onended=function(){return t.endCapture()}})).catch((function(e){t.setState({screenShare:!1})}))}},{key:"endCapture",value:function(){this.setState({screenShare:!1});try{C.close(),H.getTracks().forEach((function(e){return e.stop()}))}catch(t){}for(var e in z)z[e].data.send("CLOSE "+C.connectionId)}},{key:"optimizeSize",value:function(){for(var e=0,t=window.innerHeight,n=1;n<=Object.values(I).length;n++){for(var a=0,i=window.innerHeight,o=1;o<=Object.values(I).length;){for(var r=0,s=o;s<o+n&&s<=Object.values(I).length;s++)r+=Object.values(I)[s-1];i=Math.min(i,window.innerHeight/Math.ceil(Object.values(I).length/n),window.innerWidth/r),a+=Math.pow(i,2)*r,o=s}a>e&&(e=a,t=i)}this.setState({rowHeight:t-10})}},{key:"pin",value:function(e){!this.state.pinned&&Object.keys(I).length>1?this.setState({pinned:e}):this.setState({pinned:null})}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"App",style:{height:window.innerHeight,flexDirection:window.innerWidth>window.innerHeight?"row":"column"}},i.a.createElement(b,{icons:[f.n,f.o,f.j,f.c,f.l,f.u,f.k,f.b,f.h,f.f,f.r,f.t,f.e,f.q,f.d,f.p],color:"#3B4252",iconSize:50}),i.a.createElement(E,{disabled:!this.state.call,x:this.state.call?window.innerWidth-this.state.cameraWidth-20:M.x,y:this.state.call?window.innerHeight-this.state.cameraHeight-20:M.y,style:Object(s.a)(Object(s.a)({},this.state.call?{}:{position:"initial"}),{zIndex:2}),snap:[[20,20],[20,window.innerHeight-this.state.cameraHeight-20],[window.innerWidth-this.state.cameraWidth-20,20],[window.innerWidth-this.state.cameraWidth-20,window.innerHeight-this.state.cameraHeight-20]]},i.a.createElement("video",{id:"camera",muted:!0,style:this.state.call?{right:.02*window.innerHeight,bottom:.02*window.innerHeight,maxHeight:.3*window.innerHeight,maxWidth:.3*window.innerWidth}:{}})),i.a.createElement("div",{className:"spacer"}),!this.state.call&&i.a.createElement("div",{id:"panel"},this.state.username?this.state.id?i.a.createElement("div",null,i.a.createElement("p",{id:"id"},"Your ID: ",i.a.createElement("span",{className:"clickable-text",onClick:function(e){navigator.clipboard.writeText(e.target.textContent)}},this.state.id)),i.a.createElement("br",null),i.a.createElement(y,{placeholder:"Enter peer ID",icon:f.l,autoFocus:!0,action:this.call})):i.a.createElement(v,null):i.a.createElement("div",null,i.a.createElement(y,{placeholder:"Enter your name",maxLength:40,icon:f.a,autoFocus:!0,action:function(t){e.setState({username:t})}}))),this.state.call&&i.a.createElement("div",{id:"call"},Object.keys(z).map((function(t){return Object.values(z[t].media).map((function(t){var n=t.connectionId;return e.initConnection(t),i.a.createElement("video",{className:"incoming-video",key:n,id:n,onClick:function(){return e.pin(n)},style:e.state.pinned===n||1===Object.keys(I).length?{position:"absolute",width:"100%",height:"100%",borderRadius:0,zIndex:1,cursor:1===Object.keys(I).length?"auto":"pointer"}:{height:e.state.rowHeight,margin:5}})}))})),i.a.createElement("div",{id:"button-tray",style:this.state.trayHidden?{bottom:"-5%",opacity:0}:{}},!this.isMobile()&&Object.keys(I).length>0&&i.a.createElement(w,{active:this.state.screenShare,activeIcon:f.d,onToggle:function(){e.state.screenShare?e.endCapture():e.startCapture()}}),i.a.createElement(w,{active:this.state.video,activeIcon:f.r,inactiveIcon:f.s,onToggle:function(){e.setState({video:!e.state.video}),x.getVideoTracks()[0].enabled=!x.getVideoTracks()[0].enabled}}),i.a.createElement(w,{active:this.state.audio,activeIcon:f.g,inactiveIcon:f.i,onToggle:function(){e.setState({audio:!e.state.audio}),x.getAudioTracks()[0].enabled=!x.getAudioTracks()[0].enabled}}),i.a.createElement("button",{className:"icon-button",onClick:function(){return e.endCall()},style:{backgroundColor:"#BF616A"}},i.a.createElement(g.a,{icon:f.m})))),this.state.ringing&&i.a.createElement("div",{className:"popup"},i.a.createElement("p",{style:{margin:10}},O," is calling you"),i.a.createElement("button",{className:"icon-button",onClick:function(){return e.reject()},style:{backgroundColor:"#BF616A"}},i.a.createElement(g.a,{icon:f.m})),i.a.createElement("button",{className:"icon-button",onClick:function(){return e.accept()},style:{backgroundColor:"#A3BE8C"}},i.a.createElement(g.a,{icon:f.l}))))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(T,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[16,1,2]]]);
//# sourceMappingURL=main.2ce1da10.chunk.js.map