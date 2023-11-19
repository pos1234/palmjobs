import React, { useEffect, useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { getCandidateDocument } from '@/lib/candidateBackend';
import Link from 'next/link';

const CheckProfileCompletion = () => {
    const [visible, setVisible] = useState(false)
    const [profilePercent, setProfilePercent] = useState(0);
    useEffect(() => {
        getCandidateDocument().then((res: any) => {
            var percent = 0;
            if (res) {
                if (!res.documents[0].phoneNumber) {
                    percent += 20;
                    setProfilePercent(percent)
                }
                if (res?.documents[0].skills.length == 0) {
                    percent += 20;
                    setProfilePercent(percent)
                }
                if (res?.documents[0].educations.length !== 0) {
                    percent += 20;
                    setProfilePercent(percent)
                }
                if (!res?.documents[0].resumeId) {
                    percent += 20;
                    setProfilePercent(percent)
                }
                if (!res?.documents[0].address) {
                    percent += 20;
                    setProfilePercent(percent)
                }
                percent > 0 && percent < 100 && setVisible(true)
            }
            /* phoneNumber, skills, education,resumeid,address */

        }).catch((error) => {
            setVisible(false)
        })
    }, [])
    return (
        <div className={visible ? 'cursor-pointer max-h-[18rem] bg-textW flex flex-wrap py-1 px-4 border-2 rounded-xl xl:px-7 xl:py-3 pb-5' : 'hidden'}>
            <div className='w-full flex justify-end cursor-pointer hover:text-gradientFirst mb-2' onClick={() => setVisible(false)}>
                <CloseOutlinedIcon />
            </div>
            <div className='flex flex-grow'>
                <div className={`border-[15px] w-28 h-28 rounded-full flex items-center justify-center font-bold
                ${profilePercent == 20 ? 'border-t-green-500' : profilePercent == 40 ? 'border-t-green-500 border-r-green-500' :
                        profilePercent == 60 || profilePercent == 80 ? 'border-t-green-500 border-r-green-500 border-b-green-500' : ''}
                `}>
                    {profilePercent}%
                </div>
            </div>
            <div className='flex flex-col'>
                <p className='font-[500] text-[20px] mb-[8px]'>Complete Your Profile</p>
                <p className='font-[400] text-[20px] mb-[30px]'>Let employers find you</p>
                <Link href="/users/candidate/profile" className='bg-black text-textW h-[42px] self-end w-[167px] rounded-[3px] cursor-pointer flex items-center justify-center'>Profile</Link>
            </div>

        </div>
    )
}

export default CheckProfileCompletion