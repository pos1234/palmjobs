import ConfirmModal from '@/components/ConfirmModal';
import {
    fetchActivePostedJobs,
    fetchClosedPostedJobs,
    getAccount,
    getCompanyData,
    getNoApplicants,
    updateJobStatus,
    updateJobs
} from '@/lib/services';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import dynamic from 'next/dynamic';
import { Popover } from '@headlessui/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployerJobShimmer from '../../shimmer/EmpJobShimmer';
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
import LocalFireDepartmentOutlined from '@mui/icons-material/LocalFireDepartmentOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import CloseIcon from '@mui/icons-material/Close';
import JobImage from '@/components/JobImage';
import EuroIcon from '@mui/icons-material/Euro';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
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
const PJobs = (props: any) => {
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
    const [jobSalary, setJobSalary] = useState(props.salary);
    const [jobDesc, setJobDesc] = useState(props.jobDes);
    const [jobDeadline, setJobDeadline] = useState(props.deadline);
    const [jobTitleError, setJobTitleError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [openRolesError, setOpenRolesError] = useState('');
    const [jobTypeError, setJobTypeError] = useState('');
    const [salaryError, setSalaryError] = useState('');
    const [jobDescError, setJobDescError] = useState('');
    const [noApplicant, setNoApplicant] = useState(0);
    const [empId, setEmpId] = useState('');
    const [compnayDes, setCompanyDes] = useState<any>();
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
                res && res.documents && setCompanyDes(res.documents[0]);
            });
        }
    };
    useEffect(() => {
        getCompInfo();
    }, [empId]);
    const updateStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const deadlineDate = props.deadline;
        const [day, month, year] = deadlineDate.split('-');
        const formattedDate = `${year}-${month}-${day}`;
        const today = new Date().toISOString().split('T')[0];
        if (today <= formattedDate) {
            updateJobStatus(props.jobId, e.currentTarget.value)
                .then((res) => {
                    toast.success('Status Updated Successfully');
                    fetchClosedPostedJobs().then((res: any) => {
                        props.setterActiveJobs(res.documents);
                    });
                })
                .catch((error) => {
                    toast.error('Status Not Updated');
                    console.log(error);
                });
        } else {
            toast.error('The Deadline has passed');
        }
    };
    return (
        <div className="bg-textW grid grid-cols-12 relative py-5 pl-2 xl:pl-9">
            <div className=" flex flex-col justify-center col-span-10 sm:col-span-7 lg:col-span-3">
                <p className="text-neutral-900 text-lg font-medium leading-normal">{props.title}</p>
                <div className="flex flex-wrap text-stone-400 text-[0.8rem] gap-x-4 gap-y-1 mt-1 pr-3">
                    <div>
                        <PinDropOutlinedIcon sx={{ fontSize: '1.1rem' }} className="text-[1.1rem] -mt-1" /> <span>{props.location}</span>
                    </div>
                    <div>
                        <AccessTimeOutlinedIcon sx={{ fontSize: '1.1rem' }} className="text-[1.1rem] -mt-1" /> <span>{props.jobType}</span>
                    </div>
                    {props.salary && (
                        <div>
                            <AttachMoneyOutlinedIcon sx={{ fontSize: '1.1rem' }} className="text-[1.1rem] -mt-1" />
                            <span>{props.salary}</span>
                        </div>
                    )}
                    <div className="flex items-center flex gap-x-2 lg:hidden ">
                        <CalendarTodayOutlinedIcon sx={{ fontSize: '1.1rem' }} className="text-[1.1rem] text-gradientFirst -mt-1" />
                        <span>{props.datePosted}</span>
                    </div>
                    <div className="flex items-center flex gap-x-2 lg:hidden">
                        <Groups2OutlinedIcon sx={{ fontSize: '1.1rem' }} className="text-[1.1rem] text-gradientFirst -mt-1" />
                        <span>{noApplicant}</span>
                    </div>
                </div>
            </div>
            <div className="col-span-2 flex items-center flex gap-x-2 lg:text-[0.9rem] hidden  lg:flex">
                <CalendarTodayOutlinedIcon sx={{ fontSize: '1.1rem' }} className="text-[1.1rem] text-gradientFirst -mt-0.5" />
                <span>{props.datePosted}</span>
            </div>
            <div className="col-span-3 flex items-center flex gap-x-2 lg:text-[0.9rem] hidden lg:flex">
                <Groups2OutlinedIcon sx={{ fontSize: '1.1rem' }} className="text-[1.1rem] text-gradientFirst -mt-0.5" />
                <span>{noApplicant}</span>
            </div>
            <div className="col-span-2 flex items-center max-sm:hidden lg:text-[0.9rem]">
                <select
                    value={jobStatus}
                    onChange={updateStatus}
                    className={
                        jobStatus == 'Close'
                            ? 'bg-red-50 text-red-500 border-0 rounded-2xl text-sm cursor-pointer gap-y-4 focus:ring-orange-500 selector'
                            : 'bg-lightGreen text-green border-0 rounded-2xl text-sm cursor-pointer gap-y-4 focus:ring-orange-500 selector'
                    }
                >
                    <option value="Active">Active</option>
                    <option value="Close">Close</option>
                </select>
            </div>
            <div className="flex items-center pl-0 sm:pl-2 col-span-2  sm:col-span-3 lg:col-span-2 lg:text-[0.9rem] ">
                <Popover className="w-full sm:relative focus:ring-0 focus:border-0 focus:outline-0">
                    <Popover.Button className="focus:ring-0 focus:border-0 focus:outline-0">
                        <MoreHorizIcon
                            sx={{ fontSize: '2.5rem' }}
                            className="text-[2.5rem] focus:ring-0 focus:border-0 focus:outline-0 -mt-1 cursor-pointer"
                        />
                    </Popover.Button>

                    {!openPreview && (
                        <Popover.Panel className="absolute  sm:ml-0 w-[10rem] sm:w-full border-2 rounded-2xl flex flex-col gap-y-3 bg-textW py-3 px-3 bg-white shadow z-10 -ml-28">
                            <div
                                onClick={() => setOpenPreview(true)}
                                className="flex gap-x-3 text-[0.8rem] cursor-pointer items-center text-stone-400 hover:text-stone-700"
                            >
                                <VisibilityIcon sx={{ fontSize: '1rem' }} className="text-[1rem]" />
                                <span>View Details</span>
                            </div>
                        </Popover.Panel>
                    )}
                </Popover>
            </div>
            {openPreview && (
                <ConfirmModal isOpen={openPreview} handleClose={() => setOpenPreview(!openPreview)}>
                    <div className="mx-2 pb-5 w-full pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-6 md:pl-8 md:w-2/3 lg:w-1/2">
                        <div className="col-span-12 flex justify-end pr-3 md:pr-10">
                            <button onClick={() => setOpenPreview(!openPreview)}>
                                <CloseIcon sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }} className="w-8 h-8 p-2 " />
                            </button>
                        </div>
                        <div className="col-span-12 grid grid-cols-12 gap-y-5 bg-textW pt-5 z-[0] rounded-t-xl relative px-2 lg:px-16">
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
                                    <ShareOutlinedIcon className="md:text-[2rem]" />
                                    <BookmarkBorderOutlinedIcon className="md:text-[2rem]" />
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
                            <div className="col-span-12 grid grid-cols-12 border-[1px] mx-3 rounded-full">
                                <div
                                    className={
                                        company == true
                                            ? 'col-span-6 rounded-full rounded-3xl text-lightGrey font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer md:text-bigS'
                                            : 'col-span-6 rounded-full bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer md:text-bigS'
                                    }
                                    onClick={() => setCompany(false)}
                                >
                                    Job Description
                                </div>
                                <div
                                    className={
                                        company == true
                                            ? 'col-span-6 rounded-full bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer md:text-bigS'
                                            : 'col-span-6 rounded-full rounded-3xl text-lightGrey font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer md:text-bigS'
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
                                    <div className="w-full mt-1 rounded-full rounded-3xl bg-gradientSecond text-textW text-bigS font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer ">
                                        Apply
                                    </div>
                                </div>
                            )}
                            {company && (
                                <div className="col-span-12 mx-3">
                                    <p className="font-thW md:text-frhS">Company's Detail</p>
                                    {compnayDes.description && (
                                        <div
                                            className="text-sm text-fadedText max-h-20 overflow-y-auto hideScrollBar"
                                            dangerouslySetInnerHTML={{ __html: compnayDes.description }}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </ConfirmModal>
            )}
        </div>
    );
};
const Closed = () => {
    const [closedJobs, setClosedJobs] = useState<any>();
    const [allLoading, setAllLoading] = useState(false);
    const getClosedJobs = async () => {
        setAllLoading(true);
        const result = await fetchClosedPostedJobs();
        if (result && result.documents) {
            setClosedJobs(result.documents);
            setAllLoading(false);
        }
    };
    useEffect(() => {
        getClosedJobs();
    }, []);
    return (
        <>
            {allLoading && (
                <div className="flex flex-col gap-y-10 pt-5">
                    <EmployerJobShimmer />
                    <EmployerJobShimmer />
                </div>
            )}
            {!allLoading && (
                <div className="col-span-12 space-y-4 bg-forBack  h-[25rem] overflow-y-auto p-1 xl:p-3">
                    {closedJobs &&
                        closedJobs.map((item: any, index: number) => {
                            return (
                                <PJobs
                                    compName={item.companyName}
                                    jobId={item.$id}
                                    key={index}
                                    title={item.jobTitle}
                                    location={item.jobLocation}
                                    jobType={item.jobType}
                                    minSalary={item.minSalary}
                                    maxSalary={item.maxSalary}
                                    datePosted={new Date(item.datePosted).toLocaleDateString('en-GB').replace(/\//g, '-')}
                                    jobStatus={item.jobStatus}
                                    jobDes={item.jobDescription}
                                    openRoles={item.openPositions}
                                    deadline={new Date(item.applicationDeadline).toLocaleDateString('en-GB').replace(/\//g, '-')}
                                    setterActiveJobs={setClosedJobs}
                                />
                            );
                        })}
                </div>
            )}
        </>
    );
};

export default Closed;
