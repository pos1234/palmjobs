import { useState } from 'react';
import { ID, Query, Storage } from 'appwrite';
import { getRole } from './candidateBackend';
import { getAccount } from './accountBackend';
import appwriteConfig from './appwrite';
const { databases, account } = appwriteConfig();
const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID || '';
const POSTED_JOBS = process.env.NEXT_PUBLIC_POSTED_JOBS || '';
const APPLIED_JOBS = process.env.NEXT_PUBLIC_APPLIED_JOBS || '';
const CANDIDATE_DATA = process.env.NEXT_PUBLIC_CANDIDATE_DATA || '';
const COMPANY_DATA = process.env.NEXT_PUBLIC_COMPANY_DATA || '';
const SHORT_LISTED = process.env.NEXT_PUBLIC_SHORT_LISTED || '';
const SURVEY = process.env.NEXT_PUBLIC_SURVEY || '';
const updatePostedJobs = async (fileId: string, datas: any) => {
    const promise = databases.updateDocument(DATABASE_ID, POSTED_JOBS, fileId, datas);
    return promise;
};
const listPostedJobs = async (query: any) => {
    const userAccount = await getAccount();
    if (userAccount !== 'failed') {
        const promise = databases.listDocuments(DATABASE_ID, POSTED_JOBS, [Query.equal('employerId', userAccount.$id), query]);
        return promise;
    }
};
export const getEmployerDocument = async () => {
    const user = await getAccount();
    if (user !== 'failed') {
        const { $id } = user;
        const roles = await getRole();
        if (roles && roles.documents[0].userRole == 'employer') {
            const promise = databases.listDocuments(DATABASE_ID, COMPANY_DATA, [Query.equal('employerId', $id)]);
            return promise;
        }
        return null;
    }
    return null;
};
export const getUserDetail = async () => {
    const data: any = await getEmployerDocument();
    return data && data.documents[0];
};

export const updateUserName = (name: string) => {
    const promise = account.updateName(name);
    return promise;
};

export const fetchJobs = async () => {
    const promise = await databases.listDocuments(DATABASE_ID, POSTED_JOBS, [
        Query.equal('jobStatus', 'Active'),
        Query.orderAsc('datePosted')
    ]);
    return promise;
};
/* export const fetchJobs = async () => {
    const promise = await databases.listDocuments(DATABASE_ID, POSTED_JOBS, [
        Query.limit(100),
        Query.offset(0),
        Query.equal('jobStatus', 'Active'),
        Query.orderAsc('datePosted')
    ]);
    return promise;
}; */
export const checkEmailAppliation = (id: string) => {
    const [jobs, setJobs] = useState('');
    const promise = databases.listDocuments(DATABASE_ID, POSTED_JOBS, [Query.equal('$id', id)]);

    promise.then((res: any) => {
        setJobs(res.documents[0].emailApplication);
    });

    return jobs;
};

export const getNoApplicants = async (id: string) => {
    const results = await databases.listDocuments(DATABASE_ID, APPLIED_JOBS, [Query.equal('jobId', id)]);
    return results;
};

export const getEmployerDocumentId = async (id: string) => {
    const documentId = await databases.listDocuments(DATABASE_ID, COMPANY_DATA, [Query.equal('employerId', id)]);
    return documentId;
};
export const getCandidateDocumentId = async (id: string) => {
    const documentId = await databases.listDocuments(DATABASE_ID, CANDIDATE_DATA, [Query.equal('Id', id)]);
    return documentId;
};

//EMPLOYER
export const postFirstTab = async (title: string, openRoles: string, location: string) => {
    const userAccount = await getAccount();
    const stat = 'Draft';
    if (userAccount !== 'failed') {
        const promise = databases.createDocument(DATABASE_ID, POSTED_JOBS, ID.unique(), {
            jobTitle: title,
            openPositions: openRoles,
            jobLocation: location,
            jobStatus: stat,
            employerId: userAccount.$id
        });
        return promise;
    }
};
export const updateFirstTab = async (title: string, openRoles: string, location: string, id: string) => {
    const datas = {
        jobTitle: title,
        openPositions: openRoles,
        jobLocation: location
    };
    const promise = updatePostedJobs(id, datas);
    return promise;
};
export const postSecondTab = async (
    jobType: string,
    reqExp: string,
    minSalary: string,
    maxSalary: string,
    currency: string,
    id: string
) => {
    const datas = {
        minSalary,
        maxSalary,
        currency,
        jobType: jobType,
        expreienceLevel: reqExp
    };
    const promise = updatePostedJobs(id, datas);
    return promise;
};
export const postThirdTab = async (jobDes: string, skills: string, id: string) => {
    const datas = {
        jobDescription: jobDes,
        requiredSkills: skills
    };
    const promise = updatePostedJobs(id, datas);
    return promise;
};
export const postFourthTab = async (id: string, deadline: string, education?: string, email?: string, link?: string) => {
    const stat = 'Active';
    const datas = {
        applicationDeadline: deadline,
        educationLevel: education,
        emailApplication: email,
        externalLink: link,
        jobStatus: stat,
        datePosted: Date().toString()
    };
    const promise = updatePostedJobs(id, datas);
    return promise;
};
export const fetchAllEmployerJob = async () => {
    const userAccount = await getAccount();
    if (userAccount !== 'failed') {
        const promise = databases.listDocuments(DATABASE_ID, POSTED_JOBS, [Query.equal('employerId', userAccount.$id)]);
        return promise;
    }
};
export const NoPostedJobs = async () => {
    const userAccount = await getAccount();
    if (userAccount !== 'failed') {
        const promise = databases.listDocuments(DATABASE_ID, POSTED_JOBS, [
            Query.equal('employerId', userAccount.$id),
            Query.notEqual('jobStatus', 'Delete')
        ]);
        return promise;
    }
};
export const fetchPostedJobs = async () => {
    const userAccount = await getAccount();
    if (userAccount !== 'failed') {
        const promise = databases.listDocuments(DATABASE_ID, POSTED_JOBS, [
            Query.equal('employerId', userAccount.$id),
            Query.notEqual('jobStatus', 'Draft')
        ]);
        return promise;
    }
};
export const fetchDraftedJobs = async () => {
    const userAccount = await getAccount();
    if (userAccount !== 'failed') {
        const promise = databases.listDocuments(DATABASE_ID, POSTED_JOBS, [
            Query.equal('employerId', userAccount.$id),
            Query.equal('jobStatus', 'Draft')
        ]);
        return promise;
    }
};
export const deleteDraftedJobs = async (id: string) => {
    const promise = databases.deleteDocument(DATABASE_ID, POSTED_JOBS, id);
    return promise;
};
export const fetchSinglePostedJobs = (id: string) => {
    const promise = databases.listDocuments(DATABASE_ID, POSTED_JOBS, [Query.equal('$id', id)]);
    return promise;
};
export const updateJobs = (
    id: string,
    title: string,
    openRoles: string,
    location: string,
    jobType: string,
    minSalary: string,
    maxSalary: string,
    deadline: string,
    jobDes: string
) => {
    const datas = {
        jobTitle: title,
        openPositions: openRoles,
        jobLocation: location,
        jobType,
        minSalary,
        maxSalary,
        applicationDeadline: deadline,
        jobDescription: jobDes
    };
    const promise = updatePostedJobs(id, datas);
    return promise;
};
export const fetchCandidateDetail = (id: string) => {
    const promise = databases.listDocuments(DATABASE_ID, CANDIDATE_DATA, [Query.equal('Id', id)]);
    return promise;
};
export const fetchActivePostedJobs = async () => {
    const query = Query.equal('jobStatus', 'Active');
    const promise = listPostedJobs(query);
    return promise;
};
export const fetchClosedPostedJobs = async () => {
    const query = Query.equal('jobStatus', 'Close');
    const promise = listPostedJobs(query);
    return promise;
};
export const noApplication = async () => {
    const userAccount = await getAccount();
    if (userAccount !== 'failed') {
        const promise = databases.listDocuments(DATABASE_ID, APPLIED_JOBS, [Query.equal('employerId', userAccount.$id)]);
        return promise;
    }
};
export const fetchAppliedCandidates = (id: string) => {
    const promise = databases.listDocuments(DATABASE_ID, APPLIED_JOBS, [Query.equal('employerId', id)]);
    return promise;
};
export const fetchAppliedCandidatesSingleJob = async (jobId: string) => {
    const userAccount = await getAccount();
    if (userAccount !== 'failed') {
        const promise = databases.listDocuments(DATABASE_ID, APPLIED_JOBS, [
            Query.equal('employerId', userAccount.$id),
            Query.equal('jobId', jobId)
        ]);
        return promise;
    }
};
export const shortListedCandidate = async (jobId: string, candId: string) => {
    const userAccount = await getAccount();
    if (userAccount !== 'failed') {
        const checker = databases.listDocuments(DATABASE_ID, SHORT_LISTED, [
            Query.equal('employerId', userAccount.$id),
            Query.equal('jobId', jobId),
            Query.equal('candidateId', candId)
        ]);
        const promise = checker.then((res) => {
            if (res.total == 0)
                return databases.createDocument(DATABASE_ID, SHORT_LISTED, ID.unique(), {
                    jobId: jobId,
                    employerId: userAccount.$id,
                    candidateId: candId
                });
            return null;
        });
        return promise;
    }
};
export const deleteShortListedCandidate = (id: string) => {
    const results = databases.deleteDocument(DATABASE_ID, SHORT_LISTED, id);
    return results;
};
export const noShortListed = async () => {
    const userAccount = await getAccount();
    if (userAccount !== 'failed') {
        const promise = databases.listDocuments(DATABASE_ID, SHORT_LISTED, [Query.equal('employerId', userAccount.$id)]);
        return promise;
    }
};
export const fetchShortListed = async (jobId: string) => {
    const userAccount = await getAccount();
    if (userAccount !== 'failed') {
        const promise = databases.listDocuments(DATABASE_ID, SHORT_LISTED, [
            Query.equal('employerId', userAccount.$id),
            Query.equal('jobId', jobId)
        ]);
        return promise;
    }
};
export const updateJobStatus = (id: string, stat: string) => {
    const datas = {
        jobStatus: stat
    };
    const promise = databases.updateDocument(DATABASE_ID, POSTED_JOBS, id, datas);
    return promise;
};
export const updateProfile = async (
    companyName: string,
    sector: string,
    location: string,
    noOfEmployee: string,
    phoneNumber: string,
    websiteLink: string | null | undefined,
    description: string
) => {
    const userAccount = await getAccount();
    if (userAccount !== 'failed') {
        const datas = {
            companyName,
            sector,
            location,
            noOfEmployee,
            phoneNumber,
            websiteLink,
            description
        };
        databases.listDocuments(DATABASE_ID, COMPANY_DATA, [Query.equal('employerId', userAccount.$id)]).then((res: any) => {
            const promise = res && res.total > 0 && databases.updateDocument(DATABASE_ID, COMPANY_DATA, res.documents[0].$id, datas);
            return promise;
        });
    }
};
export const getProfileData = async () => {
    const userAccount = await getAccount();
    const promise =
        userAccount !== 'failed' &&
        (await databases.listDocuments(DATABASE_ID, COMPANY_DATA, [Query.equal('employerId', userAccount.$id)]));
    return promise;
};
export const updateEmailNotification = async (notify: boolean) => {
    const userAccount = await getAccount();
    if (userAccount !== 'failed') {
        const datas = {
            receiveEmailNotification: notify
        };
        databases.listDocuments(DATABASE_ID, COMPANY_DATA, [Query.equal('employerId', userAccount.$id)]).then((res: any) => {
            const promise = res && res.total > 0 && databases.updateDocument(DATABASE_ID, COMPANY_DATA, res.documents[0].$id, datas);
            return promise;
        });
    }
};
export const getCompanyData = (id: string) => {
    const promise = databases.listDocuments(DATABASE_ID, COMPANY_DATA, [Query.equal('employerId', id)]);
    return promise;
};
export const getEmployerPicture = async (id: string) => {
    const promise = await databases.listDocuments(DATABASE_ID, COMPANY_DATA, [Query.equal('employerId', id)]);
    return promise;
};
export const createSalarySurvey = async (
    gender: string,
    ageRange: string,
    jobTitle: string,
    sector: string,
    industry: string,
    employmentStatus: string,
    yearsIncurrentPosition: string,
    yearsInProffessionalPosition: string,
    location: string,
    monthlySalary: string,
    bonus: string,
    benefitsIncluded: string,
    educationLevel: string,
    fieldOfStudy: string,
    additionalInsight: string,
    emailAddress: string
) => {
    const promise = databases.createDocument(DATABASE_ID, SURVEY, ID.unique(), {
        gender,
        ageRange,
        jobTitle,
        sector,
        industry,
        employmentStatus,
        yearsIncurrentPosition,
        yearsInProffessionalPosition,
        location,
        monthlySalary,
        bonus,
        benefitsIncluded,
        educationLevel,
        fieldOfStudy,
        additionalInsight,
        emailAddress
    });

    return promise;
};
