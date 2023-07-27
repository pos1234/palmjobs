import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import { fetchSavedJobIds, unSaveJobs, fetchSavedJobsData, getSavedJobId } from '../../../lib/services';
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
                            console.log(responseData);
                        })
                        .catch((error) => {
                            console.error('Error fetching data from Appwrite:', error);
                        });
                }
            }
        });
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
                            console.log(responseData);
                        })
                        .catch((error) => {
                            console.error('Error fetching data from Appwrite:', error);
                        });
                });
            });
        });
    };

    return (
        <>
            <Container>
                <Navigation />
                <table>
                    <tbody>
                        {savedJobs &&
                            savedJobs.map((datas: any) => {
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
                                            <button onClick={() => removeSave(datas.$id)}>remove</button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </Container>
        </>
    );
};

export default userCandidate;
