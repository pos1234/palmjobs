import React from 'react';
import { signOut } from '@/lib/services';
import styles from '@/styles/navigation.module.css';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditIcon from '@mui/icons-material/Edit';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import VerifiedIcon from '@mui/icons-material/Verified';
import SchoolIcon from '@mui/icons-material/School';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Navigation = () => {
    const logo = '/images/logo.svg';
    const profile = '/images/profile.svg';

    return (
        <>
            <div className="grid grid-cols-12 pt-3  md:border-b-2">
                <div className="col-span-6 md:col-span-2">
                    <img src={logo} alt="palmjobs logo" className=" h-16 md:h-20" />
                </div>
                <div className="hidden md:max-lg:col-span-6 md:grid md:pt-6 md:grid-cols-2 lg:col-span-4">
                    <p className="text-bigS font-bigW leading-bigL text-center lg:text-left text-textR">Find a Job</p>
                    <p className="text-bigS font-bigW leading-bigL text-textR">Build Resume</p>
                </div>
                <div className="col-span-6 grid grid-cols-12 pt-3 md:pt-0 md:col-span-4 lg:col-span-6 bg-green-0">
                    <div className="col-span-6 md:col-span-5 lg:col-span-7 md:pt-5">
                        <p className="text-right pt-1 text-fhS leading-fhL font-fhW text-textR md:text-dfhS md:leading-dfhL md:font-bigW md:pr-3 lg:-mt-1">
                            Sign in
                        </p>
                    </div>
                    <div className="hidden justify-items-end bg-red-0 col-span-3 md:grid md:col-span-7 lg:col-span-5 ">
                        <button className="text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-56 rounded-xl md:w-44 xl:w-56">
                            <BorderColorIcon sx={{ fontSize: '1.2rem', marginRight: '0.2rem' }} /> Hire Talent
                        </button>
                    </div>
                    <div className="col-span-6 grid justify-items-center md:hidden">
                        <div className={styles['hamburger-menu']}>
                            <div className={styles['bar']}></div>
                            <div className={styles['bar']}></div>
                            <div className={styles['bar']}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 pt-8 lg:pl-48 lg:pr-16 ">
                <div className="col-span-12 grid grid-cols-12">
                    <div className="col-span-12 grid grid-cols-12 justify-items-center md:col-span-7 md:justify-items-start lg:col-span-9 xl:col-span-6 ">
                        <div className="col-span-12 relative md:col-span-5">
                            <EditIcon
                                sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                className="w-7 h-7 p-1.5 mr-2 absolute right-0 top-0 -mr-4 -mt-2"
                            />

                            <img src={profile} className="w-40 h-40 col-span-2 rounded-3xl" />
                        </div>
                        <div className="col-span-12 pt-5 md:col-span-6">
                            <p className="font-frhW text-frhS leading-frhL ">
                                Jhon Doe
                                <EditIcon
                                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                    className="w-5 h-5 p-1 ml-2"
                                />
                            </p>
                            <p className="font-midRW text-midRS leading-midRL text-lightGrey mt-5 text-center">
                                <FmdGoodOutlinedIcon className="w-7 h-7" /> Addis Ababa{' '}
                                <LinkedInIcon sx={{ color: '#FE5E0A' }} className="w-7 h-7" />
                            </p>
                        </div>
                    </div>

                    <div className="col-span-12">
                        <ul className="flex space-x-10 pl-3 mt-7">
                            <li>
                                <a className="font-shW text-shS leading-shL">About</a>
                            </li>
                            <li>
                                <a className="font-shW text-shS leading-shL text-lightGrey">Resume</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-span-12 grid grid-cols-12 bg-[#ffa06e14] mt-5 gap-3 py-5 px-1">
                    <div className="col-span-12 md:col-span-8 grid grid-cols-12 bg-textW rounded-3xl p-2 pt-5">
                        <div className="col-span-8 md:col-span-6">
                            <p className="font-fhW text-fhS leading-fhL text-textR">
                                <PersonIcon sx={{ color: '#FE5E0A' }} /> marketing Manager
                            </p>
                        </div>
                        <div className="col-span-4 md:col-span-6 grid justify-items-end">
                            <EditIcon sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }} className="w-7 h-7 p-1.5 mr-2" />
                        </div>
                        <div className="col-span-12 pt-3 md:col-span-11">
                            <p className="font-smW text-smS leading-smL text-lightGrey pl-2">
                                Lorem ipsum dolor sit amet consectetur. Accumsan feugiat dolor aliquet senectus mi viverra. Lectus fringilla
                                ut dignissim mauris diam vitae pharetra. Sagittis phasellus morbi morbi dis. Nisi sit arcu scelerisque donec
                                accumsan faucibus duis. Placerat egestas fermentum pretium phasellus id urna eget elementum duis. Netus
                                tellus senectus sollicitudin egestas adipiscing nulla aenean vestibulum.Lectus fringillaSagittis phasellus
                                morbi morbi dis. Nisi sit arcu scelerisque donec accumsan faucibus duis. Read More
                            </p>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-4 grid grid-cols-12 bg-textW rounded-3xl p-2 pt-5">
                        <div className="col-span-12">
                            <p className="font-dfvW text-dfvS leading-dfvL text-lightGrey pl-2">
                                <VisibilityOutlinedIcon /> <span className="text-gradientFirst">23</span> Profile Views
                            </p>
                        </div>
                        <div className="col-span-12">graph</div>
                    </div>
                </div>
                <div>
                    <p>skills</p>
                </div>
                <div>
                    <p>Projects</p>
                </div>
                <div>
                    <div>
                        <p>certificates</p>
                    </div>
                    <div>
                        <p>work history</p>
                        <div>
                            <p>Education</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navigation;
{
    /* <button type="button" onClick={signOut}>
            logout
        </button> */
}
