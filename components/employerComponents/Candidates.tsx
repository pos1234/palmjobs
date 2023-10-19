import React, { useEffect, useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import 'react-toastify/dist/ReactToastify.css';
import {
    deleteShortListedCandidate,
    fetchAppliedCandidatesSingleJob,
    fetchPostedJobs,
    fetchShortListed,
    shortListedCandidate
} from '@/lib/services';
import CandSmall from './candidateComponents/CandSmall';
import CandidateDetail from './candidateComponents/CandidateDetail';
import JobsShimmer from '../shimmer/JobsShimmer';
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
    const handleJobSelection = async (id: string) => {
        const applied = await fetchAppliedCandidatesSingleJob(id);
        /*         applied.then((res) => console.log(res.documents));
         */ if (applied && applied.documents) {
            setAppliedCan(applied.documents.length > 0 && applied.documents);
        }
        const shortList = await fetchShortListed(id);
        if (shortList && shortList.documents) {
            setShortListed(shortList.documents.length > 0 && shortList.documents);
        }
    };
    const handleShortList = async (id: string) => {
        const result = await shortListedCandidate(jobId, id);
        if (result) {
            const shortList = await fetchShortListed(jobId);
            if (shortList && shortList.documents) {
                toast.success('Added To ShortList');
                setShortListed(shortList.documents);
            } else {
                toast.error('Not Added');
            }
        }
    };
    const deleteShortListed = async (id: string) => {
        const result = await deleteShortListedCandidate(id);
        if (result) {
            const shortList = await fetchShortListed(jobId);
            if (shortList) {
                toast.success('Removed From ShortList');
                setShortListed(shortList.documents);
            } else {
                toast.error('Not Removed');
            }
        }
    };
    const getPosted = async () => {
        setAllLoading(true);
        const posted = await fetchPostedJobs();
        if (posted && posted.documents) {
            posted && setPostedJobs(posted.documents);
            posted && setJobId(posted.documents[0] && posted.documents[0].$id);
            const applied = await fetchAppliedCandidatesSingleJob(posted.documents[0] && posted.documents[0].$id);
            applied && setAppliedCan(applied.documents);
            const shortList = await fetchShortListed(posted.documents[0] && posted.documents[0].$id);
            shortList && setShortListed(shortList.documents);
            setAllLoading(false);
        }
    };
    useEffect(() => {
        getPosted();
    }, []);
    const handleNav = (text: string) => {
        props.postJob(text);
    };
    /* const filData =
        shortListed &&
        shortListed.filter((item: any) => {
            let isMatch = true;
            if (searchName.toLocaleLowerCase()) {
                const searchRegex = new RegExp(searchName, 'i');
                isMatch = isMatch && searchRegex.test(item.jobTitle);
            }
            return isMatch;
        }); */
    return (
        <div className="bg-textW min-h-screen">
            <div
                className={
                    openCanDetail
                        ? 'relative flex justify-between pt-0 items-center px-1 max-md:hidden lg:pl-10'
                        : 'relative flex justify-between pt-0 items-center px-1 lg:pl-10'
                }
            >
                <p className="text-black text-3xl font-[700]">Candidates</p>
                <div
                    onClick={() => handleNav('postJob')}
                    className="text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 rounded-xl px-9"
                >
                    <BorderColorIcon sx={{ fontSize: '1.2rem' }} className="mr-2" /> Post Job
                </div>
            </div>
            {allLoading && <JobsShimmer />}
            {!allLoading && (
                <div className="max-md:mt-3 lg:pl-10">
                    <div
                        className={
                            openCanDetail ? 'flex flex-col gap-y-3 justify-between max-md:hidden' : 'flex flex-col gap-y-3 justify-between'
                        }
                    >
                        {/*  <div className="flex max-sm:pl-5 items-center gap-x-2">
                            <div className=" p-1 rounded-2xl border-[1px] border-stone-300 flex items-center gap-x-3 rounded-2xl px-3">
                                <p>Job</p>
                                <select
                                    onChange={(e) => {
                                        setJobId(e.currentTarget.value);
                                        handleJobSelection(e.currentTarget.value);
                                    }}
                                    className="border-x-[2px] border-stone-300 w-full sm:max-w-[20rem] focus:border-stone-300 focus:ring-0 bg-stone-50 py-3 border-0 cursor-pointer"
                                >
                                    {postedJobs &&
                                        postedJobs.map((item: any, index: number) => {
                                            return (
                                                <option value={item.$id} key={index}>
                                                    {item.jobTitle}
                                                </option>
                                            );
                                        })}
                                </select>
                                <div>
                                    <WorkOutlineIcon />
                                </div>
                            </div>
                        </div> */}
                        <div className="p-1 flex flex-col max-sm:px-5 md:flex-row gap-2 gap-x-6">
                           <div className="flex gap-x-5">
                                <div className="bg-stone-50 px-2 grid grid-cols-12 rounded-2xl md:rounded-3xl md:col-span-6 xl:col-span-7">
                                    <div className="hidden col-span-2 text-fadedText items-center justify-center md:col-span-1 md:justify-end md:flex ">
                                        <SearchIcon className="text-[1.7rem]" />
                                    </div>
                                    <div className="col-span-11 sm:col-span-11 md:col-span-10 xl:col-span-9">
                                        <input className="h-full w-full bg-[#F8F8F8] pl-5 border-none outline-none focus:ring-0 focus:border-none focus:outline-none" />
                                    </div>
                                </div>
                                <div
                                    /*                             onClick={setTheSearchTerm}
                                     */ className="self-center max-md:py-3 bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-xl text-textW flex items-center justify-center h-14 w-14 md:rounded-2xl md:col-span-1"
                                >
                                    <SearchIcon className="text-[1.5rem] cursor-pointer md:max-lg:text-[2rem] lg:text-3xl" />
                                </div>
                            </div>
                             <select
                                onChange={(e) => setAllCandidates(e.currentTarget.value)}
                                className="cursor-pointer border-stone-300 max-w-[20rem] focus:border-0 focus:ring-gradientFirst max-md:h-14 h-16 rounded-2xl"
                            >
                                <option value="All Candidates">All Candidates</option>
                                {/*                                 <option value="Best Match">Best Match</option>
 */}                                <option value="Shortlisted">Shortlisted</option>
                                {/* <JobTab text="All Candidates" active="true" />
                                <JobTab text="Best Match" /> */}
                            </select>
                            
                            <p className="flex justify-end flex-grow items-center text-stone-600 text-2xl font-semibold leading-10 hidden xl:flex">
                                Shortlisted
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 bg-forBack pt-2 pl-2 gap-2">
                        <div
                            className={
                                allCandidates == 'All Candidates'
                                    ? 'col-span-12 max-sm:pr-2 order-1 flex flex-col gap-y-4 overflow-y-auto max-h-screen pr-2 md:pr-0 md:col-span-6 xl:col-span-3'
                                    : 'col-span-12 max-sm:pr-2 hidden flex flex-col gap-y-4 overflow-y-auto max-h-screen pr-2 md:pr-0 md:col-span-6 xl:col-span-3'
                            }
                        >
                            {appliedCan &&
                                appliedCan.map((item: any, index: number) => {
                                    return (
                                        <CandSmall
                                            indexValue={jobDetailIndex}
                                            indexSetter={setJobDetailIndex}
                                            detailValue={openCanDetail}
                                            imageLinkSetter={setImageUrl}
                                            detailSetter={setOpenCanDetail}
                                            detailHolder={setCandidateDetail}
                                            key={index}
                                            index={index}
                                            canId={item.candidateId}
                                            jobId={item.jobId}
                                            handleFunction={handleShortList}
                                        />
                                    );
                                })}
                        </div>
                        <p
                            onClick={() => setOpenCanDetail(false)}
                            className={
                                openCanDetail == true
                                    ? 'col-start-2 col-end-12 cursor-pointer rounded-full text-gradientFirst text-center border-2 py-3 md:hidden'
                                    : 'hidden'
                            }
                        >
                            Back To Candidate List
                        </p>

                        <div
                            className={
                                openCanDetail == true
                                    ? allCandidates == 'Shortlisted'
                                        ? 'col-span-12 bg-textW overflow-y-auto order-2 max-h-screen md:col-span-6 md:grid lg:col-span-8 xl:col-span-9 hideScrollBar'
                                        : 'col-span-12 bg-textW overflow-y-auto order-2 max-h-screen md:col-span-6 md:grid hideScrollBar'
                                    : 'col-span-12 bg-textW overflow-y-auto order-2 max-h-screen hidden md:col-span-6 md:grid hideScrollBar'
                            }
                        >
                            <CandidateDetail detailData={candidateDetail} imageLinkValue={imageUrl} />
                        </div>
                        <div
                            className={
                                allCandidates == 'Shortlisted'
                                    ? 'col-span-12 order-1 overflow-y-auto max-h-screen flex flex-col gap-y-4 md:col-span-6 lg:col-span-4 xl:col-span-3 xl:flex'
                                    : 'col-span-12 order-3 hidden overflow-y-auto max-h-screen flex flex-col gap-y-4 md:col-span-3 xl:flex'
                            }
                        >
                            {shortListed && shortListed.length == 0 && <p className='text-lightGrey pt-10'>Candidates shortlisted will show up here</p>}
                            {shortListed &&
                                shortListed.map((item: any, index: number) => {
                                    return (
                                        <CandSmall
                                            handleFunction={deleteShortListed}
                                            detailSetter={setOpenCanDetail}
                                            detailHolder={setCandidateDetail}
                                            imageLinkSetter={setImageUrl}
                                            indexSetter={setJobDetailIndex}
                                            short="true"
                                            key={index}
                                            indexValue={jobDetailIndex}
                                            index={index}
                                            detailValue={openCanDetail}
                                            canId={item.candidateId}
                                            jobId={item.jobId}
                                            itemId={item.$id}
                                            viewShort={allCandidates == 'All Candidates'}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Candidates;
