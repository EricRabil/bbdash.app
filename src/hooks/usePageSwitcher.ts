import { useState, useCallback } from "react";

export interface PageSwitcherAPI {
    startIndex: number;
    stopIndex: number;
    currentPage: number;
    totalPages: number;
    jumpToPage: (pageNumber: number) => void;
    nextPage: (() => void) | null;
    prevPage: (() => void) | null;
}

export function usePageSwitcher(length: number, perPage: number): PageSwitcherAPI {
    const [ currentPage, setCurrentPage ] = useState(1);
    const totalPages = Math.ceil(length / perPage);

    const startIndex = (currentPage - 1) * perPage;
    const stopIndex = Math.min(length, startIndex + perPage);

    const nextPage = useCallback(() => setCurrentPage(currentPage + 1), [currentPage, setCurrentPage]);
    const prevPage = useCallback(() => setCurrentPage(currentPage - 1), [currentPage, setCurrentPage]);
    const jumpToPage = useCallback((pageNumber: number) => {
        if (pageNumber > totalPages) pageNumber = totalPages;
        else if (pageNumber < 0) pageNumber = 0;

        setCurrentPage(pageNumber);
    }, [totalPages, setCurrentPage]);

    const atStart = currentPage === 1;
    const atEnd = currentPage === totalPages;

    return {
        startIndex,
        stopIndex,
        currentPage,
        totalPages,
        nextPage: atEnd ? null : nextPage,
        prevPage: atStart ? null : prevPage,
        jumpToPage
    };
}