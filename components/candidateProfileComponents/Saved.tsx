import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

import { fetchSavedJobIds, unSaveJobs, fetchSavedJobsData, getSavedJobId, fetchAppliedJobIds } from '@/lib/services';
import { useEffect, useState } from 'react';
import ApplyToJob from './ApplyToJobs';
const SavedJobs = (props: any) => {
    const profile = '/images/profile.svg';
    const [savedJobId, setSavedJobId] = useState<any[]>([]);
    const [savedJobs, setSavedJobs] = useState<any[]>([]);
    const [apply, setApply] = useState(false);
    const [jobId, setJobId] = useState();
    const [employerId, setEmployerId] = useState();
    useEffect(() => {
        fetchSavedJobIds().then((res: any) => {
            for (let i = 0; i < res.documents.length; i++) {
                if (!savedJobId.includes(res.documents[i].jobId)) {
                    savedJobId.push(res.documents[i].jobId);
                    fetchSavedJobsData(savedJobId)
                        .then((responseData) => {
                            setSavedJobs(responseData);
                            // console.log(responseData);
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
            unSaveJobs(res.documents[0].$id).then(() => {
                fetchSavedJobIds().then((res: any) => {
                    fetchSavedJobsData(savedJobId)
                        .then((responseData) => {
                            setSavedJobs(responseData);
                            // console.log(responseData);
                        })
                        .catch((error) => {
                            console.error('Error fetching data from Appwrite:', error);
                        });
                });
            });
        });
    };

    return (
        <>
            {savedJobs &&
                savedJobs.map((datas: any) => {
                    return (
                        <div className={props.view ? 'col-span-12 grid grid-cols-12 py-3 bg-textW' : 'hidden'} key={datas.$id}>
                            <img src={profile} className="hidden h-full md:col-span-2 md:block lg:col-span-1" />
                            <div className="col-span-12 pl-5 grid grid-cols-12 md:col-span-10 lg:col-span-8">
                                <img src={profile} className="col-span-2 h-full md:hidden" />
                                <div className="col-span-10 pl-1">
                                    <p className="text-[12px] text-darkBlue sm:text-fhS">{datas.companyName}</p>
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
                            <div className="col-span-12 flex items-center justify-center md:col-span-12 md:max-lg:pt-10 md:max-lg:px-20 lg:col-span-3 lg:px-10">
                                <button
                                    onClick={() => {
                                        setApply(true);
                                        setJobId(datas.$id);
                                        setEmployerId(datas.employerId);
                                    }}
                                    className=" h-[4.5rem] w-full bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW rounded-full cursor-pointer md:full"
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    );
                })}
            {apply && <ApplyToJob jobId={jobId} employerId={employerId} setterFunction={setApply}/>}
            
        </>
        
    );
};
export default SavedJobs;
