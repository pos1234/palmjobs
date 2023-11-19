import React, { useEffect, useState } from 'react'
import RadioInput from '../RadioInput'
import { getProfileData, updateEmailNotification } from '@/lib/employerBackend';
import { toast } from 'react-toastify';

const ChooseEmail = () => {
    const [receive, setReceive] = useState('')
    const [loading, setLoading] = useState(false);

    const loadingIn = '/images/loading.svg';
    useEffect(() => {
        getProfileData().then((res: any) => {

            if (res.documents[0].receiveEmailNotification !== false) {
                setReceive('true')
            }
            if (res.documents[0].receiveEmailNotification == false) {
                setReceive('false')
            }
        })
    }, [])
    const handleRadioUpdate = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        setLoading(true)
        if (receive == 'true') {
            updateEmailNotification(true).then(() => {
                setLoading(false)
                toast.success('Successfully Updated Email Notification')
            }).catch((error) => {
                toast.error('Email Notification not updated')
                console.log(error);
            })
        }
        if (receive == 'false') {
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
        <div className="pt-5 pb-10 bg-textW grid grid-cols-12 max-sm:px-5 sm:pl-10 xl:pr-28 xl:px-20">
            <div className="col-span-12  order-1 md:order-2 flex flex-col gap-y-2 md:px-5 lg:px-10 xl:px-20 md:col-span-6 xl:col-span-9">
                <p className="col-span-12 font-frhW  text-[#0E121D] text-[1.5rem] xl:text-frhS">Choose to receive email notification</p>
                <form onSubmit={handleRadioUpdate} className='flex flex-col gap-y-5 mt-5'>
                    <RadioInput setFunction={setReceive} checked={receive == 'true' ? 'checked' : ''} radioValue="true" radioName="emailReceive" radioText="I agree to receive email notifications" />
                    <RadioInput setFunction={setReceive} checked={receive == 'false' ? 'checked' : ''} radioValue="false" radioName="emailReceive" radioText="I do not agree to receive email notifications" />
                    <div className="col-span-12 grid grid-cols-12 justify-items-end pr-2 lg:col-span-10">
                        {loading && (
                            <img
                                src={loadingIn}
                                className="mt-5 col-span-12 text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full rounded-xl"
                            />
                        )}
                        {!loading && (
                            <button
                                type="submit"
                                className="mt-5 col-span-12 text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full rounded-xl"
                            >
                                Update
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChooseEmail