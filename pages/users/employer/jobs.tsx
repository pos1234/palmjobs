import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import EmployerJobShimmer from '@/components/shimmer/EmpJobShimmer';
import Active from '@/components/employerComponents/jobComponents/Active';
import Drafted from '@/components/employerComponents/jobComponents/Drafted';
import Closed from '@/components/employerComponents/jobComponents/Closed';
import SortIcon from '@mui/icons-material/Sort';
import { Popover } from '@headlessui/react';
import HeightIcon from '@mui/icons-material/Height';
import StraightIcon from '@mui/icons-material/Straight';
import SpaIcon from '@mui/icons-material/Spa';
import PauseIcon from '@mui/icons-material/Pause';
import { useJobPostContext } from '@/contextApi/jobPostData';
import Navigation from '@/components/employerComponents/Navigation';
import Link from 'next/link';
import { employeeAuth } from '@/components/withAuth';
const Jobs = (props: any) => {
    const { allEmployerJobs } = useJobPostContext()
    const [opened, setOpened] = useState(true);
    const [draft, setDraft] = useState(false);
    const [closed, setClosed] = useState(false);
    const [sort, setSort] = useState('asc');
    const [allLoading, setAllLoading] = useState(false);
    const [noDraft, setNoDraft] = useState(false);
    const [noPosted, setNoPosted] = useState(false);
    const [noClosed, setNoClosed] = useState(false);
    const [activeJobs, setActiveJobs] = useState<any>()
    const toggleTabs = (name: string) => {
        if (name === 'opened') {
            setOpened(true);
            setDraft(false);
            setClosed(false);
        }
        if (name === 'draft') {
            setOpened(false);
            setDraft(true);
            setClosed(false);
        }
        if (name === 'closed') {
            setOpened(false);
            setDraft(false);
            setClosed(true);
        }
    };
    useEffect(() => {
        const drafted = allEmployerJobs && allEmployerJobs.filter((draft: any) => draft.jobStatus === 'Draft');
        const active = allEmployerJobs && allEmployerJobs.filter((draft: any) => draft.jobStatus === 'Active');
        const closed = allEmployerJobs && allEmployerJobs.filter((draft: any) => draft.jobStatus === 'Close');
        drafted && drafted.length > 0 && setNoDraft(true)
        active && active.length > 0 && setNoPosted(true)
        closed && closed.length > 0 && setNoClosed(true)
        active && active.length > 0 && setActiveJobs(active)
    }, [allEmployerJobs]);
    return (
        <>
            <div className="flex max-md:flex-wrap bg-textW">
                <Navigation active='jobs' />
                <div className=" pt-5 px-3 pb-10 bg-textW w-full max-xl:flex-grow xl:w-2/3 min-h-screen">
                    <div className="relative flex justify-between pt-10 items-center px-2 lg:pl-10">
                        <p className="text-black text-xl md:text-3xl font-[700]">Jobs</p>
                        <Link href="/users/employer/post"
                            className="text-textW bg-black flex gap-2 items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-[42px] w-[166px] rounded-[3px]"
                        >
                            <img src="/icons/HireLeaf.svg" alt="" className='w-5 h-5' />
                            Post Job
                        </Link>
                    </div>
                    <div className="mt-8 lg:pl-10">
                        <div className="flex gap-y-3 border-b-2">
                            <div className="px-1 flex-grow flex justify-center">
                                <div className="flex gap-5 sm:gap-10">
                                    {noPosted && (
                                        <div
                                            onClick={() => toggleTabs('opened')}
                                            className={
                                                opened
                                                    ? 'flex font-[600] items-center gap-2 justify-center border-b-[3px] border-b-gradientFirst pb-3'
                                                    : 'font-[600] gap-2 flex items-center justify-center cursor-pointer border-b-[3px] border-b-textW hover:border-b-gradientFirst pb-3'
                                            }
                                        >
                                            <SpaIcon sx={{ fontSize: '1.2rem' }} />
                                            <span>Opened</span>
                                        </div>
                                    )}
                                    {noDraft && (
                                        <div
                                            onClick={() => toggleTabs('draft')}
                                            className={
                                                draft
                                                    ? 'flex font-[600] items-center gap-2 justify-center border-b-[3px] border-b-gradientFirst pb-3'
                                                    : 'font-[600] gap-2 flex items-center justify-center cursor-pointer border-b-[3px] border-b-textW hover:border-b-gradientFirst pb-3'
                                            }
                                        >
                                            <PauseIcon sx={{ fontSize: '1.5rem' }} />
                                            <span>Drafted</span>

                                        </div>
                                    )}
                                    {noClosed && (
                                        <div
                                            onClick={() => toggleTabs('closed')}
                                            className={
                                                closed
                                                    ? 'flex font-[600] items-center gap-2 justify-center border-b-[3px] border-b-gradientFirst pb-3'
                                                    : 'font-[600] gap-2 flex items-center justify-center cursor-pointer border-b-[3px] border-b-textW hover:border-b-gradientFirst pb-3'
                                            }
                                        >
                                            <img src="/icons/closedJob.svg" alt="closedIcon" />
                                            <span>Closed</span>

                                        </div>
                                    )}
                                </div>
                            </div>
                            {/*                         {opened && noPosted && (
 */}                            <div className="max-sm:hidden flex max-sm:pl-5 items-center gap-x-2 md:w-40">
                                <Popover className={opened && noPosted ? "sm:relative focus:ring-0 focus:border-0 focus:outline-0 md:w-full" : 'hidden'}>
                                    <Popover.Button className="focus:ring-0 focus:border-0 focus:outline-0 flex md:w-full justify-end">
                                        <SortIcon sx={{ fontSize: '2rem' }} className="cursor-pointer" />
                                    </Popover.Button>

                                    <Popover.Panel className="absolute -ml-32 w-40 sm:w-40 border-2 rounded-2xl flex flex-col gap-y-3 bg-textW py-3 px-3 bg-white shadow z-10 md:ml-0">
                                        <div
                                            onClick={() => setSort('asc')}
                                            className="flex gap-x-3 text-[0.8rem] md:max-lg:text-red-500 cursor-pointer items-center text-stone-400 hover:text-stone-700"
                                        >
                                            <HeightIcon sx={{ fontSize: '1rem' }} className="text-[1rem]" />
                                            <span>Latest</span>
                                        </div>
                                        <div
                                            onClick={() => setSort('desc')}
                                            className="flex gap-x-3 text-[0.8rem] cursor-pointer items-center text-stone-400 hover:text-stone-700"
                                        >
                                            <StraightIcon sx={{ fontSize: '1rem' }} className="text-[1rem]" />
                                            <span>Oldest</span>
                                        </div>
                                    </Popover.Panel>
                                </Popover>
                            </div>
                            {/*                         )}
 */}                    </div>
                        {allLoading && (
                            <div className="flex flex-col gap-y-10 pt-5">
                                <EmployerJobShimmer />
                                <EmployerJobShimmer />
                            </div>
                        )}
                        <div className={opened ? '' : 'hidden'}>
                            <Active sort={sort} applicants={props.applicants} />
                        </div>
                        <div className={draft ? '' : 'hidden'}>
                            <Drafted />
                        </div>
                        <div className={closed ? '' : 'hidden'}>
                            <Closed />
                        </div>
                    </div>
                </div >
            </div>
        </>
    );
};

export default employeeAuth(Jobs);
