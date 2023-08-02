import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client, Account, Databases, Query } from 'appwrite';
const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT || '';
const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || '';
const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID || '';
const USER_ROLE = process.env.NEXT_PUBLIC_USER_ROLE || '';

// Create the UserContext
export interface UserState {
    user: string;
    role: string;
    loading: boolean;
}
const defaultState: UserState = {
    user: '',
    role: '',
    loading: true
};

const UserContext = createContext<UserState>(defaultState);
// Create the UserProvider component
const client = new Client();
const databases = new Databases(client);

const account = new Account(client);
// Initialize the Appwrite SDK
client
    .setEndpoint(ENDPOINT) // Replace with your Appwrite API endpoint
    .setProject(PROJECT_ID); // Replace with your Appwrite project ID
export const UserProvider = ({ children }: { children: any }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState('');
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Check if user is logged in

                // Fetch user data
                const { $id } = await account.get();
               // setRole('candidate');
                const { documents } = await databases.listDocuments(DATABASE_ID, USER_ROLE, [Query.equal('userId', $id)]);
                setUser($id);
                setRole(documents[0].userRole);
                /* const userRole = returnRole($id)
            userRole.then((res)=>{
              if(res.documents[0].userRole == "employer"){
                setLoading(false)
                setRole('employer')
              }else if(res.documents[0].userRole == "candidate"){
                setLoading(false)
                setRole('candidate')
              }else{
                setRole('')
              }
              
            }) */
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);
    return <UserContext.Provider value={{ user, loading, role }}>{children}</UserContext.Provider>;
};
// Custom hook to access the user context
export const useUser = () => {
    const { user, loading, role } = useContext(UserContext);
    return { user, loading, role };
};
