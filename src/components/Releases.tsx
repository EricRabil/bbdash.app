import React, { PropsWithChildren, useState, useContext, useLayoutEffect } from "react";
import Release from "./Release";
import { useContextuallyPaginatedReleases } from "../hooks";
import PaginationController from "./PaginationController";
import { BSTabContext, BSTabProvider } from "../contexts/bs-tab-context";
import { AnchorAggregatorProvider, AggregatedAnchors } from "../contexts/anchor-aggregator-context";

function BSTabItem({ children, controls }: PropsWithChildren<{ controls: string | number }>) {
    return (
        <BSTabContext.Consumer>
            {({ currentTab, setCurrentTab }) => (
                <button onClick={() => setCurrentTab(controls)} id={`${controls}-tab`} className={`nav-link${currentTab === controls ? " active" : ""}`} type="button" role="tab" aria-controls={controls.toString()} aria-selected={currentTab === controls}>
                    {children}
                </button>
            )}
        </BSTabContext.Consumer>
    );
}

function BSTabView({ children, id }: PropsWithChildren<{ id: string | number }>) {
    const { currentTab, visibleTab, setVisibleTab } = useContext(BSTabContext);
    const canShow = currentTab === visibleTab && currentTab === id;
    const isActive = canShow ? true : visibleTab === id;

    return (
        <div className={`tab-pane fade${isActive ? " active" : ""}${canShow ? " show" : ""}`} onTransitionEnd={() => {
            setVisibleTab(currentTab);
        }} id={id.toString()} role="tabpanel" aria-labelledby={`${id}-tab`}>
            {children}
        </div>
    );
}

export default function Releases() {
    const { releases, ...paginationAPI } = useContextuallyPaginatedReleases();

    return (
        <div className="col-9">
            <BSTabProvider initialTab="ci-downloads">
                <nav>
                    <div className="nav nav-tabs mb-3" role="tablist">
                        <BSTabItem controls="ci-downloads">
                            Downloads
                        </BSTabItem>
                        <BSTabItem controls="install-instructions">
                            Install Instructions
                        </BSTabItem>
                    </div>
                </nav>
                <div className="tab-content">
                    <BSTabView id="ci-downloads">
                        <div>
                            <PaginationController api={paginationAPI} />
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Build Number</th>
                                        <th>Type</th>
                                        <th>Download</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {releases.map((release) => (
                                        <Release key={release.number} {...release} />
                                    ))}
                                </tbody>
                            </table>
                            <div className="container-footer">
                                <PaginationController api={paginationAPI} />
                            </div>
                        </div>
                    </BSTabView>
                    <BSTabView id="install-instructions">
                        <AnchorAggregatorProvider>
                            <AggregatedAnchors>
                                <h3 id="sideload-chromium">Sideloading on Chromium-based browsers</h3>
                                <h5 id="sideload-chrome"><a href="https://developer.chrome.com/docs/extensions/mv3/getstarted/#manifest">Sideload to Chrome</a></h5>
                                <h5 id="sideload-edge"><a href="https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/extension-sideloading">Sideload to Edge</a></h5>
                            </AggregatedAnchors>
                        </AnchorAggregatorProvider>
                    </BSTabView>
                </div>
            </BSTabProvider>
        </div>
    );
}