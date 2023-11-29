import { fetchAppliedJobsData, fetchAppliedJobIds, getCompanyData } from '@/backend/candidateBackend';
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
import { SmallLists } from '../TextInput';

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
                <div className="col-span-12 text-center flex flex-col items-center gap-y-8">
                    <p>No applied jobs under your palm tree yet. Browse the listings to find your next opportunity.</p>
                    <Link
                        href="/jobs"
                        className="w-60 bg-black text-textW h-14 rounded-[3px] flex justify-center items-center text-textW cursor-pointer hover:border-b-4 hover:border-b-gradientFirst buttonBounce"
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
                                        <SmallLists icon={<img src='/icons/suitCase.svg' />}
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
                                            icon={<img src='/icons/hourGlassUp.svg'
                                            />}
                                            items={new Date(datas.datePosted)
                                                .toLocaleDateString('en-GB')
                                                .replace(/\//g, '-')}
                                        />
                                    )}
                                    {datas.datePosted && (
                                        <SmallLists
                                            icon={<img src='/icons/hourGlassDown.svg'
                                            />}
                                            items={new Date(datas.datePosted)
                                                .toLocaleDateString('en-GB')
                                                .replace(/\//g, '-')}
                                        />
                                    )}
                                </ul>
                            </div>
                        </div>

                    </div>);
                })}
        </>
    );
};
export default Applied;
