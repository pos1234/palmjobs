import Navigation from '@/components/Navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import PinDropOutlined from '@mui/icons-material/PinDropOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { getAccount } from '@/backend/accountBackend';
import { getRole } from '@/backend/candidateBackend';
import { fetchSinglePostedJobs, getCompanyData, } from '@/backend/employerBackend';
import JobImage from '@/components/JobImage';
import ApplyToJob from '@/components/candidateProfileComponents/ApplyToJobs';
import EuroIcon from '@mui/icons-material/Euro';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Share from '@/components/Share';
import Footer from '@/components/Footer';
import Head from 'next/head';
import LaunchIcon from '@mui/icons-material/Launch';
import JobDetail from '@/components/job/JobDetail';
import SearchBar from '@/components/job/SearchBar';
const singleJob = () => {
    const router = useRouter();
    const [location, setLocation] = useState(false);
    const [category, setCategory] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [address, setAddress] = useState('');
    const [company, setCompany] = useState(false);
    const [companyData, setCompanyData] = useState<any>();
    const [employerId, setEmployerId] = useState('');
    const [apply, setApply] = useState(false);
    const [applyJobId, setApplyJobId] = useState('');
    const [applyEmployerId, setApplyEmployerId] = useState('');
    const [jobDetails, setJobDetails] = useState<any>();
    const [openShare, setOpenShare] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [accountId, setAccountId] = useState('')
    const handleSearch = () => {
        typeof window !== 'undefined' && router.push({
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
                    setEmployerId(res.documents[0].employerId);
                });
            }
        }
    }, [router]);
    const userId = async () => {
        const accountInfo = await getAccount();
        if (accountInfo !== 'failed') {
            setAccountId(accountInfo.$id)
            /* const role = await getRole(accountInfo.$id);
            if (role.documents[0].userRole == 'candidate') {
                setApply(true);
                setApplyEmployerId(employerId);
            } */
        }
    }
    useEffect(() => {
        const documents = getCompanyData(employerId);
        documents.then(async (res) => {
            if (res.documents && res.documents[0] && res.documents[0]) {
                setCompanyData(res.documents[0]);
                setCompanyName(res.documents[0].companyName);
            } else {
                setCompanyName('');
            }
        });
        userId()
    }, [employerId]);
    const handleApply = async (jobId: string, employerId: string, compName: string, jobTitle: string) => {
        setApply(false);
        const accountInfo = await getAccount();
        if (accountInfo !== 'failed') {
            const role = await getRole();
            if (role && role.documents[0].userRole == 'candidate') {
                setApply(true);
                setApplyJobId(jobId);
                setApplyEmployerId(employerId);
                setJobTitle(jobTitle);
            }
        }
        if (accountInfo == 'failed') {
            typeof window !== 'undefined' && router.push('/account');
        }
    };
    const handleEmailApply = (email: string) => {
        const subject = 'Your subject line';
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
        window.location.href = mailtoLink;
    };
    const sanitizeHTML = (text: string) => {
        return text.replace(/<[^>]*>/g, '');
    };
    const structuredData = jobDetails
        ? `{
        "@context": "http://schema.org",
        "@type": "JobPosting",
        "title": "${jobDetails && jobDetails.jobTitle}" ,
        "hiringOrganization": {
          "@type":"Organization",
          "name":"${companyName && companyName}",
          "logo": "${<JobImage id={jobDetails.employerId} className="col-span-2 sm:h-[5.8rem]" /> ||
        'https://www.yes.et/jobs/wp-content/uploads/wp-job-board-pro-uploads/_employer_featured_image/2023/01/YES_logo-150x150.png'
        }"
        },
        "jobLocation": {
          "@type": "Place",
          "address": "${jobDetails && jobDetails.jobLocation}"
        },
        "datePosted": "${jobDetails && new Date(jobDetails.datePosted).toLocaleDateString('en-GB').replace(/\//g, '-')}",
        "description": "${jobDetails && sanitizeHTML(jobDetails.jobDescription)}",
        "employmentType":"${jobDetails && jobDetails.jobType}"
       }`
        : null;
    return (
        <div className="flex flex-col gap-10">
            <Head>
                <script
                    key="structured-data"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData)
                    }}
                />
            </Head>
            <Navigation />
            {/*   <div className="grid grid-cols-12 gap-y-4 max-sm:px-5 max-sm:pt-10 border-b-0 sm:space-x-5 md:space-x-2 lg:space-x-5 lg:px-10 xl:px-40 py-10">
                <div className="col-span-12 rounded-2xl bg-[#F8F8F8] grid grid-cols-12 sm:h-16  sm:col-span-6 md:col-span-6 lg:col-span-4">
                    <div className="col-span-2 flex items-center justify-center text-gray-500">
                        <PersonSearchOutlinedIcon />
                    </div>
                    <div className="col-span-10 flex items-center pr-2">
                        <input
                            onChange={(e) => setSearchText(e.currentTarget.value)}
                            type="text"
                            placeholder="What"
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
                            placeholder="Where"
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
            </div> */}
            <div className="px-3 pb-20 xl:px-40 flex flex-col gap-10">
                {jobDetails && (
                    <div className='w-full md:w-1/2 md:m-auto flex flex-col gap-8'>
                        <SearchBar
                            searchWord={searchText}
                            setSearchWord={setSearchText}
                            addressHolder={address}
                            setAddressHolder={setAddress}
                            setTheSearchTerm={handleSearch}
                            single={true}
                        />
                        <JobDetail
                            openJobDetail={true}
                            jobDetails={jobDetails}
                            companyName={companyName}
                            company={company}
                            setCompany={setCompany}
                            companyData={companyData}
                            single={true}
                        />
                    </div>
                    /*  <div className="grid grid-cols-12 gap-y-5 bg-textW pt-5 rounded-t-xl px-3 sm:px-10 md:px-20 lg:px-48 xl:px-80">
                         <div className="col-span-12 grid grid-cols-12 gap-0f">
                             <JobImage id={jobDetails.employerId} className="col-span-2 sm:h-[5.8rem]" />
                             <div className="col-span-8 flex flex-col max-sm:pl-3 sm:pl-2 xl:pl-1">
                                 {companyName && <p className="text-[12px] text-darkBlue sm:text-fhS xl:text-[1rem]">{companyName}</p>}
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
                             <div className="col-span-2 flex gap-x-2 text-lightGrey items-center md:gap-x-5">
                                 <ShareOutlinedIcon
                                     sx={{ fontSize: '1.5rem' }}
                                     onClick={() => setOpenShare(true)}
                                     className="md:text-[2rem] cursor-pointer"
                                 />
                                 <Share openShare={openShare} setOpenShare={setOpenShare} link={jobDetails.$id} />
                                 <BookmarkBorderOutlinedIcon
                                     sx={{ fontSize: '1.5rem' }}
                                                                              onClick={() => handleSaveJob(jobDetails.jobId)}
                                       className="cursor-pointer md:text-[2rem]"
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
                                                 ? jobDetails.minSalary
                                                 : jobDetails.minSalary + '-' + jobDetails.maxSalary
                                     }
                                     icon={
                                         jobDetails.currency == 'euro' ? (
                                             <EuroIcon
                                                 sx={{ fontSize: '1.125rem' }}
                                                 className=" mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]"
                                             />
                                         ) : jobDetails.currency == 'usd' ? (
                                             <AttachMoneyOutlined
                                                 sx={{ fontSize: '1.125rem' }}
                                                 className=" mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]"
                                             />
                                         ) : jobDetails.currency == 'gpb' ? (
                                             <CurrencyPoundIcon
                                                 sx={{ fontSize: '1.125rem' }}
                                                 className=" mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]"
                                             />
                                         ) : jobDetails.currency == 'rnp' ? (
                                             <CurrencyRupeeIcon
                                                 sx={{ fontSize: '1.125rem' }}
                                                 className=" mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]"
                                             />
                                         ) : (
                                             <span className="mr-2">ETB</span>
                                         )
                                     }
                                 />
                             )}
                             {jobDetails.jobType && (
                                 <JobCard
                                     salary="Job Type"
                                     money={jobDetails.jobType}
                                     icon={
                                         <AccessTimeOutlinedIcon
                                             sx={{ fontSize: '1.125rem' }}
                                             className="text-[18px] mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]"
                                         />
                                     }
                                 />
                             )}
                             {jobDetails.datePosted && (
                                 <JobCard
                                     salary="Posted Date"
                                     money={new Date(jobDetails.datePosted).toLocaleDateString('en-GB').replace(/\//g, '-')}
                                     icon={
                                         <CalendarTodayOutlinedIcon
                                             sx={{ fontSize: '1.125rem' }}
                                             className="text-[18px] mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]"
                                         />
                                     }
                                 />
                             )}
                             {jobDetails.applicationDeadline && (
                                 <JobCard
                                     salary="Closing Date"
                                     money={new Date(jobDetails.applicationDeadline).toLocaleDateString('en-GB').replace(/\//g, '-')}
                                     icon={
                                         <CalendarTodayOutlinedIcon
                                             sx={{ fontSize: '1.125rem' }}
                                             className="text-[18px] mt-[0.2rem] mr-1 sm:mt-0.5 sm:max-md:text-[13px] md:text-[15px]"
                                         />
                                     }
                                 />
                             )}
                         </div>
                         <div className="col-span-12 grid grid-cols-12 border-[1px] mx-3 rounded-full">
                             <div
                                 className={
                                     company == true
                                         ? 'col-span-6 rounded-full rounded-3xl text-lightGrey  font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer md:text-bigS'
                                         : 'col-span-6 rounded-full bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer md:text-bigS'
                                 }
                                 onClick={() => setCompany(false)}
                             >
                                 Job Description
                             </div>
     
                             <div
                                 className={
                                     company == true
                                         ? 'col-span-6 rounded-full bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer md:text-bigS'
                                         : 'col-span-6 rounded-full rounded-3xl text-lightGrey font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer md:text-bigS'
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
                                 <div
                                     dangerouslySetInnerHTML={{ __html: jobDetails.jobDescription }}
                                     className="text-midRS text-lightGrey min-h-[200px] max-h-96 mb-3 overflow-y-auto hideScrollBar"
                                 />
                                 {employerId !== accountId && <>
     
     
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
                                                 handleApply(jobDetails.$id, jobDetails.employerId, companyName, jobDetails.jobTitle);
                                             }}
                                             className="w-full mt-1 rounded-full bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW text-bigS font-bigW h-[4.5rem] flex items-center justify-center cursor-pointer "
                                         >
                                             Apply
                                         </div>
                                     )}</>}
                             </div>
                         )}
                         {company && (
                             <div className="col-span-12 mx-3">
                                 <p className="font-thW text-frhS">Company's Overview</p>
                                 <div className='flex gap-3 my-5 flex-wrap justify-between border-b-2 pb-5'>
                                     <div className='flex flex-col gap-y-5'>
                                         {
                                             companyData.sector && <div className='flex gap-5 '>
                                                 <p className='font-bold text-lightGrey text-md'>Sector</p>
                                                 <p className='text-lightGrey'>{companyData.sector}</p>
                                             </div>
                                         }
                                         {
                                             companyData.location && <div className='flex gap-5 '>
                                                 <p className='font-bold text-lightGrey text-md'>location</p>
                                                 <p className='text-lightGrey'>{companyData.location}</p>
                                             </div>
                                         }
                                     </div>
                                     <div className='flex flex-col gap-y-5'>
                                         {
                                             companyData.noOfEmployee && <div className='flex gap-5 '>
                                                 <p className='font-bold text-lightGrey text-md'>Size</p>
                                                 <p className='text-lightGrey'>{companyData.noOfEmployee}</p>
                                             </div>
                                         }
                                         {
                                             companyData.websiteLink && <div className='flex gap-5 '>
                                                 <p className='font-bold text-lightGrey text-md'>Website</p>
                                                 <a className='text-lightGrey' href={companyData.websiteLink} target='_blank'>view <LaunchIcon /></a>
                                             </div>
                                         }</div>
                                 </div>
                                 <div
                                     dangerouslySetInnerHTML={{ __html: companyData.description }}
                                     className="text-midRS text-lightGrey max-h-96 overflow-y-auto hideScrollBar border-b-2 min-h-[200px] max-h-96 overflow-y-auto hideScrollBar"
                                 />
                             </div>
                         )}
                     </div> */
                )}
                {apply && (
                    <ApplyToJob
                        jobId={applyJobId}
                        employerId={applyEmployerId}
                        setterFunction={setApply}
                        jobTitle={jobTitle}
                        companyName={companyName}
                    />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default singleJob;
