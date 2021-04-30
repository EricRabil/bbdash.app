import React from "react";
import Release from "./Release";
import { useContextuallyPaginatedReleases } from "../hooks";
import PaginationController from "./PaginationController";

export default function Releases() {
    const { releases, ...paginationAPI } = useContextuallyPaginatedReleases();

    return (
        <div className="col-9">
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Build Number</th>
                            <th>Type</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {releases.map((release) => (
                            <Release key={release.number} {...release} />
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