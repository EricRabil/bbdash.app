import { JenkinsRelease } from "./useReleases";

export function getReleaseDownloadURL({ url, artifacts: [ artifact ] }: JenkinsRelease): string | undefined {
    if (!artifact) return undefined;
    return `${url}artifact/${artifact.fileName}`;
}