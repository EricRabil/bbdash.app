import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { PageSwitcherAPI } from "../hooks";
import range from "lodash.range";

const PaginationContext = createContext<PageSwitcherAPI>({
    startIndex: 0,
    stopIndex: 0,
    currentPage: 1,
    totalPages: 1,
    jumpToPage: () => undefined,
    nextPage: () => undefined,
    prevPage: () => undefined
});

function PaginationPageButton({ pageNumber }: { pageNumber: number }) {
    const { currentPage, jumpToPage } = useContext(PaginationContext);

    return (
        <li className={`page-item${currentPage === pageNumber ? " active" : ""}${pageNumber === -1 ? " disabled" : ""}`} attr-active={(currentPage === pageNumber).toString()} onClick={() => {
            if (pageNumber === -1) return;
            jumpToPage(pageNumber);
        }}>
            <a href="#" className="page-link">{pageNumber === -1 ? "..." : pageNumber}</a>
        </li>
    );
}

function PaginationMovementButton({ direction, children }: { direction: "prevPage" | "nextPage", children: ReactNode }) {
    return (
        <PaginationContext.Consumer>
            {({ [direction]: onClickHandler }) => (
                <li className={`page-item${onClickHandler === null ? " disabled" : ""}`} onClick={() => onClickHandler?.()}>
                    <a href="#" className="page-link">{children}</a>
                </li>
            )}
        </PaginationContext.Consumer>
    );
}

const PAGINATION_PADDING = 2;

function makeTweens(base: number, dropStart: boolean, dropEnd: boolean): number[] {
    const tweens: number[] = [base];

    for (let i = 1; i < (PAGINATION_PADDING + 1); i++) {
        tweens.unshift(base - i);
        tweens.push(base + i);
    }

    if (dropStart) tweens[0] = -1;
    if (dropEnd) tweens[tweens.length - 1] = -1;
    
    return tweens;
}

function visiblePageNumbers(pages: number, currentPage: number): number[] {
    const SPACER_START = currentPage > 4;
    const SPACER_END = currentPage < (pages - 3);

    if (pages <= 7) return range(1, pages + 1);

    return [ 1, ...makeTweens(SPACER_START ? SPACER_END ? currentPage : pages - (PAGINATION_PADDING + 1) : (PAGINATION_PADDING + 2), SPACER_START, SPACER_END), pages ];
}

function useVisiblePageNumbers(pages: number, currentPage: number): number[] {
    return useMemo(() => visiblePageNumbers(pages, currentPage), [pages, currentPage]);
}

export default function PaginationController({ api }: { api: PageSwitcherAPI }) {
    const visiblePageNumbers = useVisiblePageNumbers(api.totalPages, api.currentPage);

    return (
        <PaginationContext.Provider value={api}>
            <nav className="d-flex flex-row">
                <ul className="pagination">
                    <PaginationMovementButton direction="prevPage">
                    &lt; Prev
                    </PaginationMovementButton>
                    <PaginationMovementButton direction="nextPage">
                    Next &gt;
                    </PaginationMovementButton>
                </ul>
                <ul className="mx-2 pagination">
                    {visiblePageNumbers.map((pageNumber, index) => (
                        <PaginationPageButton pageNumber={pageNumber} key={index} />
                    ))}
                </ul>
            </nav>
        </PaginationContext.Provider>
    );
}