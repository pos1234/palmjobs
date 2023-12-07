import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import EmployerJobShimmer from '../../shimmer/EmpJobShimmer';
import JobCard from './JobCard';
import { useJobPostContext } from '@/contextApi/jobPostData';
const Active = (props: any) => {
    const { allEmployerJobs, allLoading } = useJobPostContext()
    const [activeJobs, setActiveJobs] = useState<any>();
    const [noActive, setNoActive] = useState(false);
    const SortData = (sort: any) => {
        if (sort == 'asc') {
            const sortedData =
                activeJobs &&
                activeJobs.sort((a: any, b: any) => {
                    const dateA: Date = new Date(a.datePosted);
                    const dateB: Date = new Date(b.datePosted);

                    const sorted = dateB.getTime() - dateA.getTime();
                    return sorted;
                });
            setActiveJobs(sortedData);
        }
        if (sort == 'desc') {
            const sortedData =
                activeJobs &&
                activeJobs.sort((a: any, b: any) => {
                    const dateA: Date = new Date(a.datePosted);
                    const dateB: Date = new Date(b.datePosted);
                    const sorted = dateA.getTime() - dateB.getTime();
                    return sorted;
                });
            setActiveJobs(sortedData);
        }
    };
    useEffect(() => {
        activeJobs && SortData(props.sort);
    }, [props.sort]);
    useEffect(() => {
        const active = allEmployerJobs && allEmployerJobs.filter((draft: any) => draft.jobStatus === 'Active');
        active && active.length > 0 && setActiveJobs(active)
        active && active.length > 0 && setNoActive(true)
    }, [allEmployerJobs]);
    return (
        <>
            {allLoading && (
                <div className="flex flex-col gap-y-10 pt-5">
                    <EmployerJobShimmer />
                    <EmployerJobShimmer />
                </div>
            )}
            {!allLoading && !noActive && (
                <div className="flex flex-col gap-y-10 pt-5 text-center text-[2rem] pt-20">
                    <h1>You haven't posted a job yet</h1>
                </div>
            )}
            {!allLoading && (
                <div className="max-h-[30rem] overflow-y-auto p-1 xl:p-3 mt-7 flex flex-col gap-4 thinScrollBar">
                    {activeJobs &&
                        activeJobs.map((item: any, index: number) => {
                            return (
                                <JobCard
                                    setEditedJobId={props.handleFullEdit}
                                    compName={item.companyName}
                                    jobId={item.$id}
                                    key={index}
                                    title={item.jobTitle}
                                    location={item.jobLocation}
                                    jobType={item.jobType}
                                    minSalary={item.minSalary}
                                    maxSalary={item.maxSalary}
                                    datePosted={item.datePosted}
                                    jobStatus={item.jobStatus}
                                    jobDes={item.jobDescription}
                                    openRoles={item.openPositions}
                                    deadline={item.applicationDeadline}
                                    setterActiveJobs={setActiveJobs}
                                    applicants={props.applicants}
                                />
                            );
                        })}
                </div>
            )}
        </>
    );
};
export default Active;
