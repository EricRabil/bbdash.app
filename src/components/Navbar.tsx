import React, { PropsWithChildren } from "react";
import { Link, NavLink } from "react-router-dom";

function BBLink({ to, children }: PropsWithChildren<{ to: string }>) {
    return (
        <li className="nav-item">
            <a href={to} className="nav-link">{children}</a>
        </li>
    );
}

function BBNavLink({ to, children }: PropsWithChildren<{ to: string }>) {
    return (
        <li className="nav-item">
            <NavLink to={to} activeClassName="active" className="nav-link">{children}</NavLink>
        </li>
    );
}

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg border-bottom mb-3">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <span className="fs-5">BBDash</span>
                </Link>
                <div>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <BBNavLink to="/downloads">Downloads</BBNavLink>
                            <BBLink to="https://github.com/EricRabil/BBDash">GitHub</BBLink>
                            <BBLink to="https://discord.gg/mf2UrHFvRb">Discord</BBLink>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}