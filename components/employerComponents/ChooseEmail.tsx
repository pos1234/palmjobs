import React, { useEffect, useState } from 'react'
import { getProfileData, updateEmailNotification } from '@/backend/employerBackend';
import { toast } from 'react-toastify';
import { SubmitButton } from '../TextInput';

const ChooseEmail = () => {
    const [receive, setReceive] = useState(false)
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getProfileData().then((res: any) => {

            if (res.documents[0].receiveEmailNotification !== false) {
                setReceive(true)
            }
            if (res.documents[0].receiveEmailNotification == false) {
                setReceive(false)
            }
        })
    }, [])
    const handleRadioUpdate = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        setLoading(true)
        if (receive == true) {
            updateEmailNotification(true).then(() => {
                setLoading(false)
                toast.success('Successfully Updated Email Notification')
            }).catch((error) => {
                toast.error('Email Notification not updated')
                console.log(error);
            })
        }
        if (receive == false) {
            updateEmailNotification(false).then(() => {
                setLoading(false)
                toast.success('Successfully Updated Email Notification')
            }).catch((error) => {
                toast.error('Email Notification not updated')
                console.log(error);
            })
        }
    }

    return (
        <div className="pt-5 pb-10 flex max-sm:px-5 sm:pl-10 xl:pr-28 border-y-2 my-5 xl:px-20">
            <div className="flex flex-col gap-y-2 w-full md:w-2/3">
                <p className="font-frhW  text-[#0E121D] text-frhS">Choose to receive email notification</p>
                <form onSubmit={handleRadioUpdate} className='flex flex-col gap-y-5 mt-5'>
                    <div className="flex items-center gap-x-2">
                        <input
                            onChange={(e) => setReceive(!receive)}
                            type="checkbox"
                            checked={receive}
                            name={'checker'}
                            className="form-checkbox text-gradientFirst ring-green-500 cursor-pointer"
                        />
                        <span className={`text-neutral-900 text-opacity-70 text-lg font-medium `}>{receive ? <span>Unsubscribed</span> : <span>Subscribed</span>} </span>
                    </div>
                    <div className="w-full justify-end flex mt-10">
                        <div className='w-full md:w-60'>
                            <SubmitButton loading={loading} buttonText={'Update'} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChooseEmail