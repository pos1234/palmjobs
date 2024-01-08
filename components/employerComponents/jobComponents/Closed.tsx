import { fetchClosedPostedJobs } from '@/backend/employerBackend';
import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import EmployerJobShimmer from '../../shimmer/EmpJobShimmer';
import JobCard from './JobCard';
import { useJobPostContext } from '@/contextApi/jobPostData';
const Closed = () => {
    const { allEmployerJobs } = useJobPostContext()
    const [closedJobs, setClosedJobs] = useState<any>();
    const [allLoading, setAllLoading] = useState(false);
    useEffect(() => {
        const closed = allEmployerJobs && allEmployerJobs.filter((draft: any) => draft.jobStatus === 'Close');
        closed && closed.length > 0 && setClosedJobs(closed)
    }, [allEmployerJobs]);
    return (
        <>
            {allLoading && (
                <div className="flex flex-col gap-y-10 pt-5">
                    <EmployerJobShimmer />
                    <EmployerJobShimmer />
                </div>
            )}
            {!allLoading && (
                <div className="max-h-[30rem] overflow-y-auto p-1 xl:p-3 mt-7 flex flex-col gap-4 thinScrollBar">
                    {closedJobs &&
                        closedJobs.map((item: any, index: number) => {
                            return (
                                <JobCard
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
                                    setterActiveJobs={setClosedJobs}
                                />
                            );
                        })}
                </div>
            )}
        </>
    );
};

export default Closed;
