import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/lib/context';
import { MiddleWare, PostJob } from '@/lib/middleware';

import { accountData, fetchAppliedCandidates, fetchPostedJobs } from '@/lib/services';

const Dashboard = () => {
    const { loading, user, role } = useUser();
    const [postedJobs, setPostedJobs] = useState<number>();
    const [appliedCan, setAppliedCan] = useState<any>();
    const [postedDetails, setPostedDetails] = useState<any>();
    const router = useRouter();
    useEffect(() => {
        const cand = !(role == '' || role == 'employer') ? true : false;
        if ((!user && !loading) || cand) {
            router.push('/account/signIn');
        }
    }, [user, loading, role]);
    useEffect(() => {
        const posted = fetchPostedJobs(user);
        posted.then((res) => setPostedJobs(res.total));
        const jobDetail = fetchPostedJobs(user);
        jobDetail.then((res) => setPostedDetails(res.documents));
        const applied = fetchAppliedCandidates(user);
        applied.then((res) => setAppliedCan(res.total));
        jobDetail.then((res) => console.log(res.documents));
    }, [user]);
    return (
        <div>
            <h1>posted jobs</h1>
            <h4>{postedJobs}</h4>

            <h1>applications</h1>
            <h4>{appliedCan}</h4>
            <div>
                {postedDetails &&
                    postedDetails.map((item: any, index: number) => {
                        return <p key={index}>{item.jobTitle}</p>;
                    })}
            </div>
        </div>
    );
};

export default Dashboard;
