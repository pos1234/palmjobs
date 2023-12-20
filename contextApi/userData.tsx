'use client';
import { createContext, useContext, Dispatch, useState, SetStateAction, useEffect } from "react";
import { getAccount, getRole } from "../backend/accountBackend";
import { getEmployerDocument } from "../backend/employerBackend";
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
                if (typeof window !== 'undefined') {
                    import('localforage').then((localforage) => {
                        localforage.setItem('userData', userInfo).then(() => {
                            setLoading(false)
                        });
                    });
                }
            }
        }).catch((error) => {
            setLoading(false)
            console.log(error);
        })
    }
    const userDatas = async () => {
        if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
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
            });
        }
    }
    const haveRole = async () => {
        if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
                localforage.getItem('userRole').then((value: any) => {
                    if (!value) {
                        useRole()
                    }
                    if (value) {
                        setUserRole(value)
                    }
                });
            });
        }
    }
    const useRole = async () => {
        const role = await getRole();
        role && setUserRole(role.documents[0].userRole);
        if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
                role && localforage.setItem('userRole', role.documents[0].userRole).then(() => {
                });
            });
        }

    };

    const useAccount = async () => {
        userDatas()
        haveRole()
/*         haveDetail()
 */    };


    const userDetails = async () => {
        if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
                localforage.getItem('userDetail').then((value) => {
                    if (value) {
                        setUserDetail(value)
                        setLoading(false)
                    }
                    if (!value) {
                        getDetails()
                    }
                });
            });
        }
        setLoading(true)
        userDetail && setLoading(false)
    }
    const getDetails = async () => {
        if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
                localforage.getItem('userRole').then((value: any) => {
                    if (value == 'employer') {
                        useEmployerDocument()
                    }
                });
            });
        }
    }
    const useEmployerDocument = async () => {
        const employer = await getEmployerDocument();
        employer && setUserDetail(employer.documents[0]);
        if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
                employer && localforage.setItem('userDetail', employer.documents[0]).then(() => {
                });
            });
        }
        employer && setLoading(false)
    };
    useEffect(() => {
        if (userRole == 'employer') {
            userDetails()
        }
        useAccount()
    }, [])

    return < GlobalContext.Provider value={{ userDetail, setUserDetail, loading, userData, setUserData, userRole }} >{children}</GlobalContext.Provider >
}
export const useGlobalContext = () => useContext(GlobalContext)
