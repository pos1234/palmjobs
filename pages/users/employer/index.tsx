import Navigation from '@/components/Navigation';
import AddIcon from '@mui/icons-material/Add';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PeopleIcon from '@mui/icons-material/People';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import PostAJob from '../../../components/employerComponents/EmployerPostJob';
import styles from '@/styles/navigation.module.css';
import ShieldIcon from '@mui/icons-material/Shield';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
/* import EmployerProfile from '@/components/employerComponents/EmployerProfile';
 */ import Dashboard from '@/components/employerComponents/Dashoboard';
import Jobs from '@/components/employerComponents/Jobs';
import Candidates from '@/components/employerComponents/Candidates';
import EmployerProfile from '@/components/employerComponents/EmployerProfile';
import Privacy from '@/components/employerComponents/Privacy';
import { employeeAuth } from '@/components/withAuth';
const AdminJob = () => {
    const profile = '/images/profile.svg';
    const [postJob, setPostJob] = useState(true);
    const [dashboard, setDashboard] = useState(false);
    const [jobs, setJobs] = useState(false);
    const [candidates, setCandidates] = useState(false);
    const [profileSetting, setProfileSetting] = useState(false);
    const [privacy, setPrivacy] = useState(false);
    const [view, setView] = useState(false);
    const handleNavigation = (name: string) => {
        'dashboard';
        if (name === 'postJob') {
            setPostJob(true);
            setDashboard(false);
            setJobs(false);
            setCandidates(false);
            setProfileSetting(false);
            setPrivacy(false);
            setView(false);
        }
        if (name === 'dashboard') {
            setDashboard(true);
            setPostJob(false);
            setJobs(false);
            setCandidates(false);
            setProfileSetting(false);
            setPrivacy(false);
            setView(false);
        }
        if (name === 'jobs') {
            setPostJob(false);
            setDashboard(false);
            setJobs(true);
            setCandidates(false);
            setProfileSetting(false);
            setPrivacy(false);
            setView(false);
        }
        if (name === 'candidates') {
            setPostJob(false);
            setDashboard(false);
            setJobs(false);
            setCandidates(true);
            setProfileSetting(false);
            setPrivacy(false);
            setView(false);
        }
        if (name === 'profileSetting') {
            setPostJob(false);
            setDashboard(false);
            setJobs(false);
            setCandidates(false);
            setProfileSetting(true);
            setPrivacy(false);
            setView(false);
        }
        if (name === 'privacy') {
            setPostJob(false);
            setDashboard(false);
            setJobs(false);
            setCandidates(false);
            setProfileSetting(false);
            setPrivacy(true);
            setView(false);
        }
    };
    return (
        <>
            <Navigation view={view} viewFuntion={setView} />
            <div className="grid grid-cols-12 gap-x-5 bg-forBack">
                <div
                    className={
                        view
                            ? ' bg-textW gap-y-2 pt-16 col-span-12 h-screen relative flex px-20 flex-col md:min-h-screen md:px-0 md:col-span-3 xl:col-span-2'
                            : 'hidden md:relative md:flex md:flex-col bg-textW md:gap-y-2 md:pt-16 md:min-h-screen md:col-span-3 xl:col-span-2'
                    }
                >
                    <div className="flex flex-col items-center gap-y-3 mb-5 md:hidden">
                        <img src={profile} className="w-28 h-28 self-center" />
                        <div className="text-neutral-900 text-lg font-normal leading-normal">Jane Doe</div>
                    </div>
                    <div
                        onClick={() => handleNavigation('postJob')}
                        className={
                            postJob
                                ? 'flex pl-5 items-center bg-orange-100 py-3 gap-x-4 text-orange-600 cursor-pointer w-full lg:pl-10'
                                : 'flex pl-5 text-stone-400 items-center group py-3 gap-x-4 cursor-pointer w-full hover:bg-orange-100 hover:text-orange-600 lg:pl-10'
                        }
                    >
                        <div
                            className={
                                postJob
                                    ? 'bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW rounded-md border-0'
                                    : 'group-hover:bg-gradient-to-r group-hover:from-gradientFirst group-hover:to-gradientSecond bg-stone-400 text-textW rounded-md border-0 '
                            }
                        >
                            <AddIcon />
                        </div>
                        <p className=" text-xl font-medium leading-loose">Post Job</p>
                    </div>
                    <div
                        onClick={() => handleNavigation('dashboard')}
                        className={
                            dashboard
                                ? 'flex pl-4 items-center bg-orange-100 text-orange-600 py-3 gap-x-3 cursor-pointer w-full lg:pl-9'
                                : 'flex pl-4 items-center py-3 gap-x-3 text-stone-400 w-full hover:bg-orange-100 hover:text-orange-600 cursor-pointer lg:pl-9'
                        }
                    >
                        <div className=" rounded-md border-0">
                            <AssessmentIcon sx={{ fontSize: '1.9rem' }} />
                        </div>
                        <p className="text-xl font-medium leading-loose">Analytics</p>
                    </div>
                    <div
                        onClick={() => handleNavigation('jobs')}
                        className={
                            jobs
                                ? 'flex pl-4 items-center bg-orange-100 text-orange-600 py-3 gap-x-3 cursor-pointer w-full lg:pl-9'
                                : 'flex pl-4 items-center py-3 gap-x-3 text-stone-400 w-full hover:bg-orange-100 hover:text-orange-600 cursor-pointer lg:pl-9'
                        }
                    >
                        <div className=" rounded-md border-0">
                            <BusinessCenterIcon sx={{ fontSize: '1.9rem' }} />
                        </div>
                        <p className="text-xl font-medium leading-loose">Jobs</p>
                    </div>
                    <div
                        onClick={() => handleNavigation('candidates')}
                        className={
                            candidates
                                ? 'flex pl-4 items-center bg-orange-100 text-orange-600 py-3 gap-x-3 cursor-pointer w-full lg:pl-9'
                                : 'flex pl-4 items-center py-3 gap-x-3 text-stone-400 w-full hover:bg-orange-100 hover:text-orange-600 cursor-pointer lg:pl-9'
                        }
                    >
                        <div className=" rounded-md border-0">
                            <PeopleIcon sx={{ fontSize: '1.9rem' }} />
                        </div>
                        <p className="text-xl font-medium leading-loose">Candidates</p>
                    </div>
                    <div
                        onClick={() => handleNavigation('profileSetting')}
                        className={
                            profileSetting
                                ? 'flex pl-4 items-center bg-orange-100 text-orange-600 py-2 gap-x-3 cursor-pointer w-full lg:pl-9'
                                : 'flex pl-4 items-center py-2 gap-x-3 text-stone-400 w-full hover:bg-orange-100 hover:text-orange-600 cursor-pointer lg:pl-9'
                        }
                    >
                        <div className=" rounded-md border-0">
                            <SettingsSuggestIcon sx={{ fontSize: '1.9rem' }} />
                        </div>
                        <p className="text-xl font-medium leading-loose">Profile</p>
                    </div>
                    <div
                        onClick={() => handleNavigation('privacy')}
                        className={
                            privacy
                                ? 'flex pl-4 items-center bg-orange-100 text-orange-600 py-2 gap-x-3 cursor-pointer w-full lg:pl-9'
                                : 'flex pl-4 items-center py-2 gap-x-3 text-stone-400 w-full hover:bg-orange-100 hover:text-orange-600 cursor-pointer lg:pl-9'
                        }
                    >
                        <div className=" rounded-md border-0">
                            <ShieldIcon sx={{ fontSize: '1.9rem' }} />
                        </div>
                        <p className="text-xl font-medium leading-loose">Security</p>
                    </div>
                    <div className="left-0 flex pl-4 items-center py-2 gap-x-3 text-stone-400 w-full hover:bg-orange-100 hover:text-orange-600 cursor-pointer md:absolute md:bottom-3 lg:pl-9">
                        <div className=" rounded-md border-0">
                            <LogoutIcon sx={{ fontSize: '1.9rem' }} />
                        </div>
                        <p className="text-xl font-medium leading-loose">Logout</p>
                    </div>
                </div>
                <div
                    className={
                        view && postJob
                            ? 'hidden md:grid md:col-span-9 xl:col-span-10 xl:bg-textW xl:pr-32'
                            : postJob
                            ? 'col-span-12 md:col-span-9 xl:col-span-10 xl:bg-textW xl:pr-32 employerBack'
                            : 'hidden'
                    }
                >
                    <PostAJob />
                </div>
                <div
                    className={
                        view && dashboard
                            ? 'hidden md:grid md:col-span-9 xl:col-span-10 xl:bg-textW xl:pr-32'
                            : dashboard
                            ? 'col-span-12 md:col-span-9 xl:col-span-10 xl:bg-textW xl:pr-32'
                            : 'hidden'
                    }
                >
                    <Dashboard changeFunction={handleNavigation} />
                </div>
                <div
                    className={
                        view && jobs
                            ? 'hidden md:grid md:col-span-9 xl:col-span-10 xl:bg-textW xl:pr-32'
                            : jobs
                            ? 'col-span-12 md:col-span-9 xl:col-span-10 xl:bg-textW xl:pr-32'
                            : 'hidden'
                    }
                >
                    <Jobs />
                </div>
                <div
                    className={
                        view && candidates
                            ? 'hidden md:grid md:col-span-9 xl:col-span-10 xl:bg-textW xl:pr-32'
                            : candidates
                            ? 'col-span-12 md:col-span-9 xl:col-span-10 xl:bg-textW xl:pr-32'
                            : 'hidden'
                    }
                >
                    <Candidates />
                </div>
                <div
                    className={
                        view && profileSetting
                            ? 'hidden md:grid md:col-span-9 xl:col-span-10 xl:bg-textW xl:pr-32'
                            : profileSetting
                            ? 'col-span-12 md:col-span-9 xl:col-span-10 xl:bg-textW xl:pr-32'
                            : 'hidden'
                    }
                >
                    <EmployerProfile />
                </div>
                <div
                    className={
                        view && privacy
                            ? 'hidden md:grid md:col-span-9 xl:col-span-10 xl:bg-textW xl:pr-32'
                            : privacy
                            ? 'col-span-12 md:col-span-9 xl:col-span-10 xl:bg-textW xl:pr-32'
                            : 'hidden'
                    }
                >
                    <Privacy />
                </div>
            </div>
        </>
    );
};
export default employeeAuth(AdminJob);
