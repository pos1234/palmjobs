import {
    userInformation,
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
    deleteWebsites
} from './services';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useUser } from './context';
export const MiddleWare = () => {
    const router = useRouter();
    const { loading, user, role } = useUser();
    const [headline, setHeadline] = useState('');
    const [description, setDescription] = useState('');
    const [skill, setSkill] = useState('');
    const [file, setFile] = useState<any>();
    const [projectFile, setProjectFile] = useState<any>();
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
    const [phone, setPhone] = useState('');
    const [call, setCall] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [webLink, setWebLink] = useState('');
    const [website, setWebsite] = useState('');
    const [employee, setEmployee] = useState('');
    const [nEmployee, setNemployee] = useState('');
    const [sectorValue, setSectorValue] = useState('');
    const [sector, setSector] = useState('');
    const [github, setGithub] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [resume, setResume] = useState<any>();
    const [resumeId, setResumeId] = useState('');
    const [inputResume, setInputResume] = useState(false);
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
        name: '',
        description: '',
        url: '',
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
    const [userRoles, setUserRoles] = useState('');
    useEffect(() => {
        const firstNameLetter = userInformation();
        firstNameLetter.then((response) => {
            const firstName = response.name;
            setFirstLetter(firstName.charAt(0));
        });
        const docId = userRoles == 'candidate' ? getCandidateDocumentId() : getEmployerDocumentId();
        const userRole = getRole();
        userRole.then((roles) => {
            setUserRoles(roles.documents[0].userRole);
        });
        docId.then((res: any) => {
            if (userRoles == 'candidate') {
                const certificate = convertToArray(res.documents[0].certificates) || [];
                const projects = convertToArray(res.documents[0].projects) || [];
                const workhistory = convertToArray(res.documents[0].workHistory) || [];
                const education = convertToArray(res.documents[0].educations) || [];
                setWorkHistoryArray(workhistory || '');
                setCertificateArray(certificate || '');
                setProjectsArray(projects || '');
                setEducationArray(education || '');
                setDocumentId(res.documents[0].$id || '');
                setHeadline(res.documents[0].bioHeadline || '');
                setDescription(res.documents[0].bioDescription || '');
                setArray(res.documents[0].skills || '');
                setProfilePictureId(res.documents[0].profilePictureId || '');
                setLinkedIn(res.documents[0].linkedIn || '');
                setPhone(res.documents[0].phoneNumber || '');
                setGithub(res.documents[0].github || '');
                setResumeId(res.documents[0].resumeId || '');
            }
            if (userRoles == 'employer') {
                // console.log(res.documents[0].$id);

                setDocumentId(res.documents[0].$id);
                setProfilePictureId(res.documents[0].profilePictureId || '');
                setPhone(res.documents[0].phoneNumber || '');
                setLocation(res.documents[0].location || '');
                setEmployee(res.documents[0].noOfEmployee || '');
                setSectorValue(res.documents[0].sector || '');
                setWebLink(res.documents[0].websiteLink || '');
            }
        });
        const { href } = getProfilePicture(profilePictureId);
        profilePictureId && setImage(href);
    }, [user]);

    const handleBio = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        const cleanedText = remove_linebreaks(description);
        const response = updateBio(headline, description, documentId);
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
    const uploadProfilePicture = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        const results = createImage(file[0]);
        results.then((res) => {
            console.log(res);
            const { href } = res && getProfilePicture(res.$id);
            console.log(href);
            href && setImage(href);
            updateProfileId(documentId, res.$id);
            setProfilePictureId(res.$id);
        });
    };
    const updateProfilePicture = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        console.log(profilePictureId);

        const results = deleteProfileImage(profilePictureId);
        results.then((rep) => console.log(rep));
        const resultProfile = createImage(file[0]);
        resultProfile.then((res) => {
            setProfilePictureId(res.$id);
            const response = updateProfileId(documentId, res.$id);
            try {
                const { href } = res && getProfilePicture(res.$id);
                console.log(href);
                href && setImage(href);
            } catch (e) {
                console.log(e);
            }
        });
    };
    const deleteProfilePicture = () => {
        const results = deleteProfileImage(profilePictureId);
        const response = updateProfileId(documentId, '');
        response.then((res) => {
            setImage('');
        });
    };
    const addCertificate = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        certificateArray.push(certificateData);
        console.log(certificateArray);

        const result = updateCertificates(convertToString(certificateArray), documentId);
        result.then((res: any) => {
            const certificate = JSON.parse(res.certificates);
            setCertificateArray(certificate);
            setCertificateData({
                name: '',
                issuedBy: '',
                year: ''
            });
        });
    };

    const editCertificate: any = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        certificateArray[certificateIndex] = editedCertificate;
        updateCertificates(convertToString(certificateArray), documentId);
        setCertificateEdit(false);
    };
    const deleteCertificate: any = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        certificateArray.splice(workIndex, 1);
        updateCertificates(convertToString(certificateArray), documentId);
        setCertificateEdit(false);
    };
    const updatedProjectData = (projectData: any, thumbnailId: any) => {
        const updatedProjectData = {
            ...projectData,
            thumbnailId
        };
        return updatedProjectData;
    };
    const addProject = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (projectFile) {
            const resultProfile = createImage(projectFile[0]);
            resultProfile.then((res) => {
                const { href } = res && getProfilePicture(res.$id);
                const toDate = updatedProjectData(projectData, res.$id);
                projectsArray.push(toDate);
                const result = updateProjects(convertToString(projectsArray), documentId);
                result.then((res: any) => {
                    const project = JSON.parse(res.projects);
                    setProjectsArray(project);
                    setProjectData({
                        name: '',
                        description: '',
                        url: '',
                        thumbnailId: ''
                    });
                    setProjectFile(null);
                });
            });
        } else {
            projectsArray.push(projectData);
            const result = updateProjects(convertToString(projectsArray), documentId);
            result.then((res: any) => {
                const project = JSON.parse(res.projects);
                setProjectsArray(project);
                setProjectData({
                    name: '',
                    description: '',
                    url: '',
                    thumbnailId: ''
                });
            });
        }
    };

    const editProject: any = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        projectsArray[projectIndex] = editedProject;
        updateProjects(convertToString(projectsArray), documentId);
        setProjectEdit(false);
    };
    const deleteProject: any = (e: React.FormEvent<HTMLElement>) => {
        projectsArray.splice(projectIndex, 1);
        updateProjects(convertToString(projectsArray), documentId);
        setProjectEdit(false);
    };
    const addWorkHistory: any = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        workHistoryArray.push(workHistoryData);
        console.log(workHistoryArray);

        const result = updateWorkHistory(convertToString(workHistoryArray), documentId);
        result.then((res: any) => {
            const work = JSON.parse(res.workHistory);
            console.log(work);

            setWorkHistoryArray(work);
            setWorkHistoryData({
                title: '',
                companyName: '',
                startDate: '',
                endDate: '',
                jobDescription: ''
            });
        });
    };
    const editWorkHistory: any = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        workHistoryArray[workIndex] = editedWork;
        updateWorkHistory(convertToString(workHistoryArray), documentId);
        setWorkEdit(false);
    };
    const deleteWorkHistory: any = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        workHistoryArray.splice(workIndex, 1);
        updateWorkHistory(convertToString(workHistoryArray), documentId);
        setWorkEdit(false);
    };

    const addEducation: any = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        educationArray.push(education);
        const result = updateEducation(convertToString(educationArray), documentId);
        result.then((res: any) => {
            const educate = JSON.parse(res.educations);
            setEducationArray(educate);
            setEducation({
                educationLevel: '',
                fieldStudy: '',
                university: '',
                yearIssued: ''
            });
        });
    };
    const editEducations: any = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        educationArray[educationIndex] = EditedEducation;
        updateEducation(convertToString(educationArray), documentId);
        setEditEducation(false);
    };
    const deleteEducation: any = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        educationArray.splice(educationIndex, 1);
        updateEducation(convertToString(educationArray), documentId);
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
    const addLinkedIn = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        const updateLink = addLinkedInLink(linked, documentId);
        updateLink &&
            updateLink.then((res) => {
                router.reload();
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
    const addResume = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (resume) {
            const resultResume = uploadResume(resume[0]);
            resultResume.then((res) => {
                updateResumeId(res.$id, documentId);
                setInputResume(false);
            });
        }
    };
    return {
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
        uploadProfilePicture,
        updateProfilePicture,
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
        addResume,
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
        deleteWeb
    };
};
