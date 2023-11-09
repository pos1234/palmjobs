import SalarySurvey from '@/components/SalarySurvey';
import Slider from '@/components/Slider'
import Link from 'next/link'
import React from 'react'

const Salaries = () => {
    const logo = '/images/logo.svg';

    return (
        <>
            <div className="flex max-md:flex-wrap grid-cols-12 overflow-y-auto relative  sm:pb-5 h-screen">
                <div className='w-full md:w-1/2 flex flex-col max-md:gap-10 items-center rounded-tr-[5.75rem] rounded-br-[5.75rem] order-2 max-md:mt-10 md:col-span-6 md:order-1'>
                    <div className=' h-full bg-skillColor rounded-tr-[5.75rem] rounded-br-[5.75rem] md:fixed'>
                        <div className={/* forgotPassword == false ? 'w-full flex justify-center' : */ 'w-full flex justify-center mt-10 sm:mt-28'}>
                            <Link href="/">
                                <img src={logo} className=" w-[15rem]" />
                            </Link>
                        </div>
                        <div
                            className='loginCoursel w-full  lg:pt-[5%] flex justify-center md:h-[45%] lg:h-[75%] xl:h-[80%]'
                        >
                            <Slider />
                        </div>
                    </div>
                </div>
                <div className="w-full max-md:px-3 md:w-1/2 order-1 justify-center md:order-2 flex flex-col gap-y-5 md:px-5 lg:px-10 xl:px-20 md:col-span-6 pt-0 employerBack">
                    <SalarySurvey />
                </div>
            </div>
        </>
    )
}

export default Salaries