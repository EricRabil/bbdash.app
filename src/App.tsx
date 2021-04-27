import React from "react";
import Navbar from "./components/Navbar";
import Releases from "./components/Releases";
import ReleaseSidebar from "./components/ReleaseSidebar";
import { ReleaseProvider } from "./contexts/release-context";
import { Switch, Route } from "react-router-dom";

export default function App() {
    return (
        <div>
            <Navbar />
            <div className="main-content">
                <Switch>
                    <Route path="/downloads">
                        <div className="download-page-content">
                            <ReleaseProvider>
                                <Releases />
                                <ReleaseSidebar />
                            </ReleaseProvider>
                        </div>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}