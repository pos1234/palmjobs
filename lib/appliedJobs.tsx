import { fetchAppliedJobsData, getAppliedJobId, fetchAppliedJobIds, removeAppliedJobs, accountData } from './services';
import { useEffect, useState } from 'react';
import { useUser } from '@/lib/context';
import { useRouter } from 'next/router';

const userCandidate = () => {
    /*  const { loading, user, role } = useUser();
    const router = useRouter();
    const [appliedJobId, setAppliedJobId] = useState<string[]>([]);
    const [appliedJobs, setAppliedJobs] = useState<any[]>([]);
    useEffect(() => {
          result.then((res: any) => {
            setAppliedJobs(res.documents);
        }); 
        fetchAppliedJobIds().then((res: any) => {
            for (let i = 0; i < res.documents.length; i++) {
                if (!appliedJobId.includes(res.documents[i].jobId)) {
                    appliedJobId.push(res.documents[i].jobId);
                    fetchAppliedJobsData(appliedJobId[i] appliedJobId )
                        .then((responseData) => {
                                                        setAppliedJobs(responseData);
                            
                            appliedJobs.push(responseData);
                            console.log(responseData);
                        })
                        .catch((error) => {
                            console.error('Error fetching data from Appwrite:', error);
                        });
                }
            }
        });
    }, [appliedJobs]);
     const removeApplied = (id: string) => {
        getAppliedJobId(id).then((res) => {
            const index = appliedJobId.indexOf(res.documents[0].$id);
            appliedJobId.splice(index, 1);
            removeAppliedJobs(res.documents[0].$id).then(() => {
                fetchAppliedJobIds().then((res: any) => {
                    return fetchAppliedJobsData( appliedJobId)
                        .then((responseData) => {
                            responseData !== null && setAppliedJobs(responseData.documents);
                            console.log(responseData);
                        })
                        .catch((error) => {
                            console.error('Error fetching data from Appwrite:', error);
                        });
                });
            });
        });
    }; 
    useEffect(() => {
        const cand = !(role == '' || role == 'candidate') ? true : false;
        if ((!user && !loading) || cand) {
            router.push('/account/signIn');
        }
    }, [user, loading, role]);

    return (
        <>
            <table>
                <tbody>
                    {appliedJobs &&
                        appliedJobs.map((datas: any) => {
                            return (
                                <tr key={datas.$id}>
                                    <td>
                                        {datas.companyName} <br />
                                    </td>
                                    <td>
                                        <h1>{datas.jobTitle}</h1>
                                    </td>
                                    <td>{datas.jobLocation}</td>
                                    <td>
                                        <button onClick={() => removeApplied(datas.$id)}>remove</button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </>
    ); */ return <h2>hey</h2>;
};

export default userCandidate;
