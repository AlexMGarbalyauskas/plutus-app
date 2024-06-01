import { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);



  return (
    <>
    <Link to="/user/pay"> 
      <button>User</button>
      <button>Seller</button>
    </Link>

      <Link to="/user/register">
        <button>Register</button>
      </Link>
    </>
  );
}

export default App;
