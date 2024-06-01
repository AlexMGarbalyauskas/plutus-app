import { useState } from "react";
import "./App.css";
import React from "react";
import Register from "./pages/user/Register";
import Swap from "./pages/Swap";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>

<div className="App">
      <Header connect={connect} isConnected={isConnected} address={address} />
      <div className="mainWindow">
        <Routes>
          <Route path="/" element={<Swap isConnected={isConnected} address={address} />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </div>

    </div>
    </>
  );
}

export default App;
