import { useEffect, useState, useContext } from 'react';
import { Client, Account, ID, Databases, Query, Storage } from 'appwrite';
const client = new Client();
const databases = new Databases(client);
const account = new Account(client);
const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT || '';
const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || '';
const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID || '';
const POSTED_JOBS = process.env.NEXT_PUBLIC_POSTED_JOBS || '';
const APPLIED_JOBS = process.env.NEXT_PUBLIC_APPLIED_JOBS || '';
const SAVED_JOBS = process.env.NEXT_PUBLIC_SAVED_JOBS || '';
const USER_ROLE = process.env.NEXT_PUBLIC_USER_ROLE || '';
const CANDIDATE_DATA = process.env.NEXT_PUBLIC_CANDIDATE_DATA || '';
const COMPANY_DATA = process.env.NEXT_PUBLIC_COMPANY_DATA || '';
const SHORT_LISTED = process.env.NEXT_PUBLIC_SHORT_LISTED || '';
const IMAGE = process.env.NEXT_PUBLIC_IMAGE || '';
const RESUME = process.env.NEXT_PUBLIC_FILE || '';

client
    .setEndpoint(ENDPOINT) // Your API Endpoint
    .setProject(PROJECT_ID);
const storage = new Storage(client);
// Go to OAuth provider login page
export const googleSignIn = () => {
    account.createOAuth2Session('google', 'http://localhost:3000/users/candidate/profile', 'http://localhost:3000/account/register');
};

// Jobs page
const updateDocuments = async (id: string, datas: any) => {
    const roles = await getRole();

    const promise =
        roles.documents[0].userRole == 'candidate'
            ? databases.updateDocument(DATABASE_ID, CANDIDATE_DATA, id, datas)
            : databases.updateDocument(DATABASE_ID, COMPANY_DATA, id, datas);

    return promise;
};
export const accountData = () => {
    const [userData, setUserData] = useState('');
    const userAccount = account.get();
    /*  try {
        account.get().then((userInfo: any) => {
            setUserData(userInfo);
        });
    } catch (e) {
        console.log(e);
    } */
    useEffect(() => {
        if (userAccount) {
            userAccount.then((userInfo: any) => {
                setUserData(userInfo);
            });
        }
    }, []);
    return userData;
};
export const getUserData = async () => {
    try {
        const getData = await account.get();
        return getData;
    } catch (e) {
        console.log(e);
    }
};
export const updateUserName = (name: string) => {
    const promise = account.updateName(name);
    return promise;
};
export const addLinkedInLink = (link: string, id: string) => {
    const datas = {
        linkedIn: link
    };
    try {
        return updateDocuments(id, datas);
    } catch (e) {
        console.log(e);
    }
};
export const addSocials = (
    phone: string,
    /* place: string, */
    linkedIn: string,
    githubLink: string,
    behanceLInk: string,
    portfolioLink: string,
    id: string
) => {
    const datas = {
        phoneNumber: phone,
        /* address:place, */
        linkedIn: linkedIn,
        github: githubLink,
        behance: behanceLInk,
        protfolio: portfolioLink
    };

    return updateDocuments(id, datas);
};
export const addWebsites = (webLink: string, id: string) => {
    const datas = {
        websiteLink: webLink
    };
    console.log(id);

    return updateDocuments(id, datas);
};
export const deleteWebsites = (id: string) => {
    const datas = {
        websiteLink: null
    };
    try {
        return updateDocuments(id, datas);
    } catch (e) {
        console.log(e);
    }
};
export const addBehance = (webLink: string, id: string) => {
    const datas = {
        behance: webLink
    };
    console.log(id);

    return updateDocuments(id, datas);
};
export const deleteBehance = (id: string) => {
    const datas = {
        behance: null
    };
    try {
        return updateDocuments(id, datas);
    } catch (e) {
        console.log(e);
    }
};
export const addPortfolio = (webLink: string, id: string) => {
    const datas = {
        protfolio: webLink
    };
    console.log(id);

    return updateDocuments(id, datas);
};
export const deletePortfolio = (id: string) => {
    const datas = {
        protfolio: null
    };
    try {
        return updateDocuments(id, datas);
    } catch (e) {
        console.log(e);
    }
};
export const insertCoverLetter = (id: string, cover: any) => {
    const datas = {
        coverLetter: cover
    };
    updateDocuments(id, datas);
};
export const addSector = (sectors: string, id: string) => {
    const datas = {
        sector: sectors
    };

    return updateDocuments(id, datas);
};
export const deleteSector = (id: string) => {
    const datas = {
        sector: null
    };
    try {
        return updateDocuments(id, datas);
    } catch (e) {
        console.log(e);
    }
};
export const addEmployee = (employees: string, id: string) => {
    const datas = {
        noOfEmployee: employees
    };
    console.log(id);

    return updateDocuments(id, datas);
};
export const deleteEmployee = (id: string) => {
    const datas = {
        noOfEmployee: null
    };
    try {
        return updateDocuments(id, datas);
    } catch (e) {
        console.log(e);
    }
};
export const addLocation = (locate: string, id: string) => {
    const datas = {
        location: locate
    };
    console.log(id);

    return updateDocuments(id, datas);
};
export const deleteLocation = (id: string) => {
    const datas = {
        location: null
    };
    try {
        return updateDocuments(id, datas);
    } catch (e) {
        console.log(e);
    }
};
export const addPhoneNumber = (phones: string, id: string) => {
    const datas = {
        phoneNumber: phones
    };
    console.log(id);

    return updateDocuments(id, datas);
};
export const deletePhoneNumber = (id: string) => {
    const datas = {
        phoneNumber: null
    };
    try {
        return updateDocuments(id, datas);
    } catch (e) {
        console.log(e);
    }
};
export const deleteLinkedInLink = (id: string) => {
    const datas = {
        linkedIn: null
    };
    try {
        return updateDocuments(id, datas);
    } catch (e) {
        console.log(e);
    }
};
export const addGithubLink = (link: string, id: string) => {
    const datas = {
        github: link
    };
    try {
        return updateDocuments(id, datas);
    } catch (e) {
        console.log(e);
    }
};
export const deleteGithubLink = (id: string) => {
    const datas = {
        github: null
    };
    try {
        return updateDocuments(id, datas);
    } catch (e) {
        console.log(e);
    }
};
export const fetchJobs = () => {
    const [jobs, setJobs] = useState([]);
    const promise = databases.listDocuments(DATABASE_ID, POSTED_JOBS);
    useEffect(() => {
        promise.then((res: any) => {
            setJobs(res.documents);
        });
    }, []);
    return jobs;
};
export const checkEmailAppliation = (id: string) => {
    const [jobs, setJobs] = useState('');
    const promise = databases.listDocuments(DATABASE_ID, POSTED_JOBS, [Query.equal('$id', id)]);

    promise.then((res: any) => {
        setJobs(res.documents[0].emailApplication);
    });

    return jobs;
};
export const getCandidateInfo = async () => {
    const userAccount = await account.get();
    const results = await databases.listDocuments(DATABASE_ID, CANDIDATE_DATA, [Query.equal('Id', userAccount.$id)]);
    console.log(results);
    return results;
};

export const applyToJobs = (candidateId: string, jobId: string, employerId: string, letter: string, fileId?: string) => {
    const promise = databases.createDocument(DATABASE_ID, APPLIED_JOBS, ID.unique(), {
        jobId: jobId,
        employerId: employerId,
        candidateId: candidateId,
        coverLetter: letter,
        resumeId: fileId,
        appliedDate: new Date(),
        employerDelete: false,
        candidateDelete: false
    });
    return promise;
};

export const fetchAppliedJobIds = async () => {
    const userAccount = await account.get();
    const results = await databases.listDocuments(DATABASE_ID, APPLIED_JOBS, [
        Query.equal('candidateId', userAccount.$id),
        Query.equal('candidateDelete', false)
    ]);
    return results;
};
/* export const fetchAppliedJobs = async () => {
    const userAccount = await account.get();
    const results = databases.listDocuments(DATABASE_ID, APPLIED_JOBS, [Query.equal('candidateId', userAccount.$id)]);
    return results;
}; */
export const fetchAppliedJobsData = async (ids: string[]) => {
    const dataPromises = ids.map(async (id) => {
        try {
            // Fetch data from Appwrite for the given ID
            const response = await databases.getDocument(DATABASE_ID, POSTED_JOBS, id);
            return response;
        } catch (error) {
            console.error(`Error fetching data for ID ${id}:`, error);
            return null;
        }
    });

    // Wait for all promises to resolve and return the data
    return Promise.all(dataPromises);
};
export const getAppliedJobId = async (id: string) => {
    const userAccount = await account.get();
    const results = databases.listDocuments(DATABASE_ID, APPLIED_JOBS, [Query.equal('jobId', id)]);
    return results;
};
export const removeAppliedJobs = (id: string) => {
    const datas = {
        candidateDelete: true
    };
    const results = databases.updateDocument(DATABASE_ID, APPLIED_JOBS, id, datas);

    return results;
};
export const alreadyApplied = async (id: string, jobId: string) => {
    /*  try { */
    const results = await databases.listDocuments(DATABASE_ID, APPLIED_JOBS, [Query.equal('candidateId', id), Query.equal('jobId', jobId)]);
    return results;
    /*  } catch (error) {
        console.error('Error fetching documents:', error);
        return [];
    } */
};

export const saveJobs = (candidateId: string, jobId: string) => {
    const promise = databases.createDocument(DATABASE_ID, SAVED_JOBS, ID.unique(), {
        jobId: jobId,
        candidateId: candidateId
    });
};
export const alreadySaved = async (id: string, jobId: string) => {
    try {
        const results = await databases.listDocuments(DATABASE_ID, SAVED_JOBS, [
            Query.equal('candidateId', id),
            Query.equal('jobId', jobId)
        ]);
        return results;
    } catch (error) {
        console.error('Error fetching documents:', error);
        return [];
    }
};
export const fetchSavedJobIds = async () => {
    const userAccount = await account.get();
    const results = await databases.listDocuments(DATABASE_ID, SAVED_JOBS, [Query.equal('candidateId', userAccount.$id)]);
    return results;
};
export const getSavedJobId = async (id: string) => {
    const userAccount = await account.get();
    const results = databases.listDocuments(DATABASE_ID, SAVED_JOBS, [Query.equal('jobId', id)]);
    return results;
};
export const fetchSavedJobsData = async (ids: string[]) => {
    const dataPromises = ids.map(async (id) => {
        try {
            // Fetch data from Appwrite for the given ID
            const response = await databases.getDocument(DATABASE_ID, POSTED_JOBS, id);
            return response;
        } catch (error) {
            console.error(`Error fetching data for ID ${id}:`, error);
            return null;
        }
    });

    // Wait for all promises to resolve and return the data
    return Promise.all(dataPromises);
};
export const unSaveJobs = (id: string) => {
    const results = databases.deleteDocument(DATABASE_ID, SAVED_JOBS, id);
    return results;
};

//COMMON FUNCTIONS

export const Register = async (email: string, password: string, userName: string) => {
    const promise = await account.create(ID.unique(), email, password, userName);
    return promise;
};
export const getRole = async () => {
    const userId = await account.get();
    const usersRole = await databases.listDocuments(DATABASE_ID, USER_ROLE, [Query.equal('userId', userId.$id)]);
    return usersRole;
};
export const defineRole = async (id: string, role: string) => {
    const sendRole = {
        userId: id,
        userRole: role
    };
    if (role == 'candidate') {
        const createId = await databases.createDocument(DATABASE_ID, CANDIDATE_DATA, ID.unique(), {
            Id: id
        });
    }

    if (role == 'employer') {
        const createId = await databases.createDocument(DATABASE_ID, COMPANY_DATA, ID.unique(), {
            employerId: id
        });
    }

    const Role = await databases.createDocument(DATABASE_ID, USER_ROLE, ID.unique(), sendRole);
    return Role;
};

export const sendEmailVerification = async (email: string, password: string) => {
    await account.createEmailSession(email, password);
    await account.createVerification('http://localhost:3000/account/verify');
};

export const verfiyAccount = (userId: string, secret: string) => {
    try {
        const promise = userId && account.updateVerification(userId, secret);
        return promise;
    } catch (e) {
        console.log(e);
    }
};
export const sendRecovery = async (email: string) => {
    const promise = account.createRecovery(email, 'https://palmjobs.vercel.app/account/resetPassword');
    return promise;
};
export const updatePassword = async (userId: string, secret: string, password: string) => {
    const promise = account.updateRecovery(userId, secret, password, password);
    return promise;
};
export const signIn = async (email: string, password: string) => {
    const promise = await account.createEmailSession(email, password);
    const userInfo = account.get();
    const loggedIn = userInfo.then((res) => {
        if (res.emailVerification == true) {
            return promise;
        } else {
            const deleted = account.deleteSession('current');
            return deleted;
        }
    });
    return loggedIn;
};

export const signOut = () => {
    const promises = account.deleteSession('current');
    promises.then(
        (res) => {
            // console.log(res);
        },
        (err) => {
            //console.log(err);
        }
    );
};

export const userInformation = async () => {
    const account = new Account(client);
    const userData = await account.get();
    return userData;
};
export const getEmployerDocumentId = async () => {
    const account = new Account(client);
    const userId = await account.get();
    const documentId = await databases.listDocuments(DATABASE_ID, COMPANY_DATA, [Query.equal('employerId', userId.$id)]);
    return documentId;
};
export const getCandidateDocumentId = async () => {
    const account = new Account(client);
    const userId = await account.get();
    const documentId = await databases.listDocuments(DATABASE_ID, CANDIDATE_DATA, [Query.equal('Id', userId.$id)]);
    return documentId;
};
export const createImage = (image: any) => {
    const promise = storage.createFile(IMAGE, ID.unique(), image);
    return promise;
};
export const uploadResume = (resume: any) => {
    const promise = storage.createFile(RESUME, ID.unique(), resume);
    return promise;
};
export const deleteResume = (fileId: string) => {
    const promise = storage.deleteFile(RESUME, fileId);
    return promise;
};
export const uploadSupportDoc = (resume: any) => {
    const promise = storage.createFile(RESUME, ID.unique(), resume);
    return promise;
};
export const getSupportDoc = (id: string) => {
    const images = storage.getFile(RESUME, id);
    return images;
};
export const deleteSupportDoc = (fileId: string) => {
    const promise = storage.deleteFile(RESUME, fileId);
    return promise;
};
export const updateSupportDocId = (id: string, resume: string) => {
    const datas = {
        supportingDocumentId: resume
    };
    return updateDocuments(id, datas);
};
/* export const createFile = (file: any) => {
    const promise = storage.createFile(FILE, ID.unique(), file);
    return promise;
}; */
export const deleteProfileImage = (fileId: string) => {
    const promise = storage.deleteFile(IMAGE, fileId);
    return promise;
};
export const getProfilePicture = (id: string) => {
    const images = storage.getFileView(IMAGE, id);
    return images;
};

export const updateProfileId = (id: string, fileId: string) => {
    const datas = {
        profilePictureId: fileId
    };
    return updateDocuments(id, datas);
};
export const getResume = (id: string) => {
    const images = storage.getFile(RESUME, id);
    return images;
};
export const updateResumeId = (id: string, resume: string) => {
    const datas = {
        resumeId: resume
    };
    return updateDocuments(id, datas);
};

export const updateBio = (headline: string, description: string, id: string) => {
    const datas = {
        bioHeadline: headline,
        bioDescription: description
    };
    return updateDocuments(id, datas);
};
export const updateSkills = async (skillsData: string[], id: string) => {
    const datas = {
        skills: skillsData
    };
    try {
        return updateDocuments(id, datas);
    } catch (e) {
        console.log(e);
    }
};
export const updateProjects = async (projectData: string, id: string) => {
    const datas = {
        projects: projectData
    };
    try {
        return updateDocuments(id, datas);
    } catch (e) {
        console.log(e);
    }
};
export const updateCertificates = async (certificateData: string, id: string) => {
    const datas = {
        certificates: certificateData
    };
    try {
        return updateDocuments(id, datas);
    } catch (e) {
        console.log(e);
    }
};
export const updateWorkHistory = async (workHistoryData: string, id: string) => {
    const datas = {
        workHistory: workHistoryData
    };
    try {
        return updateDocuments(id, datas);
    } catch (e) {
        console.log(e);
    }
};
export const updateEducation = async (education: string, id: string) => {
    const datas = {
        educations: education
    };
    try {
        return updateDocuments(id, datas);
    } catch (e) {
        console.log(e);
    }
};

//EMPLOYER
export const postJobs = async (
    title: string,
    category: string,
    openRoles: string,
    location: string,
    jobType: string,
    reqExp: string,
    skills: string,
    salary: string,
    jobDes: string,
    deadline: string,
    gender: string,
    education: string,
    email?: string,
    link?: string
) => {
    const userAccount = await account.get();
    const stat = 'Active';
    const promise = databases.createDocument(DATABASE_ID, POSTED_JOBS, ID.unique(), {
        jobTitle: title,
        jobIndustry: category,
        openPositions: openRoles,
        jobLocation: location,
        jobType: jobType,
        expreienceLevel: reqExp,
        requiredSkills: skills,
        salaryRange: salary,
        jobDescription: jobDes,
        applicationDeadline: deadline,
        prefferedGender: gender,
        educationLevel: education,
        emailApplication: email,
        externalLink: link,
        jobStatus: stat,
        employerId: userAccount.$id,
        companyName: userAccount.name,
        datePosted: Date().toString()
    });
    return promise;
};
export const fetchPostedJobs = (id: string) => {
    const promise = databases.listDocuments(DATABASE_ID, POSTED_JOBS, [
        Query.equal('employerId', id),
        Query.notEqual('jobStatus', 'Delete')
    ]);
    return promise;
};
export const fetchSinglePostedJobs = (id: string) => {
    const promise = databases.listDocuments(DATABASE_ID, POSTED_JOBS, [Query.equal('$id', id)]);
    return promise;
};
export const updateJobs = (
    id: string,
    title: string,
    category: string,
    openRoles: string,
    location: string,
    jobType: string,
    reqExp: string,
    skills: string,
    salary: string,
    deadline: string,
    gender: string,
    education: string
) => {
    /*     databases.updateDocument('[DATABASE_ID]', '[COLLECTION_ID]', '[DOCUMENT_ID]');
     */ const promise = databases.updateDocument(DATABASE_ID, POSTED_JOBS, id, {
        jobTitle: title,
        jobIndustry: category,
        openPositions: openRoles,
        jobLocation: location,
        jobType: jobType,
        expreienceLevel: reqExp,
        requiredSkills: skills,
        salaryRange: salary,
        applicationDeadline: deadline,
        prefferedGender: gender,
        educationLevel: education
    });
    return promise;
};
export const fetchActivePostedJobs = (id: string) => {
    const promise = databases.listDocuments(DATABASE_ID, POSTED_JOBS, [Query.equal('employerId', id), Query.equal('jobStatus', 'Active')]);
    return promise;
};
export const fetchPausedPostedJobs = (id: string) => {
    const promise = databases.listDocuments(DATABASE_ID, POSTED_JOBS, [Query.equal('employerId', id), Query.equal('jobStatus', 'Pause')]);
    return promise;
};
export const fetchClosedPostedJobs = (id: string) => {
    const promise = databases.listDocuments(DATABASE_ID, POSTED_JOBS, [Query.equal('employerId', id), Query.equal('jobStatus', 'Close')]);
    return promise;
};
export const fetchAppliedCandidates = (id: string) => {
    const promise = databases.listDocuments(DATABASE_ID, APPLIED_JOBS, [Query.equal('employerId', id)]);
    return promise;
};
export const fetchAppliedCandidatesSingleJob = (empId: string, jobId: string) => {
    const promise = databases.listDocuments(DATABASE_ID, APPLIED_JOBS, [Query.equal('employerId', empId), Query.equal('jobId', jobId)]);
    return promise;
};
export const shortListedCandidate = (empId: string, jobId: string, candId: string) => {
    const checker = databases.listDocuments(DATABASE_ID, SHORT_LISTED, [
        Query.equal('employerId', empId),
        Query.equal('jobId', jobId),
        Query.equal('candidateId', candId)
    ]);
    const promise = checker.then((res) => {
        if (res.total == 0)
            return databases.createDocument(DATABASE_ID, SHORT_LISTED, ID.unique(), {
                jobId: jobId,
                employerId: empId,
                candidateId: candId
            });
        return null;
    });
    return promise;
};
export const deleteShortListedCandidate = (id: string) => {
    const results = databases.deleteDocument(DATABASE_ID, SHORT_LISTED, id);
    return results;
};
export const fetchShortListed = (empId: string, jobId: string) => {
    const promise = databases.listDocuments(DATABASE_ID, SHORT_LISTED, [
        Query.equal('employerId', empId),
        Query.equal('jobId', jobId),
        Query.equal('interview', 'false')
    ]);

    return promise;
};
export const fetchInterview = (empId: string, jobId: string) => {
    const promise = databases.listDocuments(DATABASE_ID, SHORT_LISTED, [
        Query.equal('employerId', empId),
        Query.equal('jobId', jobId),
        Query.equal('interview', 'true')
    ]);
    promise.then((res) => console.log(res.documents[0]));
    return promise;
};
export const interviewStatus = (id: string, status: string, dates?: string) => {
    const datas = {
        interview: status,
        interviewDate: dates || ''
    };
    const promise = databases.updateDocument(DATABASE_ID, SHORT_LISTED, id, datas);
};
/* interview */

export const updateJobStatus = (id: string, stat: string) => {
    const datas = {
        jobStatus: stat
    };
    const promise = databases.updateDocument(DATABASE_ID, POSTED_JOBS, id, datas);
    return promise;
};

//CANDIDATE
