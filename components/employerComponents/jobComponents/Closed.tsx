import { fetchClosedPostedJobs } from '@/lib/employerBackend';
import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import EmployerJobShimmer from '../../shimmer/EmpJobShimmer';
import JobCard from './JobCard';
const Closed = () => {
    const [closedJobs, setClosedJobs] = useState<any>();
    const [allLoading, setAllLoading] = useState(false);
    const getClosedJobs = async () => {
        setAllLoading(true);
        const result = await fetchClosedPostedJobs();
        if (result && result.documents) {
            setClosedJobs(result.documents);
            setAllLoading(false);
        }
    };
    useEffect(() => {
        getClosedJobs();
    }, []);
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
