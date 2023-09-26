import {
    addSocials,
    getCandidateDocumentId,
    updateBio,
    updateSkills,
    createImage,
    updateProfileId,
    getProfilePicture,
    updateCertificates,
    updateWorkHistory,
    deleteProfileImage,
    updateEducation,
    updateProjects,
    uploadResume,
    updateUserName,
    accountData,
    addLinkedInLink,
    deleteLinkedInLink,
    deleteGithubLink,
    addGithubLink,
    updateResumeId,
    addPhoneNumber,
    deletePhoneNumber,
    getRole,
    getEmployerDocumentId,
    addLocation,
    deleteLocation,
    deleteEmployee,
    addEmployee,
    addSector,
    deleteSector,
    addWebsites,
    deleteWebsites,
    addBehance,
    deleteBehance,
    addPortfolio,
    deletePortfolio,
    updateSupportDocId,
    uploadSupportDoc,
    deleteResume,
    deleteSupportDoc,
    insertCoverLetter,
    getAccount,
    addAddressPhone
} from './services';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useUser } from './context';
import { toast } from 'react-toastify';
export const MiddleWare = () => {
    const router = useRouter();
    const { loading, user, role } = useUser();
    const [headline, setHeadline] = useState('');
    const [description, setDescription] = useState('');
    const [skill, setSkill] = useState('');
    const [file, setFile] = useState<any>();
    const [projectFile, setProjectFile] = useState<File | null>(null);
    const [profilePictureId, setProfilePictureId] = useState('');
    const [firstLetter, setFirstLetter] = useState('');
    const [array, setArray] = useState<string[]>([]);
    const [certificateArray, setCertificateArray] = useState<any[]>([]);
    const [projectsArray, setProjectsArray] = useState<any[]>([]);
    const [workHistoryArray, setWorkHistoryArray] = useState<any[]>([]);
    const [educationArray, setEducationArray] = useState<any[]>([]);
    const [documentId, setDocumentId] = useState('');
    const [image, setImage] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [workIndex, setWorkIndex] = useState(Number);
    const [workEdit, setWorkEdit] = useState(false);
    const [projectIndex, setProjectIndex] = useState(Number);
    const [projectEdit, setProjectEdit] = useState(false);
    const [certificateIndex, setCertificateIndex] = useState(Number);
    const [certificateEdit, setCertificateEdit] = useState(false);
    const [educationIndex, setEducationIndex] = useState(Number);
    const [EditEducation, setEditEducation] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editName, setEditName] = useState(false);
    const [linkedIn, setLinkedIn] = useState('');
    const [linked, setLinked] = useState('');
    const [behance, setBehance] = useState('');
    const [behan, setBehan] = useState('');
    const [portfolio, setPortfolio] = useState('');
    const [portf, setPortf] = useState('');
    const [phone, setPhone] = useState('');
    const [call, setCall] = useState('');
    const [location, setLocation] = useState('');
    /*     const [success, setSuccess] = useState('');
     */ const [loadings, setLoadings] = useState(false);
    const [address, setAddress] = useState('');
    const [webLink, setWebLink] = useState('');
    const [website, setWebsite] = useState('');
    const [locate, setLocate] = useState('');
    const [employee, setEmployee] = useState('');
    const [nEmployee, setNemployee] = useState('');
    const [sectorValue, setSectorValue] = useState('');
    const [sector, setSector] = useState('');
    const [github, setGithub] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [resume, setResume] = useState<any>();
    const [resumeId, setResumeId] = useState('');
    const [supportDocument, setSupportDocument] = useState<any>();
    const [supportDocumentId, setSupportDocumentId] = useState('');
    const [inputResume, setInputResume] = useState(false);
    const [inputSupportDoc, setInputSupportDoc] = useState(false);
    const [coverLetter, setCoverLetter] = useState('');
    const [openProjectModal, setOpenProjectModal] = useState(false);
    const [education, setEducation] = useState({
        educationLevel: '',
        fieldStudy: '',
        university: '',
        yearIssued: ''
    });
    const [EditedEducation, setEditedEducation] = useState({
        educationLevel: '',
        fieldStudy: '',
        university: '',
        yearIssued: ''
    });
    const [projectData, setProjectData] = useState({
        name: '',
        description: '',
        url: '',
        thumbnailId: ''
    });
    const [editedProject, setEditedProject] = useState({
        projectName: '',
        detail: '',
        link: '',
        thumbnailId: ''
    });
    const [certificateData, setCertificateData] = useState({
        name: '',
        issuedBy: '',
        year: ''
    });
    const [editedCertificate, setEditedCertificate] = useState({
        name: '',
        issuedBy: '',
        year: ''
    });
    const [workHistoryData, setWorkHistoryData] = useState({
        title: '',
        companyName: '',
        startDate: '',
        endDate: '',
        jobDescription: ''
    });
    const [editedWork, setEditedWork] = useState({
        title: '',
        companyName: '',
        startDate: '',
        endDate: '',
        jobDescription: ''
    });
    const remove_linebreaks = (str: string) => {
        return str.replace(/[\r\n]+/gm, ' ');
    };
    const convertToString = (str: any) => {
        return JSON.stringify(str);
    };
    const convertToArray = (str: any) => {
        if (str != '') return JSON.parse(str);
        else return '';
    };

    const getDatas = async () => {
        /* const usersRole = await assignRole();
         console.log(usersRole); */
        const userId = await getAccount();
        if (userId !== 'failed') {
            setFirstLetter(userId.name.charAt(0));
            const userRole = await getRole(userId.$id);
            if (userRole) {
                if (userRole.documents[0].userRole == 'candidate') {
                    const docId = await getCandidateDocumentId(userId.$id);
                    const certificate = convertToArray(docId.documents[0].certificates) || [];
                    const projects = convertToArray(docId.documents[0].projects) || [];
                    const workhistory = convertToArray(docId.documents[0].workHistory) || [];
                    const education = convertToArray(docId.documents[0].educations) || [];
                    setWorkHistoryArray(workhistory || '');
                    setCertificateArray(certificate || '');
                    setProjectsArray(projects || '');
                    setEducationArray(education || '');
                    setDocumentId(docId.documents[0].$id || '');
                    setHeadline(docId.documents[0].bioHeadline || '');
                    setDescription(docId.documents[0].bioDescription || '');
                    setArray(docId.documents[0].skills || '');
                    setProfilePictureId(docId.documents[0].profilePictureId || '');
                    setLinked(docId.documents[0].linkedIn || '');
                    setBehan(docId.documents[0].behance || '');
                    setPortfolio(docId.documents[0].protfolio || '');
                    setCall(docId.documents[0].phoneNumber || '');
                    setLocate(docId.documents[0].address || '');
                    setGithubLink(docId.documents[0].github || '');
                    setSupportDocumentId(docId.documents[0].supportingDocumentId || '');
                    setCoverLetter(docId.documents[0].coverLetter || '');
                    setResumeId(docId.documents[0].resumeId || '');
                }
                if (userRole.documents[0].userRole == 'employer') {
                    const docId = await getEmployerDocumentId(userId.$id);
                    setDocumentId(docId.documents[0].$id);
                    setProfilePictureId(docId.documents[0].profilePictureId || '');
                    setPhone(docId.documents[0].phoneNumber || '');
                    setLocation(docId.documents[0].location || '');
                    setEmployee(docId.documents[0].noOfEmployee || '');
                    setSectorValue(docId.documents[0].sector || '');
                    setWebLink(docId.documents[0].websiteLink || '');
                }
            }
        }
    };
    useEffect(() => {
        getDatas();
        const { href } = getProfilePicture(profilePictureId);
        profilePictureId && setImage(href);
    }, [user]);
    useEffect(() => {
        const { href } = getProfilePicture(profilePictureId);
        profilePictureId && setImage(href);
    }, [profilePictureId]);

    const handleBio = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setLoadings(true);
        const cleanedText = remove_linebreaks(description);
        const response = updateBio(headline, description, documentId);
        response
            .then((res) => {
                setLoadings(false);
                toast.success('Successfully Saved');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Bio Not Saved');
                setLoadings(false);
            });
    };

    /*  const addSkills = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        array.push(skill);
        setSkill('');
        updateSkills(array, documentId);
    }; */
    const addSuggestedSkill = async (suggesteSkill: string) => {
        array.push(suggesteSkill);
        setSkill('');
        await updateSkills(array, documentId);
    };
    const deleteSkill = (index: number) => {
        const newArray = array.filter((item, i) => i !== index);
        setArray(newArray);
        updateSkills(newArray, documentId);
    };
    const handleCoverLetter = () => {
        insertCoverLetter(documentId, coverLetter);
    };
    const uploadProfilePictures = (file: any) => {
        const resultProfile = createImage(file);
        resultProfile.then((res: any) => {
            console.log(res);

            setProfilePictureId(res.$id);
            const response = updateProfileId(documentId, res.$id);

            const { href } = res && getProfilePicture(res.$id);
            console.log(href);
            href && setImage(href);
        });
    };
    const updateProfilePictures = (file: any) => {
        const results = deleteProfileImage(profilePictureId);
        const resultProfile = createImage(file);
        resultProfile.then((res: any) => {
            setProfilePictureId(res.$id);
            const response = updateProfileId(documentId, res.$id);
            const { href } = res && getProfilePicture(res.$id);
            href && setImage(href);
        });
    };

    const deleteProfilePicture = () => {
        const results = deleteProfileImage(profilePictureId);
        const response = results.then(() => updateProfileId(documentId, ''));
        response.then((res) => {
            setImage('');
        });
    };
    const addCertificate = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        certificateArray.push(certificateData);
        setLoadings(true);
        const result = updateCertificates(convertToString(certificateArray), documentId);
        result
            .then((res: any) => {
                setLoadings(false);
                toast.success('Successfully Added Certificate');

                const certificate = JSON.parse(res.certificates);
                setCertificateArray(certificate);
                setCertificateData({
                    name: '',
                    issuedBy: '',
                    year: ''
                });
            })
            .catch((error) => {
                console.log(error);
                toast.error('Certificate Not Added');
                setLoadings(false);
            });
    };
    const editCertificate: any = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setLoadings(true);
        certificateArray[certificateIndex] = editedCertificate;
        const response = updateCertificates(convertToString(certificateArray), documentId);
        response
            .then((res) => {
                setLoadings(false);
                toast.success('Certificate Saved Successfully');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Certificate Not Saved ');
                setLoadings(false);
            });
        /* setCertificateEdit(false); */
    };
    const deleteCertificate: any = (index: number) => {
        /*         e.preventDefault();
         */ certificateArray.splice(index, 1);
        const result = updateCertificates(convertToString(certificateArray), documentId);
        result
            .then((res) => {
                toast.success('Successfully Deleted Certificate');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Certificate Not Deleted');
            });
        setCertificateEdit(false);
    };

    const addProject = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setLoadings(true);
        if (projectFile) {
            const { $id } = await createImage(projectFile);
            const result = updateProjects(projectData.name, projectData.url, projectData.description, $id, documentId);
            result
                .then((res: any) => {
                    setLoadings(false);
                    setOpenProjectModal(false);
                    toast.success('Project Added Successfully');
                    const project = JSON.parse(res.projects);
                    setProjectsArray(project);
                    setProjectData({
                        name: '',
                        description: '',
                        url: '',
                        thumbnailId: ''
                    });
                    setProjectFile(null);
                })
                .catch((error: any) => {
                    console.log(error);
                    toast.error('Project Not Added');
                    setLoadings(false);
                });
        }
        if (!projectFile) {
            const result = updateProjects(projectData.name, projectData.url, projectData.description, '', documentId);
            result
                .then((res: any) => {
                    setLoadings(false);
                    setOpenProjectModal(false);
                    console.log('hey');

                    toast.success('Project Added Successfully');
                    const project = JSON.parse(res.projects);
                    setProjectsArray(project);
                    setProjectData({
                        name: '',
                        description: '',
                        url: '',
                        thumbnailId: ''
                    });
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Project Not Added');
                    setLoadings(false);
                });
        }
    };
    const editProject: any = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setLoadings(true);
        updateProjects(editedProject.projectName, editedProject.link, editedProject.detail, editedProject.thumbnailId, documentId)
            .then((res) => {
                setLoadings(false);
                projectsArray.pop();
                projectsArray.push(editedProject);
                toast.success('Successfully Saved Project');
            })

            .catch((error) => {
                toast.error('Project Not Saved');
                setLoadings(false);
            });
    };
    const deleteProject = () => {
        updateProjects('', '', '', '', documentId)
            .then((res) => {
                setProjectsArray([]);
                toast.success('Successfully Removed Project');
            })

            .catch((error) => {
                toast.error('Project Not Removed');
            });
        /*         setProjectEdit(false);
         */
    };
    const addWorkHistory: any = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setLoadings(true);
        workHistoryArray.push(workHistoryData);
        const result = updateWorkHistory(convertToString(workHistoryArray), documentId);
        result
            .then((res: any) => {
                setLoadings(false);
                setWorkHistoryData({
                    title: '',
                    companyName: '',
                    startDate: '',
                    endDate: '',
                    jobDescription: ''
                });
                toast.success('Work Hitory Added Successfully');
                const work = JSON.parse(res.workHistory);
                setWorkHistoryArray(work);
            })
            .catch((error) => {
                console.log(error);
                toast.error('Work Hitory Not Added');
                setLoadings(false);
            });
    };
    const editWorkHistory: any = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setLoadings(true);
        workHistoryArray[workIndex] = editedWork;
        const response = updateWorkHistory(convertToString(workHistoryArray), documentId);
        response
            .then((res) => {
                setLoadings(false);
                toast.success('Work Hitory Saved Successfully');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Work Hitory Not Saved');
                setLoadings(false);
            });
        /*         setWorkEdit(false);
         */
    };
    const deleteWorkHistory: any = (index: number) => {
        /*         e.preventDefault();
         */ workHistoryArray.splice(index, 1);
        updateWorkHistory(convertToString(workHistoryArray), documentId);
        setWorkEdit(false);
    };

    const addEducation: any = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        educationArray.push(education);
        setLoadings(true);
        const result = updateEducation(convertToString(educationArray), documentId);
        result
            .then((res: any) => {
                setLoadings(false);
                toast.success('Education Added Successfully');
                const educate = JSON.parse(res.educations);
                setEducationArray(educate);
                setEducation({
                    educationLevel: '',
                    fieldStudy: '',
                    university: '',
                    yearIssued: ''
                });
            })
            .catch((error) => {
                console.log(error);
                toast.error('Education Not Added');
                setLoadings(false);
            });
    };
    const editEducations: any = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setLoadings(true);
        educationArray[educationIndex] = EditedEducation;
        const result = updateEducation(convertToString(educationArray), documentId);
        result
            .then((res: any) => {
                setLoadings(false);
                toast.success('Education Saved Successfully');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Education Not Saved');
                setLoadings(false);
            });
        /* setEditEducation(false); */
    };
    const deleteEducation = (index: number) => {
        educationArray.splice(index, 1);
        updateEducation(convertToString(educationArray), documentId)
            .then((res) => {
                toast.success('Successfully Removed Education');
            })
            .catch((error) => {
                toast.error('Education Not Removed');
            });
        setEditEducation(false);
    };
    const changeUserName = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setEditName(false);
        const updatedName = updateUserName(editedName);
        updatedName.then((res) => {
            router.reload();
        });
    };
    const addBehan = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        const updateLink = addBehance(behan, documentId);
        updateLink &&
            updateLink.then((res) => {
                router.reload();
            });
    };
    const deleteBehan = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        const updateLink = deleteBehance(documentId);
        updateLink &&
            updateLink.then((res) => {
                router.reload();
            });
    };
    const addPortf = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        const updateLink = addPortfolio(portf, documentId);
        updateLink &&
            updateLink.then((res) => {
                router.reload();
            });
    };
    const deletePortf = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        const updateLink = deletePortfolio(documentId);
        updateLink &&
            updateLink.then((res) => {
                router.reload();
            });
    };
    const addLinkedIn = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        const updateLink = addLinkedInLink(linked, documentId);
        updateLink &&
            updateLink.then((res) => {
                router.reload();
            });
    };
    const addPhoneAddress = () => {
        const updateLink = addAddressPhone(call, locate, documentId);
        updateLink
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const addSocialLink = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setLoadings(true);
        const updateLink = addSocials(linked, githubLink, behan, portfolio, documentId);

        updateLink
            .then((res) => {
                setLoadings(false);
                toast.success('Saved Successfully');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Not Saved Successfully');
                setLoadings(false);
            });
    };
    const deleteLinkedIn = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        const updateLink = deleteLinkedInLink(documentId);
        updateLink &&
            updateLink.then((res) => {
                router.reload();
            });
    };
    const addNewSector = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        const updateLink = addSector(sector, documentId);
        updateLink &&
            updateLink.then((res) => {
                router.reload();
            });
    };
    const deleteNewSector = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        const updateLink = deleteSector(documentId);
        updateLink &&
            updateLink.then((res) => {
                router.reload();
            });
    };
    const addNEmployee = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        const updateLink = addEmployee(nEmployee, documentId);
        updateLink &&
            updateLink.then((res) => {
                router.reload();
            });
    };
    const deleteNemployee = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        const updateLink = deleteEmployee(documentId);
        updateLink &&
            updateLink.then((res) => {
                router.reload();
            });
    };
    const addAddress = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        const updateLink = addLocation(address, documentId);
        updateLink &&
            updateLink.then((res) => {
                router.reload();
            });
    };
    const deleteAddress = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        const updateLink = deleteLocation(documentId);
        updateLink &&
            updateLink.then((res) => {
                router.reload();
            });
    };
    const addWeb = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        const updateLink = addWebsites(website, documentId);
        updateLink &&
            updateLink.then((res) => {
                router.reload();
            });
    };
    const deleteWeb = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        const updateLink = deleteWebsites(documentId);
        updateLink &&
            updateLink.then((res) => {
                router.reload();
            });
    };
    const addPhone = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        const updateLink = addPhoneNumber(call, documentId);
        updateLink &&
            updateLink.then((res) => {
                router.reload();
            });
    };
    const deletePhone = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        const updateLink = deletePhoneNumber(documentId);
        updateLink &&
            updateLink.then((res) => {
                router.reload();
            });
    };
    const addGithub = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        const updateLink = addGithubLink(githubLink, documentId);
        updateLink &&
            updateLink.then((res) => {
                router.reload();
            });
    };

    const deleteGithub = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        const updateLink = deleteGithubLink(documentId);
        updateLink &&
            updateLink.then((res) => {
                router.reload();
            });
    };
    const addResume = (file: any) => {
        const resultResume = uploadResume(file);
        resultResume
            .then((res: any) => {
                setResumeId(res.$id);
                const response = updateResumeId(documentId, res.$id);
                response
                    .then((rem) => {
                        toast.success('Resume Added Successfully');
                    })
                    .catch((error) => {
                        toast.error('Resume Not Added');
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const updateResume = (file: any) => {
        const results = deleteResume(resumeId);
        console.log(resumeId);

        const resultResume = uploadResume(file);
        resultResume
            .then((res: any) => {
                setResumeId(res.$id);
                const response = updateResumeId(documentId, res.$id);
                response
                    .then((rem) => {
                        toast.success('Replaced Successfully');
                    })
                    .catch((error) => {
                        toast.error('Resume Not Replaced');
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const addSupportDocument = (file: any) => {
        const resultResume = uploadResume(file);
        resultResume.then((res: any) => {
            const response = updateSupportDocId(documentId, res.$id);
        });
    };
    const updateSupportDoc = (file: any) => {
        const results = deleteSupportDoc(supportDocumentId);
        console.log(resumeId);
        const resultResume = uploadResume(file);
        resultResume.then((res: any) => {
            setSupportDocumentId(res.$id);
            const response = updateSupportDocId(documentId, res.$id);
        });
    };
    /*   const addSupportDocument = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (supportDocument) {
            const resultResume = uploadSupportDoc(supportDocument[0]);
            resultResume.then((res) => {
                updateSupportDocId(res.$id, documentId);
                setInputSupportDoc(false);
                console.log(res);
            });
        }
    }; */
    return {
        addPhoneAddress,
        locate,
        setLocate,
        openProjectModal,
        setOpenProjectModal,
        /* success,
        setSuccess, */
        loadings,
        setLoadings,
        addSocialLink,
        updateSupportDoc,
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
        profilePictureId,
        setProfilePictureId,
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
        uploadProfilePictures,
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
        editedName,
        setEditedName,
        changeUserName,
        editName,
        setEditName,
        github,
        githubLink,
        setGithubLink,
        setGithub,
        linkedIn,
        linked,
        setLinked,
        setLinkedIn,
        addLinkedIn,
        deleteLinkedIn,
        phone,
        call,
        setCall,
        setPhone,
        addPhone,
        deletePhone,
        addGithub,
        deleteGithub,
        addSupportDocument,
        supportDocument,
        setSupportDocument,
        supportDocumentId,
        inputSupportDoc,
        setInputSupportDoc,
        addResume,
        updateResume,
        resume,
        setResume,
        resumeId,
        inputResume,
        setInputResume,
        address,
        setAddress,
        location,
        setLocation,
        addAddress,
        deleteAddress,
        employee,
        setEmployee,
        nEmployee,
        setNemployee,
        addNEmployee,
        deleteNemployee,
        sectorValue,
        setSectorValue,
        sector,
        setSector,
        addNewSector,
        deleteNewSector,
        website,
        setWebsite,
        webLink,
        setWebLink,
        addWeb,
        deleteWeb,
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
        updateProfilePictures,
        coverLetter,
        setCoverLetter,
        handleCoverLetter
    };
};


