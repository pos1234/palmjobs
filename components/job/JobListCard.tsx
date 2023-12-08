import React, { useEffect, useState } from 'react'
import JobImage from '../JobImage';
import { getCompanyData } from '@/backend/employerBackend';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import AttachMoneyOutlined from '@mui/icons-material/AttachMoneyOutlined';
import EuroIcon from '@mui/icons-material/Euro';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ReportIcon from '@mui/icons-material/Report';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf'
import ShareIcon from '@mui/icons-material/Share';
import Share from '../Share';
import { SmallLists, SubmitButton } from '../TextInput';
import { Popover } from '@headlessui/react';
import { alreadySaved, saveJobs } from '@/backend/candidateBackend';
import { getAccount, getRole } from '@/backend/accountBackend';
import { toast } from 'react-toastify';
import { useRouter } from 'next/dist/client/router';
import moment from 'moment';
import { useRef, } from 'react'
import ConfirmModal from '../ConfirmModal'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CloseIcon from '@mui/icons-material/Close';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
interface ConfirmModalProps {
    children: React.ReactNode;
    openModal: boolean,
    setOpenModal: (openModal: boolean) => void;
    addText: string,
    icon?: any,
    text: string,
    tipText: string
}
const FormModal = ({ children, openModal, setOpenModal, addText, icon, text, tipText }: ConfirmModalProps) => {
    const leaf = '/images/modalTipLeaf.svg'
    const [tip, setTip] = useState(false)
    const parentRef = useRef<HTMLDivElement>(null);
    const handleParentClick = () => {
        console.log('Parent div clicked');
        setOpenModal(false)
    };
    const handleChildClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };
    return (
        <ConfirmModal isOpen={openModal} handleClose={() => {
            setOpenModal(!openModal);
        }}
        >
            <div ref={parentRef} onClick={handleParentClick} className='w-screen h-screen flex items-center justify-center px-3 py-3 sm:py-10 sm:px-7 md:p-10 lg:px-20 xl:px-52 xl:py-16'>
                <div onClick={handleChildClick} className='bg-textW w-full h-full rounded-2xl p-5 sm:px-10'>
                    <div className='flex flex-col h-full'>
                        <div className='w-full flex justify-end cursor-pointer hover:text-gradientFirst' onClick={() => setOpenModal(false)}>
                            <CloseIcon />
                        </div>
                        <div className='flex w-full gap-5'>
                            <p onClick={() => setTip(false)} className={tip ? 'cursor-pointer border-b-2 border-b-textW hover:border-b-gradientFirst md:border-0 lg:hidden' : 'border-b-2 border-b-gradientFirst md:border-0 lg:hidden'}>{addText}</p>
                            <p onClick={() => setTip(true)} className={tip ? 'border-b-2 border-b-gradientFirst lg:hidden' : 'cursor-pointer border-b-2 border-b-textW hover:border-b-gradientFirst lg:hidden'}>Tips</p>
                        </div>
                        <div className='w-full flex h-full'>
                            <div className={tip ? 'max-lg:hidden h-full lg:w-1/2 overflow-y-auto lg:max-h-[25rem] thinScrollBar flex' : 'flex w-full h-full lg:w-1/2 overflow-y-auto'}>
                                {children}
                            </div>
                            <div className={`bg-gray-100 flex flex-wrap px-5 pt-5 rounded-r-2xl w-full gap-7 lg:flex items-center flex-grow justify-center h-full ${tip ? 'lg:w-1/2' : 'hidden overflow-y-auto lg:w-1/3'}`}>
                                <div className='w-full flex flex-wrap self-center items-end h-1/2 font-[600] sm:text-[20px] text-center'>
                                    {tipText}
                                </div>
                                <div className='w-full flex items-end self-end justify-end '>
                                    <img src='/images/salaryTipPattern.svg' className='w-full sm:h-40 self-end' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </ConfirmModal >
    )
}
const VERIFY = process.env.NEXT_PUBLIC_VERIFY || '';
const ReturnName = (props: any) => {
    const [companyName, setCompanyName] = useState('');
    const documents = getCompanyData(props.id);
    documents.then(async (res) => {
        if (res.documents && res.documents[0] && res.documents[0].description) {
            setCompanyName(res.documents[0].companyName);
        } else {
            setCompanyName('');
        }
    });
    return <div className="text-[13px] text-darkBlue sm:text-[1rem] md:text-[0.9rem] xl:text-[14px] font-[400]">{companyName}</div> || null;
};
const JobListCard = (props: any) => {
    const router = useRouter()
    const [openShare, setOpenShare] = useState(false)
    const [userId, setUserId] = useState('')
    const [userRole, setUserRole] = useState('')
    const [openReport, setOpenReport] = useState(false)
    const [reportCode, setReportCode] = useState(0)
    const [reportLoading, setReportLoading] = useState(false)
    const [reportData, setReportData] = useState({
        jobId: '',
        employerId: '',
        message: ''
    })
    const isToday = moment(props.items.datePosted).isSame(moment());
    const isWithinWeek = moment(props.items.datePosted).isAfter(moment().subtract(7, 'days')) && moment(props.items.datePosted).isBefore(moment());
    const date = new Date(props.items.datePosted);
    const today = new Date();
    const difference = today.getTime() - date.getTime();
    const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const getUserData = async () => {
        const userInfo = await getAccount();
        if (userInfo !== 'failed') {
            setUserId(userInfo.$id)
/*             setUserData(userInfo);
 */            const role = await getRole();
            setUserRole(role && role.documents[0].userRole);
        }
    };
    useEffect(() => {
        getUserData();
    }, []);
    const handleSaveJob = async (id: string) => {
        if (userRole == 'candidate') {
            const checkSaved = alreadySaved(userId, id);
            checkSaved.then((rem: any) => {
                if (rem.total == 0) {
                    toast.success('Successfully Saved Job');
                    saveJobs(userId, id);
                }/*  else {
                    toast.error('Job Already saved');
                } */
            });
        }
        if (!userRole) {
            typeof window !== 'undefined' && router.push('/account');
        }
    };
    const handleReportSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setReportLoading(true)
        if (reportCode == 0) {
            setReportCode(4);
            setReportLoading(false)
        } else {
            const reportReason = reportCode == 1 ? 'Discriminatory Language' : reportCode == 2 ? 'False Information' : 'Spam or Fraudulent'
            const formData = {
                toEmail: process.env.NEXT_PUBLIC_PALM_EMAIL,
                fromEmail: process.env.NEXT_PUBLIC_PALM_EMAIL,
                subject: 'Report a Job',
                jobId: props.items.$id,
                employerId: reportData.employerId,
                reason: reportReason,
                addtionalMessage: reportData.message
            }
            try {
                fetch(`${VERIFY}/api/email/route`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData)
                }).then((res) => {
                    setReportData({
                        jobId: '',
                        employerId: '',
                        message: ''
                    })
                })
            } catch (err) {
                console.log(err);
            }
            setReportLoading(false)
            toast.success('Report Submitted Successfully')
            setOpenReport(false)
        }
    }
    const removeHtmlTags = (text: string) => {
        // Create a regular expression to match all HTML tags.
        const htmlTagPattern = /<[^>]+>/g;
        // Remove all HTML tags from the text.
        const result = text.replace(htmlTagPattern, " ");
        // Return the text without HTML tags.
        return result.split(" ").slice(0, 15).join(" ");
    }
    return (
        <div
            onClick={() => {
                props.setEmployerId(props.items.employerId);
                props.setJobDetailId(props.items.$id);
                props.setOpenJobDetail(true);
                props.handleJobSelection(props.items.$id)
            }}
            key={props.index}
            className={`cursor-pointer bg-textW w-full h-[300px] max-h-[350px] sm:max-h-[234px] sm:h-[234px] xl:w-[458px] xl:max-w-[458px] flex flex-col gap-2 rounded-[12px] border-[1px]  px-5 py-4 ${props.items.$id == props.jobDetailId ? 'border-gradientFirst' : 'border-[#DEDEDE] hover:border-gradientFirst'} `}
        >
            <div className='flex justify-between flex-wrap gap-1'>
                <div className='flex items-center gap-3'>
                    <JobImage id={props.items.employerId} className=" rounded-[60px] h-[33px] w-[33px]" />
                    <ReturnName id={props.items.employerId} />
                </div>
                {
                    !openShare && !openReport &&
                    <div className='flex items-center relative'>
                        <Popover id={`click ${props.index}`} aria-label={`click ${props.index}`} className="focus:ring-0 focus:border-0 focus:outline-0">
                            <Popover.Button id={`menu ${props.index}`} aria-label={`menu ${props.index}`} className="focus:ring-0 focus:border-0 focus:outline-0 flex items-center text-stone-500">
                                <MoreVertOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                            </Popover.Button>
                            <Popover.Panel className="absolute  text-[13px] right-0 border-2 rounded-md flex flex-col bg-textW shadow z-10 w-[8rem]">
                                <p className='flex gap-2 p-2 hover:bg-[#F4F4F4]' onClick={() => setOpenShare(true)}><ShareIcon sx={{ fontSize: '1.2rem' }} />Share</p>
                                <p className='flex gap-2 p-2 hover:bg-[#F4F4F4]' onClick={() => handleSaveJob(props.items.$id)}><img src="/icons/save.svg" alt="saveImage" className='w-4 h-4' /> Save</p>
                                <p className='flex gap-2 p-2 hover:bg-[#F4F4F4]' onClick={() => {
                                    setOpenReport(true)
                                    setReportData({ ...reportData, jobId: props.items.$id })
                                    setReportData({ ...reportData, employerId: props.items.employerId })
                                }}>
                                    <ReportIcon sx={{ fontSize: '1.2rem' }} />
                                    Report Job</p>
                            </Popover.Panel>
                        </Popover>
                    </div>}
                <div className="w-full flex flex-col ">
                    {props.items.jobTitle && (
                        <p className="text-[18px] font-[600] text-[#141414]">
                            {props.items.jobTitle}
                        </p>
                    )}
                    {props.items.jobLocation && (
                        <p className="text-gray-400 text-[14px] font-[400] flex items-center gap-1">
                            <PlaceOutlinedIcon sx={{ fontSize: '1rem' }} />
                            {props.items.jobLocation}
                        </p>
                    )}
                </div>
            </div>
            <div className="text-[10px] flex gap-y-2 gap-x-3  md:text-[11px] md:mt-1 flex-wrap">
                {props.items.jobType &&
                    <SmallLists icon={<img src='/icons/suitCase.svg' alt='suitCase' />}
                        items={props.items.jobType} />
                }
                {(props.items.minSalary || props.items.maxSalary) && (
                    <SmallLists icon={props.items.currency == 'euro' ? (
                        <EuroIcon
                            sx={{ fontSize: '1rem' }}
                            className="-mt-0.5 mr-1"
                        />
                    ) : props.items.currency == 'usd' ? (
                        <AttachMoneyOutlined
                            sx={{ fontSize: '1rem' }}
                            className="-mt-0.5 mr-1"
                        />
                    ) : props.items.currency == 'gpb' ? (
                        <CurrencyPoundIcon
                            sx={{ fontSize: '1rem' }}
                            className="-mt-0.5 mr-1"
                        />
                    ) : props.items.currency == 'rnp' ? (
                        <CurrencyRupeeIcon
                            sx={{ fontSize: '1rem' }}
                            className="-mt-0.5 mr-1"
                        />
                    ) : (
                        <span className="text-[12px] mr-1">ETB</span>
                    )}
                        items={!props.items.minSalary && props.items.maxSalary
                            ? props.items.maxSalary
                            : props.items.minSalary && !props.items.maxSalary
                                ? props.items.minSalary
                                : props.items.minSalary + '-' + props.items.maxSalary}
                    />
                )}
                {!props.items.externalLink && !props.items.emailApplication && (
                    <SmallLists
                        icon={<EnergySavingsLeafIcon sx={{ fontSize: '1rem' }} />}
                        items={'Easy Apply'}
                    />
                )}
            </div>
            <div className="w-full text-[#20262E] text-sm leading-[24px] overflow-hiddenc pr-2">
                <div className="w-full">
                    {removeHtmlTags(props.items.jobDescription)}....
                    {/* <div
                        className="overflow-ellipsis font-[400] leading-[20px] text-[11px] text-[#20262E]"
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                        }}
                        dangerouslySetInnerHTML={{ __html: props.items.jobDescription }}
                    /> */}
                </div>
            </div>
            {isToday && isToday ? <p className='text-[12px]'>posted today</p> : isWithinWeek ? days == 0 ? <p className='text-[12px]'>posted today</p> : <p className='text-[12px]'>posted {days} days ago</p> : weeks <= 3 ? <p className='text-[12px]'>posted {weeks} weeks ago</p> : <p className='text-[12px]'>posted {Math.floor(weeks / 4)} month ago</p>}
            <Share openShare={openShare} setOpenShare={setOpenShare} link={props.items.$id} />
            <FormModal openModal={openReport} setOpenModal={setOpenReport} addText={'Survey'} text={''} tipText={"Thank you for helping us maintain a professional and safe environment on our job board. If you've found a job listing that violates our terms or seems inappropriate, please provide the information below to assist our review."}>
                <form onSubmit={handleReportSubmit} className="w-full flex flex-col h-full md:max-lg:items-center">
                    <div className='h-full w-full overflow-y-auto overflow-x-hidden pr-2 thinScrollBar flex flex-col gap-5 md:max-lg:items-center'>
                        <p className='font-[600] text-[24px]'>Reason for Reporting</p>
                        <div className='flex flex-col gap-3'>
                            <p className={`sm:w-[376px] h-[40px] sm:h-[48px] font-500  flex items-center justify-center cursor-pointer ${reportCode == 1 ? 'bg-gradientFirst text-textW' : 'bg-[#F4F4F4]'}`} onClick={() => setReportCode(1)}>Discriminatory Language</p>
                            <p className={`sm:w-[376px] h-[40px] sm:h-[48px] font-500  flex items-center justify-center cursor-pointer ${reportCode == 2 ? 'bg-gradientFirst text-textW' : 'bg-[#F4F4F4]'}`} onClick={() => setReportCode(2)}>False Information</p>
                            <p className={`sm:w-[376px] h-[40px] sm:h-[48px] font-500  flex items-center justify-center cursor-pointer ${reportCode == 3 ? 'bg-gradientFirst text-textW' : 'bg-[#F4F4F4]'}`} onClick={() => setReportCode(3)}>Spam or Fraudulent</p>
                            {reportCode == 4 && <p className='text-red-500 text-[14px]'>Please Select one of the above</p>}
                            <textarea value={reportData.message} onChange={(e) => {
                                if (e.currentTarget.value.length <= 200) {
                                    setReportData({ ...reportData, message: e.currentTarget.value })
                                }
                            }} cols={30} rows={20} className='sm:w-[376px] resize-none h-52 focus:border-gradientFirst focus:ring-0' placeholder='Additional Message'></textarea>
                        </div>
                    </div>
                    <div className='w-full flex md:max-lg:justify-center pt-3'>
                        <div className='w-80'>
                            <SubmitButton loading={reportLoading} buttonText="Report" />
                        </div>
                    </div>
                </form>
            </FormModal>
        </div >
    )
}

export default JobListCard