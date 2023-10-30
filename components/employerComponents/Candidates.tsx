<<<<<<< HEAD
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import { Popover } from '@headlessui/react';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SchoolIcon from '@mui/icons-material/School';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import BookmarkBorderOutlined from '@mui/icons-material/BookmarkBorderOutlined';
const CandSmall = (props: any) => {
    const profile = '/images/profile.svg';
    return (
        <div
            className={`bg-textW shadow flex flex-col p-3 rounded-2xl ${
                props.short !== 'true' && 'border-[1px] bg-textW shadow border-orange-500'
            }`}
        >
            <div className="grid grid-cols-12 gap-x-2">
                <img src={profile} className="col-span-2 w-16 h-16 md:col-span-4" />
                <div className="col-span-9 flex flex-col md:col-span-7">
                    <p className="text-neutral-900 text-lg font-medium">Jane Doe</p>
                    <p className="text-stone-300 text-sm font-normal">Graphic Designer</p>
                    <p className="text-neutral-900 text-opacity-70 text-sm font-normal leading-normal">
                        <PinDropOutlinedIcon sx={{ fontSize: '1rem' }} /> Addis Abeba
                    </p>
                </div>
                {props.short !== 'true' && (
                    <div title="Shortlist" className="col-span-1 cursor-pointer flex text-gradientFirst justify-center ">
                        <BookmarkBorderOutlined />
                    </div>
                )}
                {props.short === 'true' && (
                    <div title="Shortlist" className="col-span-1 cursor-pointer flex text-gradientFirst justify-center ">
                        <BookmarkIcon />
                    </div>
                )}
            </div>
            <div className="flex gap-2 flex-wrap my-2">
                <p className="px-2 py-1 flex items-center rounded-full bg-skillColor text-zinc-900 text-sm font-normal leading-tight">
                    Illustrator
                </p>
                <p className="px-2 py-1 flex items-center rounded-full bg-skillColor text-zinc-900 text-sm font-normal leading-tight">
                    Photoshop
                </p>
                <p className="px-2 py-1 flex items-center rounded-full bg-skillColor text-zinc-900 text-sm font-normal leading-tight">
                    InDesign
                </p>
            </div>
            <div className="flex gap-x-1">
                <div className="text-gradientFirst">
                    <PersonIcon />
                </div>
                <div className="h-10 overflow-hidden text-stone-300 text-sm font-light leading-normal">
                    Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod
                    culpa. laborum tempor Lorem incididunt.
                </div>
            </div>
        </div>
    );
};
const JobTab = (props: any) => {
    return (
        <div
            className={
                props.active == 'true'
                    ? 'text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 rounded-2xl px-5'
                    : 'text-stone-500 flex items-center justify-center cursor-pointer h-16 rounded-2xl px-5'
            }
        >
            {props.text}
        </div>
    );
};
const CandidateDetail = (props: any) => {
    const profile = '/images/profile.svg';
    return (
        <div className="flex flex-col gap-y-3 p-5 rounded-2xl">
            <div className="flex gap-x-2">
                <img src={profile} className="w-16 h-16" />
                <div className="col-span-7 flex flex-col">
                    <p className="text-neutral-900 text-lg font-medium">Jane Doe</p>
                    <p className="text-stone-300 text-sm font-normal">Graphic Designer</p>
                    <p className="text-neutral-900 text-opacity-70 text-sm font-normal leading-normal">
                        <PinDropOutlinedIcon sx={{ fontSize: '1rem' }} /> Addis Abeba
                    </p>
                </div>
            </div>
            <div className="flex gap-x-1">
                <div className="text-gradientFirst">
                    <PersonIcon />
                </div>
                <div className="text-stone-300 text-sm font-light leading-normal">
                    Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod
                    culpa. laborum tempor Lorem incididunts.
                </div>
            </div>
            <div className="flex gap-2 gap-y-3 flex-wrap my-2">
                <p className="font-fhW text-fhS leading-fhL w-full">
                    <LocalFireDepartmentOutlinedIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem' }} />
                    Skills
                </p>
                <p className="px-2 py-1 flex items-center rounded-full bg-skillColor text-zinc-900 text-sm font-normal leading-tight">
                    Illustrator
                </p>
                <p className="px-2 py-1 flex items-center rounded-full bg-skillColor text-zinc-900 text-sm font-normal leading-tight">
                    Photoshop
                </p>
                <p className="px-2 py-1 flex items-center rounded-full bg-skillColor text-zinc-900 text-sm font-normal leading-tight">
                    Photoshop
                </p>
                <p className="px-2 py-1 flex items-center rounded-full bg-skillColor text-zinc-900 text-sm font-normal leading-tight">
                    Photoshop
                </p>
                <p className="px-2 py-1 flex items-center rounded-full bg-skillColor text-zinc-900 text-sm font-normal leading-tight">
                    InDesign
                </p>
                <p className="px-2 py-1 flex items-center rounded-full bg-skillColor text-zinc-900 text-sm font-normal leading-tight">
                    InDesign
                </p>
                <p className="px-2 py-1 flex items-center rounded-full bg-skillColor text-zinc-900 text-sm font-normal leading-tight">
                    InDesign
                </p>
            </div>
            <div className="grid grid-cols-12 cursor-pointer md:mb-5 sm:max-md:gap-x-2">
                <p className="font-fhW text-fhS leading-fhL col-span-12 mb-3">
                    <BusinessCenterIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem' }} />
                    Work History
                </p>
                <div className="col-span-12 pb-2 border-b-2 flex md:max-xl:flex-col">
                    <div className="w-12 h-12  bg-skillColor flex items-center justify-center rounded-[1rem] md:max-xl:w-full md:max-xl:bg-textW md:flex md:max-xl:justify-start md:max-xl:gap-x-2">
                        <div className="w-12 h-12 bg-skillColor  items-center justify-center rounded-[1rem] hidden md:max-xl:flex">
                            <BusinessCenterOutlinedIcon
                                sx={{
                                    color: '#FE5E0A',
                                    height: '1.5rem'
                                }}
                            />
                        </div>
                        <BusinessCenterOutlinedIcon
                            sx={{
                                color: '#FE5E0A',
                                height: '1.5rem'
                            }}
                            className="md:max-xl:hidden"
                        />
                        <p className="text-fhS font-fhW leading-fhL md:text-[1rem] md:font-smRW hidden md:max-xl:flex">
                            {/*  {props.title} */} Nylos Company
                        </p>
                    </div>

                    <div className="grid grid-cols-12 pl-5">
                        <p className="col-span-12 text-fhS font-fhW leading-fhL flex items-center md:text-[1.2rem] md:font-smRW md:max-xl:hidden">
                            {/*  {props.title} */} Manager
                        </p>
                        <div className=" font-bigW text-smRS leading-smL text-fadedText col-span-12  hidden sm:flex gap-x-5 items-center md:max-xl:flex-wrap md:max-lg:pt-2">
                            <div className="text-[14px]"> {/* {props.companyName} */} Lorem Ipsum</div>
                            <div className="flex">
                                <CalendarTodayIcon sx={{ marginRight: '0.5rem', marginTop: '0.2rem', fontSize: '0.9rem' }} />
                                <span className="flex flex-wrap text-[14px] md:max-xl:text-[13px]">
                                    <p>27-03-2022</p> &nbsp; - &nbsp; <p>10-04-2023</p>
                                </span>
                                {/*  {props.startDate} - {props.endDate} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 cursor-pointer md:mb-5 sm:max-md:gap-x-2">
                <p className="font-fhW text-fhS leading-fhL col-span-12 mb-3">
                    <SchoolOutlinedIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem' }} />
                    Education
                </p>

                <div className="col-span-12 pb-2 border-b-2 flex md:max-xl:flex-col">
                    <div className="w-12 h-12  bg-skillColor flex items-center justify-center rounded-[1rem] md:max-xl:w-full md:max-xl:bg-textW md:flex md:max-xl:justify-start md:max-xl:gap-x-2">
                        <div className="w-12 h-12 bg-skillColor  items-center justify-center rounded-[1rem] hidden md:max-xl:flex">
                            <SchoolIcon
                                sx={{
                                    color: '#FE5E0A',
                                    height: '1.5rem'
                                }}
                            />
                        </div>
                        <SchoolIcon
                            sx={{
                                color: '#FE5E0A',
                                height: '1.5rem'
                            }}
                            className="md:max-xl:hidden"
                        />
                        <p className="text-fhS font-fhW leading-fhL md:text-[1rem] md:font-smRW hidden md:max-xl:flex">
                            {/*  {props.title} */} Bachelor's Degree
                        </p>
                    </div>

                    <div className="grid grid-cols-12 pl-5">
                        <p className="col-span-12 text-fhS font-fhW leading-fhL flex items-center md:text-[1.2rem] md:font-smRW md:max-xl:hidden">
                            {/*  {props.title} */} Bachelor's Degree
                        </p>
                        <div className=" font-bigW text-smRS leading-smL text-fadedText col-span-12  hidden sm:flex gap-x-5 items-center md:max-xl:flex-wrap md:max-lg:pt-2">
                            <div className="text-[14px]"> {/* {props.companyName} */} Lorem Ipsum</div>
                            <div className="flex">
                                <CalendarTodayIcon sx={{ marginRight: '0.5rem', marginTop: '0.2rem', fontSize: '0.9rem' }} />
                                <span className="flex flex-wrap text-[14px] md:max-lg:text-[13px]">
                                    <p>27-03-2022</p> &nbsp; - &nbsp; <p>10-04-2023</p>
                                </span>
                                {/*  {props.startDate} - {props.endDate} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-12 grid grid-cols-12 bg-textW rounded-3xl">
                <p className="font-fhW text-fhS leading-fhL col-span-12">
                    <AttachFileIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem', rotate: '40deg' }} />
                    Projects
                </p>

                {/* {projectsArray !== null &&
                        projectsArray.map((item, index) => ( */}
                <div /* key={index} */ className="col-span-12 flex gap-y-5 gap-x-3 pt-3">
                    {/* {item.thumbnailId && ( */}
                    <img src={profile} /* src={projectImage(item.thumbnailId)}  */ className="w-20 h-20 rounded-3xl" />
                    {/*  )} */}
                    <div className="grid grid-cols-12  h-full">
                        <div className="col-span-10">
                            <p className="text-shS font-shW leading-shL flex md:max-lg:text-[15px]">
                                {/* {item.projectName} */} React Project
                            </p>
                            <div
                                /* dangerouslySetInnerHTML={{ __html: item.detail }} */ className=" text-lightGrey pr-3 md:max-lg:text-[12px] md:max-lg:pr-0"
                            >
                                my best Project
                            </div>
                        </div>

                        {/*  {item.link !== '' && ( */}
                        <a
                            className="text-gradientFirst col-span-12 flex items-center cursor-pointer"
                            target="_blank" /* href={item.link} */
                        >
                            <InsertLinkOutlinedIcon sx={{ marginTop: '-0.1rem' }} />
                            <span className="underline mt-5 pl-3 md:max-lg:pl-1 md:max-lg:-mt-1">{/* {item.link} */}project link</span>
                        </a>
                        {/*  )} */}
                    </div>
                </div>
                {/*  ))} */}
            </div>
        </div>
    );
};
const Candidates = () => {
    const profile = '/images/profile.svg';
    return (
        <div className="bg-textW min-h-screen">
            <div className="relative flex justify-between pt-10 items-center lg:pl-10">
                <p className="text-black text-3xl font-[700]">Candidates</p>
                <div className="text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 rounded-xl px-9">
                    <BorderColorIcon sx={{ fontSize: '1.2rem' }} className="mr-2" /> Post Job
                </div>
            </div>
            <div className="mt-0 lg:pl-10">
                <div className="flex flex-col gap-y-3 justify-between">
                    <div className="flex max-sm:pl-5 items-center gap-x-2">
                        <p>Job:</p>
                        <div className=" p-1">
                            <select className="rounded-2xl bg-stone-50 py-3 border-0 cursor-pointer">
                                <option>Marketing Manager</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-x-5">
                        <p className="cursor-pointer text-neutral-900 text-2xl font-semibold leading-10">Active</p>
                        <div className="cursor-pointer hover:text-neutral-900 text-stone-300 text-2xl font-semibold leading-10">
                            Shortlist
                        </div>
                    </div>
                    <div className="p-1 flex flex-col md:flex-row gap-2">
                        <div className="flex bg-forBack">
                            <div className="flex bg-textW">
                                <JobTab text="All Candidates" active="true" />
                                <JobTab text="Best Match" />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="bg-stone-50 px-2 grid grid-cols-12 rounded-2xl md:rounded-3xl md:col-span-6 xl:col-span-7">
                                <div className="hidden col-span-2 text-fadedText items-center justify-center md:col-span-1 md:justify-end md:flex ">
                                    <SearchIcon className="text-[1.7rem]" />
                                </div>
                                <div className="col-span-11 sm:col-span-11 md:col-span-10 xl:col-span-9">
                                    <input
                                        className="h-full w-full bg-[#F8F8F8] pl-5 border-none outline-none focus:ring-0 focus:border-none focus:outline-none"
                                        placeholder="Marketing Manager"
                                    />
                                </div>
                                <div
                                    /* onClick={() => setOpenfilter(true)} */
                                    className="col-span-1 text-darkBlue flex items-center justify-center md:justify-start xl:pl-5 xl:justify-center xl:col-span-2"
                                >
                                    <TuneIcon className="text-[1.7rem] cursor-pointer" />
                                </div>
                            </div>
                            <div
                                /*                             onClick={setTheSearchTerm}
                                 */ className="self-center max-md:py-3 bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-xl text-textW flex items-center justify-center h-14 w-14 md:rounded-2xl md:col-span-1"
                            >
                                <SearchIcon className="text-[1.5rem] cursor-pointer md:max-lg:text-[2rem] lg:text-3xl" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 bg-forBack pt-2 pl-2 gap-2">
                    <div className="col-span-12 flex flex-col gap-y-4 overflow-y-auto max-h-screen pr-2 md:pr-0 md:col-span-6 xl:col-span-3">
                        <CandSmall />
                        <CandSmall />
                        <CandSmall />
                    </div>
                    <div className="col-span-12 bg-textW overflow-y-auto max-h-screen hidden md:col-span-6 md:grid">
                        <CandidateDetail />
                    </div>
                    <div className="col-span-12 hidden overflow-y-auto max-h-screen flex flex-col gap-y-4 md:col-span-3 xl:grid">
                        <CandSmall short="true" />
                        <CandSmall short="true" />
                        <CandSmall short="true" />
                    </div>
                </div>
            </div>
=======
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
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<any>([]);
    const [openDrop, setOpenDrop] = useState(false)
    useEffect(() => {
        if (props.applicantJobId !== '') {
            handleJobSelection(props.applicantJobId)
        }
    }, [props.applicantJobId])
    /* const clickMe = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        searchTerm &&
            !props.array.some((data: any) => data.toLowerCase() === searchTerm.toLowerCase()) &&
            addSuggestedSkill(searchTerm);
        setSearchTerm('');
    }; */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setSearchTerm(inputValue);
        const filteredSuggestions = postedJobs && postedJobs.filter((data: any) => data.jobTitle.toLowerCase().includes(inputValue.toLowerCase()));
        setSuggestions(filteredSuggestions);
    };
    const handleJobSelection = async (id: string, title?: string) => {
        setOpenDrop(false)
        title && setSearchTerm(title)
        const applied = await fetchAppliedCandidatesSingleJob(id);
        if (applied && applied.total == 0) {
            setAppliedCan(null)
            setCandidateDetail(null)
        }
        if (applied && applied.total > 0) {
            setAppliedCan(applied.documents);
        }
        const shortList = await fetchShortListed(id);
        /* if (shortList && shortList.documents) {
            setShortListed(shortList.documents.length > 0 && shortList.documents);
        } */
        if (shortList && shortList.total == 0) {
            setShortListed(null)
        }
        if (shortList && shortList.total > 0) {
            setAppliedCan(shortList.documents);
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
            {!allLoading && postedJobs && postedJobs.length !== 0 && (
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
                                        handleJobSelection(jobId);
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
                                        <input value={searchTerm}
                                            onChange={handleInputChange}
                                            type="text"
                                            onFocus={() => setOpenDrop(true)}
                                            className="h-full w-full bg-[#F8F8F8] pl-5 border-none outline-none focus:ring-0 focus:border-none focus:outline-none" />
                                    </div>
                                </div>


                                {/* <div
                                    onClick={setTheSearchTerm}
                                    className="self-center max-md:py-3 bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-xl text-textW flex items-center justify-center h-14 w-14 md:rounded-2xl md:col-span-1"
                                >
                                    <SearchIcon className="text-[1.5rem] cursor-pointer md:max-lg:text-[2rem] lg:text-3xl" />
                                </div> */}
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
                                    ? 'col-span-12 relative max-sm:pr-2 order-1 flex flex-col gap-y-4 overflow-y-auto max-h-screen pr-2 md:pr-0 md:col-span-6 xl:col-span-3'
                                    : 'col-span-12 relative max-sm:pr-2 hidden flex flex-col gap-y-4 overflow-y-auto max-h-screen pr-2 md:pr-0 md:col-span-6 xl:col-span-3'
                            }
                        >{searchTerm && openDrop && suggestions.length !== 0 && (
                            <div className="col-span-12 absolute top-0 pl-3 h-40 border-2 bg-textW z-[1] rounded-sm text-left overflow-auto overflow-x-hidden w-full">
                                {suggestions &&
                                    suggestions.map((item: any, index: number) => (
                                        <p
                                            className="cursor-pointer my-2 w-60 p-2 hover:bg-skillColor"
                                            key={item.$id}
                                            onClick={() => handleJobSelection(item.$id, item.jobTitle)}
                                        >
                                            {item.jobTitle}
                                        </p>
                                    ))}
                            </div>
                        )}
                            {appliedCan &&
                                appliedCan.map((item: any, index: number) => {
                                    return (
                                        <div className='relative'>

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
                                            /> </div>
                                    );
                                })}
                            {
                                !appliedCan && <p>Currently there are no applied applicants.</p>
                            }

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
>>>>>>> 3529551af5e550c58c691541a88d4b076fcd8537
        </div>
    );
};

export default Candidates;
