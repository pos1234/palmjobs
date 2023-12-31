import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { unSaveJobs, fetchSavedJobsData } from '@/backend/candidateBackend';
import { useEffect, useState } from 'react';
import ApplyToJob from '@/components/candidateProfileComponents/ApplyToJobs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JobImage from '@/components/JobImage';
import Link from 'next/link';
import AttachMoneyOutlined from '@mui/icons-material/AttachMoneyOutlined';
import EuroIcon from '@mui/icons-material/Euro';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ShareIcon from '@mui/icons-material/Share';
import Share from '@/components/Share';
import { SmallLists } from '@/components/TextInput';
import ReturnName from './ReturnName';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
interface SaveType {
    view: boolean
    datas: any,
    RefetchSaved: () => void
}
const SaveCard = ({ view, datas, RefetchSaved }: SaveType) => {
    const [openShare, setOpenShare] = useState(false)
    const [apply, setApply] = useState(false);
    const [jobId, setJobId] = useState();
    const [employerId, setEmployerId] = useState();
    const [companyName, setCompanyName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [savedJob, setSavedJob] = useState<any>()
    const removeSave = () => {
        unSaveJobs(datas.$id)
            .then((rem) => {
                toast.success('Successfully Unsaved Job');
                RefetchSaved()
            })
            .catch((error) => {
                toast.error('Failed to Unsaved Job');
                console.log(error);
            });
    };
    const fetch = () => {
        fetchSavedJobsData(datas.jobId)
            .then((res: any) => {
                setSavedJob(res);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        fetch()
    }, [])
    return <div className={view ? 'cursor-pointer max-h-[18rem] bg-textW flex items-between flex-wrap justify-between py-3 px-4 rounded-3xl border-2 rounded-xl xl:px-7 xl:py-7 ' : 'hidden'}>
        <div>
            <div className='w-full flex justify-between flex-wrap gap-2'>
                {savedJob && <div className='flex items-center gap-3'>
                    <JobImage id={savedJob.employerId} className=" rounded-full h-12 w-12" />
                    <ReturnName id={savedJob.employerId} />
                </div>}
                <div className="w-full flex flex-col justify-center">
                    {savedJob && savedJob.jobTitle && (
                        <Link href={`/jobs/${savedJob.$id}`} target="_blank" className="hover:text-gradientFirst hover:underline text-[1rem] sm:font-fhW">
                            {savedJob.jobTitle}
                        </Link>
                    )}
                    {savedJob && savedJob.jobLocation && (
                        <p className="text-[#141414] text-[12px] flex items-center gap-2">
                            <PlaceOutlinedIcon sx={{ fontSize: '1rem' }} />
                            {savedJob.jobLocation}
                        </p>
                    )}
                </div>
            </div>
            {savedJob && <div className="w-full mt-2">
                <ul className="text-[10px] flex gap-y-2 gap-x-1 col-span-12  md:text-[11px] md:gap-x-1 md:mt-1 md:text-[0.55rem] lg:text-[0.8rem] lg:gap-x-3 xl:text-[0.6rem] xl:gap-x-1 flex-wrap">
                    {savedJob.jobType &&
                        <SmallLists icon={<img src='/icons/suitCase.svg' />}
                            items={savedJob.jobType} />
                    }
                    {(savedJob.minSalary || savedJob.maxSalary) && (
                        <SmallLists icon={savedJob.currency == 'EURO' ? (
                            <EuroIcon
                                sx={{ fontSize: '1rem' }}
                                className="-mt-0.5 mr-1"
                            />
                        ) : savedJob.currency == 'USD' ? (
                            <AttachMoneyOutlined
                                sx={{ fontSize: '1rem' }}
                                className="-mt-0.5 mr-1"
                            />
                        ) : savedJob.currency == 'GPB' ? (
                            <CurrencyPoundIcon
                                sx={{ fontSize: '1rem' }}
                                className="-mt-0.5 mr-1"
                            />
                        ) : savedJob.currency == 'RNP' ? (
                            <CurrencyRupeeIcon
                                sx={{ fontSize: '1rem' }}
                                className="-mt-0.5 mr-1"
                            />
                        ) : (
                            <span className="text-[7px] mr-1">ETB</span>
                        )}
                            items={!savedJob.minSalary && savedJob.maxSalary
                                ? savedJob.maxSalary
                                : savedJob.minSalary && !savedJob.maxSalary
                                    ? savedJob.minSalary
                                    : savedJob.minSalary + '-' + savedJob.maxSalary}
                        />
                    )}
                </ul>
            </div>}
        </div>
        <div className='flex gap-5 max-md:flex-wrap'>
            <div className='flex text-gradientFirst pt-3' onClick={() => {
                removeSave();
            }}>
                <DeleteIcon sx={{ fontSize: '2rem' }}
                />
            </div>
            <div className='flex text-gradientFirst pt-3' >
                <FavoriteIcon sx={{ fontSize: '2rem' }}
                />
            </div>
            <div className='bg-black h-14 rounded-lg'>
                <button className='bg-gradientFirst text-textW px-20 py-3 h-14 cursor-pointer rounded-lg buttonBounce' onClick={() => {
                    setApply(true);
                    setJobId(savedJob.$id);
                    setEmployerId(savedJob.employerId);
                    setJobTitle(savedJob.jobTitle);
                    setCompanyName(datas.companyName);
                }}>Apply</button>
            </div>
            <div className='flex pt-3'>
                <ShareIcon onClick={() => setOpenShare(true)} sx={{ fontSize: '1.5rem' }} />
            </div>
        </div>
        {savedJob && <Share openShare={openShare} setOpenShare={setOpenShare} link={savedJob.$id} />}

        <ApplyToJob refetch={fetch} jobId={jobId} employerId={employerId} openApply={apply} setterFunction={setApply} jobTitle={jobTitle} companyName={companyName} />
    </div>
}

export default SaveCard