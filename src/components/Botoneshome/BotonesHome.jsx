
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function BotonesHome() {
  return (
    <div className="home-buttons">
      <Link to="/login">
        <Button variant="primary" size="lg">LOGIN</Button>
      </Link>
      <Link to="/signup">
        <Button variant="secondary" size="lg">SIGN UP</Button>
      </Link>
    </div>
  );
}

export default BotonesHome;