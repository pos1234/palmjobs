import { useState, useEffect } from 'react';
import RadioInput from '@/components/RadioInput';
import { getProfileData, fetchPostedJobs, fetchSinglePostedJobs, fetchDraftedJobs, } from '@/lib/employerBackend';
import 'react-quill/dist/quill.snow.css';
import EmployerProfile from './EmployerProfile';
import FirstForm from './jobPostTabs/FirstForm';
import SecondForm from './jobPostTabs/SecondForm';
import ThirdForm from './jobPostTabs/ThirdForm';
import FourthForm from './jobPostTabs/FourthForm';
import ConfirmModal from '../ConfirmModal';
import PreviewJob from './jobPostTabs/PreviewJob';
const PostAJob = (props: any) => {
    const [chooseJob, setChooseJob] = useState(false);
    const [selectedRadio, setSelectedRadio] = useState('empty');
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    const [third, setThird] = useState(false);
    const [fourth, setFourth] = useState(false);
    const [compName, setCompName] = useState('');
    const [compDesc, setCompDesc] = useState('');
    const [company, setCompany] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [postedJobs, setPostedJobs] = useState<any>();
    const [jobId, setJobId] = useState('');
    const [profileFilled, setProfileFilled] = useState(false);
    const [postingJobId, setPostingJobId] = useState('');
    const [noDraft, setNoDraft] = useState(false);
    const [noJobs, setNoJobs] = useState(false);
    const [emailNotify, setEmailNotify] = useState('');
    const [editedData, setEditedData] = useState<any>();
    const [companyData, setCompanyData] = useState<any>()
    
    const initialData = () => {
        const result = getProfileData();

        result.then((res: any) => {
            res.documents && res.documents[0] && res.documents[0].description && setCompDesc(res.documents[0].description);
            res.documents && res.documents[0] && setCompanyData(res.documents[0]);
        });
    };
    const handleBack = () => {
        setFourth(false);
        setThird(fourth);
        setSecond(third);
        setFirst(second);
        setChooseJob(false);
        /* if (fourth == true) {
            setFourth(false);
            setThird(true);
            setSecond(false);
            setFirst(false);
            setChooseJob(false);
        } else if (third == true) {
            setFourth(false);
            setThird(false);
            setSecond(true);
            setFirst(false);
            setChooseJob(false);
        } else if (second == true) {
            setFourth(false);
            setThird(false);
            setSecond(false);
            setFirst(true);
            setChooseJob(false);

        } */
    };
    const handleFront = () => {

        if (chooseJob && !first && !second && !third && !fourth) {
            setFourth(false);
            setThird(false);
            setSecond(false);
            setFirst(true);
            setChooseJob(false);
        }
        if (first && !second && !third && !fourth) {
            setFourth(false);
            setThird(false);
            setSecond(true);
            setFirst(false);
            setChooseJob(false);

        }
        if (second && !third && !fourth) {
            setFourth(false);
            setThird(true);
            setSecond(false);
            setFirst(false);
            setChooseJob(false);
        }
        if (!second && third && !fourth) {
            /*  if (salaryRange.name === 'Range') {
                 if (jobDesc == '') {
                     setJobDescError('Job Description is required');
                 } else {
                     if (salaryRange.name === 'Range') {
                         if (minSalary !== '' && maxSalary !== '') {
                             setSalary(minSalary + '-' + maxSalary);
                         } else if (minSalary !== '' && maxSalary == '') {
                             setSalary(minSalary);
                         } else if (minSalary == '' && maxSalary !== '') {
                             setSalary(maxSalary);
                         } else {
                             setSalary('');
                         }
                         setFourth(true);
                         setThird(false);
                         setSecond(false);
                         setFirst(false);
                         setChooseJob(false);
                     }
                     else if (salaryRange.name === 'Starting amount') {
                         setSalary(minSalary);
                         setFourth(true);
                         setThird(false);
                         setSecond(false);
                         setFirst(false);
                         setChooseJob(false);
                     } else if (salaryRange.name == 'Maximum amount') {
 
                         setSalary(maxSalary);
                         setFourth(true);
                         setThird(false);
                         setSecond(false);
                         setFirst(false);
                         setChooseJob(false);
                     }
                 }
             }
             else if (salaryRange.name === 'Exact amount') {
  */
            setFourth(true);
            setThird(false);
            setSecond(false);
            setFirst(false);
            setChooseJob(false);
            /*  } */
        }
    };
    /*  const generateJobDescription = async ({
         jobTitle,
         skills,
         yearsOfExperience
     }: Record<'jobTitle' | 'skills' | 'yearsOfExperience', string>) => {
         console.log('Generating job description...', `${window.location.hostname}/api/oai/jobDescription`);
         try {
             if (typeof window === 'undefined') return;
             const url = new URL(`${window.location.origin}/api/oai/jobDescription`);
             if (jobTitle) {
                 url.searchParams.append('j', jobTitle);
             }
             if (skills) {
                 url.searchParams.append('s', skills);
             }
             if (yearsOfExperience) {
                 url.searchParams.append('y', yearsOfExperience);
             }
 
             const res: { content: string } = await fetch(url.toString()).then((res) => res.json());
 
             setJobDesc(res.content);
         } catch (error) {
             console.error('Error generating job description', error);
         }
     }; */

    const handleJobSelection = async (id: string) => {
        setPostingJobId(id);
        fetchSinglePostedJobs(id).then((res: any) => {
            setEditedData(res.documents[0])
        });
    };
    useEffect(() => {
        if (props.editedJobId) {
            if (chooseJob && !first && !second && !third && !fourth) {
                setFourth(false);
                setThird(false);
                setSecond(false);
                setFirst(true);
                setChooseJob(false);
            }
            handleJobSelection(props.editedJobId);
        }
    }, [props.editedJobId]);
    const getPosted = async () => {
        const posted = await fetchPostedJobs();
        if (posted && posted.documents) {
            posted && setPostedJobs(posted.documents);
            posted && setJobId(posted.documents[0] && posted.documents[0].$id);
        }
    };
    const getDrafted = async () => {
        const posted = await fetchDraftedJobs();
        if (posted && posted.documents) {
            posted && setPostedJobs(posted.documents);
            posted && setJobId(posted.documents[0] && posted.documents[0].$id);
        }
    };
    const getProfile = async () => {
        getProfileData().then((res: any) => {
            if (res && res.documents[0]) {
                if (
                    res.documents[0].location == '' ||
                    res.documents[0].phoneNumber == '' ||
                    res.documents[0].description == '' ||
                    res.documents[0].companyName == ''
                ) {
                    setProfileFilled(true);
                    setCompName(res.documents[0].companyName);
                    if (res.documents[0].receiveEmailNotification !== false) {
                        setEmailNotify('true');
                    }
                    if (res.documents[0].receiveEmailNotification == false) {
                        setEmailNotify('false');
                    }
                }
            }
        });
    };
    useEffect(() => {
        if (selectedRadio == 'empty') {
            getProfile();
        }
        if (selectedRadio == 'duplicate') {
            getPosted();
        }
        if (selectedRadio == 'draft') {
            getDrafted();
        }
    }, [selectedRadio]);

    useEffect(() => {
        initialData();
        fetchPostedJobs()
            .then((res) => {
                res && res.total > 0 && setNoJobs(true);
                res && res.total > 0 && setChooseJob(true);
                res && res.total == 0 && setFirst(true);
                fetchDraftedJobs().then((res) => {
                    res && res.total > 0 && setNoDraft(true);
                })
            })
            .catch((error) => {
                console.log(error);
            });


    }, []);


    return (
        <div className="pt-5 px-3 pb-10 bg-textW min-h-screen md:pl-10 xl:pr-28 xl:px-20">

            {!chooseJob && noJobs && <p className="text-neutral-900 text-opacity-70 text-base font-normal leading-10">Job Post Progress</p>}
            {!chooseJob && noJobs && (
                <div
                    className="col-span-12 grid grid-cols-12 gap-x-2 mt-1 md:pr-20 lg:pr-40
             xl:pr-60"
                >
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
                            third || fourth ? 'rounded-2xl bg-gradientFirst h-1.5 col-span-3' : 'rounded-2xl bg-fadedText h-1.5 col-span-3'
                        }
                    ></div>
                    <div
                        className={fourth ? 'rounded-2xl bg-gradientFirst h-1.5 col-span-3' : 'rounded-2xl bg-fadedText h-1.5 col-span-3'}
                    ></div>
                </div>
            )}
            <div
                className={
                    (noJobs || noDraft) && chooseJob && !first && !second && !third && !fourth ? 'col-span-12 pt-5 space-y-3 ' : 'hidden'
                }
            >
                <div className="text-neutral-900 h-20 flex items-center overflow-hidden justify-between pl-5 md:h-32 jobsBack">
                    <div className='flex flex-col gap-2'>
                        <p className='font-[700] text-[24px]'>Develop the Job Description using AI</p>
                        <p className='font-[400] text-[14px] text-gray-500'>Lorem ipsum sit amet consectetur. Accumsan</p>
                    </div>
                    <div className='p-5 pr-10'>
                        <img src="/images/bigSearch.svg" alt="" className='w-28' />
                    </div>
                </div>
                <div className='pt-5 font-[600] text-xl'>
                    Choose how to post a Job
                </div>
                <div className="flex flex-col gap-y-5 pt-5 pb-10">
                    <RadioInput
                        radioName="selectedRadio"
                        radioText="Start with a new post"
                        radioValue="empty"
                        setFunction={setSelectedRadio}
                    />
                    {noJobs && (
                        <RadioInput
                            radioName="selectedRadio"
                            radioText="Use a previous job as a template"
                            radioValue="duplicate"
                            setFunction={setSelectedRadio}
                        />
                    )}
                    {noDraft && (
                        <RadioInput
                            radioName="selectedRadio"
                            radioText="Continue from Draft"
                            radioValue="draft"
                            setFunction={setSelectedRadio}
                        />
                    )}
                </div>
                <div>
                    {(selectedRadio == 'duplicate' || selectedRadio == 'draft') && (
                        <select
                            style={{ maxHeight: '200px' }}
                            onChange={(e) => {
                                setJobId(e.currentTarget.value);
                                handleJobSelection(e.currentTarget.value);
                            }}
                            className="form-select  h-12 max-h-[20px] overflow-y-scroll pl-5 bg-white rounded-3xl border oveflow-y-auto cursor-pointer border-gray-200 focus:ring-gradientFirst focus:border-0 w-full md:w-96"
                        >
                            {postedJobs &&
                                postedJobs.map((item: any, index: number) => {
                                    return (
                                        <option value={item.$id} key={index}>
                                            {item.jobTitle}
                                        </option>
                                    );
                                })}
                        </select>
                    )}
                </div>
            </div>
            <FirstForm
                first={first}
                second={second}
                third={third}
                fourth={fourth}
                setFirst={setFirst}
                setSecond={setSecond}
                setThird={setThird}
                setFourth={setFourth}
                setPostingJobId={setPostingJobId}
                editedData={editedData}
/*                 postingJobId={postingJobId}
 */                setChooseJob={setChooseJob}
            />
            <SecondForm
                first={first}
                second={second}
                third={third}
                fourth={fourth}
                setFirst={setFirst}
                setSecond={setSecond}
                setThird={setThird}
                setFourth={setFourth}
                setPostingJobId={setPostingJobId}
                editedData={editedData}
                postingJobId={postingJobId}
                handleBack={handleBack}
            />
            {profileFilled && <EmployerProfile setFilled={setProfileFilled} />}
            {!profileFilled && <ThirdForm
                first={first}
                second={second}
                third={third}
                fourth={fourth}
                setFirst={setFirst}
                setSecond={setSecond}
                setThird={setThird}
                setFourth={setFourth}
                editedData={editedData}
                setPostingJobId={setPostingJobId}
                postingJobId={postingJobId}
                handleBack={handleBack}
            />
            }
            <FourthForm
                first={first}
                second={second}
                third={third}
                fourth={fourth}
                setFirst={setFirst}
                setSecond={setSecond}
                setThird={setThird}
                setFourth={setFourth}
                setPostingJobId={setPostingJobId}
                postingJobId={postingJobId}
                handleBack={handleBack}
                openPreview={openPreview}
                setOpenPreview={setOpenPreview}
            />
            <div className="flex justify-end pt-5">
                {chooseJob && !first && !second && !third && !fourth && (noJobs || noDraft) && (
                    <div
                        onClick={handleFront}
                        className="text-textW bg-black flex items-center justify-center cursor-pointer h-16 max-md:mt-10 w-full md:w-5/12 rounded-xl lg:w-3/12"
                    >
                        Continue
                    </div>
                )}
            </div>
            <PreviewJob openModal={openPreview} setOpenModal={setOpenPreview} companyData={companyData}
                jobId={jobId}
            />
            {/* <ConfirmModal isOpen={openPreview} handleClose={() => setOpenPreview(!openPreview)}>
                <div className="mx-2 pb-5 w-full  bg-textW rounded-2xl grid grid-cols-12 pt-6 sm:pl-5 md:pl-8 md:w-2/3 lg:w-1/2">
                    <div className="col-span-12 grid grid-cols-12">
                        <div className="col-span-10  flex items-center">
                            <img src={previewImage} className="w-16 lg:w-20 max-sm:hidden" />
                            <div className="col-span-9 flex flex-col pl-5">
                                <div className="text-neutral-900 text-[0.9rem] font-semibold sm:leading-10 lg:text-lg">
                                    This is a preview of what people may see
                                </div>
                                <div className="text-neutral-400  font-light leading-normal text-[12px] sm:text-sm">
                                    Your job post may look slightly different when it is live
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 md:col-span-1 grid pr-2 justify-items-end">
                            <button onClick={() => setOpenPreview(!openPreview)}>
                                <CloseIcon
                                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                    className="w-8 h-8 p-2 "
                                />
                            </button>
                        </div>
                    </div>
                    <div className="col-span-12 grid grid-cols-12 gap-y-5 bg-textW pt-5 z-[0] rounded-t-xl relative px-2 lg:px-16">
                        <div className="col-span-12 grid grid-cols-12 gap-0f">
                            <img src={profile} className="col-span-2 w-full h-full sm:h-[5.8rem]" />
                            <div className="col-span-8 flex flex-col pl-3">
                                <p className="text-[12px] text-darkBlue sm:text-fhS xl:text-[1rem]">{compName}</p>
                                <p className="text-darkBlue font-midRW text-midRS sm:font-fhW sm:text-dfvhS xl:text-[1.5rem]">
                                    {jobTitle}
                                </p>
                                <p className="text-fadedText">
                                    <PinDropOutlinedIcon sx={{ fontSize: '1.2rem', marginTop: '-0.2rem' }} />
                                    {location}
                                </p>
                            </div>
                            <div className="col-span-2 flex text-lightGrey items-center gap-x-2 sm:gap-x-5">
                                <ShareOutlinedIcon className="cursor-pointer sm:text-[2rem] " />
                                <BookmarkBorderOutlinedIcon className="cursor-pointer sm:text-[2rem] " />
                            </div>
                        </div>
                        <div className="col-span-12 grid grid-cols-12 bg-forBack gap-x-1 gap-y-2 md:gap-x-2 md:p-2 xl:mx-2">
                            {(minSalary !== '' || maxSalary !== '') && (
                                <Jobtype
                                    salary="Salary"
                                    money={
                                        minSalary == '' && maxSalary !== ''
                                            ? maxSalary
                                            : minSalary !== '' && maxSalary == ''
                                                ? minSalary
                                                : minSalary + '-' + maxSalary
                                    }
                                    icon={
                                        currency == 'euro' ? (
                                            <EuroIcon sx={{ fontSize: '1.2rem' }} className=" mt-[0.2rem] mr-1 sm:mt-0.5" />
                                        ) : currency == 'usd' ? (
                                            <AttachMoneyOutlined sx={{ fontSize: '1.2rem' }} className=" mt-[0.2rem] mr-1 sm:mt-0.5" />
                                        ) : currency == 'gpb' ? (
                                            <CurrencyPoundIcon sx={{ fontSize: '1.2rem' }} className=" mt-[0.2rem] mr-1 sm:mt-0.5" />
                                        ) : currency == 'rnp' ? (
                                            <CurrencyRupeeIcon sx={{ fontSize: '1.2rem' }} className=" mt-[0.2rem] mr-1 sm:mt-0.5" />
                                        ) : (
                                            <span className="mr-2">ETB</span>
                                        )
                                    }
                                />
                            )}
                            <Jobtype
                                salary="Job Type"
                                money={worktype}
                                icon={<AccessTimeOutlined sx={{ fontSize: '1.2rem' }} className="mt-[0.2rem] mr-1 sm:mt-0.5" />}
                            />
                            <Jobtype
                                salary="Date Posted"
                                money={new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}
                                icon={<CalendarToday sx={{ fontSize: '1.2rem' }} className="text-[18px] mt-[0.2rem] mr-1 sm:mt-0.5" />}
                            />
                            <Jobtype
                                salary="Closing Date"
                                money={new Date(deadline).toLocaleDateString('en-GB').replace(/\//g, '-')}
                                icon={<CalendarToday sx={{ fontSize: '1.2rem' }} className="mt-[0.2rem] mr-1 sm:mt-0.5" />}
                            />
                        </div>
                        <div className="col-span-12 grid grid-cols-12 border-[1px] mx-3 rounded-xl">
                            <div
                                className={
                                    company == true
                                        ? 'col-span-6 rounded-xl rounded-3xl text-lightGrey  font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer sm:text-bigS'
                                        : 'col-span-6 rounded-xl bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW  font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer sm:text-bigS'
                                }
                                onClick={() => setCompany(false)}
                            >
                                Job Description
                            </div>
                            <div
                                className={
                                    company == true
                                        ? 'col-span-6 rounded-xl bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer sm:text-bigS'
                                        : 'col-span-6 rounded-xl rounded-3xl text-lightGrey font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer sm:text-bigS'
                                }
                                onClick={() => setCompany(true)}
                            >
                                Company
                            </div>
                        </div>
                        {!company && (
                            <div className="col-span-12 mx-3">
                                <div
                                    className="text-sm text-fadedText max-h-20 overflow-y-auto hideScrollBar"
                                    dangerouslySetInnerHTML={{ __html: jobDesc }}
                                />
                                <div className="w-full mt-16 rounded-xl rounded-3xl bg-gradientSecond text-textW text-bigS font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer ">
                                    Apply
                                </div>
                            </div>
                        )}
                        {company && (
                            <div className="col-span-12 mx-3 mb-10">
                                <p className="font-thW text-frhS">Company's Detail</p>
                                <div
                                    className="text-sm text-fadedText max-h-20 overflow-y-auto hideScrollBar"
                                    dangerouslySetInnerHTML={{ __html: compDesc }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </ConfirmModal> */}
        </div>
    );
};
export default PostAJob;
