import React, { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import peer from "../service/peer";
import { useSocket } from "../context/SocketProvider";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";



const RoomPage = () => {
  const socket = useSocket();
  const navigate = useNavigate();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [isCallActive, setIsCallActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const startSpeechRecognition = useCallback(() => {
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true });
    }
  }, [listening]);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
    setIsCallActive(true);
    startSpeechRecognition();
  }, [remoteSocketId, socket, startSpeechRecognition]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
      setIsCallActive(true);
      startSpeechRecognition();
    },
    [socket, startSpeechRecognition]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
      setIsCallActive(true);
      startSpeechRecognition();
    },
    [sendStreams, startSpeechRecognition]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    socket.on("chat:message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    socket.on("transcript:update", (data) => {
      resetTranscript();
      SpeechRecognition.applyTranscript(data.transcript);
    });

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
      socket.off("chat:message");
      socket.off("transcript:update");
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
    resetTranscript,
  ]);

  const endStream = useCallback(() => {
    if (myStream) {
      myStream.getTracks().forEach((track) => {
        track.stop();
      });
      setMyStream(null);
    }

    if (peer.peer) {
      peer.peer.close();
    }

    SpeechRecognition.stopListening();
    setIsCallActive(false);

    navigate("/");
  }, [myStream, navigate]);

  const toggleListening = useCallback(() => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  }, [listening]);

  useEffect(() => {
    if (isCallActive) {
      startSpeechRecognition();
    }
  }, [isCallActive, startSpeechRecognition]);

  useEffect(() => {
    if (transcript) {
      socket.emit("transcript:update", { transcript });
    }
  }, [socket, transcript]);

  const sendMessage = useCallback(() => {
    if (inputMessage.trim()) {
      socket.emit("chat:message", { message: inputMessage });
      setInputMessage("");
    }
  }, [socket, inputMessage]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-300 to-orange-300 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-center text-yellow-500 mb-4">
          Room Page
        </h1>
        <h4 className="text-lg text-center text-gray-700 mb-6">
          {remoteSocketId
            ? "Connected to the room"
            : "Waiting for others to join..."}
        </h4>
        <div className="flex flex-col space-y-4 items-center">
          {myStream && (
            <button
              onClick={sendStreams}
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Send Stream
            </button>
          )}
          {remoteSocketId && !isCallActive && (
            <button
              onClick={handleCallUser}
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              CALL
            </button>
          )}
          <div className="flex justify-between w-full">
            {myStream && (
              <div className="w-1/2 pr-2">
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                  My Stream
                </h1>
                <ReactPlayer
                  playing
                  muted
                  height="200px"
                  width="100%"
                  className="rounded-lg border border-gray-300 shadow-sm"
                  url={myStream}
                />
              </div>
            )}
            {remoteStream && (
              <div className="w-1/2 pl-2">
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                  Remote Stream
                </h1>
                <ReactPlayer
                  playing
                  muted
                  height="200px"
                  width="100%"
                  className="rounded-lg border border-gray-300 shadow-sm"
                  url={remoteStream}
                />
              </div>
            )}
          </div>
          {myStream && (
            <button
              onClick={endStream}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out mt-4"
            >
              End Stream
            </button>
          )}
          
          {/* Shared Transcript */}
          <div className="mt-8 w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Shared Transcript</h2>
            <div className="border p-4 rounded-lg bg-gray-100 shadow-sm min-h-[100px] w-full mb-4">
              <p className="text-gray-700">{transcript || "No speech detected."}</p>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={toggleListening}
                className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out`}
              >
                {listening ? 'Pause Listening' : 'Resume Listening'}
              </button>
              <button
                onClick={resetTranscript}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                Reset Transcript
              </button>
            </div>
          </div>

          {/* Chat Feature */}
          <div className="mt-8 w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Chat</h2>
            <div className="border p-4 rounded-lg bg-gray-100 shadow-sm h-[200px] w-full mb-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <p key={index} className="text-gray-700">{`${msg.sender}: ${msg.message}`}</p>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-grow border rounded-l-md p-2"
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;