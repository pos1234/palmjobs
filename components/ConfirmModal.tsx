import React, { useEffect } from 'react';
import ReactPortal from './ReactPortal';

interface ConfirmModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    handleClose: () => void;
}
const ConfirmModal = ({ children, isOpen, handleClose }: ConfirmModalProps) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return (): void => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);
    if (!isOpen) return null;
    return (
        <ReactPortal wrapperId="react-portal-modal-container">
            <>
                <div className="fixed flex items-center justify-center top-0 left-0 w-screen h-screen bg-neutral-800 bg-opacity-50">
                    {children}
                    {/* <div className="bg-red-500">
                        <p>hey</p>
                        <button onClick={handleClose} className="bg-green-500">
                            close
                        </button>
                    </div> */}
                </div>
            </>
        </ReactPortal>
    );
};
export default ConfirmModal;
