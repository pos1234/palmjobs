import Navigation from '@/components/Navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import PinDropOutlined from '@mui/icons-material/PinDropOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { fetchSinglePostedJobs, getAccount, getCompanyData, getRole } from '@/lib/services';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AttachMoneyOutlined from '@mui/icons-material/AttachMoneyOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import JobImage from '@/components/JobImage';
import ApplyToJob from '@/components/candidateProfileComponents/ApplyToJobs';
import EuroIcon from '@mui/icons-material/Euro';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
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
const singleJob = () => {
    const router = useRouter();
    const [location, setLocation] = useState(false);
    const [category, setCategory] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [address, setAddress] = useState('');
    const [company, setCompany] = useState(false);
    const [compnayDes, setCompanyDes] = useState('');
    const [employerId, setEmployerId] = useState('');
    const [apply, setApply] = useState(false);
    const [applyJobId, setApplyJobId] = useState('');
    const [applyEmployerId, setApplyEmployerId] = useState('');
    const [jobDetails, setJobDetails] = useState<any>();
    const handleSearch = () => {
        router.push({
            pathname: '/jobs',
            query: { param1: searchText, param2: address }
        });
    };
    useEffect(() => {
        if (Object.keys(router.query).length > 0) {
            const { id } = router.query;
            if (id) {
                fetchSinglePostedJobs(id.toString()).then((res) => {
                    setJobDetails(res.documents[0]);
                });
            }
        }
    }, [router]);
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
    const handleEmailApply = (email: string) => {
        const subject = 'Your subject line';
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
        window.location.href = mailtoLink;
    };
    return (
        <div className="px-16 pb-20">
            <Navigation />
            <div className="grid grid-cols-12 gap-y-4 max-sm:px-5 max-sm:pt-10 border-b-2 sm:space-x-5 md:space-x-2 lg:space-x-5 lg:px-10 xl:px-40 py-10">
                <div className="col-span-12 rounded-2xl bg-[#F8F8F8] grid grid-cols-12 sm:h-16  sm:col-span-6 md:col-span-6 lg:col-span-4">
                    <div className="col-span-2 flex items-center justify-center text-gray-500">
                        <PersonSearchOutlinedIcon />
                    </div>
                    <div className="col-span-10 flex items-center pr-2">
                        <input
                            onChange={(e) => setSearchText(e.currentTarget.value)}
                            type="text"
                            placeholder="What are you looking for?"
                            className="h-20 pl-3 focus:ring-0 border-0 w-full bg-[#F8F8F8] sm:h-[90%]"
                        />
                    </div>
                </div>
                <div className="col-span-12 rounded-2xl bg-[#F8F8F8] grid grid-cols-12 sm:h-16  sm:col-span-6 md:col-span-6 lg:col-span-4">
                    <div className="col-span-2 flex items-center justify-center text-gray-500">
                        <PinDropOutlined />
                    </div>
                    <div className="col-span-10 flex items-center pr-2">
                        <input
                            onChange={(e) => setAddress(e.currentTarget.value)}
                            type="text"
                            placeholder="Remote"
                            className="h-20 pl-3 focus:ring-0 border-0 w-full bg-[#F8F8F8] sm:h-[90%]"
                        />
                    </div>
                </div>

                <button
                    onClick={handleSearch}
                    className="text-shS col-span-12 rounded-2xl sm:col-start-4 h-20 max-sm:mx-5 sm:col-end-10 sm:max-lg:mt-5 sm:h-20 md:h-16 lg:col-span-3 text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond"
                >
                    <SearchOutlinedIcon sx={{ fontSize: '1.5rem', marginRight: '0.2rem' }} /> Search
                </button>
            </div>
            {jobDetails && (
                <div className="grid grid-cols-12 gap-y-5 bg-textW pt-5 rounded-t-xl px-10 md:px-20 lg:px-48 xl:px-80">
                    <div className="col-span-12 grid grid-cols-12 gap-0f">
                        <JobImage id={jobDetails.employerId} className="col-span-2 sm:h-[5.8rem]" />
                        <div className="col-span-8 flex flex-col max-sm:pl-3 sm:pl-2 xl:pl-1">
                            {jobDetails.companyName && (
                                <p className="text-[12px] text-darkBlue sm:text-fhS xl:text-[1rem]">{jobDetails.companyName}</p>
                            )}
                            {jobDetails.jobTitle && (
                                <p className="text-darkBlue font-midRW text-midRS sm:font-fhW sm:text-dfvhS xl:text-[1.5rem]">
                                    {jobDetails.jobTitle}
                                </p>
                            )}
                            {jobDetails.jobLocation && (
                                <p className="text-fadedText">
                                    <PinDropOutlinedIcon sx={{ fontSize: '1.2rem', marginTop: '-0.2rem' }} /> {jobDetails.jobLocation}
                                </p>
                            )}
                        </div>
                        <div className="col-span-2 flex gap-x-5 text-lightGrey items-center">
                            <ShareOutlinedIcon className="text-[2rem] cursor-pointer" />
                            <BookmarkBorderOutlinedIcon
                                /*                                         onClick={() => handleSaveJob(jobDetails.jobId)}
                                 */ className="text-[2rem] cursor-pointer"
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
                                money={new Date(jobDetails.datePosted).toLocaleDateString('en-GB').replace(/\//g, '-')}
                                icon={
                                    <CalendarTodayOutlinedIcon className="text-[18px] mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]" />
                                }
                            />
                        )}
                        {jobDetails.applicationDeadline && (
                            <JobCard
                                salary="Deadline"
                                money={new Date(jobDetails.applicationDeadline).toLocaleDateString('en-GB').replace(/\//g, '-')}
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
                                className="text-midRS text-fadedText min-h-[200px] max-h-96 mb-3 overflow-y-auto hideScrollBar"
                            />
                            {jobDetails.externalLink ? (
                                <a
                                    className="w-full mt-1 rounded-full bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW text-bigS font-bigW h-[4.5rem] flex items-center justify-center cursor-pointer"
                                    href={jobDetails.externalLink}
                                    target="_blank"
                                >
                                    Apply
                                </a>
                            ) : jobDetails.emailApplication ? (
                                <div
                                    onClick={() => handleEmailApply(jobDetails.emailApplication)}
                                    className="w-full mt-1 rounded-full bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW text-bigS font-bigW h-[4.5rem] flex items-center justify-center cursor-pointer "
                                >
                                    Apply
                                </div>
                            ) : (
                                <div
                                    onClick={() => {
                                        handleApply(jobDetails.$id, jobDetails.employerId);
                                    }}
                                    className="w-full mt-1 rounded-full bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW text-bigS font-bigW h-[4.5rem] flex items-center justify-center cursor-pointer "
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
            )}
            {apply && <ApplyToJob jobId={applyJobId} employerId={applyEmployerId} setterFunction={setApply} />}
        </div>
    );
};

export default singleJob;
