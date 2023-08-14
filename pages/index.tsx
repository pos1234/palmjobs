import { useEffect, useState } from 'react';
import { /* accountData, */ getUserData, fetchJobs, applyToJobs, alreadyApplied, saveJobs, alreadySaved } from '../lib/services';
import { PostedJob } from '@/lib/Interfaces';
import { useUser } from '@/lib/context';
import { useRouter } from 'next/router';
const JobDetails = (props: any) => {
    const { loading, user, role } = useUser();
    const [checkUser, setCheckUser] = useState(false);
    const router = useRouter();
    useEffect(() => {
        try {
            const cand = !(role == '' || role == 'candidate') ? true : false;
            if ((!user && !loading) || cand) {
                setCheckUser(true);
            }
        } catch (e) {
            console.log(e);
        }
    }, [user, loading, role]);

    const handleApply = (jobId: string, employerId: string) => {
        if (checkUser) {
            router.push('/account/signIn');
        } else {
            router.push({
                pathname: '/users/candidate/applyToJob',
                query: { param1: jobId, param2: employerId }
            });
        }
    };
    const handleSaveJob = (jobId: string) => {
        if (checkUser) {
            router.push('/account/signIn');
        } else {
            const checkJob = alreadyApplied(props.userId, jobId);
            checkJob.then((res) => {
                const checkSaved = alreadySaved(props.userId, jobId);
                if (res.total == 0) {
                    console.log(res);

                    checkSaved.then((rem: any) => {
                        if (rem.total == 0) {
                            console.log('not saved');
                            saveJobs(props.userId, jobId);
                        } else {
                            console.log('already saved this job');
                        }
                    });
                }
            });
            /* router.push({
                pathname: '/users/candidate/applyToJob',
                query: { param1: jobId, param2: employerId }
            }); */
        }
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
                {props.externalLink ? (
                    <a href={props.externalLink}>link</a>
                ) : (
                    <button onClick={() => handleApply(props.jobId, props.employerId)}>Apply</button>
                )}
            </td>
            <td>
                <button onClick={() => handleSaveJob(props.jobId)}>save</button>
            </td>
        </tr>
    );
};
const Jobs = () => {
    const [userData, setUserData] = useState<any>();
    /*     const userData: any = accountData;
     */ useEffect(() => {
        try {
            const userInfo: any = getUserData();
            userInfo.then((res: any) => setUserData(res));
        } catch (e) {
            console.log(e);
        }
    }, []);
    const jobs = fetchJobs();

    return (
        <>
            <h1 className="text-red-500 font-bigW text-bigS leading-bigL">This is the jobs page</h1>
            <p>hey</p>
            {userData && (
                <div>
                    <h1>{userData.name}</h1>
                    <h1>{userData.email}</h1>
                </div>
            )}
            <table style={{ marginLeft: '15%', marginTop: '5%', width: '80vw' }} border={1}>
                <tbody>
                    {jobs &&
                        jobs.map((datas: PostedJob) => {
                            return (
                                <JobDetails
                                    userId={userData && userData.$id}
                                    companyName={datas.companyName}
                                    position={datas.jobTitle}
                                    location={datas.jobLocation}
                                    industry={datas.jobIndustry}
                                    gender={datas.prefferedGender}
                                    skills={datas.requiredSkills[0]}
                                    salary={datas.salaryRange}
                                    stat={datas.jobStatus}
                                    jobId={datas.$id}
                                    externalLink={datas.externalLink}
                                    key={datas.$id}
                                    employerId={datas.employerId}
                                />
                            );
                        })}
                </tbody>
            </table>
        </>
    );
};
export default Jobs;
