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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TuneIcon from '@mui/icons-material/Tune';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useState, Fragment } from 'react';
import ConfirmModal from '@/components/ConfirmModal';
import { Listbox, Transition } from '@headlessui/react';
import RadioInput from '@/components/RadioInput';
import DropDown from '@/components/DropDown';
import { useRouter } from 'next/router';
import CloseIcon from '@mui/icons-material/Close';
import { fetchJobs, getAccount, getCompanyData, getEmployerPicture, getProfilePicture, getRole } from '@/lib/services';
import ApplyToJob from '@/components/candidateProfileComponents/ApplyToJobs';
import JobImage from '@/components/JobImage';
import AttachMoneyOutlined from '@mui/icons-material/AttachMoneyOutlined';
import EuroIcon from '@mui/icons-material/Euro';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
const sortByData = [{ name: 'Best Match' }, { name: 'Most Recent' }, { name: 'Featured' }];
const datePostedData = ['Date Posted', 'Any time', 'Past 24hrs', 'Past Week', 'Past Month'];
const experienceData = ['Experience Level', 'Internship', 'Entry Level', 'Associate', 'Mid-senior Level', 'Senior'];
const jobTypeData = ['Job Type', 'Internship', 'Full Time', 'Part Time', 'Remote', 'Contract'];
const JobCard = (props: any) => {
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

const Jobs = () => {
    const router = useRouter();
    const [datePosted, setDatePosted] = useState(datePostedData[0]);
    const [expLevel, setExpLevel] = useState(experienceData[0]);
    const [jobType, setJobType] = useState(jobTypeData[0]);
    const [sortBy, setSortBy] = useState('Best Match');
    const profile = '/images/profile.svg';
    const uploadResume = '/images/uploadResume.svg';
    const [jobDetailId, setJobDetailId] = useState('');
    const [openJobDetail, setOpenJobDetail] = useState(false);
    const [jobDetails, setJobDetails] = useState<any>();
    const [company, setCompany] = useState(false);
    const [openFilter, setOpenfilter] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [address, setAddress] = useState('');
    const [addressHolder, setAddressHolder] = useState('');
    const [searchWord, setSearchWord] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<any>();
    const [maxPaginate, setMaxPaginate] = useState(5);
    const [minPaginate, setMinPaginate] = useState(1);
    const [compnayDes, setCompanyDes] = useState('');
    const [employerId, setEmployerId] = useState('');
    const [apply, setApply] = useState(false);
    const [applyJobId, setApplyJobId] = useState('');
    const [applyEmployerId, setApplyEmployerId] = useState('');
    useEffect(() => {
        fetchJobs().then((res) => {
            setData(res.documents);
            setJobDetails(res.documents[0]);
            setJobDetailId(res.documents[0].$id);
        });
        if (Object.keys(router.query).length > 0) {
            const { param1, param2 } = router.query;
            param1 && setSearchQuery(param1.toString());
            param1 && setSearchWord(param1.toString());
            param2 && setAddress(param2.toString());
            param2 && setAddressHolder(param2.toString());
        }
    }, []);
    useEffect(() => {
        const documents = getCompanyData(employerId);
        documents.then(async (res) => {
            if (res.documents && res.documents[0] && res.documents[0].description) {
                setCompanyDes(res.documents[0].description);
            } else {
                setCompanyDes('');
            }
        });
    }, [employerId]);
    const filData =
        data &&
        data.filter((item: any) => {
            let isMatch = true;
            if (searchQuery.toLocaleLowerCase()) {
                const searchRegex = new RegExp(searchQuery, 'i');
                isMatch = isMatch && searchRegex.test(item.jobTitle);
            }
            if (address !== '' && address.toLocaleLowerCase()) {
                const searchRegex = new RegExp(address, 'i');
                isMatch = isMatch && searchRegex.test(item.jobLocation);
            }
            if (datePosted !== 'Date Posted') {
                isMatch = isMatch && item.jobType == datePosted;
            }
            if (expLevel !== 'Experience Level') {
                isMatch = isMatch && item.expreienceLevel == expLevel;
            }
            if (jobType !== 'Job Type') {
                isMatch = isMatch && item.jobType == jobType;
            }

            return isMatch;
        });
    const [filtered, setFiltered] = useState(data);
    const itemsPerPage = 5;
    const pageCount = filData && Math.ceil(filData.length / itemsPerPage);
    const currentData = filData && filData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const [checked, setChecked] = useState(false);
    const setTheSearchTerm = () => {
        setSearchQuery(searchWord);
        setAddress(addressHolder);
    };
    const handleReset = () => {
        setDatePosted(datePostedData[0]);
        setExpLevel(experienceData[0]);
        setJobType(jobTypeData[0]);
        setSortBy('');
        /*         setOpenfilter(false);
         */
    };
    const showPage = (page: number) => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        for (let i = 0; i < filData.length; i++) {
            const item = document.getElementById(`item-${i}`);
            if (item) {
                item.style.display = i >= startIndex && i < endIndex ? 'grid' : 'none';
            }
        }
        setCurrentPage(page);
    };
    const changePage = (page: number) => {
        if (page > 0 && page <= pageCount) {
            showPage(page);
        }
    };
    const previousPage = () => {
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
        setMinPaginate(minPaginate - 1);
        setMaxPaginate(maxPaginate - 1);
    };
    const nextPage = () => {
        if (currentPage < pageCount) {
            showPage(currentPage + 1);
        }
        setMaxPaginate(maxPaginate + 1);
        setMinPaginate(minPaginate + 1);
    };
    useEffect(() => {
        data && setJobDetails(data.find((items: any) => items.$id == jobDetailId));
    }, [jobDetailId]);
    useEffect(() => {
        if (searchQuery == '') {
            setFiltered(data);
        }
    }, [searchQuery]);
    const handleApply = async (jobId: string, employerId: string) => {
        setApply(false);
        const accountInfo = await getAccount();
        if (accountInfo !== 'failed') {
            const role = await getRole(accountInfo.$id);
            if (role.documents[0].userRole == 'candidate') {
                setApply(true);
                setApplyJobId(jobId);
                setApplyEmployerId(employerId);
            }
        }
        if (accountInfo == 'failed') {
            router.push('/account');
        }
    };

    const handleSaveJob = async (jobId: string) => {
        const accountInfo = await getAccount();
        if (accountInfo) {
            console.log('it was success');
        } else {
            router.push('/account');
        }
        /*  if (checkUser) {
            router.push('/account/signIn');
            console.log('hey');
        } else {
            const checkJob = alreadyApplied(props.userId, jobId);
            checkJob.then((res) => {
                const checkSaved = alreadySaved(props.userId, jobId);
                 console.log(res); 
                checkSaved.then((rep) => console.log(rep));
                console.log(checkSaved);

                if (res.total == 0) { 
                checkSaved.then((rem: any) => {
                    console.log('saved message' + rem);

                    if (rem.total == 0) {
                        console.log('not saved');
                        saveJobs(props.userId, jobId);
                    } else {
                        console.log('already saved this job');
                    }
                });
                }
            });
          
        } */
    };
    const handleEmailApply = (email: string) => {
        const subject = 'Your subject line';
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
        window.location.href = mailtoLink;
    };
    return (
        <>
            <div className="px-3 xl:px-16">
                <Navigation />
                <div className="grid grid-cols-12 sm:gap-x-10 mt-8 bg-forBack md:mt-16">
                    <div className="col-span-12 bg-textW">
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
                    <div className="col-span-12 grid grid-cols-12 gap-x-2 xl:gap-x-5">
                        <div className="col-span-12 grid grid-cols-12 bg-textW gap-x-2 gap-y-4 md:col-span-12 xl:col-span-9 xl:pr-2">
                            <div
                                className={
                                    openJobDetail == true
                                        ? 'col-span-12 max-md:hidden max-md:mb-3 grid grid-cols-12 gap-x-0 text-textW md:col-span-5 md:max-lg:text-[0.9rem] xl:text-bigS xl:font-bigW xl:col-span-4'
                                        : 'col-span-12 max-md:mb-3 grid grid-cols-12 gap-x-0 text-textW md:col-span-5 md:max-lg:text-[0.9rem] xl:text-bigS xl:font-bigW xl:col-span-4'
                                }
                            >
                                {/*  <div className="col-span-3 text-[12px] bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-2xl h-[4rem] flex items-center justify-center">
                                    Best Match
                                </div>
                                <div className="col-span-3 text-[12px] text-fadedText rounded-2xl h-[4rem] flex items-center justify-center">
                                    Featured
                                </div>
                                <div className="col-span-3 text-[12px] text-fadedText rounded-2xl h-[4rem] flex items-center justify-center">
                                    Most Recent
                                </div> */}
                            </div>
                            <div
                                className={
                                    openJobDetail == true
                                        ? 'col-span-10 bg-[#F8F8F8] max-md:hidden grid max-h-[4rem] grid-cols-12 rounded-2xl md:rounded-3xl md:col-span-6 xl:col-span-7'
                                        : 'col-span-10 grid grid-cols-12 bg-[#F8F8F8] max-h-[4rem] rounded-2xl md:rounded-3xl md:col-span-6 xl:col-span-7'
                                }
                            >
                                <div className="col-span-12 px-3 py-2 max-h-[5rem] flex items-center">
                                    <SearchIcon className="text-[1.3rem] text-stone-400" />
                                    <input
                                        name="search text"
                                        value={searchWord}
                                        onChange={(e) => {
                                            setSearchWord(e.currentTarget.value);
                                        }}
                                        className="h-full w-full bg-[#F8F8F8] pl-5 border-none outline-none focus:ring-0 focus:border-none focus:outline-none sm:w-1/2"
                                        placeholder="Marketing Manager"
                                    />
                                    <div className="border-r-1 h-full w-[2px] bg-stone-300 mr-3 max-sm:hidden"></div>
                                    <PinDropOutlinedIcon className="text-[1.3rem] text-stone-400 max-sm:hidden" />
                                    <input
                                        name="search location"
                                        value={addressHolder}
                                        onChange={(e) => {
                                            setAddressHolder(e.currentTarget.value);
                                        }}
                                        className="h-full w-full bg-[#F8F8F8] max-sm:hidden pl-5 border-none outline-none focus:ring-0 focus:border-none focus:outline-none sm:w-1/2"
                                        placeholder="Remote"
                                    />
                                    <div
                                        onClick={() => setOpenfilter(true)}
                                        className="col-span-1 text-darkBlue flex items-center justify-center md:justify-start xl:pl-5 xl:justify-end xl:col-span-2"
                                    >
                                        <TuneIcon className="text-[1.7rem] cursor-pointer" />
                                    </div>
                                </div>
                            </div>

                            <div
                                onClick={setTheSearchTerm}
                                className={
                                    openJobDetail == true
                                        ? 'col-span-2 max-md:hidden self-center max-md:py-3 bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-xl text-textW flex items-center justify-center w-full h-full sm:max-lg:h-16 sm:max-lg:w-16 md:rounded-2xl md:col-span-1'
                                        : 'col-span-2 self-center max-md:py-3 bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-xl text-textW flex items-center justify-center w-full h-full sm:max-lg:h-16 sm:max-lg:w-16 md:rounded-3xl md:col-span-1 xl:rounded-2xl xl:w-14 xl:h-14'
                                }
                            >
                                <SearchIcon className="text-[1.5rem] cursor-pointer md:max-lg:text-[2rem] lg:text-3xl" />
                            </div>
                            <div className="col-span-10 flex items-center bg-[#F8F8F8] rounded-2xl py-2 pl-3 p-1 sm:hidden">
                                <PinDropOutlinedIcon className="text-[1.3rem] text-stone-400 " />
                                <input
                                    name="remote"
                                    value={addressHolder}
                                    onChange={(e) => {
                                        setAddressHolder(e.currentTarget.value);
                                    }}
                                    className="h-full w-full bg-[#F8F8F8] pl-5 border-none outline-none focus:ring-0 focus:border-none focus:outline-none sm:w-1/2"
                                    placeholder="Remote"
                                />
                            </div>
                            {/*  <div
                                className={
                                    openJobDetail == true
                                        ? 'col-span-12 max-md:my-3 grid-cols-12 gap-2 hidden'
                                        : 'col-span-12 max-md:my-3 grid grid-cols-12 gap-2 md:hidden'
                                }
                            >
                                <DropDown selectedElement={datePosted} setSelectedElement={setDatePosted} displayedData={datePostedData} />
                                <DropDown selectedElement={expLevel} setSelectedElement={setExpLevel} displayedData={experienceData} />
                                <DropDown selectedElement={jobType} setSelectedElement={setJobType} displayedData={jobTypeData} />
                            </div> */}
                            <div className={openJobDetail == true ? 'hidden' : 'col-span-12 bg-textW md:hidden md:col-span-3'}>
                                <div className="flex gap-x-3 md:pt-10">
                                    <img src={uploadResume} className="h-[8rem] self-center mt-5 max-md:my-5 md:w-[14rem] md:h-[14rem]" />
                                    <div className="flex flex-col justify-center">
                                        <p className="text-[1.5rem] font-shW leading-frhL text-gradientFirst">Upload your resume</p>
                                        <p className="text-lightGrey">Let employers find you</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 grid grid-cols-12 gap-x-5 bg-forBack">
                                <div
                                    className={
                                        openJobDetail == true
                                            ? 'col-span-12 hidden flex flex-col gap-y-3 max-h-[40rem] overflow-auto hideScrollBar md:flex md:col-span-5 lg:col-span-5 xl:col-span-4'
                                            : 'col-span-12 flex flex-col max-h-[40rem] gap-y-3 overflow-auto hideScrollBar md:flex md:col-span-5 lg:col-span-5 xl:col-span-4'
                                    }
                                >
                                    {currentData &&
                                        currentData.map((items: any, index: number) => {
                                            return (
                                                <div
                                                    /*                                                     id={`item-${index}`}
                                                     */ onClick={() => {
                                                        setEmployerId(items.employerId);
                                                        setJobDetailId(items.$id);
                                                        setOpenJobDetail(true);
                                                    }}
                                                    key={index}
                                                    className={
                                                        items.$id == jobDetailId
                                                            ? 'cursor-pointer max-h-[18rem] bg-textW grid grid-cols-12 py-3 px-4 bg-white rounded-3xl shadow border border-t-red-200 border-gradientSecond rounded-2xl xl:pr-0 xl:pl-4 xl:py-7 '
                                                            : 'cursor-pointer max-h-[18rem] bg-textW grid grid-cols-12 py-3 px-4 bg-white rounded-3xl shadow border rounded-2xl xl:pr-0 xl:pl-4 xl:py-7 '
                                                    }
                                                >
                                                    <JobImage id={items.employerId} className="col-span-3 sm:max-md:col-span-4" />

                                                    <div className="col-span-9 flex flex-col pl-2 justify-center sm:max-md:col-span-8 sm:max-md:pl-0">
                                                        {items.companyName && (
                                                            <p className="text-[13px] text-darkBlue sm:text-[1.5rem] md:text-[0.9rem] xl:text-[0.9rem]">
                                                                {items.companyName}
                                                            </p>
                                                        )}
                                                        {items.jobTitle && (
                                                            <p className="text-darkBlue font-midRW text-thS sm:font-fhW sm:text-[2rem] md:text-[1.2rem] xl:text-[1.1rem]">
                                                                {items.jobTitle}
                                                            </p>
                                                        )}
                                                        {items.jobLocation && (
                                                            <p className="text-fadedText">
                                                                <PinDropOutlinedIcon sx={{ fontSize: '1.2rem', marginTop: '-0.2rem' }} />{' '}
                                                                {items.jobLocation}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="col-span-12 mt-4">
                                                        <ul className="text-[10px] flex gap-y-2 gap-x-1 col-span-12  md:text-[11px] md:gap-x-1 md:mt-1 md:text-[0.55rem] lg:text-[0.8rem] lg:gap-x-3 xl:text-[0.6rem] xl:gap-x-1">
                                                            {items.jobType && (
                                                                <li className="inline bg-lightGreen text-green-800 rounded-full p-2 px-3 sm:px-2 sm:py-1 md:max-lg:px-1.5 md:max-lg:py-2">
                                                                    <AccessTimeOutlinedIcon className="text-[0.9rem] -mt-0.5 mr-1 " />
                                                                    {items.jobType}
                                                                </li>
                                                            )}
                                                            {(items.minSalary || items.maxSalary) && (
                                                                <li className="inline bg-lightGreen text-green-800 rounded-full p-2 px-3 sm:px-2 sm:py-1 md:max-lg:px-1.5 md:max-lg:py-2">
                                                                    {items.currency == 'euro' ? (
                                                                        <EuroIcon className="text-[0.9rem] -mt-0.5 mr-1" />
                                                                    ) : items.currency == 'usd' ? (
                                                                        <AttachMoneyOutlined className="text-[0.9rem] -mt-0.5 mr-1" />
                                                                    ) : items.currency == 'gpb' ? (
                                                                        <CurrencyPoundIcon className="text-[0.9rem] -mt-0.5 mr-1" />
                                                                    ) : items.currency == 'rnp' ? (
                                                                        <CurrencyRupeeIcon className="text-[0.9rem] -mt-0.5 mr-1" />
                                                                    ) : (
                                                                        <span className="text-[7px] mr-1">ETB</span>
                                                                    )}
                                                                    {!items.minSalary && items.maxSalary
                                                                        ? items.maxSalary
                                                                        : items.minSalary && !items.maxSalary
                                                                        ? items.maxSalary
                                                                        : items.minSalary + '-' + items.maxSalary}
                                                                </li>
                                                            )}
                                                            {items.datePosted && (
                                                                <li className="inline bg-lightGreen text-green-800 rounded-full p-2 px-4 sm:px-2 sm:py-1 md:max-lg:px-1.5 md:max-lg:py-2">
                                                                    <CalendarTodayOutlinedIcon className="text-[0.9rem] -mt-0.5 mr-1 " />{' '}
                                                                    {new Date(items.datePosted)
                                                                        .toLocaleDateString('en-GB')
                                                                        .replace(/\//g, '-')}
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                    <div className="col-span-12 w-full text-fadedText leading-[24px] my-5 md:my-0 md:mt-2 overflow-hidden max-h-[45%] sm:max-h-[90%] pr-2">
                                                        <div className="w-full">
                                                            <div
                                                                className="overflow-ellipsis"
                                                                style={{
                                                                    display: '-webkit-box',
                                                                    WebkitLineClamp: 3,
                                                                    WebkitBoxOrient: 'vertical'
                                                                }}
                                                                dangerouslySetInnerHTML={{ __html: items.jobDescription }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>

                                {jobDetails && (
                                    <div
                                        className={
                                            openJobDetail == true
                                                ? 'col-span-12 grid grid-cols-12 md:col-span-7 lg:col-span-7 xl:col-span-8'
                                                : 'col-span-12 hidden grid grid-cols-12 md:grid md:col-span-7 lg:col-span-7 xl:col-span-8'
                                        }
                                    >
                                        <div className="col-span-12 flex flex-col">
                                            <p
                                                onClick={() => setOpenJobDetail(false)}
                                                className="p-3 border-2 rounded-full flex justify-center md:hidden"
                                            >
                                                Back To Search
                                            </p>
                                            <div className="col-span-12 grid grid-cols-12 mb-5 gap-y-3 pt-0.5 rounded-b-xl bg-textW xl:pr-5">
                                                <div className="hidden col-span-12 gap-x-2 md:flex">
                                                    {datePosted !== 'Date Posted' && (
                                                        <div className="min-w-36 h-12 font-adW text-adS leading-adL bg-skillColor text-center flex px-7 pr-3 items-center rounded-[3.75rem]">
                                                            <p> {datePosted} </p>
                                                            <p className="ml-5 ">
                                                                <CloseIcon
                                                                    sx={{ color: 'green' }}
                                                                    className="h-7 cursor-pointer p-1"
                                                                    onClick={() => setDatePosted('Date Posted')}
                                                                />
                                                            </p>
                                                        </div>
                                                    )}
                                                    {expLevel !== 'Experience Level' && (
                                                        <div className="min-w-36 h-12 font-adW text-adS leading-adL bg-skillColor text-center flex px-7 pr-3 items-center rounded-[3.75rem]">
                                                            <p> {expLevel} </p>
                                                            <p className="ml-5 ">
                                                                <CloseIcon
                                                                    sx={{ color: 'green' }}
                                                                    className="h-7 cursor-pointer p-1"
                                                                    onClick={() => setExpLevel('Experience Level')}
                                                                />
                                                            </p>
                                                        </div>
                                                    )}
                                                    {jobType !== 'Job Type' && (
                                                        <div className="min-w-36 h-12 font-adW text-adS leading-adL bg-skillColor text-center flex px-7 pr-3 items-center rounded-[3.75rem]">
                                                            <p> {jobType} </p>

                                                            <p className="ml-5 ">
                                                                <CloseIcon
                                                                    sx={{ color: 'green' }}
                                                                    className="h-7 cursor-pointer p-1"
                                                                    onClick={() => setJobType(jobTypeData[0])}
                                                                />
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                                {/*  <div className="col-span-12 gap-2 justify-center hidden md:flex xl:justify-start">
                                                <AbC />
                                                <AbC />
                                                <AbC />
                                                <AbC />
                                            </div>*/}
                                            </div>
                                            <div className="col-span-12 grid grid-cols-12 gap-y-5 bg-textW pt-5 z-[0] rounded-t-xl ">
                                                <div className="col-span-12 grid grid-cols-12 gap-0f">
                                                    <JobImage id={jobDetails.employerId} className="col-span-2 sm:h-[5.8rem]" />
                                                    <div className="col-span-8 flex flex-col max-sm:pl-3 sm:pl-2 xl:pl-1">
                                                        {jobDetails.companyName && (
                                                            <p className="text-[12px] text-darkBlue sm:text-fhS xl:text-[1rem]">
                                                                {jobDetails.companyName}
                                                            </p>
                                                        )}
                                                        {jobDetails.jobTitle && (
                                                            <p className="text-darkBlue font-midRW text-midRS sm:font-fhW sm:text-dfvhS xl:text-[1.5rem]">
                                                                {jobDetails.jobTitle}
                                                            </p>
                                                        )}
                                                        {jobDetails.jobLocation && (
                                                            <p className="text-fadedText">
                                                                <PinDropOutlinedIcon sx={{ fontSize: '1.2rem', marginTop: '-0.2rem' }} />{' '}
                                                                {jobDetails.jobLocation}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="col-span-2 flex gap-x-5 text-lightGrey items-center">
                                                        <ShareOutlinedIcon className="text-[2rem] cursor-pointer" />
                                                        <BookmarkBorderOutlinedIcon
                                                            onClick={() => handleSaveJob(jobDetails.jobId)}
                                                            className="text-[2rem] cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-12 grid grid-cols-12 bg-forBack gap-x-1 gap-y-2 md:gap-x-2 md:p-2 xl:mx-2">
                                                    {(jobDetails.minSalary || jobDetails.maxSalary) && (
                                                        <JobCard
                                                            salary="Salary"
                                                            money={
                                                                !jobDetails.minSalary && jobDetails.maxSalary
                                                                    ? jobDetails.maxSalary
                                                                    : jobDetails.minSalary && !jobDetails.maxSalary
                                                                    ? jobDetails.maxSalary
                                                                    : jobDetails.minSalary + '-' + jobDetails.maxSalary
                                                            }
                                                            icon={
                                                                jobDetails.currency == 'euro' ? (
                                                                    <EuroIcon className="text-[18px] mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]" />
                                                                ) : jobDetails.currency == 'usd' ? (
                                                                    <AttachMoneyOutlined className="text-[18px] mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]" />
                                                                ) : jobDetails.currency == 'gpb' ? (
                                                                    <CurrencyPoundIcon className="text-[18px] mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]" />
                                                                ) : jobDetails.currency == 'rnp' ? (
                                                                    <CurrencyRupeeIcon className="text-[18px] mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]" />
                                                                ) : (
                                                                    <p>ETB</p>
                                                                )
                                                            }
                                                        />
                                                    )}
                                                    {/* {jobDetails.salaryRange && (
                                                        <JobCard
                                                            salary="Salary"
                                                            money={jobDetails.salaryRange}
                                                            icon={
                                                                <AttachMoneyOutlinedIcon className="text-[18px] mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]" />
                                                            }
                                                        />
                                                    )} */}
                                                    {jobDetails.jobType && (
                                                        <JobCard
                                                            salary="Job Type"
                                                            money={jobDetails.jobType}
                                                            icon={
                                                                <AccessTimeOutlinedIcon className="text-[18px] mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]" />
                                                            }
                                                        />
                                                    )}
                                                    {jobDetails.datePosted && (
                                                        <JobCard
                                                            salary="Posted Date"
                                                            money={new Date(jobDetails.datePosted)
                                                                .toLocaleDateString('en-GB')
                                                                .replace(/\//g, '-')}
                                                            icon={
                                                                <CalendarTodayOutlinedIcon className="text-[18px] mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]" />
                                                            }
                                                        />
                                                    )}
                                                    {jobDetails.applicationDeadline && (
                                                        <JobCard
                                                            salary="Deadline"
                                                            money={new Date(jobDetails.applicationDeadline)
                                                                .toLocaleDateString('en-GB')
                                                                .replace(/\//g, '-')}
                                                            icon={
                                                                <CalendarTodayOutlinedIcon className="text-[18px] mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]" />
                                                            }
                                                        />
                                                    )}
                                                </div>
                                                <div className="col-span-12 grid grid-cols-12 border-[1px] mx-3 rounded-full">
                                                    <div
                                                        className={
                                                            company == true
                                                                ? 'col-span-6 rounded-full rounded-3xl text-lightGrey text-bigS font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer'
                                                                : 'col-span-6 rounded-full bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW text-bigS font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer'
                                                        }
                                                        onClick={() => setCompany(false)}
                                                    >
                                                        Description
                                                    </div>

                                                    <div
                                                        className={
                                                            company == true
                                                                ? 'col-span-6 rounded-full bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW text-bigS font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer'
                                                                : 'col-span-6 rounded-full rounded-3xl text-lightGrey text-bigS font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer'
                                                        }
                                                        onClick={() => {
                                                            setCompany(true);
                                                        }}
                                                    >
                                                        Company
                                                    </div>
                                                </div>
                                                {!company && (
                                                    <div className="col-span-12 mx-3 flex flex-col">
                                                        <p className="font-thW text-frhS">Job Description</p>
                                                        <div
                                                            dangerouslySetInnerHTML={{ __html: jobDetails.jobDescription }}
                                                            className="text-midRS text-fadedText min-h-[200px] max-h-96 mb-16 overflow-y-auto hideScrollBar"
                                                        />
                                                        {jobDetails.externalLink ? (
                                                            <a
                                                                className="w-full mt-1 rounded-full bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW text-bigS font-bigW h-[4.5rem] flex items-center justify-center cursor-pointer "
                                                                href={jobDetails.externalLink}
                                                                target="_blank"
                                                            >
                                                                ApplyL
                                                            </a>
                                                        ) : jobDetails.emailApplication ? (
                                                            <div
                                                                onClick={() => handleEmailApply(jobDetails.emailApplication)}
                                                                className="w-full mt-1 rounded-full bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW text-bigS font-bigW h-[4.5rem] flex items-center justify-center cursor-pointer "
                                                            >
                                                                ApplyE
                                                            </div>
                                                        ) : (
                                                            <div
                                                                onClick={() => {
                                                                    handleApply(jobDetails.$id, jobDetails.employerId);
                                                                }}
                                                                className="w-full mt-1 rounded-full bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW text-bigS font-bigW h-[4.5rem] flex items-center justify-center cursor-pointer"
                                                            >
                                                                Apply
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                                {company && (
                                                    <div className="col-span-12 mx-3">
                                                        <p className="font-thW text-frhS">Company's Detail</p>
                                                        <div
                                                            dangerouslySetInnerHTML={{ __html: compnayDes }}
                                                            className="text-midRS text-fadedText max-h-96 overflow-y-auto hideScrollBar border-b-2 min-h-[200px] max-h-96 overflow-y-auto hideScrollBar"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-span-12 max-md:hidden xl:col-span-3 xl:pr-2">
                            {/*  <div className="flex justify-center items-center md:pt-10 xl:flex-col xl:text-center">
                            <div>
                                <p className="text-[1.5rem] font-shW leading-frhL text-gradientFirst">Upload your resume</p>
                                <p className="text-lightGrey">Let employers find you</p>
                            </div>
                            <img src={uploadResume} className="h-[20rem] self-center md:w-[14rem] md:h-[14rem]" />
                        </div> */}
                            <div className="flex justify-center items-center md:pt-10 xl:flex-col xl:text-center xl:mt-5 max-h-[20rem] pb-10 bg-textW rounded-xl">
                                <img src={profile} className="self-center w-[8rem] h-[8rem]" />
                                <div className=" px-5 flex flex-col gap-y-2 mt-2 xl:w-full">
                                    <p className="text-[1.5rem] font-fhW">John Doe</p>
                                    <p className="text-fadedText">Let employers find you</p>
                                    <button className="text-textW font-fhW bg-gradient-to-r from-gradientFirst to-gradientSecond  py-3 rounded-full mt-4 xl:w-2/3 self-center">
                                        Edit Your Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            pageCount > 1
                                ? openJobDetail
                                    ? 'col-span-3 flex justify-center items-center gap-x-3 mt-4 max-md:hidden'
                                    : 'col-span-3 flex justify-center items-center gap-x-3 mt-4'
                                : 'hidden'
                        }
                    >
                        <button
                            className={
                                maxPaginate >= 5 /* && pageCount > 5 */
                                    ? 'border bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-1 text-center'
                                    : 'hidden'
                            }
                            onClick={previousPage}
                        >
                            <ArrowBackIosIcon className="text-sm" />
                        </button>
                        {[...Array(pageCount)].map((_, index) => (
                            <button
                                key={index}
                                className={
                                    index < maxPaginate + 1 && index + 1 > minPaginate
                                        ? currentPage == index + 1
                                            ? 'bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-md px-3 py-1 mx-1 text-white'
                                            : 'hover:bg-gray-200 hover:border-gray-200 border border-gray-400 rounded-md px-3 py-1 mx-1'
                                        : 'hidden'
                                }
                                onClick={() => changePage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            className={maxPaginate < pageCount ? 'border bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-1 ' : 'hidden'}
                            onClick={nextPage}
                        >
                            <ArrowForwardIosIcon className="text-sm" />
                        </button>
                    </div>
                </div>

                <Footer />
            </div>
            {openFilter && (
                <ConfirmModal isOpen={openFilter} handleClose={() => setOpenfilter(!openFilter)}>
                    <div className="mx-2 pb-10 pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-10 md:pl-8 md:w-2/3 lg:w-1/2 md:mx-0">
                        <div className="col-span-12 grid grid-cols-12">
                            <div className="col-span-12 grid grid-cols-12">
                                <p className="font-thW text-frhS leading-shL text-modalTitle col-span-10 md:col-span-11">
                                    <TuneIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem', fontSize: '2rem' }} /> Filter
                                </p>
                                <div className="col-span-2 md:col-span-1 grid pr-2 justify-items-end md:justify-items-center">
                                    <button onClick={() => setOpenfilter(!openFilter)}>
                                        <CloseIcon
                                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                            className="w-8 h-8 p-2 "
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 flex flex-col gap-y-2 pt-3">
                            {/*<p className="text-neutral-700 text-xl font-medium leading-7">Sort By</p>
                             <div className="flex gap-x-4 flex-wrap gap-y-3">
                                <RadioInput radioName="sortBy" radioText="Best Match" radioValue="Best Match" setFunction={setSortBy} />
                                <RadioInput radioName="sortBy" radioText="Featured" radioValue="Featured" setFunction={setSortBy} />
                                <RadioInput radioName="sortBy" radioText="Most Recent" radioValue="Most Recent" setFunction={setSortBy} />
                            </div> */}
                            <p className="text-neutral-700 text-xl font-medium leading-7 mt-3 mb-1">Date Posted</p>
                            <div className="flex gap-x-4 flex-wrap gap-y-3">
                                <RadioInput radioName="datePosted" radioText="Any time" radioValue="Any time" setFunction={setDatePosted} />
                                <RadioInput
                                    radioName="datePosted"
                                    radioText="Past 24hrs"
                                    radioValue="Past 24hrs"
                                    setFunction={setDatePosted}
                                />
                                <RadioInput
                                    radioName="datePosted"
                                    radioText="Past week"
                                    radioValue="Past weeek"
                                    setFunction={setDatePosted}
                                />
                                <RadioInput
                                    radioName="datePosted"
                                    radioText="Past month"
                                    radioValue="Past month"
                                    setFunction={setDatePosted}
                                />
                            </div>
                            <p className="text-neutral-700 text-xl font-medium leading-7 mt-3 mb-1">Year of Experience</p>
                            <div className="flex gap-x-4 flex-wrap gap-y-3">
                                <RadioInput radioName="expLevel" radioText="0-2 years" radioValue="0-2 years" setFunction={setExpLevel} />
                                <RadioInput radioName="expLevel" radioText="3-5 years" radioValue="3-5 years" setFunction={setExpLevel} />
                                <RadioInput radioName="expLevel" radioText="5-7 years" radioValue="5-7 years" setFunction={setExpLevel} />
                                <RadioInput radioName="expLevel" radioText="8-10 years" radioValue="8-10 years" setFunction={setExpLevel} />
                                <RadioInput radioName="expLevel" radioText="10+ years" radioValue="10+ years" setFunction={setExpLevel} />
                            </div>
                            <p className="text-neutral-700 text-xl font-medium leading-7 mt-3 mb-1">Job Type</p>
                            <div className="flex gap-x-4 flex-wrap gap-y-3">
                                <RadioInput
                                    radioName="jobType"
                                    /*                                     check={checked}
                                     */ radioText="Internship"
                                    radioValue="Internship"
                                    setFunction={setJobType}
                                />
                                <RadioInput
                                    radioName="jobType"
                                    /*                                     check={checked}
                                     */ radioText="Full Time"
                                    radioValue="Full Time"
                                    setFunction={setJobType}
                                />
                                <RadioInput
                                    radioName="jobType"
                                    /*                                     check={checked}
                                     */ radioText="Part Time"
                                    radioValue="Part Time"
                                    setFunction={setJobType}
                                />
                                <RadioInput
                                    radioName="jobType"
                                    /*                                     check={checked}
                                     */ radioText="Remote"
                                    radioValue="Remote"
                                    setFunction={setJobType}
                                />
                                <RadioInput
                                    radioName="jobType"
                                    /*                                     check={checked}
                                     */ radioText="Contract"
                                    radioValue="Contract"
                                    setFunction={setJobType}
                                />
                            </div>
                        </div>
                        <div className=" flex gap-x-7 items-end justify-items-end mt-10 col-span-11 md:col-start-3 md:col-end-12 xl:col-start-5 xl:col-end-12">
                            <div
                                onClick={handleReset}
                                className="w-full rounded-full cursor-pointer text-fadedText border-2 flex  h-[3.5rem] items-center justify-center"
                            >
                                Reset
                            </div>
                            <div
                                onClick={() => {
                                    setOpenfilter(false);
                                }}
                                className="w-full bg-gradient-to-r cursor-pointer from-gradientFirst to-gradientSecond rounded-full text-textW h-[3.5rem] flex items-center justify-center"
                            >
                                Find Result
                            </div>
                        </div>
                    </div>
                </ConfirmModal>
            )}
            {apply && <ApplyToJob jobId={applyJobId} employerId={applyEmployerId} setterFunction={setApply} />}
        </>
    );
};
export default Jobs;
