import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <>
      <nav id="navbar-container">
        <Link className="links" to="/">
          Home
        </Link>

        <Link className="links" to="/posts">
          View all recipes
        </Link>

        <Link className="links" to="/add-recipe">
          Add your own recipe
        </Link>
      </nav>
    </>
  );
}
