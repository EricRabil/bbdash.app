import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-content">
                <Link to="/" className="navbar-brand">BBDash</Link>
                <Link to="/downloads">Downloads</Link>
            </div>
        </div>
    );
}