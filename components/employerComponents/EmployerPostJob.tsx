import { useState, Fragment, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditLocationAltOutlinedIcon from '@mui/icons-material/EditLocationAltOutlined';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import RadioInput from '@/components/RadioInput';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ArticleIcon from '@mui/icons-material/Article';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Skills from '@/components/employerComponents/Skills';
import CloseIcon from '@mui/icons-material/Close';
import DropDown from '@/components/DropDown';
import {
    accountData,
    deleteProfileImage,
    getProfileData,
    getProfilePicture,
    fetchPostedJobs,
    /*     postJobs,
     */ fetchSinglePostedJobs,
    postFirstTab,
    postSecondTab,
    postThirdTab,
    postFourthTab,
    fetchDraftedJobs,
    updateFirstTab,
    getAccount
} from '@/lib/services';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import ConfirmModal from '@/components/ConfirmModal';
import AttachMoneyOutlined from '@mui/icons-material/AttachMoneyOutlined';
import AccessTimeOutlined from '@mui/icons-material/AccessTimeOutlined';
import LocalFireDepartmentOutlined from '@mui/icons-material/LocalFireDepartmentOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { toast } from 'react-toastify';
import CalendarToday from '@mui/icons-material/CalendarToday';
import EuroIcon from '@mui/icons-material/Euro';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useRouter } from 'next/router';
import EmployerProfile from './EmployerProfile';
import TextInput from '../TextInput';
import { SendJobPostedEmail } from '../SendEmail';
const VERIFY = process.env.NEXT_PUBLIC_VERIFY || '';

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
});
interface Data {
    word: string;
}
const salaryRangeData = [{ name: 'Range' }, { name: 'Starting amount' }, { name: 'Maximum amount' }, { name: 'Exact amount' }];
const expData = ['0-2 years', '3-5 years', '6-8 years', '9-10 years', '10+ years'];
const salaryPerData = [{ name: 'Per Month' }, { name: 'Per Hour' }, { name: 'Per Year' }];

const RequiredTextLabel = (props: any) => {
    return (
        <div>
            <span className="text-neutral-900 text-opacity-70 text-lg font-medium leading-loose md:text-xl">{props.text} </span>
            <span className={props.req == 'nReq' ? 'hidden' : 'text-orange-600 text-2xl font-medium leading-loose'}>*</span>
        </div>
    );
};
const RequredExp = (props: any) => {
    return (
        <div
            onClick={() => props.setFuntioner(props.text)}
            className={
                props.value == props.text
                    ? 'h-12 w-auto px-5 text-stone-300 cursor-pointer flex gap-x-2 items-center justify-center rounded-3xl bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW'
                    : 'hover:bg-gradient-to-r hover:from-gradientFirst hover:to-gradientSecond hover:text-textW h-12 w-auto px-5 text-stone-300 cursor-pointer flex gap-x-2 items-center justify-center bg-white rounded-3xl border border-gray-200'
            }
        >
            <AddIcon sx={{ fontSize: '1.3rem' }} />
            <p className="text-[0.9rem]"> {props.text}</p>
        </div>
    );
};
const Jobtype = (props: any) => {
    return (
        <div className="col-span-6 flex flex-col max-md:pl-2 py-2 rounded-2xl gap-y-2 bg-textW sm:col-span-3 items-center">
            <p className="font-fhW sm:max-md:text-[0.8rem] md:text-fhS md:max-lg:text-[1rem]"> {props.salary}</p>
            <p className=" text-fadedText sm:max-md:text-[12px] flex md:max-lg:text-[0.7rem] lg:text-[14px]">
                {props.icon}
                {props.money}
            </p>
        </div>
    );
};

const PostAJob = (props: any) => {
    const router = useRouter();
    const loadingIn = '/images/loading.svg';
    const profile = '/images/profile.svg';
    const previewImage = '/images/previewImage.svg';
    const [chooseJob, setChooseJob] = useState(false);
    const [selectedRadio, setSelectedRadio] = useState('empty');
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    const [third, setThird] = useState(false);
    const [fourth, setFourth] = useState(false);
    const [compName, setCompName] = useState('');
    const [compError, setCompError] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobTitleError, setJobTitleError] = useState('');
    const [category, setCategory] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [remote, setRemote] = useState(false);
    const [hybrid, setHybrid] = useState(false);
    const [location, setLocation] = useState('');
    const [locationError, setLocationError] = useState('');
    const [worktype, setWorkType] = useState('Full Time');
    const [addLocation, setAddLocation] = useState(true);
    const [expRequired, setExpRequired] = useState('0-2 years');
    const [openPositions, setOpenPositions] = useState<number>(1);
    const [skillArray, setSkillArray] = useState<any>([]);
    const [skillError, setSkillError] = useState('');
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [currency, setCurrency] = useState('etb');
    const [salary, setSalary] = useState('');
    const [salaryRange, setSalaryRange] = useState(salaryRangeData[0]);
    const [salaryRangeError, setSalaryRangeError] = useState('');
    const [salaryPer, setSalaryPer] = useState(salaryPerData[0]);
    const [jobDesc, setJobDesc] = useState('');
    const [jobDescError, setJobDescError] = useState('');
    const [compDesc, setCompDesc] = useState('');
    const [compDescError, setCompDescError] = useState('');
    const [emailSent, setEmailSent] = useState('');
    const [externalLink, setExternalLink] = useState('');
    const today = new Date();
    const fifteenthDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);
    const [deadline, setDeadline] = useState(`${fifteenthDay}`);
    const [palm, setPalm] = useState(true);
    const [email, setEmail] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [link, setLink] = useState(false);
    const [linkError, setLinkError] = useState('');
    const [company, setCompany] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [postedJobs, setPostedJobs] = useState<any>();
    const [jobId, setJobId] = useState('');
    const [profileFilled, setProfileFilled] = useState(false);
    const [postingJobId, setPostingJobId] = useState('');
    const [noDraft, setNoDraft] = useState(false);
    const [noJobs, setNoJobs] = useState(false);

    const initialData = () => {
        const result = getProfileData();
        if (result) {
            result.then((res: any) => {
                res && res.documents && res.documents[0] && res.documents[0].description && setCompDesc(res.documents[0].description);
            });
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 1) {
            setOpenPositions(value);
        }
    };
    const handleBack = () => {
        if (fourth == true) {
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
        } /* else if (first == true) {
            setFourth(false);
            setThird(false);
            setSecond(false);
            setFirst(false);
            setChooseJob(false);
        } */
    };
    const handleFront = (e: React.FormEvent<HTMLElement>) => {
        if (chooseJob && !first && !second && !third && !fourth) {
            setFourth(false);
            setThird(false);
            setSecond(false);
            setFirst(true);
            setChooseJob(false);
        }
        if (first && !second && !third && !fourth) {
            /*             setCompError('');
             */ setJobTitleError('');
            setCategoryError('');
            /*  if (compName == '') {
                setCompError('Company Name is required');
            } else  */ if (jobTitle == '') {
                setJobTitleError('Job Titile is required');
            } else if (category == '') {
                setCategoryError('Job Titile is required');
            } else if (location == '') {
                setLocationError('Please Provide Location');
            } else {
                setFourth(false);
                setThird(false);
                setSecond(true);
                setFirst(false);
                setChooseJob(false);
            }
        }
        if (second && !third && !fourth) {
            if (skillArray.length == 0) {
                setSkillError('Please provide required skills');
            } else {
                setFourth(false);
                setThird(true);
                setSecond(false);
                setFirst(false);
                setChooseJob(false);
            }
        }
        if (!second && third && !fourth) {
            setSalaryRangeError('');
            if (salaryRange.name === 'Range') {
                /* if (minSalary === '' || maxSalary === '') {
                    setSalaryRangeError('Please provide Minimum and Maximum salary');
                } else */ if (jobDesc == '') {
                    setJobDescError('Job Description is required');
                } else if (compDesc == '') {
                    setCompDescError('Company Description is required');
                } else {
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
            } else if (salaryRange.name === 'Starting amount') {
                /*  if (minSalary === ' ') {
                    setSalaryRangeError('Please provide Minimum salary');
                } else  */ if (jobDesc == ' ') {
                    setJobDescError('Job Description is required');
                } else if (compDesc == ' ') {
                    setCompDescError('Company Description is required');
                } else {
                    setSalary(/* 'Starting' + */ minSalary);
                    setFourth(true);
                    setThird(false);
                    setSecond(false);
                    setFirst(false);
                    setChooseJob(false);
                }
            } else if (salaryRange.name == 'Maximum amount') {
                /* if (maxSalary === ' ') {
                    setSalaryRangeError('Please provide Maximum salary');
                } else  */ if (jobDesc == ' ') {
                    setJobDescError('Job Description is required');
                } else if (compDesc == ' ') {
                    setCompDescError('Company Description is required');
                } else {
                    setSalary(maxSalary);
                    setFourth(true);
                    setThird(false);
                    setSecond(false);
                    setFirst(false);
                    setChooseJob(false);
                }
            } else if (salaryRange.name === 'Exact amount') {
                /* if (salary === '') {
                    setSalaryRangeError('Please provide Exact salary');
                } else  */ if (jobDesc == '') {
                    setJobDescError('Job Description is required');
                } else if (compDesc == ' ') {
                    setCompDescError('Company Description is required');
                } else {
                    setFourth(true);
                    setThird(false);
                    setSecond(false);
                    setFirst(false);
                    setChooseJob(false);
                }
            }
        }
    };
    const handleFirstSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (first && !second && !third && !fourth) {
            setJobTitleError('');
            setCategoryError('');
            if (jobTitle == '') {
                setJobTitleError('Job Titile is required');
            } else if (category == '') {
                setCategoryError('Job Titile is required');
            } else if (location == '') {
                setLocationError('Please Provide Location');
            } else {
                if (postingJobId) {
                    setLoading(true);
                    updateFirstTab(jobTitle, category, openPositions.toString(), location, postingJobId)
                        .then((res: any) => {
                            setLoading(false);
                            toast.success('Saved as Draft');
                            setFourth(false);
                            setThird(false);
                            setSecond(true);
                            setFirst(false);
                            setChooseJob(false);
                        })
                        .catch((error) => {
                            setLoading(false);
                            toast.error('Draft Not Saved');
                            console.log(error);
                        });
                } else {
                    setLoading(true);
                    postFirstTab(jobTitle, category, openPositions.toString(), location)
                        .then((res: any) => {
                            setPostingJobId(res.$id);
                            console.log(res);
                            setLoading(false);
                            toast.success('Saved as Draft');
                            setFourth(false);
                            setThird(false);
                            setSecond(true);
                            setFirst(false);
                            setChooseJob(false);
                        })
                        .catch((error) => {
                            setLoading(false);
                            toast.error('Draft Not Saved');
                            console.log(error);
                        });
                }
            }
        }
    };
    const handleSecondSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (second && !third && !fourth) {
            if (skillArray.length == 0) {
                setSkillError('Please provide required skills');
            } else {
                setLoading(true);
                postSecondTab(worktype, expRequired, JSON.stringify(skillArray), postingJobId)
                    .then((res: any) => {
                        setLoading(false);
                        setFourth(false);
                        setThird(true);
                        setSecond(false);
                        setFirst(false);
                        setChooseJob(false);
                        toast.success('Saved as Draft');
                    })
                    .catch((error) => {
                        setLoading(false);
                        toast.error('Draft Not Saved');
                        console.log(error);
                    });
            }
        }
    };
    const handleThirdSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (!second && third && !fourth) {
            setSalaryRangeError('');
            if (jobDesc == '') {
                setJobDescError('Job Description is required');
            } else if (compDesc == ' ') {
                setCompDescError('Company Description is required');
            } else {
                setLoading(true);
                postThirdTab(minSalary, maxSalary, currency, jobDesc, postingJobId)
                    .then((res: any) => {
                        setLoading(false);
                        setFourth(true);
                        setThird(false);
                        setSecond(false);
                        setFirst(false);
                        setChooseJob(false);
                        toast.success('Saved as Draft');
                    })
                    .catch((error) => {
                        setLoading(false);
                        toast.error('Draft Not Saved');
                        console.log(error);
                    });
            }
        }
    };
    const validateLink = (link: string) => {
        if (link && !link.startsWith('https://')) {
            link = 'https://' + link;
        }
        return link;
    };
    const handleFourthSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (email && emailSent == '') {
            setEmailError('please provide email address');
        } else if (link && externalLink == '') {
            setLinkError('please provide link');
        } else {
            setLoading(true);

            postFourthTab(postingJobId, deadline, '', emailSent, validateLink(externalLink))
                .then((res: any) => {
                    setLoading(false);
                    toast.success('Job posted successfully');
                    getAccount().then((result: any) => {
                        result && SendJobPostedEmail(result.email, jobTitle, `${VERIFY}jobs/${res.$id}`, result.name);
                    });
                    router.push(`/jobs/${res.$id}`);
                })
                .catch((error) => {
                    setLoading(false);
                    toast.error('Job not posted');
                    console.log(error);
                });
        }
    };
    const handleJobSelection = async (id: string) => {
        setPostingJobId(id);
        fetchSinglePostedJobs(id).then((res: any) => {
            setJobTitle(res.documents[0].jobTitle);
            setCategory(res.documents[0].jobIndustry);
            if (res.documents[0].jobLocation.toLowerCase() == 'remote') {
                setRemote(true);
                setHybrid(false);
                setAddLocation(false);
            }
            if (res.documents[0].jobLocation.toLowerCase() == 'hybrid') {
                setRemote(false);
                setHybrid(true);
                setAddLocation(false);
            }
            if (res.documents[0].jobLocation.toLowerCase() !== 'hybrid' && res.documents[0].jobLocation.toLowerCase() !== 'remote') {
                setRemote(false);
                setHybrid(false);
                setAddLocation(true);
                setLocation(res.documents[0].jobLocation);
            }
            res.documents[0].jobType && setWorkType(res.documents[0].jobType);
            res.documents[0].expreienceLevel && setExpRequired(res.documents[0].expreienceLevel);
            res.documents[0].openPositions && setOpenPositions(res.documents[0].openPositions);
            if (res.documents[0].requiredSkills) {
                try {
                    const parsedSkills = JSON.parse(res.documents[0].requiredSkills);
                    setSkillArray(parsedSkills);
                } catch (error) {
                    console.error('Error parsing requiredSkills:', error);
                }
            }
            res.documents[0].salaryRange && setMinSalary(res.documents[0].salaryRange);
            res.documents[0].jobDescription && setJobDesc(res.documents[0].jobDescription);
            if (res.documents[0].emailApplication) {
                setPalm(false);
                setEmail(true);
                setLink(false);
                setEmailSent(res.documents[0].emailApplication);
            }
            if (res.documents[0].externalLink) {
                setPalm(false);
                setEmail(false);
                setLink(true);
                setExternalLink(res.documents[0].externalLink);
            }
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
            console.log(posted);

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
            })
            .catch((error) => {
                console.log(error);
            });
        /* fetchDraftedJobs()
            .then((res) => {
                res && res.total > 0 && setNoDraft(true);
                res && res.total > 0 && setChooseJob(true);
                res && res.total == 0 && setFirst(true);
            })
            .catch((error) => {
                console.log(error);
            }); */
    }, []);
    const todaysDate = new Date();
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 1);
    /* const handleSendEmail = () => {
        getAccount().then((res: any) => {
            res && SendJobPostedEmail(res.email, jobTitle, `${VERIFY}jobs/${postingJobId}`, res.name);
        });
    }; */
    return (
        <div className="pt-5 px-3 pb-10 bg-textW min-h-screen md:pl-10 xl:pr-28 xl:px-20">
            {/*             <button onClick={handleSendEmail}>Send Email</button>
             */}
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
                <div className="text-neutral-900 text-3xl font-semibold leading-10 h-20 flex items-center pl-5 md:h-32 jobsBack">
                    Create a job post
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
                            className="form-select  h-12 max-h-[20px] overflow-y-scroll pl-5 bg-white rounded-3xl border oveflow-y-auto cursor-pointer border-gray-200 focus:ring-orange-500 focus:border-0 w-full md:w-96"
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
            <form
                onSubmit={handleFirstSubmit}
                className={!chooseJob && first && !second && !third && !fourth ? 'col-span-12 pt-5 space-y-3 ' : 'hidden'}
            >
                <div className="text-neutral-900  font-semibold leading-10 text-xl md:text-3xl">Provide Basic Information</div>
                <RequiredTextLabel text="Job Title" />
                <TextInput errorMessage={jobTitleError} placeHolder="Job Position" value={jobTitle} setFunction={setJobTitle} />
                <RequiredTextLabel text="Job Category" />

                <select
                    value={category}
                    style={{ maxHeight: '200px' }}
                    onChange={(e) => setCategory(e.currentTarget.value)}
                    className="h-12 max-h-[10px] overflow-y-scroll pl-5 bg-white rounded-3xl border oveflow-y-auto cursor-pointer border-gray-200 focus:ring-orange-500 focus:border-0 w-full md:w-96"
                >
                    <option value="Agriculture">Agriculture</option>
                    <option value="Construction">Construction</option>
                    <option value="Education">Education</option>
                    <option value="Energy">Energy</option>
                    <option value="Finance & Insurance">Finance & Insurance</option>
                    <option value="HealthCare">HealthCare</option>
                    <option value="Hospital and Tourism">Hospital and Tourism</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Mining">Mining</option>
                    <option value="Public Administration">Public Administration</option>
                    <option value="Real State">Real State</option>
                    <option value="Transportation & Logisitics">Transportation & Logisitics</option>
                    <option value="Wholesale Trade">Wholesale Trade</option>
                    <option value="Creative & Media">Creative & Media</option>
                    <option value="Automative">Automative</option>
                    <option value="Pharmaceuticals">Pharmaceuticals</option>
                    <option value="Telecommunications">Telecommunications</option>
                    <option value="Food & Beverage">Food & Beverage</option>
                </select>
                <RequiredTextLabel text="How many open roles ?" />
                <div className="flex gap-x-5 items-center mt-3">
                    <div
                        onClick={() => {
                            if (openPositions > 1) setOpenPositions(openPositions - 1);
                        }}
                        className="text-orange-600 rounded-full p-0.5 flex items-center justify-center cursor-pointer border-2 border-stone-300 active:border-orange-500"
                    >
                        <RemoveIcon />
                    </div>
                    <input
                        type="number"
                        value={openPositions}
                        onChange={handleInputChange}
                        className="border-2 w-16 py-2 text-center rounded-3xl hideIncrease focus:border-orange-500 focus:ring-0"
                    />
                    <div
                        onClick={() => setOpenPositions(openPositions + 1)}
                        className="text-orange-600 rounded-full p-0.5 flex items-center justify-center cursor-pointer border-2 border-stone-300 active:border-orange-500"
                    >
                        <AddIcon />
                    </div>
                </div>
                <RequiredTextLabel text="Which option best describe this job's location ?" />
                <div className="flex bg-forBack  p-2 gap-x-5 w-full lg:w-1/2">
                    <div
                        onClick={() => {
                            setLocation('');
                            setAddLocation(true);
                            setRemote(false);
                            setHybrid(false);
                        }}
                        className={
                            addLocation
                                ? 'flex flex-col rounded-md relative bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW cursor-pointer w-36 pl-3 py-2 h-20'
                                : 'hover:bg-skillColor hover:text-orange-600 flex flex-col relative bg-textW cursor-pointer w-36 pl-3 py-2 h-20'
                        }
                    >
                        <EditLocationAltOutlinedIcon className="-ml-2" />
                        <p className="absolute bottom-0">Add Location</p>
                    </div>
                    <div
                        onClick={() => {
                            setAddLocation(false);
                            setRemote(true);
                            setHybrid(false);
                            setLocation('Remote');
                        }}
                        className={
                            remote
                                ? 'flex rounded-md flex-col relative bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW cursor-pointer w-36 pl-3 py-2 h-20'
                                : 'hover:bg-skillColor hover:text-orange-600 flex flex-col relative bg-textW cursor-pointer w-36 pl-3 py-2 h-20'
                        }
                    >
                        <SettingsRemoteIcon className="-ml-2" />
                        <p className="absolute bottom-0">Remote</p>
                    </div>
                    <div
                        onClick={() => {
                            setAddLocation(false);
                            setRemote(false);
                            setHybrid(true);
                            setLocation('Hybrid');
                        }}
                        className={
                            hybrid
                                ? 'flex rounded-md flex-col relative bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW cursor-pointer w-36 pl-3 py-2 h-20'
                                : 'hover:bg-skillColor hover:text-orange-600 flex flex-col relative bg-textW cursor-pointer w-36 pl-3 py-2 h-20'
                        }
                    >
                        <GroupWorkIcon className="-ml-2" />
                        <p className="absolute bottom-0">Hybrid</p>
                    </div>
                </div>
                {addLocation && (
                    <>
                        <RequiredTextLabel text="Address" />
                        <TextInput placeHolder="Job Address" errorMessage={locationError} value={location} setFunction={setLocation} />
                    </>
                )}
                <div className="flex pt-10 justify-end">
                    {loading && (
                        <img
                            src={loadingIn}
                            className="text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 w-8/12 rounded-full md:w-5/12 lg:w-3/12"
                        />
                    )}
                    {!loading && (
                        <button
                            type="submit"
                            className="text-textW bg-gradient-to-r self-end flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 w-8/12 rounded-full md:w-5/12 lg:w-3/12"
                        >
                            Save and Continue
                        </button>
                    )}
                </div>
            </form>
            <form
                onSubmit={handleSecondSubmit}
                className={!chooseJob && !first && second && !third && !fourth ? 'col-span-12 pt-5 space-y-3 ' : 'hidden'}
            >
                <div className="text-neutral-900 text-3xl font-semibold leading-10">Technology Details</div>
                <RequiredTextLabel text="What is the job type" />
                <div className="flex gap-x-4 flex-wrap gap-y-3">
                    <RadioInput radioName="jobType" radioText="Internship" radioValue="Internship" setFunction={setWorkType} />
                    <RadioInput
                        radioName="jobType"
                        radioText="Full Time"
                        checked={worktype === '' || worktype === 'Full Time'}
                        radioValue="Full Time"
                        setFunction={setWorkType}
                    />
                    <RadioInput radioName="jobType" radioText="Part Time" radioValue="Part Time" setFunction={setWorkType} />
                    <RadioInput radioName="jobType" radioText="Consultancy" radioValue="Consultancy" setFunction={setWorkType} />
                </div>
                <RequiredTextLabel text="What experience level is required ?" />
                <div className="flex gap-x-3 gap-y-3 flex-wrap mt-3 xl:pr-60">
                    {expData.map((item: any, index: number) => {
                        return <RequredExp text={item} key={index} value={expRequired} setFuntioner={setExpRequired} />;
                    })}
                </div>
                <RequiredTextLabel text="Required Skills ?" />
                <Skills array={skillArray} setArray={setSkillArray} />
                {skillError && <p className="text-red-500 text-[13px]">{skillError}</p>}
                <div className="flex pt-10 justify-between max-md:flex-col max-md:gap-y-8">
                    <div
                        onClick={handleBack}
                        className={
                            second || third || fourth
                                ? 'text-gradientFirst border border-gray-300 flex items-center justify-center cursor-pointer h-16 rounded-full max-md:order-2 w-full md:w-5/12 lg:w-3/12'
                                : 'opacity-0'
                        }
                    >
                        <ArrowBackOutlinedIcon sx={{ fontSize: '1.2rem' }} /> &nbsp; Back
                    </div>
                    {loading && (
                        <img
                            src={loadingIn}
                            className="text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 w-5/12 rounded-full w-full md:w-5/12 rounded-full lg:w-3/12"
                        />
                    )}
                    {!loading && !profileFilled && (
                        <button
                            type="submit"
                            className="text-textW bg-gradient-to-r self-end flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 w-full md:w-5/12 rounded-full lg:w-3/12"
                        >
                            Save and Continue
                        </button>
                    )}
                </div>
            </form>
            <form
                onSubmit={handleThirdSubmit}
                className={!chooseJob && !first && !second && third && !fourth ? 'col-span-12 pt-5  space-y-1.5 ' : 'hidden'}
            >
                {!profileFilled && (
                    <>
                        <div className="text-neutral-900 text-[1.3rem] font-semibold leading-10 md:text-[1.6rem]">
                            Add Compensation and Description
                        </div>
                        <RequiredTextLabel text="What is the pay ?" req="nReq" />
                        <div className="flex flex-wrap gap-5 xl:pr-10">
                            <select
                                value={currency}
                                style={{ maxHeight: '200px' }}
                                onChange={(e) => setCurrency(e.currentTarget.value)}
                                className="form-select h-12 max-h-[20px] overflow-y-scroll pl-5 bg-white rounded-3xl border oveflow-y-auto cursor-pointer border-gray-200 focus:ring-orange-500 focus:border-0"
                            >
                                <option value="etb">ETB</option>
                                <option value="usd">USD</option>
                                <option value="euro">EURO</option>
                                <option value="gpb">GBP</option>
                                <option value="rnp">RMB</option>
                            </select>
                            <input
                                type="number"
                                onChange={(e) => {
                                    setMinSalary(e.currentTarget.value);
                                }}
                                placeholder="Minimum"
                                className="pl-5 w-40 rounded-full border border-gray-200 focus:ring-orange-500 focus:border-0 hideIncrease"
                            />
                            <input
                                type="number"
                                onChange={(e) => {
                                    setMaxSalary(e.currentTarget.value);
                                }}
                                placeholder="Maximum"
                                className="pl-5 w-40 rounded-full border border-gray-200 focus:ring-orange-500 focus:border-0 hideIncrease"
                            />
                        </div>
                        <RequiredTextLabel text="Job Description ?" />
                        <div className="pb-20 mr-2 relative xl:mr-64">
                            <ReactQuill
                                className="h-60 text-addS"
                                value={jobDesc}
                                onChange={(e) => setJobDesc(e)}
                                placeholder="Add Description"
                            />
                            {jobDescError && <p className="text-red-500 absolute bottom-3 text-[13px] ">{jobDescError}</p>}
                        </div>
                    </>
                )}
                {profileFilled && <EmployerProfile setFilled={setProfileFilled} />}
                <div className="flex pt-10 justify-between max-md:flex-col max-md:gap-y-8">
                    <div
                        onClick={handleBack}
                        className={
                            second || third || fourth
                                ? 'text-gradientFirst border border-gray-300 flex items-center justify-center cursor-pointer h-16 rounded-full max-md:order-2 w-full md:w-5/12 lg:w-3/12'
                                : 'opacity-0'
                        }
                    >
                        <ArrowBackOutlinedIcon sx={{ fontSize: '1.2rem' }} /> &nbsp; Back
                    </div>
                    {loading && (
                        <img
                            src={loadingIn}
                            className="text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 rounded-full w-full md:w-5/12 lg:w-3/12"
                        />
                    )}
                    {!profileFilled && !loading && (
                        <button
                            type="submit"
                            className="text-textW bg-gradient-to-r self-end flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 rounded-full  w-full md:w-5/12 lg:w-3/12"
                        >
                            Save and Continue
                        </button>
                    )}
                </div>
            </form>
            <form
                onSubmit={handleFourthSubmit}
                className={!chooseJob && !first && !second && !third && fourth ? 'col-span-12 pt-5  space-y-3 ' : 'hidden'}
            >
                <div className="text-neutral-900 text-[1.3rem] font-semibold leading-10 md:text-[1.6rem]">Set application Preference</div>
                <div className="flex bg-forBack w-full p-2 gap-x-5 md:w-1/2">
                    <div
                        onClick={() => {
                            setPalm(true);
                            setEmail(false);
                            setLink(false);
                        }}
                        className={
                            palm
                                ? 'flex rounded-md flex-col relative bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW cursor-pointer w-36 pl-3 py-2 h-20'
                                : 'hover:bg-skillColor hover:text-orange-600 flex flex-col relative bg-textW cursor-pointer w-36 pl-3 py-2 h-20 text-stone-400'
                        }
                    >
                        <ArticleIcon className="-ml-0.5" />
                        <p className="absolute bottom-1">Palm Jobs</p>
                    </div>
                    <div
                        onClick={() => {
                            setPalm(false);
                            setEmail(true);
                            setLink(false);
                        }}
                        className={
                            email
                                ? 'flex flex-col rounded-md relative bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW cursor-pointer w-36 pl-3 py-2 h-20'
                                : 'hover:bg-skillColor hover:text-orange-600 text-stone-400 flex flex-col relative bg-textW cursor-pointer w-36 pl-3 py-2 h-20'
                        }
                    >
                        <AlternateEmailIcon className="-ml-2" />
                        <p className="absolute bottom-1">Email</p>
                    </div>
                    <div
                        onClick={() => {
                            setPalm(false);
                            setEmail(false);
                            setLink(true);
                        }}
                        className={
                            link
                                ? 'flex flex-col rounded-md relative bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW cursor-pointer w-36 pl-3 py-2 h-20'
                                : 'hover:bg-skillColor text-stone-400 hover:text-orange-600 flex flex-col relative bg-textW cursor-pointer w-36 pl-3 py-2 h-20'
                        }
                    >
                        <InsertLinkIcon className="-ml-2" />
                        <p className="absolute bottom-1">External Link</p>
                    </div>
                </div>
                {email && (
                    <>
                        <RequiredTextLabel text="Email" />
                        <TextInput placeHolder="Email Address" value={emailSent} setFunction={setEmailSent} />
                        <p className="text-red-500 text-[13px]">{emailError}</p>
                    </>
                )}
                {link && (
                    <>
                        <RequiredTextLabel text="External Link" />
                        <TextInput placeHolder="External Link" value={externalLink} setFunction={setExternalLink} />
                        <p className="text-red-500 text-[13px]">{linkError}</p>
                    </>
                )}
                <div className="flex flex-col pt-2 gap-y-4 pb-7">
                    <RequiredTextLabel text="Closing Date" req="nReq" />
                    <input
                        value={deadline}
                        type="date"
                        min={todaysDate.toISOString().split('T')[0]}
                        max={maxDate.toISOString().split('T')[0]}
                        onChange={(e) => setDeadline(e.currentTarget.value)}
                        className="rounded-full  border-stone-300 py-3 cursor-pointer focus:border-orange-500 focus:ring-0 w-full px-20 md:px-28 md:w-96"
                    />
                </div>
                <div className="flex pt-10 max-md:flex-col max-md:gap-y-8 gap-y-5 flex-wrap justify-between">
                    <div className="w-full">
                        <div
                            onClick={() => setOpenPreview(true)}
                            className={
                                fourth
                                    ? 'text-orange-600 border flex items-center justify-center cursor-pointer h-16 rounded-full w-full block  md:w-5/12 lg:w-3/12'
                                    : 'hidden'
                            }
                        >
                            See Preview &nbsp; <VisibilityIcon sx={{ fontSize: '1.3rem' }} />
                        </div>
                    </div>

                    <div
                        onClick={handleBack}
                        className={
                            second || third || fourth
                                ? 'text-gradientFirst border border-gray-300 flex items-center justify-center cursor-pointer h-16 rounded-full max-md:order-3 w-full md:w-5/12 lg:w-3/12'
                                : 'opacity-0'
                        }
                    >
                        <ArrowBackOutlinedIcon sx={{ fontSize: '1.2rem' }} /> &nbsp; Back
                    </div>
                    {loading && (
                        <img
                            src={loadingIn}
                            className="text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 w-5/12 rounded-full max-md:order-1 w-full md:w-5/12 lg:w-3/12"
                        />
                    )}
                    {!loading && (
                        <button
                            type="submit"
                            className="text-textW bg-gradient-to-r self-end flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 rounded-full max-md:order-1 w-full md:w-5/12 lg:w-3/12"
                        >
                            Post Job
                        </button>
                    )}
                </div>
            </form>
            <div className="flex justify-end pt-5">
                {!fourth && !profileFilled && chooseJob && (noJobs || noDraft) && (
                    <div
                        onClick={handleFront}
                        className="text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 max-md:mt-10 w-full md:w-5/12 rounded-full lg:w-3/12"
                    >
                        Continue
                    </div>
                )}
            </div>
            {
                <ConfirmModal isOpen={openPreview} handleClose={() => setOpenPreview(!openPreview)}>
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
                            <div className="col-span-12 grid grid-cols-12 border-[1px] mx-3 rounded-full">
                                <div
                                    className={
                                        company == true
                                            ? 'col-span-6 rounded-full rounded-3xl text-lightGrey  font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer sm:text-bigS'
                                            : 'col-span-6 rounded-full bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW  font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer sm:text-bigS'
                                    }
                                    onClick={() => setCompany(false)}
                                >
                                    Job Description
                                </div>
                                <div
                                    className={
                                        company == true
                                            ? 'col-span-6 rounded-full bg-gradient-to-r from-gradientFirst to-gradientSecond rounded-3xl text-textW font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer sm:text-bigS'
                                            : 'col-span-6 rounded-full rounded-3xl text-lightGrey font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer sm:text-bigS'
                                    }
                                    onClick={() => setCompany(true)}
                                >
                                    Company
                                </div>
                            </div>
                            {!company && (
                                <div className="col-span-12 mx-3">
                                    {/*                                     <p className="font-thW text-frhS">Job Description</p>
                                     */}{' '}
                                    <div
                                        className="text-sm text-fadedText max-h-20 overflow-y-auto hideScrollBar"
                                        dangerouslySetInnerHTML={{ __html: jobDesc }}
                                    />
                                    <div className="w-full mt-16 rounded-full rounded-3xl bg-gradientSecond text-textW text-bigS font-bigW h-[3.5rem] flex items-center justify-center cursor-pointer ">
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
                </ConfirmModal>
            }
        </div>
    );
};
export default PostAJob;
