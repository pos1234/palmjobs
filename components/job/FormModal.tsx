import React, { useRef, useState } from 'react'
import ConfirmModal from '../ConfirmModal';
import CloseIcon from '@mui/icons-material/Close';

interface ConfirmModalProps {
    children: React.ReactNode;
    openModal: boolean,
    setOpenModal: (openModal: boolean) => void;
    addText: string,
    icon?: any,
    text: string,
    tipText: string
}
const FormModal = ({ children, openModal, setOpenModal, addText, tipText }: ConfirmModalProps) => {
    const [tip, setTip] = useState(false)
    const parentRef = useRef<HTMLDivElement>(null);
    const handleParentClick = () => {
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
            <div ref={parentRef} onClick={handleParentClick} className='w-screen h-screen flex items-center justify-center px-3 py-3 sm:py-10 sm:px-7 md:p-10 lg:px-20 xl:px-52 xl:py-16'>
                <div onClick={handleChildClick} className='bg-textW rounded-2xl '>
                    <div className='flex flex-col h-full'>
                        <div className='w-full flex justify-end p-2 hover:text-gradientFirst' >
                            <CloseIcon
                                sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%', fontSize: '1.5rem' }}
                                className="w-8 h-8 p-2 cursor-pointer"
                                onClick={() => setOpenModal(false)}
                            />
                        </div>
                        <div className='p-5 sm:px-10'>
                            <div className='flex w-full gap-5'>
                                <p onClick={() => setTip(false)} className={tip ? 'cursor-pointer border-b-2 border-b-textW hover:border-b-gradientFirst md:border-0 lg:hidden' : 'border-b-2 border-b-gradientFirst md:border-0 lg:hidden'}>{addText}</p>
                                <p onClick={() => setTip(true)} className={tip ? 'border-b-2 border-b-gradientFirst lg:hidden' : 'cursor-pointer border-b-2 border-b-textW hover:border-b-gradientFirst lg:hidden'}>Tips</p>
                            </div>
                            <div className='w-full flex h-full'>
                                <div className={tip ? 'max-lg:hidden h-full lg:w-1/2 overflow-y-auto lg:max-h-[25rem] thinScrollBar flex' : 'flex w-full h-full lg:w-1/2 overflow-y-auto'}>
                                    {children}
                                </div>
                                <div className={`bg-gray-100 flex flex-wrap px-5 pt-5 rounded-lg w-full gap-7 lg:flex items-center flex-grow justify-center h-full ${tip ? 'lg:w-1/2' : 'hidden overflow-y-auto lg:w-1/3'}`}>
                                    <div className='w-full flex flex-wrap self-center items-end h-1/2 font-[600] sm:text-[20px] text-center'>
                                        {tipText}
                                    </div>
                                    <div className='w-full flex items-end self-end justify-end '>
                                        <img src='/images/salaryTipPattern.svg' className='w-full sm:h-40 self-end' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </ConfirmModal >
    )
}

export default FormModal