import { useEffect, useState } from 'react';
import { accountData, fetchJobs, applyToJobs, alreadyApplied, saveJobs, alreadySaved } from '../lib/services';
import { PostedJob } from '@/lib/Interfaces';
const JobDetails = (props: any) => {
    const handleApply = (jobId: string, employerId: string) => {
        const checkJob = alreadyApplied(props.userId, jobId);
        checkJob.then((res: any) => {
            if (res.total == 0) {
                console.log('not applied');
                applyToJobs(props.userId, jobId, employerId);
            } else {
                console.log('already applied to this job');
            }
        });
    };
    const handleSaveJob = (jobId: string) => {
        const checkSaved = alreadySaved(props.userId, jobId);
        checkSaved.then((res: any) => {
            if (res.total == 0) {
                console.log('not saved');
                saveJobs(props.userId, jobId);
            } else {
                console.log('already saved this job');
            }
        });
        /* const userData:any = accountData();
            candidateId = userData.$id;
            console.log(candidateId); */
        //const apply = saveJobs(candidateId,jobId)
    };
    return (
        <tr key={props.$id}>
            <td style={{ border: '1px solid green' }}>{props.companyName}</td>
            <td style={{ border: '1px solid green' }}>{props.position}</td>
            <td style={{ border: '1px solid green' }}>{props.location}</td>
            <td style={{ border: '1px solid green' }}>{props.industry}</td>
            <td style={{ border: '1px solid green' }}>{props.gender}</td>
            <td style={{ border: '1px solid green' }}>{props.skills}</td>
            <td style={{ border: '1px solid green' }}>{props.salary}</td>
            <td style={{ border: '1px solid green' }}>{props.stat}</td>
            <td>
                <button onClick={() => handleApply(props.jobId, props.employerId)}>Apply</button>
            </td>
            <td>
                <button onClick={() => handleSaveJob(props.jobId)}>save</button>
            </td>
        </tr>
    );
};
const Jobs = () => {
    const userData: any = accountData();
    const jobs = fetchJobs();
    // console.log(userData);
    return (
        <>
            <h1>this is the jobs page</h1>
            <table style={{ marginLeft: '15%', marginTop: '5%', width: '80vw' }} border={1}>
                <tbody>
                    {jobs &&
                        jobs.map((datas: PostedJob) => {
                            return (
                                <JobDetails
                                    userId={userData.$id}
                                    companyName={datas.companyName}
                                    position={datas.jobTitle}
                                    location={datas.jobLocation}
                                    industry={datas.jobIndustry}
                                    gender={datas.prefferedGender}
                                    skills={datas.requiredSkills[0]}
                                    salary={datas.salaryRange}
                                    stat={datas.jobStatus}
                                    jobId={datas.$id}
                                    key={datas.$id}
                                />
                            );
                        })}
                </tbody>
            </table>
        </>
    );
};
export default Jobs;
