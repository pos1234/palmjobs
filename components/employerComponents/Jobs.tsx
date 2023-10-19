import React, { useEffect, useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import 'react-toastify/dist/ReactToastify.css';
import EmployerJobShimmer from '../shimmer/EmpJobShimmer';
import Active from './jobComponents/Active';
import Drafted from './jobComponents/Drafted';
import Closed from './jobComponents/Closed';
import SortIcon from '@mui/icons-material/Sort';
import { Popover } from '@headlessui/react';
import HeightIcon from '@mui/icons-material/Height';
import StraightIcon from '@mui/icons-material/Straight';
import { fetchDraftedJobs, fetchPostedJobs } from '@/lib/services';
const Jobs = (props: any) => {
    const [opened, setOpened] = useState(true);
    const [draft, setDraft] = useState(false);
    const [closed, setClosed] = useState(false);
    const [sort, setSort] = useState('asc');
    const [allLoading, setAllLoading] = useState(false);
    const [editFullJob, setEditFullJob] = useState(false);
    const [editedJobId, setEditedJobId] = useState('');
    const [noDraft, setNoDraft] = useState(false);
    const [noPosted, setNoPosted] = useState(false);
    const [noClosed, setNoClosed] = useState(false);
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
    const handleNav = (text: string) => {
        props.postJob(text);
    };
    const handleFullEdit = () => {
        if (editedJobId) {
            props.setEditedJobId(editedJobId);
            props.postJob('postJob');
        }
    };
    useEffect(() => {
        handleFullEdit();
    }, [editedJobId]);
    useEffect(() => {
        fetchDraftedJobs()
            .then((res) => {
                res && res.total > 0 && setNoDraft(true);
            })
            .catch((error) => {
                console.log(error);
            });
        fetchPostedJobs()
            .then((res) => {
                res && res.total > 0 && setNoPosted(true);
            })
            .catch((error) => {
                console.log(error);
            });
        fetchPostedJobs()
            .then((res) => {
                res && res.total > 0 && setNoClosed(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <>
            <div className="bg-textW min-h-screen">
                <div className="relative flex justify-between pt-10 items-center px-2 lg:pl-10">
                    <p className="text-black text-3xl font-[700]">Jobs</p>
                    <div
                        onClick={() => handleNav('postJob')}
                        className="text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 rounded-xl px-9"
                    >
                        <BorderColorIcon sx={{ fontSize: '1.2rem' }} className="mr-2" /> Post Job
                    </div>
                </div>
                <div className="mt-8 lg:pl-10">
                    <div className="flex gap-y-3 justify-between">
                        <div className="bg-forBack py-2 px-1">
                            <div className="flex bg-textW">
                                {noPosted && (
                                    <div
                                        onClick={() => toggleTabs('opened')}
                                        className={
                                            opened
                                                ? 'text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 rounded-2xl px-5'
                                                : 'text-stone-500 flex items-center justify-center cursor-pointer h-16 rounded-2xl px-5 hover:text-orange-500'
                                        }
                                    >
                                        Opened
                                    </div>
                                )}
                                {noDraft && (
                                    <div
                                        onClick={() => toggleTabs('draft')}
                                        className={
                                            draft
                                                ? 'text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 rounded-2xl px-5'
                                                : 'text-stone-500 flex items-center justify-center cursor-pointer h-16 rounded-2xl px-5 hover:text-orange-500'
                                        }
                                    >
                                        Drafted
                                    </div>
                                )}
                                {noClosed && (
                                    <div
                                        onClick={() => toggleTabs('closed')}
                                        className={
                                            closed
                                                ? 'text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 rounded-2xl px-5'
                                                : 'text-stone-500 flex items-center justify-center cursor-pointer h-16 rounded-2xl px-5 hover:text-orange-500'
                                        }
                                    >
                                        Closed
                                    </div>
                                )}
                            </div>
                        </div>
                        {opened && noPosted && (
                            <div className="flex max-sm:pl-5 items-center gap-x-2 md:w-40">
                                <Popover className=" sm:relative focus:ring-0 focus:border-0 focus:outline-0 md:w-full">
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
                        )}
                    </div>
                    {allLoading && (
                        <div className="flex flex-col gap-y-10 pt-5">
                            <EmployerJobShimmer />
                            <EmployerJobShimmer />
                        </div>
                    )}
                    {opened && <Active sort={sort} setJobId={setEditedJobId} />}
                    {draft && <Drafted setJobId={setEditedJobId} />}
                    {closed && <Closed />}
                </div>
            </div>
        </>
    );
};

export default Jobs;
