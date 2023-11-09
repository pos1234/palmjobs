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
    return (
        <div className="px-3 xl:px-40">
            <Navigation />
            <div className="px-3 mt-10 flex flex-col">
                <div className="mt-8 flex gap-y-3 gap-x-12 pl-10">
                    <button
                        className={
                            saved == true
                                ? ' cursor-pointer border-b-2 text-gradientFirst text-lg pb-1 border-b-gradientFirst flex'
                                : 'cursor-pointer border-b-2 border-textW text-lg pb-1 hover:text-gradientFirst hover:border-b-gradientFirst flex'
                        }
                        onClick={() => {
                            setSaved(true);
                            setApplied(false);
                        }}
                    >
                        Saved
                    </button>
                    <button
                        className={
                            applied == true
                                ? 'cursor-pointer border-b-2 text-gradientFirst text-lg pb-1 border-b-gradientFirst flex'
                                : 'cursor-pointer border-b-2 border-textW text-lg pb-1 hover:text-gradientFirst hover:border-b-gradientFirst flex'
                        }
                        onClick={() => {
                            setSaved(false);
                            setApplied(true);
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
                <div className="flex flex-col w-full mt-8 md:pl-5 p-1 pt-5 bg-forBack p-1 gap-y-10 md:gap-y-8">
                    <SavedJobs view={saved} />
                    <Applied view={applied} />
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default CandidateJobs;
