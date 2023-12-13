import { useEffect, useState } from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getRole } from '@/backend/accountBackend';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from 'next/link';
import InstagramIcon from '@mui/icons-material/Instagram';
const LinkList = (props: any) => {
    return (
        <Link href={props.link || '/'} className="text-[18px] font-[400] leading-midRL text-lightGrey block cursor-pointer hover:text-gradientFirst hover:underline">
            {props.text}
        </Link>
    );
};
const Footer = () => {
    const logo = '/images/logo.svg';
    const [forEmp, setForEmp] = useState(false);
    const [forCan, setForCan] = useState(false);
    const [forGt, setForGt] = useState(false);
    const [userData, setUserData] = useState<any>();
    const [userRole, setUserRole] = useState('');
    const [palm, setPalm] = useState(false)
    const openForEmp = () => {
        setForEmp(!forEmp);
    };
    const openForCan = () => {
        setForCan(!forCan);
    };
    const openForGt = () => {
        setForGt(!forGt);
    };
    const getUserData = async () => {
        const role = await getRole();
        role && setUserRole(role.documents[0].userRole);
    };
    useEffect(() => {
        getUserData();
    }, []);
    const year = new Date()
    return (
        <div className='flex flex-col mt-28 max-sm:px-3 '>
            <div className="xl:px-40 border-y-[1px]">
                <div className="flex flex-wrap pt-16 py-10 gap-y-7 md:gap-y-14 max-md:flex-col justify-between">
                    <div className='flex-grow'>
                        <img src={logo} alt="palmjobs logo" className="h-16" />
                    </div>
                    <div className='flex-grow flex flex-col justify-between max-md:cursor-pointer'>
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
                            <LinkList link="/faq" text="FAQ" />
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
                            <div>
                                Help center
                            </div>
                            <div>
                                Contact support
                            </div>
                            {/* <p>
                                Suite 301E | Bethlhem Plaza, Megenagna, <br />
                                Addis Ababa, Ethiopia
                            </p>
                            <p>+251 965636465</p>
                            <p>careers@palmjobs.et</p> */}
                        </div>
                        {forGt && (
                            <div className="flex flex-col gap-3 pt-3 text-[18px] font-[400] leading-midRL md:hidden ">
                                <p>
                                    Suite 301E | Bethlhem Plaza, Megenagna, <br />
                                    Addis Ababa, Ethiopia
                                </p>
                                <p>
                                    +251 965636465
                                </p>
                                <p>
                                    careers@palmjobs.et
                                </p>
                            </div>
                        )}
                    </div>
                    <div className='w-full flex justify-center gap-3 items-center'>
                        <Link className='border-[1px] rounded-full w-[40px] h-[40px] flex items-center justify-center border-black hover:border-gradientFirst' href="https://www.facebook.com/palmjobs" target="_blank" aria-label="Palm Jobs facebook page">
                            <p className='font-bold text-2xl flex justify-center items-center'>f</p>
                        </Link>
                        <Link className='border-[1px] rounded-full w-[40px] h-[40px] flex items-center justify-center border-black hover:border-gradientFirst' href="https://twitter.com/Palmjobset" target="_blank" aria-label="Palm Jobs Twitter page">
                            <img src="/icons/TwitterX.svg" alt="twitterIcon" className='w-7' />
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
                <div className='flex md:w-2/3 justify-end gap-x-8 gap-y-3'>
                    <p>© Palm Jobs {year.getFullYear()}</p>
                    <div className='flex'>
                        <Link href='/terms/policy' className='hover:text-gradientFirst hover:underline'>Privacy </Link>
                        <div className='text-sm flex items-end px-1'> / </div>
                        <Link href='/terms/terms' className='hover:text-gradientFirst hover:underline'> Terms</Link>
                    </div>
                </div>
                <div className='flex md:w-1/2 justify-end pr-3'>
                    <div className='self-end float-right'>
                        made with <span className='text-gradientFirst'>❤</span>  by
                        <Link href='https://yes.et' target='_blank' className='ml-1 hover:text-gradientFirst hover:underline'>YES</Link>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Footer;
