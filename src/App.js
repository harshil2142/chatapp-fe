import { Button } from "@chakra-ui/button"
import './App.css';
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import ChatProvider from "./Context/ChatProvider";

function App() {
  return (
    <div className="App">
    <ChatProvider>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/chats" element={<ChatPage/>}/>
    </Routes>
      </ChatProvider>
    </div>
  );
}

export default App;
