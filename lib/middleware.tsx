import {
    userInformation,
    getCandidateDocumentId,
    updateBio,
    updateSkills,
    createProfilePicture,
    updateProfileId,
    getProfilePicture,
    updateCertificates,
    updateWorkHistory,
    deleteProfileImage,
    updateEducation
} from './services';
import { useState, useEffect } from 'react';
import { useUser } from './context';
export const MiddleWare = () => {
    const { loading, user, role } = useUser();
    const [headline, setHeadline] = useState('');
    const [description, setDescription] = useState('');
    const [skill, setSkill] = useState('');
    const [file, setFile] = useState<any>();
    const [profilePictureId, setProfilePictureId] = useState('');
    const [firstLetter, setFirstLetter] = useState('');
    const [array, setArray] = useState<string[]>([]);
    const [certificateArray, setCertificateArray] = useState<any[]>([]);
    const [workHistoryArray, setWorkHistoryArray] = useState<any[]>([]);
    const [educationArray, setEducationArray] = useState<any[]>([]);
    const [documentId, setDocumentId] = useState('');
    const [image, setImage] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [workIndex, setWorkIndex] = useState(Number);
    const [workEdit, setWorkEdit] = useState(false);
    const [certificateIndex, setCertificateIndex] = useState(Number);
    const [certificateEdit, setCertificateEdit] = useState(false);
    const [educationIndex, setEducationIndex] = useState(Number);
    const [EditEducation, setEditEducation] = useState(false);
    const [education, setEducation] = useState({
        degree: '',
        school: '',
        graduationYear: ''
    });
    const [EditedEducation, setEditedEducation] = useState({
        degree: '',
        school: '',
        graduationYear: ''
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
        return JSON.parse(str);
    };
    useEffect(() => {
        const firstNameLetter = userInformation();
        firstNameLetter.then((response) => {
            const firstName = response.name;
            setFirstLetter(firstName.charAt(0));
        });
        const documentId = getCandidateDocumentId();
        documentId.then((res: any) => {
            const certificate = JSON.parse(res.documents[0].certificates) || [];
            const workhistory = JSON.parse(res.documents[0].workHistory) || [];
            const education = JSON.parse(res.documents[0].educations) || [];
            setWorkHistoryArray(workhistory);
            setCertificateArray(certificate);
            setEducationArray(education);
            setDocumentId(res.documents[0].$id);
            setHeadline(res.documents[0].bioHeadline);
            setDescription(res.documents[0].bioDescription);
            setArray(res.documents[0].skills);
            setProfilePictureId(res.documents[0].profilePictureId);
        });
        const { href } = getProfilePicture(profilePictureId);
        profilePictureId && setImage(href);
    }, [user]);

    const handleBio = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        const cleanedText = remove_linebreaks(description);
        const response = updateBio(headline, description, documentId);
    };
    const addSkills = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        array.push(skill);
        setSkill('');
        updateSkills(array, documentId);
    };
    const deleteSkill = (index: number) => {
        const newArray = array.filter((item, i) => i !== index);
        setArray(newArray);
        updateSkills(newArray, documentId);
    };
    const uploadProfilePicture = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        const results = createProfilePicture(file[0]);
        results.then((res) => {
            console.log(res);
            const { href } = res && getProfilePicture(res.$id);
            console.log(href);
            href && setImage(href);
            updateProfileId(documentId, res.$id);
            setProfilePictureId(res.$id)
        });
    };
    const updateProfilePicture = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        console.log(profilePictureId);
        
        const results = deleteProfileImage(profilePictureId);
        results.then((rep)=>console.log(rep)
        )
        const resultProfile = createProfilePicture(file[0]);
        resultProfile.then((res) => {
            setProfilePictureId(res.$id)
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
        response.then((res)=>{
            setImage('')
        })
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
                degree: '',
                school: '',
                graduationYear: ''
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
        addSkills,
        deleteSkill,
        certificateEdit,
        setCertificateEdit,
        certificateIndex,
        setCertificateIndex,
        editedCertificate,
        setEditedCertificate,
        educationIndex,
        setEducationIndex,
        education,
        setEducation,
        EditEducation,
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
        deleteEducation
    };
};
  