import React, { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import CloseIcon from '@mui/icons-material/Close';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';
import {
    PinterestShareButton,
    FacebookShareButton,
    PinterestIcon,
    TwitterShareButton,
    LinkedinShareButton,
    TelegramShareButton
} from 'next-share';
import { toast } from 'react-toastify';
const VERIFY = process.env.NEXT_PUBLIC_VERIFY || '';
const Share = (props: any) => {
    const copyToClipboard = (text: any) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                toast.success('Text copied to clipboard!');
                props.setOpenShare(!props.openShare);
            })
            .catch((error) => {
                toast.error('Error copying text to clipboard:', error);
            });
    };
    return (
        <ConfirmModal isOpen={props.openShare} handleClose={() => props.setOpenShare(!props.openShare)}>
            <div className="mx-2 pb-5 w-full pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-6 md:pl-8 md:w-2/3 lg:w-1/2">
                <div className="col-span-12 grid grid-cols-12">
                    <div className="col-span-10  flex items-center text-2xl font-[600] text-gradientFirst">Share Job</div>
                    <div className="col-span-2 md:col-span-1 grid pr-2 justify-items-end">
                        <button onClick={() => props.setOpenShare(!props.openShare)}>
                            <CloseIcon sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }} className="w-8 h-8 p-2 " />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col col-span-10 mt-10">
                    <div className="flex border-2 p-3 rounded-2xl justify-between items-center">
                        <input
                            className="border-r-2 pr-3 mr-3 overflow-hidden w-full border-0 outline-0 focus:ring-0 focus:border-0"
                            defaultValue={`${VERIFY}/jobs/${props.link}`}
                        />
                        <div
                            onClick={() => copyToClipboard(`${VERIFY}/jobs/${props.link}`)}
                            className="cursor-pointer text-stone-500 hover:text-stone-700"
                        >
                            <ContentPasteIcon />
                        </div>
                    </div>
                    <div className="flex mt-5 gap-x-5 text-[#618c61]">
                        <TelegramShareButton url={`${VERIFY}jobs/${props.link}`}>
                            <TelegramIcon className="hover:text-gradientFirst" />
                        </TelegramShareButton>
                        <FacebookShareButton url={`${VERIFY}jobs/${props.link}`}>
                            <FacebookIcon className="hover:text-gradientFirst" />
                        </FacebookShareButton>
                        <TwitterShareButton url={`${VERIFY}jobs/${props.link}`}>
                            <TwitterIcon className="hover:text-gradientFirst" />
                        </TwitterShareButton>
                        <LinkedinShareButton url={`${VERIFY}jobs/${props.link}`} title="Social share">
                            <LinkedInIcon className="hover:text-gradientFirst" />
                        </LinkedinShareButton>
                    </div>
                </div>
            </div>
        </ConfirmModal>
    );
};

export default Share;
