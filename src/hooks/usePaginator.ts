import { useState } from "react";
import { Paginator } from "../structs/Paginator";

class ObservablePaginator extends Paginator {
    public onDerive: ((derived: ObservablePaginator) => void) | null = null;

    public static from({ itemSize, itemsPerPage, items, pageNumber, onDerive }: ObservablePaginator): ObservablePaginator {
        const observable = new ObservablePaginator(itemSize, itemsPerPage, items, pageNumber);
        observable.onDerive = onDerive;
        return observable;
    }

    public derive(merge: Partial<Paginator> = {}): ObservablePaginator {
        const derived = ObservablePaginator.from({
            ...this,
            ...merge
        });

        this.onDerive?.(derived);

        return derived;
    }
}

export function usePaginator(...args: ConstructorParameters<typeof Paginator>): Paginator {
    const [ paginator, setPaginator ] = useState<ObservablePaginator>(() => new ObservablePaginator(...args));

    paginator.onDerive = setPaginator;

    return paginator;
}