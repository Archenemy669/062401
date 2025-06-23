// src/App.js
import React, { useState } from "react";
import SearchPage from "./SearchPage";
import ChatRoom from "./ChatRoom";

function App() {
  const [authed, setAuthed] = useState(false);

  return authed ? <ChatRoom /> : <SearchPage onSuccess={() => setAuthed(true)} />;
}

export default App;