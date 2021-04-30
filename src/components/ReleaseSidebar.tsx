import React, { useContext } from "react";
import { ReleaseContext } from "../contexts/release-context";
import { BuildType, JenkinsRelease, getReleaseDownloadURL, useLatestReleasesOfEachBuldType } from "../hooks";

function LatestReleaseItem({ release, type }: { release: JenkinsRelease, type: BuildType }) {
    const description = BuildType.describeBuildType(type);
    const className = BuildType.classNameForBuildType(type);

    return (
        <li className="list-group-item">
            <h6 className="m-0"><a className={`link-${className}`} href={getReleaseDownloadURL(release)}>{description} #{release.number}</a></h6>
        </li>
    );
}

export default function ReleaseSidebar() {
    const { releases } = useContext(ReleaseContext);
    const latestReleases = useLatestReleasesOfEachBuldType(releases);

    return (
        <div className="col-3 p-0">
            <div className="card text-white">
                <div className="card-body">
                    <h5 className="card-title m-0">Latest Downloads</h5>
                </div>
                <ul className="list-group list-group-flush">
                    {(Object.entries(latestReleases) as unknown as [BuildType, JenkinsRelease][]).map(([ type, release ]) => (
                        <LatestReleaseItem key={type} release={release} type={type} />
                    ))}
                </ul>
            </div>
        </div>
    );
}