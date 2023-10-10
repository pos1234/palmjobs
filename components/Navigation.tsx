import React, { useEffect, useState } from 'react';
import { getAccount, getCandidateInfo, getProfileData, getProfilePicture, getRole, signOut } from '@/lib/services';
import styles from '@/styles/navigation.module.css';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Link from 'next/link';
import { Popover } from '@headlessui/react';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ConfirmModal from './ConfirmModal';
import { useRouter } from 'next/dist/client/router';
import { toast, ToastContainer } from 'react-toastify';
const Navigation = (props: any) => {
    const logo = '/images/logo.svg';
    const loadingIn = '/images/loading.svg';
    const [choosen, setChoosen] = useState('');
    const [menu, setMenu] = useState(false);
    const [userData, setUserData] = useState<any>();
    const [userRole, setUserRole] = useState('');
    const [userDetail, setUserDetail] = useState<any>();
    const [openLogout, setOpenLogout] = useState(false);
    const [loading, setLoading] = useState(true);
    const [logLoading, setLogLoading] = useState(false);
    const router = useRouter();
    const getUserData = async () => {
        const userInfo = await getAccount();
        if (userInfo !== 'failed') {
            setLoading(false);
            setUserData(userInfo);
            const role = await getRole(userInfo.$id);
            setUserRole(role.documents[0].userRole);
            console.log(role.documents[0].userRole);

            if (role.documents[0].userRole == 'candidate') {
                const candidate = await getCandidateInfo();
                if (candidate) {
                    setUserDetail(candidate.documents[0]);
                }
            }
            if (role.documents[0].userRole == 'employer') {
                const employer = await getProfileData();
                if (employer) {
                    setUserDetail(employer.documents[0]);
                }
            }
        }
        if (userInfo == 'failed') {
            setLoading(false);
        }
    };
    const getHref = (id: string) => {
        const { href } = getProfilePicture(id);
        return href;
    };
    const handleLogout = () => {
        setLogLoading(true);
        signOut().then((res) => {
            setLogLoading(false);
            toast.success('Successfully Logged Out');
            setOpenLogout(false);
            router.push('/');
            router.reload();
        });
    };
    useEffect(() => {
        getUserData();
    }, []);
    return (
        <div>
            <ToastContainer />
            <div className="grid grid-cols-12 pt-3  md:border-b-2">
                <div className="col-span-6 md:col-span-12 md:max-lg:flex md:max-lg:justify-center lg:col-span-2">
                    <Link href="/">
                        <img src={logo} alt="palmjobs logo" className=" h-16 md:h-20" />
                    </Link>
                </div>

                <div className="col-span-6 flex items-center justify-end gap-x-10 md:hidden">
                    {!userData && (
                        <div className="text-fhS leading-fhL font-fhW text-textR">
                            <Link href="/account">Sign in</Link>
                        </div>
                    )}
                    <div
                        onClick={() => {
                            if (props.viewFuntion && props.view) {
                                props.viewFuntion(!props.view);
                            }
                            setMenu(!menu);
                        }}
                        className={styles['hamburger-menu']}
                    >
                        <div className={styles['bar']}></div>
                        <div className={styles['bar']}></div>
                        <div className={styles['bar']}></div>
                    </div>
                </div>
                {menu && (
                    <div className="fixed bg-textW -ml-[0.7rem] -mt-[0.7rem] h-screen flex flex-col w-full z-40 md:hidden">
                        <div onClick={() => setMenu(!menu)} className="flex items-center justify-end pt-4 pr-2 cursor-pointer">
                            <CloseOutlinedIcon className="text-[3rem]" />
                        </div>
                        <div className="flex justify-center">
                            <Link href="/">
                                <img src={logo} alt="palmjobs logo" className=" h-20" />
                            </Link>
                        </div>
                        <div className="relative flex mt-5 items-center justify-center gap-x-2">
                            {userDetail && userDetail.profilePictureId && (
                                <div className="w-16 h-16 ">
                                    <img
                                        className="w-full h-full border-0 rounded-xl outline-0 ring-none"
                                        src={getHref(userDetail.profilePictureId)}
                                        alt="profile"
                                    />
                                </div>
                            )}
                            {userData && (
                                <div className="flex flex-col">
                                    {userRole == 'candidate' ? <p className="text-[1.5rem] font-[600]">{userData.name}</p> : null}
                                    {userRole == 'candidate'
                                        ? userDetail && <p className="text-[1rem] text-stone-500">{userDetail.bioHeadline}</p>
                                        : null}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-center">
                            <div className="flex flex-col gap-y-5 pt-7 text-[1.5rem]">
                                <Link href="/jobs" className=" text-left">
                                    Find a Job
                                </Link>
                                <p>Craft Resume</p>
                                {!userData && (
                                    <>
                                        <div className="">
                                            <Link href="/account">Sign in</Link>
                                        </div>

                                        <Link
                                            href="/users/employer"
                                            className="text-textW flex items-center justify-center bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-56 rounded-xl md:w-32 md:max-lg:h-12  lg:w-40 xl:w-56"
                                        >
                                            <BorderColorIcon sx={{ fontSize: '1.2rem', marginRight: '0.2rem' }} /> Hire Talent
                                        </Link>
                                    </>
                                )}
                                {userRole == 'candidate' ? (
                                    <Link href="/users/candidate" className=" col-span-3 lg:col-span-3 xl:col-span-3 cursor-poniter">
                                        my jobs
                                    </Link>
                                ) : userRole == 'employer' ? (
                                    <Link href="/users/employer" className=" col-span-3 lg:col-span-3 xl:col-span-3 cursor-pointer">
                                        Dashboard
                                    </Link>
                                ) : null}
                                {userRole == 'candidate' ? (
                                    <Link
                                        href="/users/candidate/profile"
                                        className=" col-span-3 lg:col-span-3 xl:col-span-3 cursor-pointer"
                                    >
                                        <span>Profile</span>
                                    </Link>
                                ) : userRole == 'employer' ? (
                                    <Link href="/users/employer/" className=" col-span-3 lg:col-span-3 xl:col-span-3 cursor-pointer">
                                        <span>Profile</span>
                                    </Link>
                                ) : null}
                                {/*                                 <p>Notification</p>
                                 */}
                                {userData && (
                                    <div
                                        onClick={() => setOpenLogout(!openLogout)}
                                        className="flex gap-x-3 text-[1.5rem] cursor-pointer items-center"
                                    >
                                        <span>Logout</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="text-[12px] justify-around items-end absolute bottom-20 w-full font-midRW leading-midRL text-lightGrey flex">
                            <p>2023. YES</p>
                            <p>Privacy Policy</p>
                            <p>Terms and Conditions</p>
                        </div>
                    </div>
                )}
                <div className="hidden lg:text-bigS lg:font-bigW lg:leading-bigL lg:text-textR md:col-span-6 md:flex md:items-center md:gap-x-7 md:grid-cols-12 lg:col-span-5 xl:col-span-4">
                    <Link href="/jobs" className=" col-span-4 lg:col-span-4 xl:col-span-4">
                        Find a Job
                    </Link>
                    <p className="col-span-5 lg:col-span-5 xl:col-span-5">Craft Resume</p>
                    {userRole == 'candidate' ? (
                        <Link href="/users/candidate" className=" col-span-3 lg:col-span-3 xl:col-span-3 cursor-poniter">
                            My jobs
                        </Link>
                    ) : userRole == 'employer' ? (
                        <Link href="/users/employer" className=" col-span-3 lg:col-span-3 xl:col-span-3 cursor-pointer">
                            Dashboard
                        </Link>
                    ) : null}
                </div>
                <div className="grid grid-cols-12 pt-3 md:pt-0 col-span-6 md:col-span-6 md:flex  md:justify-end lg:col-span-5 xl:col-span-6">
                    {!userData && !loading && (
                        <>
                            <div className="max-md:hidden md:col-span-12 lg:col-span-7 flex items-center">
                                <div className="text-right pt-1 text-fhS leading-fhL font-fhW text-textR md:max-lg:text-left lg:text-dfhS lg:leading-dfhL lg:font-bigW md:pr-3 lg:-mt-1">
                                    <Link href="/account">Sign in</Link>
                                </div>
                            </div>
                            <div className="hidden justify-items-end col-span-3 md:flex md:items-center mb-[2px] md:col-span-12 lg:col-span-5 ">
                                <Link
                                    href="/users/employer"
                                    className="text-textW flex items-center justify-center bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-56 rounded-xl md:w-32 md:max-lg:h-12  lg:w-40 xl:w-56"
                                >
                                    <BorderColorIcon sx={{ fontSize: '1.2rem', marginRight: '0.2rem' }} /> Hire Talent
                                </Link>
                            </div>
                        </>
                    )}
                    {userData && (
                        <div className="hidden sm:relative md:flex items-center justify-end gap-x-2 col-span-3 md:col-span-12">
                            <div className="px-2 py-1 text-stone-500 border-r-2 border-stone-300 hover:text-orange-500 cursor-pointer">
                                <NotificationsOutlinedIcon />
                            </div>

                            <div className="flex items-center pl-0 sm:pl-2 lg:text-[0.9rem] px-2 py-1 text-stone-500 ">
                                <Popover className="focus:ring-0 focus:border-0 focus:outline-0">
                                    <Popover.Button className="focus:ring-0 focus:border-0 focus:outline-0 px-2 flex text-stone-500">
                                        {userDetail && userDetail.profilePictureId && (
                                            <div className="w-10 h-10 ">
                                                <img
                                                    className="w-full h-full border-0 rounded-xl outline-0 ring-none"
                                                    src={getHref(userDetail.profilePictureId)}
                                                    alt="profile"
                                                />
                                            </div>
                                        )}
                                        {userData && (
                                            <div className="flex flex-col text-left ml-3 justify-center">
                                                {userRole == 'candidate' ? <p className="text-[16px] font-[600]">{userData.name}</p> : null}
                                                {userRole == 'candidate'
                                                    ? userDetail && <p className="text-[12px] text-stone-500">{userDetail.bioHeadline}</p>
                                                    : null}
                                                {userRole == 'employer' ? (
                                                    <>
                                                        {userDetail && (
                                                            <p className="text-[16px] font-[600]">
                                                                {userDetail.companyName && userDetail.companyName}
                                                            </p>
                                                        )}
                                                    </>
                                                ) : null}
                                                {/* {userRole == 'employer'
                                                    ? userDetail && <p className="text-[12px] text-stone-500">{userDetail.bioHeadline}</p>
                                                    : null} */}
                                            </div>
                                        )}
                                    </Popover.Button>
                                    <Popover.Panel className="absolute right-0 border-2 rounded-2xl flex flex-col gap-y-3 p-3 bg-textW shadow z-10 w-[8rem] md:mt-3 lg:mt-8">
                                        {userRole == 'candidate' ? (
                                            <Link
                                                href="/users/candidate/profile"
                                                className="flex gap-x-3 text-[0.8rem] cursor-pointer items-center text-stone-400 hover:text-stone-700"
                                            >
                                                <ManageAccountsOutlinedIcon sx={{ fontSize: '1rem' }} />
                                                <span>Profile</span>
                                            </Link>
                                        ) : userRole == 'employer' ? (
                                            <Link
                                                href="/users/employer/"
                                                className="flex gap-x-3 text-[0.8rem] cursor-pointer items-center text-stone-400 hover:text-stone-700"
                                            >
                                                <ManageAccountsOutlinedIcon sx={{ fontSize: '1rem' }} />
                                                <span>Profile</span>
                                            </Link>
                                        ) : null}
                                        {userData && (
                                            <div
                                                onClick={() => setOpenLogout(!openLogout)}
                                                className="flex gap-x-3 text-[0.8rem] cursor-pointer items-center text-stone-400 hover:text-stone-700"
                                            >
                                                <LogoutOutlinedIcon sx={{ fontSize: '1rem' }} />
                                                <span>Logout</span>
                                            </div>
                                        )}
                                    </Popover.Panel>
                                </Popover>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ConfirmModal isOpen={openLogout} handleClose={() => setOpenLogout(!openLogout)}>
                <div className="mx-2 pb-10 w-full pl-5 bg-textW rounded-2xl flex flex-col gap-y-5 items-center justify-center pt-10 md:pl-8 pr-5 md:w-2/3 lg:w-1/2 md:mx-0">
                    <p className="col-span-12 text-black text-3xl font-semibold leading-10 ">Are you sure you want to logout ?</p>
                    <div className="flex gap-x-10">
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
        </div>
    );
};
export default Navigation;
