import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/lib/context';
import { MiddleWare, PostJob } from '@/lib/middleware';

import {
    accountData,
    deleteShortListedCandidate,
    fetchActivePostedJobs,
    fetchAppliedCandidates,
    fetchAppliedCandidatesSingleJob,
    fetchClosedPostedJobs,
    fetchInterview,
    fetchPausedPostedJobs,
    fetchPostedJobs,
    fetchShortListed,
    interviewStatus,
    shortListedCandidate,
    updateJobStatus
} from '@/lib/services';

const Jobs = () => {
    const { loading, user, role } = useUser();
    const router = useRouter();
    const [postedJobs, setPostedJobs] = useState<any>();
    const [jobId, setJobId] = useState('');
    const [appliedCan, setAppliedCan] = useState<any>();
    const [shortListed, setShortListed] = useState<any>();
    const [interviews, setInterviews] = useState<any>();
    const [interviewDate, setInterviewDate] = useState<any>();
    const [addInterview, setAddInterview] = useState(false);
    const [intervId, setInterId] = useState('');
    useEffect(() => {
        const cand = !(role == '' || role == 'employer') ? true : false;
        if ((!user && !loading) || cand) {
            router.push('/account/signIn');
        }
    }, [user, loading, role]);
    const handleJobSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setJobId(e.currentTarget.value);
        const applied = fetchAppliedCandidatesSingleJob(user, e.currentTarget.value);
        applied.then((res) => console.log(res.documents));
        applied.then((res) => setAppliedCan(res.documents));
        const shortList = fetchShortListed(user, e.currentTarget.value);
        shortList.then((res) => setShortListed(res.documents));
    };
    useEffect(() => {
        const posted = fetchPostedJobs(user);
        posted.then((res) => setPostedJobs(res.documents));
        posted.then((res) => {
            setJobId(res.documents[0] && res.documents[0].$id);
            const applied = fetchAppliedCandidatesSingleJob(user, res.documents[0] && res.documents[0].$id);
            applied.then((res) => setAppliedCan(res.documents));
            const shortList = fetchShortListed(user, res.documents[0] && res.documents[0].$id);
            shortList.then((res) => setShortListed(res.documents));
            const interV = fetchInterview(user, res.documents[0] && res.documents[0].$id);
            interV.then((res) => setInterviews(res.documents));
        });
    }, [user]);
    const handleShortList = (id: string) => {
        const result = shortListedCandidate(user, jobId, id);
        result.then((rel) => {
            const shortList = fetchShortListed(user, jobId);
            shortList.then((res) => setShortListed(res.documents));
        });
    };
    const deleteShortListed = (id: string) => {
        const result = deleteShortListedCandidate(id);
        result.then((rel) => {
            const shortList = fetchShortListed(user, jobId);
            shortList.then((res) => setShortListed(res.documents));
        });
    };
    const handleInterview = () => {
        interviewStatus(intervId, 'true', interviewDate);
        setAddInterview(false);
    };
    return (
        <>
            <select onChange={handleJobSelection}>
                {postedJobs &&
                    postedJobs.map((item: any, index: number) => {
                        return (
                            <option value={item.$id} key={index}>
                                {item.jobTitle}
                            </option>
                        );
                    })}
            </select>
            <div>
                {appliedCan &&
                    appliedCan.map((item: any, index: number) => {
                        return (
                            <div key={index}>
                                <p>{item.candidateId}</p>
                                <button title="Short List" type="button" onClick={() => handleShortList(item.candidateId)}>
                                    shortList +
                                </button>
                            </div>
                        );
                    })}
            </div>
            <div>
                <p>Short Listed</p>
                {shortListed &&
                    shortListed.map((item: any, index: number) => {
                        return (
                            <div key={index}>
                                <p>{item.$id}</p>
                                <button type="button" onClick={() => deleteShortListed(item.$id)}>
                                    shortList -
                                </button>
                                <button type="button" onClick={() => setAddInterview(true)}>
                                    interview +
                                </button>
                            </div>
                        );
                    })}
            </div>
            {addInterview && (
                <div>
                    <form onSubmit={handleInterview}>
                        <input type="date" onChange={(e) => setInterviewDate(e.currentTarget.value)} />
                        <button type="button" onClick={() => setAddInterview(false)}>
                            cancel
                        </button>
                        <button type="submit">Interview</button>
                    </form>
                </div>
            )}
            <u>
                <h1>interviews</h1>
            </u>
            <div>
                {interviews &&
                    interviews.map((item: any, index: number) => {
                        return (
                            <div key={index}>
                                <p>{item.$id}</p>

                                <button type="button" onClick={() => interviewStatus(item.$id, 'false')}>
                                    interview -
                                </button>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default Jobs;
