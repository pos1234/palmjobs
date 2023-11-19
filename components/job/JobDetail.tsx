import React, { useEffect, useState } from 'react'
import Share from '../Share'
import CloseIcon from '@mui/icons-material/Close';
import JobImage from '../JobImage';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import SpaIcon from '@mui/icons-material/Spa';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import EuroIcon from '@mui/icons-material/Euro';
import AttachMoneyOutlined from '@mui/icons-material/AttachMoneyOutlined';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import { alreadySaved, getCandidateDocument, saveJobs, } from '@/lib/candidateBackend'
import { getAccount, getRole } from '@/lib/accountBackend';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { getProfileData } from '@/lib/employerBackend';
import ApplyToJob from '../candidateProfileComponents/ApplyToJobs';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

const SmallLists = (props: any) => {
    return <li className="inline flex gap-1 bg-[#FAFAFA] text-xs text-gradientFirst rounded-md p-2 px-3 sm:px-2 sm:py-1 md:max-lg:px-1.5 md:max-lg:py-2 xl:py-2">
        {props.icon}
        <span className='text-[#20262E]'>{props.items}</span>
    </li>
}
const VERIFY = process.env.NEXT_PUBLIC_VERIFY || '';


const JobDetail = (props: any) => {
    const [savedJobId, setSavedJobId] = useState<any[]>([]);
    const [savedJobs, setSavedJobs] = useState<any[]>([]);
    const [allLoading, setAllLoading] = useState(false);
    const [applyEmp, setApplyEmp] = useState(false);
    const [jobTitle, setJobTitle] = useState('');
    const [userData, setUserData] = useState<any>();
    const [userRole, setUserRole] = useState('');
    const [userId, setUserId] = useState('')
    const [apply, setApply] = useState(false);
    const [applyJobId, setApplyJobId] = useState('');
    const [applyEmployerId, setApplyEmployerId] = useState('');
    const [openShare, setOpenShare] = useState(false);
    const router = useRouter();
    const parseToArray = (text: string) => {
        const arrayValue = JSON.parse(text)
        return arrayValue
    }
    const getUserData = async () => {
        const userInfo = await getAccount();
        if (userInfo !== 'failed') {
            setUserId(userInfo.$id)
            setUserData(userInfo);
            const role = await getRole();
            setUserRole(role && role.documents[0].userRole);
        }
    };
    useEffect(() => {
        getUserData();
    }, []);
    const handleApply = async (jobId: string, employerId: string, jobTitle: string) => {
        setApply(false);
        if (userRole == 'candidate') {
            setApply(true);
            setApplyJobId(jobId);
            setApplyEmployerId(employerId);
            setJobTitle(jobTitle);
        }
        if (userRole == 'employer') {
            setApplyEmp(true);
        } if (!userRole) {
            typeof window !== 'undefined' && router.push('/account');
        }
    }
    const handleSaveJob = async (id: string) => {
        if (userRole == 'candidate') {
            const checkSaved = alreadySaved(userId, id);
            checkSaved.then((rem: any) => {
                if (rem.total == 0) {
                    toast.success('Successfully Saved Job');
                    saveJobs(userId, id);
                } /* else {
                    toast.error('Job Already saved');
                } */
            });
        }
        if (!userRole) {
            typeof window !== 'undefined' && router.push('/account');
        }
    };
    const links = <a href={VERIFY}>Abebe</a>
    const handleEmailApply = (email: string) => {
        const subject = `Application for ${jobTitle} Position`;
        const body = `Dear ${props.companName} Team.\n\n
        I hope this message finds you well. My name is yonas abebe, and I came across the ${jobTitle} position on Palm Jobs.
        I am highly interested in this opportunity and believe my skills and experiences make me an excellent fit for the role.\n\n
        Attached, please find my resume and cover letter for your consideration. I would love the chance to further discuss my qualifications with you in an interview.
        \n
        Thank you for considering my application. I look forward to the possiblity of working together.
        \n
        Best regards,\n
        yonas abebe\n
        +251 91234567
        \n\n\n\n
        <p>Delivered by <a href=${VERIFY}>Palm Jobs</a>, where opportunities grow.</p>
`
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };
    return (
        <div
            className={
                props.openJobDetail == true
                    ? 'col-span-12 flex border-2 pb-2 rounded-xl'
                    : 'col-span-12 hidden md:flex border-2 pb-2 rounded-xl'
            }
        >
            <div className=" w-full flex flex-col">
                {
                    props.single !== true && <p
                        onClick={() => props.setOpenJobDetail(false)}
                        className="p-3 border-2 rounded-xl flex justify-center cursor-pointer m-5 md:hidden"
                    >
                        Back To Search
                    </p>
                }
                <div className="flex flex-col gap-y-5 bg-textW pt-5 z-[0] rounded-t-xl ">
                    <div className='px-6 border-b-2 flex flex-col gap-y-3 pb-5'>
                        <div className='flex items-center gap-3'>
                            <JobImage
                                id={props.jobDetails.employerId}
                                className="rounded-full h-8 w-8"
                            />
                            {props.companyName && (
                                <p className="text-[12px] text-darkBlue sm:text-fhS xl:text-[1rem]">
                                    {props.companyName}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col">
                            {props.jobDetails.jobTitle && (
                                <p className="font-[600] sm:font-fhW sm:text-dfvhS text-[1.5rem]">
                                    {props.jobDetails.jobTitle}
                                </p>
                            )}
                            {props.jobDetails.jobLocation && (
                                <p className="text-gray-400 text-[1rem] flex items-center gap-1">
                                    <PlaceOutlinedIcon
                                        sx={{ fontSize: '1rem' }}
                                    />
                                    {props.jobDetails.jobLocation}
                                </p>
                            )}
                        </div>
                        <ul className="text-[10px] flex md:text-[11px] md:mt-1 md:text-[0.55rem] lg:text-[0.8rem] xl:text-[0.6rem] gap-3 flex-wrap">
                            {props.jobDetails.jobType &&
                                <SmallLists icon={<img src='icons/suitCase.svg' />}
                                    items={props.jobDetails.jobType} />
                            }
                            {(props.jobDetails.minSalary || props.jobDetails.maxSalary) && (
                                <SmallLists icon={props.jobDetails.currency == 'euro' ? (
                                    <EuroIcon
                                        sx={{ fontSize: '1rem' }}
                                        className="-mt-0.5 mr-1"
                                    />
                                ) : props.jobDetails.currency == 'usd' ? (
                                    <AttachMoneyOutlined
                                        sx={{ fontSize: '1rem' }}
                                        className="-mt-0.5 mr-1"
                                    />
                                ) : props.jobDetails.currency == 'gpb' ? (
                                    <CurrencyPoundIcon
                                        sx={{ fontSize: '1rem' }}
                                        className="-mt-0.5 mr-1"
                                    />
                                ) : props.jobDetails.currency == 'rnp' ? (
                                    <CurrencyRupeeIcon
                                        sx={{ fontSize: '1rem' }}
                                        className="-mt-0.5 mr-1"
                                    />
                                ) : (
                                    <span className="text-[7px] mr-1">ETB</span>
                                )}
                                    items={!props.jobDetails.minSalary && props.jobDetails.maxSalary
                                        ? props.jobDetails.maxSalary
                                        : props.jobDetails.minSalary && !props.jobDetails.maxSalary
                                            ? props.jobDetails.minSalary
                                            : props.jobDetails.minSalary + '-' + props.jobDetails.maxSalary}
                                />
                            )}
                            {props.jobDetails.datePosted && (
                                <SmallLists
                                    icon={
                                        <img src='icons/hourGlassUp.svg' />
                                    }
                                    items={new Date(props.jobDetails.datePosted)
                                        .toLocaleDateString('en-GB')
                                        .replace(/\//g, '-')}
                                />
                            )}
                            {props.jobDetails.applicationDeadline && (
                                <SmallLists
                                    icon={<img src='icons/hourGlassDown.svg' />}
                                    items={new Date(props.jobDetails.applicationDeadline)
                                        .toLocaleDateString('en-GB')
                                        .replace(/\//g, '-')}
                                />
                            )}
                        </ul>
                        <div className='flex gap-5'>
                            {props.jobDetails.externalLink ? (
                                <a
                                    className='bg-gradientFirst text-textW px-20 py-3 cursor-pointer rounded-lg border-b-4 border-b-textW hover:border-b-4 hover:border-b-black buttonBounce' href={props.jobDetails.externalLink}
                                    target="_blank"
                                >
                                    Apply <LaunchIcon sx={{ fontSize: '1rem' }} />
                                </a>
                            ) : props.jobDetails.emailApplication ? (
                                <div
                                    onClick={() => handleEmailApply(props.jobDetails.emailApplication)}
                                    className='bg-gradientFirst text-textW px-20 py-3 cursor-pointer rounded-lg border-b-4 border-b-textW hover:border-b-4 hover:border-b-black buttonBounce'                                >
                                    Apply
                                </div>
                            ) : (
                                <div
                                    onClick={() => {
                                        handleApply(
                                            props.jobDetails.$id,
                                            props.jobDetails.employerId,
                                            props.jobDetails.jobTitle
                                        );
                                    }}
                                    className='bg-gradient-to-r from-[#00A82D] to-[#0CBC8B] text-textW px-16 py-3 cursor-pointer rounded-lg border-b-4 border-b-textW hover:border-b-4 hover:border-b-black buttonBounce'                                >
                                    Easy Apply
                                </div>
                            )}
                            <div className='flex items-center cursor-pointer text-gray-500 hover:text-gradientFirst'>
                                <BookmarkBorderOutlinedIcon
                                    onClick={() => handleSaveJob(props.jobDetails.$id)}
                                    sx={{ fontSize: '2rem' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex px-6 flex-col gap-5'>
                        <div className="flex gap-5">
                            <div
                                className={
                                    props.company == true
                                        ? ' font-[600] flex items-center text-gray-500 cursor-pointer md:text-bigS border-b-[0.2rem] border-b-textW hover:border-b-gradientFirst pb-2'
                                        : 'font-[600] flex items-center cursor-pointer md:text-bigS border-b-[0.2rem] border-b-gradientFirst pb-2'
                                }
                                onClick={() => props.setCompany(false)}
                            >
                                Description
                            </div>

                            <div
                                className={
                                    props.company == true
                                        ? 'font-[600] flex items-center pb-2  cursor-pointer md:text-bigS border-b-[0.2rem] border-b-gradientFirst'
                                        : ' font-[600] flex items-center pb-2 text-gray-500 cursor-pointer md:text-bigS border-b-[0.2rem] border-b-textW hover:border-b-gradientFirst'
                                }
                                onClick={() => {
                                    props.setCompany(true);
                                }}
                            >
                                Company
                            </div>
                        </div>
                        {!props.company &&
                            <div className="max-h-64 overflow-y-auto thinScrollBar">
                                <div className='flex flex-wrap gap-3'>
                                    <div className='flex w-full gap-2'>
                                        <img src='icons/fire.svg' alt='fire' />
                                        {/*                                         <LocalFireDepartmentIcon className='text-gradientFirst' />
 */}                                        <p className='font-[600]'> Skills</p>
                                    </div>
                                    {props.jobDetails.requiredSkills && parseToArray(props.jobDetails.requiredSkills).map((skill: string, index: number) => {
                                        return <div
                                            className="min-w-36 w-auto h-8 font-adW text-sm leading-adL bg-gray-100 text-center flex px-7 items-center"
                                            key={index}
                                        >{skill}
                                        </div>
                                    })}
                                </div>
                                <div className='flex flex-wrap gap-5 mt-5'>
                                    <div className='flex w-full gap-2'>
                                        <img src='icons/plantInPot.svg' />
                                        {/*                                         <SpaIcon className='text-gradientFirst' />
 */}                                        <p className='font-[600]'> Job Description</p>
                                    </div>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: props.jobDetails.jobDescription }}
                                        className="text-midRS text-lightGrey min-h-[180px]"
                                    />
                                </div>
                            </div>
                        }
                        {props.company && props.companyData && (
                            <div className="w-full">
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
            </div>
            <Share openShare={openShare} setOpenShare={setOpenShare} link={props.jobDetails.$id} />
            {apply && (
                <ApplyToJob
                    jobId={applyJobId}
                    employerId={applyEmployerId}
                    setterFunction={setApply}
                    jobTitle={jobTitle}
                    companyName={props.companyName}
                />
            )}
        </div>
    )
}
export default JobDetail