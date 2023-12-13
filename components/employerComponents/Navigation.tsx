import Link from 'next/link'
import React, { useState } from 'react'
import styles from '@/styles/navigation.module.css';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AddIcon from '@mui/icons-material/Add';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ShieldIcon from '@mui/icons-material/Shield';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import PeopleIcon from '@mui/icons-material/People';
import { ProfilePic } from '../JobImage';
import Logout from '../Logout';
interface Active {
    active: string
}
const Navigation = ({ active }: Active) => {
    const [menu, setMenu] = useState(false);
    const [userDetail, setUserDetail] = useState<any>();
    const [openLogout, setOpenLogout] = useState(false)
    return (
        <>
            <div className={`flex w-full justify-between overflow-x-hidden items-center md:pr-0 md:pl-5 pt-5 ${menu ? 'hidden' : 'md:hidden'} `}>
                <Link href="/">
                    <img src='/images/logo.svg' alt="palmjobs logo" className="h-12 md:hidden" />
                </Link>
                <div
                    onClick={() => {
                        setMenu(!menu);
                    }}
                    className={`${styles['hamburger-menu']} ${menu ? 'hidden' : ' md:hidden'}`}
                >
                    <div className={styles['bar']}></div>
                    <div className={styles['bar']}></div>
                    <div className={styles['bar']}></div>
                </div>
            </div>
            <div className={` h-screen flex relative justify-center w-screen md:w-52 lg:w-60 ${menu ? '' : 'max-md:hidden'}`}>
                <div className='w-full pt-8 fixed w-full bg-textW md:w-52 lg:w-60 max-md:h-screen md:border-r-8 border-r-[#F4F4F4] '>
                    <div
                        className={
                            menu
                                ? 'flex flex-col h-screen'
                                : 'hidden md:relative md:flex md:flex-col items-center md:gap-y-2 md:pt-10 md:min-h-screen '
                        }
                    >
                        <Link href="/" className='flex justify-center md:mb-10'>
                            <img src='/images/logo.svg' alt="palmjobs logo" className="h-16" />
                        </Link>
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
                        <Link href='/users/employer/post' className={
                            active == 'post'
                                ? 'flex items-center pl-16 text-gradientFirst py-3 gap-x-3 cursor-pointer w-full'
                                : 'flex items-center pl-16 group py-3 gap-x-3 text-stone-400 w-full hover:text-gradientFirst cursor-pointer'
                        }>
                            <AddIcon sx={{ fontSize: '1.2rem' }} className={
                                active == 'post'
                                    ? 'bg-gradientFirst text-textW rounded-md border-0'
                                    : 'group-hover:bg-gradientFirst bg-stone-400 text-textW rounded-md border-0 '
                            } />
                            <p className='text-lg'>Post Job</p>
                        </Link>
                        <Link href='/users/employer/jobs' className={
                            active == 'jobs'
                                ? 'flex items-center pl-16 text-gradientFirst py-3 gap-x-3 cursor-pointer w-full'
                                : 'flex items-center pl-16 group py-3 gap-x-3 text-stone-400 w-full hover:text-gradientFirst cursor-pointer'
                        }>
                            <BusinessCenterIcon sx={{ fontSize: '1.5rem' }} />
                            <p className='text-lg'>Jobs</p>
                        </Link>
                        <Link href='/users/employer/candidates' className={
                            active == 'candidates'
                                ? 'flex items-center pl-16 text-gradientFirst py-3 gap-x-3 cursor-pointer w-full'
                                : 'flex items-center pl-16 group py-3 gap-x-3 text-stone-400 w-full hover:text-gradientFirst cursor-pointer'
                        }>
                            <PeopleIcon sx={{ fontSize: '1.5rem' }} />
                            <p className='text-lg'>Candidates</p>
                        </Link>
                        <Link href='/users/employer/profile' className={
                            active == 'profile'
                                ? 'flex items-center pl-16 text-gradientFirst py-3 gap-x-3 cursor-pointer w-full'
                                : 'flex items-center pl-16 group py-3 gap-x-3 text-stone-400 w-full hover:text-gradientFirst cursor-pointer'
                        }>
                            <SettingsSuggestIcon sx={{ fontSize: '1.5rem' }} />
                            <p className='text-lg'>Profile</p>
                        </Link>
                        <Link href='/users/employer/privacy' className={
                            active == 'privacy'
                                ? 'flex items-center pl-16 text-gradientFirst py-3 gap-x-3 cursor-pointer w-full'
                                : 'flex items-center pl-16 group py-3 gap-x-3 text-stone-400 w-full hover:text-gradientFirst cursor-pointer'
                        }>
                            <ShieldIcon sx={{ fontSize: '1.5rem' }} />
                            <p className='text-lg'>Privacy</p>
                        </Link>
                        <div
                            onClick={() => {
                                setOpenLogout(!openLogout);
                                setMenu(false);
                            }}
                            className="flex items-center pl-16 group py-3 gap-x-3 text-stone-400 w-full hover:text-gradientFirst cursor-pointer"
                        >
                            <div className=" rounded-md border-0">
                                <LogoutIcon sx={{ fontSize: '1.5rem' }} />
                            </div>
                            <p className="text-lg font-medium leading-loose">Logout</p>
                        </div>
                        {/*  <MenuItems
                            icons={<AssessmentIcon sx={{ fontSize: '1.2rem' }} />
                            }
                            text='Analytics'
                            navText='dashboard'
                            active={dashboard}
                            handleNavigation={handleNavigation}
                            handleMenu={setMenu}
                        /> */}
                        {/* <MenuItems
                        icons={<BusinessCenterIcon sx={{ fontSize: '1.5rem' }} />
                        }
                        text='Jobs'
                        navText='jobs'
                        active={jobs}
                        handleNavigation={handleNavigation}
                        handleMenu={setMenu}

                    /> 
                    <MenuItems
                        icons={<PeopleIcon sx={{ fontSize: '1.5rem' }} />
                        }
                        text='Applicants'
                        navText='candidates'
                        active={candidates}
                        handleNavigation={handleNavigation}
                        handleMenu={setMenu}
                    />
                    <MenuItems
                        icons={<SettingsSuggestIcon sx={{ fontSize: '1.5rem' }} />
                        }
                        text='Profile'
                        navText='profileSetting'
                        active={profileSetting}
                        handleNavigation={handleNavigation}
                        handleMenu={setMenu}
                    />
                    <MenuItems
                        icons={<ShieldIcon sx={{ fontSize: '1.5rem' }} />
                        }
                        text='privacy'
                        navText='privacy'
                        active={privacy}
                        handleNavigation={handleNavigation}
                        handleMenu={setMenu}
                    />*/}

                    </div>
                </div>
            </div >
            <Logout openLogout={openLogout} setOpenLogout={setOpenLogout} />
        </>
    )
}
export default Navigation