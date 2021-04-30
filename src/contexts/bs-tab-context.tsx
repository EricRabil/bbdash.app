import React, { createContext, useMemo, useState, PropsWithChildren } from "react";

export interface BSTabContextState {
    currentTab: string | number;
    visibleTab: string | number;
    setCurrentTab: (currentTab: string | number) => void;
    setVisibleTab: (visibleTab: string | number) => void;
}

export const BSTabContext = createContext<BSTabContextState>({
    currentTab: 0,
    visibleTab: 0,
    setCurrentTab: () => undefined,
    setVisibleTab: () => undefined
});

export function BSTabProvider({ children, initialTab = 0 }: PropsWithChildren<{ initialTab?: string | number }>) {
    const [ currentTab, setCurrentTab ] = useState<string | number>(initialTab);
    const [ visibleTab, setVisibleTab ] = useState<string | number>(initialTab);

    const api = useMemo(() => ({ currentTab, setCurrentTab, visibleTab, setVisibleTab }), [ currentTab, visibleTab ]);

    return (
        <BSTabContext.Provider value={api}>
            {children}
        </BSTabContext.Provider>
    );
}

export function IsolatedBSTabContext({ children }: { children: (context: BSTabContextState) => React.ReactNode }) {
    return (
        <BSTabProvider>
            <BSTabContext.Consumer>
                {children}
            </BSTabContext.Consumer>
        </BSTabProvider>
    );
}