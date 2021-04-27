/**
 * Allows the tracking and navigation of a pagination view
 */
export class Paginator {
    /**
     * Paginator uses the item size, items per page, and number of items to calculate the necessary offsets to display an item group.
     * The page number is used to calculate the offset.
     * 
     * @param itemSize size of each individual item
     * @param itemsPerPage items in an item group
     * @param items total number of items
     * @param pageNumber current page number
     */
    constructor(public readonly itemSize: number, public readonly itemsPerPage: number, public readonly items: number, public readonly pageNumber: number = 0) {
    }

    /**
     * Creates a new Paginator from an old one, with the same properties as the original
     * @param paginator the original Paginator
     * @returns a new Paginator with the same properties as the argument
     */
    public static from({ itemSize, itemsPerPage, items, pageNumber }: Paginator): Paginator {
        return new Paginator(itemSize, itemsPerPage, items, pageNumber);
    }

    /**
     * Creates a new Paginator with any overridden properties, and all other are the same as the current instance
     * @param merge partial paginator to merge with the new paginator
     * @returns a new paginator with the derived properties
     */
    public derive(merge: Partial<Paginator> = {}): Paginator {
        return Paginator.from({
            ...this,
            ...merge
        });
    }

    /**
     * Derives a Paginator with the given page
     * @param pageNumber new page number
     * @returns derived Paginator
     */
    public changePage(pageNumber: number): Paginator {
        return this.derive({ pageNumber });
    }

    /**
     * Derives a Paginator for the next page
     * @returns derived Paginator
     */
    public nextPage(): Paginator {
        if (!this.canGoForward) return this;
        return this.changePage(this.pageNumber + 1);
    }

    /**
     * Derives a Paginator for the previous page
     * @returns derived Paginator
     */
    public prevPage(): Paginator {
        if (!this.canGoBackward) return this;
        return this.changePage(this.pageNumber - 1);
    }

    /**
     * Calculates the offset to display a page group
     * @param page the page to calculate the offset of
     * @returns offset to display group
     */
    public offsetForPage(page: number): number {
        const baseOffset = (page - 1) * this.pageSize;

        return baseOffset + (this.itemsInPage(page) * this.itemSize);
    }

    /**
     * Derives a Paginator that includes the given item in its current page
     * @param item item to ensure is displayed
     * @returns derived Paginator
     */
    public showItem(item: number): Paginator {
        if (this.itemIsVisible(item)) return this;
        return this.changePage(Math.floor(item / this.itemsPerPage));
    }

    /**
     * Determines whether the given item is visible in the current page
     * @param item item to check for
     * @returns true if the item is visible, false otherwise
     */
    public itemIsVisible(item: number): boolean {
        return this.firstVisibleItem <= item && item <= this.lastVisibleItem;
    }

    /**
     * Returns the number of items in a given page
     * @param page page to check for
     * @returns number of items in page
     */
    public itemsInPage(page: number): number {
        const itemsPassed = this.itemsPerPage * page;
        if (itemsPassed > this.items) return 0;
        else if ((itemsPassed + this.itemsPerPage) > this.items) return this.items - itemsPassed;
        else return this.itemsPerPage;
    }

    /**
     * The offset needed to display the items for the current configuration
     */
    public get offset(): number {
        return this.offsetForPage(this.pageNumber);
    }

    /**
     * The size of a full page
     */
    public get pageSize(): number {
        return this.itemSize * this.itemsPerPage;
    }

    /**
     * The first visible item for the current page
     */
    public get firstVisibleItem(): number {
        return (this.pageNumber * this.itemsPerPage);
    }

    /**
     * The last visible item for the current page
     */
    public get lastVisibleItem(): number {
        return Math.min(this.firstVisibleItem + (this.itemsPerPage - 1), this.items);
    }

    /**
     * Whether the user can move forward
     */
    public get canGoForward(): boolean {
        return this.lastVisibleItem !== this.items;
    }

    /**
     * Whether the user can move backward
     */
    public get canGoBackward(): boolean {
        return this.offset > 0;
    }
}
