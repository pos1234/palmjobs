import React from 'react';
import ConfirmModal from './ConfirmModal';
import CloseIcon from '@mui/icons-material/Close';
const Notification = (props: any) => {
    return (
        <ConfirmModal
            isOpen={props.openNotify}
            handleClose={() => {
                props.setOpenNotify(!props.openNotify);
            }}
        >
            <div className="mx-2 max-sm:h-full max-sm:overflow-y-scroll pb-10 w-full pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-10 md:pl-8 md:w-2/3 lg:w-1/2 md:mx-0 ">
                <div className="col-span-12 flex flex-col">
                    <div className="flex justify-end w-full pr-7">
                        <button className="self-end" onClick={() => props.setOpenNotify(!props.openNotify)}>
                            <CloseIcon sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }} className="w-8 h-8 p-2 " />
                        </button>
                    </div>
                    <div className="flex justify-center gap-y-5 items-center w-full flex-col">
                        {props.successText == 'success' && (
                            <>
                                <img src='/images/success.png' alt='success image' className="w-60 h-60" />
                                <p className="text-[1.5rem] font-[500]">{props.successWord}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </ConfirmModal>
    );
};

export default Notification;
