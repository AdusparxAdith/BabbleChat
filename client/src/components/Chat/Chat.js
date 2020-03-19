import React, { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");
socket.emit("new-user", "Amar");

export default function Chat() {
  const appendMessage = message => {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = message;
    document.getElementById("chat-container").append(messageElement);
  };

  const ping = () => {
    socket.on("chat-message", data => {
      appendMessage(data);
    });
  };

  const submit = () => {
    socket.emit("send-message", document.getElementById("text-message").value);
    document.getElementById("text-message").value = "";
  };
  useEffect(() => {
    ping();
  }, []);
  return (
    <div>
      <div id="chat-container"></div>
      <input type="text" id="text-message" placeholder="message" />
      <button onClick={() => submit()}>Send</button>
    </div>
  );
}
