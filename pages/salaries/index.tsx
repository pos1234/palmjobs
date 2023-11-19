import SalarySurvey from '@/components/SalarySurvey';
import Slider from '@/components/Slider'
import Link from 'next/link'
import React from 'react'

const Salaries = () => {
    const logo = '/images/logo.svg';

    return (
        <>
            <div className="flex max-md:flex-wrap relative overflow-hidden h-screen">
                <div className="flex-1 h-screen overflow-y-auto thinScrollBar">
                    <SalarySurvey />
                </div>
                <div className='flex-1 flex items-center flex-col pt-16 surveryBack'>
                    <img src="/images/salaryTip.svg" alt="" className='w-[180px] h-[147px]' />
                    <p className='font-[600] text-[27px] mt-10 mb-3'>Salary Survey</p>
                    <p className='font-[400]'>find and compare salary information</p>
                </div>

            </div>
        </>
    )
}

export default Salaries