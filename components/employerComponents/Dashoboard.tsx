import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
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
                            <p className="opacity-70 text-slate-950 text-[14px] capitalize">Posted Job</p>
                        </div>
                        <div className="bg-skillColor text-gradientFirst flex items-center p-[0.8rem] jutify-center rounded-full">
                            <PersonIcon sx={{ fontSize: '1.2rem' }} />
                        </div>
                    </div>
                    <div
                        onClick={() => props.changeFunction('candidates')}
                        className="flex hover:border-[1px] hover:border-orange-200 cursor-pointer justify-around bg-textW rounded-2xl shadow py-8 items-center w-[40%]  lg:w-[20%] xl:w-[25%]"
                    >
                        <div className="flex flex-col justify-between">
                            <p className="font-[800] text-2xl text-[#000]">{numberOfListed}</p>
                            <p className="opacity-70 text-slate-950 text-[14px] capitalize">Shortlisted</p>
                        </div>
                        <div className="bg-skillColor text-gradientFirst flex items-center p-[0.8rem] jutify-center rounded-full">
                            <BookmarkIcon sx={{ fontSize: '1.2rem' }} />
                        </div>
                    </div>
                    <div
                        onClick={() => props.changeFunction('candidates')}
                        className="flex hover:border-[1px] hover:border-orange-200 cursor-pointer justify-around bg-textW rounded-2xl shadow py-8 items-center w-[40%] lg:w-[20%] xl:w-[25%]"
                    >
                        <div className="flex flex-col justify-between">
                            <p className="font-[800] text-2xl text-[#000]">{numberOfApplied}</p>
                            <p className="opacity-70 text-slate-950 text-[14px] capitalize">Application</p>
                        </div>
                        <div className="bg-skillColor text-gradientFirst flex items-center p-[0.8rem] jutify-center rounded-full">
                            <VisibilityIcon sx={{ fontSize: '1.2rem' }} />
                        </div>
                    </div>
                    <div className="flex hover:border-[1px] hover:border-orange-200 cursor-pointer bg-textW  justify-around rounded-2xl shadow py-8 items-center w-[40%] lg:w-[20%] xl:w-[25%]">
                        <div className="flex flex-col justify-between">
                            <p className="font-[800] text-2xl text-[#000]">04</p>
                            <p className="opacity-70 text-slate-950 text-[14px] capitalize">Hired</p>
                        </div>
                        <div className="bg-skillColor text-gradientFirst flex items-center p-[0.8rem] jutify-center rounded-full">
                            <BorderColorIcon sx={{ fontSize: '1.2rem' }} />
                        </div>
                    </div>
                </div>

               
            </div> */}
        </div>
    );
};
export default Dashboard;
