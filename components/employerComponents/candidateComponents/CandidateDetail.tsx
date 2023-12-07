import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EducationDetail from './EducationDetail';
import WorkDetail from './WorkDetail';
import ProjectDetail from './ProjectDetail';
import Link from 'next/link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { downLoadResume } from '@/backend/candidateBackend';
import GetAppIcon from '@mui/icons-material/GetApp';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { ProfilePic } from '@/components/JobImage';
import { useEffect, useState } from 'react';
import { deleteShortListedCandidate, fetchShortListed, shortListedCandidate } from '@/backend/employerBackend';
import { toast } from 'react-toastify';
const CandidateDetail = (props: any) => {
    const pdfIcon = '/images/pdf2.svg';
/*     const [shortListed, setShortListed] = useState<any>()
 */    const [loading, setLoading] = useState(false)
    const parseToArray = (text: string) => {
        const converted = JSON.parse(text)
        return converted
    }
    const handleShortList = async (id: string) => {
        setLoading(true)
        shortListedCandidate(props.jobId, id).then((res) => {
            console.log(res);
            res == null && setLoading(false)
            res !== null && fetchShortListed(props.jobId).then((res: any) => {
                if (res.documents) {
                    setLoading(false)
                    toast.success('Added To ShortList');
/*                     props.setShortListed(res.documents);
 */                } else {
                    toast.error('Not Added');
                }
            })

        })
    };
    const deleteShortListed = async (/* id: string */) => {
        setLoading(true)
        const result = await deleteShortListedCandidate(props.documentId.$id);
        if (result) {
            const shortList = await fetchShortListed(props.jobId);
            if (shortList) {
                setLoading(false)
                toast.success('Removed From ShortList');
                props.setShortListed(shortList.documents);
            } else {
                toast.error('Not Removed');
            }
        }
    };
    return (
        <div className="flex flex-col gap-y-3 rounded-xl border-2 w-full md:flex-grow">
            <div className='w-full flex flex-col gap-5 p-5 border-b-2 '>
                {
                    props && props.detailData &&
                    < div className="flex gap-x-4">
                        {props.imageLinkValue !== '' && <ProfilePic id={props.imageLinkValue} alt='profile' className="w-16 h-16 rounded-xl" />}
                        <div className="flex flex-col ">
                            {props.detailData.name && <p className="text-neutral-900 text-lg font-medium">{props.detailData.name}</p>}
                            <p className="text-neutral-900 text-opacity-70 text-sm font-normal leading-normal">
                                {props.detailData.address && <> <PinDropOutlinedIcon sx={{ fontSize: '1rem' }} /> {props.detailData.address}</>}
                            </p>
                            <div className="flex gap-5 text-gradientFirst items-center mt-3">
                                {props.detailData.linkedIn && (
                                    <Link target="_blank" title="linkedIn" href={props.detailData.linkedIn}>
                                        <LinkedInIcon sx={{ fontSize: '1.4rem' }} />
                                    </Link>
                                )}
                                {props.detailData.github && (
                                    <Link target="_blank" title="github" href={props.detailData.github}>
                                        <GitHubIcon sx={{ fontSize: '1.4rem' }} />
                                    </Link>
                                )}
                                {props.detailData.protfolio && (
                                    <Link target="_blank" title="portifolio" href={props.detailData.protfolio}>
                                        <PhonelinkIcon sx={{ fontSize: '1.4rem' }} />
                                    </Link>
                                )}
                                {props.detailData.behance && (
                                    <Link target="_blank" title="behance" href={props.detailData.behance}>
                                        <FormatBoldIcon sx={{ fontSize: '1.4rem' }} />
                                    </Link>
                                )}
                            </div>

                        </div>
                    </div>
                }
                <div className='w-full flex'>
                    <button type='button' disabled={loading ? true : false} onClick={props.short == true ? () => deleteShortListed(/* props.detailData.$id */) : () => handleShortList(props.detailData.Id)} className='bg-gradient-to-r from-[#00A82D] to-[#0CBC8B] text-textW px-10 py-2 cursor-pointer rounded-sm hover:border-b-4 hover:border-b-black buttonBounce'>
                        {loading && <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gradientFirst animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>}
                        {loading && <span>Loading...</span>}
                        {!loading && props.short == true && <span>Remove</span>}
                        {!loading && props.short !== true && <span>Add to Shortlist</span>}
                    </button>
                </div>

            </div>
            <div className='w-full p-5 flex flex-col gap-5 max-h-96 overflow-y-auto thinScrollBar'>
                {
                    props && props.detailData && props.detailData.coverLetter && (
                        <div className="pb-5 flex-grow max-sm:h-60">
                            <p className="font-fhW text-fhS leading-fhL">
                                <TextSnippetIcon sx={{ marginRight: '0.5rem' }} className='text-gradientFirst' />
                                Cover Letter
                            </p>
                            <div
                                className="border-0 pt-3 text-stone-400 focus:border-0 focus:ring-0 h-full max-h-[80%] w-full overflow-y-auto overflow-x-hidden hideScrollBar"
                                dangerouslySetInnerHTML={{ __html: props.detailData.coverLetter }}
                            />
                        </div>
                    )
                }
                <div className="flex gap-2 gap-y-3 flex-wrap my-2">
                    {props &&
                        props.detailData &&
                        props.detailData.skills && props.detailData.skills.length !== 0 && <p className="font-fhW text-fhS leading-fhL w-full">
                            <LocalFireDepartmentOutlinedIcon sx={{ marginRight: '0.5rem' }} className='text-gradientFirst' />
                            Skills
                        </p>}
                    {props &&
                        props.detailData &&
                        props.detailData.skills &&
                        props.detailData.skills.map((item: any, index: number) => {
                            return (
                                <p
                                    key={index}
                                    className="px-3 py-1 flex items-center bg-skillColor text-gradientFirst text-sm font-normal leading-tight"
                                >
                                    {item}
                                </p>
                            );
                        })}
                </div>
                {
                    props.detailData && props.detailData.workHistory !== null && parseToArray(props.detailData.workHistory).length !== 0 && (
                        <div className="grid grid-cols-12 cursor-pointer md:mb-5 sm:max-md:gap-x-2">
                            <p className="font-fhW text-fhS leading-fhL col-span-12 mb-3">
                                <BusinessCenterIcon sx={{ marginRight: '0.5rem' }} className='text-gradientFirst' />
                                Work History
                            </p>
                            {parseToArray(props.detailData.workHistory).map((item: any, index: number) => {
                                return <WorkDetail key={index} detail={item} />;
                            })}
                        </div>
                    )
                }
                {
                    props && props.detailData && props.detailData.educations !== null && parseToArray(props.detailData.educations).length !== 0 && (
                        <div className="grid grid-cols-12 cursor-pointer md:mb-5 sm:max-md:gap-x-2">
                            <p className="font-fhW text-fhS leading-fhL col-span-12 mb-3">
                                <SchoolOutlinedIcon sx={{ marginRight: '0.5rem' }} className='text-gradientFirst' />
                                Education
                            </p>
                            {parseToArray(props.detailData.educations).map((item: any, index: number) => {
                                return <EducationDetail key={index} detail={item} />;
                            })}
                        </div>
                    )
                }
                {
                    props && props.detailData && props.detailData.projects !== null && parseToArray(props.detailData.projects).length && (
                        <div className="col-span-12 grid grid-cols-12 bg-textW rounded-3xl">
                            <p className="font-fhW text-fhS leading-fhL col-span-12">
                                <AttachFileIcon sx={{ marginRight: '0.5rem', rotate: '40deg' }} className='text-gradientFirst' />
                                Projects
                            </p>
                            {parseToArray(props.detailData.projects).map((item: any, index: number) => {
                                return <ProjectDetail key={index} detail={item} />;
                            })}
                        </div>
                    )
                }
                {props &&
                    props.detailData &&
                    props.detailData.resumeId && (
                        <div className="col-span-12 grid grid-cols-12 bg-textW rounded-3xl">
                            <p className="font-fhW text-fhS leading-fhL col-span-12">
                                <FileCopyOutlinedIcon sx={{ marginRight: '0.5rem' }} className='text-gradientFirst' />
                                Resume
                            </p>
                            <div className="col-span-12 grid grid-cols-12 shadow border border-gradientFirst rounded-3xl mt-5">
                                <div className="py-4 flex items-center justify-center bg-gradientFirst rounded-tl-3xl rounded-bl-3xl shadow col-span-2">
                                    <img src={pdfIcon} className="w-12 h-5 relative" />
                                </div>
                                <div className="col-span-8 flex items-center pl-3 break-all">
                                    <p className="text-black text-lg font-medium leading-loose sm:text-xl">resume</p>
                                </div>
                                <div className="col-span-2 flex items-center justify-around">
                                    <div className="h-8 bg-fadedText flex w-0.5"></div>
                                    <div className="col-span-12 flex items-center justify-end pt-1">
                                        <GetAppIcon
                                            className="w-9 h-9 text-fadedText cursor-pointer"
                                            onClick={() => downLoadResume(props.detailData.resumeId)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        </div >
    );
};
export default CandidateDetail;
