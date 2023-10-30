import React, { useState } from 'react'
import ConfirmModal from './ConfirmModal';

const DeleteAccount = () => {
    const loadingIn = '/images/loading.svg';
    const [loading, setLoading] = useState(false)
    const [openLogout, setOpenLogout] = useState(false)
    const [logLoading, setLogLoading] = useState(false)
    const [inputText, setInputText] = useState('')
    const [errorText, setErrorText] = useState('')
    const handleAccountDelete = () => {
        if (inputText == '') {
            setErrorText('Please type the above text with red color')
        }
        else if (inputText.toLocaleLowerCase() !== 'delete my account') {
            setErrorText('Text does not match please retype the above text with red color')
        }
        else {
            setOpenLogout(false)
        }
    }
    return (
        <div className="pt-5 pb-10 bg-textW grid grid-cols-12 max-sm:px-5 sm:pl-10 xl:pr-28 xl:px-20">
            <div
                className="col-span-12  order-1 md:order-2 flex flex-col gap-y-2 md:px-5 lg:px-10 xl:px-20 md:col-span-6 xl:col-span-9"
            >
                <p className="col-span-12 font-frhW  text-red-500 text-[1.5rem] xl:text-frhS">Permanently delete account</p>
                <div className="col-span-12 grid grid-cols-12 justify-items-end pr-2 lg:col-span-10">
                    {loading && (
                        <img
                            src={loadingIn}
                            className="mt-5 col-span-12 text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full rounded-full"
                        />
                    )}
                    {!loading && (
                        <button
                            onClick={() => setOpenLogout(true)}
                            type="button"
                            className="mt-5 col-span-12 text-textW bg-red-500 h-16 w-full rounded-full"
                        >
                            Delete Account
                        </button>
                    )}
                </div>
            </div>
            <ConfirmModal isOpen={openLogout} handleClose={() => setOpenLogout(!openLogout)}>
                <div className="mx-2 pb-10 w-full pl-5 bg-textW rounded-2xl flex flex-col gap-y-5 items-center justify-center pt-10 md:pl-8 pr-5 md:w-2/3 lg:w-1/2 md:mx-0">
                    <p className="col-span-12 text-black font-semibold leading-10 md:text-3xl">Are you sure you want to delete account ?</p>
                    <p>If you delete your account you cannot access your data again</p>
                    <p>Please type : <span className='text-red-500 font-bold'>Delete My Account</span></p>
                    <input type="text" className='rounded-full focus:ring-gradientFirst focus:border-0' onChange={(e) => setInputText(e.currentTarget.value)} />
                    {errorText && <p className='text-red-500'>{errorText}</p>}
                    <div className="flex gap-x-10 max-sm:flex-col max-sm:gap-y-3">
                        <button
                            onClick={() => setOpenLogout(!openLogout)}
                            type="button"
                            className="bg-gradientSecond hover:bg-gradient-to-r text-textW hover:from-gradientFirst hover:to-gradientSecond h-16 w-48 rounded-full  order-1 col-span-12 sm:order-2 sm:col-span-6 xl:col-span-3"
                        >
                            No
                        </button>
                        {logLoading && (
                            <img
                                src={loadingIn}
                                className="text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center h-16 w-48 rounded-full  order-1 col-span-12 sm:order-2 sm:col-span-6 xl:col-span-3"
                            />
                        )}
                        {!logLoading && (
                            <button
                                onClick={handleAccountDelete}
                                type="button"
                                className="bg-gradientSecond hover:bg-gradient-to-r text-textW hover:from-gradientFirst hover:to-gradientSecond h-16 w-48 rounded-full  order-1 col-span-12 sm:order-2 sm:col-span-6 xl:col-span-3"
                            >
                                Yes
                            </button>
                        )}
                    </div>
                </div>
            </ConfirmModal>
        </div>
    )
}

export default DeleteAccount