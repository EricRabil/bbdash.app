import React from "react";
import { JenkinsRelease } from "../hooks/useReleases";
import downloadPng from "../assets/download.png";
import { getReleaseDownloadURL, buildTypeForRelease, BuildType } from "../hooks";

export default function Release(release: JenkinsRelease) {
    const downloadURL = getReleaseDownloadURL(release);
    const buildType = buildTypeForRelease(release);
    const buildTypeDescription = BuildType.describeBuildType(buildType);

    return (
        <tr>
            <th><a href={downloadURL}>#{release.number}</a></th>
            <td className={`text-${BuildType.classNameForBuildType(buildType)}`}>{buildTypeDescription}</td>
            <td>
                <a href={downloadURL}>
                    <img src={downloadPng} />
                </a>
            </td>
        </tr>
    );
}