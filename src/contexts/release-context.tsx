import React, { PropsWithChildren, createContext } from "react";
import { ReleaseTracker, useReleases } from "../hooks/useReleases";

export const ReleaseContext = createContext<ReleaseTracker>({
    releases: [],
    total: 0,
    loading: true,
    loadMore: () => Promise.resolve()
});

export function ReleaseProvider({ children }: PropsWithChildren<{}>) {
    const tracker = useReleases();

    return (
        <ReleaseContext.Provider value={tracker}>
            {children}
        </ReleaseContext.Provider>
    );
}