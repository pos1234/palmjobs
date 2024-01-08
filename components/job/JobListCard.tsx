import React, { useEffect, useState } from 'react'
import { jobImages } from '../JobImage';
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
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { SmallLists, SubmitButton } from '../TextInput';
import { Popover } from '@headlessui/react';
import { alreadySaved, saveJobs } from '@/backend/candidateBackend';
import { toast } from 'react-toastify';
import { useRouter } from 'next/dist/client/router';
import moment from 'moment';
import { useGlobalContext } from '@/contextApi/userData';
import FormModal from './FormModal';
import Image from 'next/image';
const VERIFY = process.env.NEXT_PUBLIC_VERIFY || '';
const JobListCard = (props: any) => {
    const { userRole, userData } = useGlobalContext()
    const router = useRouter()
    const [openShare, setOpenShare] = useState(false)
    const [userId, setUserId] = useState('')
    const [openReport, setOpenReport] = useState(false)
    const [reportCode, setReportCode] = useState(0)
    const [reportLoading, setReportLoading] = useState(false)
    const [saved, setSaved] = useState(false)
    const [reportData, setReportData] = useState({
        jobId: '',
        employerId: '',
        message: ''
    })
    const isWithinWeek = moment(props.items.$createdAt).isAfter(moment().subtract(7, 'days')) && moment(props.items.datePosted).isBefore(moment());
    const date = new Date(props.items.$createdAt);
    const today = new Date();
    const difference = today.getTime() - date.getTime();
    const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const getUserData = async () => {
        if (userData && userId == '') {
            setUserId(userData.$id)
        }
    };
    const checkSaved = () => {
        if (!userData) {
            setSaved(false)
        }
        if (userData) {
            const checkSaved = alreadySaved(userData.$id, props.items.$id);
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
        checkSaved()
    }, [props])

    useEffect(() => {
        getUserData();
    }, [userData]);
    const handleSaveJob = async (id: string) => {
        if (userRole == 'candidate') {
            const checkSaved = alreadySaved(userId, id);
            checkSaved.then((rem: any) => {
                if (rem.total == 0) {
                    toast.success('Successfully Saved Job');
                    saveJobs(userId, id);
                }
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
        const htmlTagPattern = /<[^>]+>/g;
        const result = text.replace(htmlTagPattern, " ");
        return result.split(" ").slice(0, 15).join(" ");
    }
    const { imageUrl, companyName } = jobImages(props.items.employerId)
    return (
        <div
            onClick={() => {
                props.setEmployerId(props.items.employerId);
                props.setJobDetailId(props.items.$id);
                props.setOpenJobDetail(true);
                props.handleJobSelection(props.items.$id)
                props.setCompLogo(imageUrl)
                props.setCompanyName(companyName)
                props.setCompany(false)
            }}
            key={props.index}
            className={`cursor-pointer bg-textW w-full h-[300px] max-h-[350px] sm:max-h-[234px] sm:h-[234px] xl:w-[458px] xl:max-w-[458px] flex flex-col gap-2 rounded-[12px] border-[1px]  px-5 py-4 ${props.items.$id == props.jobDetailId ? 'border-gradientFirst' : 'border-[#DEDEDE] hover:border-gradientFirst'} `}
        >
            <div className='flex justify-between flex-wrap gap-1'>
                <div className='flex items-center gap-3'>
                    {imageUrl && <Image width={100} height={100} src={imageUrl} alt="" className=" rounded-[60px] h-[33px] w-[33px]" />}
                    {companyName && <div className="text-[13px] text-darkBlue sm:text-[1rem] md:text-[0.9rem] xl:text-[14px] font-[400]">
                        {companyName}
                    </div>}
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

                                {
                                    !saved && <p className='flex gap-2 p-2 hover:bg-[#F4F4F4]' onClick={() => handleSaveJob(props.items.$id)}><img src="/icons/save.svg" alt="saveImage" className='w-4 h-4' /> Save</p>
                                }
                                {saved && <p className='flex gap-2 p-2 hover:bg-[#F4F4F4]' onClick={() => handleSaveJob(props.items.$id)}><BookmarkIcon
                                    sx={{ fontSize: '1.3rem', color: 'gray' }}
                                /> Saved</p>
                                }
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
                        <p className="text-[#141414B2] text-[14px] font-[400] flex items-center gap-1">
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
            <div className="w-full text-[#20262E] text-[11px] leading-[24px] overflow-hiddenc pr-2">
                <div className="w-full">
                    {removeHtmlTags(props.items.jobDescription)}....
                </div>
            </div>
            {isWithinWeek ? days == 0
                ? <p className='text-[12px]'>Posted Today</p> : days == 1 ? <p className='text-[12px]'>Posted {days} day ago</p> : <p className='text-[12px]'>Posted {days} days ago</p>
                : weeks <= 3 ? weeks == 1 ? <p className='text-[12px]'>Posted {weeks} week ago</p> : <p className='text-[12px]'>Posted {weeks} weeks ago</p>
                    : <p className='text-[12px]'>Posted {Math.floor(weeks / 4)} month ago</p>
            }
            <Share openShare={openShare} setOpenShare={setOpenShare} link={props.items.$id} />
            <FormModal openModal={openReport} setOpenModal={setOpenReport} addText={'Survey'} text={''} tipText={"Thank you for helping us maintain a professional and safe environment on our job board. If you've found a job listing that violates our terms or seems inappropriate, please provide the information below to assist our review."}>
                <form onSubmit={handleReportSubmit} className="w-full flex flex-col h-full md:max-lg:items-center">
                    <div className='h-full w-full overflow-y-auto overflow-x-hidden pr-2 thinScrollBar flex flex-col gap-5 md:max-lg:items-center'>
                        <p className='font-[600] text-[24px]'>Reason for Reporting</p>
                        <div className='flex flex-col gap-3'>
                            <p className={`sm:w-[376px] h-[40px] rounded-lg sm:h-[48px] font-500  flex items-center justify-center cursor-pointer ${reportCode == 1 ? 'bg-gradientFirst text-textW' : 'bg-[#F4F4F4]'}`} onClick={() => setReportCode(1)}>Discriminatory Language</p>
                            <p className={`sm:w-[376px] h-[40px] rounded-lg sm:h-[48px] font-500  flex items-center justify-center cursor-pointer ${reportCode == 2 ? 'bg-gradientFirst text-textW' : 'bg-[#F4F4F4]'}`} onClick={() => setReportCode(2)}>False Information</p>
                            <p className={`sm:w-[376px] h-[40px] rounded-lg sm:h-[48px] font-500  flex items-center justify-center cursor-pointer ${reportCode == 3 ? 'bg-gradientFirst text-textW' : 'bg-[#F4F4F4]'}`} onClick={() => setReportCode(3)}>Spam or Fraudulent</p>
                            {reportCode == 4 && <p className='text-red-500 text-[14px]'>Please Select one of the above</p>}
                            <textarea value={reportData.message} onChange={(e) => {
                                if (e.currentTarget.value.length <= 200) {
                                    setReportData({ ...reportData, message: e.currentTarget.value })
                                }
                            }} cols={30} rows={20} className='sm:w-[376px] rounded-lg resize-none h-52 focus:border-gradientFirst focus:ring-0' placeholder='Additional Message'></textarea>
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