import React, { use, useEffect, useState } from 'react';
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
import ArticleIcon from '@mui/icons-material/Article';
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
import LocationCityIcon from '@mui/icons-material/LocationCity';
import {
    deleteShortListedCandidate,
    fetchAppliedCandidatesSingleJob,
    fetchCandidateDetail,
    fetchPostedJobs,
    fetchShortListed,
    shortListedCandidate
} from '@/lib/services';
import { toast } from 'react-toastify';
const CandSmall = (props: any) => {
    const profile = '/images/profile.svg';
    const [candidateData, setCandidateData] = useState<any>();
    const [shortListed, setShortListed] = useState<any>();
    const [active, seActive] = useState(false);
    const [skill, setSkill] = useState<any>([]);
    useEffect(() => {
        fetchCandidateDetail(props.canId).then((res) => {
            setCandidateData(res.documents.length > 0 && res.documents[0]);
            props.short !== 'true' && props.detailHolder(res.documents.length > 0 && res.documents[0]);
            const parsed = res.documents[0] && res.documents[0].skills && res.documents[0].skills;
            setSkill(res.documents[0] && res.documents[0].skills && parsed);
        });
    }, []);

    return (
        <div
            id={`item-${props.index}`}
            onClick={() => {
                props.short !== 'true' && props.detailHolder(candidateData); /* props.setOpenCanDetail(true); */
                (props.short !== 'true' || props.viewShort == false) &&
                    props.detailHolder(candidateData); /* props.setOpenCanDetail(true); */
                /* props.short !== 'true' &&  */ props.indexSetter(props.index);
                /*                 (props.short !== 'true' || props.viewShort == false) && props.indexSetter(props.index);
                 */ props.detailSetter(true);
            }}
            className={
                props.detailValue == true
                    ? `bg-textW shadow flex flex-col p-3 rounded-2xl cursor-pointer max-md:hidden ${
                          (props.short !== 'true' && props.index === props.indexValue) ||
                          (props.viewShort === false && props.index === props.indexValue)
                              ? 'border-[1px] bg-textW shadow border-orange-500 max-md:hidden'
                              : 'border-[1px] bg-textW shadow border-stone-200 max-md:hidden'
                      }`
                    : `bg-textW shadow flex flex-col p-3 rounded-2xl cursor-pointer ${
                          (props.short !== 'true' && props.index === props.indexValue) ||
                          (props.viewShort === false && props.index === props.indexValue)
                              ? 'border-[1px] bg-textW shadow border-orange-500'
                              : 'border-[1px] bg-textW shadow border-stone-200'
                      }`
            }
        >
            <div className="grid grid-cols-12 gap-x-2">
                <img src={profile} className="col-span-2 w-16 h-16 md:col-span-4" />
                <div className="col-span-9 flex flex-col md:col-span-7">
                    <p className="text-neutral-900 text-lg font-medium">John Doe</p>
                    <p className="text-stone-300 text-sm font-normal">{candidateData && candidateData.bioHeadline}</p>
                    {candidateData && candidateData.address && (
                        <p className="text-neutral-900 text-opacity-70 text-sm font-normal leading-normal">
                            <PinDropOutlinedIcon sx={{ fontSize: '1rem' }} />
                            {candidateData.address}
                        </p>
                    )}
                </div>
                {props.short !== 'true' && (
                    <div
                        onClick={() => props.handleFunction(props.canId)}
                        title="Shortlist"
                        className="col-span-1 cursor-pointer flex text-gradientFirst justify-center "
                    >
                        <BookmarkBorderOutlined />
                    </div>
                )}
                {props.short === 'true' && (
                    <div title="Remove" className="col-span-1 cursor-pointer flex text-gradientFirst justify-center ">
                        <BookmarkIcon onClick={() => props.handleFunction(props.itemId)} />
                    </div>
                )}
            </div>
            <div className="flex gap-2 flex-wrap my-2">
                {candidateData &&
                    skill &&
                    skill.map((item: any, index: number) => {
                        return (
                            <p
                                key={index}
                                className="px-2 py-1 flex items-center rounded-full bg-skillColor text-zinc-900 text-sm font-normal leading-tight"
                            >
                                {item}
                            </p>
                        );
                    })}
            </div>
            <div className="flex gap-x-1">
                <div className="text-gradientFirst">
                    <PersonIcon />
                </div>
                <div className="h-10 overflow-hidden text-stone-300 text-sm font-light leading-normal">
                    {candidateData && candidateData.bioDescription}
                </div>
            </div>
        </div>
    );
};

const WorkDetail = (props: any) => {
    const [desc, setDesc] = useState(false);
    return (
        <div onClick={() => setDesc(!desc)} className="col-span-12 pb-2 border-b-2 flex md:max-xl:flex-col my-4">
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
                    {props && props.detail && props.detail.companyName}
                </p>
            </div>

            <div className="grid grid-cols-12 pl-5">
                <p className="col-span-12 text-fhS font-fhW leading-fhL flex items-center md:text-[1.2rem] md:font-smRW md:max-xl:hidden">
                    {props && props.detail && props.detail.title}
                </p>
                <div className=" font-bigW text-smRS leading-smL text-fadedText col-span-12  hidden sm:flex gap-x-5 items-center md:max-xl:flex-wrap md:max-lg:pt-2">
                    <div className="text-[14px]"> {props && props.detail && props.detail.companyName}</div>
                    <div className="flex">
                        <CalendarTodayIcon sx={{ marginRight: '0.5rem', marginTop: '0.2rem', fontSize: '0.9rem' }} />
                        <span className="flex flex-wrap text-[14px] md:max-xl:text-[13px]">
                            {props && props.detail && props.detail.startDate} &nbsp; - &nbsp;{props && props.detail && props.detail.endDate}
                        </span>
                    </div>
                </div>
                {desc && props && props.detail && (
                    <div
                        className="col-span-12 text-[13px] text-stone-500"
                        dangerouslySetInnerHTML={{ __html: props.detail.jobDescription }}
                    />
                )}
            </div>
            {/*  {desc && props && props.detail && (
                <div className="w-full block" dangerouslySetInnerHTML={{ __html: props.detail.jobDescription }} />
            )} */}
        </div>
    );
};
const EducationDetail = (props: any) => {
    return (
        <div className="col-span-12 pb-2 border-b-2 flex md:max-xl:flex-col my-4">
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
                    {props && props.detail && props.detail.educationLevel}
                </p>
            </div>
            <div className="grid grid-cols-12 pl-5">
                <p className="col-span-12 text-fhS font-fhW leading-fhL flex items-center md:text-[1.2rem] md:font-smRW md:max-xl:hidden">
                    {props && props.detail && props.detail.educationLevel}
                </p>
                <div className=" font-bigW text-smRS leading-smL text-fadedText col-span-12  hidden sm:flex gap-x-5 items-center md:max-xl:flex-wrap md:max-lg:pt-2">
                    <p className="text-[14px]">
                        <ArticleIcon sx={{ marginRight: '0.5rem', marginTop: '0rem', fontSize: '0.9rem' }} />
                        {props && props.detail && props.detail.fieldStudy}
                    </p>
                    <div className="text-[14px]">
                        <LocationCityIcon sx={{ marginRight: '0.3rem', marginTop: '-0.1rem', fontSize: '0.9rem' }} />{' '}
                        {props && props.detail && props.detail.university}
                    </div>
                    <div className="flex">
                        <CalendarTodayIcon sx={{ marginRight: '0.5rem', marginTop: '0.2rem', fontSize: '0.9rem' }} />
                        <span className="flex flex-wrap text-[14px] md:max-lg:text-[13px]">
                            <p>{props && props.detail && props.detail.yearIssued}</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
const ProjectDetail = (props: any) => {
    const profile = '/images/profile.svg';
    return (
        <div /* key={index} */ className="col-span-12 flex gap-y-5 gap-x-3 pt-3">
            {/* {item.thumbnailId && ( */}
            <img src={profile} /* src={projectImage(item.thumbnailId)}  */ className="w-20 h-20 rounded-3xl" />
            {/*  )} */}
            <div className="grid grid-cols-12  h-full">
                <div className="col-span-10">
                    <p className="text-shS font-shW leading-shL flex md:max-lg:text-[15px]">
                        {props && props.detail && props.detail.projectName}
                    </p>
                    {props && props.detail && props.detail.detail && (
                        <div
                            dangerouslySetInnerHTML={{ __html: props.detail.detail }}
                            className=" text-lightGrey pr-3 md:max-lg:text-[12px] md:max-lg:pr-0"
                        />
                    )}
                </div>
                {props && props.detail && props.detail.link && (
                    <a
                        className="text-gradientFirst col-span-12 flex items-center cursor-pointer mt-2"
                        target="_blank"
                        href={props.detail.link}
                    >
                        <InsertLinkOutlinedIcon sx={{ marginTop: '-0.1rem' }} />
                        <span className="underline pl-3 md:max-lg:pl-1">Project Link</span>
                    </a>
                )}
            </div>
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
                    <p className="text-stone-300 text-sm font-normal">{props && props.detailData && props.detailData.bioHeadline}</p>
                    <p className="text-neutral-900 text-opacity-70 text-sm font-normal leading-normal">
                        <PinDropOutlinedIcon sx={{ fontSize: '1rem' }} /> {props && props.detailData && props.detailData.address}
                    </p>
                </div>
            </div>
            <div className="flex gap-x-1">
                <div className="text-gradientFirst">
                    <PersonIcon />
                </div>
                <div className="text-stone-300 text-sm font-light leading-normal">
                    {props && props.detailData && props.detailData.bioDescription}
                </div>
            </div>
            <div className="flex gap-2 gap-y-3 flex-wrap my-2">
                <p className="font-fhW text-fhS leading-fhL w-full">
                    <LocalFireDepartmentOutlinedIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem' }} />
                    Skills
                </p>
                {props &&
                    props.detailData &&
                    props.detailData.skills &&
                    props.detailData.skills.map((item: any, index: number) => {
                        return (
                            <p
                                key={index}
                                className="px-2 py-1 flex items-center rounded-full bg-skillColor text-zinc-900 text-sm font-normal leading-tight"
                            >
                                {item}
                            </p>
                        );
                    })}
            </div>
            {props.detailData && props.detailData.workHistory && (
                <div className="grid grid-cols-12 cursor-pointer md:mb-5 sm:max-md:gap-x-2">
                    <p className="font-fhW text-fhS leading-fhL col-span-12 mb-3">
                        <BusinessCenterIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem' }} />
                        Work History
                    </p>
                    {props &&
                        props.detailData &&
                        props.detailData.workHistory &&
                        JSON.parse(props.detailData.workHistory).map((item: any, index: number) => {
                            return <WorkDetail key={index} detail={item} />;
                        })}
                </div>
            )}
            {props && props.detailData && props.detailData.educations && (
                <div className="grid grid-cols-12 cursor-pointer md:mb-5 sm:max-md:gap-x-2">
                    <p className="font-fhW text-fhS leading-fhL col-span-12 mb-3">
                        <SchoolOutlinedIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem' }} />
                        Education
                    </p>
                    {props &&
                        props.detailData &&
                        props.detailData.educations &&
                        JSON.parse(props.detailData.educations).map((item: any, index: number) => {
                            return <EducationDetail key={index} detail={item} />;
                        })}
                </div>
            )}
            {props && props.detailData && props.detailData.projects && (
                <div className="col-span-12 grid grid-cols-12 bg-textW rounded-3xl">
                    <p className="font-fhW text-fhS leading-fhL col-span-12">
                        <AttachFileIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem', rotate: '40deg' }} />
                        Projects
                    </p>
                    {props &&
                        props.detailData &&
                        props.detailData.projects &&
                        JSON.parse(props.detailData.projects).map((item: any, index: number) => {
                            return <ProjectDetail key={index} detail={item} />;
                        })}
                </div>
            )}
        </div>
    );
};
const Candidates = () => {
    const profile = '/images/profile.svg';
    const [postedJobs, setPostedJobs] = useState<any>();
    const [candidateDetail, setCandidateDetail] = useState<any>();
    const [jobId, setJobId] = useState('');
    const [appliedCan, setAppliedCan] = useState<any>();
    const [shortListed, setShortListed] = useState<any>();
    const [jobDetailIndex, setJobDetailIndex] = useState(0);
    const [openCanDetail, setOpenCanDetail] = useState(false);
    const [allCandidates, setAllCandidates] = useState('All Candidates');
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
        const posted = await fetchPostedJobs();
        if (posted && posted.documents) {
            posted && setPostedJobs(posted.documents);
            posted && setJobId(posted.documents[0] && posted.documents[0].$id);
            const applied = await fetchAppliedCandidatesSingleJob(posted.documents[0] && posted.documents[0].$id);
            applied && setAppliedCan(applied.documents);
            const shortList = await fetchShortListed(posted.documents[0] && posted.documents[0].$id);
            shortList && setShortListed(shortList.documents);
        }
    };
    useEffect(() => {
        getPosted();
    }, []);
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
                            <select
                                onChange={(e) => {
                                    setJobId(e.currentTarget.value);
                                    handleJobSelection(e.currentTarget.value);
                                }}
                                className="rounded-2xl border-[1px] border-stone-300 max-w-[20rem] focus:border-0 focus:ring-orange-300 bg-stone-50 py-3 border-0 cursor-pointer"
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
                        </div>
                    </div>
                    {/*  <div className="flex gap-x-5">
                        <p className="cursor-pointer text-neutral-900 text-2xl font-semibold leading-10">Active</p>
                        <div className="cursor-pointer hover:text-neutral-900 text-stone-300 text-2xl font-semibold leading-10">
                            Shortlist
                        </div>
                    </div> */}
                    <div className="p-1 flex flex-col md:flex-row gap-2 gap-x-6">
                        <select
                            onChange={(e) => setAllCandidates(e.currentTarget.value)}
                            className="cursor-pointer border-stone-300 focus:border-0 focus:ring-orange-300 h-16 rounded-2xl"
                        >
                            <option value="All Candidates">All Candidates</option>
                            <option value="Best Match">Best Match</option>
                            <option value="Shortlisted">Shortlisted</option>
                            {/* <JobTab text="All Candidates" active="true" />
                                <JobTab text="Best Match" /> */}
                        </select>
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
                    <div
                        className={
                            allCandidates == 'All Candidates'
                                ? 'col-span-12 order-1 flex flex-col gap-y-4 overflow-y-auto max-h-screen pr-2 md:pr-0 md:col-span-6 xl:col-span-3'
                                : 'col-span-12 hidden flex flex-col gap-y-4 overflow-y-auto max-h-screen pr-2 md:pr-0 md:col-span-6 xl:col-span-3'
                        }
                    >
                        {appliedCan &&
                            appliedCan.map((item: any, index: number) => {
                                return (
                                    <CandSmall
                                        indexValue={jobDetailIndex}
                                        indexSetter={setJobDetailIndex}
                                        detailValue={openCanDetail}
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
                                ? 'col-start-2 col-end-12 cursor-pointer rounded-full text-orange-500 text-center border-2 py-3 md:hidden'
                                : 'hidden'
                        }
                    >
                        Back To Candidate List
                    </p>

                    <div
                        className={
                            openCanDetail == true
                                ? allCandidates == 'Shortlisted'
                                    ? 'col-span-12 bg-textW overflow-y-auto order-2 max-h-screen md:col-span-6 md:grid lg:col-span-8 xl:col-span-9'
                                    : 'col-span-12 bg-textW overflow-y-auto order-2 max-h-screen md:col-span-6 md:grid'
                                : 'col-span-12 bg-textW overflow-y-auto order-2 max-h-screen hidden md:col-span-6 md:grid'
                        }
                    >
                        <CandidateDetail detailData={candidateDetail} />
                    </div>
                    <div
                        className={
                            allCandidates == 'Shortlisted'
                                ? 'col-span-12 order-1 overflow-y-auto max-h-screen flex flex-col gap-y-4 md:col-span-6 lg:col-span-4 xl:col-span-3 xl:flex'
                                : 'col-span-12 order-3 hidden overflow-y-auto max-h-screen flex flex-col gap-y-4 md:col-span-3 xl:flex'
                        }
                    >
                        {shortListed &&
                            shortListed.map((item: any, index: number) => {
                                return (
                                    <CandSmall
                                        handleFunction={deleteShortListed}
                                        detailSetter={setOpenCanDetail}
                                        detailHolder={setCandidateDetail}
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
        </div>
    );
};

export default Candidates;
