import { useEffect, useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getAccount, getCandidateInfo, getProfileData, getProfilePicture, getRole, signOut } from '@/lib/services';
import Link from 'next/link';
const LinkList = (props: any) => {
    return (
        <li>
            <Link href={props.link || '/'} className="text-midRS font-midRW leading-midRL text-lightGrey block cursor-pointer">
                {props.text}
            </Link>
        </li>
    );
};
const Footer = () => {
    const logo = '/images/logo.svg';
    const [forEmp, setForEmp] = useState(false);
    const [forCan, setForCan] = useState(false);
    const [forGt, setForGt] = useState(false);
    const [userData, setUserData] = useState<any>();
    const [userRole, setUserRole] = useState('');
    const [userDetail, setUserDetail] = useState<any>();
    const openForEmp = () => {
        setForEmp(!forEmp);
    };
    const openForCan = () => {
        setForCan(!forCan);
    };
    const openForGt = () => {
        setForGt(!forGt);
    };
    const getUserData = async () => {
        const userInfo = await getAccount();
        if (userInfo !== 'failed') {
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
    };
    useEffect(() => {
        getUserData();
    }, []);
    return (
        <>
            <div className="mt-28">
                <div className="grid grid-cols-12 pt-8 border-b-2 border-t-2 py-10">
                    <div className="col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2">
                        <img src={logo} alt="palmjobs logo" className=" h-16 md:h-20" />
                        <ul className="flex space-x-5 text-gradientFirst pl-5 pt-4">
                            <li>
                                <FacebookIcon />
                            </li>
                            <li>
                                <LinkedInIcon />
                            </li>
                            <li>
                                <InstagramIcon />
                            </li>
                            <li>
                                <TwitterIcon />
                            </li>
                            <li>
                                <YouTubeIcon />
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-12 mt-5 pl-5 cursor-pointer md:cursor-default md:mt-2 md:col-span-4 md:grid md:justify-items-center lg:col-span-3">
                        {(!userRole || userRole == 'employer') && (
                            <div className="grid grid-cols-2 mt-3 md:mt-0 " onClick={openForEmp}>
                                <p className="text-thS font-thW leading-thL text-textR md:text-dfhS font-dfhW leading-dfhL md:col-span-2">
                                    For Employers
                                </p>
                                <p className="text-right pr-3 md:hidden">
                                    {forEmp == true ? (
                                        <KeyboardArrowUpIcon sx={{ fontSize: '1.8rem' }} onClick={openForEmp} />
                                    ) : (
                                        <KeyboardArrowDownIcon sx={{ fontSize: '1.8rem' }} onClick={openForEmp} />
                                    )}
                                </p>
                            </div>
                        )}
                        {!userRole && (
                            <ul className="hidden  md:flex flex-col space-y-4 pt-0 -mt-8 md:-ml-2">
                                <LinkList link="/users/employer/" text="Post Job" />
                                <LinkList text="Submit Job Order" />
                            </ul>
                        )}
                        {userRole == 'employer' && (
                            <ul className="hidden  md:flex flex-col space-y-4 pt-3 md:-ml-2">
                                <LinkList link="/users/employer/" text="Post Job" />
                                <LinkList text="Submit Job Order" />
                                <LinkList link="/users/employer/" text="My Dashboard" />
                            </ul>
                        )}
                        {forEmp && !userRole && (
                            <ul className="flex flex-col space-y-4 pt-3 md:hidden ">
                                <LinkList link="/users/employer/" text="Post Job" />
                                <LinkList link="/" text="Submit Job Order" />
                            </ul>
                        )}
                        {forEmp && userRole == 'employer' && (
                            <ul className="flex flex-col space-y-4 pt-3 md:hidden ">
                                <LinkList link="/users/employer/" text="Post Job" />
                                <LinkList link="/" text="Submit Job Order" />
                                <LinkList link="/users/employer/" text="My Dashboard" />
                            </ul>
                        )}
                    </div>
                    <div className="col-span-12 mt-3 pl-5 cursor-pointer md:cursor-default md:mt-2 md:col-span-4 lg:col-span-3 ">
                        {!userRole || userRole == 'candidate' ? (
                            <div className="grid grid-cols-3 md:grid-cols-2 my-3 md:mt-0" onClick={openForCan}>
                                <p className="text-thS font-thW leading-thL col-span-2 text-textR md:text-dfhS font-dfhW leading-dfhL md:col-span-2">
                                    For Job Seekers
                                </p>
                                <p className="text-right pr-3 md:hidden">
                                    {forCan == true ? (
                                        <KeyboardArrowUpIcon sx={{ fontSize: '1.8rem' }} onClick={openForCan} />
                                    ) : (
                                        <KeyboardArrowDownIcon sx={{ fontSize: '1.8rem' }} onClick={openForCan} />
                                    )}
                                </p>
                            </div>
                        ) : null}
                        {!userRole ? (
                            <ul className="hidden  md:flex flex-col space-y-4 pt-3 ">
                                <LinkList link="/jobs" text="Find a Job" />
                                <LinkList link="/" text="Craft Resume" />
                            </ul>
                        ) : null}
                        {userRole == 'candidate' && (
                            <ul className="hidden  md:flex flex-col space-y-4 pt-3 ">
                                <LinkList link="/jobs" text="Find a Job" />
                                <LinkList link="/" text="Craft Resume" />
                                <LinkList link="/users/candidate/profile" text="Upload Resume" />
                                <LinkList link="/users/candidate/" text="My Jobs" />
                            </ul>
                        )}
                        {forCan && !userRole && (
                            <ul className="flex flex-col space-y-4 pt-3 md:hidden ">
                                <LinkList link="/jobs" text="Find a Job" />
                                <LinkList link="/" text="Carft Resume" />
                            </ul>
                        )}
                        {forCan && userRole == 'candidate' && (
                            <ul className="flex flex-col space-y-4 pt-3 md:hidden ">
                                <LinkList link="/jobs" text="Find a Job" />
                                <LinkList link="/" text="Carft Resume" />
                                <LinkList link="/users/candidate/profile" text="Upload Resume" />
                                <LinkList link="/users/candidate/" text="My Jobs" />
                            </ul>
                        )}
                    </div>
                    <div className="col-span-12 mt-0 pl-5 cursor-pointer md:cursor-default md:mt-2 md:max-lg:grid md:max-lg:justify-items-center  lg:col-span-3 xl:col-span-4">
                        <div className="grid grid-cols-3 md:grid-cols-2 my-3 md:mt-0" onClick={openForGt}>
                            <p className="text-thS font-thW leading-thL col-span-2 text-textR md:text-dfhS font-dfhW leading-dfhL md:col-span-2 md:hidden">
                                Get In Touch
                            </p>
                            <p className="text-right pr-3 md:hidden">
                                {forGt == true ? (
                                    <KeyboardArrowUpIcon sx={{ fontSize: '1.8rem' }} onClick={openForGt} />
                                ) : (
                                    <KeyboardArrowDownIcon sx={{ fontSize: '1.8rem' }} onClick={openForGt} />
                                )}
                            </p>
                        </div>
                        <ul className="hidden  md:flex flex-col space-y-4 pt-3 text-lightGrey md:pt-8">
                            <li>
                                <p className="text-midRS font-midRW leading-midRL block">
                                    Suite 301E | Bethlhem Plaza, Megenagna, <br />
                                    Addis Ababa, Ethiopia
                                </p>
                            </li>
                            <li>
                                <p className="text-midRS font-midRW leading-midRL block">+2519 42 07 07 07 | +2511 16 67 47 67</p>
                            </li>
                            <li>
                                <p className="text-midRS font-midRW leading-midRL block">info@yes.et | employe@yes.et | apply@yes.et</p>
                            </li>
                        </ul>
                        {forGt && (
                            <ul className="flex flex-col space-y-4 pt-3 md:hidden ">
                                <li>
                                    <p className="text-midRS font-midRW leading-midRL text-textR block">
                                        Suite 301E | Bethlhem Plaza, Megenagna, <br />
                                        Addis Ababa, Ethiopia
                                    </p>
                                </li>
                                <li>
                                    <p className="text-midRS font-midRW leading-midRL text-textR block">
                                        +2519 42 07 07 07 | +2511 16 67 47 67
                                    </p>
                                </li>
                                <li>
                                    <p className="text-midRS font-midRW leading-midRL text-textR block">
                                        info@yes.et | employe@yes.et | apply@yes.et
                                    </p>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
                <div className="pt-5">
                    <div className="col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2">
                        <ul className="md:flex md:space-x-5 pl-5 pt-4">
                            <li>
                                <p className="text-midRS font-midRW leading-midRL text-lightGrey block">2023. YES</p>
                            </li>
                            <li className="py-7 md:py-0">
                                <p className="text-midRS font-midRW leading-midRL text-lightGrey block">Privacy Policy</p>
                            </li>
                            <li>
                                <p className="text-midRS font-midRW leading-midRL text-lightGrey block">Terms and Conditions</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
