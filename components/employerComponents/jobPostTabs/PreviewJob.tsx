import React, { use, useEffect, useRef, useState } from 'react'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CloseIcon from '@mui/icons-material/Close';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import EuroIcon from '@mui/icons-material/Euro';
import AttachMoneyOutlined from '@mui/icons-material/AttachMoneyOutlined';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LaunchIcon from '@mui/icons-material/Launch';
import ConfirmModal from '@/components/ConfirmModal';
import JobImage from '@/components/JobImage';
import { fetchSinglePostedJobs } from '@/backend/employerBackend';
import { useJobPostContext } from '@/contextApi/jobPostData';
const SmallLists = (props: any) => {
    return <li className="inline bg-[#FAFAFA] text-xs text-gradientFirst rounded-md p-2 px-3 sm:px-2 sm:py-1 md:max-lg:px-1.5 md:max-lg:py-2 xl:py-2">
        {props.icon}
        <span className='text-[#20262E]'>{props.items}</span>
    </li>
}
const PreviewJob = (props: any) => {
    const { firstTabData, secondTabData, thirdTabData, fourthTabData } = useJobPostContext()
    const [company, setCompany] = useState(false)
    const parentRef = useRef<HTMLDivElement>(null);
    const handleParentClick = () => {
        props.setOpenModal(false)
    };
    const handleChildClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };
    return (
        <ConfirmModal isOpen={props.openModal} handleClose={() => {
            props.setOpenModal(!props.openModal);
        }}
        >
            <div ref={parentRef} onClick={handleParentClick} className='w-screen h-screen p-5 flex items-center justify-center md:p-10 lg:px-20 xl:px-40 xl:py-10'>
                <div onClick={handleChildClick} className='bg-textW w-full h-full rounded-2xl p-5 sm:p-10'>
                    <div className='flex flex-wrap h-full gap-6'>
                        <div className='max-md:max-h-96 overflow-y-auto w-full flex gap-5 flex-grow md:w-1/2 h-full order-2 md:order-1 overflow-hidden thinScrollBar'>
                            <div className="w-full flex flex-col gap-y-5 bg-textW pt-5 z-[0]  rounded-t-xl ">
                                <div className='px-6 border-b-2 flex flex-col gap-y-4 pb-8'>
                                    {
                                        props.companyData && <div className='flex items-center gap-3'>
                                            <JobImage
                                                id={props.companyData.employerId}
                                                className="rounded-full h-12 w-12"
                                            />
                                            {props.companyData.companyName && (
                                                <p className="text-[12px] text-darkBlue sm:text-fhS xl:text-[1rem]">
                                                    {props.companyData.companyName}
                                                </p>
                                            )}
                                        </div>
                                    }
                                    <div className="flex flex-col max-sm:pl-3 sm:pl-2 xl:pl-1">
                                        {firstTabData.jobTitle && (
                                            <p className="text-darkBlue font-midRW text-[16px] sm:font-fhW sm:text-dfvhS xl:text-[1.5rem]">
                                                {firstTabData.jobTitle}
                                            </p>
                                        )}
                                        {firstTabData.location && (
                                            <p className="text-fadedText max-sm:text-[14px] sm:block">
                                                <PinDropOutlinedIcon
                                                    sx={{ fontSize: '1rem', marginTop: '-0.2rem' }}
                                                />
                                                {firstTabData.location}
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-[10px] flex md:text-[11px] md:mt-1 md:text-[0.55rem] lg:text-[0.8rem] xl:text-[0.6rem] gap-3 flex-wrap">
                                        {secondTabData.workType &&
                                            <SmallLists icon={<img src='/icons/suitCase.svg' className='inline' />}
                                                items={secondTabData.workType} />
                                        }
                                        {(secondTabData.minSalary || secondTabData.maxSalary) && (
                                            <SmallLists icon={secondTabData.currency == 'euro' ? (
                                                <EuroIcon
                                                    sx={{ fontSize: '1rem' }}
                                                    className="-mt-0.5 mr-1"
                                                />
                                            ) : secondTabData.currency == 'usd' ? (
                                                <AttachMoneyOutlined
                                                    sx={{ fontSize: '1rem' }}
                                                    className="-mt-0.5 mr-1"
                                                />
                                            ) : secondTabData.currency == 'gpb' ? (
                                                <CurrencyPoundIcon
                                                    sx={{ fontSize: '1rem' }}
                                                    className="-mt-0.5 mr-1"
                                                />
                                            ) : secondTabData.currency == 'rnp' ? (
                                                <CurrencyRupeeIcon
                                                    sx={{ fontSize: '1rem' }}
                                                    className="-mt-0.5 mr-1"
                                                />
                                            ) : (
                                                <span className="text-[7px] mr-1">ETB</span>
                                            )}
                                                items={!secondTabData.minSalary && secondTabData.maxSalary
                                                    ? secondTabData.maxSalary
                                                    : secondTabData.minSalary && !secondTabData.maxSalary
                                                        ? secondTabData.minSalary
                                                        : secondTabData.minSalary + '-' + secondTabData.maxSalary}
                                            />
                                        )}
                                    </div>
                                    <div className='flex gap-5'>
                                        {fourthTabData.externalLink ? (
                                            <div
                                                className='bg-gradientFirst text-textW w-[195px] h-[40px] cursor-pointer rounded-[4px] flex items-center justify-center hover:border-b-4 hover:border-b-black buttonBounce'
                                            >
                                                Apply <LaunchIcon sx={{ fontSize: '1rem' }} />
                                            </div>
                                        ) : fourthTabData.emailSent ? (
                                            <div
                                                className='bg-gradientFirst text-textW w-[195px] h-[40px] cursor-pointer rounded-[4px] flex items-center justify-center hover:border-b-4 hover:border-b-black buttonBounce'                                >
                                                Apply <AlternateEmailIcon sx={{ fontSize: '1rem' }} />
                                            </div>
                                        ) : (
                                            <div
                                                className='bg-gradient-to-r from-[#00A82D] to-[#0CBC8B] text-textW w-[195px] h-[40px] cursor-pointer rounded-[4px] flex items-center justify-center hover:border-b-4 hover:border-b-black buttonBounce'                                >
                                                Easy Apply
                                            </div>
                                        )}
                                        <div className='flex items-center cursor-pointer text-gray-500 hover:text-gradientFirst'>
                                            <BookmarkBorderOutlinedIcon
                                                sx={{ fontSize: '2rem' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex px-6 flex-col gap-5'>
                                    <div className="flex gap-5">
                                        <div
                                            className={`font-[500] flex items-center cursor-pointer text-[18px] border-b-[0.2rem] pb-2 ${company == true ? 'border-b-textW text-gray-500 hover:border-b-gradientFirst' : 'border-b-gradientFirst'}`}
                                            onClick={() => setCompany(false)}
                                        >
                                            Job Description
                                        </div>
                                        <div
                                            className={`font-[500] flex items-center cursor-pointer text-[18px] border-b-[0.2rem] pb-2 ${company !== true ? 'border-b-textW text-gray-500 hover:border-b-gradientFirst' : 'border-b-gradientFirst'}`}
                                            onClick={() => {
                                                setCompany(true);
                                            }}
                                        >
                                            Company
                                        </div>
                                    </div>
                                    {!company &&
                                        <div className="max-h-48 overflow-y-auto thinScrollBar">
                                            <div className='flex flex-wrap gap-3'>
                                                <div className='flex w-full gap-2'>
                                                    <LocalFireDepartmentIcon className='text-gradientFirst' />
                                                    <p className='font-[600]'> Skills</p>
                                                </div>
                                                {thirdTabData.skillArray && thirdTabData.skillArray.map((skill: string, index: number) => {
                                                    return <div
                                                        className="min-w-36 w-auto h-8 font-adW text-adS leading-adL bg-skillColor text-center flex px-7 items-center text-gradientFirst"
                                                        key={index}
                                                    >{skill}
                                                    </div>
                                                })}
                                            </div>
                                            <div className='flex flex-wrap gap-5 mt-5'>
                                                <div className='flex w-full gap-2'>
                                                    <img src='/icons/plantInPot.svg' />
                                                    <p className='font-[600]'> Job Description</p>
                                                </div>
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: thirdTabData.jobDesc }}
                                                    className="text-[14px] text-[#727272] min-h-[180px]"
                                                />
                                            </div>
                                        </div>}
                                    {company && props.companyData && (
                                        <div className="max-h-48 overflow-y-auto thinScrollBar">
                                            <p className="font-thW text-frhS">Company's Overview</p>
                                            <div className='flex gap-3 flex-wrap justify-between pb-5'>
                                                <div className='flex flex-col gap-y-5'>
                                                    {
                                                        props.companyData.sector && <div className='flex gap-5 '>
                                                            <p className='font-bold text-lightGrey text-md'>Sector</p>
                                                            <p className='text-lightGrey'>{props.companyData.sector}</p>
                                                        </div>
                                                    }
                                                    {
                                                        props.companyData.location && <div className='flex gap-5 '>
                                                            <p className='font-bold text-lightGrey text-md'>location</p>
                                                            <p className='text-lightGrey'>{props.companyData.location}</p>
                                                        </div>
                                                    }
                                                </div>
                                                <div className='flex flex-col gap-y-5'>
                                                    {
                                                        props.companyData.noOfEmployee && <div className='flex gap-5 '>
                                                            <p className='font-bold text-lightGrey text-md'>Size</p>
                                                            <p className='text-lightGrey'>{props.companyData.noOfEmployee}</p>
                                                        </div>
                                                    }
                                                    {
                                                        props.companyData.websiteLink && <div className='flex gap-5 '>
                                                            <p className='font-bold text-lightGrey text-md'>Website</p>
                                                            <a className='text-lightGrey' href={props.companyData.websiteLink} target='_blank'>view <LaunchIcon /></a>
                                                        </div>
                                                    }</div>
                                            </div>
                                            <div
                                                dangerouslySetInnerHTML={{ __html: props.companyData.description }}
                                                className="text-midRS text-lightGrey overflow-y-auto hideScrollBar min-h-96 max-h-96 overflow-y-auto hideScrollBar"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/*                                 <Share openShare={openShare} setOpenShare={setOpenShare} link={props.jobDetails.$id} />
 */}

                        </div>
                        <div className='bg-gray-100 flex-grow flex h-full  px-5 pt-5 max-md:pb-2 gap-7 md:flex-col md:flex md:w-1/5 order-1 md:order-2'>
                            <div className=' flex justify-end max-md:order-3 md:w-full'>
                                <div className='cursor-pointer hover:text-gradientFirst' onClick={() => props.setOpenModal(false)}>
                                    <CloseIcon />
                                </div>
                            </div>
                            <div className=' flex flex-wrap justify-center items-center md:w-full max-md:order-1'>
                                <img src='/images/NotFound.svg' className='w-20 h-20 md:w-1/2 md:h-64' />
                            </div>
                            <div className=' flex-grow max-md:order-2 items-center justify-center flex flex-col md:text-center'>
                                <p className='font-[600] md:text-xl'>This is a preview of what people may see</p>
                                <p className='text-gray-500 max-md:text-sm'>Your job post may look slightly different when it is live</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </ConfirmModal>
    )
}

export default PreviewJob