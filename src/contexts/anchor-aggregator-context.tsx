import React, { ReactNode, createContext, useContext, useEffect, useState, useCallback, PropsWithChildren, useMemo } from "react";

export interface AnchorDefinition {
    id: string;
    name: string;
}

export interface AnchorAggregatorContextState {
    anchors: AnchorDefinition[];
    defineAnchor(anchor: AnchorDefinition): void;
}

export const AnchorAggregatorContext = createContext<AnchorAggregatorContextState>({
    anchors: [],
    defineAnchor: () => undefined
});

export function AnchorAggregatorProvider({ children }: PropsWithChildren<{}>) {
    const [ anchors, setAnchors ] = useState<AnchorDefinition[]>([]);

    const defineAnchor = useCallback((newAnchor: AnchorDefinition) => {
        let oldIndex = anchors.findIndex(anchor => anchor.id === newAnchor.id);
        if (oldIndex === -1) oldIndex = anchors.length;
        const newAnchors = anchors.slice();
        newAnchors[oldIndex] = newAnchor;
        setAnchors(newAnchors);
    }, [anchors]);

    const api = useMemo(() => ({ anchors, defineAnchor }), [ anchors, defineAnchor ]);

    return (
        <AnchorAggregatorContext.Provider value={api}>
            {children}
        </AnchorAggregatorContext.Provider>
    );
}

function reactNodeText(node: ReactNode): string {
    if (typeof node === "string" || typeof node === "number") return node.toString();
    else if (Array.isArray(node)) return node.map(reactNodeText).join("");
    else if (typeof node === "object" && node) return reactNodeText((node as JSX.Element).props.children);
    else return "";
}

function reactNodeElProps(node: ReactNode): Record<string, any> | null {
    if (typeof node === "string" || typeof node === "number") return null;
    else if (Array.isArray(node)) return null;
    else if (typeof node === "object" && node) return (node as JSX.Element).props;
    else return null;
}

export function AggregatedAnchor({ children }: { children: ReactNode }) {
    const { defineAnchor } = useContext(AnchorAggregatorContext);

    const [ name, id ] = useMemo(() => [reactNodeText(children), reactNodeElProps(children)?.id], [children]);
    if (!id) throw new Error("Root element must have an ID.");

    useEffect(() => {
        if (!name || !id) return;
        defineAnchor({ name, id });
    }, [name, id]);

    return (
        <>
            {children}
        </>
    );
}

export function AggregatedAnchors({ children }: { children: ReactNode }) {
    return (
        <>
            {React.Children.map(children, child => {
                if (typeof child === "object" && child) {
                    const { type, props: { id } } = child as JSX.Element;
                    if (typeof type === "string") {
                        if (type.toLowerCase().startsWith("h") && type.length === 2 && id) {
                            return (
                                <AggregatedAnchor>
                                    {child}
                                </AggregatedAnchor>
                            );
                        }
                    }
                }
                
                return child;
            })}
        </>
    );
}