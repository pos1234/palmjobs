import { ID, Query } from 'appwrite';
import appwriteConfig from './appwrite';
const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT || '';
const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || '';
const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID || '';
const USER_ROLE = process.env.NEXT_PUBLIC_USER_ROLE || '';
const CANDIDATE_DATA = process.env.NEXT_PUBLIC_CANDIDATE_DATA || '';
const COMPANY_DATA = process.env.NEXT_PUBLIC_COMPANY_DATA || '';
const VERIFY = process.env.NEXT_PUBLIC_VERIFY || '';
const { client, databases, account } = appwriteConfig();
client
    .setEndpoint(ENDPOINT) // Your API Endpoint
    .setProject(PROJECT_ID);

export const googleSignIn = () => {
    account.createOAuth2Session('google', `${VERIFY}/jobs`, `${VERIFY}/account/`);
};
export const googleRegister = async (userRole: string) => {
    account.createOAuth2Session('google', `${VERIFY}/jobs`, `${VERIFY}/account/`);
    await new Promise<void>((resolve) => {
        const checkAccount = async () => {
            const userAccount = await getAccount();
            if (userAccount !== 'failed') {
                resolve();
            } else {
                setTimeout(checkAccount, 1000); // Check again after 1 second
            }
        };
        checkAccount();
    });

    // After the OAuth2 session is complete, fetch the user account
    const userAccount = await getAccount();

    if (userAccount !== 'failed') {
        defineRole(userAccount.$id, userRole);
    }
};
export const changePassword = (password: string, oldPassword: string) => {
    const promise = account.updatePassword(password, oldPassword);
    return promise;
};
export const Register = async (email: string, password: string, userName: string) => {
    const promise = await account.create(ID.unique(), email, password, userName);
    return promise;
};
export const defineRole = async (id: string, role: string, name?: string) => {
    const sendRole = {
        userId: id,
        userRole: role
    };
    if (role == 'candidate') {
        const createId = await databases.createDocument(DATABASE_ID, CANDIDATE_DATA, ID.unique(), {
            Id: id,
            name
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
    await account.createVerification(`${VERIFY}/account/verify`);
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
    const promise = account.createRecovery(email, `${VERIFY}/account/resetPassword`);
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
            return null;
        }
    });
    return loggedIn;
};

export const signOut = async () => {
    try {
        const promises = await account.deleteSession('current');
    } catch (e) {
        console.log(e);
    }
};
export const getAccount = async () => {
    try {
        const sessionData = await account.get();
        return sessionData;
    } catch (error) {
        return 'failed';
    }
};
export const getRole = async () => {
    const userInfo = await getAccount();
    if (userInfo !== 'failed') {
        const usersRole = await databases.listDocuments(DATABASE_ID, USER_ROLE, [Query.equal('userId', userInfo.$id)]);
        return usersRole;
    }
};
