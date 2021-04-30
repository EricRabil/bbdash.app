import { useCallback, useMemo, useState, useLayoutEffect } from "react";

export interface JenkinsArtifact {
    displayPath: string;
    fileName: string;
    relativePath: string;
}

export interface JenkinsRelease {
    artifacts: JenkinsArtifact[];
    number: number;
    result: "SUCCESS" | unknown;
    timestamp: number;
    url: string;
}

export interface ReleaseTracker {
    releases: JenkinsRelease[];
    total: number;
    loadMore: () => Promise<void>;
    loading: boolean;
}

interface ReleasesResponse {
    allBuilds: JenkinsRelease[];
}

async function resolveReleases(from: number, to: number): Promise<ReleasesResponse> {
    const artifacts = await fetch(`https://jenkins.ericrabil.com/job/BBDash/job/master/api/json?pretty=true&tree=allBuilds[number,result,url,artifacts[*],timestamp]{${from},${to}}`);

    const res: ReleasesResponse = await artifacts.json();

    return res;
}

export function useReleases(): ReleaseTracker {
    const [ releases, setReleases ] = useState<Record<number, JenkinsRelease>>({});
    const [ total, setTotal ] = useState(-1);
    const [ loading, setLoading ] = useState(false);
    const [ highestLoaded, setHighestLoaded ] = useState(0);

    const loadMore = useCallback(async () => {
        if (loading) return;

        setLoading(true);
        
        const to = highestLoaded + 100;
        const res = await resolveReleases(highestLoaded, to);

        setReleases(Object.assign({}, releases, res.allBuilds.reduce((acc, artifact) => {
            acc[artifact.number] = artifact;
            return acc;
        }, {} as Record<string, JenkinsRelease>)));

        if (total === -1) {
            setTotal(res.allBuilds[0].number);
        }

        setHighestLoaded(to);

        setLoading(false);
    }, [releases, loading, total, highestLoaded]);

    useLayoutEffect(() => {
        if (total === -1) loadMore();
    }, []);

    const { releasesArray, revisedTotal } = useMemo(() => {
        let omitted = 0;
        const array = Object.values(releases).sort((r1, r2) => r2.number - r1.number).filter(build => {
            if (build.result === "SUCCESS") return true;
            omitted += 1;
            return false;
        });

        return {
            releasesArray: array,
            revisedTotal: total - omitted
        };
    }, [ releases, total ]);

    return {
        releases: releasesArray,
        total: revisedTotal,
        loadMore,
        loading
    };
}
