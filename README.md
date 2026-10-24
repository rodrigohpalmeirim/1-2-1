# 1-2-1

A browser app for peer-to-peer video calls and file transfers. Media and files travel directly between the two browsers over WebRTC; a server is only used to help the peers find each other. Built in 2020.

**Try it: [rodrigohpalmeirim.github.io/1-2-1](https://rodrigohpalmeirim.github.io/1-2-1/)**

## Features

Each visitor gets a random ID (click it to copy). Share it with the other person, or paste theirs, to connect.

**Videocall**
- Enter your name and call a peer by ID; the callee gets an accept/reject prompt and a browser notification
- Toggle camera and microphone, share your screen (desktop only), end the call
- Incoming videos are tiled to use as much of the screen as possible; click one to pin it full-screen
- Draggable self-view that snaps to the screen corners; the control tray auto-hides
- Goes full-screen automatically on mobile

**File Transfer**
- Pick one or more files to share; the connected peer sees the list and clicks a file to download it
- Files are sent in 64 KB chunks, with progress shown on both sides

## Tech stack

React 16 (Create React App) with React Router, [PeerJS](https://peerjs.com/) for WebRTC connections, and Font Awesome icons. The app connects to a self-hosted PeerJS signalling server at `peerjs.rodlabs.dev` (set in `src/App.js`). Deployed to GitHub Pages with `gh-pages`.

## Run locally

```sh
git clone https://github.com/rodrigohpalmeirim/1-2-1.git
cd 1-2-1
npm install
npm start        # dev server on http://localhost:3000
npm run build    # production build in build/
npm run deploy   # publish build/ to GitHub Pages
```

The project uses `react-scripts` 3 (webpack 4). On Node.js 17 or newer, prefix the commands with `NODE_OPTIONS=--openssl-legacy-provider`.
