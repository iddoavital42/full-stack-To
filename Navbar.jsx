import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ currentPath, onNavigate }) => {
  return (
    <div className="Navbar">
      <h1>ToDolist</h1>
      <ul className="nav-menu">
        <li onClick={() => onNavigate("Home")}>
          <Link to="/">Home</Link>
          {currentPath === "Home" ? <hr /> : null}
        </li>
        <li onClick={() => onNavigate("Complete")}>
          <Link to="/complete">Complete</Link>
          {currentPath === "Complete" ? <hr /> : null}
        </li>
        <li onClick={() => onNavigate("InProgress")}>
          <Link to="/inprogress">In Progress</Link>
          {currentPath === "In Progress" ? <hr /> : null}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
