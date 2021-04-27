import React, { useContext } from "react";
import { ReleaseContext } from "../contexts/release-context";
import { BuildType, GithubRelease, useBuildNumber, getReleaseDownloadURL, useLatestReleasesOfEachBuldType } from "../hooks";

function LatestReleaseItem({ release, type }: { release: GithubRelease, type: BuildType }) {
    const description = BuildType.describeBuildType(type);
    const version = useBuildNumber(release);

    return (
        <a href={getReleaseDownloadURL(release)} className="latest-release-item" attr-release-type={type}>
            <div className="release-item-type">{description}</div>
            <span>{version}</span>
        </a>
    );
}

export default function ReleaseSidebar() {
    const { releases } = useContext(ReleaseContext);
    const latestReleases = useLatestReleasesOfEachBuldType(releases);

    return (
        <div className="container container-full">
            <div className="container-header">
                <div className="container-header-left">Latest Downloads</div>
            </div>

            <div className="container-body">
                {(Object.entries(latestReleases) as unknown as [BuildType, GithubRelease][]).map(([ type, release ]) => (
                    <LatestReleaseItem key={type} release={release} type={type} />
                ))}
            </div>
        </div>
    );
}