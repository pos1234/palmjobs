import React, { useEffect, useState } from 'react'
import ReturnName from '../SavedComponent/ReturnName';
import JobImage from '@/components/JobImage';
import { SmallLists } from '@/components/TextInput';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import Link from 'next/link';
import AttachMoneyOutlined from '@mui/icons-material/AttachMoneyOutlined';
import EuroIcon from '@mui/icons-material/Euro';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { fetchAppliedJobsData } from '@/backend/candidateBackend';
interface SaveType {
    view: boolean
    datas: any,
    RefetchSaved: () => void
}
const AppliedCard = ({ view, datas, RefetchSaved }: SaveType) => {
    const [appliedJobs, setAppliedJobs] = useState<any>();
    const [jobId, setJobId] = useState();
    const [employerId, setEmployerId] = useState();
    const [companyName, setCompanyName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const fetch = () => {
        fetchAppliedJobsData(datas.jobId)
            .then((res: any) => {
                setAppliedJobs(res);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    useEffect(() => {
        fetch()
    }, [])
    return (
        <div className={view ? 'cursor-pointer max-h-[18rem] bg-textW flex items-between flex-wrap justify-between py-3 px-4 rounded-3xl border-2 rounded-xl xl:px-7 xl:py-7 ' : 'hidden'}>
            {
                appliedJobs && <div>
                    <div className='w-full flex justify-between flex-wrap gap-2'>
                        <div className='flex items-center gap-3'>
                            <JobImage id={appliedJobs.employerId} className=" rounded-full h-12 w-12" />
                            <ReturnName id={appliedJobs.employerId} />
                        </div>
                        <div className="w-full flex flex-col justify-center">
                            {appliedJobs.jobTitle && (
                                <Link href={`/jobs/${appliedJobs.$id}`} target="_blank" className="font-bold underline text-[1rem] sm:font-fhW sm:text-[2rem] md:text-[1.2rem] xl:text-[1.5rem]">
                                    {appliedJobs.jobTitle}
                                </Link>
                            )}
                            {appliedJobs.jobLocation && (
                                <p className="text-fadedText max-sm:text-[14px] flex items-center gap-2">
                                    <PinDropOutlinedIcon sx={{ fontSize: '1.2rem' }} />
                                    {appliedJobs.jobLocation}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="w-full mt-4">
                        <ul className="text-[10px] flex gap-y-2 gap-x-1 col-span-12  md:text-[11px] md:gap-x-1 md:mt-1 md:text-[0.55rem] lg:text-[0.8rem] lg:gap-x-3 xl:text-[0.6rem] xl:gap-x-1 flex-wrap">
                            {appliedJobs.jobType &&
                                <SmallLists icon={<img src='/icons/suitCase.svg' />}
                                    items={appliedJobs.jobType} />
                            }
                            {(appliedJobs.minSalary || appliedJobs.maxSalary) && (
                                <SmallLists icon={appliedJobs.currency == 'euro' ? (
                                    <EuroIcon
                                        sx={{ fontSize: '1rem' }}
                                        className="-mt-0.5 mr-1"
                                    />
                                ) : appliedJobs.currency == 'usd' ? (
                                    <AttachMoneyOutlined
                                        sx={{ fontSize: '1rem' }}
                                        className="-mt-0.5 mr-1"
                                    />
                                ) : appliedJobs.currency == 'gpb' ? (
                                    <CurrencyPoundIcon
                                        sx={{ fontSize: '1rem' }}
                                        className="-mt-0.5 mr-1"
                                    />
                                ) : appliedJobs.currency == 'rnp' ? (
                                    <CurrencyRupeeIcon
                                        sx={{ fontSize: '1rem' }}
                                        className="-mt-0.5 mr-1"
                                    />
                                ) : (
                                    <span className="text-[7px] mr-1">ETB</span>
                                )}
                                    items={!appliedJobs.minSalary && appliedJobs.maxSalary
                                        ? appliedJobs.maxSalary
                                        : appliedJobs.minSalary && !appliedJobs.maxSalary
                                            ? appliedJobs.minSalary
                                            : appliedJobs.minSalary + '-' + appliedJobs.maxSalary}
                                />
                            )}
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
}

export default AppliedCard