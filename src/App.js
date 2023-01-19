import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import MainForm from "./components/MainForm";



function App() {
  return (
    <div className="container-fluid bg-light text-dark d-flex align-items-center justify-content-center mt-5">
      <Router>
        <Routes>
          <Route index element={<MainForm></MainForm>}></Route>
          <Route path="/chat/:RoomName" element={<ChatRoom></ChatRoom>}></Route>
          <Route path="*" element={<h1>404 - Not Found</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
