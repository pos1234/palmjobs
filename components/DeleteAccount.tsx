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
        <div className="pt-5 pb-10 flex max-sm:px-5 sm:pl-10 xl:pr-28 my-5 xl:px-20">
            <div className="flex flex-col gap-y-2 w-full md:w-2/3">
                <p className="col-span-12 font-frhW  text-red-500 text-frhS">Permanently delete account</p>
                <button
                    onClick={() => setOpenLogout(true)}
                    type="button"
                    className="mt-5 text-textW bg-red-500 h-14 w-full rounded-lg md:w-60 self-end"
                >
                    Delete Account
                </button>
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
                            className="bg-gray-100 text-gray-600 h-16 w-48 rounded-lg order-1 col-span-12 sm:order-2 sm:col-span-6 xl:col-span-3"
                        >
                            No
                        </button>
                        {!logLoading && (
                            <button
                                onClick={handleAccountDelete}
                                type="button"
                                className="bg-black text-textW h-16 w-48 rounded-lg order-1 col-span-12 sm:order-2 sm:col-span-6 xl:col-span-3"
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