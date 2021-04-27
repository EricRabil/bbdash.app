import { useCallback, useMemo, useState, useLayoutEffect } from "react";
import { GITHUB_REPO, GITHUB_USERNAME } from "../util/const";

export interface GithubRelease {
    id: number;
    node_id: string;
    name: string;
    size_in_bytes: number;
    url: string;
    archive_download_url: string;
    expired: boolean;
    created_at: string;
    expires_at: string;
    updated_at: string;
}

export interface ReleaseTracker {
    releases: GithubRelease[];
    total: number;
    loadMore: () => Promise<void>;
    loading: boolean;
}

interface ReleasesResponse {
    artifacts: GithubRelease[];
    total_count: number;
}

const DO_CACHED = false;

async function resolveReleases(page: number): Promise<ReleasesResponse> {
    const key = `cached-releases-${page}-${GITHUB_USERNAME}-${GITHUB_REPO}`;
    const cached = localStorage.getItem(key);

    if (DO_CACHED && cached) {
        return JSON.parse(cached);
    }

    const artifacts = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/actions/artifacts?page=${page}`);

    const res: ReleasesResponse = await artifacts.json();

    if (DO_CACHED) {
        localStorage.setItem(key, JSON.stringify(res));
    }
        
    return res;
}

export function useReleases(): ReleaseTracker {
    const [ releases, setReleases ] = useState<Record<string, GithubRelease>>({});
    const [ lastPage, setLastPage ] = useState(0);
    const [ total, setTotal ] = useState(0);
    const [ loading, setLoading ] = useState(false);

    const loadMore = useCallback(async () => {
        if (loading) return;

        setLoading(true);
        const pageToLoad = lastPage + 1;

        const res = await resolveReleases(pageToLoad);

        setReleases(Object.assign({}, releases, res.artifacts.reduce((acc, artifact) => {
            acc[artifact.id] = artifact;
            return acc;
        }, {} as Record<string, GithubRelease>)));
        setTotal(res.total_count);
        setLastPage(pageToLoad);
        setLoading(false);
    }, [releases, loading, setLoading, lastPage]);

    useLayoutEffect(() => {
        if (lastPage === 0) loadMore();
    }, []);

    const releasesArray = useMemo(() => Object.values(releases).sort((r1, r2) => Date.parse(r2.created_at) - Date.parse(r1.created_at)), [ releases ]);

    return {
        releases: releasesArray,
        total,
        loadMore,
        loading
    };
}
