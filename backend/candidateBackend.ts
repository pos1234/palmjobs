import { ID, Query } from 'appwrite';
import { getAccount, getRole } from './accountBackend';
import appwriteConfig from './appwrite';
const { client, databases, account, storage } = appwriteConfig();
const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID || '';
const POSTED_JOBS = process.env.NEXT_PUBLIC_POSTED_JOBS || '';
const APPLIED_JOBS = process.env.NEXT_PUBLIC_APPLIED_JOBS || '';
const SAVED_JOBS = process.env.NEXT_PUBLIC_SAVED_JOBS || '';
const CANDIDATE_DATA = process.env.NEXT_PUBLIC_CANDIDATE_DATA || '';
const COMPANY_DATA = process.env.NEXT_PUBLIC_COMPANY_DATA || '';
const IMAGE = process.env.NEXT_PUBLIC_IMAGE || '';
const RESUME = process.env.NEXT_PUBLIC_FILE || '';
const updateDocuments = async (datas: any) => {
    const data: any = await getCandidateDocument();
    const fileId = data && data.documents[0].$id;
    const promise = databases.updateDocument(DATABASE_ID, CANDIDATE_DATA, fileId, datas);
    return promise;
};
export const getCandidateDocument = async () => {
    const user = await getAccount();
    if (user !== 'failed') {
        const { $id } = user;
        const roles = await getRole();
        if (roles && roles.documents[0].userRole == 'candidate') {
            const promise = await databases.listDocuments(DATABASE_ID, CANDIDATE_DATA, [Query.equal('Id', $id)]);
            return promise;
        }
        return null;
    }
    return null;
};
export const getUserDetail = async () => {
    const data: any = await getCandidateDocument();
    return data && data.documents[0];
};
export const uploadProfilePictures = (file: any) => {
    const resultProfile = storage.createFile(IMAGE, ID.unique(), file);
    return resultProfile;
};
export const deletePictures = async (fileId: string) => {
    const promise = await storage.deleteFile(IMAGE, fileId);
    return promise;
};
export const getProfilePictures = async (id: string) => {
    const url = storage.getFileView(IMAGE, id);
    return url;
};
export const deleteProfilePicture = async (fileId: string) => {
    const promise = await storage.deleteFile(IMAGE, fileId);
    updateProfileId('');
    return promise;
};
export const updateProfileId = (fileId: string) => {
    const datas = {
        profilePictureId: fileId
    };
    return updateDocuments(datas);
};
export const addSocials = (
    linkedIn: string,
    github: string,
    behance: string,
    protfolio: string,
    phoneNumber?: string,
    address?: string
) => {
    const datas = {
        linkedIn,
        github,
        behance,
        protfolio,
        phoneNumber,
        address
    };

    return updateDocuments(datas);
};
export const addPhoneAddress = (phone: string, place: string) => {
    const datas = {
        phoneNumber: phone,
        address: place
    };

    return updateDocuments(datas);
};
export const insertCoverLetter = async (cover: any) => {
    const datas = {
        coverLetter: cover
    };
    const promise = await updateDocuments(datas);
    return promise;
};
export const updateCertificates = async (certificateData: string) => {
    const datas = {
        certificates: certificateData
    };
    const promise = await updateDocuments(datas);
    return promise;
};
export const updateWorkHistory = async (workHistoryData: string) => {
    const datas = {
        workHistory: workHistoryData
    };
    const promise = await updateDocuments(datas);
    return promise;
};
export const updateEducation = async (education: string) => {
    const datas = {
        educations: education
    };
    const promise = await updateDocuments(datas);
    return promise;
};
export const updateProjects = async (name: string, url: string, desc: string, thumbId: string) => {
    const datas = [
        {
            projectName: name,
            link: url,
            detail: desc,
            thumbnailId: thumbId
        }
    ];
    const stringData = name == '' ? null : JSON.stringify(datas);
    const sendData = {
        projects: stringData
    };
    const promise = await updateDocuments(sendData);
    return promise;
};
export const updateSkills = async (skillsData: string[]) => {
    const datas = {
        skills: skillsData
    };
    const promise = await updateDocuments(datas);
    return promise;
};
export const updateResumeId = (resume: string) => {
    const datas = {
        resumeId: resume
    };
    return updateDocuments(datas);
};
export const uploadResume = (resume: any) => {
    const promise = storage.createFile(RESUME, ID.unique(), resume);
    return promise;
};
export const getResumeName = async (resume: any) => {
    const name = storage.getFile(RESUME, resume);
    return name;
};
export const downLoadResume = (resume: any) => {
    const response = storage.getFileDownload(RESUME, resume);
    const blob = new Blob([response.href], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'downloads.pdf');
    document.body.appendChild(link);
    link.click();
};
export const deleteResume = (fileId: string) => {
    const promise = storage.deleteFile(RESUME, fileId);
    return promise;
};
export const fetchSavedJobIds = async (id: string) => {
    const results = await databases.listDocuments(DATABASE_ID, SAVED_JOBS, [Query.orderDesc('$createdAt'), Query.equal('candidateId', id)]);
    return results;
};
export const unSaveJobs = (id: string) => {
    const results = databases.deleteDocument(DATABASE_ID, SAVED_JOBS, id);
    return results;
};
export const fetchSavedJobsData = async (id: string) => {
    // Fetch data from Appwrite for the given ID
    const response = await databases.getDocument(DATABASE_ID, POSTED_JOBS, id);
    return response;
    // Wait for all promises to resolve and return the data
};
export const getSavedJobId = async (id: string) => {
    const userAccount = await account.get();
    const results = databases.listDocuments(DATABASE_ID, SAVED_JOBS, [Query.orderDesc('$createdAt'), Query.equal('jobId', id)]);
    return results;
};
export const fetchAppliedJobIds = async () => {
    const userAccount = await getAccount();
    if (userAccount !== 'failed') {
        const results = await databases.listDocuments(DATABASE_ID, APPLIED_JOBS, [
            Query.equal('candidateId', userAccount.$id),
            Query.equal('candidateDelete', false)
        ]);
        return results;
    }
};
export const getCompanyData = (id: string) => {
    const promise = databases.listDocuments(DATABASE_ID, COMPANY_DATA, [Query.equal('employerId', id)]);
    return promise;
};
export const fetchAppliedJobsData = async (ids: string) => {
    const response = await databases.getDocument(DATABASE_ID, POSTED_JOBS, ids);
    return response;
};
export const getAppliedJobId = async (id: string) => {
    try {
        const results = databases.listDocuments(DATABASE_ID, APPLIED_JOBS, [Query.orderDesc('$createdAt'), Query.equal('jobId', id)]);
        return results;
    } catch (e) {
        console.log(e);
    }
};
export const applyToJobs = (
    candidateId: string,
    jobId: string,
    employerId: string,
    canEmail: string,
    canPhone: string,
    letter: string,
    fileId?: string
) => {
    const promise = databases.createDocument(DATABASE_ID, APPLIED_JOBS, ID.unique(), {
        jobId: jobId,
        employerId: employerId,
        candidateId: candidateId,
        coverLetter: letter,
        resumeId: fileId,
        candidateEmail: canEmail,
        candidatePhone: canPhone,
        appliedDate: new Date(),
        employerDelete: false,
        candidateDelete: false
    });

    return promise;
};
export const alreadyApplied = async (id: string, jobId: string) => {
    const results = await databases.listDocuments(DATABASE_ID, APPLIED_JOBS, [Query.equal('candidateId', id), Query.equal('jobId', jobId)]);
    return results;
};
export const saveJobs = (candidateId: string, jobId: string) => {
    const promise = databases.createDocument(DATABASE_ID, SAVED_JOBS, ID.unique(), {
        jobId: jobId,
        candidateId: candidateId
    });
    return promise;
};
export const alreadySaved = async (id: string, jobId: string) => {
    const results = await databases.listDocuments(DATABASE_ID, SAVED_JOBS, [Query.equal('candidateId', id), Query.equal('jobId', jobId)]);
    return results;
};
