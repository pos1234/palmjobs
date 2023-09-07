import { useEffect, useState } from 'react';
import ConfirmModal from '../ConfirmModal';
import CloseIcon from '@mui/icons-material/Close';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import GetAppIcon from '@mui/icons-material/GetApp';
import 'react-quill/dist/quill.snow.css';
import { FileUploader } from 'react-drag-drop-files';
import EditIcon from '@mui/icons-material/Edit';
import dynamic from 'next/dynamic';
import {
    getUserData,
    alreadyApplied,
    applyToJobs,
    fetchSavedJobIds,
    fetchSavedJobsData,
    getCandidateInfo,
    getResume,
    getSavedJobId,
    unSaveJobs,
    uploadResume,
    downLoadResume
} from '@/lib/services';
import { toast } from 'react-toastify';
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
});
const ApplyToJob = (props: any) => {
    const profile = '/images/profile.svg';
    const pdfIcon = '/images/pdf2.svg';
    const [openApply, setOpenApply] = useState(true);
    const [fisrt, setFirst] = useState(true);
    const [second, setSecond] = useState(false);
    const [third, setThird] = useState(false);
    const [fourth, setFourth] = useState(false);
    const [userData, setUserData] = useState<any>();
    const [cover, setCover] = useState('');
    const [loading, setLoading] = useState(true);
    const [appliedJob, setAppliedJob] = useState(false);
    const [currentResume, setCurrentResume] = useState<any>();
    const [replaceResume, setReplaceResume] = useState<any>();
    const [currentResumeId, setCurrentResumeId] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newName, setNewName] = useState('');
    const [phone, setPhone] = useState('');
    const [linked, setLinked] = useState('');
    const [fileName, setFileName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const toggleTabs = () => {
        if (fisrt == true) {
            setFirst(false);
            setSecond(true);
            setThird(false);
            setFourth(false);
        } else if (second == true) {
            setFirst(false);
            setSecond(false);
            setThird(true);
            setFourth(false);
        } else if (third == true) {
            setFirst(false);
            setSecond(false);
            setThird(false);
            setFourth(true);
        }
    };
    useEffect(() => {
        getUserData().then((res) => {
            setNewName(res.name);
            setNewEmail(res.email);
        });
    }, []);
    const fileTypes = ['pdf', 'doc', 'docx'];
    const updateTheCv = (files: any) => {
        setFileName(files.name);
        setReplaceResume(files);
        setErrorMessage('');
    };
    const displayError = (err: any) => {
        setErrorMessage(err);
        console.log(err);
    };
    const sizeError = (err: any) => {
        setErrorMessage(err);
        console.log(err);
    };
    useEffect(() => {
        const data = getCandidateInfo();
        data.then((res) => {
            setUserData(res.documents[0]);
            setPhone(res.documents[0].phoneNumber);
            setLinked(res.documents[0].linkedIn);
            setCover(res.documents[0].coverLetter);
        });
    }, []);
    useEffect(() => {
        console.log(loading);
    }, [loading]);
    useEffect(() => {
        const applied = alreadyApplied(userData && userData.Id, props.jobId);
        const resume = userData && userData.resumeId != null && getResume(userData.resumeId);
        resume &&
            resume.then((res: any) => {
                setFileName(res.name);
                setCurrentResumeId(res.$id);
            });
        applied.then((res: any) => {
            if (res.total !== 0) {
                setAppliedJob(true);

                const timer = setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } else {
                setAppliedJob(false);
                const timer = setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        });
    }, [userData]);
    const apply = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (replaceResume) {
            uploadResume(replaceResume).then((res) => {
                applyToJobs(userData.Id, props.jobId, props.employerId, newEmail, phone, cover, res.$id)
                    .then((res) => {
                        toast.success('Successfully Applied');
                        /*  getSavedJobId(props.jobId).then((rep) => {
                                                    console.log(rep);
                              rep.total != 0 &&
                                unSaveJobs(rep.documents[0].$id).then((rem) => {
                                    //console.log(rem);
                                });
                        });*/
                    })
                    .catch((error) => {
                        toast.error('Not Applied');
                        console.log(error);
                    });
            });
        } else {
            applyToJobs(userData.Id, props.jobId, props.employerId, newEmail, phone, cover, currentResumeId)
                .then((res) => {
                    toast.success('Successfully Applied'); /*   res.total != 0 &&

            /*             getSavedJobId(props.jobId).then((res) => {
             
                    unSaveJobs(res.documents[0].$id).then((rem) => {
                                               console.log(rem);
                         
                    }); 
                        });
             */
                })
                .catch((error) => {
                    toast.error('Not Applied');
                    console.log(error);
                });
        }
    };
    return (
        <>
            {userData && (
                <ConfirmModal isOpen={openApply} handleClose={() => setOpenApply(!openApply)}>
                    {loading && (
                        <div className="mx-2 pb-10 w-full pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-10 md:pl-8 pr-5 md:w-2/3 lg:w-1/2 md:mx-0">
                            <div className="col-span-12 md:col-span-5 xl:col-span-6 pt-5">
                                <div className="h-6 bg-gray-300 rounded animate-pulse w-48"></div>
                                <div className="flex gap-x-2 md:max-xl:flex-col pt-3">
                                    <div className="w-24 h-24 rounded-2xl bg-gray-300 rounded animate-pulse col-span-12"></div>
                                    <div className="flex flex-col gap-2">
                                        <div className="text-neutral-900 text-xl font-medium leading-7">
                                            <div className="h-6 bg-gray-300 rounded animate-pulse col-span-12"></div>
                                        </div>
                                        <div className="text-stone-300 text-lg font-normal leading-relaxed">
                                            <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                                        </div>
                                        <div className="text-neutral-900 text-opacity-70 text-xl font-normal leading-7">
                                            <div className="h-6 bg-gray-300 rounded animate-pulse w-20"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-7 xl:col-span-6 pt-14 flex flex-col gap-y-3">
                                <div className="h-6 bg-gray-300 rounded animate-pulse w-full"></div>
                                <div className="h-6 bg-gray-300 rounded animate-pulse w-full"></div>
                                <div className="h-6 bg-gray-300 rounded animate-pulse w-full"></div>
                            </div>
                        </div>
                    )}

                    {!loading && appliedJob && (
                        <div className="mx-2 pb-10 w-full pl-5 bg-textW rounded-2xl flex flex-col gap-y-5 items-center justify-center pt-10 md:pl-8 pr-5 md:w-2/3 lg:w-1/2 md:mx-0">
                            <p className="col-span-12 text-black text-3xl font-semibold leading-10 ">Already applied to this job</p>
                            <button
                                onClick={() => {
                                    props.setterFunction(false);
                                    setLoading(true);
                                }}
                                type="button"
                                className="text-textW bg-gradient-to-r  from-gradientFirst to-gradientSecond h-16 w-48 rounded-full  order-1 col-span-12 sm:order-2 sm:col-span-6 xl:col-span-3"
                            >
                                Explore Jobs
                            </button>
                        </div>
                    )}
                    {!appliedJob && !loading && (
                        <form
                            onSubmit={apply}
                            className="mx-2 pb-10 w-full pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-10 h-full overflow-y-auto md:pl-8 pr-5 md:w-2/3 lg:w-1/2 md:mx-0 xl:h-auto xl:overflow-y-hidden"
                        >
                            <div className="col-span-12 grid grid-cols-12 ">
                                <div className="col-span-12 grid grid-cols-12 mb-5">
                                    <p className="font-thW text-frhS leading-shL text-modalTitle col-span-10 md:col-span-11">
                                        <BusinessCenterIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem' }} />
                                        Apply Job
                                    </p>
                                </div>
                                <div className="col-span-12 grid grid-cols-12 gap-x-2 pr-3 mt-5">
                                    <div className="rounded-2xl bg-gradientFirst h-1.5 col-span-3"></div>
                                    <div
                                        className={
                                            second || third || fourth
                                                ? 'rounded-2xl bg-gradientFirst h-1.5 col-span-3'
                                                : 'rounded-2xl bg-fadedText h-1.5 col-span-3'
                                        }
                                    ></div>
                                    <div
                                        className={
                                            third || fourth
                                                ? 'rounded-2xl bg-gradientFirst h-1.5 col-span-3'
                                                : 'rounded-2xl bg-fadedText h-1.5 col-span-3'
                                        }
                                    ></div>
                                    <div
                                        className={
                                            fourth
                                                ? 'rounded-2xl bg-gradientFirst h-1.5 col-span-3'
                                                : 'rounded-2xl bg-fadedText h-1.5 col-span-3'
                                        }
                                    ></div>
                                </div>
                                {fourth && (
                                    <div className="col-span-12 grid grid-cols-12 pt-5 mb-5 ">
                                        <p className="col-span-12 text-black text-3xl font-semibold leading-10">Review your application</p>
                                        <p className="col-span-12 text-neutral-400 text-sm font-light">
                                            The employer will also receive a copy of your profile
                                        </p>
                                        <div className="col-span-12 md:col-span-5 xl:col-span-6">
                                            <p className="text-black text-lg font-semibold leading-10">Contact info</p>
                                            <div className="flex gap-x-2 md:max-xl:flex-col pt-3">
                                                <img className="w-24 h-24 rounded-2xl" src={profile} />
                                                <div className="flex flex-col ">
                                                    <div className="text-neutral-900 text-xl font-medium leading-7">{newName}</div>
                                                    <div className="text-stone-300 text-lg font-normal leading-relaxed">
                                                        {userData.bioHeadline}
                                                    </div>
                                                    <div className="text-neutral-900 text-opacity-70 text-xl font-normal leading-7">
                                                        <PinDropOutlinedIcon className="w-6 h-6 relative" />
                                                        {userData.address}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-7 xl:col-span-6 relative">
                                            <EditIcon
                                                onClick={() => {
                                                    setSecond(false);
                                                    setFirst(true);
                                                    setThird(false);
                                                    setFourth(false);
                                                }}
                                                sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                                className="w-7 h-7 p-1.5 mr-2 cursor-pointer absolute right-0 top-0"
                                            />
                                            <p className="font-fhW text-smS mt-5 leading-shL ">Email address</p>
                                            <p className="text-neutral-400">{newEmail}</p>
                                            <p className="font-fhW text-smS mt-2  leading-shL">Mobile phone number</p>
                                            <p className="text-neutral-400">{phone}</p>
                                            {/*   <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Linkedin</p>
                            <input
                                type="text"
                                placeholder="Johndoe.linkedin.com"
                                className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                            /> */}
                                        </div>
                                        <div className="col-span-12 grid grid-cols-12 shadow border border-orange-600 rounded-3xl mt-2">
                                            <div className=" flex items-center justify-center bg-red-600 rounded-tl-3xl rounded-bl-3xl shadow col-span-2">
                                                <img src={pdfIcon} className="w-10 h-16 relative" />
                                            </div>
                                            <div className="col-span-7 flex items-center pl-3">
                                                <p className="text-black text-2xl font-medium leading-loose">{fileName}</p>
                                            </div>
                                            <div className="col-span-3 grid grid-cols-12">
                                                <div className="col-span-9 flex justify-end items-center pr-4">
                                                    <div className="w-7 h-7 border rounded-full border-orange-500 p-1">
                                                        <div className="w-full h-full flex rounded-full bg-gradient-to-r from-gradientFirst to-gradientSecond"></div>
                                                    </div>
                                                </div>
                                                <div className="col-span-3 flex items-center justify-end pt-1">
                                                    <EditIcon
                                                        onClick={() => {
                                                            setSecond(true);
                                                            setFirst(false);
                                                            setThird(false);
                                                            setFourth(false);
                                                        }}
                                                        sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                                        className="w-7 h-7 p-1.5 mr-2 cursor-pointer"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12 mt-5 relative">
                                            <EditIcon
                                                onClick={() => {
                                                    setSecond(false);
                                                    setFirst(false);
                                                    setThird(true);
                                                    setFourth(false);
                                                }}
                                                sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                                className="w-7 h-7 p-1.5 mr-2 cursor-pointer absolute right-0 top-0"
                                            />
                                            <p className="text-black text-lg font-semibold leading-10">Cover Letter</p>
                                            <div className=" max-h-[9rem] overflow-y-auto" dangerouslySetInnerHTML={{ __html: cover }} />
                                        </div>
                                    </div>
                                )}
                                <div className={third ? 'col-span-12 pt-5 mb-5 md:mb-10 lg:mb-5' : 'hidden'}>
                                    <p className="col-span-12 text-black text-3xl font-semibold leading-10">Cover Letter</p>
                                    <p className="text-neutral-400 text-sm font-light mb-5">
                                        Describe the responsibilities of this job, required work experience, skills, or education.
                                    </p>
                                    <ReactQuill
                                        className="h-28 text-addS"
                                        value={cover}
                                        onChange={(e) => setCover(e)}
                                        placeholder="Add Description"
                                    />
                                </div>
                                {second && (
                                    <div className="col-span-12 pt-5 grid grid-cols-12">
                                        <p className="col-span-12 text-black text-3xl font-semibold leading-10">Resume</p>
                                        <div className="col-span-12 grid grid-cols-12 shadow border border-orange-600 rounded-3xl mt-2">
                                            <div className="py-4 flex items-center justify-center bg-red-600 rounded-tl-3xl rounded-bl-3xl shadow col-span-2">
                                                <img src={pdfIcon} className="w-12 h-16 relative" />
                                            </div>
                                            <div className="col-span-7 flex items-center pl-3 break-all">
                                                <p className="text-black text-lg font-medium leading-loose sm:text-xl">{fileName}</p>
                                            </div>
                                            <div className="col-span-3 grid grid-cols-12">
                                                <div className="col-span-6 flex items-center justify-end pt-1">
                                                    <GetAppIcon
                                                        className="w-9 h-9 text-fadedText mr-3 cursor-pointer"
                                                        onClick={() => downLoadResume(currentResumeId)}
                                                    />
                                                    <div className="h-12 bg-fadedText flex w-0.5"></div>
                                                </div>
                                                <div className="col-span-6 flex items-center pl-4">
                                                    <div className="w-7 h-7 border rounded-full border-orange-500 p-1">
                                                        <div className="w-full h-full flex rounded-full bg-gradient-to-r from-gradientFirst to-gradientSecond"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" col-span-6 mt-14">
                                            <FileUploader
                                                multiple={false}
                                                maxSize={1}
                                                onSizeError={sizeError}
                                                onTypeError={displayError}
                                                handleChange={updateTheCv}
                                                classes={
                                                    errorMessage
                                                        ? 'text-stone-300 border relative flex items-center justify-center border-red-300 h-14 w-full rounded-full cursor-pointer'
                                                        : 'text-stone-300 border relative flex items-center justify-center border-stone-300 h-14 w-full rounded-full cursor-pointer'
                                                }
                                                types={fileTypes}
                                            >
                                                Upload Resume
                                            </FileUploader>
                                            <div className="text-stone-300 text-sm text-center mt-3 font-light leading-normal">
                                                {errorMessage && <div className="text-red-500 text-xs mb-2">{errorMessage}</div>}
                                                DOC, DOCX, PDF (1 MB)
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {fisrt && (
                                    <div className="col-span-12 md:col-span-5 xl:col-span-6 pt-5">
                                        <p className="text-black text-3xl font-semibold leading-10 ">Contact info</p>
                                        <div className="flex gap-x-2 md:max-xl:flex-col pt-3">
                                            <img className="w-24 h-24 rounded-2xl" src={profile} />
                                            <div className="flex flex-col gap-0.5">
                                                <div className="text-neutral-900 text-xl font-medium leading-7">{newName}</div>
                                                <div className="text-stone-300 text-lg font-normal leading-relaxed">
                                                    {userData.bioHeadline}
                                                </div>
                                                <div className="text-neutral-900 text-opacity-70 text-xl font-normal leading-7">
                                                    <PinDropOutlinedIcon className="w-6 h-6 relative" />
                                                    {userData.address}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {fisrt && (
                                    <div className="col-span-12 md:col-span-7 xl:col-span-6">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Email address</p>
                                        <input
                                            value={newEmail}
                                            onChange={(e) => setNewEmail(e.currentTarget.value)}
                                            type="text"
                                            placeholder="JohnDoe@gmail.com"
                                            className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                        />
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Mobile phone number</p>
                                        <input
                                            value={phone}
                                            onChange={(e) => setPhone(e.currentTarget.value)}
                                            type="text"
                                            placeholder="+251 911 2424 23"
                                            className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                        />
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Linkedin</p>
                                        <input
                                            value={linked}
                                            onChange={(e) => setLinked(e.currentTarget.value)}
                                            type="text"
                                            placeholder="Johndoe.linkedin.com"
                                            className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="col-span-12 grid grid-cols-12 gap-y-5 gap-x-3 mt-5 md:gap-y-0 lg:mt-10">
                                <p className="text-zinc-900 text-sm flex items-center font-light leading-normal order-3 col-span-12 sm:col-span-12 sm:pt-5 xl:order-1 xl:col-span-6">
                                    Submitting this application won’t change your profile.
                                </p>
                                <button
                                    onClick={() => props.setterFunction(false)}
                                    className="text-stone-300 border border-stone-300 h-16 w-full rounded-full order-2 col-span-12 sm:order-1 sm:col-span-6 xl:col-span-3"
                                >
                                    Discard
                                </button>
                                {!fourth && (
                                    <button
                                        onClick={toggleTabs}
                                        type="button"
                                        className="text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full rounded-full  order-1 col-span-12 sm:order-2 sm:col-span-6 xl:col-span-3"
                                    >
                                        Continue
                                    </button>
                                )}
                                {fourth && (
                                    <button
                                        type="submit"
                                        className="text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full rounded-full  order-1 col-span-12 sm:order-2 sm:col-span-6 xl:col-span-3"
                                    >
                                        Apply
                                    </button>
                                )}
                            </div>
                        </form>
                    )}
                </ConfirmModal>
            )}
        </>
    );
};
export default ApplyToJob;
