import Navigation from '@/components/Navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getAccount, getRole } from '@/backend/accountBackend';
import { fetchSinglePostedJobs, getCompanyData, } from '@/backend/employerBackend';
import JobImage from '@/components/JobImage';
import ApplyToJob from '@/components/candidateProfileComponents/ApplyToJobs';
import Footer from '@/components/Footer';
import Head from 'next/head';
import JobDetail from '@/components/job/JobDetail';
import SearchBar from '@/components/job/SearchBar';
const singleJob = () => {
    const router = useRouter();
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
