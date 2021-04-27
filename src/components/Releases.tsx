import React, { useContext } from "react";
import { ReleaseContext } from "../contexts/release-context";
import Release from "./Release";
import { useContextuallyPaginatedReleases } from "../hooks";
import PaginationController from "./PaginationController";

export default function Releases() {
    const { releases, total, ...paginationAPI } = useContextuallyPaginatedReleases();

    return (
        <div className="container releases-container">
            <div className="container-header">
                <div className="container-header-left">Versions</div>
                <div className="container-header-right">{total} listed build{releases.length === 1 ? "" : "s"}</div>
            </div>
            <div className="container-body">
                <PaginationController api={paginationAPI} />
                <table>
                    <thead>
                        <tr>
                            <th>Build Number</th>
                            <th>Type</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {releases.map((release) => (
                            <Release key={release.id} {...release} />
                        ))}
                    </tbody>
                </table>
                <div className="container-footer">
                    <PaginationController api={paginationAPI} />
                </div>
            </div>
        </div>
    );
}