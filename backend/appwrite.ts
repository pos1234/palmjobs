import { Client, Account, Databases, Storage } from 'appwrite';
const client = new Client();
const databases = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);

/* const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT || '';
 */ const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || '';
const ENDPOINT = 'https://appwrite.localhost';
client.setEndpoint(ENDPOINT).setProject(PROJECT_ID);

export const appwriteConfig = () => {
    return { client, databases, account, storage };
};
export default appwriteConfig;
