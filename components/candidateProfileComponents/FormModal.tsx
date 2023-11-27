import React, { useRef, useState } from 'react'
import ConfirmModal from '../ConfirmModal'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CloseIcon from '@mui/icons-material/Close';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
interface ConfirmModalProps {
    children: React.ReactNode;
    openModal: boolean,
    setOpenModal: (openModal: boolean) => void;
    addText: string,
    icon?: any,
    text: string,
    tipText: string
}
const FormModal = ({ children, openModal, setOpenModal, addText, icon, text, tipText }: ConfirmModalProps) => {
    const leaf = '/images/modalTipLeaf.svg'
    const [tip, setTip] = useState(false)
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
                <div onClick={handleChildClick} className='bg-textW w-full h-full rounded-2xl p-5 sm:p-10'>
                    <div className='flex flex-wrap gap-6'>
                        <div className='w-full flex justify-between'>
                            <div className='flex gap-4'>
                                <span className='text-gradientFirst'>{icon}</span>
                                <p className='font-[600] text-xl'>{text}</p>
                            </div>
                            <div className='cursor-pointer hover:text-gradientFirst' onClick={() => setOpenModal(false)}>
                                <CloseIcon />
                            </div>
                        </div>
                        <div className='flex w-full gap-5'>
                            <p onClick={() => setTip(false)} className={tip ? 'cursor-pointer border-b-2 border-b-textW hover:border-b-gradientFirst md:border-0' : 'border-b-2 border-b-gradientFirst md:border-0'}>{addText}</p>
                            <p onClick={() => setTip(true)} className={tip ? 'border-b-2 border-b-gradientFirst md:hidden' : 'cursor-pointer border-b-2 border-b-textW hover:border-b-gradientFirst md:hidden'}>Tips</p>
                        </div>
                        <div className='w-full flex gap-5'>
                            <div className={tip ? 'max-md:hidden md:w-1/2 overflow-y-auto md:max-h-[25rem] thinScrollBar flex' : 'flex w-full h-full md:w-1/2 overflow-y-auto max-h-[25rem] thinScrollBar'}>
                                {children}
                            </div>
                            <div className={tip ? 'bg-gray-100 flex-grow flex flex-col px-5 pt-5 rounded-r-2xl w-full gap-7 md:flex md:w-1/2' :
                                'bg-gray-100 flex-grow flex flex-col px-5 pt-5 rounded-r-2xl gap-7 hidden overflow-y-auto md:flex md:w-1/3'}>
                                <div className='flex gap-4 items-center'>
                                    <TipsAndUpdatesIcon sx={{ fontSize: '3rem' }} className='text-gradientFirst' />
                                    <p className='text-2xl font-[600]'>Tips</p>
                                </div>
                                <div className='w-full flex flex-wrap'>
                                    {tipText}
                                </div>
                                <div className='w-full flex justify-end self-end h-full items-end'>
                                    <img src={leaf} className='w-80 ' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </ConfirmModal>
    )
}

export default FormModal