import React, { useEffect, useReducer } from 'react';
import ConfirmModal from './ConfirmModal';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import Modal from './Modal';
const Notification = (props: any) => {
    const router = useRouter()
    useEffect(()=>{
        
    })
    return (
        <Modal openModal={props.openNotify} modalTitle={''} setOpenModal={props.setOpenNotify}
        >
            <div className="col-span-12 flex flex-col">
                <div className="flex justify-center gap-y-5 items-center w-full flex-col">

                    {props.successText == 'failed' && (
                        <p className="text-[1.2rem] text-center font-[500]">{props.successWord}</p>
                    )}
                    {props.successText == 'success' && (
                        <>
                            <img src={`${props.imageSrc ? props.imageSrc : '/images/success.png'}`} alt='success image' className="w-60 h-60" />
                            <p className="text-[1.2rem] text-center font-[500]">{props.successWord}</p>
                        </>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default Notification;
