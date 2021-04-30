import React, { PropsWithChildren, useState, createRef, useRef, useLayoutEffect } from "react";
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

function absoluteHeight(element: HTMLElement): number {
    const style = window.getComputedStyle(element);

    let height = 0;
    height += element.offsetHeight;
    height += parseFloat(style.marginTop);
    height += parseFloat(style.marginBottom);

    console.log(height);

    return height;
}

export default function Navbar() {
    const [ collapsing, setIsCollapsing ] = useState(false);
    const [ showing, setIsShowing ] = useState(false);
    const ulRef = useRef<HTMLElement>();

    const [ ulHeight, setUlHeight ] = useState(0);

    useLayoutEffect(() => {
        setUlHeight(absoluteHeight(ulRef.current!));
    }, [ showing, collapsing ]);

    return (
        <nav className="navbar navbar-light navbar-expand-lg border-bottom mb-3">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <span className="fs-5">BBDash</span>
                </Link>
                <button onClick={() => {
                    const nextShowing = !showing;
                    setIsShowing(nextShowing);
                    setIsCollapsing(nextShowing ? true : false);
                }} className="navbar-toggler" type="button">
                    <span className="navbar-toggler-icon" />
                </button>
                <div onTransitionEnd={() => {
                    setIsCollapsing(false);
                }} className={`${collapsing ? "collapsing" : "collapse"}${collapsing ? "" : showing ? " show" : ""} navbar-collapse`} style={{
                    height: (collapsing && showing) ? `${ulHeight}px` : undefined
                }}>
                    <ul ref={el => {
                        if (el) ulRef.current = el;
                    }} className="navbar-nav me-auto mb-2 mb-lg-0">
                        <BBNavLink to="/downloads">Downloads</BBNavLink>
                        <BBLink to="https://github.com/EricRabil/BBDash">GitHub</BBLink>
                        <BBLink to="https://discord.gg/mf2UrHFvRb">Discord</BBLink>
                    </ul>
                </div>
            </div>
        </nav>
    );
}