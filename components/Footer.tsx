import React, { useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getRole } from '@/backend/accountBackend';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from 'next/link';
import InstagramIcon from '@mui/icons-material/Instagram';
import ConfirmModal from './ConfirmModal';
import CloseIcon from '@mui/icons-material/Close';
import { SubmitButton, TextInputRelated } from './TextInput';
import { RequiredTextLabel } from './employerComponents/jobPostTabs/RequiredTextLabel';
import { toast } from 'react-toastify';
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import FavoriteIcon from '@mui/icons-material/Favorite';
const VERIFY = process.env.NEXT_PUBLIC_VERIFY || '';

const LinkList = (props: any) => {
    return (
        <Link href={props.link || '/'} className="text-[18px] font-[400] leading-midRL text-lightGrey block cursor-pointer hover:text-gradientFirst hover:underline">
            {props.text}
        </Link>
    );
};
const Footer = () => {
    const logo = 'https://raw.githubusercontent.com/pos1234/palmjobs/main/public/images/logo.svg';
    /*     const logo = '/images/logo.svg';
     */    const [forEmp, setForEmp] = useState(false);
    const [forCan, setForCan] = useState(false);
    const [forGt, setForGt] = useState(false);
    const [userData, setUserData] = useState<any>();
    const [userRole, setUserRole] = useState('');
    const [palm, setPalm] = useState(false)
    const [support, setSupport] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [errorCode, setErrorCode] = useState(0)
    const [supportData, setSupportData] = useState({
        fullName: '',
        email: '',
        message: '',
        loading: false
    })
    const [phone, setPhone] = useState<any>();
    const openForEmp = () => {
        setForEmp(!forEmp);
    };
    const openForCan = () => {
        setForCan(!forCan);
    };
    const openForGt = () => {
        setForGt(!forGt);
    };
    const useRole = async () => {
        const role = await getRole();
        role && setUserRole(role.documents[0].userRole);
    }
    const getUserData = () => {
        if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
                localforage.getItem('userRole').then((value: any) => {
                    if (value) {
                        setUserRole(value)
                    }
                    if (!value) {
                        useRole()
                    }
                });
            });
        }

    };
    useEffect(() => {
        getUserData();
    }, []);
    const year = new Date()
    const isValidPhone = (phones: string) => {
        const result = phones && isValidPhoneNumber(phones.toString())
        return result
    }
    const isValidEmail = (email: string) => {
        // Check if the email address is valid using a regular expression.
        var regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return regex.test(email)
    }
    const handleSupport = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        if (supportData.fullName == '') {
            setErrorCode(1)
            setErrorMessage('Please enter name')
        } else if (supportData.email == '') {
            setErrorCode(2)
            setErrorMessage('Please enter email')
        } else if (supportData.email && !isValidEmail(supportData.email)) {
            setErrorCode(6)
            setErrorMessage('Invalid email')
        } else if (phone == '') {
            setErrorCode(3)
            setErrorMessage('Please enter phone')
        } else if (phone !== '' && !isValidPhone(phone)) {
            setErrorCode(5)
            setErrorMessage('Invalid phone')
        } else if (supportData.message == '') {
            setErrorCode(4)
            setErrorMessage('please enter message')
        } else {
            setSupportData({
                ...supportData, loading: true
            })
            const formData = {
                toEmail: process.env.NEXT_PUBLIC_PALM_EMAIL,
                fromEmail: process.env.NEXT_PUBLIC_PALM_EMAIL,
                subject: 'Support Me',
                fullName: supportData.fullName,
                email: supportData.email,
                phone: phone,
                message: supportData.message
            }
            try {
                fetch(`${VERIFY}/api/email/support`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData)
                }).then((res) => {
                    setSupportData({
                        fullName: '',
                        email: '',
                        message: '',
                        loading: false
                    })
                    setPhone('')
                    toast.success('Report Submitted Successfully')
                    setSupport(false)
                })
            } catch (err) {
                console.log(err);
            }

        }
    }
    return (
        <div className='flex flex-col mt-28 max-sm:px-3 '>
            <div className="xl:px-40 border-y-[1px]">
                <div className="flex flex-wrap pt-16 py-10 gap-y-7 md:gap-y-14 max-md:flex-col justify-between">
                    <div className='flex-grow'>
                        <Link href={"/"}>
                            <img src={logo} alt="palmjobs logo" className="h-16" />
                        </Link>
                    </div>
                    <div className='flex-grow flex flex-col gap-2 max-md:cursor-pointer'>
                        <div className='flex justify-between' onClick={() => setPalm(!palm)} >
                            <p className="font-[700] leading-thL text-[20px] leading-dfhL">
                                Palm Jobs
                            </p>
                            <p className="text-right md:hidden pr-3">
                                {palm == true ? (
                                    <KeyboardArrowUpIcon sx={{ fontSize: '1.5rem' }} />
                                ) : (
                                    <KeyboardArrowDownIcon sx={{ fontSize: '1.5rem' }} />
                                )}
                            </p>
                        </div>
                        <div className={` flex-col gap-3 max-md:mt-3 ${palm ? 'flex' : 'max-md:hidden md:flex'}`}>
                            <LinkList link="/about" text="About" />
                        </div>
                    </div>
                    <div className="cursor-pointer md:cursor-default flex-grow flex flex-col">
                        {/*   {(!userRole || userRole == 'employer') && ( */}
                        <div className='flex justify-between' onClick={openForEmp}>
                            <p className="font-[700] leading-thL text-[20px] leading-dfhL">
                                Employers
                            </p>
                            <p className="text-right md:hidden pr-3">
                                {forEmp == true ? (
                                    <KeyboardArrowUpIcon sx={{ fontSize: '1.5rem' }} onClick={openForEmp} />
                                ) : (
                                    <KeyboardArrowDownIcon sx={{ fontSize: '1.5rem' }} onClick={openForEmp} />
                                )}
                            </p>
                        </div>
                        {/*   )} */}
                        {userRole !== 'employer' && (
                            <div className="hidden md:flex flex-col gap-3 mt-3">
                                <LinkList link="/account" text="Post Job" />
                                <LinkList link="/account" text="Employer's Hub" />
                            </div>
                        )}
                        {userRole == 'employer' && (
                            <div className="hidden md:flex flex-col gap-3 mt-3">
                                <LinkList link="/users/employer/post" text="Post Job" />
                                <LinkList link="/users/employer/jobs" text="Dashboard" />
                            </div>
                        )}
                        {forEmp && !userRole && (
                            <div className="flex flex-col gap-3 mt-3 md:hidden ">
                                <LinkList link="/account" text="Post Job" />
                                <LinkList link="/account" text="Employer's Hub" />
                            </div>
                        )}
                        {forEmp && userRole == 'employer' && (
                            <div className="flex flex-col gap-3 mt-3 md:hidden ">
                                <LinkList link="/users/employer/" text="Post Job" />
                                <LinkList link="/users/employer/" text="Dashboard" />
                            </div>
                        )}
                    </div>
                    <div className="cursor-pointer md:cursor-default flex-grow">
                        {/*  {!userRole || userRole == 'candidate' ? ( */}
                        <div className='flex justify-between' onClick={openForCan}>
                            <p className="font-[700] leading-thL text-[20px] leading-dfhL">
                                Job Seekers
                            </p>
                            <p className="text-right pr-3 md:hidden">
                                {forCan == true ? (
                                    <KeyboardArrowUpIcon sx={{ fontSize: '1.5rem' }} onClick={openForCan} />
                                ) : (
                                    <KeyboardArrowDownIcon sx={{ fontSize: '1.5rem' }} onClick={openForCan} />
                                )}
                            </p>
                        </div>
                        <div className="hidden md:flex flex-col gap-3 mt-3 ">
                            <LinkList link="/jobs" text="Find a Job" />
                            <LinkList link="/" text="Craft Resume" />
                            {userRole == 'candidate' && <>
                                <LinkList link="/users/candidate/profile" text="Upload Resume" />
                                <LinkList link="/users/candidate/" text="My Jobs" />
                            </>
                            }
                        </div>
                        {forCan && (
                            <div className="flex flex-col gap-3 mt-3 md:hidden ">
                                <LinkList link="/jobs" text="Find a Job" />
                                <LinkList link="/" text="Carft Resume" />
                                {userRole == 'candidate' && <>
                                    <LinkList link="/users/candidate/profile" text="Upload Resume" />
                                    <LinkList link="/users/candidate/" text="My Jobs" /></>
                                }
                            </div>
                        )}
                    </div>
                    <div className="cursor-pointer md:cursor-default flex-grow">
                        <div className='flex justify-between' onClick={openForGt}>
                            <p className="font-[700] leading-thL text-[20px] leading-dfhL">
                                Here to help
                            </p>
                            <p className="text-right pr-3 md:hidden">
                                {forGt == true ? (
                                    <KeyboardArrowUpIcon sx={{ fontSize: '1.5rem' }} onClick={openForGt} />
                                ) : (
                                    <KeyboardArrowDownIcon sx={{ fontSize: '1.5rem' }} onClick={openForGt} />
                                )}
                            </p>
                        </div>
                        <div className="hidden md:flex flex-col gap-3 pt-3 text-lightGrey text-[18px] font-[400] leading-midRL">
                            <LinkList link="/faq" text="Help Center" />
                            <div className='text-lightGrey hover:text-gradientFirst hover:underline cursor-pointer' onClick={() => setSupport(!support)}>
                                Contact support
                            </div>
                        </div>
                        {forGt && (
                            <div className="flex flex-col gap-3 pt-3 text-[18px] font-[400] leading-midRL md:hidden ">
                                <LinkList link="/faq" text="Help Center" />

                                <div className='text-lightGrey hover:text-gradientFirst hover:underline cursor-pointer' onClick={() => setSupport(!support)}>
                                    Contact support
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='w-full flex justify-center gap-3 items-center'>
                        <Link className='border-[1px] rounded-full w-[40px] h-[40px] flex items-center justify-center border-black hover:border-gradientFirst' href="https://www.facebook.com/palmjobs" target="_blank" aria-label="Palm Jobs facebook page">
                            <p className='font-bold text-2xl flex justify-center items-center'>f</p>
                        </Link>
                        <Link className='border-[1px] rounded-full w-[40px] h-[40px] flex items-center justify-center border-black hover:border-gradientFirst' href="https://twitter.com/Palmjobset" target="_blank" aria-label="Palm Jobs Twitter page">
                            <img src="https://raw.githubusercontent.com/pos1234/palmjobs/main/public/icons/TwitterX.svg" alt="twitterIcon" className='w-7' />
                        </Link>
                        <Link className='border-[1px] rounded-full w-[40px] h-[40px] flex items-center justify-center border-black hover:border-gradientFirst' href="https://www.linkedin.com/company/palm-jobs/" target="_blank" aria-label="Palm Jobs LinkedIn page">
                            <LinkedInIcon sx={{ fontSize: '1.2rem' }} />
                        </Link>
                        <Link className='border-[1px] rounded-full w-[40px] h-[40px] flex items-center justify-center border-black hover:border-gradientFirst' href="https://www.linkedin.com/company/10353818?trk=prof-exp-company-name" target="_blank" aria-label="Palm Jobs LinkedIn page">
                            <InstagramIcon sx={{ fontSize: '1.2rem' }} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="my-3 flex max-md:flex-wrap gap-x-8 gap-y-3">
                <div className='flex w-full max-md:flex-wrap md:w-2/3 justify-center md:justify-end gap-x-8 gap-y-3'>
                    <p>© {year.getFullYear()} Palm Jobs. All rights reserved.</p>
                    <div className='flex max-md:w-full max-md:justify-center items-center md:justify-end'>
                        <Link href='/terms/policy' className='hover:text-gradientFirst hover:underline'>Privacy </Link>
                        <div className='text-sm flex items-end px-1'> | </div>
                        <Link href='/terms/terms' className='hover:text-gradientFirst hover:underline'> Terms</Link>
                    </div>
                </div>
                <div className='flex w-full md:w-1/2 justify-center items-center md:justify-end pr-3'>
                    <div className='self-end float-right'>
                        made with <span className='text-gradientFirst'><FavoriteIcon sx={{ fontSize: '1.2rem' }} /></span>  by
                        <Link href='https://yes.et' target='_blank' className='ml-1 hover:text-gradientFirst hover:underline'>YES</Link>
                    </div>
                </div>
            </div>
            <ConfirmModal isOpen={support} handleClose={() => setSupport(!support)}>
                <div className="mx-2 bg-textW rounded-2xl flex flex-col pt-10 w-full h-[90%] md:w-2/3 xl:w-1/3 md:mx-0">
                    <div className="col-span-12 flex justify-end pr-7">
                        <button onClick={() => setSupport(!support)}>
                            <CloseIcon sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }} className="w-8 h-8 p-2 " />
                        </button>
                    </div>
                    <form onSubmit={handleSupport} className="w-full flex flex-col h-full items-center">
                        <div className='h-full w-full overflow-y-auto overflow-x-hidden pr-2 thinScrollBar flex flex-col items-center h-[78%] sm:h-[80%] pb-5'>
                            <p className='font-[600] text-[24px]'>Help Form</p>
                            <div className='flex gap-3'>
                                <div className='flex-grow flex flex-col gap-5'>
                                    <RequiredTextLabel text='Please enter full name' />
                                    <TextInputRelated errorMessage={errorCode == 1 && errorMessage} value={supportData.fullName} dataDistruct={supportData} setFunction={setSupportData} change="fullName" />
                                    <RequiredTextLabel text='Please enter email' />
                                    <TextInputRelated errorMessage={(errorCode == 2 || errorCode == 6) && errorMessage} value={supportData.email} dataDistruct={supportData} setFunction={setSupportData} change="email" />
                                    <RequiredTextLabel text='Please enter phone' />
                                    <PhoneInput
                                        defaultCountry="ET"
                                        placeholder="Enter phone number"
                                        value={phone}
                                        onChange={setPhone}
                                        className={`phoneInput h-12 pl-5 bg-white rounded-lg border-[1px] focus:ring-gradientFirst focus:border-0 w-full md:w-96 
                    ${errorCode == 5 || errorCode == 3 ? 'border-red-500' : 'border-gray-200'}
                    `}
                                    />
                                    {(errorCode == 5 || errorCode == 3) && <p className="text-red-500 text-[13px] mt-2">{errorMessage}</p>}
                                    <RequiredTextLabel text='Additional message' />
                                    <textarea value={supportData.message} onChange={(e) => {
                                        if (e.currentTarget.value.length <= 200) {
                                            setSupportData({ ...supportData, message: e.currentTarget.value })
                                        }
                                    }} cols={30} rows={20} className='sm:w-[376px] rounded-lg resize-none h-52 focus:border-gradientFirst focus:ring-0' placeholder='Additional Message'></textarea>
                                    {errorCode == 4 && <p className="text-red-500 text-[13px] mt-2">{errorMessage}</p>}
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex justify-center pt-3'>
                            <div className='w-80'>
                                <SubmitButton loading={supportData.loading} buttonText="Submit" />
                            </div>
                        </div>
                    </form>
                </div>
            </ConfirmModal>
        </div >
    );
};

export default Footer;
