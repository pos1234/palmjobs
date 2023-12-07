import React, { useEffect, useState } from 'react'
import CandSmall from './CandSmall';
import CandidateDetail from './CandidateDetail';
import { fetchCandidateDetail, fetchShortListed } from '@/backend/employerBackend';
const Shortlisted = (props: any) => {
    const [openCanDetail, setOpenCanDetail] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [jobDetailIndex, setJobDetailIndex] = useState(0);
    const [candidateDetail, setCandidateDetail] = useState<any>();
    const [documentId, setdocumentId] = useState('');
    const [allLoading, setAllLoading] = useState(false)
    const [shortListed, setShortListed] = useState<any>()
    const getPosted = async () => {
        fetchShortListed(props.jobId).then((res: any) => {
            setShortListed(res.documents)
            if (res.total > 0) {
                fetchCandidateDetail(res.documents[0].candidateId).then((res: any) => {
                    const imageLink = res.documents[0] && res.documents[0].skills && res.documents[0].profilePictureId !== null
                    imageLink ? setImageUrl(res.documents[0].profilePictureId) : setImageUrl('')
                    setCandidateDetail(res.total > 0 && res.documents[0])
                })
            }

        })
    };
    useEffect(() => {
        getPosted();
    }, [props.jobId, props.allCandidates, shortListed && shortListed.length]);
    return (
        <div className='flex w-full max-md:flex-wrap gap-6 max-md:px-2'>
            <div
                className={
                    props.allCandidates == 'Shortlisted'
                        ? 'w-full md:w-1/2 flex flex-col gap-y-4 hideScrollBar overflow-y-auto max-h-screen'
                        : 'hidden'
                }
            >
                {shortListed && shortListed.length == 0 && <p className='text-lightGrey pt-10'>Candidates shortlisted will show up here</p>}
                {shortListed && shortListed.map((item: any, index: number) => {
                    return (
                        <div key={index} className='relative'>
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
                                setDocumentId={setdocumentId}
/*                                 short="true"
 */                            />
                        </div>
                    );
                })}
            </div>
            <div
                className={openCanDetail == true ? props.allCandidates == 'Shortlisted' ? 'w-full flex-grow bg-textW pb-10 overflow-y-auto order-2 max-h-screen hideScrollBar' : ' hidden' : props.allCandidates == 'Shortlisted' ? 'w-full bg-textW pb-10 overflow-y-auto order-2 max-h-screen hidden md:grid hideScrollBar' : 'hidden'
                }>
                {
                    shortListed && shortListed.length !== 0 &&
                    <div className='w-full'>
                        <p
                            onClick={() => setOpenCanDetail(false)}
                            className={
                                openCanDetail == true
                                    ? ' cursor-pointer mb-3 rounded-xl text-gradientFirst text-center border-2 py-3 md:hidden'
                                    : 'hidden'
                            }
                        >
                            Back To Candidate List
                        </p>
                        <CandidateDetail setShortListed={setShortListed} documentId={documentId} jobId={props.jobId} detailData={candidateDetail} imageLinkValue={imageUrl} short={true} />
                    </div>}
            </div>
        </div>
    )
}

export default Shortlisted