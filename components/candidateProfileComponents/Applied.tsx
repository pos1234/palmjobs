import { fetchAppliedJobsData, getAppliedJobId, fetchAppliedJobIds, removeAppliedJobs, accountData, getCompanyData } from '@/lib/services';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { useEffect, useState } from 'react';
import JobImage from '../JobImage';
import Link from 'next/link';
const CompanyName = (props: any) => {
    const [compData, setCompData] = useState<any>();
    const getCompData = () => {
        getCompanyData(props.id).then((res) => {
            res && res.documents && setCompData(res.documents[0]);
        });
    };
    useEffect(() => {
        getCompData();
    }, []);
    return <>{compData && <p className="text-[12px] text-darkBlue sm:text-fhS">{compData.companyName}</p>}</>;
};
const Applied = (props: any) => {
    const profile = '/images/profile.svg';
    const [appliedJobId, setAppliedJobId] = useState<any[]>([]);
    const [appliedJobs, setAppliedJobs] = useState<any[]>([]);
    const [appliedJobData, setAppliedData] = useState<any[]>([]);
    const [allLoading, setAllLoading] = useState(false);
    const appliedJobsId = async () => {
        setAllLoading(true);
        const res = await fetchAppliedJobIds();
        res && res.total == 0 && setAllLoading(false);
        if (res) {
            for (let i = 0; i < res.documents.length; i++) {
                if (appliedJobId.indexOf(res.documents[i].jobId) === -1) {
                    appliedJobId.push(res.documents[i].jobId);
                    if (res.documents[i].jobId) {
                        const responseData = await fetchAppliedJobsData(res.documents[i].jobId);
                        if (responseData) {
                            appliedJobs.push(responseData);
                            setAllLoading(false);
                        }
                    }
                }
            }
        }
    };
    useEffect(() => {
        appliedJobsId();
    }, [appliedJobs, appliedJobId]);
    return (
        <>
            {!allLoading && appliedJobs.length == 0 && props.view && (
                <div className="col-span-12 text-center flex flex-col items-center gap-y-3">
                    <p>No applied jobs under your palm tree yet. Browse the listings to find your next opportunity.</p>
                    <Link
                        href="/jobs"
                        className="w-60 bg-gradient-to-r from-gradientFirst to-gradientSecond px-10 py-5 rounded-full text-textW cursor-pointer"
                    >
                        Find Job
                    </Link>
                </div>
            )}
            {appliedJobs &&
                appliedJobs.map((datas: any, index) => {
                    return (
                        <div className={props.view ? 'col-span-12 grid grid-cols-12 py-3 bg-textW' : 'hidden'} key={index}>
                            <JobImage id={datas.employerId} className="hidden md:col-span-2 md:block lg:col-span-1" />
                            <div className="col-span-12 pl-5 grid grid-cols-12 md:col-span-10 lg:col-span-8">
                                <JobImage id={datas.employerId} className="col-span-2 h-full md:hidden" />
                                <div className="col-span-10 pl-1">
                                    <CompanyName id={datas.employerId} />
                                    <p className="text-darkBlue font-midRW text-midRS sm:font-fhW sm:text-frhS">{datas.jobTitle}</p>
                                    <p className="text-fadedText rounded-full md:hidden">
                                        <PinDropOutlinedIcon sx={{ fontSize: '1.2rem', marginTop: '-0.2rem' }} /> {datas.jobLocation}
                                    </p>
                                </div>
                                <ul className="mt-5 text-[11px] flex gap-x-3 col-span-12 md:text-[0.8rem] md:mt-1 md:gap-x-5">
                                    <li className="hidden md:bg-textW md:text-fadedText md:flex md:p-0">
                                        <PinDropOutlinedIcon className="text-[0.9rem] -mt-0.5 mr-1 md:text-[1.2rem]" /> {datas.jobLocation}
                                    </li>
                                    <li className="inline bg-lightGreen text-green-800 rounded-full p-2 px-3 md:bg-textW md:text-fadedText md:p-0">
                                        <AccessTimeOutlinedIcon className="text-[0.9rem] -mt-0.5 mr-1  md:text-[1.2rem]" />
                                        {datas.jobType}
                                    </li>
                                    <li className="inline bg-lightGreen text-green-800 rounded-full p-2 px-3 md:bg-textW md:text-fadedText md:p-0">
                                        <AttachMoneyOutlinedIcon className="text-[0.9rem] -mt-0.5 mr-1 md:text-[1.2rem] " />
                                        {datas.salaryRange}
                                    </li>
                                    <li className="inline bg-lightGreen text-green-800 rounded-full p-2 px-4 md:bg-textW md:text-fadedText md:p-0">
                                        <CalendarTodayOutlinedIcon className="text-[0.9rem] -mt-0.5 mr-1 md:text-[1.2rem] " /> 29 min ago
                                    </li>
                                </ul>
                                <div
                                    className="col-span-12 text-fhS text-darkBlue leading-[24px]  text-fadedText my-5 md:my-0 md:mt-2 md:text-darkBlue"
                                    dangerouslySetInnerHTML={{ __html: datas.jobDescription }}
                                />
                            </div>
                        </div>
                    );
                })}
        </>
    );
};
export default Applied;
