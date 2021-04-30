import React from "react";
import { ReleaseProvider } from "../contexts/release-context";
import Releases from "../components/Releases";
import ReleaseSidebar from "../components/ReleaseSidebar";

export default function ReleasesView() {
    return (
        <div className="row">
            <ReleaseProvider>
                <Releases />
                <ReleaseSidebar />
            </ReleaseProvider>
        </div>
    );
}