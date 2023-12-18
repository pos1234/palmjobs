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
    const haveAccount = () => {
        getAccount().then((userInfo: any) => {
            userInfo && console.log(userInfo);
            setLoading(false)
            if (userInfo !== "failed") {
                setUserData(userInfo)
                localforage.setItem('userData', userInfo).then(() => {
                    setLoading(false)
                });
            }
        }).catch((error) => {
            setLoading(false)
            console.log(error);
        })
    }
    const userDatas = async () => {
        localforage.getItem('userData').then((value) => {
            if (value) {
                setLoading(false)
                setUserData(value)
                console.log(value);

            }
            if (!value) {
                haveAccount()
            }
        });
    }
    const haveRole = async () => {
        localforage.getItem('userRole').then((value: any) => {
            if (!value) {
                useRole()
            }
            if (value) {
                setUserRole(value)
            }
        });
    }
    const useRole = async () => {
/*         if (userData) {
 */            const role = await getRole();
        role && setUserRole(role.documents[0].userRole);
        role && localforage.setItem('userRole', role.documents[0].userRole).then(() => {
        });
        /*  if (role && role.documents[0].userRole == 'candidate') {
             useCandidateDocument()
         }
         if (role && role.documents[0].userRole == 'employer') {
             useEmployerDocument()
         } */
        /*         }
         */
    };
    /*  const haveDetail = async () => {
         localforage.getItem('userDetail').then((value) => {
             if (value) {
                 setUserDetail(value)
                 setLoading(false)
             }
             if (!value) {
                 getDetails()
             }
         });
     } */
    /* const getDetails = async () => {
        if (userRole == 'candidate') {
            useCandidateDocument()
        }
        if (userRole == 'employer') {
            useEmployerDocument()
        }
    } */
    /* 
        const useCandidateDocument = async () => {
            const candidate = await getCandidateDocument();
            candidate && setUserDetail(candidate.documents[0]);
            candidate && localforage.setItem('userDetail', candidate.documents[0]).then(() => {
            });
            candidate && setLoading(false)
        };
        const useEmployerDocument = async () => {
            const employer = await getProfileData();
            employer && setUserDetail(employer.documents[0]);
            employer && localforage.setItem('userDetail', employer.documents[0]).then(() => {
            });
            employer && setLoading(false)
        } */
    const useAccount = async () => {
        userDatas()
        haveRole()
/*         haveDetail()
 */    };
    useEffect(() => {
        useAccount()
    }, [])
    return < GlobalContext.Provider value={{ userDetail, setUserDetail, loading, userData, setUserData, userRole }} >{children}</GlobalContext.Provider >
}
export const useGlobalContext = () => useContext(GlobalContext)
