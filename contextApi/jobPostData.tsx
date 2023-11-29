import { FirstTabData } from '@/backend/Interfaces';
import { createContext, useContext, useState, useEffect } from 'react'
const today = new Date();
const fifteenthDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);
const GlobalContext = createContext<FirstTabData>({
    firstTabData: {
        loading: false,
        jobTitle: '',
        jobTitleError: '',
        remote: false,
        hybrid: false,
        addLocation: true,
        location: '',
        locationError: '',
        openPositions: 1,
    },
    secondTabData: {
        loading: false,
        workType: '',
        minSalary: '',
        maxSalary: '',
        currency: '',
        expRequired: '',
    },
    thirdTabData: {
        loading: false,
        skillArray: [],
        jobDesc: '',
        skillError: '',
        jobDescError: ''
    },
    fourthTabData: {
        loading: false,
        emailSent: '',
        externalLink: '',
        deadline: `${fifteenthDay}`,
        palm: true,
        email: false,
        emailError: '',
        link: '',
        linkError: '',
        emailNotify: ''
    },
    setFirstTabData: () => { },
    setSecondTabData: () => { },
    setThirdTabData: () => { },
    setFourthTabData: () => { },
});
export const GlobalContextProvider = ({ children }: any) => {

    const [firstTabData, setFirstTabData] = useState({
        loading: false,
        jobTitle: '',
        jobTitleError: '',
        remote: false,
        hybrid: false,
        addLocation: true,
        location: '',
        locationError: '',
        openPositions: 1,
    })
    const [secondTabData, setSecondTabData] = useState({
        loading: false,
        workType: 'Full Time',
        minSalary: '',
        maxSalary: '',
        currency: '',
        expRequired: '0-2 years',
    })
    const [thirdTabData, setThirdTabData] = useState({
        loading: false,
        skillArray: [],
        skillError: '',
        jobDesc: '',
        jobDescError: ''
    })
    useEffect(() => {
        console.log(thirdTabData.skillArray);
    }, [thirdTabData.skillArray])
    const [fourthTabData, setFourthTabData] = useState({
        loading: false,
        emailSent: '',
        externalLink: '',
        deadline: `${fifteenthDay}`,
        palm: true,
        email: false,
        emailError: '',
        link: '',
        linkError: '',
        emailNotify: ''
    })
    return <GlobalContext.Provider
        value={{
            firstTabData, setFirstTabData,
            secondTabData, setSecondTabData,
            thirdTabData, setThirdTabData,
            fourthTabData, setFourthTabData
        }} >
        {children}
    </GlobalContext.Provider >
}
export const useJobPostContext = () => useContext(GlobalContext)
