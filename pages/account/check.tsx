'use client'
import { defineRole, getAccount, getRole } from '@/backend/accountBackend'
import React, { useState, useEffect } from 'react'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { useRouter } from 'next/router';

const check = () => {
    const [loading, setLoading] = useState(true)
    const [userRole, setUserRole] = useState('')
    const [getJob, setGetJob] = useState(false)
    const [hireTalent, setHireTalent] = useState(false)
    const router = useRouter()
    useEffect(() => {
        getRole().then((res) => {
            if (res?.total == 0) {
                setLoading(false)
            } else {
                router.push('/jobs')
            }
        })
    }, [])
    const handleRoleUpdate = () => {
        getRole().then((res) => {
            defineRole(res?.documents[0].userId, userRole).then((res) => {
                res && router.push('/jobs')
            }).catch((error) => {
                console.log(error);
            })
        })
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='w-96 h-96 shadow-xl flex items-center justify-center flex-col gap-10'>
                {
                    loading && <div>
                        <p className='xl font-[600]'>Setting Up Your Account</p>
                        <img src="/images/loading.svg" alt="loadingImage" />
                    </div>
                }
                {
                    !loading &&
                    <div className='px-5 sm:px-10 gap-5 flex flex-col w-full'>
                        <p className='xl font-[600]'>Please choose one of these to continue.</p>
                        <div className="bg-[#FAFAFA] w-full flex p-2 rounded-lg gap-2 max-sm:flex-wrap sm:h-[8rem]">
                            <div
                                onClick={() => {
                                    setGetJob(true);
                                    setHireTalent(false);
                                    setUserRole('candidate')
                                }}
                                className={
                                    getJob
                                        ? 'w-full rounded-lg text-textW bg-gradient-to-r from-gradientFirst rounded-lg to-gradientSecond flex gap-x-3 text-left p-3 h-[5rem] items-left sm:h-[7rem] sm:flex-grow sm:flex-col sm:justify-between'
                                        : 'w-full text-[#141417] rounded-lg hover:text-textW cursor-pointer hover:bg-gradient-to-r hover:from-gradientFirst hover:to-gradientSecond bg-textW flex gap-x-3 text-left p-3 h-[5rem] items-left sm:h-[7rem] sm:w-flex-grow sm:flex-col sm:justify-between'
                                }
                            >
                                <BusinessCenterOutlinedIcon />
                                <p>Get a job</p>
                            </div>
                            <div
                                onClick={() => {
                                    setGetJob(false);
                                    setHireTalent(true);
                                    setUserRole('employer')

                                }}
                                className={
                                    hireTalent
                                        ? 'w-full rounded-lg text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond flex gap-x-3 text-left p-3 h-[5rem] items-left sm:h-[7rem] sm:flex-grow sm:flex-col sm:justify-between'
                                        : 'w-full text-[#141417] rounded-lg hover:text-textW cursor-pointer hover:bg-gradient-to-r hover:from-gradientFirst hover:to-gradientSecond bg-textW flex gap-x-3 text-left p-3 h-[5rem] items-left sm:h-[7rem] sm:flex-grow sm:flex-col sm:justify-between'
                                }
                            >
                                <PersonAddAltOutlinedIcon />
                                <p>Hire talent</p>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            {!getJob && !hireTalent && (
                                <div className="bg-gray-100 text-gray-600 flex items-center justify-center h-16 w-full sm:w-60 rounded-lg">
                                    Continue
                                </div>
                            )}
                            {(getJob || hireTalent) && (
                                <button
                                    onClick={handleRoleUpdate}
                                    className="bg-black text-textW flex items-center justify-center h-16 w-full sm:w-60 rounded-lg"
                                >
                                    Continue
                                </button>
                            )}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default check