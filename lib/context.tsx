'use client';
import { createContext, useContext, Dispatch, useState, SetStateAction, useEffect } from "react";
import { getAccount, getRole } from "./accountBackend";
import { getCandidateDocument } from "./candidateBackend";
import { getProfileData } from "./employerBackend";

interface UserData {
    loading: boolean,
    userRole: string,
    userDetail: any | null;
    setUserDetail: Dispatch<SetStateAction<any>>;
    userData: any | null;
    setUserData: Dispatch<SetStateAction<any>>;
}

const GlobalContext = createContext<UserData>({
    loading: false,
    userRole: '',
    userDetail: null,
    setUserDetail: () => { },
    userData: null,
    setUserData: () => { }
});
export const GlobalContextProvider = ({ children }: any) => {
    const [userData, setUserData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [userRole, setUserRole] = useState('')
    const [userDetail, setUserDetail] = useState<any>()
    const getUserData = async () => {
        const userInfo = await getAccount();
        if (userInfo !== 'failed') {
            setLoading(false);
            setUserData(userInfo);
            const role = await getRole();
            role && setUserRole(role.documents[0].userRole);

            if (role && role.documents[0].userRole == 'candidate') {
                const candidate = await getCandidateDocument();
                if (candidate) {
                    setUserDetail(candidate.documents[0]);
                }
            }
            if (role && role.documents[0].userRole == 'employer') {
                const employer = await getProfileData();
                if (employer) {
                    setUserDetail(employer.documents[0]);
                }
            }
        }
        if (userInfo == 'failed') {
            setLoading(false);
        }
    };
    useEffect(() => {
        getUserData();
    }, []);
    return < GlobalContext.Provider value={{ userDetail, setUserDetail, loading, userData, setUserData, userRole }} >{children}</GlobalContext.Provider >
}
export const useGlobalContext = () => useContext(GlobalContext)