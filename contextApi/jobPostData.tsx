import { FirstTabData } from '@/backend/Interfaces';
import { fetchAllEmployerJob } from '@/backend/employerBackend';
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
    jobPostTabs: {
        first: false,
        second: false,
        third: false,
        fourth: false,
        chooseJob: false
    },
    allEmployerJobs: null,
    allLoading: false,
    postingJobId: '',
    setPostingTabs: () => { },
    setFirstTabData: () => { },
    setSecondTabData: () => { },
    setThirdTabData: () => { },
    setFourthTabData: () => { },
    setAllEmployerJobs: () => { },
    setPostingJobId: () => { },
    handleJobSelection: (id: string, postingType?: string) => { }
});
export const GlobalContextProvider = ({ children }: any) => {
    const [jobPostTabs, setPostingTabs] = useState({
        first: false,
        second: false,
        third: false,
        fourth: false,
        chooseJob: false
    })
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
        currency: 'etb',
        expRequired: '0-2 years',
    })
    const [thirdTabData, setThirdTabData] = useState({
        loading: false,
        skillArray: [],
        skillError: '',
        jobDesc: '',
        jobDescError: ''
    })
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
    const [postingJobId, setPostingJobId] = useState('')
    const [allEmployerJobs, setAllEmployerJobs] = useState<any>()
    const [allLoading, setAllLoading] = useState(false)
    useEffect(() => {
        setAllLoading(true)
        fetchAllEmployerJob().then((res: any) => {
            if (res?.total > 0) {
                setPostingTabs({
                    ...jobPostTabs,
                    chooseJob: true
                })
            }
            if (res?.total == 0) {
                setPostingTabs({
                    ...jobPostTabs,
                    first: true
                })
            }
            setAllLoading(false)
            setAllEmployerJobs(res?.documents)
        }).catch((error) => {
            setAllLoading(false)
            console.log(error);
        })
    }, [])
    const handleJobSelection = (id: string, postType?: string) => {
        postType && postType == 'duplicate' ? null : setPostingJobId(id)
        const selectedJob = allEmployerJobs && allEmployerJobs.filter((job: any) => job.$id == id)
        const remoteLocation = selectedJob[0].jobLocation == "Remote" ? true : false
        const hybridLocation = selectedJob[0].jobLocation == "Hybrid" ? true : false
        const locationAdded = selectedJob[0].jobLocation !== "Remote" && selectedJob[0].jobLocation !== "Hybrid" ? true : false
        const minSalary = selectedJob[0].minSalary !== null ? selectedJob[0].minSalary : ''
        const maxSalary = selectedJob[0].maxSalary !== null ? selectedJob[0].minSalary : ''
        const currency = selectedJob[0].currency !== null ? selectedJob[0].currency : 'etb'
        const exp = selectedJob[0].expreienceLevel !== null ? selectedJob[0].expreienceLevel : '0-2 years'
        const skills = selectedJob[0].requiredSkills !== null ? JSON.parse(selectedJob[0].requiredSkills) : []
        const desc = selectedJob[0].jobDescription !== null ? selectedJob[0].jobDescription : ''
        const email = selectedJob[0].emailApplication !== null ? selectedJob[0].emailApplication : ''
        const link = selectedJob[0].externalLink !== null ? selectedJob[0].externalLink : ''
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const deadline = selectedJob[0].applicationDeadline !== null ? selectedJob[0].applicationDeadline <= today.toISOString() ? fifteenthDay : selectedJob[0].applicationDeadline : ''
        setFirstTabData({
            ...firstTabData,
            loading: false,
            jobTitle: selectedJob[0].jobTitle,
            jobTitleError: '',
            remote: remoteLocation,
            hybrid: hybridLocation,
            addLocation: locationAdded,
            location: selectedJob[0].jobLocation,
            locationError: '',
            openPositions: Number(selectedJob[0].openPositions)
        })
        setSecondTabData({
            ...secondTabData,
            loading: false,
            workType: selectedJob[0].JobType,
            minSalary: minSalary,
            maxSalary: maxSalary,
            currency: currency,
            expRequired: exp,
        })
        setThirdTabData({
            ...thirdTabData,
            loading: false,
            skillArray: skills,
            skillError: '',
            jobDesc: desc,
            jobDescError: ''
        })
        setFourthTabData({
            ...fourthTabData,
            loading: false,
            emailSent: email,
            externalLink: link,
            deadline: deadline,
            palm: true,
            email: false,
            emailError: '',
            link: '',
            linkError: '',
            emailNotify: ''
        })
    }
    return <GlobalContext.Provider
        value={{
            firstTabData, setFirstTabData,
            secondTabData, setSecondTabData,
            thirdTabData, setThirdTabData,
            fourthTabData, setFourthTabData,
            allEmployerJobs, setAllEmployerJobs,
            jobPostTabs, setPostingTabs,
            allLoading,
            handleJobSelection,
            postingJobId, setPostingJobId
        }} >
        {children}
    </GlobalContext.Provider >
}
export const useJobPostContext = () => useContext(GlobalContext)