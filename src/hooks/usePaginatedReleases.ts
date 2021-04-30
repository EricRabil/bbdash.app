import { useContext, useEffect, useMemo } from "react";
import { JenkinsRelease, ReleaseTracker } from "./useReleases";
import { ReleaseContext } from "../contexts/release-context";
import { PageSwitcherAPI, usePageSwitcher } from "./usePageSwitcher";

export interface PaginatedReleasesAPI extends PageSwitcherAPI, Omit<ReleaseTracker, "loadMore"> {
    releases: JenkinsRelease[];
    total: number;
}

export function usePaginatedReleases({ releases, total, loadMore, loading }: ReleaseTracker): PaginatedReleasesAPI {
    const { startIndex, stopIndex, ...paginationControllers } = usePageSwitcher(total, 35);

    const pageReleases = useMemo(() => releases.slice(startIndex, stopIndex), [releases, startIndex, stopIndex]);

    useEffect(() => {
        if (loading) return;
        if (stopIndex > releases.length) {
            loadMore();
        }
    }, [startIndex, releases, loading]);

    return useMemo(() => Object.assign({}, paginationControllers, {
        releases: pageReleases,
        startIndex,
        stopIndex,
        total,
        loading
    }), [paginationControllers, pageReleases, startIndex, stopIndex, total, loading]);
}

export function useContextuallyPaginatedReleases(): PaginatedReleasesAPI {
    return usePaginatedReleases(useContext(ReleaseContext));
}