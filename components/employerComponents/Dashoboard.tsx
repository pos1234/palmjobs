import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
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
                            <p className="opacity-70 text-slate-950 text-[14px] capitalize">Posted Job</p>
                        </div>
                        <div className="bg-skillColor text-gradientFirst flex items-center p-[0.8rem] jutify-center rounded-full">
                            <PersonIcon sx={{ fontSize: '1.2rem' }} />
                        </div>
                    </div>
                    <div className="flex  justify-around bg-textW rounded-2xl shadow py-8 items-center w-[40%]  lg:w-[20%] xl:w-[25%]">
                        <div className="flex flex-col justify-between">
                            <p className="font-[800] text-2xl text-[#000]">03</p>
                            <p className="opacity-70 text-slate-950 text-[14px] capitalize">Shortlisted</p>
                        </div>
                        <div className="bg-skillColor text-gradientFirst flex items-center p-[0.8rem] jutify-center rounded-full">
                            <BookmarkIcon sx={{ fontSize: '1.2rem' }} />
                        </div>
                    </div>
                    <div className="flex  justify-around bg-textW rounded-2xl shadow py-8 items-center w-[40%] lg:w-[20%] xl:w-[25%]">
                        <div className="flex flex-col justify-between">
                            <p className="font-[800] text-2xl text-[#000]">1.7k</p>
                            <p className="opacity-70 text-slate-950 text-[14px] capitalize">Application</p>
                        </div>
                        <div className="bg-skillColor text-gradientFirst flex items-center p-[0.8rem] jutify-center rounded-full">
                            <VisibilityIcon sx={{ fontSize: '1.2rem' }} />
                        </div>
                    </div>
                    <div className="flex  justify-around bg-textW rounded-2xl shadow py-8 items-center w-[40%] lg:w-[20%] xl:w-[25%]">
                        <div className="flex flex-col justify-between">
                            <p className="font-[800] text-2xl text-[#000]">04</p>
                            <p className="opacity-70 text-slate-950 text-[14px] capitalize">Hired</p>
                        </div>
                        <div className="bg-skillColor text-gradientFirst flex items-center p-[0.8rem] jutify-center rounded-full">
                            <BorderColorIcon sx={{ fontSize: '1.2rem' }} />
                        </div>
                    </div>
                </div>

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
        </div>
    );
};
export default Dashboard;
