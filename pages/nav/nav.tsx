import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import EditIcon from '@mui/icons-material/Edit';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import ConfirmModal from '@/components/ConfirmModal';
import SchoolIcon from '@mui/icons-material/School';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { useUser } from '@/lib/context';
import { MiddleWare } from '@/lib/middleware';
import dynamic from 'next/dynamic';
import { accountData, deleteProfileImage, getProfilePicture, signOut } from '@/lib/services';
import skillsData from '@/lib/skillData';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/router';
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
});
interface Data {
    word: string;
}
type myState = number | null;
const ElementWithIcon = (props: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDescription = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className={'grid grid-cols-12 pb-5 cursor-pointer md:mb-5 sm:max-md:gap-x-2'} onClick={toggleDescription} key={props.key}>
                <div
                    className="col-span-3 sm:col-span-2 flex 
                    items-center 
                    justify-center 
                    md:col-span-2 
                lg:col-span-2"
                >
                    <div className="w-16 h-16 bg-skillColor flex items-center justify-center rounded-[1rem]">
                        <BusinessCenterOutlinedIcon
                            sx={{
                                color: '#FE5E0A',
                                height: '1.5rem'
                            }}
                        />
                    </div>
                </div>

                <div className="col-span-6 grid grid-cols-12 sm:col-span-7 lg:col-span-8 ">
                    <p className="col-span-12 text-fhS font-fhW leading-fhL flex items-center md:text-shS md:font-smRW">{props.title}</p>
                    <div className=" hidden font-bigW text-smRS leading-smL  text-fadedText col-span-12 grid-cols-12 md:grid pt-2">
                        <div className="col-span-5"> {props.companyName}</div>
                        <div className="col-span-6">
                            <CalendarTodayIcon sx={{ marginRight: '0.5rem', fontSize: '0.9rem' }} />
                            {props.startDate} - {props.endDate}
                        </div>
                    </div>
                </div>
                <div className="col-span-2 flex items-center justify-end pr-1 lg:col-span-2">
                    {isOpen ? (
                        <KeyboardArrowUpIcon
                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                            className="w-7 h-7 p-1.5 "
                        />
                    ) : (
                        <KeyboardArrowDownIcon
                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                            className="w-7 h-7 p-1.5 "
                        />
                    )}
                </div>
                {isOpen && (
                    <div className="col-span-12 md:pl-5">
                        <div
                            className="font-smW text-smS leading-smL text-lightGrey col-span-12 pl-2 pt-4 lg:pt-7 lg:pl-5"
                            dangerouslySetInnerHTML={{ __html: props.workDescription }}
                        />
                    </div>
                )}
                <div className="col-span-12 ml-2  block h-[0.5px] bg-fadedText mt-5 md:ml-3"></div>
            </div>
        </>
    );
};
const ProjectDetails = (props: any) => {
    const project = '/images/project.png';

    return (
        <div className="col-span-12 border-b-2 pb-5 sm:pb-0 sm:border-b-0 md:col-span-6 grid grid-cols-12 sm:pl-10 mt-5">
            <div className="col-span-12 sm:col-span-5 pr-1 py-1 grid justify-items-center sm:justify-items-start">
                <img src={project} className="w-48 h-48 rounded-3xl" />
            </div>
            <div className="col-span-12 sm:col-span-7 pl-5 pt-3">
                <div className="grid grid-cols-12">
                    <p className="text-shS font-shW leading-shL col-span-10">Project Title</p>
                    <span className="text-right col-span-2">
                        <EditIcon sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }} className="w-7 h-7 p-1.5 mr-2 " />
                    </span>
                </div>
                <p className="text-lightGrey pt-3 pr-3">lorem ipsum dolor sit amet consectetur. Accumsan feugiat dolor aliquet</p>
                <a className="text-gradientFirst block underline text-right pr-4 pt-2 font-[600]">Read More</a>
                <div className="pt-1">
                    <a className="text-gradientFirst">
                        <InsertLinkOutlinedIcon sx={{ marginTop: '-0.1rem' }} />
                        <span className="underline mt-5 pl-3">Project Link</span>
                    </a>
                </div>
            </div>
        </div>
    );
};
const CertificateDetails = (props: any) => {
    return (
        <div
            key={props.key}
            className="col-span-12  grid grid-cols-12 bg-lightGreen rounded-2xl p-5 sm:max-md:col-span-6 md:max-lg:col-span-4 lg:col-span-11"
        >
            <div className="col-span-2">
                <WorkspacePremiumIcon sx={{ color: 'green' }} className="mt-2" />
            </div>
            <div className="col-span-10">
                <p className="font-dfvW text-dfvS leading-dfvL">{props.certificateName}</p>
                <p className="font-fhW text-fhS leading-fhL text-lightGrey">{props.givenBy}</p>
                <p className="text-smRs mt-2">
                    <CalendarTodayIcon sx={{ fontSize: '0.8rem', marginTop: '-0.3rem' }} />{' '}
                    <span className="text-fadedText">{props.givenDate}</span>
                </p>
            </div>
        </div>
    );
};
const CertificateDetailsEdit = (props: any) => {
    return (
        <div className="col-span-12 grid grid-cols-12 border-2 rounded-2xl p-5 sm:max-md:col-span-6 lg:col-span-6">
            <div className="col-span-2">
                <WorkspacePremiumIcon sx={{ color: 'green' }} className="mt-2" />
            </div>
            <div className="col-span-9">
                <p className="font-dfvW text-dfvS leading-dfvL">Certificate Name</p>
                <p className="font-fhW text-fhS leading-fhL text-lightGrey">Certified by</p>
                <p className="text-smRs mt-2">
                    <CalendarTodayIcon sx={{ fontSize: '0.8rem', marginTop: '-0.3rem' }} /> <span className="text-fadedText">Jun 2022</span>
                </p>
            </div>
            <div className="col-span-1">
                <EditIcon
                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                    className="w-6 h-6 p-1.5 mr-2 cursor-pointer"
                />
            </div>
        </div>
    );
};
const Nav = () => {
    const profile = '/images/profile.svg';
    const loadingIn = '/images/loading.svg';
    const [selected, setSelected] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [openBio, setOpenBio] = useState(false);
    const [openProject, setOpenProject] = useState(false);
    const [openCertificate, setOpenCertificate] = useState(false);
    const [openWork, setOpenWork] = useState(false);
    const [openWorkEdit, setOpenWorkEdit] = useState(false);
    const [openEducation, setOpenEducation] = useState(false);
    const [editFullCertificate, setEditFullCertificate] = useState(false);
    const [editCertificateData, setEditCertificateData] = useState<any>();
    const router = useRouter();
    const [displayCertificate, setDisplayCertificate] = useState(false);
    const [displayEducation, setDisplayEducation] = useState(false);
    const [displayWorkHisotry, setDisplayWorkHistory] = useState(false);
    const [displayProject, setDisplayProject] = useState(false);
    const [linkedAdd, setLinkedAdd] = useState(false);
    const [behancAdd, setBehanceAdd] = useState(false);
    const [portfAdd, setPortfAdd] = useState(false);
    const [callAdd, setCallAdd] = useState(false);
    const [githubAdd, setGithubAdd] = useState(false);
    const [updateRes, setUpdateRes] = useState(false);
    const [updateSupport, setUpdateSupport] = useState(false);
    const [inputSkill, setInputSkill] = useState(false);
    const [profileError, setProfileError] = useState('');
    const [editOneCertificate, setEditOneCertificate] = useState(false);
    const [editOneWork, setEditOneWork] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const toggleDescription = () => {
        setIsOpen(!isOpen);
    };
    const userData: any = accountData();
    const bioMaxCharacters = 100;
    const bioDescMaxCharacters = 1000;
    const coverMaxCharacters = 5000;
    const skillsMaxCharacters = 6;
    const maximumCertificates = 5;
    const maximumProjects = 5;
    const maximumWorkHistory = 3;
    const maximumEducation = 5;
    const maxWorkHistoryTitle = 20;
    const maxWorkHistoryCompany = 20;
    const maxWorkHistoryStartDate = 20;
    const maxWorkHistoryEndDate = 20;
    const maxWorkHistoryDescription = 580;

    const items: Data[] = skillsData;
    const {
        firstLetter,
        headline,
        setHeadline,
        description,
        setDescription,
        skill,
        setSkill,
        file,
        setFile,
        projectFile,
        setProjectFile,
        array,
        setArray,
        certificateArray,
        setCertificateArray,
        certificateData,
        setCertificateData,
        image,
        setImage,
        isChecked,
        setIsChecked,
        workHistoryArray,
        setWorkHistoryArray,
        workHistoryData,
        setWorkHistoryData,
        editedWork,
        setEditedWork,
        workIndex,
        setWorkIndex,
        workEdit,
        setWorkEdit,
        deleteProfilePicture,
        handleBio,
        /*         addSkills,
         */ addSuggestedSkill,
        deleteSkill,
        certificateEdit,
        setCertificateEdit,
        certificateIndex,
        setCertificateIndex,
        projectIndex,
        setProjectIndex,
        projectEdit,
        setProjectEdit,
        projectsArray,
        setProjectsArray,
        projectData,
        setProjectData,
        editedProject,
        setEditedProject,
        editedCertificate,
        setEditedCertificate,
        educationIndex,
        setEducationIndex,
        education,
        setEducation,
        EditEducation,
        addProject,
        editProject,
        deleteProject,
        setEditEducation,
        educationArray,
        setEducationArray,
        EditedEducation,
        setEditedEducation,
        addCertificate,
        editCertificate,
        deleteCertificate,
        addWorkHistory,
        editWorkHistory,
        deleteWorkHistory,
        addEducation,
        editEducations,
        deleteEducation,
        changeUserName,
        editedName,
        setEditedName,
        editName,
        setEditName,
        github,
        setGithub,
        linkedIn,
        linked,
        setLinked,
        setLinkedIn,
        addLinkedIn,
        deleteLinkedIn,
        addGithub,
        deleteGithub,
        githubLink,
        setGithubLink,
        addResume,
        resume,
        setResume,
        updateResume,
        resumeId,
        inputResume,
        setInputResume,
        phone,
        call,
        setCall,
        setPhone,
        addPhone,
        deletePhone,
        behan,
        setBehan,
        behance,
        setBehance,
        portf,
        setPortf,
        portfolio,
        setPortfolio,
        addBehan,
        deleteBehan,
        addPortf,
        deletePortf,
        addSupportDocument,
        updateSupportDoc,
        supportDocument,
        setSupportDocument,
        supportDocumentId,
        inputSupportDoc,
        setInputSupportDoc,
        updateProfilePictures,
        uploadProfilePictures,
        coverLetter,
        setCoverLetter,
        handleCoverLetter,
        addSocialLink,
        success,
        setSuccess,
        loadings,
        setLoadings,
        locate,
        setLocate
    } = MiddleWare();

    const { loading, user, role } = useUser();
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Data[]>([]);
    const [approveDeleteSkill, setApproveDeleteSkill] = useState<myState>(null);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        console.log(array.length);

        if (array.length <= skillsMaxCharacters) setSearchTerm(inputValue);
        const filteredSuggestions = items.filter((data) => data.word.toLowerCase().includes(inputValue.toLowerCase()));
        setSuggestions(filteredSuggestions);
    };
    const handleSuggestionClick = (suggestion: Data) => {
        setSearchTerm('');
        addSuggestedSkill(suggestion.word);
        setSearchTerm('');
        setSuggestions([]);
    };
    const clickMe = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        array.length <= skillsMaxCharacters && addSuggestedSkill(searchTerm);
        setSearchTerm('');
    };
    const showCertificate = () => {
        setDisplayCertificate(!displayCertificate);
    };
    const showProject = () => {
        setDisplayProject(!displayProject);
    };
    const showEducation = () => {
        setDisplayEducation(!displayEducation);
    };
    const showWorkHistory = () => {
        setDisplayWorkHistory(!displayWorkHisotry);
    };
    useEffect(() => {
        const cand = !(role == '' || role == 'candidate') ? true : false;
        if ((!user && !loading) || cand) {
            router.push('/account/signIn');
        }
    }, [user, loading, role]);
    useEffect(() => {
        if (success === 'success' || success === 'failed') {
            const timer = setTimeout(() => {
                setSuccess('');
            }, 2000);
            return () => clearTimeout(timer);
        }
        setOpenProject(false);
    }, [success]);
    useEffect(() => {
        if (openCertificate == false) {
            setEditOneCertificate(false);
            setDisplayCertificate(false);
            setConfirmDelete(false);
        }
    }, [openCertificate]);
    useEffect(() => {
        if (openWork == false) {
            setWorkEdit(false);
            setDisplayWorkHistory(false);
            setConfirmDelete(false);
        }
    }, [openWork]);
    useEffect(() => {
        if (openEducation == false) {
            setEditEducation(false);
            setDisplayEducation(false);
            setConfirmDelete(false);
        }
    }, [openEducation]);
    const editWork = (index: number) => {
        //console.log(workHistoryArray[index]);
        setWorkEdit(true);
        setWorkIndex(index);
        setEditedWork(workHistoryArray[index]);
    };
    const indexProjects = (index: number) => {
        //console.log(workHistoryArray[index]);
        setProjectEdit(true);
        setProjectIndex(index);
        setEditedProject(projectsArray[index]);
    };
    const indexEducation = (index: number) => {
        setEditEducation(true);
        setEducationIndex(index);

        //console.log(educationArray[index]);
        setEditedEducation(educationArray[index]);
        // console.log(EditedEducation);
    };
    const indexCertificate = (index: number) => {
        setCertificateEdit(true);
        setCertificateIndex(index);
        setEditedCertificate(certificateArray[index]);
    };
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };
    const sureDeleteSkill = (index: number) => {
        setApproveDeleteSkill(index);
    };
    const projectImage = (id: string) => {
        const { href } = getProfilePicture(id);
        return href;
    };
    const editUserName = () => {
        setEditName(true);
    };
    const updatePic = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.currentTarget.files) {
            const fileList = Array.from(e.currentTarget.files);

            // Maximum file size in bytes (e.g., 5MB)
            const maxSize = 1 * 1024 * 1024;

            // Allowed file extensions
            const allowedExtensions = ['.jpg', '.jpeg', '.png'];

            // Filter files based on size and extension
            const filteredFiles = fileList.filter((file) => {
                // Check file size
                if (file.size > maxSize) {
                    console.log(`File ${file.name} exceeds the maximum size limit.`);
                    setProfileError('File size must be <1 mb');
                    return false;
                }
                // Check file extension
                const fileExtension = `.${file.name.split('.').pop()}`;
                if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
                    console.log(`File ${file.name} has an invalid extension.`);
                    setProfileError('Invalid file extenstion');
                    return false;
                }
                setProfileError(' ');
                return updateProfilePictures(e.currentTarget.files && e.currentTarget.files[0]);
            });
        }
    };
    const uploadPic = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.currentTarget.files) {
            const fileList = Array.from(e.currentTarget.files);
            const maxSize = 1 * 1024 * 1024;
            const allowedExtensions = ['.jpg', '.jpeg', '.png'];
            const filteredFiles: any = fileList.filter((file) => {
                if (file.size > maxSize) {
                    console.log(`File ${file.name} exceeds the maximum size limit.`);
                    setProfileError('File size must be <1 mb');
                    return false;
                }
                const fileExtension = `.${file.name.split('.').pop()}`;
                if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
                    console.log(`File ${file.name} has an invalid extension.`);
                    setProfileError('Invalid file extenstion');
                    return false;
                }
                setProfileError(' ');
                return uploadProfilePictures(e.currentTarget.files && e.currentTarget.files[0]);
            });
        }
    };
    const uploadCv = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.currentTarget.files) {
            const fileList = Array.from(e.currentTarget.files);
            const maxSize = 1 * 1024 * 1024;
            const allowedExtensions = ['.pdf', 'docx'];
            const filteredFiles: any = fileList.filter((file) => {
                if (file.size > maxSize) {
                    console.log(`File ${file.name} exceeds the maximum size limit.`);
                    return false;
                }
                const fileExtension = `.${file.name.split('.').pop()}`;
                if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
                    console.log(`File ${file.name} has an invalid extension.`);
                    return false;
                }

                return addResume(e.currentTarget.files && e.currentTarget.files[0]);
            });
        }
    };
    const updateCv = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.currentTarget.files) {
            const fileList = Array.from(e.currentTarget.files);
            const maxSize = 1 * 1024 * 1024;
            const allowedExtensions = ['.pdf'];
            const filteredFiles: any = fileList.filter((file) => {
                if (file.size > maxSize) {
                    console.log(`File ${file.name} exceeds the maximum size limit.`);
                    return false;
                }
                const fileExtension = `.${file.name.split('.').pop()}`;
                if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
                    console.log(`File ${file.name} has an invalid extension.`);
                    return false;
                }

                return updateResume(e.currentTarget.files && e.currentTarget.files[0]);
            });
        }
    };
    const uploadSupportDoc = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.currentTarget.files) {
            const fileList = Array.from(e.currentTarget.files);
            const maxSize = 1 * 1024 * 1024;
            const allowedExtensions = ['.pdf'];
            const filteredFiles: any = fileList.filter((file) => {
                if (file.size > maxSize) {
                    console.log(`File ${file.name} exceeds the maximum size limit.`);
                    return false;
                }
                const fileExtension = `.${file.name.split('.').pop()}`;
                if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
                    console.log(`File ${file.name} has an invalid extension.`);
                    return false;
                }

                return addSupportDocument(e.currentTarget.files && e.currentTarget.files[0]);
            });
        }
    };
    const updateSupportDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.currentTarget.files) {
            const fileList = Array.from(e.currentTarget.files);
            const maxSize = 1 * 1024 * 1024;
            const allowedExtensions = ['.pdf'];
            const filteredFiles: any = fileList.filter((file) => {
                if (file.size > maxSize) {
                    console.log(`File ${file.name} exceeds the maximum size limit.`);
                    return false;
                }
                const fileExtension = `.${file.name.split('.').pop()}`;
                if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
                    console.log(`File ${file.name} has an invalid extension.`);
                    return false;
                }

                return updateSupportDoc(e.currentTarget.files && e.currentTarget.files[0]);
            });
        }
    };
    const addCoverLetter = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        handleCoverLetter();
    };
    return (
        <div className="px-3 md:px-16">
            <Navigation />
            <div className="grid grid-cols-12 pt-8 xl:pl-48 xl:pr-16 mt-20">
                <div className="col-span-12 grid grid-cols-12">
                    <div className="col-span-12 grid grid-cols-12 justify-items-center md:col-span-7 md:justify-items-start lg:col-span-6 xl:col-span-6 ">
                        <div className="col-span-12 relative md:col-span-4 xl:col-span-4">
                            <div className="profilePictureContainer w-40 h-40 col-span-2 rounded-3xl cursor-pointer">
                                {image ? (
                                    <>
                                        <img src={image} className="w-40 h-40 col-span-2 rounded-3xl cursor-pointer" />
                                        <DeleteIcon
                                            onClick={deleteProfilePicture}
                                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                            className="w-7 h-7 p-1.5 mr-0 absolute right-0 top-0 -mr-[0.7rem] mt-3 cursor-pointer"
                                        />
                                        <div className="uploadProfile">
                                            <label htmlFor="photo-upload" className="custom-file-upload">
                                                <div className="img-wrap img-upload">
                                                    <CameraAltOutlinedIcon className="text-black" />
                                                </div>
                                                <input id="photo-upload" type="file" value={file} onChange={updatePic} />
                                            </label>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p className="w-40 h-40 col-span-2 rounded-3xl cursor-pointer bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW flex text-center justify-center text-[5rem] font-frhW">
                                            {firstLetter}
                                        </p>
                                        <div className="uploadProfile">
                                            <label htmlFor="photo-upload" className="custom-file-upload">
                                                <div className="img-wrap img-upload">
                                                    <CameraAltOutlinedIcon className="text-textW" />
                                                </div>
                                                <input id="photo-upload" type="file" onChange={uploadPic} />
                                            </label>
                                        </div>
                                        <p>This is error</p>
                                    </>
                                )}
                            </div>
                            {profileError && <p className="text-gradientFirst pt-3 pl-2 text-[12px]">{profileError}</p>}
                        </div>
                        <div className="col-span-12 pt-5 md:col-span-8 md:pl-5 xl:pl-2 xl:col-span-6">
                            <p className="font-frhW text-frhS leading-frhL ">
                                {userData && userData.name}
                                <EditIcon
                                    onClick={() => setOpenProfile(!openProfile)}
                                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                    className="w-5 h-5 p-1 ml-2 cursor-pointer"
                                />
                            </p>
                            <p className="font-midRW text-midRS leading-midRL text-lightGrey mt-5 text-center">
                                <FmdGoodOutlinedIcon className="w-7 h-7" /> Addis Ababa
                                {linked && (
                                    <Link target="_blank" href={linked}>
                                        <LinkedInIcon sx={{ color: '#FE5E0A' }} className="w-7 h-7" />
                                    </Link>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="col-span-12">
                        <ul className="flex space-x-10 pl-3 mt-7">
                            <li>
                                <a className="font-shW text-shS leading-shL">About</a>
                            </li>
                            <li>
                                <a className="font-shW text-shS leading-shL text-lightGrey">Resume</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-span-12 grid grid-cols-12 bg-forBack px-1 pt-2 mt-10 rounded-2xl">
                    {/*                     <div className="col-span-12 grid grid-cols-12 gap-3 pb-5 ">
                     */}{' '}
                    <div
                        className="col-span-12 grid grid-cols-12 bg-textW rounded-3xl
                     p-2 pt-5 lg:pl-10 lg:p-8"
                    >
                        <div className="col-span-8 md:col-span-6">
                            <p className="font-fhW text-fhS leading-fhL text-textR">
                                <PersonIcon sx={{ color: '#FE5E0A' }} /> {headline}
                            </p>
                        </div>
                        <div className="col-span-4 md:col-span-6 grid justify-items-end">
                            <EditIcon
                                onClick={() => setOpenBio(true)}
                                sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                className="w-7 h-7 p-1.5 mr-2 cursor-pointer"
                            />
                        </div>
                        <div className="col-span-12 pt-3 md:col-span-11">
                            <p className="font-smW text-smS leading-smL text-lightGrey pl-2">{description}</p>
                        </div>
                    </div>
                    {/*  <div className="col-span-12 md:col-span-4 grid grid-cols-12 bg-textW rounded-3xl p-2 pt-5">
                            <div className="col-span-12">
                                <p className="font-dfvW text-dfvS leading-dfvL text-lightGrey pl-2">
                                    <VisibilityOutlinedIcon /> <span className="text-gradientFirst">23</span> Profile Views
                                </p>
                            </div>
                            <div className="col-span-12">graph</div>
                        </div> */}
                    {/*                     </div>
                     */}{' '}
                    {/* cetrificates */}
                    <div className="col-span-12 grid grid-cols-12 gap-y-4 gap-x-3 mt-5 pt-10 pb-1">
                        <div className="col-span-12 bg-textW rounded-3xl py-5  pt-8 flex lg:col-span-4 flex-col lg:pl-14">
                            <div className="grid grid-cols-12 ">
                                <div className="col-span-7 lg:col-span-8">
                                    <p className=" font-fhW text-fhS leading-fhL pl-1 lg:max-xl:text-red-500">
                                        <WorkspacePremiumIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem' }} />
                                        Certificates
                                    </p>
                                </div>
                                <div className="col-span-5 lg:col-span-4 text-right">
                                    <p className="font-fhW text-fhS leading-fhL pl-1 lg:pl-5">
                                        <EditIcon
                                            onClick={() => setOpenCertificate(true)}
                                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                            className="w-6 h-6 p-1.5 mr-2 cursor-pointer"
                                        />
                                    </p>
                                </div>
                                <div className="col-span-12 grid grid-cols-12 mt-6 sm:max-md:gap-x-3 md:max-lg:gap-x-2 gap-y-4">
                                    {certificateArray &&
                                        certificateArray.map((item, index) => (
                                            <CertificateDetails
                                                key={item.index}
                                                certificateName={item.name}
                                                givenBy={item.issuedBy}
                                                givenDate={item.year}
                                            />
                                        ))}
                                </div>

                                {certificateArray.length == 0 && (
                                    <p className="font-smW text-smS leading-smL text-lightGrey col-span-12 pl-10 italic mt-3 lg:mt-5">
                                        You haven't added certifications, yet.
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="col-span-12 rounded-3xl bg-textW grid grid-cols-12 py-8 md:pr-5 lg:col-span-8">
                            <div className="col-span-6">
                                <p className="font-fhW text-fhS leading-fhL pl-1 col-span-12 lg:pl-7 xl:pl-9">
                                    <BusinessCenterIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem' }} />
                                    Work History
                                </p>
                            </div>
                            <div className="col-span-6 grid justify-items-end">
                                <EditIcon
                                    onClick={() => setOpenWork(!openWork)}
                                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                    className="w-7 h-7 p-1.5 mr-2 cursor-pointer"
                                />
                            </div>
                            <div className="col-span-12 mt-10">
                                {workHistoryArray &&
                                    workHistoryArray.map((item, index) => (
                                        <ElementWithIcon
                                            title={item.title}
                                            companyName={item.companyName}
                                            startDate={item.startDate}
                                            endDate={item.endDate}
                                            workDescription={item.jobDescription}
                                            key={item.index}
                                        />
                                    ))}
                            </div>
                        </div>
                        <div className="col-span-12 grid grid-cols-12 pt-7 rounded-3xl bg-textW lg:col-start-5 lg:col-end-13 lg:pl-7 pb-10">
                            <div className="col-span-8 md:col-span-3 md:col-span-4 lg:col-span-6 xl:col-span-5">
                                <p className="font-fhW text-fhS leading-fhL pl-1 col-span-12">
                                    <SchoolOutlinedIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem' }} />
                                    Education
                                    <EditIcon
                                        onClick={() => setOpenEducation(true)}
                                        sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                        className="w-7 h-7 p-1.5 ml-5 hidden md:inline-block cursor-pointer"
                                    />
                                </p>
                            </div>
                            <div className="col-span-4 md:col-span-1 grid justify-items-end md:hidden">
                                <EditIcon
                                    onClick={() => setOpenEducation(true)}
                                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                    className="w-7 h-7 p-1.5 mr-2"
                                />
                            </div>
                            <div className="col-span-12 mt-8">
                                {educationArray &&
                                    educationArray.map((item, index) => (
                                        <div key={index} className="col-span-11 grid grid-cols-12 pb-5 md:mb-5 sm:max-md:gap-x-2 ">
                                            <div className="col-span-3 sm:col-span-2 flex items-center justify-center md:col-span-2 lg:col-span-2">
                                                <div className="w-16 h-16 bg-skillColor flex items-center justify-center rounded-[1rem]">
                                                    <SchoolIcon
                                                        sx={{
                                                            color: '#FE5E0A',
                                                            height: '1.5rem'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 grid grid-cols-12 sm:col-span-7  lg:col-span-8 ">
                                                <p className="col-span-12 text-fhS font-fhW leading-fhL flex items-center md:text-shS md:font-smRW">
                                                    {item.educationLevel}
                                                </p>
                                                <div className="font-bigW text-smRS leading-smL text-fadedText col-span-12 grid-cols-12 grid pt-2">
                                                    <div className="col-span-12 xl:col-span-5">{item.fieldStudy}</div>
                                                    <div className="col-span-12 xl:col-span-5">{item.university}</div>
                                                    <div className="col-span-12 max-sm:text-[13px] xl:col-span-7">
                                                        <CalendarTodayIcon sx={{ marginRight: '0.5rem', fontSize: '0.9rem' }} />
                                                        {item.yearIssued}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div className="col-span-3 flex flex-col justify-end items-end gap-y-3  pr-1 md:col-span-2">
                                            <EditIcon
                                                onClick={() => {
                                                        setEditEducation(true);
                                                        indexEducation(index);
                                                    }}
                                                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                                    className="w-6 h-6 p-1.5 mr-2 cursor-pointer"
                                            />
                                            <DeleteIcon
                                                onClick={() => {
                                                        setConfirmDelete(true);
                                                        setEducationIndex(index);
                                                    }}
                                                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                                    className="w-6 h-6 p-1.5 mr-2 mt-5 cursor-pointer"
                                            />
                                        </div> */}

                                            <div className="col-span-12 ml-2 block h-0.5 bg-fadedText mt-2 md:h-[0.5px] md:ml-3"></div>
                                        </div>
                                    ))}
                            </div>
                            {educationArray.length == 0 && (
                                <p className="font-smW text-smS leading-smL text-lightGrey col-span-12 pl-2 pt-4 lg:pt-7">
                                    Add your education.
                                </p>
                            )}
                            {/* <button className="text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-80 rounded-[3.75rem] mt-6 md:w-60 lg:w-80 lg:mt-10">
                                Add Education
                            </button> */}
                        </div>
                    </div>
                    {/* projects */}{' '}
                    <div className="col-span-12 pt-7 grid grid-cols-12 bg-textW rounded-3xl pb-8 mb-5 lg:pl-10">
                        <div className="col-span-8 md:col-span-3">
                            <p className="font-fhW text-fhS leading-fhL pl-1 col-span-12 lg:pl-5">
                                <AttachFileIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem', rotate: '40deg' }} />
                                Projects
                                {/* <EditIcon
                                    onClick={() => setOpenProject(!openProject)}
                                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                    className="w-7 h-7 p-1.5 ml-3 hidden md:inline-block cursor-pointer"
                                /> */}
                            </p>
                        </div>
                        {/* <div className="col-span-4 md:col-span-1 grid justify-items-end md:hidden">
                            <EditIcon
                                onClick={() => setOpenProject(!openProject)}
                                sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                className="w-7 h-7 p-1.5 mr-2 cursor-pointer"
                            />
                        </div> */}
                        <div className="col-span-12 mt-6 grid grid-cols-12 gap-y-5">
                            {projectsArray &&
                                projectsArray.map((item, index) => (
                                    <div
                                        key={index}
                                        className="col-span-12 border-b-2 pb-5 sm:pb-0 sm:border-b-0 md:col-span-6 grid grid-cols-12 sm:pl-10 mt-5"
                                    >
                                        <div className="col-span-12 sm:col-span-5 pr-1 py-1 grid justify-items-center sm:justify-items-start">
                                            {item.thumbnailId && (
                                                <img src={projectImage(item.thumbnailId)} className="w-48 h-48 rounded-3xl" />
                                            )}
                                        </div>
                                        <div className="col-span-12 sm:col-span-7 pl-5 pt-3">
                                            <div className="grid grid-cols-12">
                                                <p className="text-shS font-shW leading-shL col-span-10 flex">{item.name}</p>
                                                <div className="text-right col-span-2 flex flex-col items-end gap-y-3">
                                                    <EditIcon
                                                        onClick={() => {
                                                            setProjectEdit(true);
                                                            indexProjects(index);
                                                            setOpenProject(true);
                                                        }}
                                                        sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                                        className="w-7 h-7 p-1.5 mr-2 cursor-pointer"
                                                    />
                                                    <DeleteIcon
                                                        onClick={() => {
                                                            setConfirmDelete(true);
                                                            setProjectIndex(index);
                                                        }}
                                                        sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                                        className="w-7 h-7 p-1.5 mr-2 cursor-pointer"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                dangerouslySetInnerHTML={{ __html: item.description }}
                                                className="text-lightGrey pt-3 pr-3"
                                            />
                                            {/*                 <a className="text-gradientFirst block underline text-right pr-4 pt-2 font-[600]">Read More</a>
                                             */}{' '}
                                            <div className="pt-1">
                                                {item.url && (
                                                    <a className="text-gradientFirst" target="_blank" href={item.url}>
                                                        <InsertLinkOutlinedIcon sx={{ marginTop: '-0.1rem' }} />
                                                        <span className="underline mt-5 pl-3">{item.url}</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        {confirmDelete && projectIndex == index && (
                                            <div className="col-span-12 border-2 p-2 border-red-800 rounded-2xl flex gap-x-4">
                                                <p>Are you Sure you want to delete?</p>
                                                <button
                                                    onClick={() => setConfirmDelete(false)}
                                                    className="rounded-[20%] bg-lightGreen text-red-500 py-0.5 px-1"
                                                >
                                                    No
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setConfirmDelete(false);
                                                        deleteProject(index);
                                                        deleteProfileImage(item.thumbnailId);
                                                    }}
                                                    className="bg-lightGreen rounded-[20%] text-green-800 py-0.5 px-1"
                                                >
                                                    Yes
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>

                        {projectsArray.length == 0 && (
                            <p className="font-smW text-smS leading-smL text-lightGrey col-span-12 pl-2 pt-4 lg:pt-7 lg:pl-5">
                                Add your best projects to showcase your strengths and impact.
                            </p>
                        )}
                        {projectsArray.length == 0 && (
                            <button
                                onClick={() => {
                                    setOpenProject(true);
                                    setDisplayProject(true);
                                }}
                                className="text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-80 rounded-[3.75rem] mt-6 md:w-60 lg:w-80 lg:mt-10 lg:ml-6"
                            >
                                Add Projects
                            </button>
                        )}
                    </div>
                    {/* skills */}
                    <div className="col-span-12 pt-7 grid grid-cols-12 bg-textW rounded-3xl pb-5 mb-5 lg:pl-10">
                        <p className="font-fhW text-fhS leading-fhL pl-1 col-span-8 lg:pl-5">
                            <LocalFireDepartmentOutlinedIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem' }} />
                            Skills
                            {/* <EditIcon
                                sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                className="w-7 h-7 p-1.5 ml-3 hidden md:inline-block"
                            /> */}
                        </p>
                        <div className="col-span-4 md:col-span-1 grid justify-items-end md:hidden">
                            <EditIcon sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }} className="w-7 h-7 p-1.5 mr-2" />
                        </div>
                        <div /* className="col-span-12 grid grid-cols-12 pt-8 gap-y-6 justify-items-center" */
                        className="col-span-12 pt-8 flex flex-wrap gap-2">
                            {array.map((item, index) => (
                <div className="min-w-36 h-12 font-adW text-adS leading-adL bg-skillColor text-center flex items-center justify-center rounded-[3.75rem]" key={index}>
{/*                     {item} <span onClick={() => sureDeleteSkill(index)}>X</span>
 */}                    <p className='pl-2'> {item} </p> <CloseIcon sx={{ color: 'green'}}
                                            className="w-7 h-7 cursor-pointer p-1"/>
                </div>
            ))}
                            <div
                               /*  className="col-span-6 w-36 h-12 font-adW text-adS leading-adL bg-skillColor text-center flex items-center justify-center rounded-[3.75rem] 
                       sm:col-span-3 xl:col-span-2" */ 
                        className="min-w-36 h-12 font-adW text-adS leading-adL bg-skillColor text-center flex items-center justify-center rounded-[3.75rem]"
                            >
                               <p className='pl-2'>Lorem Ipsum skdjflksdjf skldjflkjfd </p> <CloseIcon sx={{ color: 'green'}}
                                            className="w-7 h-7 cursor-pointer p-1"/> 
                            </div>
                            

                            {!inputSkill && (
                                <button
                                    onClick={() => setInputSkill(true)}
                                    /* className="col-span-6 w-36 h-12 font-midRW text-midRS leading-midRL text-gradientFirst bg-skillColor text-center flex items-center justify-center rounded-[3.75rem]
                       sm:col-span-3 xl:col-span-2" */
                       className="w-36 h-12 font-midRW text-midRS leading-midRL text-gradientFirst bg-skillColor text-center flex items-center justify-center rounded-[3.75rem]
                       "
                                >
                                    <AddIcon sx={{ marginLeft: '-1rem' }} /> Add
                                </button>
                            )}
                            {inputSkill && (
                                <form
                                    className="col-span-6 min-w-[9rem] h-12 font-midRW text-midRS leading-midRL bg-skillColor text-center grid grid-cols-12 rounded-[3.75rem]
                       sm:col-span-3 xl:col-span-2"
                                    onSubmit={() => {
                                        setInputSkill(false);
                                    }}
                                >
                                    <input
                                        type="text"
                                        className="w-[80%] my-auto ml-[10%] h-[70%] col-span-10 border-[1px] border-gradientFirst focus:outline-none"
                                    />
                                    <button type="submit" className="col-span-2 text-gradientFirst">
                                        <AddIcon />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            {/* MODALS */}
            {openProfile && (
                <ConfirmModal isOpen={openProfile} handleClose={() => setOpenProfile(!openProfile)}>
                    <div className="mx-2 h-4/5 w-full pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-10 md:pt-8 md:h-2/3 md:pl-14 md:w-2/3 lg:w-1/2 md:mx-0">
                        <div className="col-span-12 order-1 grid grid-cols-12">
                            <div className="col-span-11">
                                <p className="font-thW text-frhS leading-shL pb-5 ">Social Links</p>
                                <form className="col-span-12 grid grid-cols-12" onSubmit={addSocialLink}>
                                    <div className="col-span-12 grid grid-cols-12 gap-2 h-[20rem] overflow-auto md:h-[18rem] lg:h-[18rem]">
                                        <div className="col-span-12 md:col-span-6">
                                            <p className="w-full font-fhW text-smS mt-0 mb-2 leading-shL">
                                                Phone
                                                <span className="float-right pr-5 text-fadedText text-numS">{call.length} / 10</span>
                                            </p>
                                            <input
                                                value={call}
                                                type="number"
                                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                                    if (e.currentTarget.value.length <= 10) {
                                                        setCall(e.currentTarget.value);
                                                    }
                                                }}
                                                placeholder="Enter Phone"
                                                className="border-[1px] w-full rounded-full h-12 pl-5 text-addS hideIncrease"
                                            />
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <p className="w-full font-fhW text-smS mt-0 mb-2 leading-shL">
                                                Address
                                                <span className="float-right pr-5 text-fadedText text-numS">{behan.length} / 200</span>
                                            </p>
                                            <input
                                                value={locate}
                                                required
                                                type="text"
                                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                                    if (e.currentTarget.value.length <= 50) {
                                                        setLocate(e.currentTarget.value);
                                                    }
                                                }}
                                                placeholder="Enter Address"
                                                className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                            />
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <p className="w-full font-fhW text-smS mt-0 mb-2 leading-shL">
                                                LinkedIn
                                                <span className="float-right pr-5 text-fadedText text-numS">{linked.length} / 200</span>
                                            </p>
                                            <input
                                                value={linked}
                                                required
                                                type="text"
                                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                                    if (e.currentTarget.value.length <= 200) {
                                                        setLinked(e.currentTarget.value);
                                                    }
                                                }}
                                                placeholder="LinkedIn Link"
                                                className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                            />
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <p className="w-full font-fhW text-smS mt-0 mb-2 leading-shL">
                                                Github
                                                <span className="float-right pr-5 text-fadedText text-numS">{githubLink.length} / 200</span>
                                            </p>
                                            <input
                                                value={githubLink}
                                                required
                                                type="text"
                                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                                    if (e.currentTarget.value.length <= 200) {
                                                        setGithubLink(e.currentTarget.value);
                                                    }
                                                }}
                                                placeholder="Github Link"
                                                className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                            />
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <p className="w-full font-fhW text-smS mt-0 mb-2 leading-shL">
                                                Behance
                                                <span className="float-right pr-5 text-fadedText text-numS">{behan.length} / 200</span>
                                            </p>
                                            <input
                                                value={behan}
                                                required
                                                type="text"
                                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                                    if (e.currentTarget.value.length <= 200) {
                                                        setBehan(e.currentTarget.value);
                                                    }
                                                }}
                                                placeholder="Behance Link"
                                                className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                            />
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <p className="w-full font-fhW text-smS mt-0 mb-2 leading-shL">
                                                Portfolio
                                                <span className="float-right pr-5 text-fadedText text-numS">{githubLink.length} / 200</span>
                                            </p>
                                            <input
                                                value={portfolio}
                                                required
                                                type="text"
                                                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                                    if (e.currentTarget.value.length <= 200) {
                                                        setPortfolio(e.currentTarget.value);
                                                    }
                                                }}
                                                placeholder="Portfolio Link"
                                                className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 flex items-center pr-3 mt-5 md:col-span-6 ">
                                        {success !== ' ' && success == 'success' && (
                                            <div className="text-green-800 fadedSuccess">Successfully Saved</div>
                                        )}
                                        {success && success == 'failed' && <div className="text-red-800 fadedSuccess">Not Saved</div>}
                                    </div>

                                    <div className="col-span-12 grid justify-items-end pr-3 mt-5 md:col-span-6">
                                        {loadings == true ? (
                                            <img
                                                src={loadingIn}
                                                className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                            />
                                        ) : (
                                            <button
                                                onClick={() => setSuccess('')}
                                                type="submit"
                                                className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                            >
                                                Save
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                            <div className="col-span-1 order-2 md:order-3 md:col-span-1">
                                <button onClick={() => setOpenProfile(!openProfile)}>
                                    <CloseIcon
                                        sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                        className="w-8 h-8 p-2 "
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </ConfirmModal>
            )}
            {openBio && (
                <ConfirmModal isOpen={openBio} handleClose={() => setOpenBio(!openBio)}>
                    <div className="mx-2 pb-10 w-full pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-10 md:pl-8 md:w-2/3 lg:w-1/2 md:mx-0">
                        <form className="col-span-12 grid grid-cols-12" onSubmit={handleBio}>
                            <div className="col-span-12 grid grid-cols-12">
                                <div className="col-span-12 grid grid-cols-12">
                                    <p className="font-thW text-frhS leading-shL text-modalTitle col-span-10 md:col-span-11">
                                        <PersonIcon sx={{ color: '#FE5E0A', fontSize: '2rem' }} /> Bio
                                    </p>
                                    <div className="col-span-2 md:col-span-1 grid pr-2 justify-items-end md:justify-items-center">
                                        <button onClick={() => setOpenBio(!openBio)}>
                                            <CloseIcon
                                                sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                                className="w-8 h-8 p-2 "
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div className="col-span-12 md:col-span-8 mt-5 pr-2 md:pl-10">
                                    <p className="font-fhW text-bigS leading-fhL text-modalTitle text-center md:text-left">
                                        Introduce yourself to the community.
                                    </p>
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">
                                        Headline
                                        <span className="float-right text-fadedText text-numS">
                                            {bioMaxCharacters - headline.length} / {bioMaxCharacters}
                                        </span>
                                    </p>

                                    <input
                                        value={headline}
                                        required
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                            if (e.currentTarget.value.length <= bioMaxCharacters) {
                                                setHeadline(e.currentTarget.value);
                                            }
                                        }}
                                        placeholder="Marketing Manager"
                                        className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                    />

                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">
                                        Description
                                        <span className="float-right text-fadedText text-numS">
                                            {bioDescMaxCharacters - description.length} / {bioDescMaxCharacters}
                                        </span>
                                    </p>
                                    <textarea
                                        value={description}
                                        required
                                        onChange={(e) => {
                                            if (e.currentTarget.value.length <= bioDescMaxCharacters) {
                                                setDescription(e.currentTarget.value);
                                            }
                                        }}
                                        placeholder="Describe yourself...."
                                        className="border-[1px] w-full rounded-xl resize-none pt-3 pl-5 h-36 text-addS"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="col-span-12 grid justify-items-end pr-3 mt-5 md:col-span-6">
                                {success && success == 'success' && <div className="text-green-800 fadedSuccess">Successfully Saved</div>}
                                {success && success == 'failed' && <div className="text-red-800 fadedSuccess">Not Saved</div>}
                            </div>
                            <div className="col-span-12 grid justify-items-end pr-3 mt-5 md:col-span-6">
                                {loadings == true ? (
                                    <img
                                        src={loadingIn}
                                        className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                    />
                                ) : (
                                    <button
                                        onClick={() => setSuccess('')}
                                        type="submit"
                                        className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                    >
                                        Save
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </ConfirmModal>
            )}
            {openCertificate && (
                <ConfirmModal
                    isOpen={openCertificate}
                    handleClose={() => {
                        setOpenCertificate(!openCertificate);
                    }}
                >
                    <div className="mx-2 pb-10 w-full pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-5 md:pl-8 md:w-2/3 lg:w-1/2 md:mx-0">
                        <div className="col-span-12 grid grid-cols-12 mt-5 sm:gap-y-5 xl:gap-y-2">
                            <div className="col-span-12 grid grid-cols-12 ">
                                <p className="font-thW text-frhS leading-shL text-modalTitle col-span-10 md:col-span-11">
                                    <WorkspacePremiumIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem' }} />
                                    Certificates
                                    <span className="float-right text-smS text-fadedText">
                                        {certificateArray.length} / {maximumCertificates}
                                    </span>
                                </p>
                                <div className="col-span-2 md:col-span-1 grid pr-2 justify-items-end md:justify-items-center">
                                    <button onClick={() => setOpenCertificate(!openCertificate)}>
                                        <CloseIcon
                                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                            className="w-8 h-8 p-2 "
                                        />
                                    </button>
                                </div>
                            </div>
                            {/*  <div className="col-span-12 xl:pl-8 mt-5">
                                <p className="text-dfhS font-fhW text-modalTitle leading-shL">Add a Certificate</p>
                            </div> */}
                        </div>
                        {editOneCertificate === true && (
                            <form onSubmit={editCertificate} className="col-span-11 grid grid-cols-12 xl:pl-8">
                                <div className="col-span-12 md:col-span-8 pr-2 md:pl-2">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Certificate Name</p>
                                    <input
                                        value={editedCertificate.name}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedCertificate({ ...editedCertificate, name: e.currentTarget.value })
                                        }
                                        placeholder="Add Certificate Name"
                                        className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-8 pr-2 md:pl-2">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Certificate Issued By</p>
                                    <input
                                        value={editedCertificate.issuedBy}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedCertificate({ ...editedCertificate, issuedBy: e.currentTarget.value })
                                        }
                                        placeholder="Certificate Issued By"
                                        className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-4 pr-2 md:pl-2">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Year Issued</p>
                                    <input
                                        value={editedCertificate.year}
                                        type="date"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                            const selectedDate = e.currentTarget.value;
                                            if (selectedDate <= new Date().toISOString().split('T')[0])
                                                setEditedCertificate({ ...editedCertificate, year: selectedDate });
                                        }}
                                        placeholder="Year Issued"
                                        className="border-[1px] w-full rounded-full h-12 pl-5 text-addS appearNone"
                                        max={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                <div className="col-span-12 grid justify-items-end pr-3 mt-5 md:col-span-6">
                                    {success && success == 'success' && (
                                        <div className="text-green-800 fadedSuccess">Successfully Saved</div>
                                    )}
                                    {success && success == 'failed' && <div className="text-red-800 fadedSuccess">Not Saved</div>}
                                </div>
                                <div className="col-span-12 grid justify-items-end pr-3 mt-5 md:col-span-6">
                                    {loadings == true ? (
                                        <img
                                            src={loadingIn}
                                            className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                        />
                                    ) : (
                                        <button
                                            /*                                             onClick={() => setSuccess('')}
                                             */ type="submit"
                                            className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                            </form>
                        )}
                        {!editOneCertificate && !displayCertificate && (
                            <div className="col-span-11 gap-4 grid grid-cols-12 mt-6 sm:max-md:gap-x-3 md:max-lg:gap-x-2 gap-y-4">
                                {certificateArray &&
                                    !editOneCertificate &&
                                    certificateArray.map((item, index) => (
                                        <div
                                            key={item.index}
                                            className="col-span-12 grid grid-cols-12 border-2 rounded-2xl p-5 sm:max-md:col-span-6 lg:col-span-6"
                                        >
                                            <div className="col-span-2">
                                                <WorkspacePremiumIcon sx={{ color: 'green' }} className="mt-2" />
                                            </div>
                                            <div className="col-span-9">
                                                <p className="font-dfvW text-dfvS leading-dfvL">{item.name}</p>
                                                <p className="font-fhW text-fhS leading-fhL text-lightGrey">{item.issuedBy}</p>
                                                <p className="text-smRs mt-2">
                                                    <CalendarTodayIcon sx={{ fontSize: '0.8rem', marginTop: '-0.3rem' }} />
                                                    <span className="text-fadedText ml-1">{item.year}</span>
                                                </p>
                                            </div>
                                            <div className="col-span-1">
                                                <EditIcon
                                                    onClick={() => {
                                                        setEditOneCertificate(true);
                                                        indexCertificate(index);
                                                    }}
                                                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                                    className="w-6 h-6 p-1.5 mr-2 cursor-pointer"
                                                />
                                                <DeleteIcon
                                                    onClick={() => {
                                                        setConfirmDelete(true);
                                                        setCertificateIndex(index);
                                                    }}
                                                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                                    className="w-6 h-6 p-1.5 mr-2 mt-5 cursor-pointer"
                                                />
                                            </div>
                                            {confirmDelete && certificateIndex == index && (
                                                <div className="col-span-12 border-2 p-2 border-red-800 rounded-2xl">
                                                    <p>Are you Sure you want to delete?</p>
                                                    <button
                                                        onClick={() => setConfirmDelete(false)}
                                                        className="mt-3 rounded-[20%] bg-lightGreen text-red-500 py-0.5 px-1"
                                                    >
                                                        No
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            deleteCertificate(index);
                                                            setConfirmDelete(false);
                                                        }}
                                                        className="bg-lightGreen rounded-[20%] text-green-800 py-0.5 px-1 ml-5"
                                                    >
                                                        Yes
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        )}
                        {(displayCertificate || certificateArray.length == 0) && (
                            <div className="col-span-11 gap-4 grid grid-cols-12 mt-6 sm:max-md:gap-x-3 md:max-lg:gap-x-2 gap-y-4">
                                <form onSubmit={addCertificate} className="col-span-11 grid grid-cols-12 xl:pl-8">
                                    <div className="col-span-12 md:col-span-8 pr-2 md:pl-2">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Certificate Name</p>
                                        <input
                                            value={certificateData.name}
                                            type="text"
                                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                setCertificateData({ ...certificateData, name: e.currentTarget.value })
                                            }
                                            placeholder="Add Certificate Name"
                                            className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-8 pr-2 md:pl-2">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Certificate Issued By</p>
                                        <input
                                            value={certificateData.issuedBy}
                                            type="text"
                                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                setCertificateData({ ...certificateData, issuedBy: e.currentTarget.value })
                                            }
                                            placeholder="Certificate Issued By"
                                            className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-4 pr-2 md:pl-2">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Year Issued</p>
                                        <input
                                            value={certificateData.year}
                                            type="date"
                                            onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                                const selectedDate = e.currentTarget.value;
                                                if (selectedDate <= new Date().toISOString().split('T')[0])
                                                    setCertificateData({ ...certificateData, year: selectedDate });
                                            }}
                                            placeholder="Year Issued"
                                            className="border-[1px] w-full rounded-full h-12 pl-5 text-addS appearNone"
                                            max={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                    <div className="col-span-12 grid justify-items-end pr-3 mt-5 md:col-span-6">
                                        {success && success == 'success' && (
                                            <div className="text-green-800 fadedSuccess">Certificate Successfully Added</div>
                                        )}
                                        {success && success == 'failed' && (
                                            <div className="text-red-800 fadedSuccess">Certificate Not Added</div>
                                        )}
                                    </div>
                                    <div className="col-span-12 grid justify-items-end pr-3 mt-5 md:col-span-6">
                                        {loadings == true ? (
                                            <img
                                                src={loadingIn}
                                                className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                            />
                                        ) : (
                                            <button
                                                type="submit"
                                                className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                            >
                                                Save
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        )}
                        {!displayCertificate && !editOneCertificate && (
                            <div className="col-span-12 flex justify-end pr-3 mt-5 sm:mt-10 gap-x-5 gap-y-5 sm:gap-y-0 xl:gap-x-0">
                                <button
                                    onClick={() => setDisplayCertificate(true)}
                                    className="ml-full text-textW bg-lightGreen text-green-700 h-16 w-full xl:w-56 rounded-full col-span-12 sm:col-span-6 xl:col-span-7"
                                >
                                    Add new
                                </button>
                            </div>
                        )}
                        {/*  <button className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full col-span-12 sm:col-span-6 xl:col-span-5">
                                Save
                            </button>
                         */}
                    </div>
                </ConfirmModal>
            )}
            {openWork && (
                <ConfirmModal isOpen={openWork} handleClose={() => setOpenWork(!openWork)}>
                    <div className="mx-2 pb-10 w-full pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-10 md:pl-8 md:w-2/3 lg:w-1/2 md:mx-0">
                        <div className="col-span-12 grid grid-cols-12 ">
                            <div className="col-span-12 grid grid-cols-12 mb-5">
                                <p className="font-thW text-frhS leading-shL text-modalTitle col-span-10 md:col-span-11">
                                    <BusinessCenterIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem' }} />
                                    Work History
                                </p>
                                <div className="col-span-2 md:col-span-1 grid pr-2 justify-items-end md:justify-items-center">
                                    <button onClick={() => setOpenWork(!openWork)}>
                                        <CloseIcon
                                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                            className="w-8 h-8 p-2 "
                                        />
                                    </button>
                                </div>
                            </div>
                            {workHistoryArray &&
                                !displayWorkHisotry &&
                                !workEdit &&
                                workHistoryArray.map((item, index) => (
                                    <div className="col-span-11 grid grid-cols-12 pb-5 md:mb-5 sm:max-md:gap-x-2 ">
                                        <div className="col-span-3 sm:col-span-2 flex items-center justify-center md:col-span-2 lg:col-span-2">
                                            <div className="w-16 h-16 bg-skillColor flex items-center justify-center rounded-[1rem]">
                                                <BusinessCenterOutlinedIcon
                                                    sx={{
                                                        color: '#FE5E0A',
                                                        height: '1.5rem'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 grid grid-cols-12 sm:col-span-7  lg:col-span-8 ">
                                            <p className="col-span-12 text-fhS font-fhW leading-fhL flex items-center md:text-shS md:font-smRW">
                                                {item.title}
                                            </p>
                                            <div className="font-bigW text-smRS leading-smL text-fadedText col-span-12 grid-cols-12 grid pt-2">
                                                <div className="col-span-12 xl:col-span-5">{item.companyName}</div>
                                                <div className="col-span-12 max-sm:text-[13px] xl:col-span-7">
                                                    <CalendarTodayIcon sx={{ marginRight: '0.5rem', fontSize: '0.9rem' }} />
                                                    {item.startDate} - {item.endDate}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-3 flex flex-col justify-end items-end gap-y-3  pr-1 md:col-span-2">
                                            <EditIcon
                                                onClick={() => {
                                                    editWork(index);
                                                    setWorkEdit(true);
                                                }}
                                                sx={{ color: '#1D8560', background: '#E5ECEC', borderRadius: '50%' }}
                                                className="w-7 h-7 p-1.5 cursor-pointer"
                                            />
                                            <DeleteIcon
                                                onClick={() => {
                                                    setConfirmDelete(true);
                                                    setWorkIndex(index);
                                                }}
                                                sx={{ color: '#1D8560', background: '#E5ECEC', borderRadius: '50%' }}
                                                className="w-7 h-7 p-1.5 cursor-pointer"
                                            />
                                        </div>
                                        {confirmDelete && workIndex == index && (
                                            <div className="mt-3 col-span-12 border-2 p-2 border-red-800 rounded-2xl flex">
                                                <p>Are you Sure you want to delete?</p>
                                                <button
                                                    onClick={() => setConfirmDelete(false)}
                                                    className="ml-3 rounded-[20%] bg-lightGreen text-red-500 py-0.5 px-1"
                                                >
                                                    No
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        deleteWorkHistory(index);
                                                        setConfirmDelete(false);
                                                    }}
                                                    className="bg-lightGreen rounded-[20%] text-green-800 py-0.5 px-1 ml-5"
                                                >
                                                    Yes
                                                </button>
                                            </div>
                                        )}
                                        <div className="col-span-12 ml-2 block h-0.5 bg-fadedText mt-2 md:h-[0.5px] md:ml-3"></div>
                                    </div>
                                ))}
                            {workEdit && (
                                <form className="col-span-11 grid grid-cols-12" onSubmit={editWorkHistory}>
                                    <div className="col-span-12 md:col-span-6 pr-2 md:pl-2">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Title</p>
                                        <input
                                            value={editedWork.title}
                                            type="text"
                                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                setEditedWork({ ...editedWork, title: e.currentTarget.value })
                                            }
                                            placeholder="Add Title"
                                            className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-6 pr-2 md:pl-2">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Company Name</p>
                                        <input
                                            value={editedWork.companyName}
                                            type="text"
                                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                setEditedWork({ ...editedWork, companyName: e.currentTarget.value })
                                            }
                                            placeholder="Add Company Name"
                                            className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-6 pr-2 md:pl-2">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Start Date</p>
                                        <input
                                            value={editedWork.startDate}
                                            type="date"
                                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                setEditedWork({ ...editedWork, startDate: e.currentTarget.value })
                                            }
                                            className="pr-3 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                        />
                                    </div>
                                    {editedWork.endDate && (
                                        <div className="col-span-12 md:col-span-6 pr-2 md:pl-2">
                                            <p className="font-fhW text-smS mt-5 mb-2 leading-shL">End Date</p>
                                            <input
                                                value={editedWork.endDate}
                                                type="date"
                                                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                    setEditedWork({ ...editedWork, endDate: e.currentTarget.value })
                                                }
                                                className="pr-3 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                            />
                                        </div>
                                    )}
                                    <div className="col-span-12 pr-2 md:pl-2">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Job Description</p>
                                        <ReactQuill
                                            className="h-28 text-addS"
                                            placeholder="Add Description"
                                            theme="snow"
                                            value={editedWork.jobDescription}
                                            onChange={(e) => setEditedWork({ ...editedWork, jobDescription: e })}
                                        />
                                    </div>
                                    <div className="col-span-12 flex justify-center pr-3 mt-16 md:col-span-6">
                                        {success && success == 'success' && (
                                            <div className="text-green-800 fadedSuccess">WorkHistory Added Successfully</div>
                                        )}
                                        {success && success == 'failed' && (
                                            <div className="text-red-800 fadedSuccess">Certificate Not Added</div>
                                        )}
                                    </div>
                                    <div className="col-span-12 grid justify-items-end pr-3 mt-10 md:mt-16 md:col-span-6">
                                        {loadings == true ? (
                                            <img
                                                src={loadingIn}
                                                className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                            />
                                        ) : (
                                            <button
                                                type="submit"
                                                className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                            >
                                                Save
                                            </button>
                                        )}
                                    </div>
                                </form>
                            )}
                            {(displayWorkHisotry || workHistoryArray.length == 0) && (
                                <form className="col-span-11 grid grid-cols-12" onSubmit={addWorkHistory}>
                                    <div className="col-span-12 md:col-span-6 pr-2 md:pl-2">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Title</p>
                                        <input
                                            value={workHistoryData.title}
                                            type="text"
                                            onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                                const inputValue = e.currentTarget.value;
                                                if (inputValue.length <= maxWorkHistoryTitle) {
                                                    setWorkHistoryData({ ...workHistoryData, title: inputValue });
                                                }
                                            }}
                                            placeholder="Add Title"
                                            className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-6 pr-2 md:pl-2">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Company Name</p>
                                        <input
                                            value={workHistoryData.companyName}
                                            type="text"
                                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                setWorkHistoryData({ ...workHistoryData, companyName: e.currentTarget.value })
                                            }
                                            placeholder="Add Company Name"
                                            className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                        />
                                    </div>
                                    <div className="col-span-12 pr-2 md:pl-2 flex items-center mt-3">
                                        <input
                                            type="checkbox"
                                            className="border-[1px] rounded-xl h-4 pl-5 text-addS"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                        <span className="font-fhW text-smS pl-2 leading-shL">I currently work here</span>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 pr-2 md:pl-2">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Start Date</p>
                                        <input
                                            value={workHistoryData.startDate}
                                            type="date"
                                            onChange={(e) => setWorkHistoryData({ ...workHistoryData, startDate: e.currentTarget.value })}
                                            className="pr-3 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                        />
                                    </div>

                                    {!isChecked && (
                                        <div className="col-span-12 md:col-span-6 pr-2 md:pl-2">
                                            <p className="font-fhW text-smS mt-5 mb-2 leading-shL">End Date</p>
                                            <input
                                                value={workHistoryData.endDate}
                                                type="date"
                                                onChange={(e) =>
                                                    isChecked
                                                        ? setWorkHistoryData({ ...workHistoryData, endDate: 'present' })
                                                        : setWorkHistoryData({ ...workHistoryData, endDate: e.currentTarget.value })
                                                }
                                                className="pr-3 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                            />
                                        </div>
                                    )}
                                    <div className="col-span-12 pr-2 md:pl-2">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Job Description</p>
                                        <ReactQuill
                                            className="h-28 text-addS"
                                            placeholder="Add Description"
                                            theme="snow"
                                            value={workHistoryData.jobDescription}
                                            onChange={(e) => setWorkHistoryData({ ...workHistoryData, jobDescription: e })}
                                        />
                                    </div>
                                    <div className="col-span-12 flex justify-center pr-3 mt-16 md:col-span-6">
                                        {success && success == 'success' && (
                                            <div className="text-green-800 fadedSuccess">WorkHistory Added Successfully</div>
                                        )}
                                        {success && success == 'failed' && (
                                            <div className="text-red-800 fadedSuccess">Certificate Not Added</div>
                                        )}
                                    </div>
                                    <div className="col-span-12 grid justify-items-end pr-3 mt-10 md:mt-16 md:col-span-6">
                                        {loadings == true ? (
                                            <img
                                                src={loadingIn}
                                                className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                            />
                                        ) : (
                                            <button
                                                type="submit"
                                                className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                            >
                                                Save
                                            </button>
                                        )}
                                    </div>
                                </form>
                            )}
                        </div>
                        {!displayWorkHisotry && !workEdit && workHistoryArray.length !== 0 && (
                            <div className="col-span-12 flex justify-end pr-3 mt-10 md:mt-5 xl:mt-0">
                                <button
                                    onClick={() => setDisplayWorkHistory(true)}
                                    className="text-green-700 bg-lightGreen h-16 w-full xl:w-56 rounded-full "
                                >
                                    Add Job
                                </button>
                            </div>
                        )}
                    </div>
                </ConfirmModal>
            )}
            {openEducation && (
                <ConfirmModal isOpen={openEducation} handleClose={() => setOpenEducation(!openEducation)}>
                    <div className="mx-2 pb-10 w-full pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-5 md:pl-8 md:w-2/3 lg:w-1/2 md:mx-0">
                        <div className="col-span-12 grid grid-cols-12 mt-5 sm:gap-y-5 xl:gap-y-2">
                            <div className="col-span-12 grid grid-cols-12 ">
                                <p className="font-thW text-frhS leading-shL text-modalTitle col-span-10 md:col-span-11">
                                    <SchoolOutlinedIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem' }} />
                                    Education
                                </p>
                                <div className="col-span-2 md:col-span-1 grid pr-2 justify-items-end md:justify-items-center">
                                    <button onClick={() => setOpenEducation(!openEducation)}>
                                        <CloseIcon
                                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                            className="w-8 h-8 p-2 "
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className="col-span-12 xl:pl-8 mt-5">
                                <p className="text-dfhS font-fhW text-modalTitle leading-shL">Add a Degree</p>
                            </div>
                        </div>
                        {!displayEducation && !EditEducation && (
                            <div className="col-span-11 gap-4 grid grid-cols-12 mt-6 sm:max-md:gap-x-3 md:max-lg:gap-x-2 gap-y-4">
                                {educationArray &&
                                    !EditEducation &&
                                    educationArray.map((item, index) => (
                                        <div key={index} className="col-span-11 grid grid-cols-12 pb-5 md:mb-5 sm:max-md:gap-x-2 ">
                                            <div className="col-span-3 sm:col-span-2 flex items-center justify-center md:col-span-2 lg:col-span-2">
                                                <div className="w-16 h-16 bg-skillColor flex items-center justify-center rounded-[1rem]">
                                                    <SchoolIcon
                                                        sx={{
                                                            color: '#FE5E0A',
                                                            height: '1.5rem'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 grid grid-cols-12 sm:col-span-7  lg:col-span-8 ">
                                                <p className="col-span-12 text-fhS font-fhW leading-fhL flex items-center md:text-shS md:font-smRW">
                                                    {item.educationLevel}
                                                </p>
                                                <div className="font-bigW text-smRS leading-smL text-fadedText col-span-12 grid-cols-12 grid pt-2">
                                                    <div className="col-span-12 xl:col-span-5">{item.fieldStudy}</div>
                                                    <div className="col-span-12 xl:col-span-5">{item.university}</div>
                                                    <div className="col-span-12 max-sm:text-[13px] xl:col-span-7">
                                                        <CalendarTodayIcon sx={{ marginRight: '0.5rem', fontSize: '0.9rem' }} />
                                                        {item.yearIssued}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-3 flex flex-col justify-end items-end gap-y-3  pr-1 md:col-span-2">
                                                <EditIcon
                                                    onClick={() => {
                                                        setEditEducation(true);
                                                        indexEducation(index);
                                                    }}
                                                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                                    className="w-6 h-6 p-1.5 mr-2 cursor-pointer"
                                                />
                                                <DeleteIcon
                                                    onClick={() => {
                                                        setConfirmDelete(true);
                                                        setEducationIndex(index);
                                                    }}
                                                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                                    className="w-6 h-6 p-1.5 mr-2 mt-5 cursor-pointer"
                                                />
                                            </div>
                                            {confirmDelete && educationIndex == index && (
                                                <div className="col-span-12 border-2 p-2 border-red-800 rounded-2xl flex gap-x-4">
                                                    <p>Are you Sure you want to delete?</p>
                                                    <button
                                                        onClick={() => setConfirmDelete(false)}
                                                        className="rounded-[20%] bg-lightGreen text-red-500 py-0.5 px-1"
                                                    >
                                                        No
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            deleteEducation(index);
                                                            setConfirmDelete(false);
                                                        }}
                                                        className="bg-lightGreen rounded-[20%] text-green-800 py-0.5 px-1"
                                                    >
                                                        Yes
                                                    </button>
                                                </div>
                                            )}
                                            <div className="col-span-12 ml-2 block h-0.5 bg-fadedText mt-2 md:h-[0.5px] md:ml-3"></div>
                                        </div>
                                    ))}
                            </div>
                        )}
                        {(displayEducation || educationArray.length == 0) && (
                            <form className="col-span-11 grid grid-cols-12 xl:pl-8" onSubmit={addEducation}>
                                <div className="col-span-12 md:col-span-7 pr-2 md:pl-2 cursor-pointer">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Level of Education</p>
                                    <div className="relative border-2 rounded-full" onClick={() => setSelected(!selected)}>
                                        <select
                                            className="w-full rounded-full appearance-none px-4 p-3"
                                            value={education.educationLevel}
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                                setEducation({ ...education, educationLevel: e.currentTarget.value })
                                            }
                                        >
                                            <option value="High School Diploma">High School Diploma</option>
                                            <option value="Vocational Training/Certificate">Vocational Training/Certificate</option>
                                            <option value="Associate Degrer">Associate Degrer</option>
                                            <option value="Bachelor's Degree">Bachelor's Degree</option>
                                            <option value="Postgraduate Certificate/Diploma">Postgraduate Certificate/Diploma</option>
                                            <option value="Master's Degree">Master's Degree</option>
                                            <option value="Professional Degree">Professional Degree</option>
                                            <option value="Doctorate (PhD)">Doctorate (PhD)</option>
                                            <option value="Post-Doctorate">Post-Doctorate</option>
                                        </select>
                                        <div className="absolute top-3 right-4">
                                            {selected ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-5 pr-2 md:pl-2">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Field of Study/Major</p>
                                    <input
                                        type="text"
                                        value={education.fieldStudy}
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEducation({ ...education, fieldStudy: e.currentTarget.value })
                                        }
                                        placeholder="Enter Field of Study/Major"
                                        className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-7 pr-2 md:pl-2">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">University / Institution</p>
                                    <input
                                        type="text"
                                        value={education.university}
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEducation({ ...education, university: e.currentTarget.value })
                                        }
                                        placeholder="Enter Your University / Institution"
                                        className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-5 pr-2 md:pl-2">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Graduation year</p>
                                    <input
                                        value={education.yearIssued}
                                        type="date"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEducation({ ...education, yearIssued: e.currentTarget.value })
                                        }
                                        placeholder="Year Issued"
                                        className="border-[1px] w-full rounded-full h-12 pl-5 text-addS appearNone"
                                    />
                                </div>
                                <div className="col-span-12 grid justify-items-end pr-3 mt-5 md:col-span-6">
                                    {success && success == 'success' && (
                                        <div className="text-green-800 fadedSuccess">Education Successfully Added</div>
                                    )}
                                    {success && success == 'failed' && <div className="text-red-800 fadedSuccess">Education Not Added</div>}
                                </div>
                                <div className="col-span-12 grid justify-items-end pr-3 mt-5 md:col-span-6">
                                    {loadings == true ? (
                                        <img
                                            src={loadingIn}
                                            className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                        />
                                    ) : (
                                        <button
                                            type="submit"
                                            className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                            </form>
                        )}
                        {!displayEducation && !EditEducation && educationArray.length !== 0 && (
                            <div className="col-span-12 flex justify-end pr-3 mt-5 sm:mt-10 gap-x-5 gap-y-5 sm:gap-y-0 xl:gap-x-0">
                                <button
                                    onClick={() => setDisplayEducation(true)}
                                    className="ml-full bg-lightGreen text-green-700 h-16 w-full xl:w-56 rounded-full col-span-12 sm:col-span-6 xl:col-span-7"
                                >
                                    Add new
                                </button>
                            </div>
                        )}
                        {EditEducation && (
                            <form className="col-span-11 grid grid-cols-12 xl:pl-8" onSubmit={editEducations}>
                                <div className="col-span-12 md:col-span-7 pr-2 md:pl-2 cursor-pointer">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Level of Education</p>
                                    <div className="relative border-2 rounded-full" onClick={() => setSelected(!selected)}>
                                        <select
                                            className="w-full rounded-full appearance-none px-4 p-3"
                                            value={EditedEducation.educationLevel}
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                                setEditedEducation({ ...EditedEducation, educationLevel: e.currentTarget.value })
                                            }
                                        >
                                            <option value="High School Diploma">High School Diploma</option>
                                            <option value="Vocational Training/Certificate">Vocational Training/Certificate</option>
                                            <option value="Associate Degrer">Associate Degrer</option>
                                            <option value="Bachelor's Degree">Bachelor's Degree</option>
                                            <option value="Postgraduate Certificate/Diploma">Postgraduate Certificate/Diploma</option>
                                            <option value="Master's Degree">Master's Degree</option>
                                            <option value="Professional Degree">Professional Degree</option>
                                            <option value="Doctorate (PhD)">Doctorate (PhD)</option>
                                            <option value="Post-Doctorate">Post-Doctorate</option>
                                        </select>
                                        <div className="absolute top-3 right-4">
                                            {selected ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-5 pr-2 md:pl-2">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Field of Study/Major</p>
                                    <input
                                        type="text"
                                        value={EditedEducation.fieldStudy}
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedEducation({ ...EditedEducation, fieldStudy: e.currentTarget.value })
                                        }
                                        placeholder="Enter Field of Study/Major"
                                        className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-7 pr-2 md:pl-2">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">University / Institution</p>
                                    <input
                                        type="text"
                                        value={EditedEducation.university}
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedEducation({ ...EditedEducation, university: e.currentTarget.value })
                                        }
                                        placeholder="Enter Your University / Institution"
                                        className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-5 pr-2 md:pl-2">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Graduation year</p>
                                    <input
                                        value={EditedEducation.yearIssued}
                                        type="date"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedEducation({ ...EditedEducation, yearIssued: e.currentTarget.value })
                                        }
                                        placeholder="Year Issued"
                                        className="border-[1px] w-full rounded-full h-12 pl-5 text-addS appearNone"
                                    />
                                </div>
                                <div className="col-span-12 grid justify-items-end pr-3 mt-5 md:col-span-6">
                                    {success && success == 'success' && (
                                        <div className="text-green-800 fadedSuccess">Education Saved Successfully</div>
                                    )}
                                    {success && success == 'failed' && <div className="text-red-800 fadedSuccess">Education Not Saved</div>}
                                </div>
                                <div className="col-span-12 grid justify-items-end pr-3 mt-5 md:col-span-6">
                                    {loadings == true ? (
                                        <img
                                            src={loadingIn}
                                            className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                        />
                                    ) : (
                                        <button
                                            type="submit"
                                            className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>
                </ConfirmModal>
            )}
            {openProject && (
                <ConfirmModal isOpen={openProject} handleClose={() => setOpenProject(!openProject)}>
                    <div className="mx-2 pb-10 w-full pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-10 md:pl-8 md:w-2/3 lg:w-1/2 md:mx-0">
                        <div className="col-span-12 grid grid-cols-12">
                            <div className="col-span-12 grid grid-cols-12">
                                <p className="font-thW text-frhS leading-shL text-modalTitle col-span-10 md:col-span-11">
                                    <AttachFileIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem', rotate: '40deg' }} /> Projects
                                </p>
                                <div className="col-span-2 md:col-span-1 grid pr-2 justify-items-end md:justify-items-center">
                                    <button onClick={() => setOpenProject(!openProject)}>
                                        <CloseIcon
                                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                            className="w-8 h-8 p-2 "
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {projectsArray.length == 0 && displayProject && (
                            <form className="col-span-12 grid grid-cols-12" onSubmit={addProject}>
                                <div className="col-span-12 md:col-span-6 pr-2 md:pl-10">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Project Name</p>

                                    <input
                                        value={projectData.name}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setProjectData({ ...projectData, name: e.currentTarget.value })
                                        }
                                        placeholder="Project Name"
                                        className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                    />

                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Description</p>
                                    <ReactQuill
                                        theme="snow"
                                        value={projectData.description}
                                        onChange={(e) => setProjectData({ ...projectData, description: e })}
                                        placeholder="Add description...."
                                        className="h-28 text-addS"
                                    />
                                </div>
                                <div className="col-span-6">
                                    <div>
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Project Thumbnail</p>
                                        <input
                                            type="file"
                                            onChange={(e) => {
                                                if (e.currentTarget.files) {
                                                    const fileList = Array.from(e.currentTarget.files);
                                                    const maxSize = 1 * 1024 * 1024;
                                                    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
                                                    const filteredFiles: any = fileList.filter((file) => {
                                                        if (file.size > maxSize) {
                                                            console.log(`File ${file.name} exceeds the maximum size limit.`);
                                                            return false;
                                                        }
                                                        const fileExtension = `.${file.name.split('.').pop()}`;
                                                        if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
                                                            console.log(`File ${file.name} has an invalid extension.`);
                                                            return false;
                                                        }

                                                        return setProjectFile(e.currentTarget.files);
                                                    });
                                                }
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Project Link</p>

                                        <input
                                            value={projectData.url}
                                            type="text"
                                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                setProjectData({ ...projectData, url: e.currentTarget.value })
                                            }
                                            placeholder="Project Link"
                                            className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 grid justify-items-end pr-3 mt-5 md:col-span-6">
                                    {success && success == 'success' && (
                                        <div className="text-green-800 fadedSuccess">Project Added Successfully</div>
                                    )}
                                    {success && success == 'failed' && <div className="text-red-800 fadedSuccess">Project Not Added</div>}
                                </div>
                                <div className="col-span-12 grid justify-items-end pr-3 mt-20 md:col-span-6">
                                    {loadings == true ? (
                                        <img
                                            src={loadingIn}
                                            className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                        />
                                    ) : (
                                        <button
                                            type="submit"
                                            className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                            </form>
                        )}

                        {projectEdit && (
                            <form className="col-span-12 grid grid-cols-12" onSubmit={editProject}>
                                <div className="col-span-12 md:col-span-6 pr-2 md:pl-10">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Project Name</p>

                                    <input
                                        value={editedProject.name}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedProject({ ...editedProject, name: e.currentTarget.value })
                                        }
                                        placeholder="Project Name"
                                        className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                    />

                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Description</p>
                                    <ReactQuill
                                        theme="snow"
                                        value={editedProject.description}
                                        onChange={(e) => setEditedProject({ ...editedProject, description: e })}
                                        placeholder="Add description...."
                                        className="h-28 text-addS"
                                    />
                                </div>
                                <div className="col-span-6">
                                    {/* <div>
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Project Thumbnail</p>
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            if (e.currentTarget.files) {
                                                const fileList = Array.from(e.currentTarget.files);
                                                const maxSize = 1 * 1024 * 1024;
                                                const allowedExtensions = ['.jpg', '.jpeg', '.png'];
                                                const filteredFiles: any = fileList.filter((file) => {
                                                    if (file.size > maxSize) {
                                                        console.log(`File ${file.name} exceeds the maximum size limit.`);
                                                        return false;
                                                    }
                                                    const fileExtension = `.${file.name.split('.').pop()}`;
                                                    if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
                                                        console.log(`File ${file.name} has an invalid extension.`);
                                                        return false;
                                                    }

                                                    return setProjectFile(e.currentTarget.files);
                                                });
                                            }
                                        }}
                                    />
                                </div> */}
                                    <div>
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Project Link</p>

                                        <input
                                            value={editedProject.url}
                                            type="text"
                                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                setEditedProject({ ...editedProject, url: e.currentTarget.value })
                                            }
                                            placeholder="Project Link"
                                            className="border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 grid justify-items-end pr-3 mt-5 md:col-span-6">
                                    {success && success == 'success' && (
                                        <div className="text-green-800 fadedSuccess">Project Added Successfully</div>
                                    )}
                                    {success && success == 'failed' && <div className="text-red-800 fadedSuccess">Project Not Added</div>}
                                </div>
                                <div className="col-span-12 grid justify-items-end pr-3 mt-20 md:col-span-6">
                                    {loadings == true ? (
                                        <img
                                            src={loadingIn}
                                            className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                        />
                                    ) : (
                                        <button
                                            type="submit"
                                            className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>
                </ConfirmModal>
            )}
        </div>
    );
};
export default Nav;
