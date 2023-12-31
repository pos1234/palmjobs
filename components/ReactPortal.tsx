import { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

const createWrapperAndAppendToBody = (wrapperId: string) => {
    if (!document) return null;
    const wrapperElement = document.getElementById(wrapperId);
    if (wrapperElement) return wrapperElement;

    const newWrapperElement = document.createElement('div');
    newWrapperElement.setAttribute('id', wrapperId);
    document.body.appendChild(newWrapperElement);
    return newWrapperElement;
};

function ReactPortal({ children, wrapperId }: { children: React.ReactNode; wrapperId: string }) {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

    useLayoutEffect(() => {
        const element: HTMLElement | null = createWrapperAndAppendToBody(wrapperId);
        setWrapperElement(element);

        return () => {
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
    }, [wrapperId]);

    if (!wrapperElement) return null;
    return createPortal(children, wrapperElement);
}

export default ReactPortal;
