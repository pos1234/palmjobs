import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import 'react-toastify/dist/ReactToastify.css';
import {
    fetchAppliedCandidatesSingleJob,
    fetchPostedJobs,
    fetchShortListed,

} from '@/backend/employerBackend';
import JobsShimmer from '@/components/shimmer/JobsShimmer';
import Active from '@/components/employerComponents/candidateComponents/ActiveCandidates';
import Shortlisted from '@/components/employerComponents/candidateComponents/Shortlisted';
import Navigation from '@/components/employerComponents/Navigation';
import Link from 'next/link';
import { employeeAuth } from '@/components/withAuth';
import { useJobPostContext } from '@/contextApi/jobPostData';
import { useRouter } from 'next/router';
const Candidates = (props: any) => {
    const router = useRouter()
    const { allEmployerJobs } = useJobPostContext()
    const [postedJobs, setPostedJobs] = useState<any>();
    const [candidateDetail, setCandidateDetail] = useState<any>();
    const [jobId, setJobId] = useState('');
    const [appliedCan, setAppliedCan] = useState<any>();
    const [openCanDetail, setOpenCanDetail] = useState(false);
    const [allCandidates, setAllCandidates] = useState('All Candidates');
    const [allLoading, setAllLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<any>([]);
    const [openDrop, setOpenDrop] = useState(false)
    useEffect(() => {
        if (props.applicantJobId !== '') {
            handleJobSelection(props.applicantJobId)
        }
    }, [props.applicantJobId])
    const handleJobSelection = async (id: string) => {
        setOpenDrop(false)
        setJobId(id)
        const applied = await fetchAppliedCandidatesSingleJob(id);
        if (applied && applied.total == 0) {
            setAppliedCan(null)
        }
        if (applied && applied.total > 0) {
            setAppliedCan(applied.documents);
        }
    };
    const getPosted = async () => {
        setAllLoading(true);
        if (allEmployerJobs) {
            const active = allEmployerJobs && allEmployerJobs.filter((draft: any) => draft.jobStatus === 'Active');
            setPostedJobs(active);
            setSearchTerm(active[0] && active[0].jobTitle)
            setJobId(active[0] && active[0].$id);
            setAllLoading(false);
        }
        if (Object.keys(router.query).length > 0) {
            const { param1 }: any = router.query;
            setJobId(param1)
        }
    };
    useEffect(() => {
        getPosted();
        console.log(allEmployerJobs)
    }, [allEmployerJobs, router.query]);
    return (
        <div className="flex gap-x-3 max-md:flex-wrap bg-textW">
            <Navigation active='candidates' />
            <div className="pt-5 px-3 pb-10 bg-textW w-full max-xl:flex-grow xl:w-2/3 min-h-screen">
                <div
                    className={
                        openCanDetail
                            ? 'relative flex pt-5 justify-between pt-0 items-center px-1 max-md:hidden lg:pl-10'
                            : 'relative flex pt-5 justify-between pt-0 items-center px-1 lg:pl-10'
                    }
                >
                    <p className="text-black text-xl md:text-3xl font-[700]">Candidates</p>
                    <Link
                        href="/users/employer/post"
                        className="text-textW bg-black flex gap-2 items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-[42px] w-[166px] rounded-[3px]"
                    >
                        <img src="/icons/HireLeaf.svg" alt="" className='w-5 h-5' />
                        Post Job
                    </Link>
                </div>
                {allLoading && <JobsShimmer />}
                {!allLoading && postedJobs && postedJobs.length !== 0 && (
                    <div className="max-md:mt-3 lg:pl-10">
                        <div
                            className={
                                openCanDetail ? 'flex flex-col gap-y-3 justify-between max-md:hidden' : 'flex flex-col gap-y-3 justify-between'
                            }
                        >
                            <div className='flex w-full flex-wrap flex-col gap-4 justify-center relative'>
                                <div className="candidateSearch w-full h-[80px] mt-5 flex justify-center items-center">
                                    <div className='flex items-center bg-[#F4F4F4] px-3 h-12 rounded-2xl md:rounded-3xl'>
                                        <select value={jobId} onChange={((e) => handleJobSelection(e.currentTarget.value))} name="" id="" className="h-10 w-72 sm:w-96 bg-[#F4F4F4] pl-3 border-none outline-none focus:ring-0 focus:border-none focus:outline-none"
                                        >
                                            {
                                                postedJobs.map((item: any, index: number) => {
                                                    return <option key={index} value={item.$id}>{item.jobTitle}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="px-3 w-full flex justify-center rounded-2xl md:rounded-3xl ">
                                    <div className="px-3 relative flex justify-center ">
                                        {searchTerm && openDrop && suggestions.length !== 0 && (
                                            <div className="absolute top-3 pl-3 h-40 border-2 bg-textW z-[1] rounded-sm text-left overflow-y-auto thinScrollBar overflow-x-hidden">
                                                {suggestions &&
                                                    suggestions.map((item: any, index: number) => (
                                                        <button type='button'
                                                            className="cursor-pointer text-left my-2 w-60 p-2 hover:bg-skillColor"
                                                            key={index}
                                                            onClick={() => handleJobSelection(item.$id)}
                                                        >
                                                            {item.jobTitle}
                                                        </button>
                                                    ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex justify-center border-b-2 gap-10'>
                                <div onClick={() => setAllCandidates('All Candidates')}
                                    className={`border-b-[3px]  flex justify-around gap-2 text-[1rem] items-center pb-1 ${allCandidates == "All Candidates" ? 'border-b-gradientFirst' : 'cursor-pointer border-b-textW hover:border-b-gradientFirst'}`}>
                                    <img src="/icons/shortFire.svg" alt="activeCand" /> <p className='text-[1rem]'>Active</p>
                                </div>
                                <div onClick={() => {
                                    setAllCandidates('Shortlisted')
                                    setCandidateDetail(null)
                                }} className={`border-b-[3px]  flex justify-around gap-2 text-[1rem] items-center pb-1 ${allCandidates == "Shortlisted" ? 'border-b-gradientFirst' : 'cursor-pointer border-b-textW hover:border-b-gradientFirst'}`}>
                                    <img src="/icons/shortPot.svg" alt="activeCand" />
                                    <p>Shortlist</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full flex-wrap mt-5">
                            <Active allCandidates={allCandidates} jobId={jobId} />
                            <Shortlisted jobId={jobId} allCandidates={allCandidates} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default employeeAuth(Candidates);
