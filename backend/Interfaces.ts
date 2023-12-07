import { createContext, useContext, Dispatch, useState, SetStateAction, useEffect } from 'react';
export interface PostedJob {
    emailApplication: any;
    externalLink: any;
    employerId: any;
    companyName: String;
    jobTitle: String;
    jobLocation: String;
    jobIndustry: String;
    prefferedGender: String;
    requiredSkills: String;
    salaryRange: String;
    jobStatus: String;
    $id: String;
}
type numbers = number | null;
export interface FirstTabData {
    firstTabData: {
        loading: boolean;
        jobTitle: string;
        jobTitleError: string;
        remote: boolean;
        hybrid: boolean;
        addLocation: boolean;
        location: string;
        locationError: string;
        openPositions: number;
    };
    secondTabData: {
        loading: boolean;
        workType: string;
        minSalary: string;
        maxSalary: string;
        currency: string;
        expRequired: string;
    };
    thirdTabData: {
        loading: boolean;
        skillArray: Array<string>;
        skillError: string;
        jobDesc: string;
        jobDescError: string;
    };
    fourthTabData: {
        loading: boolean;
        emailSent: string;
        externalLink: string;
        deadline: string;
        palm: boolean;
        email: boolean;
        emailError: string;
        link: string;
        linkError: string;
        emailNotify: string;
    };
    jobPostTabs: {
        first: boolean;
        second: boolean;
        third: boolean;
        fourth: boolean;
        chooseJob: boolean;
    };
    allEmployerJobs: any;
    allLoading: boolean;
    postingJobId: string;
    setPostingTabs: Dispatch<SetStateAction<any>>;
    setPostingJobId: Dispatch<SetStateAction<any>>;
    setAllEmployerJobs: Dispatch<SetStateAction<any>>;
    setFirstTabData: Dispatch<SetStateAction<any>>;
    setSecondTabData: Dispatch<SetStateAction<any>>;
    setThirdTabData: Dispatch<SetStateAction<any>>;
    setFourthTabData: Dispatch<SetStateAction<any>>;
    handleJobSelection: (id: string, jobType?: string) => void;
}
