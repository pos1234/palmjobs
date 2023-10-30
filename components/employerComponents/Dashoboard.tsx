import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
<<<<<<< HEAD
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
const Cards = (props: any) => {
    return (
        <div className="flex  justify-around bg-textW rounded-2xl shadow py-5 items-center w-[40%] md:w-[30%] lg:w-[20%] xl:w-[25%]">
            <div className="flex flex-col justify-between">
                <p className="font-[800] text-2xl text-[#000]">07</p>
                <p className="opacity-70 text-slate-950 text-[14px] capitalize">Posted Job</p>
            </div>
            <div className="bg-skillColor text-gradientFirst flex items-center p-[0.6rem] jutify-center rounded-full">
                <PersonIcon />
            </div>
        </div>
    );
};
const PJobs = (props: any) => {
    return (
        <div className="flex gap-x-4 border-b-[1px] py-4">
            <div className="text-gradientFirst">
                <BusinessCenterIcon />
            </div>
            <div className="col-span-10">
                <p className="text-neutral-900 text-lg font-medium leading-normal">Software Engineer</p>
                <div className="flex flex-wrap text-stone-400 gap-5 mt-1">
                    <div>
                        <PinDropOutlinedIcon className="text-[1.1rem] -mt-1" /> <span>Addis Abeba</span>
                    </div>
                    <div>
                        <AccessTimeOutlinedIcon className="text-[1.1rem] -mt-1" /> <span>Full time</span>
                    </div>
                    <div>
                        <AttachMoneyOutlinedIcon className="text-[1.1rem] -mt-1" /> <span>50 - 55k</span>
                    </div>
                    <div>
                        <CalendarTodayOutlinedIcon className="text-[1.1rem] -mt-1" /> <span>20 min ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
const Dashboard = () => {
    return (
        <div className="bg-textW">
            
            <div className="bg-green-500 relative  pl-20 pt-10 lg:h-60 xl:h-48 jobsBack">
                <p className="text-black text-3xl font-[700]">Dashboard</p>
            </div>
            <div className=" pt-5  pb-10 bg-textW min-h-screen sm:pl-10 lg:-mt-40 xl:-mt-24 xl:pr-10 xl:px-20">
                <div className="flex justify-around max-xl:flex-wrap bg-forBack gap-5 pt-5 w-[100%] lg:justify-start lg:justify-around">
                    <div className="flex  justify-around bg-textW rounded-2xl shadow py-8 items-center w-[40%]  lg:w-[20%] xl:w-[25%]">
                        <div className="flex flex-col justify-between">
                            <p className="font-[800] text-2xl text-[#000]">07</p>
=======
import { NoPostedJobs, noApplication, noShortListed } from '@/lib/services';
import { useEffect, useState } from 'react';

const Dashboard = (props: any) => {
    const analytics = '/images/dashboardImage.jpg';
    const [numberOfjobs, setNumberOfjobs] = useState('00');
    const [numberOfListed, setNumberOfListed] = useState('00');
    const [numberOfApplied, setNumberOfApplied] = useState('00');
    const [jobsData, setJobsData] = useState<any>();
    const postedJobs = async () => {
        const result = await NoPostedJobs();
        if (result) {
            if (result.documents.length < 10) {
                setNumberOfjobs(' 0' + result.documents.length);
            } else {
                setNumberOfjobs(result.documents.length.toString());
            }
            setJobsData(result.documents);
        }
        const resultApp = await noApplication();
        if (resultApp) {
            if (resultApp.documents.length < 10) {
                setNumberOfApplied(' 0' + resultApp.documents.length);
            } else {
                setNumberOfApplied(resultApp.documents.length.toString());
            }
        }
        const resultShort = await noShortListed();
        if (resultShort) {
            if (resultShort.documents.length < 10) {
                setNumberOfListed(' 0' + resultShort.documents.length);
            } else {
                setNumberOfListed(resultShort.documents.length.toString());
            }
        }
    };
    useEffect(() => {
        postedJobs();
    }, [numberOfjobs]);

    return (
        <div className="bg-textW flex flex-col items-center justify-center gap-y-4 pt-20">
            <img src={analytics} className=" w-96 h-96" />
             <p className='text-[3rem] font-[500]'>Coming Soon !!!</p>
            {/* <div className="bg-green-500 relative  pl-20 pt-10 lg:h-60 xl:h-48 jobsBack">
                <p className="text-black text-3xl font-[700]">Dashboard</p>
            </div>
            <div className=" pt-5  pb-10 bg-textW min-h-screen sm:pl-10 lg:-mt-40 xl:-mt-24 xl:pr-10 xl:px-20">
                <div className="flex justify-around cursor-pointer max-xl:flex-wrap bg-forBack gap-5 pt-5 w-[100%] lg:justify-start lg:justify-around">
                    <div
                        onClick={() => props.changeFunction('jobs')}
                        className="flex hover:border-[1px] hover:border-orange-200 justify-around bg-textW rounded-2xl shadow py-8 items-center w-[40%]  lg:w-[20%] xl:w-[25%]"
                    >
                        <div className="flex flex-col justify-between">
                            <p className="font-[800] text-2xl text-[#000]">{numberOfjobs}</p>
>>>>>>> 3529551af5e550c58c691541a88d4b076fcd8537
                            <p className="opacity-70 text-slate-950 text-[14px] capitalize">Posted Job</p>
                        </div>
                        <div className="bg-skillColor text-gradientFirst flex items-center p-[0.8rem] jutify-center rounded-full">
                            <PersonIcon sx={{ fontSize: '1.2rem' }} />
                        </div>
                    </div>
<<<<<<< HEAD
                    <div className="flex  justify-around bg-textW rounded-2xl shadow py-8 items-center w-[40%]  lg:w-[20%] xl:w-[25%]">
                        <div className="flex flex-col justify-between">
                            <p className="font-[800] text-2xl text-[#000]">03</p>
=======
                    <div
                        onClick={() => props.changeFunction('candidates')}
                        className="flex hover:border-[1px] hover:border-orange-200 cursor-pointer justify-around bg-textW rounded-2xl shadow py-8 items-center w-[40%]  lg:w-[20%] xl:w-[25%]"
                    >
                        <div className="flex flex-col justify-between">
                            <p className="font-[800] text-2xl text-[#000]">{numberOfListed}</p>
>>>>>>> 3529551af5e550c58c691541a88d4b076fcd8537
                            <p className="opacity-70 text-slate-950 text-[14px] capitalize">Shortlisted</p>
                        </div>
                        <div className="bg-skillColor text-gradientFirst flex items-center p-[0.8rem] jutify-center rounded-full">
                            <BookmarkIcon sx={{ fontSize: '1.2rem' }} />
                        </div>
                    </div>
<<<<<<< HEAD
                    <div className="flex  justify-around bg-textW rounded-2xl shadow py-8 items-center w-[40%] lg:w-[20%] xl:w-[25%]">
                        <div className="flex flex-col justify-between">
                            <p className="font-[800] text-2xl text-[#000]">1.7k</p>
=======
                    <div
                        onClick={() => props.changeFunction('candidates')}
                        className="flex hover:border-[1px] hover:border-orange-200 cursor-pointer justify-around bg-textW rounded-2xl shadow py-8 items-center w-[40%] lg:w-[20%] xl:w-[25%]"
                    >
                        <div className="flex flex-col justify-between">
                            <p className="font-[800] text-2xl text-[#000]">{numberOfApplied}</p>
>>>>>>> 3529551af5e550c58c691541a88d4b076fcd8537
                            <p className="opacity-70 text-slate-950 text-[14px] capitalize">Application</p>
                        </div>
                        <div className="bg-skillColor text-gradientFirst flex items-center p-[0.8rem] jutify-center rounded-full">
                            <VisibilityIcon sx={{ fontSize: '1.2rem' }} />
                        </div>
                    </div>
<<<<<<< HEAD
                    <div className="flex  justify-around bg-textW rounded-2xl shadow py-8 items-center w-[40%] lg:w-[20%] xl:w-[25%]">
=======
                    <div className="flex hover:border-[1px] hover:border-orange-200 cursor-pointer bg-textW  justify-around rounded-2xl shadow py-8 items-center w-[40%] lg:w-[20%] xl:w-[25%]">
>>>>>>> 3529551af5e550c58c691541a88d4b076fcd8537
                        <div className="flex flex-col justify-between">
                            <p className="font-[800] text-2xl text-[#000]">04</p>
                            <p className="opacity-70 text-slate-950 text-[14px] capitalize">Hired</p>
                        </div>
                        <div className="bg-skillColor text-gradientFirst flex items-center p-[0.8rem] jutify-center rounded-full">
                            <BorderColorIcon sx={{ fontSize: '1.2rem' }} />
                        </div>
                    </div>
                </div>

<<<<<<< HEAD
                <div className="bg-forBack mt-10 px-2 py-3">
                    <div className="bg-textW pt-5">
                        <p className="text-black text-3xl font-[700]">Posted Jobs</p>
                        <div className="max-h-[25rem] overflow-y-auto">
                            <PJobs />
                            <PJobs />
                            <PJobs />
                        </div>
                    </div>
                </div>
            </div>
=======
               
            </div> */}
>>>>>>> 3529551af5e550c58c691541a88d4b076fcd8537
        </div>
    );
};
export default Dashboard;
