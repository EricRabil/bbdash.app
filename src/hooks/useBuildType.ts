import { useMemo } from "react";
import { GithubRelease } from "./useReleases";

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
}
/* eslint-enable */

// eslint-disable-next-line
export function buildTypeForRelease(release: GithubRelease): BuildType {
    return BuildType.development;
}

export function useLatestReleasesOfEachBuldType(releases: GithubRelease[]): Record<BuildType, GithubRelease> {
    return useMemo(() => Object.fromEntries(releases.map(release => [buildTypeForRelease(release), release] as [BuildType, GithubRelease]).sort(([ type1, release1 ], [ type2, release2 ]) => {
        if (type1 !== type2) return 1;
        return Date.parse(release1.created_at) - Date.parse(release2.created_at);
    }).filter(([ type ], index, releases) => (
        releases.findIndex(([ typeCmp ]) => type === typeCmp) === index
    ))) as Record<BuildType, GithubRelease>, [releases]);
}
