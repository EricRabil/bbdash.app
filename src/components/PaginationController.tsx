import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { PageSwitcherAPI, usePaginator } from "../hooks";
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
        <div className="pagination-button" attr-active={(currentPage === pageNumber).toString()} onClick={() => {
            jumpToPage(pageNumber);
        }}>
            {pageNumber}
        </div>
    );
}

const PaginationScrollContainer = React.memo(function PaginationScrollContainer({ totalPages }: { totalPages: number }) {
    const paginator = usePaginator(23, 5, Math.max(0, totalPages - 2));
    const { currentPage } = useContext(PaginationContext);
    
    const paginatorPage = Math.max(0, currentPage - 2);
    const paginatorTotalPages = Math.max(0, totalPages - 2);

    useEffect(() => {
        paginator.derive({ items: paginatorTotalPages });
    }, [paginatorTotalPages]);

    useEffect(() => {
        if (!paginator.itemIsVisible(paginatorPage)) {
            paginator.showItem(paginatorPage);
        }
    }, [paginatorPage]);
    
    const { canGoBackward, canGoForward, offset } = paginator;

    if (paginator.items === 0) return null;

    return (
        <div className="pagination-scroll-controller">
            <div className="pagination-button" attr-disabled={(!canGoBackward).toString()} onClick={paginator.prevPage}>&#x2190;</div>
            <div className="pagination-scroll-container" style={{
                width: `${Math.min(115, (totalPages - 2) * 23)}px`
            }}>
                <div className="pagination-main-page-buttons" style={{
                    transform: `translateX(-${offset}px)`
                }}>
                    {range(2, totalPages).map(pageNumber => (
                        <PaginationPageButton key={pageNumber} pageNumber={pageNumber} />
                    ))}
                </div>
            </div>
            <div className="pagination-button" attr-disabled={(!canGoForward).toString()} onClick={paginator.nextPage}>&#x2192;</div>
        </div>
    );
}, (prevProps, nextProps) => prevProps.totalPages === nextProps.totalPages);

function PaginationMovementButton({ direction, children }: { direction: "prevPage" | "nextPage", children: ReactNode }) {
    return (
        <PaginationContext.Consumer>
            {({ [direction]: onClickHandler }) => (
                <div className="pagination-button pagination-movement-button" attr-disabled={(onClickHandler === null).toString()} onClick={() => onClickHandler?.()}>
                    {children}
                </div>
            )}
        </PaginationContext.Consumer>
    );
}

export default function PaginationController({ api }: { api: PageSwitcherAPI }) {
    return (
        <PaginationContext.Provider value={api}>
            <div className="pagination-controller">
                <PaginationMovementButton direction="prevPage">
                    &lt; Prev
                </PaginationMovementButton>
                <PaginationPageButton pageNumber={1} />
                <PaginationScrollContainer totalPages={api.totalPages} />
                {api.totalPages > 1 ? (
                    <PaginationPageButton pageNumber={api.totalPages} />
                ) : null}
                <PaginationMovementButton direction="nextPage">
                    Next &gt;
                </PaginationMovementButton>
            </div>
        </PaginationContext.Provider>
    );
}