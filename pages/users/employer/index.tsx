import Navigation from '@/components/Navigation';
import AddIcon from '@mui/icons-material/Add';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PeopleIcon from '@mui/icons-material/People';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import PostAJob from '../../../components/employerComponents/EmployerPostJob';
import styles from '@/styles/navigation.module.css';
import ShieldIcon from '@mui/icons-material/Shield';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import Dashboard from '@/components/employerComponents/Dashoboard';
import Jobs from '@/components/employerComponents/Jobs';
import Candidates from '@/components/employerComponents/Candidates';
import EmployerProfile from '@/components/employerComponents/EmployerProfile';
import Privacy from '@/components/employerComponents/Privacy';
import { employeeAuth } from '@/components/withAuth';
import ConfirmModal from '@/components/ConfirmModal';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useRouter } from 'next/dist/client/router';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { getAccount, signOut } from '@/lib/accountBackend'
import { getProfileData, } from '@/lib/employerBackend';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { ProfilePic } from '@/components/JobImage';
const AdminJob = () => {
    const logo = '/images/logo.svg';
    const router = useRouter();
    const loadingIn = '/images/loading.svg';
    const [postJob, setPostJob] = useState(true);
    const [dashboard, setDashboard] = useState(false);
    const [jobs, setJobs] = useState(false);
    const [candidates, setCandidates] = useState(false);
    const [profileSetting, setProfileSetting] = useState(false);
    const [privacy, setPrivacy] = useState(false);
    const [view, setView] = useState(false);
    const [openLogout, setOpenLogout] = useState(false);
    const [userData, setUserData] = useState<any>();
    const [userDetail, setUserDetail] = useState<any>();
    const [menu, setMenu] = useState(false);
    const [editedJobId, setEditedJobId] = useState('');
    const [logLoading, setLogLoading] = useState(false);
    const [applicants, setApplicant] = useState('')
    useEffect(() => {
        if (applicants !== '') {
            setJobs(false);
            setCandidates(true)
        }
    }, [applicants])
    const handleNavigation = (name: string) => {
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
    const handleLogout = () => {
        setLogLoading(true);
        signOut().then((res) => {
            setLogLoading(false);
            toast.success('Successfully Logged Out');
            setOpenLogout(false);
            typeof window !== 'undefined' && router.push('/');
            typeof window !== 'undefined' && router.reload();
        });
    };
    const getUserData = async () => {
        const userInfo = await getAccount();
        if (userInfo !== 'failed') {
            setUserData(userInfo);
            const employer = await getProfileData();
            if (employer) {
                setUserDetail(employer.documents[0]);
            }
        }
    };
    /*  const getHref = (id: string) => {
         const { href } = getProfilePicture(id);
         return href;
     }; */
    useEffect(() => {
        getUserData();
    }, []);
    return (
        <>
            <div className="flex justify-between items-center pr-5 md:pr-0 md:flex md:pl-5 md:pt-5">
                <Link href="/">
                    <img src={logo} alt="palmjobs logo" className="h-20 md:hidden" />
                </Link>
                <div
                    onClick={() => {
                        setMenu(!menu);
                    }}
                    className={`${styles['hamburger-menu']} md:hidden`}
                >
                    <div className={styles['bar']}></div>
                    <div className={styles['bar']}></div>
                    <div className={styles['bar']}></div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-x-5 bg-forBack relative">
                <div className=' md:fixed bg-textW md:w-3/12 xl:w-2/12'>
                    <Link href="/">
                        <img src={logo} alt="palmjobs logo" className=" h-20 max-md:hidden" />
                    </Link>
                    <div
                        className={
                            menu
                                ? 'fixed top-0 h-screen overflow-auto flex flex-col w-screen z-40 bg-textW gap-y-2 col-span-12 pt-16 px-20 flex-col md:min-h-screen md:px-0 md:col-span-3 xl:col-span-2'
                                : 'hidden md:relative md:flex md:flex-col bg-textW md:gap-y-2 md:pt-16 md:min-h-screen md:col-span-3 xl:col-span-2'
                        }
                    >
                        <div
                            onClick={() => setMenu(!menu)}
                            className="absolute top-0 right-0 flex items-center md:hidden justify-end pb-4 pr-2 cursor-pointer"
                        >
                            <CloseOutlinedIcon className="text-[3rem]" />
                        </div>
                        <div className="flex flex-col items-center gap-y-3 mb-5 md:hidden">
                            {userDetail && userDetail.profilePictureId && (
                                <ProfilePic id={userDetail.profilePictureId} className="w-28 h-28 self-center" />
                            )}
                            {userDetail && (
                                <div className="text-neutral-900 text-lg font-normal leading-normal">
                                    {userDetail.companyName && userDetail.companyName}
                                </div>
                            )}
                        </div>
                        <div
                            onClick={() => {
                                handleNavigation('postJob');
                                setMenu(false);
                            }}
                            className={
                                postJob
                                    ? 'flex pl-5 items-center bg-skillColor py-3 gap-x-4 text-gradientFirst cursor-pointer w-full lg:pl-10'
                                    : 'flex pl-5 text-stone-400 items-center group py-3 gap-x-4 cursor-pointer w-full hover:bg-skillColor hover:text-gradientFirst lg:pl-10'
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
                            onClick={() => {
                                handleNavigation('dashboard');
                                setMenu(false);
                            }}
                            className={
                                dashboard
                                    ? 'flex pl-4 items-center bg-skillColor text-gradientFirst py-3 gap-x-3 cursor-pointer w-full lg:pl-9'
                                    : 'flex pl-4 items-center py-3 gap-x-3 text-stone-400 w-full hover:bg-skillColor hover:text-gradientFirst cursor-pointer lg:pl-9'
                            }
                        >
                            <div className=" rounded-md border-0">
                                <AssessmentIcon sx={{ fontSize: '1.9rem' }} />
                            </div>
                            <p className="text-xl font-medium leading-loose">Analytics</p>
                        </div>
                        <div
                            onClick={() => {
                                handleNavigation('jobs');
                                setMenu(false);
                            }}
                            className={
                                jobs
                                    ? 'flex pl-4 items-center bg-skillColor text-gradientFirst py-3 gap-x-3 cursor-pointer w-full lg:pl-9'
                                    : 'flex pl-4 items-center py-3 gap-x-3 text-stone-400 w-full hover:bg-skillColor hover:text-gradientFirst cursor-pointer lg:pl-9'
                            }
                        >
                            <div className=" rounded-md border-0">
                                <BusinessCenterIcon sx={{ fontSize: '1.9rem' }} />
                            </div>
                            <p className="text-xl font-medium leading-loose">Jobs</p>
                        </div>
                        <div
                            onClick={() => {
                                handleNavigation('candidates');
                                setMenu(false);
                            }}
                            className={
                                candidates
                                    ? 'flex pl-4 items-center bg-skillColor text-gradientFirst py-3 gap-x-3 cursor-pointer w-full lg:pl-9'
                                    : 'flex pl-4 items-center py-3 gap-x-3 text-stone-400 w-full hover:bg-skillColor hover:text-gradientFirst cursor-pointer lg:pl-9'
                            }
                        >
                            <div className=" rounded-md border-0">
                                <PeopleIcon sx={{ fontSize: '1.9rem' }} />
                            </div>
                            <p className="text-xl font-medium leading-loose">Applicants</p>
                        </div>
                        <div
                            onClick={() => {
                                handleNavigation('profileSetting');
                                setMenu(false);
                            }}
                            className={
                                profileSetting
                                    ? 'flex pl-4 items-center bg-skillColor text-gradientFirst py-2 gap-x-3 cursor-pointer w-full lg:pl-9'
                                    : 'flex pl-4 items-center py-2 gap-x-3 text-stone-400 w-full hover:bg-skillColor hover:text-gradientFirst cursor-pointer lg:pl-9'
                            }
                        >
                            <div className=" rounded-md border-0">
                                <SettingsSuggestIcon sx={{ fontSize: '1.9rem' }} />
                            </div>
                            <p className="text-xl font-medium leading-loose">Profile</p>
                        </div>
                        <div
                            onClick={() => {
                                handleNavigation('privacy');
                                setMenu(false);
                            }}
                            className={
                                privacy
                                    ? 'flex pl-4 items-center bg-skillColor text-gradientFirst py-2 gap-x-3 cursor-pointer w-full lg:pl-9'
                                    : 'flex pl-4 items-center py-2 gap-x-3 text-stone-400 w-full hover:bg-skillColor hover:text-gradientFirst cursor-pointer lg:pl-9'
                            }
                        >
                            <div className=" rounded-md border-0">
                                <ShieldIcon sx={{ fontSize: '1.9rem' }} />
                            </div>
                            <p className="text-xl font-medium leading-loose">Security</p>
                        </div>
                        <div
                            onClick={() => {
                                setOpenLogout(!openLogout);
                                setMenu(false);
                            }}
                            className="left-0 flex pl-4 items-center py-2 gap-x-3 text-stone-400 w-full hover:bg-skillColor hover:text-gradientFirst cursor-pointer  lg:pl-9"
                        >
                            <div className=" rounded-md border-0">
                                <LogoutIcon sx={{ fontSize: '1.9rem' }} />
                            </div>
                            <p className="text-xl font-medium leading-loose">Logout</p>
                        </div>
                    </div>
                </div>
                <div className='col-span-12 md:col-start-4 xl:col-start-3 md:col-end-13'>
                    <div
                        className={
                            view && postJob
                                ? 'hidden md:grid md:col-span-9 xl:col-span-10 xl:bg-textW xl:pr-32'
                                : postJob
                                    ? 'col-span-12 md:col-span-9 xl:col-span-10 xl:bg-textW xl:pr-32 employerBack'
                                    : 'hidden'
                        }
                    >
                        <PostAJob editedJobId={editedJobId} />
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
                        <Jobs postJob={handleNavigation} setEditedJobId={setEditedJobId} applicants={setApplicant} />
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
                        <Candidates postJob={handleNavigation} applicantJobId={applicants} />
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
            </div>
            <ConfirmModal isOpen={openLogout} handleClose={() => setOpenLogout(!openLogout)}>
                <div className="mx-2 pb-10 w-full pl-5 bg-textW rounded-2xl flex flex-col gap-y-5 items-center justify-center pt-10 md:pl-8 pr-5 md:w-2/3 lg:w-1/2 md:mx-0">
                    <p className="col-span-12 text-black font-semibold leading-10 md:text-3xl">Are you sure you want to logout ?</p>
                    <div className="flex gap-x-10 max-sm:flex-col max-sm:gap-y-3">
                        <button
                            onClick={() => setOpenLogout(!openLogout)}
                            type="button"
                            className="bg-gradientSecond hover:bg-gradient-to-r text-textW hover:from-gradientFirst hover:to-gradientSecond h-16 w-48 rounded-full  order-1 col-span-12 sm:order-2 sm:col-span-6 xl:col-span-3"
                        >
                            No
                        </button>
                        {logLoading && (
                            <img
                                src={loadingIn}
                                className="text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center h-16 w-48 rounded-full  order-1 col-span-12 sm:order-2 sm:col-span-6 xl:col-span-3"
                            />
                        )}
                        {!logLoading && (
                            <button
                                onClick={handleLogout}
                                type="button"
                                className="bg-gradientSecond hover:bg-gradient-to-r text-textW hover:from-gradientFirst hover:to-gradientSecond h-16 w-48 rounded-full  order-1 col-span-12 sm:order-2 sm:col-span-6 xl:col-span-3"
                            >
                                Yes
                            </button>
                        )}
                    </div>
                </div>
            </ConfirmModal>
        </>
    );
};
export default employeeAuth(AdminJob);
