import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { fetchSavedJobIds, unSaveJobs, fetchSavedJobsData, getSavedJobId, fetchAppliedJobIds, getCompanyData } from '@/backend/candidateBackend';
import { useEffect, useState } from 'react';
import ApplyToJob from './ApplyToJobs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JobImage from '../JobImage';
import SingleJobShimmer from '../shimmer/SingleJobShimmer';
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
import Share from '../Share';
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
const SavedJobs = (props: any) => {
    const [savedJobId, setSavedJobId] = useState<any[]>([]);
    const [savedJobs, setSavedJobs] = useState<any[]>([]);
    const [apply, setApply] = useState(false);
    const [jobId, setJobId] = useState();
    const [employerId, setEmployerId] = useState();
    const [allLoading, setAllLoading] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [openShare, setOpenShare] = useState(false)
    useEffect(() => {
        setAllLoading(true);
        fetchSavedJobIds().then((res: any) => {
            res && res.total == 0 && setAllLoading(false);
            for (let i = 0; i < res.documents.length; i++) {
                if (!savedJobId.includes(res.documents[i].jobId)) {
                    savedJobId.push(res.documents[i].jobId);
                    fetchSavedJobsData(savedJobId)
                        .then((responseData) => {
                            setSavedJobs(responseData);
                            setAllLoading(false);
                        })
                        .catch((error) => {
                            console.error('Error fetching data from Appwrite:', error);
                        });
                }
            }
        });
    }, [savedJobId]);
    const removeSave = (id: string) => {
        getSavedJobId(id).then((res) => {
            const index = savedJobId.indexOf(res.documents[0].$id);
            savedJobId.splice(index, 1);
            unSaveJobs(res.documents[0].$id)
                .then((rem) => {
                    toast.success('Successfully Unsaved Job');
                    fetchSavedJobIds().then((res: any) => {
                        fetchSavedJobsData(savedJobId)
                            .then((responseData) => {
                                setSavedJobs(responseData);
                            })
                            .catch((error) => {
                                console.error('Error fetching data from Appwrite:', error);
                            });
                    });
                })
                .catch((error) => {
                    toast.success('Failed to Unsaved Job');
                    console.log(error);
                });
        });
    };
    return (
        <>
            {!allLoading && !savedJobs && props.view && (
                <div className="col-span-12 text-center flex flex-col items-center gap-y-8">
                    <p>No saved jobs under your palm tree yet. Browse the listings to find your next opportunity.</p>
                    <Link
                        href="/jobs"
                        className="w-60 bg-black text-textW h-14 rounded-[3px] flex justify-center items-center text-textW cursor-pointer hover:border-b-4 hover:border-b-gradientFirst buttonBounce"
                    >
                        Find Job
                    </Link>
                </div>
            )}
            {savedJobs &&
                !allLoading &&
                savedJobs.map((datas: any) => {
                    return (
                        <div key={datas.$id} className={props.view ? 'cursor-pointer max-h-[18rem] bg-textW flex items-between flex-wrap justify-between py-3 px-4 rounded-3xl border-2 rounded-xl xl:px-7 xl:py-7 ' : 'hidden'}>
                            <div>
                                <div className='w-full flex justify-between flex-wrap gap-2'>
                                    <div className='flex items-center gap-3'>
                                        <JobImage id={datas.employerId} className=" rounded-full h-12 w-12" />
                                        <ReturnName id={datas.employerId} />
                                    </div>
                                    <div className="w-full flex flex-col justify-center">
                                        {datas.jobTitle && (
                                            <Link href={`/jobs/${datas.$id}`} target="_blank" className="font-bold underline text-[1rem] sm:font-fhW sm:text-[2rem] md:text-[1.2rem] xl:text-[1.5rem]">
                                                {datas.jobTitle}
                                            </Link>
                                        )}
                                        {datas.jobLocation && (
                                            <p className="text-fadedText max-sm:text-[14px] flex items-center gap-2">
                                                <PlaceOutlinedIcon sx={{ fontSize: '1.2rem' }} />
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
                            <div className='flex gap-5'>
                                <div className='flex text-gradientFirst pt-3' onClick={() => {
                                    removeSave(datas.$id);
                                }}>
                                    <BookmarkIcon sx={{ fontSize: '2rem' }}
                                    />
                                </div>
                                <button className='bg-gradientFirst text-textW px-20 py-3 h-14 cursor-pointer border-b-4 border-b-textW hover:border-b-4 hover:border-b-black rounded-lg buttonBounce' onClick={() => {
                                    setApply(true);
                                    setJobId(datas.$id);
                                    setEmployerId(datas.employerId);
                                    setJobTitle(datas.jobTitle);
                                    setCompanyName(datas.companyName);
                                }}>Apply</button>
                                <div className='flex pt-3'>
                                    <ShareIcon onClick={() => setOpenShare(true)} sx={{ fontSize: '1.5rem' }} />
                                </div>

                            </div>
                            <Share openShare={openShare} setOpenShare={setOpenShare} link={datas.$id} />
                        </div>
                    );
                })}
            {allLoading && (
                <div className="col-span-12 flex flex-col gap-3 gap-y-10 p-3">
                    <div className="flex gap-x-5">
                        <div className="w-24 h-24 rounded-2xl bg-gray-300 rounded animate-pulse col-span-12"></div>
                        <div className="flex flex-col gap-2 justify-center w-full">
                            <div className="text-neutral-900 text-xl font-medium leading-7 md:w-2/3">
                                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                            <div className="text-stone-300 text-lg font-normal leading-relaxed w-2/3 md:w-1/2">
                                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                            <div className="text-neutral-900 text-opacity-70 text-xl font-normal leading-7 w-1/2">
                                <div className="h-4 bg-gray-300 rounded animate-pulse md:w-1/2"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-x-5">
                        <div className="w-24 h-24 rounded-2xl bg-gray-300 rounded animate-pulse col-span-12"></div>
                        <div className="flex flex-col gap-2 justify-center w-full">
                            <div className="text-neutral-900 text-xl font-medium leading-7 md:w-2/3">
                                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                            <div className="text-stone-300 text-lg font-normal leading-relaxed w-2/3 md:w-1/2">
                                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                            <div className="text-neutral-900 text-opacity-70 text-xl font-normal leading-7 w-1/2">
                                <div className="h-4 bg-gray-300 rounded animate-pulse md:w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {apply && (
                <ApplyToJob jobId={jobId} employerId={employerId} setterFunction={setApply} jobTitle={jobTitle} companyName={companyName} />
            )}
        </>
    );
};
export default SavedJobs;
