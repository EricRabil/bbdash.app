import React from "react";
import { GithubRelease } from "../hooks/useReleases";
import downloadPng from "../assets/download.png";
import { useBuildNumber, getReleaseDownloadURL, buildTypeForRelease, BuildType } from "../hooks";

export default function Release(release: GithubRelease) {
    const buildNumber = useBuildNumber(release);
    const downloadURL = getReleaseDownloadURL(release);
    const buildTypeDescription = BuildType.describeBuildType(buildTypeForRelease(release));

    return (
        <tr>
            <th><a href={downloadURL}>#{buildNumber}</a></th>
            <td>{buildTypeDescription}</td>
            <td>
                <a href={downloadURL}>
                    <img src={downloadPng} />
                </a>
            </td>
        </tr>
    );
}