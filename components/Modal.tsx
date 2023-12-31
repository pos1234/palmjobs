import React, { useRef, useState } from 'react'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CloseIcon from '@mui/icons-material/Close';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ConfirmModal from './ConfirmModal';
interface ConfirmModalProps {
    children: React.ReactNode;
    openModal: boolean,
    modalTitle: string,
    setOpenModal: (openModal: boolean) => void;
}
const Modal = ({ children, openModal, modalTitle, setOpenModal }: ConfirmModalProps) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const handleParentClick = () => {
        console.log('Parent div clicked');
        setOpenModal(false)
    };
    const handleChildClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };
    return (
        <ConfirmModal isOpen={openModal} handleClose={() => {
            setOpenModal(!openModal);
        }}
        >
            <div ref={parentRef} onClick={handleParentClick} className='w-screen h-screen flex items-center justify-center px-3 py-10 sm:px-7 sm:py-20 md:p-10 lg:px-20 xl:px-52 xl:py-16'>
                <div onClick={handleChildClick} className='bg-textW w-auto h-auto rounded-2xl p-3'>
                    <div className='w-full flex justify-between mb-5'>
                        <div className='text-xl font-[600] text-gradientFirst'>
                            {modalTitle}
                        </div>
                        <div className='cursor-pointer hover:text-gradientFirst' onClick={() => setOpenModal(false)}>
                            <CloseIcon
                                sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                className="w-8 h-8 p-2 "
                            />
                        </div>
                    </div>
                    <div className='px-3 pb-5'>
                        {children}
                    </div>
                </div>
            </div>

        </ConfirmModal>
    )
}

export default Modal