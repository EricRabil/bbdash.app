import React from "react";
import Navbar from "./components/Navbar";
import ReleasesView from "./views/ReleasesView";
import HomeView from "./views/HomeView";
import { Switch, Route } from "react-router-dom";

export default function App() {
    return (
        <div className="container py-3">
            <Navbar />
            <div className="container container-fluid">
                <Switch>
                    <Route path="/downloads">
                        <ReleasesView />
                    </Route>
                    <Route>
                        <HomeView />
                    </Route>
                </Switch>
            </div>
            <footer className="footer mt-auto py-3">
                <div className="text-muted">
                    Copyright &copy; 2021 Eric Rabil, Matthew Blose Jacob Haupert, and Navin George.
                </div>
            </footer>
        </div>
    );
}