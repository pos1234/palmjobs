'use client';
import { createContext, useContext, Dispatch, useState, SetStateAction, useEffect } from "react";
import { getAccount, getRole } from "../backend/accountBackend";
import { getEmployerDocument } from "../backend/employerBackend";
import { getCandidateDocument } from "@/backend/candidateBackend";
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
        setLoading(true)

        getAccount().then((userInfo: any) => {
            userInfo && setLoading(false)
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
            if (userInfo == "failed") {
                setLoading(false)
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
        getRole().then((role: any) => {
            role && setUserRole(role.documents[0].userRole);
            if (typeof window !== 'undefined') {
                import('localforage').then((localforage) => {
                    role && localforage.setItem('userRole', role.documents[0].userRole).then(() => {
                    });
                });
            }
        }).catch((error) => {
            setLoading(false)
        })

    };
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
    }
    const getDetails = async () => {
        if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
                localforage.getItem('userRole').then((value: any) => {
                    if (value == 'employer') {
                        useEmployerDocument()
                    }
                    if (value == 'candidate') {
                        useCandidateDocument()
                    }
                });
            });
        }
        if (userRole == 'employer') {
            useEmployerDocument()
        }
        if (userRole == 'candidate') {
            useCandidateDocument()
        }
        /* if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
                localforage.getItem('userRole').then((value: any) => {
                    if (value == 'employer') {
                        useEmployerDocument()
                    }
                });
            });
        } */
    }
    const useEmployerDocument = async () => {
        getEmployerDocument().then((res) => {
            res && setUserDetail(res.documents[0]);
            if (typeof window !== 'undefined') {
                import('localforage').then((localforage) => {
                    res && localforage.setItem('userDetail', res.documents[0]).then(() => {
                        setLoading(false)
                    });
                });
            }
        }).catch((error) => {
            setLoading(false)
        })
    };
    const useCandidateDocument = async () => {
        getCandidateDocument().then((res) => {
            res && setUserDetail(res.documents[0]);
            if (typeof window !== 'undefined') {
                import('localforage').then((localforage) => {
                    res && localforage.setItem('userDetail', res.documents[0]).then(() => {
                        setLoading(false)
                    });
                });
            }
        }).catch((error) => {
            setLoading(false)
        })
    };
    /* useEffect(() => {
          if (typeof window !== 'undefined') {
             import('localforage').then((localforage) => {
                 localforage.getItem('userRole').then((value: any) => {
                     if (value == 'employer') {
                     }
                 });
             })
         }
         userDetails()
 
         useAccount()
     }, []) */
    const useAccount = async () => {
        userDatas()
        haveRole()
    };
    useEffect(() => {
        useAccount()
        userDetails()
    }, [])
    useEffect(() => {
        if (userData && !userRole) {
            useRole()
            userDetails()

        }
    }, [userData, userRole])
    return < GlobalContext.Provider value={{ userDetail, setUserDetail, loading, userData, setUserData, userRole }} >{children}</GlobalContext.Provider >
}
export const useGlobalContext = () => useContext(GlobalContext)
