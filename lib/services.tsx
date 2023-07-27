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
const PROFILE_PICTURE = process.env.NEXT_PUBLIC_PROFILE_PICTURE || '';

client
    .setEndpoint(ENDPOINT) // Your API Endpoint
    .setProject(PROJECT_ID);
const storage = new Storage(client);
// Jobs page
const updateDocuments = (id: string, datas: any) => {
    const promise = databases.updateDocument(DATABASE_ID, CANDIDATE_DATA, id, datas);
    return promise;
};
export const accountData = () => {
    const [userData, setUserData] = useState('');
    const userAccount = account.get();
    useEffect(() => {
        userAccount.then((userInfo: any) => {
            setUserData(userInfo);
        });
    }, []);
    return userData;
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
export const applyToJobs = (candidateId: string, jobId: string, employerId: string) => {
    const promise = databases.createDocument(DATABASE_ID, APPLIED_JOBS, ID.unique(), {
        jobId: jobId,
        employerId: employerId,
        candidateId: candidateId,
        candidateDelete:false,
    });
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
        const response = await databases.getDocument(DATABASE_ID,POSTED_JOBS, id);
        return response;
      } catch (error) {
        console.error(`Error fetching data for ID ${id}:`, error);
        return null;
      }
    });
  
    // Wait for all promises to resolve and return the data
    return Promise.all(dataPromises);
  };
  export const getAppliedJobId = async (id:string) => {
    const userAccount = await account.get();
    const results = databases.listDocuments(DATABASE_ID, APPLIED_JOBS, [
        Query.equal('jobId', id),
    ]);
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
    try {
        const results = await databases.listDocuments(DATABASE_ID, APPLIED_JOBS, [
            Query.equal('candidateId', id),
            Query.equal('jobId', jobId)
        ]);
        return results;
    } catch (error) {
        console.error('Error fetching documents:', error);
        return [];
    }
};

export const saveJobs = (candidateId: string, jobId: string) => {
    const promise = databases.createDocument(DATABASE_ID, SAVED_JOBS, ID.unique(), {
        jobId: jobId,
        candidateId: candidateId,
        deleted:false
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
    const results = await databases.listDocuments(DATABASE_ID, SAVED_JOBS, [
        Query.equal('candidateId', userAccount.$id),
        Query.equal('deleted', false)
    ]);
    return results;
};
export const getSavedJobId = async (id:string) => {
    const userAccount = await account.get();
    const results = databases.listDocuments(DATABASE_ID, SAVED_JOBS, [
        Query.equal('jobId', id),
    ]);
    return results;
};
export const fetchSavedJobsData = async (ids: string[]) => {
    const dataPromises = ids.map(async (id) => {
      try {
        // Fetch data from Appwrite for the given ID
        const response = await databases.getDocument(DATABASE_ID,POSTED_JOBS, id);
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
    const datas = {
        deleted: true
    };
    const results = databases.updateDocument(DATABASE_ID, SAVED_JOBS, id, datas);
    
    return results;
};

//COMMON FUNCTIONS

export const Register = async (email: string, password: string, userName: string) => {
    const promise = await account.create(ID.unique(), email, password, userName);
    return promise;
};

export const defineRole = async (id: string, role: string) => {
    const sendRole = {
        userId: id,
        userRole: role
    };
    const createId = databases.createDocument(DATABASE_ID, CANDIDATE_DATA, ID.unique(), {
        Id: id
    });
    const Role = await databases.createDocument(DATABASE_ID, USER_ROLE, ID.unique(), sendRole);
    return Role;
};

export const sendEmailVerification = async (email: string, password: string) => {
    await account.createEmailSession(email, password);
    await account.createVerification('http://localhost:3000/account/verify');
};

export const verfiyAccount = async (userId: string, secret: string) => {
    const promise = account.updateVerification(userId, secret);
    return promise;
};
export const sendRecovery = async (email: string) => {
    const promise = account.createRecovery(email, 'https://palmjobs.vercel.app/account/resetPassword');
    return promise;
};
export const updatePassword = async (userId: string, secret: string, password: string) => {
    const promise = account.updateRecovery(userId, secret, password, password);
    return promise;
};
export const signIn = (email: string, password: string) => {
    const promise = account.createEmailSession(email, password);
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
export const getCandidateDocumentId = async () => {
    const account = new Account(client);
    const userId = await account.get();
    const documentId = await databases.listDocuments(DATABASE_ID, CANDIDATE_DATA, [Query.equal('Id', userId.$id)]);
    return documentId;
};
export const createProfilePicture = (image: any) => {
    const promise = storage.createFile(PROFILE_PICTURE, ID.unique(), image);
    return promise;
};
export const deleteProfileImage = (fileId: string) => {
    const promise = storage.deleteFile(PROFILE_PICTURE, fileId);
    return promise;
};
export const getProfilePicture = (id: string) => {
    const images = storage.getFileView(PROFILE_PICTURE, id);
    return images;
};

export const updateProfileId = (id: string, fileId: string) => {
    const datas = {
        profilePictureId: fileId
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

/* export const postJob = (jobData,employerId)=>{
  const stat = 'active';
  const promise = databases.createDocument(DATABASE_ID, POSTED_JOBS,ID.unique(), {
  jobTitle:jobData.jobTitle,
  jobIndustry:jobData.jobIndustry,
  requiredSkills:jobData.requiredSkills,
  applicationDeadline:jobData.applicationDeadline,
  jobStatus:stat,
  employerId:employerId,
  companyName:jobData.companyName,
  jobLocation:jobData.jobLocation,
  jobDescription:jobData.jobDescription,
  prefferedGender:jobData.prefferedGender,
  salaryRange:jobData.salaryRange
});
promise.then((res)=>console.log(res))
} */

//EMPLOYER
export const fetchPostedJobs = (id: string) => {
    const [jobs, setJobs] = useState([]);
    const promise = databases.listDocuments(DATABASE_ID, POSTED_JOBS, [Query.equal('employerId', id)]);
    useEffect(() => {
        promise.then((res: any) => {
            setJobs(res.documents);
        });
    }, []);
    return jobs;
};

//CANDIDATE
