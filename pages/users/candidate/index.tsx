import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { useState } from 'react';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import SavedJobs from '@/components/candidateProfileComponents/Saved';
import Applied from '@/components/candidateProfileComponents/Applied';
const CandidateJobs = () => {
    const [saved, setSaved] = useState(true);
    const [applied, setApplied] = useState(false);
    const [archive, setArchive] = useState(false);
    const profile = '/images/profile.svg';
    return (
        <div className="px-3 md:px-16">
            <Navigation />
            <div className="px-3 mt-20 grid grid-cols-12 md:px-20">
                {saved && <p className="font-shW text-shS leading-shL text-darkBlue col-span-12">My Saved Jobs</p>}
                {applied && <p className="font-shW text-shS leading-shL text-darkBlue col-span-12">Applied Jobs</p>}
                {/*                 {archive && <p className="font-shW text-shS leading-shL text-darkBlue col-span-12">Archived Jobs</p>}
                 */}{' '}
                <div className="mt-8 col-span-12 grid grid-cols-12 gap-y-3 gap-x-5 md:col-span-10 lg:col-span-8">
                    <button
                        className={
                            saved == true
                                ? 'col-span-6 h-[3.5rem] bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW rounded-full cursor-pointer md:col-span-3'
                                : 'col-span-6 hover:bg-gradient-to-r hover:from-gradientFirst hover:to-gradientSecond hover:text-textW hover:border-0 h-[3.5rem] text-darkBlue rounded-full cursor-pointer border-2 md:col-span-3'
                        }
                        onClick={() => {
                            setSaved(true);
                            setApplied(false);
                            setArchive(false);
                        }}
                    >
                        Saved
                    </button>
                    <button
                        className={
                            applied == true
                                ? 'col-span-6 h-[3.5rem] bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW rounded-full cursor-pointer md:col-span-3'
                                : 'col-span-6 h-[3.5rem] hover:bg-gradient-to-r hover:from-gradientFirst hover:to-gradientSecond hover:text-textW hover:border-0 text-darkBlue rounded-full cursor-pointer border-2 md:col-span-3'
                        }
                        onClick={() => {
                            setSaved(false);
                            setApplied(true);
                            setArchive(false);
                        }}
                    >
                        Applied
                    </button>
                    {/*   <button
                        className={
                            archive == true
                                ? 'col-span-6 h-[3.5rem] bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW rounded-full cursor-pointer md:col-span-3'
                                : 'col-span-6 h-[3.5rem] hover:bg-gradient-to-r hover:from-gradientFirst hover:to-gradientSecond hover:text-textW hover:border-0 text-darkBlue rounded-full cursor-pointer border-2 md:col-span-3'
                        }
                        onClick={() => {
                            setSaved(false);
                            setApplied(false);
                            setArchive(true);
                        }}
                    >
                        Archive
                    </button> */}
                </div>
                {/*                 <p className="col-span-12 mt-5 text-darkBlue text-midS font-midW">2 Jobs</p>
                 */}{' '}
                <div className="col-span-12 grid grid-cols-12 mt-8 md:pl-5 p-1 pt-5 bg-forBack p-1 gap-y-10 md:gap-y-8">
                    <SavedJobs view={saved} />
                    <Applied view={applied} />
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default CandidateJobs;
