import React, { useEffect, useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { getCandidateDocument } from '@/backend/candidateBackend';
import Link from 'next/link';
import { useGlobalContext } from '@/contextApi/userData';

const CheckProfileCompletion = () => {
    const [visible, setVisible] = useState(false)
    const [profilePercent, setProfilePercent] = useState(0);
    const { userDetail, userRole } = useGlobalContext()
    useEffect(() => {
        var percent = 0;
        if (userDetail) {
            if (userDetail.phoneNumber) {
                percent += 20;
                setProfilePercent(percent)
            }
            if (userDetail.skills && userDetail.skills.length !== 0) {
                percent += 20;
                setProfilePercent(percent)
            }
            if (userDetail.educations && JSON.parse(userDetail.educations).length !== 0) {
                percent += 20;
                setProfilePercent(percent)
            }
            if (userDetail.resumeId) {
                percent += 20;
                setProfilePercent(percent)
            }
            if (userDetail.address) {
                percent += 20;
                setProfilePercent(percent)
            }
            percent > 0 && percent < 100 && setVisible(true)
        }
    }, [userDetail])
    return (
        <div className={visible ? 'cursor-pointer max-h-[20rem] bg-textW flex flex-wrap py-1 px-4 border-2 rounded-xl xl:px-7 xl:py-3 pb-5' : 'hidden'}>
            <div className='w-full flex justify-end cursor-pointer hover:text-gradientFirst mb-2' onClick={() => setVisible(false)}>
                <CloseOutlinedIcon />
            </div>
            <div className='flex flex-grow'>
                <div className={`border-[15px] w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center font-bold
                ${profilePercent == 20 ? 'border-t-green-500' : profilePercent == 40 ? 'border-t-green-500 border-r-green-500' :
                        profilePercent == 60 || profilePercent == 80 ? 'border-t-green-500 border-r-green-500 border-b-green-500' : ''}
                `}>
                    {profilePercent}%
                </div>
            </div>
            <div className='flex flex-col'>
                <p className='font-[500] xl:text-[20px] mb-[8px]'>Complete Your Profile</p>
                <p className='font-[400] xl:text-[20px] mb-[30px]'>Let employers find you</p>
                <Link href="/users/candidate/profile" className='bg-black text-textW h-[42px] self-end w-[167px] rounded-[3px] cursor-pointer flex items-center justify-center'>Profile</Link>
            </div>

        </div>
    )
}

export default CheckProfileCompletion