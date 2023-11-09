import { fetchAppliedJobsData, fetchAppliedJobIds, getCompanyData } from '@/lib/candidateBackend';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { useEffect, useState } from 'react';
import JobImage from '../JobImage';
import Link from 'next/link';
import AttachMoneyOutlined from '@mui/icons-material/AttachMoneyOutlined';
import EuroIcon from '@mui/icons-material/Euro';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
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
const SmallLists = (props: any) => {
    return <li className="inline bg-[#FAFAFA] text-xs text-gradientFirst rounded-md p-2 px-3 sm:px-2 sm:py-1 md:max-lg:px-1.5 md:max-lg:py-2 xl:py-2">
        {props.icon}
        <span className='text-[#20262E]'>{props.items}</span>
    </li>
}
const ReturnName = (props: any) => {
    const [companyName, setCompanyName] = useState('');
    const documents = getCompanyData(props.id);
    documents.then(async (res) => {
        if (res.documents && res.documents[0] && res.documents[0].description) {
            setCompanyName(res.documents[0].companyName);
        } else {
            setCompanyName('');
        }
    });
    return <div className="text-[13px] text-darkBlue sm:text-[1.5rem] md:text-[0.9rem] xl:text-[0.9rem]">{companyName}</div> || null;
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
                    return (<div key={datas.$id} className={props.view ? 'cursor-pointer max-h-[18rem] bg-textW flex items-between flex-wrap justify-between py-3 px-4 rounded-3xl border-2 rounded-xl xl:px-7 xl:py-7 ' : 'hidden'}>
                        <div>
                            <div className='w-full flex justify-between flex-wrap gap-2'>
                                <div className='flex items-center gap-3'>
                                    <JobImage id={datas.employerId} className=" rounded-full h-12 w-12" />
                                    <ReturnName id={datas.employerId} />
                                </div>
                                <div className="w-full flex flex-col justify-center">
                                    {datas.jobTitle && (
                                        <p className="font-bold text-[1rem] sm:font-fhW sm:text-[2rem] md:text-[1.2rem] xl:text-[1.5rem]">
                                            {datas.jobTitle}
                                        </p>
                                    )}
                                    {datas.jobLocation && (
                                        <p className="text-fadedText max-sm:text-[14px] flex items-center gap-2">
                                            <PinDropOutlinedIcon sx={{ fontSize: '1.2rem' }} />
                                            {datas.jobLocation}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="w-full mt-4">
                                <ul className="text-[10px] flex gap-y-2 gap-x-1 col-span-12  md:text-[11px] md:gap-x-1 md:mt-1 md:text-[0.55rem] lg:text-[0.8rem] lg:gap-x-3 xl:text-[0.6rem] xl:gap-x-1 justify-between flex-wrap">
                                    {datas.jobType &&
                                        <SmallLists icon={<BusinessCenterIcon
                                            sx={{ fontSize: '1rem' }}
                                            className="-mt-0.5 mr-1 " />}
                                            items={datas.jobType} />
                                    }
                                    {(datas.minSalary || datas.maxSalary) && (
                                        <SmallLists icon={datas.currency == 'euro' ? (
                                            <EuroIcon
                                                sx={{ fontSize: '1rem' }}
                                                className="-mt-0.5 mr-1"
                                            />
                                        ) : datas.currency == 'usd' ? (
                                            <AttachMoneyOutlined
                                                sx={{ fontSize: '1rem' }}
                                                className="-mt-0.5 mr-1"
                                            />
                                        ) : datas.currency == 'gpb' ? (
                                            <CurrencyPoundIcon
                                                sx={{ fontSize: '1rem' }}
                                                className="-mt-0.5 mr-1"
                                            />
                                        ) : datas.currency == 'rnp' ? (
                                            <CurrencyRupeeIcon
                                                sx={{ fontSize: '1rem' }}
                                                className="-mt-0.5 mr-1"
                                            />
                                        ) : (
                                            <span className="text-[7px] mr-1">ETB</span>
                                        )}
                                            items={!datas.minSalary && datas.maxSalary
                                                ? datas.maxSalary
                                                : datas.minSalary && !datas.maxSalary
                                                    ? datas.minSalary
                                                    : datas.minSalary + '-' + datas.maxSalary}
                                        />
                                    )}
                                    {datas.datePosted && (
                                        <SmallLists
                                            icon={<HourglassTopIcon
                                                sx={{ fontSize: '1rem' }}
                                                className="-mt-0.5 mr-1 "
                                            />}
                                            items={new Date(datas.datePosted)
                                                .toLocaleDateString('en-GB')
                                                .replace(/\//g, '-')}
                                        />
                                    )}
                                    {datas.datePosted && (
                                        <SmallLists
                                            icon={<HourglassTopIcon
                                                sx={{ fontSize: '1rem' }}
                                                className="-mt-0.5 mr-1 "
                                            />}
                                            items={new Date(datas.datePosted)
                                                .toLocaleDateString('en-GB')
                                                .replace(/\//g, '-')}
                                        />
                                    )}
                                </ul>
                            </div>
                        </div>
                        {/* <div className='flex gap-5'>
                            <div className='flex text-gradientFirst pt-3' onClick={() => {
                                removeSave(datas.$id);
                            }}>
                                <BookmarkIcon sx={{ fontSize: '2rem' }}
                                />
                            </div>
                            <button className='bg-gradientFirst text-textW px-20 py-3 h-14 cursor-pointer rounded-lg' onClick={() => {
                                setApply(true);
                                setJobId(datas.$id);
                                setEmployerId(datas.employerId);
                                setJobTitle(datas.jobTitle);
                                setCompanyName(datas.companyName);
                            }}>Apply</button>
                            <div className='flex pt-3'>
                                <ShareIcon />
                            </div>

                        </div> */}
                    </div>);
                })}
           {/*  {appliedJobs &&
                appliedJobs.map((datas: any, index) => {
                    return (
                        <div className={props.view ? 'col-span-12 grid grid-cols-12 py-3 bg-textW' : 'hidden'} key={index}>
                            <JobImage id={datas.employerId} className="hidden md:col-span-2 md:block lg:col-span-1" />
                            <div className="col-span-12 pl-5 grid grid-cols-12 md:col-span-10 lg:col-span-8">
                                <JobImage id={datas.employerId} className="col-span-2 h-full md:hidden" />
                                <div className="col-span-10 pl-1">
                                    <CompanyName id={datas.employerId} />
                                    <Link href={`/jobs/${datas.$id}`} target="_blank" className="text-darkBlue font-midRW text-midRS sm:font-fhW sm:text-frhS">{datas.jobTitle}</Link>
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

                                    <li className="inline bg-lightGreen text-green-800 rounded-full p-2 px-4 md:bg-textW md:text-fadedText md:p-0">
                                        <CalendarTodayOutlinedIcon className="text-[0.9rem] -mt-0.5 mr-1 md:text-[1.2rem] " />{' '}
                                        {new Date(datas.datePosted).toLocaleDateString('en-GB').replace(/\//g, '-')}
                                    </li>
                                </ul>

                            </div>
                        </div>
                    );
                })} */}
        </>
    );
};
export default Applied;
