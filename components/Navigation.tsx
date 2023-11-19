import React, { useEffect, useState } from 'react';
import { getAccount, getRole, signOut } from '@/lib/accountBackend';
import { getCandidateDocument } from '@/lib/candidateBackend';
import { getProfileData } from '@/lib/employerBackend'
import styles from '@/styles/navigation.module.css';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Link from 'next/link';
import { Popover } from '@headlessui/react';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ConfirmModal from './ConfirmModal';
/* import { useRouter } from 'next/router';
 */import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { toast } from 'react-toastify';
import { ProfilePic } from './JobImage';
import Image from 'next/image';
import Logout from './Logout';
const Navigation = (props: any) => {
    const logo = '/images/logo.svg';
    const loadingIn = '/images/loading.svg';
    const [menu, setMenu] = useState(false);
    const [userData, setUserData] = useState<any>();
    const [userRole, setUserRole] = useState('');
    const [userDetail, setUserDetail] = useState<any>();
    const [openLogout, setOpenLogout] = useState(false);
    const [loading, setLoading] = useState(true);
    /* const router = useRouter(); */
    const getUserData = async () => {
        const userInfo = await getAccount();
        if (userInfo !== 'failed') {
            setLoading(false);
            setUserData(userInfo);
            const role = await getRole();
            role && setUserRole(role.documents[0].userRole);

            if (role && role.documents[0].userRole == 'candidate') {
                const candidate = await getCandidateDocument();
                if (candidate) {
                    setUserDetail(candidate.documents[0]);
                }
            }
            if (role && role.documents[0].userRole == 'employer') {
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
    /* const handleLogout = () => {
        setLogLoading(true);
        signOut().then((res) => {
            setLogLoading(false);
            toast.success('Successfully Logged Out');
            setOpenLogout(false);
            typeof window !== 'undefined' && router.push('/');
            typeof window !== 'undefined' && router.reload();
        });
    }; */
    useEffect(() => {
        getUserData();
    }, []);
    return (
        <div>
            <div className="flex flex-wrap gap-5 pt-3  md:border-2 md:border-t-0 xl:px-40">
                <div className='md:max-lg:w-full flex justify-center'>
                    <Link href="/">
                        <img src={logo} alt="Image description" className="w-[160px] h-[70px]" />
                    </Link>
                </div>
                {menu && (
                    <div className="fixed bg-textW -mt-[0.7rem] h-screen w-screen flex flex-col z-40 md:hidden">
                        <div onClick={() => setMenu(!menu)} className="flex items-center justify-end pt-4 pr-2 cursor-pointer">
                            <CloseOutlinedIcon className="text-[3rem]" />
                        </div>
                        <div className="flex justify-center">
                            <Link href="/">
                                <img src={logo} alt="Image description" className="w-[160px] h-[70px]" />

                                {/*                                 <img src={logo} alt="palmjobs logo" className="h-16" />
 */}                            </Link>
                        </div>
                        <div className="relative flex mt-5 items-center justify-center gap-x-5">
                            {userDetail && userDetail.profilePictureId && (
                                <div className="w-14 h-14 ">
                                    <ProfilePic id={userDetail.profilePictureId} className="w-full h-full border-0 rounded-full outline-0 ring-none"
                                    />
                                </div>
                            )}
                            {userData && (
                                <div className="flex flex-col">
                                    {userRole == 'candidate' ? <p className="text-[1.2rem] font-[500]">{userData.name}</p> : null}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-left px-3">
                            <div className="flex flex-col gap-y-5 pt-7 text-[1.5rem] w-full">
                                <Link href="/jobs" className="border-b-2 pb-2 text-lg">
                                    Find a Job
                                </Link>
                                <p className="border-b-2 pb-2 text-lg">Craft Resume</p>
                                <Link href="/salaries" className="border-b-2 pb-2 text-lg">
                                    Salaries
                                </Link>
                                {!userData && (
                                    <>
                                        <Link href="/account" className="border-b-2 pb-2 text-lg">Sign in</Link>
                                        <Link
                                            href="/users/employer"
                                            className="text-textW flex items-center gap-2 justify-center bg-black h-14 w-full rounded-[3px] hover:border-b-4 hover:border-b-gradientFirst buttonBounce"
                                        >
                                            <img src="/icons/HireLeaf.svg" alt="icon" className='w-5 h-5' />
                                            <p className='font-[400] text-[16px]'>Hire Talent</p>
                                        </Link>
                                    </>
                                )}
                                {userRole == 'candidate' ? (
                                    <Link href="/users/candidate" className="border-b-2 text-xl pb-2 col-span-3 lg:col-span-3 xl:col-span-3 cursor-poniter">
                                        my jobs
                                    </Link>
                                ) : userRole == 'employer' ? (
                                    <Link href="/users/employer" className="border-b-2 text-xl pb-2 col-span-3 lg:col-span-3 xl:col-span-3 cursor-pointer">
                                        Dashboard
                                    </Link>
                                ) : null}
                                {userRole == 'candidate' ? (
                                    <>
                                        <Link
                                            href="/users/candidate/profile"
                                            className="border-b-2 pb-2 col-span-3 text-xl lg:col-span-3 xl:col-span-3 cursor-pointer"
                                        >
                                            <span>Profile</span>
                                        </Link>
                                        <Link
                                            href="/users/candidate/settings"
                                            className="border-b-2 pb-2 col-span-3 text-xl lg:col-span-3 xl:col-span-3 cursor-pointer"
                                        >
                                            <span>Setting</span>
                                        </Link>
                                    </>
                                ) : userRole == 'employer' ? (
                                    <Link href="/users/employer/" className="border-b-2 text-xl pb-2 col-span-3 lg:col-span-3 xl:col-span-3 cursor-pointer">
                                        <span>Profile</span>
                                    </Link>
                                ) : null}

                                {userData && (
                                    <div
                                        onClick={() => {
                                            setMenu(false)
                                            setOpenLogout(!openLogout)
                                        }}
                                        className="flex gap-x-3 text-[1.5rem] text-xl cursor-pointer items-center"
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
                <div className="hidden flex-grow items-center lg:text-bigS lg:font-bigW lg:leading-bigL lg:text-textR md:flex md:items-center md:gap-x-7">
                    <Link href="/jobs" className="border-b-[3px] h-full border-b-textW font-[600] flex items-center hover:border-b-gradientFirst">
                        Find a Job
                    </Link>
                    <p className="border-b-[3px] border-b-textW h-full flex items-center font-[600] hover:border-b-gradientFirst">Craft Resume</p>
                    <Link href="/salaries" className="border-b-[3px] border-b-textW h-full flex font-[600] items-center hover:border-b-gradientFirst">
                        Salaries
                    </Link>
                    {userRole == 'candidate' ? (
                        <Link href="/users/candidate" className="border-b-[3px] border-b-textW font-[600] h-full flex items-center hover:border-b-gradientFirst">
                            My jobs
                        </Link>
                    ) : userRole == 'employer' ? (
                        <Link href="/users/employer" className=" font-[600] cursor-pointer">
                            Dashboard
                        </Link>
                    ) : null}
                </div>
                <div className='max-md:flex max-md:items-end max-md:flex-grow max-md:justify-end'>
                    <div className="flex items-center justify-end gap-x-10 md:hidden">
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
                    <div className="flex pt-2 gap-8">
                        {!userData && !loading && (
                            <>
                                <div className="max-md:hidden flex items-center">
                                    <div className="font-[400] text-[16px] ">
                                        <Link href="/account">Sign In</Link>
                                    </div>
                                </div>
                                <div className="hidden justify-items-end md:flex md:items-center mb-[2px]">
                                    <Link
                                        href="/users/employer"
                                        className="text-textW flex items-center gap-2 justify-center bg-black h-[42px] w-[166px] rounded-[3px] hover:border-b-4 hover:border-b-gradientFirst buttonBounce"
                                    >
                                        <img src="/icons/HireLeaf.svg" alt="icon" className='w-5 h-5' />
                                        <p className='font-[400] text-[16px]'>Hire Talent</p>
                                    </Link>
                                </div>
                            </>
                        )}
                        {userData && (
                            <div className="hidden sm:relative md:flex items-center justify-end gap-x-2 col-span-3 md:col-span-12">
                                <div className="flex items-center lg:text-[0.9rem] px-2 py-2 gap-3 text-stone-500 bg-gray-50 rounded-full">
                                    <Popover className="focus:ring-0 focus:border-0 focus:outline-0">
                                        <Popover.Button className="focus:ring-0 focus:border-0 focus:outline-0 flex items-center text-stone-500">
                                            {userDetail && userDetail.profilePictureId && (
                                                <div className="w-10 h-10 ">
                                                    <ProfilePic id={userDetail.profilePictureId} className="w-full h-full border-0 rounded-full outline-0 ring-none"
                                                    />
                                                </div>
                                            )}
                                            {userData && (
                                                <div className="flex text-left ml-3 justify-center items-center ">
                                                    {userRole == 'candidate' ? <p className="text-[16px] font-[600]">{userData.name}</p> : null}
                                                    {userRole == 'employer' ? (
                                                        <>
                                                            {userDetail && (
                                                                <p className="text-[16px] font-[600]">
                                                                    {userDetail.companyName && userDetail.companyName}
                                                                </p>
                                                            )}
                                                        </>
                                                    ) : null}

                                                </div>
                                            )}
                                        </Popover.Button>
                                        <Popover.Panel className="absolute right-0 border-2 rounded-md flex flex-col gap-y-3 p-3 bg-textW shadow z-10 w-[8rem] md:mt-3 lg:mt-8">
                                            {userRole == 'candidate' ? (
                                                <>
                                                    {' '}
                                                    <Link
                                                        href="/users/candidate/profile"
                                                        className="flex gap-x-3 text-[0.8rem] cursor-pointer items-center text-stone-400 hover:text-stone-700"
                                                    >
                                                        <ManageAccountsOutlinedIcon sx={{ fontSize: '1rem' }} />
                                                        <span>Profile</span>
                                                    </Link>
                                                    <Link
                                                        href="/users/candidate/settings"
                                                        className="flex gap-x-3 text-[0.8rem] cursor-pointer items-center text-stone-400 hover:text-stone-700"
                                                    >
                                                        <SettingsOutlinedIcon sx={{ fontSize: '1rem' }} />
                                                        <span>Setting</span>
                                                    </Link>
                                                </>
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
                                    <KeyboardArrowDownOutlinedIcon />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Logout openLogout={openLogout} setOpenLogout={setOpenLogout} />
        </div >
    );
};
export default Navigation;
