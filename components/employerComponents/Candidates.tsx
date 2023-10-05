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
        </div>
    );
};

export default Candidates;
