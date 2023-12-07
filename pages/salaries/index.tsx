import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import SalarySurvey from '@/components/SalarySurvey';
import Slider from '@/components/Slider'
import Link from 'next/link'
import React, { useState } from 'react'

const Salaries = () => {
    const [tip, setTip] = useState(false)
    return (
        <>
            <div className="flex flex-col">
                <Navigation />
                <div className='w-full flex gap-5 pl-3 font-[500] pt-10 md:hidden'>
                    <p onClick={() => setTip(!tip)} className={`border-b-[3px] pb-2 ${tip ? 'border-b-textW hover:border-b-gradientFirst cursor-pointer' : 'border-b-gradientFirst'}`}>Survey</p>
                    <p onClick={() => setTip(!tip)} className={`border-b-[3px] pb-2 ${tip ? 'border-b-gradientFirst' : 'border-b-textW hover:border-b-gradientFirst cursor-pointer'}`}>Tip</p>
                </div>
                <div className='flex relative overflow-hidden gap-3 h-screen pt-10 md:pt-20 xl:px-40'>
                    <div className={`border-2 rounded-md h-screen overflow-y-auto thinScrollBar ${tip ? 'max-md:hidden' : 'flex-grow'}`}>
                        <SalarySurvey />
                    </div>
                    <div className={`flex items-center flex-col pt-16 surveryBack px-4 text-center sm:w-1/3 lg:w-1/4 ${tip ? 'max-md:flex-grow' : 'max-md:hidden'}`}>
                        <img src="/images/salaryTip.svg" alt="" className='w-[180px] h-[147px]' />
                        <p className='font-[600] text-[27px] mt-10 mb-3'>Salary Survey</p>
                        <p className='font-[400] text-left'>Join forces with your peers and contribute to our Salary Survey. Your valuable insights help ensure everyone, from job seekers to employers, has access to reliable and current salary data. Together, we can foster a transparent and fair job market. Share your details, and let's build a resource that benefits all professionals.</p>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Salaries