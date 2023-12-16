'use client';
import { createContext, useContext, Dispatch, useState, SetStateAction, useEffect } from "react";
import { getAccount, getRole } from "../backend/accountBackend";
import { getCandidateDocument } from "../backend/candidateBackend";
import { getProfileData } from "../backend/employerBackend";
import localforage from "localforage";
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
    const userDatas = async () => {
        const userInfo = await getAccount();
        userInfo !== "failed" && setUserData(userInfo)
        userInfo !== "failed" && localforage.setItem('userData', userInfo).then(() => {
        });
    }
    const useAccount = async () => {
        localforage.getItem('userData').then((value: any) => {
            if (!value) {
                userDatas()
            }
            if (value) {
                setUserData(value)
            }
        })
        localforage.getItem('userRole').then((value: any) => {
            if (!value) {
                useRole()
            }
            if (value) {
                localforage.getItem('userDetail').then((value) => {
                    setUserDetail(value)
                });
            }
            setLoading(false)
            setUserRole(value)
        });
    };
    const useRole = async () => {
        const role = await getRole();
        role && setUserRole(role.documents[0].userRole);
        role && localforage.setItem('userRole', role.documents[0].userRole).then(() => {
            console.log('Item has been set');
        });
        if (role && role.documents[0].userRole == 'candidate') {
            useCandidateDocument()
        }
        if (role && role.documents[0].userRole == 'employer') {
            useEmployerDocument()
        }
    };
    const useCandidateDocument = async () => {
        const candidate = await getCandidateDocument();
        candidate && setUserDetail(candidate.documents[0]);
        candidate && localforage.setItem('userDetail', candidate.documents[0]).then(() => {
            console.log('item been set');
        });
        candidate && setLoading(false)
    };
    const useEmployerDocument = async () => {
        const employer = await getProfileData();
        employer && setUserDetail(employer.documents[0]);
        employer && localforage.setItem('userDetail', employer.documents[0]).then(() => {
            console.log('item been set');
        });
        employer && setLoading(false)
    }
    useEffect(() => {
        useAccount()
    }, [])
    return < GlobalContext.Provider value={{ userDetail, setUserDetail, loading, userData, setUserData, userRole }} >{children}</GlobalContext.Provider >
}
export const useGlobalContext = () => useContext(GlobalContext)
/* const userInfo = await getAccount();
        if (userInfo !== 'failed') {
            !userData && setUserData(userInfo);
            const role = await getRole();
            role && setUserRole(role.documents[0].userRole);
            if (role && role.documents[0].userRole == 'candidate') {
                const candidate = await getCandidateDocument();
                if (candidate) {
                    setUserDetail(candidate.documents[0]);
                    setLoading(false);
                }
            }
            if (role && role.documents[0].userRole == 'employer') {
                const employer = await getProfileData();
                if (employer) {
                    setUserDetail(employer.documents[0]);
                    setLoading(false);

                }
            }
        }
        if (userInfo == 'failed') {
            setLoading(false);
        } */