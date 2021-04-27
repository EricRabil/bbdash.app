import { GithubRelease } from "./useReleases";
import { GITHUB_REPO, GITHUB_USERNAME } from "../util/const";

export function getReleaseDownloadURL({ id, }: GithubRelease): string {
    return `https://nightly.link/${GITHUB_USERNAME}/${GITHUB_REPO}/actions/artifacts/${id}.zip`;
}