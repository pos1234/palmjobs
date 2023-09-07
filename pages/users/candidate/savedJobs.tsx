import { fetchSavedJobIds, unSaveJobs, fetchSavedJobsData, getSavedJobId, fetchAppliedJobIds } from '../../../lib/services';
import { useEffect, useState } from 'react';
import { useUser } from '@/lib/context';
import { useRouter } from 'next/router';
import Navigation from '@/components/Navigation';
const userCandidate = () => {
    const { loading, user, role } = useUser();
    const router = useRouter();
    const [savedJobId, setSavedJobId] = useState<any[]>([]);
    const [savedJobs, setSavedJobs] = useState<any[]>([]);
    useEffect(() => {
        const cand = !(role == '' || role == 'candidate') ? true : false;
        if ((!user && !loading) || cand) {
            router.push('/account/signIn');
        }
    }, [user, loading, role]);
    useEffect(() => {
        fetchSavedJobIds().then((res: any) => {
            for (let i = 0; i < res.documents.length; i++) {
                if (!savedJobId.includes(res.documents[i].jobId)) {
                    savedJobId.push(res.documents[i].jobId);
                    fetchSavedJobsData(savedJobId)
                        .then((responseData) => {
                            setSavedJobs(responseData);
                            // console.log(responseData);
                        })
                        .catch((error) => {
                            console.error('Error fetching data from Appwrite:', error);
                        });
                }
            }
        });
        /*  fetchSavedJobIds().then((res: any) => {
            console.log(res.documents[0]);
        });
        fetchAppliedJobIds().then((res: any) => {
            console.log(res.documents[0]);

             for (let i = 0; i < res.documents.length; i++) {
                unSaveJobs(res.documents[i].$id).then(() => {});
            } 
        }); */
    }, [savedJobId]);
    const removeSave = (id: string) => {
        getSavedJobId(id).then((res) => {
            const index = savedJobId.indexOf(res.documents[0].$id);
            savedJobId.splice(index, 1);
            unSaveJobs(res.documents[0].$id).then(() => {
                fetchSavedJobIds().then((res: any) => {
                    fetchSavedJobsData(savedJobId)
                        .then((responseData) => {
                            setSavedJobs(responseData);
                            // console.log(responseData);
                        })
                        .catch((error) => {
                            console.error('Error fetching data from Appwrite:', error);
                        });
                });
            });
        });
    };
    const applJob = (id: string, employerId: string) => {
        router.push({
            pathname: '/users/candidate/applyToJob',
            query: { param1: id, param2: employerId }
        });
        // console.log(id);
    };
    return (
        <>
            <table>
                <tbody>
                    {savedJobs &&
                        savedJobs.map((datas: any) => {
                            return (
                                datas && (
                                    <tr key={datas.$id}>
                                        <td>
                                            {datas.companyName} <br />
                                        </td>
                                        <td>
                                            <h1>{datas.jobTitle}</h1>
                                        </td>
                                        <td>{datas.jobLocation}</td>
                                        <td>
                                            <button onClick={() => removeSave(datas.$id)}>remove</button>
                                        </td>
                                        <td>
                                            <button onClick={() => applJob(datas.$id, datas.employerId)}>apply</button>
                                        </td>
                                    </tr>
                                )
                            );
                        })}
                </tbody>
            </table>
        </>
    );
};

export default userCandidate;
