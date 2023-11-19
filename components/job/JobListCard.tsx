import React, { useEffect, useState } from 'react'
import JobImage from '../JobImage';
import { getCompanyData } from '@/lib/employerBackend';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import AttachMoneyOutlined from '@mui/icons-material/AttachMoneyOutlined';
import EuroIcon from '@mui/icons-material/Euro';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ReportIcon from '@mui/icons-material/Report';
import ShareIcon from '@mui/icons-material/Share';
import Share from '../Share';
import { SmallLists, SubmitButton } from '../TextInput';
import { Popover } from '@headlessui/react';
import { alreadySaved, saveJobs } from '@/lib/candidateBackend';
import { getAccount, getRole } from '@/lib/accountBackend';
import { toast } from 'react-toastify';
import { useRouter } from 'next/dist/client/router';
import FormModal from '../candidateProfileComponents/FormModal';
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
    return <div className="text-[13px] text-darkBlue sm:text-[1.5rem] md:text-[0.9rem] xl:text-[0.9rem]">{companyName}</div> || null;
};
const JobListCard = (props: any) => {
    const router = useRouter()
    const [openShare, setOpenShare] = useState(false)
    const [userId, setUserId] = useState('')
    const [userRole, setUserRole] = useState('')
    const [openReport, setOpenReport] = useState(false)
    const [reportCode, setReportCode] = useState(0)
    const [reportMessage, setReportMessage] = useState('')
    const [reportLoading, setReportLoading] = useState(false)
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
    const handleReportSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setReportLoading(true)
        if (reportCode == 0) {
            setReportCode(4);
            setReportLoading(false)
        } else {
            setReportLoading(false)
            toast.success('Report Submitted Successfully')
            setOpenReport(false)
        }
    }
    return (
        <div
            onClick={() => {
                props.setEmployerId(props.items.employerId);
                props.setJobDetailId(props.items.$id);
                props.setOpenJobDetail(true);
            }}
            key={props.index}
            className={
                props.items.$id == props.jobDetailId
                    ? 'cursor-pointer bg-textW w-full max-h-[234px] flex flex-col gap-1 rounded-xl border-[1px] border-gradientFirst rounded-xl px-5 py-4 '
                    : 'cursor-pointer bg-textW w-full max-h-[234px] flex flex-col gap-1 rounded-xl border-[1px] hover:border-gradientFirst rounded-xl px-5 py-4 '
            }
        >
            <div className='flex justify-between flex-wrap gap-1'>
                <div className='flex items-center gap-3'>
                    <JobImage id={props.items.employerId} className=" rounded-full h-8 w-8" />
                    <ReturnName id={props.items.employerId} />
                </div>
                {
                    !openShare && !openReport &&
                    <div className='flex items-center relative'>
                        <Popover className="focus:ring-0 focus:border-0 focus:outline-0">
                            <Popover.Button className="focus:ring-0 focus:border-0 focus:outline-0 flex items-center text-stone-500">
                                <MoreVertOutlinedIcon /* onClick={() => setOpenShare(true)} */ sx={{ fontSize: '1.5rem' }} />
                            </Popover.Button>
                            <Popover.Panel className="absolute  text-[13px] right-0 border-2 rounded-md flex flex-col bg-textW shadow z-10 w-[8rem]">
                                <p className='flex gap-2 p-2 hover:bg-[#F4F4F4]' onClick={() => setOpenShare(true)}><ShareIcon sx={{ fontSize: '1.2rem' }} />Share</p>
                                <p className='flex gap-2 p-2 hover:bg-[#F4F4F4]' onClick={() => handleSaveJob(props.items.$id)}><img src="/icons/save.svg" alt="" className='w-4 h-4' /> Save</p>
                                <p className='flex gap-2 p-2 hover:bg-[#F4F4F4]' onClick={() => setOpenReport(true)}>
                                    <ReportIcon sx={{ fontSize: '1.2rem' }} />
                                    Report Job</p>
                            </Popover.Panel>
                        </Popover>
                    </div>}
                <div className="w-full flex flex-col ">
                    {props.items.jobTitle && (
                        <p className="text-[1rem] font-[600]">
                            {props.items.jobTitle}
                        </p>
                    )}
                    {props.items.jobLocation && (
                        <p className="text-gray-400 text-[14px] flex items-center gap-1">
                            <PlaceOutlinedIcon sx={{ fontSize: '1rem' }} />
                            {props.items.jobLocation}
                        </p>
                    )}
                </div>
            </div>
            <div>
                <ul className="text-[10px] flex gap-y-2 gap-x-1 col-span-12  md:text-[11px] md:gap-x-1 md:mt-1 md:text-[0.55rem] lg:text-[0.8rem] lg:gap-x-3 xl:text-[0.6rem] xl:gap-x-1 justify-between flex-wrap">
                    {props.items.jobType &&
                        <SmallLists icon={<img src='icons/suitCase.svg' />}
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
                            <span className="text-[7px] mr-1">ETB</span>
                        )}
                            items={!props.items.minSalary && props.items.maxSalary
                                ? props.items.maxSalary
                                : props.items.minSalary && !props.items.maxSalary
                                    ? props.items.minSalary
                                    : props.items.minSalary + '-' + props.items.maxSalary}
                        />
                    )}
                    {props.items.datePosted && (
                        <SmallLists
                            icon={<img src='icons/hourGlassUp.svg' />}
                            items={new Date(props.items.datePosted)
                                .toLocaleDateString('en-GB')
                                .replace(/\//g, '-')}
                        />
                    )}
                    {props.items.datePosted && (
                        <SmallLists
                            icon={<img src='icons/hourGlassDown.svg' />}
                            items={new Date(props.items.datePosted)
                                .toLocaleDateString('en-GB')
                                .replace(/\//g, '-')}
                        />
                    )}
                </ul>
            </div>
            <div className="w-full text-[#20262E] text-sm leading-[24px] my-5 md:my-0 md:mt-2 overflow-hidden max-h-[45%] sm:max-h-[90%] pr-2">
                <div className="w-full">
                    <div
                        className="overflow-ellipsis"
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical'
                        }}
                        dangerouslySetInnerHTML={{ __html: props.items.jobDescription }}
                    />
                </div>
            </div>
            <Share openShare={openShare} setOpenShare={setOpenShare} link={props.items.$id} />
            <FormModal openModal={openReport} setOpenModal={setOpenReport} addText={''} text={''} tipText={'hellow'}>
                <form onSubmit={handleReportSubmit} className=" flex flex-col gap-10">
                    <p>Reason for Reporting</p>
                    <div className='flex flex-col gap-3'>
                        <p className={`w-[376px] h-[48px] font-500  flex items-center justify-center cursor-pointer ${reportCode == 1 ? 'bg-gradientFirst text-textW' : 'bg-[#F4F4F4]'}`} onClick={() => setReportCode(1)}>Discriminatory Language</p>
                        <p className={`w-[376px] h-[48px] font-500  flex items-center justify-center cursor-pointer ${reportCode == 2 ? 'bg-gradientFirst text-textW' : 'bg-[#F4F4F4]'}`} onClick={() => setReportCode(2)}>False Information</p>
                        <p className={`w-[376px] h-[48px] font-500  flex items-center justify-center cursor-pointer ${reportCode == 3 ? 'bg-gradientFirst text-textW' : 'bg-[#F4F4F4]'}`} onClick={() => setReportCode(3)}>Spam or Fraudulent</p>
                        {reportCode == 4 && <p className='text-red-500 text-[14px]'>Please Select one of the above</p>}
                        <textarea value={reportMessage} onChange={(e) => {
                            if (e.currentTarget.value.length <= 200) {
                                setReportMessage(e.currentTarget.value)
                            }
                        }} cols={30} rows={20} className='w-[376px] h-60 focus:border-gradientFirst focus:ring-0' placeholder='Additional Message'></textarea>
                    </div>

                    <div className='w-full flex md:justify-end'>
                        <div className='w-full md:w-80'>
                            <SubmitButton loading={reportLoading} buttonText="Save" />
                        </div>
                    </div>
                </form>
            </FormModal>
        </div>
    )
}

export default JobListCard