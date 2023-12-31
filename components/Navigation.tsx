'use client'
import React, { useState } from 'react';
import styles from '@/styles/navigation.module.css';
import Link from 'next/link';
import { Popover } from '@headlessui/react';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { ProfilePic } from './JobImage';
import Logout from './Logout';
import { useGlobalContext } from '@/contextApi/userData';
import { usePathname } from 'next/navigation'

const Navigation = (props: any) => {
    const { loading, userDetail, userData, userRole } = useGlobalContext()
    const logo = '/images/logo.svg';
    const [menu, setMenu] = useState(false);
    const [openLogout, setOpenLogout] = useState(false);
    const pathname = usePathname()
    return (
        <div>
            <div className={`flex flex-wrap items-center gap-5 relative md:border-[1px] md:border-t-0 xl:px-40 xl:h-[73px] ${menu ? ' max-md:h-screen md:pt-3' : 'pt-3'}`}>
                {menu && (
                    <div className="fixed bg-textW overflow-x-hidden h-screen w-screen overflow-hidden flex flex-col z-40 md:hidden">
                        <div onClick={() => setMenu(!menu)} className="flex items-center justify-end pt-4 pr-2 cursor-pointer">
                            <CloseOutlinedIcon className="text-[2rem]" />
                        </div>
                        <div className="flex justify-center">
                            <Link href="/">
                                <img src={logo} alt="Image description" className="w-[160px] h-[60px]" />
                            </Link>
                        </div>
                        <div className="relative flex mt-5 items-center justify-center gap-x-5">
                            {userDetail && userDetail.profilePictureId && (
                                <div className="w-14 h-14 ">
                                    <ProfilePic id={userDetail.profilePictureId} className="w-full h-full border-0 rounded-full outline-0 ring-none"
                                    />
                                </div>
                            )}
                            {userData && userDetail && !userDetail.profilePictureId && (
                                <div className="flex flex-col">
                                    {/*                                     {userRole == 'candidate' ?
 */}                                        <p className="text-[14px] font-[600] bg-gradientFirst text-textW border-2 border-textW ring-2 ring-gradientFirst rounded-full w-10 h-10 flex items-center justify-center">{userData.name.charAt(0).toLocaleUpperCase()}</p>
                                    {/*                                         : null}
 */}                                </div>
                            )}
                        </div>
                        <div className="flex justify-left px-3">
                            <div className="flex flex-col gap-y-5 pt-7 text-[1.5rem] w-full">
                                <Link href="/jobs" className="border-b-[1px] pb-2 text-lg">
                                    Find a Job
                                </Link>
                                {
                                    userRole !== 'employer' && <p className="border-b-[1px] pb-2 text-lg">Craft Resume</p>
                                }
                                <Link href="/salaries" className="border-b-[1px] pb-2 text-lg">
                                    Salaries
                                </Link>
                                {!loading && !userData && (
                                    <>
                                        <Link href="/account" className="border-b-[1px] pb-2 text-lg">Sign In</Link>
                                        <Link
                                            href="/account"
                                            className="text-textW flex items-center gap-2 justify-center bg-black h-14 w-full rounded-[3px] hover:border-b-[4px] hover:border-b-gradientFirst buttonBounce"
                                        >
                                            <img src="/icons/HireLeaf.svg" alt="icon" className='w-5 h-5' />
                                            <p className='font-[400] text-[16px]'>Post Job</p>
                                        </Link>
                                    </>
                                )}
                                {userRole == 'candidate' ? (
                                    <Link href="/users/candidate" className="border-b-[1px] text-lg pb-2 col-span-3 lg:col-span-3 xl:col-span-3 cursor-poniter">
                                        My Jobs
                                    </Link>
                                ) : userRole == 'employer' ? (
                                    <>
                                        <Link href="/users/employer/post" className="border-b-[1px] text-lg pb-2 col-span-3 lg:col-span-3 xl:col-span-3 cursor-pointer">
                                            Post Job
                                        </Link>
                                        <Link href="/users/employer/jobs" className="border-b-[1px] text-lg pb-2 col-span-3 lg:col-span-3 xl:col-span-3 cursor-pointer">
                                            Jobs
                                        </Link>
                                        <Link href="/users/employer/candidates" className="border-b-[1px] text-lg pb-2 col-span-3 lg:col-span-3 xl:col-span-3 cursor-pointer">
                                            Candidates
                                        </Link>
                                        <Link href="/users/employer/privacy" className="border-b-[1px] text-lg pb-2 col-span-3 lg:col-span-3 xl:col-span-3 cursor-pointer">
                                            Privacy
                                        </Link>
                                    </>
                                ) : null}
                                {userRole == 'candidate' ? (
                                    <>
                                        <Link
                                            href="/users/candidate/profile"
                                            className="border-b-[1px] pb-2 col-span-3 text-lg lg:col-span-3 xl:col-span-3 cursor-pointer"
                                        >
                                            <span>Profile</span>
                                        </Link>
                                        <Link
                                            href="/users/candidate/settings"
                                            className="border-b-[1px] pb-2 col-span-3 text-lg lg:col-span-3 xl:col-span-3 cursor-pointer"
                                        >
                                            <span>Setting</span>
                                        </Link>
                                    </>
                                ) : userRole == 'employer' ? (
                                    <Link href="/users/employer/profile" className="border-b-[1px] text-lg pb-2 col-span-3 lg:col-span-3 xl:col-span-3 cursor-pointer">
                                        <span>Profile</span>
                                    </Link>
                                ) : null}
                                {userData && (
                                    <div
                                        onClick={() => {
                                            setMenu(false)
                                            setOpenLogout(!openLogout)
                                        }}
                                        className="flex gap-x-3 text-[1.5rem] text-lg cursor-pointer items-center"
                                    >
                                        <span>Logout</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="text-[12px] mt-3 flex-grow justify-around items-end w-full font-midRW leading-midRL text-lightGrey flex">
                            <p>2023. YES</p>
                            <p>Privacy Policy</p>
                            <p>Terms and Conditions</p>
                        </div>
                    </div>
                )}
                <div className='md:max-lg:w-full flex justify-center xl:h-full xl:items-center'>
                    <Link href="/">
                        <img src={logo} alt="Image description" className="w-[100px] h-[40px] sm:w-[160px] sm:h-[60px]" />
                    </Link>
                </div>
                <div className="hidden h-[40px] sm:h-[60px] flex-grow items-center lg:text-bigS lg:font-bigW lg:leading-bigL lg:text-textR md:flex md:items-center md:gap-x-7 xl:ml-10 xl:gap-x-10">
                    <Link href="/jobs"
                        className={`border-b-[3px] h-full font-[600] flex items-center hover:border-b-gradientFirst ${pathname == '/jobs' ? 'border-b-gradientFirst' : 'border-b-textW'}`}>
                        Find a Job
                    </Link>
                    <p className="border-b-[3px] border-b-textW h-full flex items-center font-[600] hover:border-b-gradientFirst">Craft Resume</p>
                    <Link href="/salaries"
                        className={`border-b-[3px] h-full flex font-[600] items-center hover:border-b-gradientFirst ${pathname == '/salaries' ? 'border-b-gradientFirst' : 'border-b-textW'}`}>
                        Salaries
                    </Link>
                    {userRole == 'candidate' ? (
                        <Link href="/users/candidate" className={`border-b-[3px] font-[600] h-full flex items-center hover:border-b-gradientFirst ${pathname == '/users/candidate' ? 'border-b-gradientFirst' : 'border-b-textW'}`}>
                            My Jobs
                        </Link>
                    ) : userRole == 'employer' ? (
                        <Link href="/users/employer/jobs" className="border-b-[3px] border-b-textW font-[600] h-full flex items-center hover:border-b-gradientFirst">
                            Dashboard
                        </Link>
                    ) : null}
                </div>
                <div className='max-md:flex max-md:items-end max-md:flex-grow max-md:justify-end xl:h-full xl:flex'>
                    <div className="flex items-center justify-end gap-x-10 md:hidden pr-3">
                        {!userData && (
                            <div className="text-fhS leading-fhL font-fhW text-textR">
                                <Link href="/account">Sign In</Link>
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
                        </div>
                    </div>
                    <div className="flex pt-2 gap-10">
                        <>
                            {(!userData || userData == 'failed') && !loading && <div className="max-md:hidden flex items-center">
                                <div className="font-[500] text-[16px] text-[#0E121D] ">
                                    <Link href="/account">Sign In</Link>
                                </div>
                            </div>}
                            {(!userData || userData == 'failed' || userRole == 'employer') && !loading && <div className="hidden justify-items-end md:flex md:items-center mb-[2px]">
                                <div className='bg-gradientFirst rounded-[3px]'>
                                    <Link
                                        href={userData && userRole == 'employer' ? 'users/employer/post' : "/account"}
                                        className="text-textW flex items-center gap-2 justify-center bg-black h-[42px] w-[166px] rounded-[3px] buttonBounce"
                                    >
                                        <img src="/icons/HireLeaf.svg" alt="icon" className='w-5 h-5' />
                                        <p className='font-[400] text-[16px]'>Post Job</p>
                                    </Link>
                                </div>
                            </div>}
                        </>
                        {
                            loading && <div className="hidden sm:relative md:flex items-center justify-end gap-x-2 col-span-3 md:col-span-12">
                                <div className="text-neutral-900  text-opacity-70 text-xl font-normal leading-7">
                                    <div className="h-10 bg-gray-300 rounded-full rounded animate-pulse w-40"></div>
                                </div>
                            </div>
                        }
                        {!loading && userData && userData !== 'failed' && (
                            <div className="hidden sm:relative md:flex items-center justify-end gap-x-2 col-span-3 md:col-span-12">
                                <div>
                                    <Popover className="flex items-center lg:text-[0.9rem] px-2 py-2 gap-3 rounded-full h-10">
                                        <Popover.Button className="focus:ring-0 focus:border-0 focus:outline-0 flex items-center ">
                                            {userData && userDetail && userDetail.profilePictureId && (
                                                <div className="w-7 h-7 ">
                                                    <ProfilePic id={userDetail.profilePictureId} className="w-full h-full border-0 rounded-full outline-0 ring-none"
                                                    />
                                                </div>
                                            )}
                                            {userData && (!userDetail || !userDetail.profilePictureId) && (
                                                <div className="flex text-left ml-3 justify-center items-center ">
                                                    <p className="text-[14px] font-[600] bg-gradientFirst text-textW border-2 border-textW ring-2 ring-gradientFirst rounded-full w-8 h-8 flex items-center justify-center">{userData.name.charAt(0).toLocaleUpperCase()}</p>
                                                </div>
                                            )}
                                        </Popover.Button>
                                        <Popover.Panel className="absolute right-0 top-10 border-2 rounded-md flex flex-col gap-y-3 p-3 bg-textW shadow z-10 w-[8rem] md:mt-3 lg:mt-8">
                                            {userRole == 'candidate' ? (
                                                <>
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
                                                    href="/users/employer/profile"
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
            </div>
            <Logout openLogout={openLogout} setOpenLogout={setOpenLogout} />
        </div >
    );
};
export default Navigation;
