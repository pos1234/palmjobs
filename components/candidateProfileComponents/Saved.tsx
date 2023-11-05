import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchSavedJobIds, unSaveJobs, fetchSavedJobsData, getSavedJobId, fetchAppliedJobIds, getCompanyData } from '@/lib/candidateBackend';
import { useEffect, useState } from 'react';
import ApplyToJob from './ApplyToJobs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JobImage from '../JobImage';
import SingleJobShimmer from '../shimmer/SingleJobShimmer';
import Link from 'next/link';
const CompanyName = (props: any) => {
    const [compData, setCompData] = useState<any>();
    const getCompData = () => {
        getCompanyData(props.id).then((res) => {
            res && res.documents && setCompData(res.documents[0]);
        });
    };
    useEffect(() => {
        getCompData();
    }, []);
    return <>{compData && <p className="text-[12px] text-darkBlue sm:text-fhS">{compData.companyName}</p>}</>;
};
const SavedJobs = (props: any) => {
    const [savedJobId, setSavedJobId] = useState<any[]>([]);
    const [savedJobs, setSavedJobs] = useState<any[]>([]);
    const [apply, setApply] = useState(false);
    const [jobId, setJobId] = useState();
    const [employerId, setEmployerId] = useState();
    const [allLoading, setAllLoading] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    useEffect(() => {
        setAllLoading(true);
        fetchSavedJobIds().then((res: any) => {
            res && res.total == 0 && setAllLoading(false);
            for (let i = 0; i < res.documents.length; i++) {
                if (!savedJobId.includes(res.documents[i].jobId)) {
                    savedJobId.push(res.documents[i].jobId);
                    fetchSavedJobsData(savedJobId)
                        .then((responseData) => {
                            setSavedJobs(responseData);
                            setAllLoading(false);
                        })
                        .catch((error) => {
                            console.error('Error fetching data from Appwrite:', error);
                        });
                }
            }
        });
    }, [savedJobId]);
    const removeSave = (id: string) => {
        getSavedJobId(id).then((res) => {
            const index = savedJobId.indexOf(res.documents[0].$id);
            savedJobId.splice(index, 1);
            unSaveJobs(res.documents[0].$id)
                .then((rem) => {
                    toast.success('Successfully Unsaved Job');
                    fetchSavedJobIds().then((res: any) => {
                        fetchSavedJobsData(savedJobId)
                            .then((responseData) => {
                                setSavedJobs(responseData);
                            })
                            .catch((error) => {
                                console.error('Error fetching data from Appwrite:', error);
                            });
                    });
                })
                .catch((error) => {
                    toast.success('Failed to Unsaved Job');
                    console.log(error);
                });
        });
    };
    return (
        <>
            {allLoading && (
                <div className="col-span-12 flex flex-col gap-3 gap-y-10 p-3">
                    <div className="flex gap-x-5">
                        <div className="w-24 h-24 rounded-2xl bg-gray-300 rounded animate-pulse col-span-12"></div>
                        <div className="flex flex-col gap-2 justify-center w-full">
                            <div className="text-neutral-900 text-xl font-medium leading-7 md:w-2/3">
                                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                            <div className="text-stone-300 text-lg font-normal leading-relaxed w-2/3 md:w-1/2">
                                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                            <div className="text-neutral-900 text-opacity-70 text-xl font-normal leading-7 w-1/2">
                                <div className="h-4 bg-gray-300 rounded animate-pulse md:w-1/2"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-x-5">
                        <div className="w-24 h-24 rounded-2xl bg-gray-300 rounded animate-pulse col-span-12"></div>
                        <div className="flex flex-col gap-2 justify-center w-full">
                            <div className="text-neutral-900 text-xl font-medium leading-7 md:w-2/3">
                                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                            <div className="text-stone-300 text-lg font-normal leading-relaxed w-2/3 md:w-1/2">
                                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                            <div className="text-neutral-900 text-opacity-70 text-xl font-normal leading-7 w-1/2">
                                <div className="h-4 bg-gray-300 rounded animate-pulse md:w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!allLoading && savedJobs.length == 0 && props.view && (
                <div className="col-span-12 text-center flex flex-col items-center gap-y-3">
                    <p>No saved jobs under your palm tree yet. Browse the listings to find your next opportunity.</p>
                    <Link
                        href="/jobs"
                        className="w-60 bg-gradient-to-r from-gradientFirst to-gradientSecond px-10 py-5 rounded-full text-textW cursor-pointer"
                    >
                        Find Job
                    </Link>
                </div>
            )}
            {savedJobs &&
                !allLoading &&
                savedJobs.map((datas: any) => {
                    return (
                        <div className={props.view ? 'col-span-12 grid grid-cols-12 py-3 bg-textW' : 'hidden'} key={datas.$id}>
                            <JobImage id={datas.employerId} className="hidden md:col-span-2 md:block lg:col-span-1" />
                            <div className="col-span-12 pl-5 grid grid-cols-12 md:col-span-10 lg:col-span-8">
                                <JobImage id={datas.employerId} className="col-span-2 md:hidden" />
                                <div className="col-span-10 pl-1">
                                    <CompanyName id={datas.employerId} />
                                  
                                    <Link href={`/jobs/${datas.$id}`} target="_blank" className="text-darkBlue font-midRW text-midRS sm:font-fhW sm:text-frhS">{datas.jobTitle}</Link>
                                    <p className="text-fadedText rounded-full md:hidden">
                                        <PinDropOutlinedIcon sx={{ fontSize: '1.2rem', marginTop: '-0.2rem' }} /> {datas.jobLocation}
                                    </p>
                                </div>
                                <ul className="mt-5 text-[11px] flex gap-x-3 col-span-12 md:text-[0.8rem] md:mt-1 md:gap-x-5">
                                    <li className="hidden md:bg-textW md:text-fadedText md:flex md:p-0">
                                        <PinDropOutlinedIcon className="text-[0.9rem] -mt-0.5 mr-1 md:text-[1.2rem]" /> {datas.jobLocation}
                                    </li>
                                    <li className="inline bg-lightGreen text-green-800 rounded-full p-2 px-3 md:bg-textW md:text-fadedText md:p-0">
                                        <AccessTimeOutlinedIcon className="text-[0.9rem] -mt-0.5 mr-1  md:text-[1.2rem]" />
                                        {datas.jobType}
                                    </li>
                                   
                                    <li className="inline bg-lightGreen text-green-800 rounded-full p-2 px-4 md:bg-textW md:text-fadedText md:p-0">
                                        <CalendarTodayOutlinedIcon className="text-[0.9rem] -mt-0.5 mr-1 md:text-[1.2rem] " />
                                        {new Date(datas.datePosted).toLocaleDateString('en-GB').replace(/\//g, '-')}
                                    </li>
                                </ul>
                              
                            </div>
                            <div className="col-span-12 flex items-center justify-center md:col-span-12 md:max-lg:pt-10 md:max-lg:px-20 lg:col-span-3 lg:px-10">
                                <button>
                                    <DeleteIcon
                                        onClick={() => {
                                            removeSave(datas.$id);
                                        }}
                                        sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                        className="w-7 h-7 p-1.5 mr-2 cursor-pointer"
                                    />
                                </button>
                                <button
                                    onClick={() => {
                                        setApply(true);
                                        setJobId(datas.$id);
                                        setEmployerId(datas.employerId);
                                        setJobTitle(datas.jobTitle);
                                        setCompanyName(datas.companyName);
                                    }}
                                    className=" h-[4.5rem] w-full bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW rounded-full cursor-pointer md:full"
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    );
                })}
            {apply && (
                <ApplyToJob jobId={jobId} employerId={employerId} setterFunction={setApply} jobTitle={jobTitle} companyName={companyName} />
            )}
        </>
    );
};
export default SavedJobs;
