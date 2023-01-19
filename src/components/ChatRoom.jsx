import React, { useEffect, useRef, useState } from "react";
import Moment from "react-moment";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
const ChatRoom = () => {
  const location = useLocation();
  const MessageBoxRef = useRef();

  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [socket, setSocket] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    setSocket(socket);
    socket.on("connect", () => {
      socket.emit("joinRoom", location.state.room);
      socket.on("latestMessages", (newMessages) => {
        setAllMessages([...allMessages, newMessages]);
        MessageBoxRef.current.scrollIntoView({ behaviour: "smooth" });
        setMessage("");
        setLoading(false);
      });
    });
  }, []);

  useEffect(() => {
    if (socket) {
      //   socket.on("latestMessages", (newMessages) => {
      //   setAllMessages([...allMessages, newMessages]);
      //   MessageBoxRef.current.scrollIntoView({ behaviour: "smooth" });
      //   setMessage("");
      //   setLoading(false);
      // });
    }
  }, [socket, allMessages]);

  useEffect(() => {
    setData(location.state);
  }, [location]);

  const handleMessage = (e) => setMessage(e.target.value);
  const handleKeyDown = (e) => (e.keyCode === 13 ? sendMessage() : "");
  const sendMessage = () => {
    if (message) {
      setLoading(true);
      const newMessages = { time: new Date(), message, name: data.name };
      socket.emit("newMessages", { newMessages, chatroom: data.chatroom });
    }
  };
  return (
    <div className="py-4 m-5 w-50 shadow bg-white text-dark border rounded container">
      <div className="text-center px-3 mb-4 text-capialize">
        <h1 className="text-info mb-4"> {data?.chatroom} Chat Room</h1>
      </div>
      <div
        className="bg-light border rounded p-3 mb-4"
        style={{ height: "450px", overflowY: "scroll" }}
      >
        {allMessages.map((msg, i) => {
          return data.name === msg.name ? (
            <div className="row justify-content-end pl-5" key={i}>
              <div
                className={`d-flex flex-column  m-2 shadow p-2 bg-info border rounded w-auto`}
              >
                <div>
                  <strong className="m-1">{msg.name}</strong>
                  <small className="text-muted">
                    <Moment fromNow>{msg.time}</Moment>
                  </small>
                </div>
                <h4 className="m-1">{msg.message}</h4>
              </div>
            </div>
          ) : (
            <div className="row justify-content-start pl-5" key={i}>
              <div
                className={`d-flex flex-column align-items-end m-2 shadow p-2 bg-light border rounded w-auto`}
              >
                <div>
                  <strong className="m-1">{msg.name}</strong>
                  <small className="text-muted">
                    <Moment fromNow>{msg.time}</Moment>
                  </small>
                </div>
                <h4 className="m-1">{msg.message}</h4>
              </div>
            </div>
          );
        })}
        <div ref={MessageBoxRef}></div>
      </div>
      <div className="form-group d-flex">
        <input
          type="text"
          className="form-control bg-light"
          name="message"
          onKeyDown={handleKeyDown}
          placeholder="Type your message"
          value={message}
          onChange={handleMessage}
        />
        <button
          type="button"
          className="btn btn-outline-dark mx-2"
          disabled={loading}
          onClick={sendMessage}
        >
          {loading ? (
            <div class="spinner-border spinner-border-sm text-primary"></div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-send"
              viewBox="0 0 16 16"
            >
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
