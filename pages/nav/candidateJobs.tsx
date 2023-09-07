import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { useState } from 'react';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
const CandidateJobs = () => {
    const [saved, setSaved] = useState(true);
    const [applied, setApplied] = useState(false);
    const [interview, setInterview] = useState(false);
    const [archive, setArchive] = useState(false);
    const profile = '/images/profile.svg';

    return (
        <div className="px-3 md:px-16">
            <Navigation />
            <div className="px-3 mt-20 grid grid-cols-12 md:px-20">
                {saved && <p className="font-shW text-shS leading-shL text-darkBlue col-span-12">My Saved Jobs</p>}
                {applied && <p className="font-shW text-shS leading-shL text-darkBlue col-span-12">Applied Jobs</p>}
                {interview && <p className="font-shW text-shS leading-shL text-darkBlue col-span-12">My Interviews</p>}
                {archive && <p className="font-shW text-shS leading-shL text-darkBlue col-span-12">Archived Jobs</p>}
                <div className="mt-8 col-span-12 max-sm:bg-green-500 grid grid-cols-12 gap-y-3 gap-x-5 md:col-span-10 lg:col-span-8">
                    <button
                        className={
                            saved == true
                                ? 'col-span-6 h-[3.5rem] bg-gradientFirst text-textW rounded-full cursor-pointer md:col-span-3'
                                : 'col-span-6 h-[3.5rem] text-darkBlue rounded-full cursor-pointer border-2 md:col-span-3'
                        }
                        onClick={() => {
                            setSaved(true);
                            setApplied(false);
                            setInterview(false);
                            setArchive(false);
                        }}
                    >
                        Saved
                    </button>
                    <button
                        className={
                            applied == true
                                ? 'col-span-6 h-[3.5rem] bg-gradientFirst text-textW rounded-full cursor-pointer md:col-span-3'
                                : 'col-span-6 h-[3.5rem] text-darkBlue rounded-full cursor-pointer border-2 md:col-span-3'
                        }
                        onClick={() => {
                            setSaved(false);
                            setApplied(true);
                            setInterview(false);
                            setArchive(false);
                        }}
                    >
                        Applied
                    </button>
                    <button
                        className={
                            interview == true
                                ? 'col-span-6 h-[3.5rem] bg-gradientFirst text-textW rounded-full cursor-pointer md:col-span-3'
                                : 'col-span-6 h-[3.5rem] text-darkBlue rounded-full cursor-pointer border-2 md:col-span-3'
                        }
                        onClick={() => {
                            setSaved(false);
                            setApplied(false);
                            setInterview(true);
                            setArchive(false);
                        }}
                    >
                        Interview
                    </button>
                    <button
                        className={
                            archive == true
                                ? 'col-span-6 h-[3.5rem] bg-gradientFirst text-textW rounded-full cursor-pointer md:col-span-3'
                                : 'col-span-6 h-[3.5rem] text-darkBlue rounded-full cursor-pointer border-2 md:col-span-3'
                        }
                        onClick={() => {
                            setSaved(false);
                            setApplied(false);
                            setInterview(false);
                            setArchive(true);
                        }}
                    >
                        Archive
                    </button>
                </div>
                <p className="col-span-12 mt-5 text-darkBlue text-midS font-midW">2 Jobs</p>
                <div className="col-span-12 grid grid-cols-12 mt-8 md:pl-5 p-1 pt-5 bg-forBack p-1 gap-y-10 md:gap-y-8">
                    {saved && (
                        <div className="col-span-12 grid grid-cols-12 py-3 bg-textW">
                            <img src={profile} className="hidden h-full md:col-span-2 md:block lg:col-span-1" />
                            <div className="col-span-12 pl-5 grid grid-cols-12 md:col-span-10 lg:col-span-8">
                                <img src={profile} className="col-span-2 h-full md:hidden" />
                                <div className="col-span-10 pl-1">
                                    <p className="text-[12px] text-darkBlue sm:text-fhS">Linear Company</p>
                                    <p className="text-darkBlue font-midRW text-midRS sm:font-fhW sm:text-frhS">Software Engineer</p>
                                    <p className="text-fadedText rounded-full md:hidden">
                                        <PinDropOutlinedIcon sx={{ fontSize: '1.2rem', marginTop: '-0.2rem' }} /> Addis abeba
                                    </p>
                                </div>
                                <ul className="mt-5 text-[11px] flex gap-x-3 col-span-12 md:text-[0.8rem] md:mt-1 md:gap-x-5">
                                    <li className="hidden md:bg-textW md:text-fadedText md:flex md:p-0">
                                        <PinDropOutlinedIcon className="text-[0.9rem] -mt-0.5 mr-1 md:text-[1.2rem]" /> Addis abeba
                                    </li>
                                    <li className="inline bg-lightGreen text-green-800 rounded-full p-2 px-3 md:bg-textW md:text-fadedText md:p-0">
                                        <AccessTimeOutlinedIcon className="text-[0.9rem] -mt-0.5 mr-1  md:text-[1.2rem]" />
                                        Full Time
                                    </li>
                                    <li className="inline bg-lightGreen text-green-800 rounded-full p-2 px-3 md:bg-textW md:text-fadedText md:p-0">
                                        <AttachMoneyOutlinedIcon className="text-[0.9rem] -mt-0.5 mr-1 md:text-[1.2rem] " />
                                        50 - 55k
                                    </li>
                                    <li className="inline bg-lightGreen text-green-800 rounded-full p-2 px-4 md:bg-textW md:text-fadedText md:p-0">
                                        <CalendarTodayOutlinedIcon className="text-[0.9rem] -mt-0.5 mr-1 md:text-[1.2rem] " /> 29 min ago
                                    </li>
                                </ul>
                                <p className="col-span-12 text-fhS text-darkBlue leading-[24px]  text-fadedText my-5 md:my-0 md:mt-2 md:text-darkBlue">
                                    Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt
                                    eiusmod eiusmod culpa. laborum tempor Lorem incididunt.
                                </p>
                            </div>
                            <div className="col-span-12 flex items-center justify-center md:col-span-12 md:max-lg:pt-10 md:max-lg:px-20 lg:col-span-3 lg:px-10">
                                <button className=" h-[4.5rem] w-full bg-gradientFirst text-textW rounded-full cursor-pointer md:full">
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    )}
                    {applied && (
                        <div className="col-span-12 grid grid-cols-12 py-3 bg-textW">
                            <img src={profile} className="hidden h-full md:col-span-2 md:block lg:col-span-1" />
                            <div className="col-span-12 pl-5 grid grid-cols-12 md:col-span-10 lg:col-span-8">
                                <img src={profile} className="col-span-2 h-full md:hidden" />
                                <div className="col-span-10 pl-1">
                                    <p className="text-[12px] text-darkBlue sm:text-fhS">Linear Company</p>
                                    <p className="text-darkBlue font-midRW text-midRS sm:font-fhW sm:text-frhS">Software Engineer</p>
                                    <p className="text-fadedText rounded-full md:hidden">
                                        <PinDropOutlinedIcon sx={{ fontSize: '1.2rem', marginTop: '-0.2rem' }} /> Addis abeba
                                    </p>
                                </div>
                                <ul className="mt-5 text-[11px] flex gap-x-3 col-span-12 md:text-[0.8rem] md:mt-1 md:gap-x-5">
                                    <li className="hidden md:bg-textW md:text-fadedText md:flex md:p-0">
                                        <PinDropOutlinedIcon className="text-[0.9rem] -mt-0.5 mr-1 md:text-[1.2rem]" /> Addis abeba
                                    </li>
                                    <li className="inline bg-lightGreen text-green-800 rounded-full p-2 px-3 md:bg-textW md:text-fadedText md:p-0">
                                        <AccessTimeOutlinedIcon className="text-[0.9rem] -mt-0.5 mr-1  md:text-[1.2rem]" />
                                        Full Time
                                    </li>
                                    <li className="inline bg-lightGreen text-green-800 rounded-full p-2 px-3 md:bg-textW md:text-fadedText md:p-0">
                                        <AttachMoneyOutlinedIcon className="text-[0.9rem] -mt-0.5 mr-1 md:text-[1.2rem] " />
                                        50 - 55k
                                    </li>
                                    <li className="inline bg-lightGreen text-green-800 rounded-full p-2 px-4 md:bg-textW md:text-fadedText md:p-0">
                                        <CalendarTodayOutlinedIcon className="text-[0.9rem] -mt-0.5 mr-1 md:text-[1.2rem] " /> 29 min ago
                                    </li>
                                </ul>
                                <p className="col-span-12 text-fhS text-darkBlue leading-[24px]  text-fadedText my-5 md:my-0 md:mt-2 md:text-darkBlue">
                                    Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt
                                    eiusmod eiusmod culpa. laborum tempor Lorem incididunt.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default CandidateJobs;
