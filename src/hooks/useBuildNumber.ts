import { useMemo } from "react";
import { GithubRelease } from "./useReleases";

export function useBuildNumber({ name, created_at }: GithubRelease): number {
    return useMemo(() => name.split("-").map(raw => parseInt(raw)).find(int => !isNaN(int)) || Date.parse(created_at), [ name ]);
}