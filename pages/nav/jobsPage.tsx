import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useState } from 'react';
import jobData from './jobsData';
const AbD = (props: any) => {
    return (
        <ul className="text-[10px] flex gap-y-2 gap-x-1 col-span-12  md:text-[11px] md:gap-x-1 md:mt-1 md:text-[0.55rem] lg:text-[0.8rem] lg:gap-x-3 xl:text-[0.6rem] xl:gap-x-1">
            <li className="inline bg-lightGreen text-green-800 rounded-full p-2 px-3 sm:px-2 sm:py-1 md:max-lg:px-1.5 md:max-lg:py-2">
                <AccessTimeOutlinedIcon className="text-[0.9rem] -mt-0.5 mr-1 " />
                {props.jobType}
            </li>
            <li className="inline bg-lightGreen text-green-800 rounded-full p-2 px-3 sm:px-2 sm:py-1 md:max-lg:px-1.5 md:max-lg:py-2">
                <AttachMoneyOutlinedIcon className="text-[0.9rem] -mt-0.5 mr-1 " />
                {props.jobSalary}
            </li>
            <li className="inline bg-lightGreen text-green-800 rounded-full p-2 px-4 sm:px-2 sm:py-1 md:max-lg:px-1.5 md:max-lg:py-2">
                <CalendarTodayOutlinedIcon className="text-[0.9rem] -mt-0.5 mr-1 " /> {props.postedDate}
            </li>
        </ul>
    );
};
const Job = () => {
    const profile = '/images/profile.svg';
    return (
        <div className="bg-textW grid grid-cols-12 py-3 px-4 border border-gradientFirst rounded-2xl xl:pr-0 xl:pl-4 xl:py-4 ">
            <img src={profile} className="col-span-3 sm:max-md:col-span-4" />
            <div className="col-span-9 flex flex-col pl-2 justify-center sm:max-md:col-span-8 sm:max-md:pl-0">
                <p className="text-[13px] text-darkBlue sm:text-[1.5rem] md:text-[0.9rem] xl:text-[0.9rem]">Linear Company</p>
                <p className="text-darkBlue font-midRW text-thS sm:font-fhW sm:text-[2rem] md:text-[1.2rem] xl:text-[1.1rem]">
                    Software Engineer
                </p>
                <p className="text-fadedText">
                    <PinDropOutlinedIcon sx={{ fontSize: '1.2rem', marginTop: '-0.2rem' }} /> Addis abeba
                </p>
            </div>
            <div className="col-span-12 mt-4">
                <AbD />
            </div>
            <p className="col-span-12 text-fadedText leading-[24px] my-5 md:my-0 md:mt-2">
                Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod
                culpa. laborum tempor Lorem incididunt.
            </p>
        </div>
    );
};
const AbC = () => {
    return (
        <div className="justify-self-center grid grid-cols-12 rounded-full border-2 text-fadedText px-5 py-1.5 md:max-lg:px-2">
            <div className="col-span-1 flex items-center justify-center">
                <SearchIcon className="text-[16px] md:max-lg:text-[0.7rem]" />
            </div>
            <div className="col-span-11 max-sm:text-[14px] md:max-lg:text-[0.6rem] flex items-center pl-2 lg:text-[11px]">top Searched</div>
        </div>
    );
};
const Drop = () => {
    const [datePosted, setDatePosted] = useState(false);
    const toggleDatePosted = () => {
        setDatePosted(!datePosted);
    };
    return (
        <div className="col-span-6 bg-[#F8F8F8] relative cursor-pointer rounded-full md:col-span-3" onClick={toggleDatePosted}>
            <select className="rounded-full block bg-[#F8F8F8] appearance-none h-full w-full text-gray-700 py-3 px-4 pr-8  focus:outline-none cursor-pointer border-0 md:max-lg:px-2 md:max-lg:text-[0.6rem] lg:max-xl:text-[0.8rem] ">
                <option className="text-thS font-thW leading-thL text-textR md:text-dfhS font-dfhW leading-dfhL md:col-span-2">
                    Date Posted
                </option>
                <option>Option 2</option>
                <option>Option 3</option>
            </select>
            <div className="pointer-events-none absolute right-0 top-2.5 flex justify-end text-gray-700 pr-1">
                {datePosted == true ? (
                    <KeyboardArrowUpIcon className="md:text-[1.2rem] lg:text-[1.4rem] xl:text-[1.8rem]" />
                ) : (
                    <KeyboardArrowDownIcon className="md:text-[1.2rem] lg:text-[1.4rem] xl:text-[1.8rem]" />
                )}
            </div>
        </div>
    );
};
const Jobtype = (props: any) => {
    return (
        <div className="col-span-6 flex flex-col max-md:pl-2 py-2 rounded-2xl gap-y-2 bg-textW sm:col-span-3 items-center">
            <p className="font-fhW sm:max-md:text-[0.8rem] md:text-fhS md:max-lg:text-[1rem]"> {props.salary}</p>
            <p className=" text-fadedText sm:max-md:text-[12px] flex md:max-lg:text-[0.7rem] lg:text-[14px]">
                <PinDropOutlinedIcon className="text-[18px] mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]" />{' '}
                {props.money}
            </p>
        </div>
    );
};
const Jobs = () => {
    const profile = '/images/profile.svg';
    const uploadResume = '/images/uploadResume.svg';
    const [datePosted, setDatePosted] = useState(false);
    const [jobDetailId, setJobDetailId] = useState(1);
    const [openJobDetail, setOpenJobDetail] = useState(false);
    const [jobDetails, setJobDetails] = useState<any>();
    const [company, setCompany] = useState(false);
    const toggleDatePosted = () => {
        setDatePosted(!datePosted);
    };

    useEffect(() => {
        setJobDetails(jobData.find((items: { id: number }) => items.id == jobDetailId));
    }, []);
    useEffect(() => {
        setJobDetails(jobData.find((items: { id: number }) => items.id === jobDetailId));

        console.log(jobData.find((items: { id: number }) => items.id === jobDetailId)?.compName);
    }, [jobDetailId]);
    return (
        <div className="px-3 xl:px-16">
            <Navigation />
            <div className="grid grid-cols-12 mt-8 bg-forBack px-1 md:mt-16">
                <div className="col-span-12">
                    <p
                        className={
                            openJobDetail == true
                                ? 'text-fhS max-md:hidden max-md:text-center font-dthW leading-dthL pb-8 md:text-dthS'
                                : 'text-fhS max-md:text-center font-dthW leading-dthL pb-8 md:text-dthS'
                        }
                    >
                        Welcome Back, Lets' Find a Job
                    </p>
                </div>
                <div className="col-span-12 grid grid-cols-12 gap-x-2">
                    <div className="col-span-12 grid grid-cols-12 gap-x-2 gap-y-4 md:col-span-12 xl:col-span-9">
                        <div
                            className={
                                openJobDetail == true
                                    ? 'col-span-12 max-md:hidden max-md:mb-3 grid grid-cols-12 gap-x-1 text-textW md:col-span-5 md:max-lg:text-[0.9rem] xl:text-bigS xl:font-bigW'
                                    : 'col-span-12 max-md:mb-3 grid grid-cols-12 gap-x-1 text-textW md:col-span-5 md:max-lg:text-[0.9rem] xl:text-bigS xl:font-bigW'
                            }
                        >
                            <div className="col-span-4 bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl h-[4.5rem] flex items-center justify-center">
                                Best Match
                            </div>
                            <div className="col-span-4 bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl h-[4.5rem] flex items-center justify-center">
                                Best Match
                            </div>
                            <div className="col-span-4 bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl h-[4.5rem] flex items-center justify-center">
                                Best Match
                            </div>
                        </div>
                        <div
                            className={
                                openJobDetail == true
                                    ? 'col-span-10 max-md:hidden grid grid-cols-12 rounded-2xl md:rounded-3xl md:col-span-6'
                                    : 'col-span-10 grid grid-cols-12 bg-[#F8F8F8] rounded-2xl md:rounded-3xl md:col-span-6'
                            }
                        >
                            <div className="hidden col-span-2 text-fadedText items-center justify-center md:max-lg:col-span-1 md:flex">
                                <SearchIcon className="text-[1.7rem]" />
                            </div>
                            <div className="col-span-11 md:max-lg:col-span-9 lg:col-span-8">
                                <input className="h-full w-full bg-[#F8F8F8] pl-5 focus:outline-none" placeholder="Marketing Manager" />
                            </div>
                            <div className="col-span-1 text-darkBlue flex items-center justify-center">
                                <TuneIcon className="text-[1.7rem] cursor-pointer" />
                            </div>
                        </div>
                        <div
                            className={
                                openJobDetail == true
                                    ? 'col-span-2 max-md:hidden self-center max-md:py-3 bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-xl text-textW flex items-center justify-center w-full h-full sm:max-lg:h-16 sm:max-lg:w-16 md:rounded-3xl md:col-span-1'
                                    : 'col-span-2 self-center max-md:py-3 bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-xl text-textW flex items-center justify-center w-full h-full sm:max-lg:h-16 sm:max-lg:w-16 md:rounded-3xl md:col-span-1'
                            }
                        >
                            <SearchIcon className="text-[1.5rem] cursor-pointer md:max-lg:text-[2rem] lg:text-dfrhS" />
                        </div>
                        <div
                            className={
                                openJobDetail == true
                                    ? 'col-span-12 max-md:my-3 grid-cols-12 gap-2 hidden'
                                    : 'col-span-12 max-md:my-3 grid grid-cols-12 gap-2 md:hidden'
                            }
                        >
                            <Drop />
                            <Drop />
                            <Drop />
                            <Drop />
                        </div>
                        <div
                            className={
                                openJobDetail == true
                                    ? 'hidden'
                                    : 'col-span-12 bg-textW md:hidden md:col-span-3'
                            }
                        >
                            <div className="flex gap-x-3 md:pt-10">
                                <img src={uploadResume} className="h-[8rem] self-center mt-5 max-md:my-5 md:w-[14rem] md:h-[14rem]" />
                                <div className="flex flex-col justify-center">
                                    <p className="text-[1.5rem] font-shW leading-frhL text-gradientFirst">Upload your resume</p>
                                    <p className="text-lightGrey">Let employers find you</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 grid grid-cols-12 gap-x-5">
                            <div
                                className={
                                    openJobDetail == true
                                        ? 'col-span-12 hidden grid gap-y-3 max-h-[60rem] overflow-auto hideScrollBar md:grid md:col-span-5 lg:col-span-5 xl:col-span-4'
                                        : 'col-span-12 grid gap-y-3 max-h-[60rem] overflow-auto hideScrollBar md:col-span-5 lg:col-span-5 xl:col-span-4'
                                }
                            >
                                {jobData.map((items: any, index: number) => {
                                    return (
                                        <div
                                            onClick={() => {
                                                setJobDetailId(items.id);
                                                setOpenJobDetail(true);
                                            }}
                                            key={items.id}
                                            className="cursor-pointer bg-textW grid grid-cols-12 py-3 px-4 border border-gradientSecond rounded-2xl xl:pr-0 xl:pl-4 xl:py-4 "
                                        >
                                            <img src={profile} className="col-span-3 sm:max-md:col-span-4" />
                                            <div className="col-span-9 flex flex-col pl-2 justify-center sm:max-md:col-span-8 sm:max-md:pl-0">
                                                <p className="text-[13px] text-darkBlue sm:text-[1.5rem] md:text-[0.9rem] xl:text-[0.9rem]">
                                                    {items.compName}
                                                </p>
                                                <p className="text-darkBlue font-midRW text-thS sm:font-fhW sm:text-[2rem] md:text-[1.2rem] xl:text-[1.1rem]">
                                                    {items.jobTitle}
                                                </p>
                                                <p className="text-fadedText">
                                                    <PinDropOutlinedIcon sx={{ fontSize: '1.2rem', marginTop: '-0.2rem' }} />{' '}
                                                    {items.location}
                                                </p>
                                            </div>
                                            <div className="col-span-12 mt-4">
                                                <AbD jobType={items.jobType} jobSalary={items.salary} postedDate={items.postedTime} />
                                            </div>
                                            <p className="col-span-12 text-fadedText leading-[24px] my-5 md:my-0 md:mt-2">
                                                {items.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div
                                className={
                                    openJobDetail == true
                                        ? 'col-span-12 grid grid-cols-12 md:col-span-7 lg:col-span-7 xl:col-span-8'
                                        : 'col-span-12 hidden grid grid-cols-12 md:grid md:col-span-7 lg:col-span-7 xl:col-span-8'
                                }
                            >
                                <div className="col-span-12 flex flex-col gap-y-5">
                                    <p
                                        onClick={() => setOpenJobDetail(false)}
                                        className="p-3 border-2 rounded-full flex justify-center md:hidden"
                                    >
                                        Back To Search
                                    </p>
                                    <div className="hidden col-span-12 grid-cols-12 gap-x-2 md:grid">
                                        <Drop />
                                        <Drop />
                                        <Drop />
                                        <Drop />
                                    </div>
                                    <div className="col-span-12 gap-2 justify-center hidden md:flex xl:justify-start">
                                        <AbC />
                                        <AbC />
                                        <AbC />
                                        <AbC />
                                    </div>
                                    <div className="col-span-12 grid grid-cols-12 gap-y-5 relative">
                                        <div className="col-span-12 grid grid-cols-12 gap-0f">
                                            <img src={profile} className="col-span-2 w-full h-full sm:h-[5.8rem]" />
                                            <div className="col-span-8 flex flex-col max-sm:pl-3">
                                                <p className="text-[12px] text-darkBlue sm:text-fhS xl:text-[1rem]">
                                                    {jobDetails && jobDetails.compName}
                                                </p>
                                                <p className="text-darkBlue font-midRW text-midRS sm:font-fhW sm:text-dfvhS xl:text-[1.5rem]">
                                                    {jobDetails && jobDetails.jobTitle}
                                                </p>
                                                <p className="text-fadedText">
                                                    <PinDropOutlinedIcon sx={{ fontSize: '1.2rem', marginTop: '-0.2rem' }} />{' '}
                                                    {jobDetails && jobDetails.location}
                                                </p>
                                            </div>
                                            <div className="col-span-2 flex gap-x-5 text-lightGrey items-center">
                                                <ShareOutlinedIcon className="text-[2rem] cursor-pointer" />
                                                <BookmarkBorderOutlinedIcon className="text-[2rem] cursor-pointer" />
                                            </div>
                                        </div>
                                        <div className="col-span-12 grid grid-cols-12 bg-forBack gap-x-1 gap-y-2 md:gap-x-2 md:p-2">
                                            <Jobtype salary="Salary" money={jobDetails && jobDetails.salary} />
                                            <Jobtype salary="Job Type" money={jobDetails && jobDetails.jobType} />
                                            <Jobtype salary="Applicants" money="20 / 50" />
                                            <Jobtype salary="Skill" money="Expert" />
                                        </div>
                                        <div className="col-span-12 grid grid-cols-12 border-[1px] rounded-full">
                                            <div
                                                className={
                                                    company == true
                                                        ? 'col-span-6 rounded-full rounded-3xl text-lightGrey text-bigS font-bigW h-[4.5rem] flex items-center justify-center cursor-pointer'
                                                        : 'col-span-6 rounded-full bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW text-bigS font-bigW h-[4.5rem] flex items-center justify-center cursor-pointer'
                                                }
                                                onClick={() => setCompany(false)}
                                            >
                                                Description
                                            </div>

                                            <div
                                                className={
                                                    company == true
                                                        ? 'col-span-6 rounded-full bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW text-bigS font-bigW h-[4.5rem] flex items-center justify-center cursor-pointer'
                                                        : 'col-span-6 rounded-full rounded-3xl text-lightGrey text-bigS font-bigW h-[4.5rem] flex items-center justify-center cursor-pointer'
                                                }
                                                onClick={() => setCompany(true)}
                                            >
                                                Company
                                            </div>
                                        </div>
                                        {!company && (
                                            <div className="col-span-12">
                                                <p className="font-thW text-frhS">Job Description</p>
                                                <p className="text-midRS text-fadedText max-h-96 overflow-y-auto hideScrollBar">
                                                    Lorem ipsum dolor sit amet consectetur. Accumsan feugiat dolor aliquet senectus mi
                                                    viverra. Lectus fringilla ut dignissim mauris diam vitae pharetra. Sagittis phasellus
                                                    morbi morbi dis. Nisi sit arcu scelerisque donec accumsan faucibus duis. Placerat
                                                    egestas fermentum pretium phasellus id urna eget elementum duis. Netus tellus senectus
                                                    sollicitudin egestas adipiscing nulla aenean vestibulum. Sapien velit lorem facilisis
                                                    eget vitae. Sit id viverra enim ut hendrerit ultricies sed praesent. Et viverra ipsum
                                                    auctor at eleifend. Integer integer rhoncus amet sagittis erat in facilisi diam est.
                                                    Iaculis ut interdum mattis aliquet. Volutpat convallis aliquam nunc condimentum eget
                                                    maecenas. At enim interdum est imperdiet nulla sit quam suspendisse. Fringilla neque
                                                    vestibulum eu turpis imperdiet euismod leo nunc posuere. Venenatis nisl morbi ultrices
                                                    diam auctor sociis id a. Auctor diam habitasse ultrices mattis quam nisi egestas
                                                    habitant eros. Varius mattis vestibulum enim mi amet elit amet in non. Orci mauris
                                                    cursus rutrum adipiscing faucibus ultricies tristique nisi. Sit eu turpis magna amet.
                                                    Leo nulla odio sit tellus est hendrerit. Id porttitor in integer nunc et eleifend
                                                    accumsan. Quisque in sagittis semper condimentum ut cras aliquet diam. Ornare ultricies
                                                    amet est tortor eget. Non natoque dignissim est diam morbi.
                                                </p>
                                                <div className="w-full absolute top-[100%] mt-1 rounded-full bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW text-bigS font-bigW h-[4.5rem] flex items-center justify-center cursor-pointer ">
                                                    Apply
                                                </div>
                                            </div>
                                        )}
                                        {company && (
                                            <div className="col-span-12">
                                                <p className="font-thW text-frhS">Company's Detail</p>
                                                <p className="text-midRS text-fadedText max-h-96 overflow-y-auto hideScrollBar">
                                                    Lorem ipsum dolor sit amet consectetur. Accumsan feugiat dolor aliquet senectus mi
                                                    viverra. Lectus fringilla ut dignissim mauris diam vitae pharetra. Sagittis phasellus
                                                    morbi morbi dis. Nisi sit arcu scelerisque donec accumsan faucibus duis. Placerat
                                                    egestas fermentum pretium phasellus id urna eget elementum duis. Netus tellus senectus
                                                    sollicitudin egestas adipiscing nulla aenean vestibulum. Sapien velit lorem facilisis
                                                    eget vitae. Sit id viverra enim ut hendrerit ultricies sed praesent. Et viverra ipsum
                                                    auctor at eleifend. Integer integer rhoncus amet sagittis erat in facilisi diam est.
                                                    Iaculis ut interdum mattis aliquet. Volutpat convallis aliquam nunc condimentum eget
                                                    maecenas. At enim interdum est imperdiet nulla sit quam suspendisse. Fringilla neque
                                                    vestibulum eu turpis imperdiet euismod leo nunc posuere. Venenatis nisl morbi ultrices
                                                    diam auctor sociis id a. Auctor diam habitasse ultrices mattis quam nisi egestas
                                                    habitant eros. Varius mattis vestibulum enim mi amet elit amet in non. Orci mauris
                                                    cursus rutrum adipiscing faucibus ultricies tristique nisi. Sit eu turpis magna amet.
                                                    Leo nulla odio sit tellus est hendrerit. Id porttitor in integer nunc et eleifend
                                                    accumsan. Quisque in sagittis semper condimentum ut cras aliquet diam. Ornare ultricies
                                                    amet est tortor eget. Non natoque dignissim est diam morbi.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 bg-textW max-md:hidden xl:col-span-3">
                        {/*  <div className="flex justify-center items-center md:pt-10 xl:flex-col xl:text-center">
                            <div>
                                <p className="text-[1.5rem] font-shW leading-frhL text-gradientFirst">Upload your resume</p>
                                <p className="text-lightGrey">Let employers find you</p>
                            </div>
                            <img src={uploadResume} className="h-[20rem] self-center md:w-[14rem] md:h-[14rem]" />
                        </div> */}
                        <div className="flex justify-center items-center md:pt-10 xl:flex-col xl:text-center">
                            <img src={profile} className="self-center w-[8rem] h-[8rem]" />
                            <div className=" px-5 flex flex-col gap-y-2 mt-2 xl:w-full">
                                <p className="text-[1.5rem] font-fhW">John Doe</p>
                                <p className="text-fadedText">Let employers find you</p>
                                <button className="text-textW font-fhW bg-gradient-to-r from-gradientFirst to-gradientSecond  py-5 rounded-full mt-4 xl:w-full">
                                    Edit Your Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default Jobs;
