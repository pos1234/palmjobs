import React, { useEffect, useState } from 'react';
import {
    alreadyApplied,
    applyToJobs,
    fetchSavedJobIds,
    fetchSavedJobsData,
    getCandidateInfo,
    getResume,
    getSavedJobId,
    unSaveJobs,
    uploadResume
} from '@/lib/services';
import { useRouter } from 'next/router';
const applyToJob = () => {
    const router = useRouter();
    const [userData, setUserData] = useState<any>();
    const [cover, setCover] = useState('');
    const [editLetter, setEditLetter] = useState(false);
    const [jobId, setJobId] = useState<any>();
    const [employerId, setEmployerId] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [appliedJob, setAppliedJob] = useState(false);
    const [currentResume, setCurrentResume] = useState<any>();
    const [replaceResume, setReplaceResume] = useState<any>();
    const [currentResumeId, setCurrentResumeId] = useState('');
    const { query } = router;

    useEffect(() => {
        const data = getCandidateInfo();
        data.then((res) => {
            setUserData(res.documents[0]);
            setCover(res.documents[0].coverLetter);
        });
    }, []);
    useEffect(() => {
        setJobId(query.param1);
        setEmployerId(query.param2);
    }, [query]);
    useEffect(() => {
        const applied = alreadyApplied(userData && userData.Id, jobId);
        const resume = userData && getResume(userData.resumeId);
        resume &&
            resume.then((res: any) => {
                setCurrentResume(res.name);
                setCurrentResumeId(res.$id);
                // console.log(res.$id);
            });

        console.log(resume);

        applied.then((res: any) => {
            if (res.total == 0) {
                setAppliedJob(false);
                setLoading(false);
            } else {
                setAppliedJob(true);
                setLoading(false);
            }
        });
    }, [userData]);
    const EditCover = () => {
        setEditLetter(true);
    };
    const updateCover = () => {
        setEditLetter(false);
    };
    const changeResume = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        /* setReplaceResume(e.currentTarget.files) */
        /* setCurrentResume(e.currentTarget && e.currentTarget.files[0].name); */
    };
    const apply = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (replaceResume) {
            uploadResume(replaceResume[0]).then((res) => {
                applyToJobs(userData.Id, jobId, employerId, cover, res.$id).then((res) => {
                    getSavedJobId(jobId).then((rep) => {
                        console.log(rep);

                        unSaveJobs( rep.documents[0].$id).then((rem) => {
                            //console.log(rem);
                        });
                    });
                });
            });
        }

        applyToJobs(userData.Id, jobId, employerId, cover, currentResumeId).then((res) => {
            getSavedJobId(jobId).then((res) => {
                unSaveJobs(res.documents[0].$id).then((rem) => {
                    console.log(rem);
                });
            });
        });
    };

    return (
        <div>
            {userData && !appliedJob && !loading && (
                <form onSubmit={apply}>
                    <h1>This is the data that will be sent to the employer</h1>
                    <h2>{userData.bioHeadline}</h2>
                    <p>{userData.bioDescription}</p>
                    {userData.skills.map((item: any, index: any) => (
                        <button style={{ marginRight: '10px' }} key={index}>
                            {item}
                        </button>
                    ))}
                    <p>cover Letter</p>
                    {!editLetter && (
                        <p style={{ width: '50%' }}>
                            {cover} <button onClick={() => EditCover()}>Edit</button>
                        </p>
                    )}
                    {editLetter && (
                        <>
                            <textarea value={cover} onChange={(e) => setCover(e.currentTarget.value)}></textarea>
                            <button onClick={updateCover}>update</button>
                        </>
                    )}
                    <h1>
                        {currentResume && currentResume} {currentResumeId}
                    </h1>
                    {currentResume ? <p>replace</p> : <p>upload resume</p>}

                    <input
                        type="file"
                        onChange={(e) => {
                            setReplaceResume(e.currentTarget.files);
                            setCurrentResume(e.currentTarget.files && e.currentTarget.files[0].name);
                        }}
                    />
                    <button type="submit">apply</button>
                </form>
            )}
            {!loading && appliedJob && <h1>already applied to this job</h1>}
            {loading && <h1>Loading....</h1>}
        </div>
    );
};

export default applyToJob;
/* React DropZone */
/* React Toastify */