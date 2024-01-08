import ConfirmModal from '@/components/ConfirmModal';
import { fetchAllEmployerJob, fetchSinglePostedJobs, getCompanyData, getNoApplicants, updateJobStatus, updateJobs } from '@/backend/employerBackend';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Popover } from '@headlessui/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import PeopleIcon from '@mui/icons-material/People';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Share from '@/components/Share';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Link from 'next/link';
import BlockIcon from '@mui/icons-material/Block';
import TextInput, { SmallLists, SubmitButton } from '@/components/TextInput';
import JobDetail from '@/components/job/JobDetail';
import { useJobPostContext } from '@/contextApi/jobPostData';
import { useGlobalContext } from '@/contextApi/userData';
import { useRouter } from 'next/router';
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
});
const JobCard = (props: any) => {
    const router = useRouter()
    const { userData } = useGlobalContext()
    const { handleJobSelection, jobPostTabs, setPostingTabs, setAllEmployerJobs } = useJobPostContext()
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
    const [jobDescError, setJobDescError] = useState('');
    const [openShare, setOpenShare] = useState(false);
    const [noApplicant, setNoApplicant] = useState(0);
    const [empId, setEmpId] = useState('');
    const [jobDetails, setJobDetails] = useState<any>()
    const [companyName, setCompanyName] = useState(' ');
    const [companyData, setCompanyData] = useState<any>()
    const [compnayDes, setCompanyDes] = useState<any>();
    const [sure, setSure] = useState(false)
    const [loadings, setLoadings] = useState(false)
    const handleSelection = (id: string) => {
        handleJobSelection(id)
        setPostingTabs({
            ...jobPostTabs,
            chooseJob: false,
            first: true
        })
    }
    const handleApplicants = (id: string) => {
        typeof window !== 'undefined' && router.push({
            pathname: '/users/employer/candidates',
            query: { param1: id }
        });
    }
    const updateStatus = (e: string) => {
        setLoadings(true)
        updateJobStatus(props.jobId, e)
            .then((res) => {
                toast.success('Status Updated Successfully');
                setSure(false)
                setLoadings(false)
                fetchAllEmployerJob().then((res: any) => {
                    setAllEmployerJobs(res?.documents)
                }).catch((error) => {
                    console.log(error);
                })
            })
            .catch((error) => {
                toast.error('Status Not Updated');
                setLoadings(false)
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
        if (userData) {
            const documents = getCompanyData(userData.$id);
            setEmpId(userData.$id);
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
    }, [empId, userData]);
    const handleDateChange = (date: string) => {
        const [year, month, day] = date.split('-');
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    };
    return (
        <>
            <div className="flex sm:relative py-5 px-2 xl:px-6 border-2 rounded-lg">
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
                        <div onClick={() => handleApplicants(props.jobId)} className="inline cursor-pointer bg-[#FAFAFA] flex items-center gap-1 text-xs text-gradientFirst rounded-[4px] p-2 px-3 sm:px-2 sm:py-1 md:max-lg:px-1.5 md:max-lg:py-2 xl:h-[28px]">
                            <Groups2OutlinedIcon
                                sx={{ fontSize: '1rem' }}
                                className="-mt-0.5 mr-1 "
                            />
                            <span className='text-[#20262E]'>{noApplicant.toString()}</span>
                        </div>
                    </div>
                </div>
                <div className="flex max-sm:hidden lg:text-[0.9rem]">
                    <select
                        value={jobStatus}
                        onChange={(e) => {
                            if (e.currentTarget.value.toString() == 'Close') {
                                setSure(true)
                            } else {
                                updateStatus(e.currentTarget.value.toString())
                            }
                        }}
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
                                    ? 'absolute -ml-28  w-[10rem] border-2 rounded-lg flex flex-col gap-y-3 bg-textW py-3 px-3 bg-white shadow z-10'
                                    : 'hidden'
                            }
                        >
                            <div
                                onClick={() => updateStatus('Close')}
                                className="md:hidden flex gap-x-3 border-0 text-[0.8rem] md:max-lg:text-red-500 cursor-pointer items-center text-stone-400 hover:text-stone-700"
                            >
                                <BlockIcon sx={{ fontSize: '1rem' }} className="text-[1rem]" />
                                <div>Close Job</div>
                            </div>
                            {jobStatus !== 'Close' && <>
                                <div
                                    onClick={() => setOpenJobEdit(true)}
                                    className="flex gap-x-3 text-[0.8rem] md:max-lg:text-red-500 cursor-pointer items-center text-stone-400 hover:text-stone-700"
                                >
                                    <ModeEditIcon sx={{ fontSize: '1rem' }} className="text-[1rem]" />
                                    <span>Quick Edit</span>
                                </div>
                                <Link href="/users/employer/post"
                                    onClick={() => {
                                        handleSelection(props.jobId)
                                    }}
                                    className="flex gap-x-3 text-[0.8rem] md:max-lg:text-red-500 cursor-pointer items-center text-stone-400 hover:text-stone-700"
                                >
                                    <BorderColorIcon sx={{ fontSize: '1rem' }} className="text-[1rem]" />
                                    <span>Full Edit</span>
                                </Link>
                            </>
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
                                    onClick={() => handleApplicants(props.jobId)}
                                    className="flex gap-x-3 text-[0.8rem] cursor-pointer items-center text-stone-400 hover:text-stone-700"
                                >
                                    <PeopleIcon sx={{ fontSize: '1rem' }} className="text-[1rem]" />
                                    <span>Candidates</span>
                                </div>
                            </>
                            }
                        </Popover.Panel>
                    </Popover>
                </div>
                <Share openShare={openShare} setOpenShare={setOpenShare} link={props.jobId} />
                <ConfirmModal isOpen={openPreview} handleClose={() => setOpenPreview(!openPreview)}>
                    <div className="mx-2 pb-5 w-full  bg-textW rounded-lg grid grid-cols-12 pt-6 sm:pl-5 md:pl-8 md:w-2/3 lg:w-1/2 h-full overflow-y-auto">
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
                    </div>
                </ConfirmModal>
                <ConfirmModal isOpen={openJobEdit} handleClose={() => setOpenJobEdit(!openJobEdit)}>
                    <div className="mx-2 pb-5 w-full px-5 bg-textW rounded-lg grid grid-cols-12 pt-6 overflow-auto h-full md:pl-8 md:w-2/3 lg:w-1/2">
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
                                        className="h-12 pl-5 bg-white rounded-lg border border-gray-200 focus:ring-gradientFirst focus:border-0 w-full grow md:w-96"
                                    >
                                        <option value="Internship">Internship</option>
                                        <option value="Full-Time">Full Time</option>
                                        <option value="Part-Time">Part Time</option>
                                        <option value="Remote">Remote</option>
                                        <option value="Contract">Contract</option>
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
                                                    ? 'h-12 pl-5 bg-white rounded-lg border border-red-500 focus:ring-gradientFirst focus:border-0 w-full md:w-auto hideIncrease'
                                                    : 'h-12 pl-5 bg-white rounded-lg border border-gray-200 focus:ring-gradientFirst focus:border-0 w-full md:w-auto hideIncrease'
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
                                                    ? 'h-12 pl-5 bg-white rounded-lg border border-red-500 focus:ring-gradientFirst focus:border-0 w-full md:w-auto hideIncrease'
                                                    : 'h-12 pl-5 bg-white rounded-lg border border-gray-200 focus:ring-gradientFirst focus:border-0 w-full md:w-auto hideIncrease'
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-x-[4.5rem] max-md:flex-col md:items-center">
                                    <p className="text-neutral-900 text-opacity-70 text-lg font-medium leading-loose"> Deadline</p>
                                    <input
                                        type="date"
                                        className="h-12 pl-5 bg-white cursor-pointer rounded-lg border border-gray-200 focus:ring-gradientFirst focus:border-0 w-full grow md:w-96"
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
                                <div className='w-full flex justify-end'>
                                    <div className='w-full md:w-80'>
                                        <SubmitButton loading={loading} buttonText="Update Job" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </ConfirmModal>
                <ConfirmModal isOpen={sure} handleClose={() => setSure(!sure)}>
                    <div className="mx-2 pb-10 w-full pl-5 bg-textW rounded-2xl flex flex-col gap-y-5 items-center justify-center pt-10 md:pl-8 pr-5 md:w-2/3 lg:w-1/2 md:mx-0">
                        <p className="col-span-12 text-black text-2xl font-semibold leading-10 ">Are you sure you want to Close?</p>
                        <div className="flex gap-10 flex-wrap w-full justify-center">
                            <button
                                onClick={() => setSure(!sure)}
                                type="button"
                                className="bg-gray-200 h-14 w-full md:w-60 rounded-xl order-1 sm:order-2"
                            >
                                No
                            </button>
                            <button onClick={() => {
                                updateStatus("Close")
                            }} disabled={loadings ? true : false} type="button" className="bg-black w-full md:w-60 rounded-xl text-textW h-14 order-1 sm:order-2">
                                {loadings && <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gradientFirst animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>}
                                {loadings && <span>Loading...</span>}
                                {!loadings && <span>Yes</span>}
                            </button>
                        </div>
                    </div>
                </ConfirmModal>
            </div >
        </>
    );
};

export default JobCard