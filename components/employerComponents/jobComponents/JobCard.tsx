import ConfirmModal from '@/components/ConfirmModal';
import { fetchActivePostedJobs, fetchClosedPostedJobs, fetchSinglePostedJobs, getCompanyData, getNoApplicants, updateJobStatus, updateJobs } from '@/lib/employerBackend';
import React, { useEffect, useState } from 'react';
import { getAccount } from '@/lib/accountBackend';
import dynamic from 'next/dynamic';
import { Popover } from '@headlessui/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import EmployerJobShimmer from '../../shimmer/EmpJobShimmer';
import EuroIcon from '@mui/icons-material/Euro';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import AttachMoneyOutlined from '@mui/icons-material/AttachMoneyOutlined';
import AccessTimeOutlined from '@mui/icons-material/AccessTimeOutlined';
import PeopleIcon from '@mui/icons-material/People';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Share from '@/components/Share';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import JobImage from '@/components/JobImage';
import Link from 'next/link';
import TextInput, { SmallLists } from '@/components/TextInput';
import JobDetail from '@/components/job/JobDetail';
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
});

const Jobtype = (props: any) => {
    return (
        <div className="col-span-6 flex flex-col max-md:pl-2 py-2 rounded-2xl gap-y-2 bg-textW sm:col-span-3 items-center">
            <p className="font-fhW sm:max-md:text-[0.8rem] md:text-fhS md:max-lg:text-[1rem]"> {props.salary}</p>
            <p className=" text-fadedText sm:max-md:text-[12px] flex md:max-lg:text-[0.7rem] lg:text-[14px]">
                {props.icon}
                {props.money}
            </p>
        </div>
    );
};
const JobCard = (props: any) => {
    const loadingIn = '/images/loading.svg';
    const [loading, setLoading] = useState(false);
    const [jobStatus, setJobStatus] = useState(props.jobStatus);
    const [openPreview, setOpenPreview] = useState(false);
    const [openJobEdit, setOpenJobEdit] = useState(false);
    const [company, setCompany] = useState(false);
    const [jobTitle, setJobTitle] = useState(props.title);
    const [location, setLocation] = useState(props.location);
    const [openRoles, setOpenRoles] = useState(props.openRoles);
    const [jobType, setJobType] = useState(props.jobType);
    const [minJobSalary, setMinJobSalary] = useState(props.minSalary);
    const [maxJobSalary, setMaxJobSalary] = useState(props.maxSalary);
    const [jobDesc, setJobDesc] = useState(props.jobDes);
    const [jobDeadline, setJobDeadline] = useState(props.deadline);
    const [jobTitleError, setJobTitleError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [openRolesError, setOpenRolesError] = useState('');
    const [jobTypeError, setJobTypeError] = useState('');
    const [salaryError, setSalaryError] = useState('');
    const [jobDescError, setJobDescError] = useState('');
    const [openShare, setOpenShare] = useState(false);
    const [noApplicant, setNoApplicant] = useState(0);
    const [empId, setEmpId] = useState('');
    const [jobDetails, setJobDetails] = useState<any>()
    const [companyName, setCompanyName] = useState(' ');
    const [companyData, setCompanyData] = useState<any>()
    const [compnayDes, setCompanyDes] = useState<any>();
    const updateStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        updateJobStatus(props.jobId, e.currentTarget.value)
            .then((res) => {
                toast.success('Status Updated Successfully');
                jobStatus !== 'Close' && fetchActivePostedJobs().then((res: any) => {
                    props.setterActiveJobs(res.documents);
                });
                jobStatus == 'Close' && fetchClosedPostedJobs().then((res: any) => {
                    props.setterActiveJobs(res.documents);
                });
            })
            .catch((error) => {
                toast.error('Status Not Updated');
                console.log(error);
            });
    };
    const updateFullJob = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setLoading(true);
        updateJobs(
            props.jobId,
            jobTitle || props.title,
            openRoles || props.openRoles,
            location || props.location,
            jobType || props.jobType,
            minJobSalary || props.minSalary,
            maxJobSalary || props.maxSalary,
            jobDeadline || props.deadline,
            jobDesc || props.jobDes
        )
            .then((res) => {
                setLoading(false);
                toast.success('Successfully Updated Job');
                setOpenJobEdit(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.success('Job Not Updated');
                console.log(error);
            });
    };
    useEffect(() => {
        getNoApplicants(props.jobId).then((res) => {
            setNoApplicant(res.total);
        });
    }, [props.jobId]);
    const getCompInfo = async () => {
        const accountInfo = await getAccount();
        if (accountInfo !== 'failed') {
            const documents = getCompanyData(accountInfo.$id);
            setEmpId(accountInfo.$id);
            documents.then((res) => {
                if (res.documents && res.documents[0] && res.documents[0]) {
                    setCompanyData(res.documents[0]);
                    setCompanyDes(res.documents[0])
                    setCompanyName(res.documents[0].companyName);
                } else {
                    setCompanyName('');
                }
                fetchSinglePostedJobs(props.jobId).then((res) => {
                    res && setJobDetails(res.documents[0]);
                });
            });
        }
    };
    useEffect(() => {
        getCompInfo();
    }, [empId]);
    const handleDateChange = (date: string) => {
        const [year, month, day] = date.split('-');
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    };
    return (
        <div className="bg-textW flex sm:relative py-5 px-2 xl:px-6 border-2 rounded-lg">
            <div className=" flex flex-grow  flex-col">
                <Link href={`/jobs/${props.jobId}`} target="_blank" className="text-neutral-900 text-lg font-medium leading-normal">
                    {props.title}
                </Link>
                <div className='text-gray-400 flex items-center gap-0.5'>
                    <PlaceOutlinedIcon sx={{ fontSize: '1.1rem' }} className="text-[1.1rem] -mt-1" /> <span className='text-sm'>{props.location}</span>
                </div>
                <div className="flex flex-wrap text-stone-400 text-[0.8rem] gap-x-4 gap-y-1 mt-1 pr-3">
                    {props.jobType && (
                        <SmallLists
                            icon={<img src='/icons/suitCase.svg' />}
                            items={props.jobType}
                        />
                    )}
                    {props.datePosted && (
                        <SmallLists
                            icon={<img src='/icons/hourGlassUp.svg' />}
                            items={new Date(props.datePosted)
                                .toLocaleDateString('en-GB')
                                .replace(/\//g, '-')}
                        />
                    )}
                    {props.deadline && (
                        <SmallLists
                            icon={<img src='/icons/hourGlassDown.svg' />}
                            items={new Date(props.deadline)
                                .toLocaleDateString('en-GB')
                                .replace(/\//g, '-')}
                        />
                    )}
                    <SmallLists
                        icon={<Groups2OutlinedIcon
                            sx={{ fontSize: '1rem' }}
                            className="-mt-0.5 mr-1 "
                        />}
                        items={noApplicant.toString()}
                    />
                </div>
            </div>
            <div className="flex max-sm:hidden lg:text-[0.9rem]">
                <select
                    value={jobStatus}
                    onChange={updateStatus}
                    className={
                        jobStatus == 'Close'
                            ? 'bg-red-50 text-red-500 border-0 rounded-lg w-32 h-10 text-sm cursor-pointer gap-y-4 focus:ring-gradientFirst selector'
                            : 'bg-lightGreen text-green border-0 rounded-lg w-32 h-10 text-sm cursor-pointer gap-y-4 focus:ring-gradientFirst selector'
                    }
                >
                    <option value="Active">Active</option>
                    <option value="Close">Close</option>
                </select>
            </div>
            <div className="flex  pl-0 sm:pl-2 lg:text-[0.9rem] ">
                <Popover className="w-full focus:ring-0 focus:border-0 focus:outline-0">
                    <Popover.Button className="focus:ring-0 focus:border-0 focus:outline-0">
                        <MoreVertOutlinedIcon
                            sx={{ fontSize: '2rem' }}
                            className="focus:ring-0 focus:border-0 focus:outline-0 cursor-pointer"
                        />
                    </Popover.Button>
                    <Popover.Panel
                        className={
                            openShare == false && openJobEdit == false && openPreview == false
                                ? 'absolute -ml-28  w-[10rem] border-2 rounded-2xl flex flex-col gap-y-3 bg-textW py-3 px-3 bg-white shadow z-10'
                                : 'hidden'
                        }
                    >
                        <select
                            value={jobStatus}
                            onChange={updateStatus}
                            className="md:hidden flex gap-x-3 text-[0.8rem] md:max-lg:text-red-500 cursor-pointer items-center text-stone-400 hover:text-stone-700"
                        >
                            <ModeEditIcon sx={{ fontSize: '1rem' }} className="text-[1rem]" />
                            <option value="Close">Close Job</option>
                        </select>
                        {jobStatus !== 'Close' && <>
                            <div
                                onClick={() => setOpenJobEdit(true)}
                                className="flex gap-x-3 text-[0.8rem] md:max-lg:text-red-500 cursor-pointer items-center text-stone-400 hover:text-stone-700"
                            >
                                <ModeEditIcon sx={{ fontSize: '1rem' }} className="text-[1rem]" />
                                <span>Quick Edit</span>
                            </div>
                            <div
                                onClick={() => {
                                    props.setEditedJobId(props.jobId);
                                }}
                                className="flex gap-x-3 text-[0.8rem] md:max-lg:text-red-500 cursor-pointer items-center text-stone-400 hover:text-stone-700"
                            >
                                <BorderColorIcon sx={{ fontSize: '1rem' }} className="text-[1rem]" />
                                <span>Full Edit</span>
                            </div></>
                        }
                        <div
                            onClick={() => setOpenPreview(true)}
                            className="flex gap-x-3 text-[0.8rem] cursor-pointer items-center text-stone-400 hover:text-stone-700"
                        >
                            <VisibilityIcon sx={{ fontSize: '1rem' }} className="text-[1rem]" />
                            <span>View Details</span>
                        </div>

                        {jobStatus !== 'Close' && <>
                            <div
                                onClick={() => setOpenShare(!openShare)}
                                className="flex gap-x-3 text-[0.8rem] cursor-pointer items-center text-stone-400 hover:text-stone-700"
                            >
                                <ShareOutlinedIcon sx={{ fontSize: '1rem' }} className="text-[1rem]" />
                                <span>Share</span>
                            </div>
                            <div
                                onClick={() => props.applicants(props.jobId)}
                                className="flex gap-x-3 text-[0.8rem] cursor-pointer items-center text-stone-400 hover:text-stone-700"
                            >
                                <PeopleIcon sx={{ fontSize: '1rem' }} className="text-[1rem]" />
                                <span>Applicants</span>
                            </div>
                        </>
                        }
                    </Popover.Panel>
                </Popover>
            </div>
            <Share openShare={openShare} setOpenShare={setOpenShare} link={props.jobId} />

            <ConfirmModal isOpen={openPreview} handleClose={() => setOpenPreview(!openPreview)}>
                <div className="mx-2 pb-5 w-full  bg-textW rounded-2xl grid grid-cols-12 pt-6 sm:pl-5 md:pl-8 md:w-2/3 lg:w-1/2">
                    <div className="col-span-12 flex justify-end pr-3 md:pr-10">
                        <button onClick={() => setOpenPreview(!openPreview)}>
                            <CloseIcon sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }} className="w-8 h-8 p-2 " />
                        </button>
                    </div>
                    <div className="col-span-12 grid grid-cols-12 gap-y-5 bg-textW pt-5 z-[0] rounded-t-xl relative px-2 lg:px-16">
                        <JobDetail
                            jobDetails={jobDetails}
                            companyName={companyName}
                            company={company}
                            setCompany={setCompany}
                            companyData={companyData}
                        />
                    </div>

                    {/* <div className="col-span-12 grid grid-cols-12 gap-y-5 bg-textW pt-5 z-[0] rounded-t-xl relative px-2 lg:px-16">
                        <div className="col-span-12 grid grid-cols-12 gap-0">
                            <JobImage id={empId} className="col-span-2 w-full h-full sm:h-[5.8rem]" />
                            <div className="col-span-8 flex flex-col pl-3">
                                <p className="text-[12px] text-darkBlue sm:text-fhS xl:text-[1rem]">{props.compName}</p>
                                <p className="text-darkBlue font-midRW text-midRS sm:font-fhW sm:text-dfvhS xl:text-[1.5rem]">
                                    {props.title}
                                </p>
                                <p className="text-fadedText">
                                    <PinDropOutlinedIcon sx={{ fontSize: '1.2rem', marginTop: '-0.2rem' }} />
                                    {props.location}
                                </p>
                            </div>
                            <div className="col-span-2 flex gap-x-2 text-lightGrey items-center md:gap-x-5">
                                <ShareOutlinedIcon className=" md:text-[2rem]" />
                                <BookmarkBorderOutlinedIcon className=" md:text-[2rem]" />
                            </div>
                        </div>
                        <div className="col-span-12 grid grid-cols-12 bg-forBack gap-x-1 gap-y-2 md:gap-x-2 md:p-2 xl:mx-2">
                            {(props.minSalary || props.maxSalary) && (
                                <Jobtype
                                    salary="Salary"
                                    money={
                                        !props.minSalary && props.maxSalary
                                            ? props.maxSalary
                                            : props.minSalary && !props.maxSalary
                                                ? props.minSalary
                                                : props.minSalary + '-' + props.maxSalary
                                    }
                                    icon={
                                        props.currency == 'euro' ? (
                                            <EuroIcon className="text-[18px] mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]" />
                                        ) : props.currency == 'usd' ? (
                                            <AttachMoneyOutlined className="text-[18px] mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]" />
                                        ) : props.currency == 'gpb' ? (
                                            <CurrencyPoundIcon className="text-[18px] mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]" />
                                        ) : props.currency == 'rnp' ? (
                                            <CurrencyRupeeIcon className="text-[18px] mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]" />
                                        ) : (
                                            <span className="mr-2">ETB</span>
                                        )
                                    }
                                />
                            )}
                            <Jobtype
                                salary="Job Type"
                                money={props.jobType}
                                icon={
                                    <AccessTimeOutlined
                                        sx={{ fontSize: '1.125rem' }}
                                        className="text-[18px] mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]"
                                    />
                                }
                            />
                            {props.datePosted && (
                                <Jobtype
                                    salary="Posted Date"
                                    money={props.datePosted}
                                    icon={
                                        <CalendarTodayOutlinedIcon
                                            sx={{ fontSize: '1.125rem' }}
                                            className="text-[18px] mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]"
                                        />
                                    }
                                />
                            )}
                            {props.deadline && (
                                <Jobtype
                                    salary="Deadline"
                                    money={props.deadline}
                                    icon={
                                        <CalendarTodayOutlinedIcon
                                            sx={{ fontSize: '1.125rem' }}
                                            className="text-[18px] mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]"
                                        />
                                    }
                                />
                            )}
                        </div>
                        <div className="col-span-12 grid grid-cols-12 border-[1px] mx-3 rounded-xl">
                            <div
                                className={
                                    company == true
                                        ? 'col-span-6 rounded-xl rounded-3xl text-lightGrey font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer md:text-bigS'
                                        : 'col-span-6 rounded-xl bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer md:text-bigS'
                                }
                                onClick={() => setCompany(false)}
                            >
                                Job Description
                            </div>

                            <div
                                className={
                                    company == true
                                        ? 'col-span-6 rounded-xl bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer md:text-bigS'
                                        : 'col-span-6 rounded-xl rounded-3xl text-lightGrey font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer md:text-bigS'
                                }
                                onClick={() => setCompany(true)}
                            >
                                Company
                            </div>
                        </div>
                        {!company && (
                            <div className="col-span-12 mx-3">

                                <div
                                    className="text-sm text-fadedText max-h-20 overflow-y-auto hideScrollBar"
                                    dangerouslySetInnerHTML={{ __html: props.jobDes }}
                                />
                                <div className="w-full mt-1 rounded-xl rounded-3xl bg-gradientSecond text-textW text-bigS font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer ">
                                    Apply
                                </div>
                            </div>
                        )}
                        {company && (
                            <div className="col-span-12 mx-3">
                                <p className="font-thW  sm:text-frhS">Company's Detail</p>
                                {compnayDes.description && (
                                    <div
                                        className="text-sm text-fadedText max-h-20 overflow-y-auto hideScrollBar"
                                        dangerouslySetInnerHTML={{ __html: compnayDes.description }}
                                    />
                                )}
                            </div>
                        )}
                    </div> */}
                </div>
            </ConfirmModal>
            <ConfirmModal isOpen={openJobEdit} handleClose={() => setOpenJobEdit(!openJobEdit)}>
                <div className="mx-2 pb-5 w-full px-5 bg-textW rounded-2xl grid grid-cols-12 pt-6 overflow-auto h-full md:pl-8 md:w-2/3 lg:w-1/2">
                    <div className="col-span-12 grid grid-cols-12">
                        <div className="col-span-11  flex items-center text-2xl font-[600] text-gradientFirst">Edit Job Post</div>
                        <div className="col-span-2 mb-4 md:col-span-1 grid pr-2 justify-items-end">
                            <button onClick={() => setOpenJobEdit(!openJobEdit)}>
                                <CloseIcon
                                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                    className="w-8 h-8 p-2 "
                                />
                            </button>
                        </div>
                        <form className="col-span-12 flex flex-col gap-y-5" onSubmit={updateFullJob}>
                            <div className="flex gap-x-20 max-md:flex-col md:items-center">
                                <p className="text-neutral-900 text-opacity-70 text-lg font-medium leading-loose">Job Title</p>
                                <TextInput
                                    value={jobTitle}
                                    setFunction={setJobTitle}
                                    errorMessage={jobTitleError}
                                    className="flex-grow grow"
                                />
                            </div>
                            <div className="flex gap-x-20 max-md:flex-col md:items-center">
                                <p className="text-neutral-900 text-opacity-70 text-lg font-medium leading-loose">Location</p>
                                <TextInput value={location} setFunction={setLocation} errorMessage={locationError} />
                            </div>
                            <div className="flex gap-x-6 max-md:flex-col md:items-center">
                                <p className="text-neutral-900 text-opacity-70 text-lg font-medium leading-loose">Open Positions</p>
                                <TextInput value={openRoles} setFunction={setOpenRoles} errorMessage={openRolesError} />
                            </div>
                            <div className="flex gap-x-[4.5rem] max-md:flex-col md:items-center">
                                <p className="text-neutral-900 text-opacity-70 text-lg font-medium leading-loose"> Job Type</p>
                                <select
                                    onChange={(e) => setJobType(e.currentTarget.value)}
                                    className="h-12 pl-5 bg-white rounded-3xl border border-gray-200 focus:ring-gradientFirst focus:border-0 w-full grow md:w-96"
                                >
                                    <option value="Internship">Internship</option>
                                    <option value="Internship">Full Time</option>
                                    <option value="Internship">Part Time</option>
                                    <option value="Internship">Remote</option>
                                    <option value="Internship">Contract</option>
                                </select>
                            </div>
                            <div className="flex gap-x-24 max-md:flex-col md:items-center">
                                <p className="text-neutral-900 text-opacity-70 text-lg font-medium leading-loose"> Salary</p>
                                <div className="flex justify-between grow gap-x-2">
                                    <input
                                        value={minJobSalary}
                                        onChange={(e) => setMinJobSalary(e.currentTarget.value)}
                                        type="number"
                                        className={
                                            props.errorMessage
                                                ? 'h-12 pl-5 bg-white rounded-3xl border border-red-500 focus:ring-gradientFirst focus:border-0 w-full md:w-auto hideIncrease'
                                                : 'h-12 pl-5 bg-white rounded-3xl border border-gray-200 focus:ring-gradientFirst focus:border-0 w-full md:w-auto hideIncrease'
                                        }
                                        placeholder="Minimum Salary"
                                    />
                                    <input
                                        placeholder="Maximum Salary"
                                        value={maxJobSalary}
                                        onChange={(e) => setMaxJobSalary(e.currentTarget.value)}
                                        type="number"
                                        className={
                                            props.errorMessage
                                                ? 'h-12 pl-5 bg-white rounded-3xl border border-red-500 focus:ring-gradientFirst focus:border-0 w-full md:w-auto hideIncrease'
                                                : 'h-12 pl-5 bg-white rounded-3xl border border-gray-200 focus:ring-gradientFirst focus:border-0 w-full md:w-auto hideIncrease'
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex gap-x-[4.5rem] max-md:flex-col md:items-center">
                                <p className="text-neutral-900 text-opacity-70 text-lg font-medium leading-loose"> Deadline</p>
                                <input
                                    type="date"
                                    className="h-12 pl-5 bg-white cursor-pointer rounded-3xl border border-gray-200 focus:ring-gradientFirst focus:border-0 w-full grow md:w-96"
                                    value={handleDateChange(jobDeadline)}
                                    onChange={(e) => setJobDeadline(e.currentTarget.value)}
                                />
                            </div>
                            <div className="flex flex-col mb-20 md:mb-10">
                                <p className="text-neutral-900 text-opacity-70 text-lg font-medium leading-loose">Job Description</p>
                                <ReactQuill
                                    className="h-28 text-addS"
                                    value={jobDesc}
                                    onChange={(e) => setJobDesc(e)}
                                    placeholder="Add Description"
                                />
                                {jobDescError && <p className="text-red-500 absolute bottom-3 text-[13px] ">{jobDescError}</p>}
                            </div>
                            {!loading && (
                                <button
                                    type="submit"
                                    className="text-textW bg-gradient-to-r flex self-end items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 rounded-xl w-full md:w-5/12 lg:w-3/12"
                                >
                                    Update Job
                                </button>
                            )}
                            {loading && (
                                <img
                                    src={loadingIn}
                                    className="text-textW bg-gradient-to-r self-end flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 rounded-xl w-full md:w-5/12 lg:w-3/12"
                                />
                            )}
                        </form>
                    </div>
                </div>
            </ConfirmModal>

        </div>
    );
};

export default JobCard