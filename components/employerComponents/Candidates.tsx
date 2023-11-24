import React, { useEffect, useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
import TungstenOutlinedIcon from '@mui/icons-material/TungstenOutlined';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import 'react-toastify/dist/ReactToastify.css';
import {
    fetchAppliedCandidatesSingleJob,
    fetchPostedJobs,
    fetchShortListed,

} from '@/lib/employerBackend';
import JobsShimmer from '../shimmer/JobsShimmer';
import Active from './candidateComponents/ActiveCandidates';
import Shortlisted from './candidateComponents/Shortlisted';
const Candidates = (props: any) => {
    const [postedJobs, setPostedJobs] = useState<any>();
    const [candidateDetail, setCandidateDetail] = useState<any>();
    const [jobId, setJobId] = useState('');
    const [appliedCan, setAppliedCan] = useState<any>();
    const [shortListed, setShortListed] = useState<any>();
    const [jobDetailIndex, setJobDetailIndex] = useState(0);
    const [openCanDetail, setOpenCanDetail] = useState(false);
    const [allCandidates, setAllCandidates] = useState('All Candidates');
    const [imageUrl, setImageUrl] = useState('');
    const [allLoading, setAllLoading] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<any>([]);
    const [openDrop, setOpenDrop] = useState(false)
    const [documentId, setdocumetnId] = useState('')
    useEffect(() => {
        if (props.applicantJobId !== '') {
            handleJobSelection(props.applicantJobId)
        }
    }, [props.applicantJobId])
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setSearchTerm(inputValue);
        const filteredSuggestions = postedJobs && postedJobs.filter((data: any) => data.jobTitle.toLowerCase().includes(inputValue.toLowerCase()));
        setSuggestions(filteredSuggestions);
    };
    const handleJobSelection = async (id: string, title?: string) => {
        setOpenDrop(false)
        setJobId(id)
        console.log(id);

        title && setSearchTerm(title)
        /* setJobId(id) */
        const applied = await fetchAppliedCandidatesSingleJob(id);
        if (applied && applied.total == 0) {
            setAppliedCan(null)
/*             setCandidateDetail(null)
 */        }
        if (applied && applied.total > 0) {
            setAppliedCan(applied.documents);
        }
        const shortList = await fetchShortListed(id);

        if (shortList && shortList.total == 0) {
            setShortListed(null)
        }
        if (shortList && shortList.total > 0) {
            setAppliedCan(shortList.documents);
        }
    };
    const getPosted = async () => {
        setAllLoading(true);
        const posted = await fetchPostedJobs();
        if (posted && posted.documents) {
            posted && setPostedJobs(posted.documents);
            setSearchTerm(posted.documents[0] && posted.documents[0].jobTitle)
            posted && setJobId(posted.documents[0] && posted.documents[0].$id);
            /* 
                        const applied = await fetchAppliedCandidatesSingleJob(posted.documents[0] && posted.documents[0].$id);
                        applied && setAppliedCan(applied.documents);
                        const shortList = await fetchShortListed(posted.documents[0] && posted.documents[0].$id);
                        shortList && setShortListed(shortList.documents); */
            setAllLoading(false);
        }
    };
    useEffect(() => {
        getPosted();
    }, []);

    const handleNav = (text: string) => {
        props.postJob(text);
    };

    return (
        <div className="bg-textW min-h-screen">
            <div
                className={
                    openCanDetail
                        ? 'relative flex pt-5 justify-between pt-0 items-center px-1 max-md:hidden lg:pl-10'
                        : 'relative flex pt-5 justify-between pt-0 items-center px-1 lg:pl-10'
                }
            >
                <p className="text-black text-3xl font-[700]">Candidates</p>
                <div
                    onClick={() => handleNav('postJob')}
                    className="text-textW bg-black flex gap-2 items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-[42px] w-[166px] rounded-[3px]"
                >
                    <img src="/icons/HireLeaf.svg" alt="" className='w-5 h-5' />
                    Post Job
                </div>
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
                            <div className="candidateSearch w-full h-[80px] mt-5  flex justify-center items-center">
                                <div className='flex items-center bg-[#F4F4F4] px-3 h-12 rounded-2xl md:rounded-3xl'>
                                    <div className="hidden text-fadedText h-full md:items-center justify-center md:justify-end md:flex ">
                                        <SearchIcon sx={{ fontSize: '1.2rem' }} />
                                    </div>
                                    <div className="flex-grow">
                                        <input value={searchTerm}
                                            onChange={handleInputChange}
                                            type="text"
                                            onFocus={() => setOpenDrop(true)}
                                            className="h-10 w-96 bg-[#F4F4F4] pl-3 border-none outline-none focus:ring-0 focus:border-none focus:outline-none" />
                                    </div>
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
                                                        onClick={() => handleJobSelection(item.$id, item.jobTitle)}
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
                            <div onClick={() => setAllCandidates('All Candidates')} className={allCandidates == "All Candidates" ? 'text-gradientFirst border-b-[3px] border-b-gradientFirst flex justify-around gap-1 text-[1rem] items-center pb-1 ' : ' pb-1 items-center text-[1rem] flex gap-1 cursor-pointer border-b-[3px] border-b-textW hover:border-b-gradientFirst hover:text-gradientFirst'}>
                                <TungstenOutlinedIcon sx={{ fontSize: '1.2rem' }} className='rotate-180' /> <p className='text-[1rem]'>Active</p>
                            </div>
                            <div onClick={() => {
                                setAllCandidates('Shortlisted')
                                setCandidateDetail(null)
                            }} className={allCandidates == "Shortlisted" ? 'text-gradientFirst border-b-[3px] border-b-gradientFirst flex justify-around gap-1 text-[1rem] items-center pb-1 ' : ' pb-1 flex justify-around gap-1 text-[1rem] items-center cursor-pointer border-b-[3px] border-b-textW hover:border-b-gradientFirst hover:text-gradientFirst'}>
                                <StarOutlineOutlinedIcon sx={{ fontSize: '1rem' }} />
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
    );
};

export default Candidates;
