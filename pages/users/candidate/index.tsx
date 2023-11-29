import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { useState } from 'react';
import SavedJobs from '@/components/candidateProfileComponents/Saved';
import Applied from '@/components/candidateProfileComponents/Applied';
const CandidateJobs = () => {
    const [saved, setSaved] = useState(true);
    const [applied, setApplied] = useState(false);
    return (
        <div className="">
            <Navigation />
            <div className="px-3 mt-10 flex flex-col px-3 xl:px-40">
                <div className="mt-8 flex gap-y-3 gap-x-12 pl-10">
                    <div
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
                    </div>
                    <div
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
                    </div>

                </div>

                <div className="flex flex-col max-h-[60rem] overflow-y-auto thinScrollBar w-full mt-8 md:pl-5 p-1 pt-5 bg-forBack p-1 gap-y-10 md:gap-y-8">
                    <div className={saved ? 'flex flex-col gap-y-10 md:gap-y-8' : 'hidden'}>
                        <SavedJobs view={saved} />
                    </div>
                    <div className={applied ? 'flex flex-col gap-y-10 md:gap-y-8' : 'hidden'}>
                        <Applied view={applied} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default CandidateJobs;
