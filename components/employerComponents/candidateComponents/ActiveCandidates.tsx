import React, { useEffect, useState } from 'react'
import CandSmall from './CandSmall';
import CandidateDetail from './CandidateDetail';
import { fetchAppliedCandidatesSingleJob } from '@/backend/employerBackend';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const Active = (props: any) => {
    const [openCanDetail, setOpenCanDetail] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [jobDetailIndex, setJobDetailIndex] = useState(0);
    const [candidateDetail, setCandidateDetail] = useState<any>();
    const [appliedCan, setAppliedCan] = useState<any>()
    const getPosted = async () => {
        const applied = await fetchAppliedCandidatesSingleJob(props.jobId);
        applied && setAppliedCan(applied.documents);
    };
    useEffect(() => {
        getPosted();
    }, [props.jobId, props.allCandidates]);
    return (
        <div className='flex w-full max-md:flex-wrap gap-6 max-md:px-2'>
            <div
                className={
                    props.allCandidates == 'All Candidates'
                        ? 'w-full md:w-1/2 flex flex-col gap-y-4 hideScrollBar overflow-y-auto max-h-screen pr-2 md:pr-0'
                        : 'hidden'
                }
            >
                {appliedCan &&
                    appliedCan.map((item: any, index: number) => {
                        return (
                            <div className='relative' key={index}>
                                <CandSmall
                                    indexValue={jobDetailIndex}
                                    indexSetter={setJobDetailIndex}
                                    detailValue={openCanDetail}
                                    imageLinkSetter={setImageUrl}
                                    detailSetter={setOpenCanDetail}
                                    detailHolder={setCandidateDetail}
                                    key={index}
                                    index={index}
                                    itemDetail={item}
                                />
                            </div>
                        );
                    })}
                {
                    appliedCan && appliedCan.length == 0 && <p>Currently there are no applied applicants.</p>
                }

            </div>
            <div
                className={openCanDetail == true ? props.allCandidates == 'All Candidates' ? 'w-full bg-textW pb-10 overflow-y-auto order-2 max-h-screen hideScrollBar' : ' hidden' : props.allCandidates == 'All Candidates' ? 'w-full bg-textW pb-10 overflow-y-auto order-2 max-h-screen hidden md:grid hideScrollBar' : 'hidden'
                }
            >
                {
                    appliedCan && appliedCan.length !== 0 &&
                    <div className='w-full'>
                        <p
                            onClick={() => setOpenCanDetail(false)}
                            className={
                                openCanDetail == true
                                    ? 'cursor-pointer mb-3 rounded-xl text-center border-2 py-3 md:hidden'
                                    : 'hidden'
                            }
                        >
                            <ArrowBackIcon/> Back To Candidate List
                        </p>

                        <CandidateDetail jobId={props.jobId} /* setShortListed={props.setShortListed} */ detailData={candidateDetail} imageLinkValue={imageUrl} short={false} />
                    </div>}
            </div>
        </div>
    )
}

export default Active