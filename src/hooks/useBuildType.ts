import { useMemo } from "react";
import { JenkinsRelease } from "./useReleases";

export enum BuildType {
    development = "development",
    beta = "beta",
    stable = "stable"
}

/* eslint-disable */
export namespace BuildType {
    export function describeBuildType(type: BuildType): string {
        switch (type) {
        case BuildType.stable:
            return "Stable Build";
        case BuildType.beta:
            return "Beta Build";
        case BuildType.development:
        default:
            return "Development Build";
        }
    }

    export function classNameForBuildType(buildType: BuildType): string {
        switch (buildType) {
        case BuildType.development:
            return "danger";
        case BuildType.beta:
            return "warning";
        case BuildType.stable:
            return "success";
        }
    }
}
/* eslint-enable */

// eslint-disable-next-line
export function buildTypeForRelease(release: JenkinsRelease): BuildType {
    return release.artifacts.map(a => a.fileName.split(".")[0]?.split("-")[2] as unknown as BuildType | undefined)[0] || BuildType.development;
}

export function useLatestReleasesOfEachBuldType(releases: JenkinsRelease[]): Record<BuildType, JenkinsRelease> {
    return useMemo(() => Object.fromEntries(releases.map(release => [buildTypeForRelease(release), release] as [BuildType, JenkinsRelease]).sort(([ type1, release1 ], [ type2, release2 ]) => {
        if (type1 !== type2) return 1;
        return release2.number - release1.number;
    }).filter(([ type ], index, releases) => (
        releases.findIndex(([ typeCmp ]) => type === typeCmp) === index
    ))) as Record<BuildType, JenkinsRelease>, [releases]);
}
