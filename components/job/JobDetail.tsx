import React, { useEffect, useState } from 'react'
import Share from '../Share'
import JobImage from '../JobImage';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import EuroIcon from '@mui/icons-material/Euro';
import AttachMoneyOutlined from '@mui/icons-material/AttachMoneyOutlined';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LaunchIcon from '@mui/icons-material/Launch';
import StairsOutlinedIcon from '@mui/icons-material/StairsOutlined'
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf'
import { alreadyApplied, alreadySaved, saveJobs, } from '@/backend/candidateBackend'
import { signOut } from '@/backend/accountBackend';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import ApplyToJob from '../candidateProfileComponents/ApplyToJobs';
import { SmallLists } from '../TextInput';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import { useGlobalContext } from '@/contextApi/userData';
import ConfirmModal from '../ConfirmModal';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const VERIFY = process.env.NEXT_PUBLIC_VERIFY || '';
const JobDetail = (props: any) => {
    const { userRole, userDetail, loading, userData } = useGlobalContext()
    const [allLoading, setAllLoading] = useState(loading);
    const [applyEmp, setApplyEmp] = useState(false);
    const [jobTitle, setJobTitle] = useState('');
    const [apply, setApply] = useState(false);
    const [applyJobId, setApplyJobId] = useState('');
    const [applyEmployerId, setApplyEmployerId] = useState('');
    const [openShare, setOpenShare] = useState(false);
    const [userSkill, setUserSkill] = useState<any>()
    const [applied, setApplied] = useState(false);
    const [saved, setSaved] = useState(false)
    const router = useRouter();
    const isWithinWeek = moment(props.jobDetails.$createdAt).isAfter(moment().subtract(7, 'days')) && moment(props.jobDetails.datePosted).isBefore(moment());
    const date = new Date(props.jobDetails.$createdAt);
    const today = new Date();
    const difference = today.getTime() - date.getTime();
    const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const parseToArray = (text: string) => {
        const arrayValue = JSON.parse(text)
        return arrayValue
    }
    const checkApplied = async () => {
        if (!userDetail) {
            setApplied(false)
            setAllLoading(false)
        }
        if (userDetail) {
            setAllLoading(true)
            alreadyApplied(userDetail.$id, props.jobDetails.$id).then((applied) => {
                setAllLoading(false)
                if (applied.total !== 0) {
                    setApplied(true);
                }
                if (applied.total == 0) {
                    setApplied(false);
                }
            });
        }
    };
    const checkSaved = () => {
        if (!userDetail) {
            setSaved(false)
        }
        if (userDetail) {
            const checkSaved = alreadySaved(userData.$id, props.jobDetails.$id);
            checkSaved.then((rem: any) => {
                if (rem.total > 0) {
                    setSaved(true)
                }
                if (rem.total == 0) {
                    setSaved(false)
                }
            });
        }
    }
    useEffect(() => {
        checkApplied()
        checkSaved()
    }, [userDetail, props.jobDetails])
    const handleApply = async (jobId: string, employerId: string, jobTitle: string) => {
        setApply(false);
        if (userRole) {
            if (userRole == 'candidate') {
                setApply(true);
                setApplyJobId(jobId);
                setApplyEmployerId(employerId);
                setJobTitle(jobTitle);
            } else if (userRole == 'employer') {
                setApplyEmp(true);
            }
        }
        if (!userData && userRole == '') {
            typeof window !== 'undefined' && router.push('/account');
        }
    }
    const createCandidateAccount = () => {
        signOut()
            .then(() => {
                typeof window !== 'undefined' && router.push('/account');
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleSaveJob = async (id: string) => {
        if (userRole == 'candidate') {
            const checkSaveds = alreadySaved(userData.$id, id);
            checkSaveds.then((rem: any) => {
                if (rem.total == 0) {
                    toast.success('Successfully Saved Job');
                    saveJobs(userData.$id, id);
                    setSaved(true)

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
        I hope this message finds you well. My name is yonas abebe, and I came across the ${props.jobDetails.jobTitle} position on Palm Jobs.
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
                    ? 'col-span-12 flex border-[1px] pb-2 border-[#DEDEDE] rounded-xl'
                    : 'col-span-12 hidden md:flex border-[1px] border-[#DEDEDE] pb-2 rounded-xl'
            }
        >
            <div className=" w-full flex flex-col">
                {
                    props.single !== true && <div
                        onClick={() => props.setOpenJobDetail(false)}
                        className="p-3 border-[1px] rounded-[12px] border-[#DEDEDE] flex justify-center items-center cursor-pointer m-5 md:hidden"
                    >
                        <ArrowBackIcon sx={{ fontSize: '1.2rem', marginRight: '0.7rem' }} />  <span> Back To Search</span>
                    </div>
                }
                <div className="flex flex-col gap-y-5 h-[800px] pt-7 rounded-t-xl ">
                    <div className='px-6 border-b-[1px] border-[#DEDEDE] flex flex-col gap-y-3 pb-5'>
                        <div className='flex items-center gap-3'>
                            <JobImage
                                id={props.jobDetails.employerId}
                                className="rounded-full h-8 w-8"
                            />
                            {props.companyName && (
                                <p className="text-[12px] text-darkBlue sm:text-fhS xl:text-[14px]">
                                    {props.companyName}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col">
                            {props.jobDetails.jobTitle && (
                                <p className="font-[600] text-[1.5rem] xl:text-[28px]">
                                    {props.jobDetails.jobTitle}
                                </p>
                            )}
                            {props.jobDetails.jobLocation && (
                                <p className="text-[#141414B2] text-[14px] flex items-center gap-1">
                                    <PlaceOutlinedIcon
                                        sx={{ fontSize: '1rem' }}
                                    />
                                    {props.jobDetails.jobLocation}
                                </p>
                            )}
                        </div>
                        <div className="text-[10px] flex md:text-[11px] md:mt-1 md:text-[0.55rem] lg:text-[0.8rem] xl:text-[0.6rem] gap-3 flex-wrap">
                            {props.jobDetails.jobType &&
                                <SmallLists icon={<img src='/icons/suitCase.svg' alt='suitCaseIcon' />}
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
                            {props.jobDetails.expreienceLevel && (
                                <SmallLists
                                    icon={<StairsOutlinedIcon sx={{ fontSize: '1.3rem' }} />}
                                    items={props.jobDetails.expreienceLevel}
                                />
                            )}
                            {props.jobDetails.datePosted && (
                                <div className="inline bg-[#FAFAFA] flex items-center gap-1 text-xs text-gradientFirst rounded-[4px] p-2 px-3 sm:px-2 sm:py-1 md:max-lg:px-1.5 md:max-lg:py-2 xl:h-[28px]">
                                    <img src='/icons/hourGlassUp.svg' alt='hourGlassUp' />
                                    <span className='text-[#20262E]'>{/* isToday && isToday ? <p className='text-[12px]'>posted today</p> : */ isWithinWeek ? days == 0 ? <p className='text-[12px]'>posted today</p> : <p className='text-[12px]'>posted {days} days ago</p> : weeks <= 3 ? <p className='text-[12px]'>posted {weeks} weeks ago</p> : <p className='text-[12px]'>posted {Math.floor(weeks / 4)} month ago</p>}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className='flex gap-5 mt-4'>
                            {props.jobDetails.externalLink ? (
                                <a
                                    className='bg-gradientFirst text-textW w-[195px] h-[40px] cursor-pointer rounded-[4px] flex items-center justify-center hover:border-b-4 hover:border-b-black buttonBounce' href={props.jobDetails.externalLink}
                                    target="_blank"
                                >
                                    Apply <LaunchIcon sx={{ fontSize: '1rem' }} className='ml-2' />
                                </a>
                            ) : props.jobDetails.emailApplication ? (
                                <div
                                    onClick={() => handleEmailApply(props.jobDetails.emailApplication)}
                                    className='bg-gradientFirst text-textW w-[195px] h-[40px] cursor-pointer rounded-[4px] flex items-center justify-center hover:border-b-4 hover:border-b-black buttonBounce'                                >
                                    Apply
                                </div>
                            ) : (<>
                                {
                                    allLoading && <div className="hidden sm:relative md:flex items-center justify-end gap-x-2 col-span-3 md:col-span-12">
                                        <div className="text-neutral-900  text-opacity-70 text-xl font-normal leading-7">
                                            <div className="bg-gray-300 rounded animate-pulse w-[195px] h-[40px] rounded-[4px]"></div>
                                        </div>
                                    </div>
                                }
                                {
                                    !allLoading ? !applied ? <div className='hover:bg-black rounded-[4px]'><div
                                        onClick={() => {
                                            handleApply(
                                                props.jobDetails.$id,
                                                props.jobDetails.employerId,
                                                props.jobDetails.jobTitle
                                            );
                                        }}
                                        className='bg-gradient-to-r from-[#00A82D] to-[#0CBC8B] text-textW w-[195px] h-[40px] cursor-pointer rounded-[4px] flex items-center justify-center hover:rounded-x-[0px] buttonBounce'                                >
                                        <EnergySavingsLeafIcon sx={{ fontSize: '1.2rem' }} /> <span className='ml-2'> Easy Apply</span>
                                    </div> </div> : <div
                                        className='bg-gray-100 text-gray-00 w-[195px] h-[40px] cursor-pointer rounded-[4px] flex items-center justify-center '          >
                                        <EnergySavingsLeafIcon sx={{ fontSize: '1.2rem' }} /> <span className='ml-2'> Applied</span>
                                    </div> : null

                                }

                            </>
                            )}
                            {!saved && !allLoading &&
                                <div className='flex items-center cursor-pointer text-gray-500 hover:text-gradientFirst'>
                                    <BookmarkBorderOutlinedIcon
                                        onClick={() => handleSaveJob(props.jobDetails.$id)}
                                        sx={{ fontSize: '1.5rem' }}
                                    />
                                </div>
                            }
                            {saved && !allLoading &&
                                <div className='flex items-center text-gradientFirst'>
                                    <BookmarkIcon
                                        sx={{ fontSize: '1.5rem' }}
                                    />
                                </div>
                            }

                        </div>
                    </div>
                    <div className='flex px-6 flex-col gap-5 pb-4 overflow-hidden h-[100%]'>
                        <div className="flex gap-5 mb-3">
                            <div
                                className={`font-[500] flex items-center cursor-pointer text-[18px] border-b-[0.2rem] pb-2 ${props.company == true ? 'border-b-textW text-gray-500 hover:border-b-gradientFirst' : 'border-b-gradientFirst'}`}
                                onClick={() => props.setCompany(false)}
                            >
                                Description
                            </div>
                            <div
                                className={`font-[500] flex items-center cursor-pointer text-[18px] border-b-[0.2rem] pb-2 ${props.company !== true ? 'border-b-textW text-gray-500 hover:border-b-gradientFirst' : 'border-b-gradientFirst'}`}
                                onClick={() => {
                                    props.setCompany(true);
                                }}
                            >
                                Company
                            </div>
                        </div>
                        {!props.company &&
                            <div className='max-h-[100%] max-h-full h-full overflow-y-auto thinScrollBar'>
                                <div className='flex flex-wrap gap-3'>
                                    <div className='flex w-full gap-2'>
                                        <img src='/icons/fire.svg' alt='fire' />
                                        <p className='font-[600]'> Skills</p>
                                    </div>
                                    {props.jobDetails.requiredSkills && parseToArray(props.jobDetails.requiredSkills).map((skill: string, index: number) => {
                                        return <div key={index}>
                                            {userSkill && userSkill.includes(skill.toLocaleLowerCase()) ?
                                                <div key={index} className="min-w-36 w-auto h-8 font-adW rounded-lg text-sm leading-adL bg-skillColor text-gradientFirst text-center flex px-7 max-sm:py-7 gap-2 items-center">
                                                    {skill} <CheckIcon sx={{ fontSize: '1.2rem', marginTop: '-0.2rem' }} />
                                                </div> :
                                                <div className="min-w-36 w-auto h-8 font-adW rounded-lg text-sm leading-adL bg-gray-100 text-center flex px-7 max-sm:py-7 items-center"
                                                    key={index}>{skill}</div>}
                                        </div>
                                    })}
                                </div>
                                <div className='flex flex-wrap gap-5 mt-5'>
                                    <div className='flex w-full gap-2'>
                                        <img src='/icons/plantInPot.svg' alt='plantPot' />
                                        <p className='font-[600]'> Job Description</p>
                                    </div>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: props.jobDetails.jobDescription }}
                                        className="text-[12px] text-[#727272] min-h-[180px]"
                                    />

                                </div>
                            </div>
                        }
                        {props.company && props.companyData && (
                            <div className="w-full">
                                <div className='flex items-center gap-2'>
                                    <img src="/icons/game-icons_binoculars.svg" alt="camera" className='w-[29px] h-[29px]' />
                                    <p className="font-[600] leading-[22px">Company Snapshot</p>
                                </div>
                                <div className='flex gap-3 flex-wrap gap-5 mt-5 pb-5'>
                                    <div className='flex flex-col gap-y-2'>
                                        {
                                            props.companyData.sector && <div className='flex gap-5 items-center'>
                                                <p className='text-[#141414] text-[14px]'>Sector</p>
                                                <p className='text-[#727272] text-[12px]'>{props.companyData.sector}</p>
                                            </div>
                                        }
                                        {
                                            props.companyData.location && <div className='flex gap-5 '>
                                                <p className='text-[#141414] text-[14px]'>Location</p>
                                                <p className='text-[#727272] text-[12px]'>{props.companyData.location}</p>
                                            </div>
                                        }
                                    </div>
                                    <div className='flex flex-col gap-y-2'>
                                        {
                                            props.companyData.noOfEmployee && <div className='flex items-center gap-5 '>
                                                <p className='text-[#141414] text-[14px]'>Size</p>
                                                <p className='text-[#727272] text-[12px]'>{props.companyData.noOfEmployee}</p>
                                            </div>
                                        }
                                        {
                                            props.companyData.websiteLink && <div className='flex items-center gap-5 '>
                                                <p className='text-[#141414] text-[14px]'>Website</p>
                                                <a className='text-[#727272] text-[12px]' href={props.companyData.websiteLink} target='_blank'>
                                                    {props.companyData.websiteLink}
                                                    {/* view <LaunchIcon /> */}</a>
                                            </div>
                                        }</div>
                                </div>
                                {
                                    props.companyData.description &&
                                    <div className='flex items-center gap-2 mb-3'>
                                        <img src="/icons/mingcute_leaf-3-fill.svg" alt="camera" className='w-[29px] h-[29px]' />
                                        <p className="font-[600] leading-[22px">Company Overview</p>
                                    </div>
                                }
                                <div
                                    dangerouslySetInnerHTML={{ __html: props.companyData.description }}
                                    className="text-[12px] text-[#727272] overflow-y-auto hideScrollBar min-h-96 max-h-96 overflow-y-auto hideScrollBar"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Share openShare={openShare} setOpenShare={setOpenShare} link={props.jobDetails.$id} />
            {
                apply && <ApplyToJob
                    jobId={applyJobId}
                    employerId={applyEmployerId}
                    setterFunction={setApply}
                    jobTitle={jobTitle}
                    companyName={props.companyName}
                    openApply={apply}
                />
            }
            <ConfirmModal isOpen={applyEmp} handleClose={() => setApplyEmp(!applyEmp)}>
                <div className="mx-2 pb-10 pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-10 md:pl-8 md:w-2/3 lg:w-1/2 md:mx-0">
                    <div className="col-span-12 flex justify-end pr-7">
                        <button onClick={() => setApplyEmp(!applyEmp)}>
                            <CloseIcon sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }} className="w-8 h-8 p-2 " />
                        </button>
                    </div>
                    <div className="col-span-12 flex flex-col items-center justify-end pr-7 gap-3">
                        <p className="text-center md:px-10 text-bigS text-lightGrey">
                            Looks like you’re currently logged in as an employer. To apply for this job, please log in with your job seeker account.
                        </p>
                        <button
                            onClick={() => createCandidateAccount()}
                            type="button"
                            className="bg-black text-textW flex items-center justify-center  h-16 w-full rounded-lg md:w-1/2"
                        >
                            Create a candidate profile
                        </button>
                    </div>
                </div>
            </ConfirmModal>
            {/*   {
                apply == true && (
                    <ApplyToJob
                        jobId={applyJobId}
                        employerId={applyEmployerId}
                        setterFunction={setApply}
                        jobTitle={jobTitle}
                        companyName={props.companyName}
                    />
                )
            } */}
        </div >
    )
}
export default JobDetail