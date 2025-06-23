// src/ChatRoom.js
import React, { useEffect, useRef, useState } from "react";
import { animeNames } from "./animeNames";

const WS_URL = "wss://ws.postman-echo.com/raw"; // 公共WebSocket echo服务

function getRandomName() {
  return animeNames[Math.floor(Math.random() * animeNames.length)];
}

function ChatRoom() {
  const [name] = useState(getRandomName());
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    ws.current = new window.WebSocket(WS_URL);

    ws.current.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        setMessages((prev) => [...prev, data]);
      } catch {
        // 兼容echo服务直接返回字符串
        setMessages((prev) => [...prev, { name: "系统", text: e.data }]);
      }
    };

    return () => ws.current && ws.current.close();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMsg = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    const data = { name, text: msg };
    ws.current.send(JSON.stringify(data));
    setMsg("");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ marginTop: 30, fontSize: 24 }}>聊天室（你的昵称：<b>{name}</b>）</div>
      <div style={{ width: 400, height: 400, background: "#fff", marginTop: 20, borderRadius: 10, boxShadow: "0 2px 8px #ccc", overflowY: "auto", padding: 20 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ margin: "8px 0", color: m.name === name ? "#4285f4" : "#333" }}>
            <b>{m.name}：</b>{m.text}
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>
      <form onSubmit={sendMsg} style={{ display: "flex", marginTop: 20 }}>
        <input
          value={msg}
          onChange={e => setMsg(e.target.value)}
          placeholder="输入聊天内容"
          style={{ width: 300, height: 40, borderRadius: 20, border: "1px solid #ccc", padding: "0 20px", fontSize: 16 }}
        />
        <button type="submit" style={{ marginLeft: 10, width: 80, height: 40, borderRadius: 20, background: "#4285f4", color: "#fff", border: "none", fontSize: 16 }}>发送</button>
      </form>
    </div>
  );
}

export default ChatRoom;