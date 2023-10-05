import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Popover } from '@headlessui/react';

const PJobs = (props: any) => {
    return (
        <div className="bg-textW grid grid-cols-12 relative py-5 pl-2 xl:pl-9">
            <div className=" flex flex-col justify-center col-span-10 sm:col-span-7 lg:col-span-3">
                <p className="text-neutral-900 text-lg font-medium leading-normal">Software Engineer</p>
                <div className="flex flex-wrap text-stone-400 text-[0.8rem] gap-x-4 gap-y-1 mt-1">
                    <div>
                        <PinDropOutlinedIcon className="text-[1.1rem] -mt-1" /> <span>Addis Abeba</span>
                    </div>
                    <div>
                        <AccessTimeOutlinedIcon className="text-[1.1rem] -mt-1" /> <span>Full time</span>
                    </div>
                    <div>
                        <AttachMoneyOutlinedIcon className="text-[1.1rem] -mt-1" /> <span>50 - 55k</span>
                    </div>
                    <div className="flex items-center flex gap-x-2 lg:hidden ">
                        <CalendarTodayOutlinedIcon className="text-[1.1rem] text-gradientFirst -mt-1" /> <span>20-70-2023</span>
                    </div>
                    <div className="flex items-center flex gap-x-2 lg:hidden">
                        <Groups2OutlinedIcon className="text-[1.1rem] text-gradientFirst -mt-1" /> <span>120 Applicants</span>
                    </div>
                </div>
            </div>
            <div className="col-span-2 flex items-center flex gap-x-2 lg:text-[0.9rem] hidden  lg:flex">
                <CalendarTodayOutlinedIcon className="text-[1.1rem] text-gradientFirst -mt-0.5" /> <span>20-70-2023</span>
            </div>
            <div className="col-span-3 flex items-center flex gap-x-2 lg:text-[0.9rem] hidden lg:flex">
                <Groups2OutlinedIcon className="text-[1.1rem] text-gradientFirst -mt-0.5" /> <span>120 Applicants</span>
            </div>
            <div className="col-span-2 flex items-center max-sm:hidden lg:text-[0.9rem]">
                <select className="bg-lightGreen text-green border-0 rounded-2xl">
                    <option>Active</option>
                </select>
            </div>
            <div className="flex items-center pl-0 sm:pl-2 col-span-2  sm:col-span-3 lg:col-span-2 lg:text-[0.9rem] ">
                <Popover className="w-full sm:relative focus:ring-0 focus:border-0 focus:outline-0">
                    <Popover.Button className="focus:ring-0 focus:border-0 focus:outline-0">
                        <MoreHorizIcon className="text-[2.5rem] focus:ring-0 focus:border-0 focus:outline-0 -mt-1 cursor-pointer" />
                    </Popover.Button>

                    <Popover.Panel className="absolute -ml-28 sm:ml-0 w-[10rem] sm:w-full border-2 rounded-2xl flex w-full flex-col gap-y-3 bg-textW py-3 px-3 bg-white shadow z-10">
                        <div className="flex gap-x-3 text-[0.8rem] md:max-lg:text-red-500 cursor-pointer items-center text-stone-400 hover:text-stone-700">
                            <BorderColorIcon className="text-[1rem]" />
                            <span>Edit Job</span>
                        </div>
                        <div className="flex gap-x-3 text-[0.8rem] cursor-pointer items-center text-stone-400 hover:text-stone-700">
                            <VisibilityIcon className="text-[1rem]" />
                            <span>View Details</span>
                        </div>
                        <div className="flex gap-x-3 text-[0.8rem] cursor-pointer items-center text-stone-400 hover:text-stone-700">
                            <ShareOutlinedIcon className="text-[1rem]" />
                            <span>Share</span>
                        </div>
                    </Popover.Panel>
                </Popover>
            </div>
        </div>
    );
};
const JobTab = (props: any) => {
    return (
        <div
            className={
                props.active == 'true'
                    ? 'text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 rounded-2xl px-5'
                    : 'text-stone-500 flex items-center justify-center cursor-pointer h-16 rounded-2xl px-5'
            }
        >
            {props.text}
        </div>
    );
};

const Jobs = () => {
    return (
        <div className="bg-textW min-h-screen">
            <div className="relative flex justify-between pt-10 items-center lg:pl-10">
                <p className="text-black text-3xl font-[700]">Jobs</p>
                <div className="text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 rounded-xl px-9">
                    <BorderColorIcon sx={{ fontSize: '1.2rem' }} className="mr-2" /> Post Job
                </div>
            </div>
            <div className="mt-8 lg:pl-10">
                <div className="flex max-sm:flex-col gap-y-3 justify-between">
                    <div className="bg-forBack py-2 px-1">
                        <div className="flex bg-textW">
                            <JobTab text="Opened" active="true" />
                            <JobTab text="Paused" />
                            <JobTab text="Closed" />
                        </div>
                    </div>
                    <div className="flex max-sm:pl-5 items-center gap-x-2">
                        <p>Sort By:</p>
                        <div className="bg-forBack p-1">
                            <select className="rounded-2xl py-3 border-0 cursor-pointer">
                                <option>Posting Date</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-12 pt-3">
                        <div className="col-span-12  grid grid-cols-12 max-md:hidden xl:pl-10">
                            <p className="col-span-3 text-neutral-900 text-opacity-70 text-lg px-2 font-medium leading-loose py-2 md:max-lg:hidden max-xl:text-[1rem]">
                                Job Title
                            </p>
                            <p className="col-span-7 text-neutral-900 text-opacity-70 text-lg px-2 font-medium leading-loose py-2 hidden md:max-lg:block">
                                Job Detail
                            </p>
                            <p className="col-span-3 text-neutral-900 text-opacity-70 text-lg px-2 font-medium leading-loose py-2 text-[1rem] md:max-lg:hidden max-xl:text-[1rem] lg:col-span-2">
                                Job Created
                            </p>
                            <p className="col-span-3 text-neutral-900 text-opacity-70 text-lg px-2 font-medium leading-loose py-2 max-xl:text-[1rem] md:max-lg:hidden">
                                Job Applicants
                            </p>
                            <p className="col-span-2 text-neutral-900 text-opacity-70 text-lg px-2 font-medium leading-loose py-2 md:max-lg:col-span-2 lg:max-xl:text-[1rem]">
                                Status
                            </p>
                            <p className="col-span-1 text-neutral-900 text-opacity-70 text-lg px-2 font-medium leading-loose py-2 md:max-lg:col-span-3 lg:max-xl:text-[1rem]">
                                Actions
                            </p>
                        </div>
                        <div className="col-span-12 space-y-4 bg-forBack  h-[25rem] overflow-y-auto p-1 xl:p-3">
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

export default Jobs;
