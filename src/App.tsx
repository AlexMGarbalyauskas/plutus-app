import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <Link to="/user/register">
        <button>Register</button>
      </Link>
    </>
  );
}

export default App;
