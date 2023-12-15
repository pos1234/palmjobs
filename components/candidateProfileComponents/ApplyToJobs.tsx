import { useEffect, useState } from 'react';
import ConfirmModal from '../ConfirmModal';
import GetAppIcon from '@mui/icons-material/GetApp';
import 'react-quill/dist/quill.snow.css';
import { FileUploader } from 'react-drag-drop-files';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import EditIcon from '@mui/icons-material/Edit';
import dynamic from 'next/dynamic';
import Notification from '../Notification';
import {
    alreadyApplied,
    applyToJobs,
    getResumeName,
    uploadResume,
    downLoadResume,
    alreadySaved,
    unSaveJobs,
} from '@/backend/candidateBackend';
import { getAccount } from '@/backend/accountBackend';
import { toast } from 'react-toastify';
import { SendJobAppliedEmail } from '../SendEmail';
import Link from 'next/link';
import { ProfilePic } from '../JobImage';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextInput, { SubmitButton } from '../TextInput';
import { useGlobalContext } from '@/contextApi/userData';
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
const VERIFY = process.env.NEXT_PUBLIC_VERIFY || '';
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
});
const ApplyToJob = (props: any) => {
    const { userDetail, userData } = useGlobalContext()
    const pdfIcon = '/images/pdf2.svg';
    const [first, setFirst] = useState(true);
    const [second, setSecond] = useState(false);
    const [third, setThird] = useState(false);
    const [fourth, setFourth] = useState(false);
    const [cover, setCover] = useState('');
    const [loading, setLoading] = useState(false);
    const [appliedJob, setAppliedJob] = useState(false);
    const [replaceResume, setReplaceResume] = useState<any>();
    const [currentResumeId, setCurrentResumeId] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newName, setNewName] = useState('');
    const [phone, setPhone] = useState<any>();
    const [linked, setLinked] = useState('');
    const [fileName, setFileName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openNotify, setOpenNotify] = useState(false);
    const [failed, setFailed] = useState(false);
    const [loadingApply, setLoadingApply] = useState(false);
    const [skillLength, setSkillLength] = useState(0)
    const [educationLength, setEducationLength] = useState(0)
    const toggleTabs = () => {
        if (first == true) {
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
    const backToggleTabs = () => {
        if (second == true) {
            setFirst(true);
            setSecond(false);
        }
        if (third == true) {
            setThird(false);
            setSecond(true);
        }
        if (fourth == true) {
            setFourth(false);
            setThird(true);
        }
    };
    const getData = async () => {
        if (userData) {
            setNewName(userData.name);
            setNewEmail(userData.email);
        }
    };
    const getCanInfo = async () => {
        if (userDetail) {
            setPhone(userDetail.phoneNumber);
            setLinked(userDetail.linkedIn);
            setCover(userDetail.coverLetter);
            if (userDetail.skills == null || userDetail.skills && userDetail.skills.length == 0) {
                setSkillLength(0)
            }
            if (userDetail.educations == null || userDetail.educations && JSON.parse(userDetail.educations).length == 0) {
                setEducationLength(0)
            }
        }
    };
    const checkApplied = async () => {
        setLoading(true);
        if (userDetail) {
            alreadyApplied(userDetail.$id, props.jobId).then((applied) => {
                setLoading(false);
                const resume = userDetail.resumeId != null && getResumeName(userDetail.resumeId);
                resume &&
                    resume.then((res: any) => {
                        setFileName(res.name);
                        setCurrentResumeId(res.$id);
                    });
                if (applied.total !== 0) {
                    setAppliedJob(true);
                }
                if (applied.total == 0) {
                    setLoading(false);
                    setAppliedJob(false);
                }

            });
        }
    };
    const fileTypes = ['pdf', 'doc', 'docx'];
    const updateTheCv = (files: any) => {
        setFileName(files.name);
        setReplaceResume(files);
        setErrorMessage('');
    };
    const displayError = (err: any) => {
        setErrorMessage(err);
    };
    const sizeError = (err: any) => {
        setErrorMessage(err);
    };
    const apply = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setLoadingApply(true);
        if (replaceResume) {
            uploadResume(replaceResume).then((res) => {
                applyToJobs(userDetail.$id, props.jobId, props.employerId, newEmail, phone, cover, res.$id).then((res) => {
                    setOpenNotify(true);
                    setFailed(false);
                    setLoadingApply(false);
                    const checkSaved = alreadySaved(userData.$id, props.jobId);
                    checkSaved.then((rem: any) => {
                        if (rem.total > 0) {
                            unSaveJobs(rem.documents[0].$id).then((rem) => {
                                if (props.refetch) {
                                    props.refetch
                                }
                            }).catch((error) => {
                                toast.error('Failed to Unsaved Job');
                                console.log(error);
                            });
                        }
                    });
                })
                    .catch((error) => {
                        setOpenNotify(true);
                        setLoadingApply(false);
                        console.log(error);
                        toast.error(error)
                    });
            });
        } else {
            applyToJobs(userDetail.$id, props.jobId, props.employerId, newEmail, phone, cover, currentResumeId)
                .then((res) => {
                    getAccount().then((res: any) => {
                        res && SendJobAppliedEmail(res.email, props.jobTitle, props.companyName);
                    });
                    setOpenNotify(true);
                    setFailed(false);
                    setLoadingApply(false);
                    const checkSaved = alreadySaved(userData.$id, props.jobId);
                    checkSaved.then((rem: any) => {
                        if (rem.total > 0) {
                            unSaveJobs(rem.documents[0].$id).then((rem) => {
                                if (props.refetch) {
                                    props.refetch
                                }
                            }).catch((error) => {
                                toast.error('Failed to Unsaved Job');
                                console.log(error);
                            });
                        }
                    });
                })
                .catch((error) => {
                    setOpenNotify(true);
                    setFailed(true);
                    setLoadingApply(false);
                    console.log(error);
                    toast.error(error)

                });
        }
    };
    useEffect(() => {
        getData();
        getCanInfo();
        checkApplied();
    }, [userDetail]);
    return (
        <>
            {!failed && (
                <Notification
                    openNotify={openNotify}
                    setOpenNotify={setOpenNotify}
/*                     setSetterFunction={props.setterFunction}
 */                    successText="success"
                    successWord="Success! Your application has been submitted."
                />
            )}
            {failed && (
                <Notification openNotify={openNotify} setOpenNotify={setOpenNotify} successText="failed" successWord="Application Failed" />
            )}
            {userData && (
                <ConfirmModal isOpen={props.openApply} handleClose={() => props.setterFunction(!props.openApply)}>
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
                            <Link href="/jobs/"
                                onClick={() => {
                                    props.setterFunction(false);
                                }}
                                type="button"
                                className="text-textW  flex justify-center items-center  h-14 w-48 rounded-xl bg-black text-textW order-1 col-span-12 sm:order-2 sm:col-span-6 xl:col-span-3"
                            >
                                Explore Jobs
                            </Link>
                        </div>
                    )}
                    {!appliedJob && !loading && userDetail && (
                        <form
                            onSubmit={apply}
                            className="mx-2 pb-10 w-full pl-5 bg-textW overflow-y-auto max-h-screen rounded-2xl grid grid-cols-12 pt-10 h-full overflow-y-auto md:pl-8 pr-5 md:w-2/3 lg:w-1/2 md:mx-0 xl:h-auto thinScrollBar"
                        >
                            <div className="col-span-12 grid grid-cols-12 ">
                                <div className="col-span-12 grid grid-cols-12 mb-5">
                                    <p className="font-thW text-[30px] flex gap-2 items-center leading-shL text-modalTitle col-span-10 md:col-span-11">
                                        <img src="/icons/suitCase.svg" className='w-10 h-10' alt="applyImage" />
                                        Apply
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
                                    <div className="col-span-12 flex flex-col overflow-x-hidden gap-2 pt-5 mb-5 ">
                                        <p className="col-span-12 text-black text-lg font-semibold leading-10">Review your application</p>
                                        <p className="col-span-12 text-neutral-400 text-sm font-light">
                                            The employer will also receive a copy of your profile
                                        </p>
                                        <p className="text-black text-md font-semibold leading-10">Contact info</p>
                                        <div className="w-full flex justify-between items-start">
                                            <div className="flex gap-x-2 md:max-xl:flex-col pt-5">
                                                {userDetail.profilePictureId && (
                                                    <ProfilePic id={(userDetail.profilePictureId)} className="w-16 h-16 rounded-2xl" />
                                                )}
                                                <div className="flex flex-col ">
                                                    <div className="text-neutral-900 text-md font-medium leading-7">{newName}</div>
                                                    <div className="text-neutral-900 text-opacity-70 flex gap-1 items-center text-sm font-normal leading-7">
                                                        <PlaceOutlinedIcon sx={{ fontSize: '1rem' }} className="relative" />
                                                        <p>{userDetail.address}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative">
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
                                            </div>
                                        </div>
                                        {fileName && (
                                            <div className="grid grid-cols-12 shadow border border-gradientFirst rounded-lg mt-2">
                                                <div className=" flex items-center justify-center bg-gradientFirst rounded-tl-lg rounded-bl-lg shadow col-span-2">
                                                    <img src={pdfIcon} className="w-7 h-10 relative" />
                                                </div>
                                                <div className="col-span-9 flex items-center pl-3">
                                                    <p className="text-black text-sm font-medium leading-loose">{fileName}</p>
                                                </div>
                                                <div className="col-span-1 flex items-center justify-end pr-2">
                                                    <div className="col-span-3 flex items-center justify-end pt-1">
                                                        <EditIcon
                                                            onClick={() => {
                                                                setSecond(true);
                                                                setFirst(false);
                                                                setThird(false);
                                                                setFourth(false);
                                                            }}
                                                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                                            className="w-6 h-6 p-1.5 cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div className="col-span-12 mt-5 relative">
                                            <EditIcon
                                                onClick={() => {
                                                    setSecond(false);
                                                    setFirst(false);
                                                    setThird(true);
                                                    setFourth(false);
                                                }}
                                                sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                                className="w-6 h-6 p-1.5 mr-2 cursor-pointer absolute right-0 top-0"
                                            />
                                            <p className="text-black text-md font-semibold leading-10">Cover Letter</p>
                                            <div className=" max-h-[9rem] overflow-y-auto text-sm" dangerouslySetInnerHTML={{ __html: cover }} />
                                        </div>
                                    </div>
                                )}
                                {
                                    third && <div className='col-span-12 pt-5 mb-5 overflow-x-hidden overflow-y-auto thinScrollBar max-md:h-96 h-80 md:mb-10 lg:mb-5'>
                                        <p className="col-span-12 text-black text-lg font-semibold leading-10">Cover Letter</p>
                                        <p className="text-neutral-400 text-sm font-light mb-5">
                                            Write a cover letter describing your skill and education.
                                        </p>
                                        <ReactQuill
                                            className="h-40 text-addS"
                                            value={cover}
                                            onChange={(e) => setCover(e)}
                                            placeholder="Add Description"
                                        />
                                    </div>
                                }
                                {second && (
                                    <div className="col-span-12 pt-5 grid grid-cols-12 overflow-x-hidden">
                                        <p className="col-span-12 text-black text-md font-semibold leading-10">Resume</p>
                                        <div className=" col-span-12">
                                            <FileUploader
                                                multiple={false}
                                                maxSize={1}
                                                onSizeError={sizeError}
                                                onTypeError={displayError}
                                                handleChange={updateTheCv}
                                                classes={
                                                    props.view
                                                        ? 'hidden'
                                                        : 'col-span-12 w-full mt-5 h-40 bg-white rounded-3xl shadow border border-gray-200 flex flex-col items-center justify-center'
                                                }
                                                name="file"
                                                types={fileTypes}
                                            >
                                                <div className="w-64 text-center text-black text-opacity-40 text-xs font-normal">
                                                    PDF, DOCX or DOC, file size no more than 1MB
                                                </div>
                                                <div className="w-28 h-10 bg-white relative rounded border cursor-pointer border-gradientFirst border-opacity-25 justify-start items-center flex  text-center">
                                                    <div className="cursor-pointer absolute z-0 top-3 w-full">
                                                        {fileName ? <div className="text-gradientFirst text-xs font-normal uppercase">Replace</div> : <div className="text-gradientFirst text-xs font-normal uppercase">Select</div>}

                                                    </div>
                                                </div>
                                                {errorMessage && <div className="text-red-500 text-xs">{errorMessage}</div>}
                                            </FileUploader>
                                        </div>
                                        {fileName && (
                                            <div className="col-span-12 grid grid-cols-12 shadow border border-gradientFirst rounded-lg mt-5">
                                                <div className="py-4 flex items-center justify-center bg-gradientFirst rounded-tl-lg rounded-bl-lg shadow col-span-2">
                                                    <img src={pdfIcon} className="w-7 h-10 relative" />
                                                </div>
                                                <div className="col-span-8 flex items-center pl-3 break-all">
                                                    <p className="text-black text-sm font-medium leading-loose">{fileName}</p>
                                                </div>
                                                <div className="col-span-2 flex items-center justify-around">
                                                    <div className="h-8 bg-fadedText flex w-0.5"></div>
                                                    <div className="col-span-12 flex items-center justify-end pt-1">
                                                        <GetAppIcon
                                                            className="w-9 h-9 text-fadedText cursor-pointer"
                                                            onClick={() => downLoadResume(currentResumeId)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {first && (
                                    <div className="col-span-12 md:col-span-5 xl:col-span-6 pt-5">
                                        <p className="text-black text-lg font-semibold leading-10 ">Contact info</p>
                                        <div className="flex gap-x-4 md:max-xl:flex-col pt-3">
                                            {userDetail.profilePictureId && (
                                                <ProfilePic id={(userDetail.profilePictureId)} className="w-20 h-20 rounded-2xl" />
                                            )}
                                            <div className="flex flex-col gap-0.5">
                                                <div className="text-neutral-900 text-lg font-medium leading-7">{newName}</div>
                                                <div className="text-neutral-900 text-opacity-70 flex gap-1 items-center text-sm font-normal leading-7">
                                                    <PlaceOutlinedIcon sx={{ fontSize: '1rem' }} className="relative" />
                                                    <p>{userDetail.address}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {first && (
                                    <div className="col-span-12 md:col-span-7 xl:col-span-6">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Email address</p>
                                        <TextInput setFunction={setNewEmail} value={newEmail} placeholder="JohnDoe@gmail.com"
                                            class="h-12 pl-5 text-addS" />
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Mobile phone number</p>
                                        <PhoneInput
                                            defaultCountry="ET" placeholder="Enter phone number"
                                            value={phone}
                                            onChange={setPhone}
                                            className="border-[1px] phoneInput border-gray-200 focus:ring-0 focus:border-gradientFirst w-full rounded-xl h-12 pl-5 text-addS hideIncrease"
                                        />
                                        {/* <input
                                            value={phone}
                                            onChange={(e) => setPhone(e.currentTarget.value)}
                                            type="text"
                                            placeholder="+251 911 2424 23"
                                            className="border-[1px] border-gray-200 focus:ring-0 focus:border-gradientFirst w-full rounded-xl h-12 pl-5 text-addS hideIncrease"
                                        /> */}
                                    </div>
                                )}
                            </div>
                            <div className="col-span-12 flex flex-wrap justify-between max-md:gap-y-5 md:gap-x-5 mt-5 lg:mt-10">
                                <div className='flex-grow max-md:w-full'>
                                    {
                                        !first && <button type='button'
                                            onClick={backToggleTabs}
                                            className="border border-stone-500 h-14 w-full flex justify-center items-center gap-2 rounded-lg order-2 col-span-12 sm:order-1 sm:col-span-6 xl:col-span-3"
                                        >
                                            <ArrowBackIcon sx={{ fontSize: '1.2rem' }} /> Back
                                        </button>
                                    }
                                </div>
                                <div className='flex max-md:flex-wrap w-full md:w-2/3 gap-5'>
                                    <button
                                        onClick={() => props.setterFunction(false)}
                                        className="text-stone-500 border border-stone-500 h-14 w-full md:w-1/2 rounded-lg"
                                    >
                                        Discard
                                    </button>
                                    {!fourth && !(second == true && (skillLength == 0 || educationLength == 0) && !fileName) ?
                                        <button
                                            onClick={toggleTabs}
                                            type="button"
                                            className="text-textW bg-black text-textW h-14 w-full md:w-1/2 rounded-lg"
                                        >
                                            Continue
                                        </button> : null
                                    }
                                    {fourth && (
                                        <div className='w-full md:w-1/2'>
                                            <SubmitButton loading={loadingApply} buttonText="Apply" />
                                        </div>
                                    )}
                                </div>
                                <p className="text-zinc-900 w-full text-sm flex items-center font-light leading-normal order-3 col-span-12 sm:col-span-12 sm:pt-5 ">
                                    Submitting this application won’t change your profile.
                                </p>
                            </div>
                        </form>
                    )}
                </ConfirmModal>
            )}
        </>
    );
};
export default ApplyToJob;
