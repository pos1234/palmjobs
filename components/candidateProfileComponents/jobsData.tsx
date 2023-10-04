import { fetchJobs } from '@/lib/services';
import { useEffect, useState } from 'react';

/* const jobData = [
    {
        id: 1,
        compName: 'Linear Company',
        salaryRange: '40 - 50',
        jobType: 'Full Time',
        openPositions: '20',
        jobIndustry: 'Technology',
        externalLink: '',
        emailApplication: '',
        expreienceLevel: 'Senior',
        educationLevel: 'Associate',
        datePosted: '',
        location: 'Addis Abeba',
        jobTitle: 'Software Engineer',
        applicationDeadline: '',
        requiredSkills: ['angular', 'react'],
        postedTime: '29 min ago',
        jobDescription:
            'Abc in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.'
    },
    {
        id: 2,
        compName: 'Karavan Coffee',
        salaryRange: '30 - 60',
        jobType: 'Remote',
        openPositions: '10',
        jobIndustry: 'Technology',
        externalLink: '',
        emailApplication: '',
        expreienceLevel: 'internship',
        educationLevel: 'Associate',
        datePosted: '',
        location: 'Addis Abeba',
        jobTitle: 'Manager',
        applicationDeadline: '',
        requiredSkills: ['angular', 'react'],
        postedTime: '29 min ago',
        jobDescription:
            'Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.'
    },
    {
        id: 3,
        compName: 'Nylos Company',
        salaryRange: '40 - 50',
        jobType: 'Part Time',
        openPositions: '20',
        jobIndustry: 'Technology',
        externalLink: '',
        emailApplication: '',
        expreienceLevel: 'internship',
        educationLevel: 'Associate',
        datePosted: '',
        location: 'Addis Abeba',
        jobTitle: 'Marketing',
        applicationDeadline: '',
        requiredSkills: ['angular', 'react'],
        postedTime: '29 min ago',
        jobDescription:
            'Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.'
    },
    {
        id: 4,
        compName: 'Yes Company',
        salaryRange: '40 - 50',
        jobType: 'Part Time',
        openPositions: '20',
        jobIndustry: 'Technology',
        externalLink: '',
        emailApplication: '',
        expreienceLevel: 'internship',
        educationLevel: 'Associate',
        datePosted: '',
        location: 'Addis Abeba',
        jobTitle: 'Sales',
        applicationDeadline: '',
        requiredSkills: ['angular', 'react'],
        postedTime: '29 min ago',
        jobDescription:
            'Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.'
    },
    {
        id: 5,
        compName: 'Company A',
        salaryRange: '40 - 50',
        jobType: 'Part Time',
        openPositions: '20',
        jobIndustry: 'Technology',
        externalLink: '',
        emailApplication: '',
        expreienceLevel: 'Internship',
        educationLevel: 'Associate',
        datePosted: '',
        location: 'Addis Abeba',
        jobTitle: 'Sales',
        applicationDeadline: '',
        requiredSkills: ['Angular', 'React'],
        postedTime: '29 min ago',
        jobDescription:
            'Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.'
    },
    {
        id: 6,
        compName: 'Company B',
        salaryRange: '50 - 60',
        jobType: 'Full Time',
        openPositions: '10',
        jobIndustry: 'Finance',
        externalLink: '',
        emailApplication: '',
        expreienceLevel: 'Entry Level',
        educationLevel: 'Bachelor',
        datePosted: '',
        location: 'New York',
        jobTitle: 'Accountant',
        applicationDeadline: '',
        requiredSkills: ['Accounting', 'Excel'],
        postedTime: '1 hour ago',
        jobDescription:
            'Cillum non consectetur aliquip enim labore. Minim duis est laboris anim laborum exercitation mollit. Reprehenderit occaecat consectetur consectetur ad. Occaecat laboris eiusmod aliquip aute eiusmod ex sint reprehenderit. Laborum ex amet veniam ut exercitation aliquip esse incididunt deserunt.'
    },
    {
        id: 7,
        compName: 'Yes Company',
        salaryRange: '40 - 50',
        jobType: 'Part Time',
        openPositions: '20',
        jobIndustry: 'Technology',
        externalLink: '',
        emailApplication: '',
        expreienceLevel: 'internship',
        educationLevel: 'Associate',
        datePosted: '',
        location: 'Addis Abeba',
        jobTitle: 'Sales',
        applicationDeadline: '',
        requiredSkills: ['angular', 'react'],
        postedTime: '29 min ago',
        jobDescription:
            'Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.'
    },
    {
        id: 8,
        compName: 'Yes Company',
        salaryRange: '40 - 50',
        jobType: 'Part Time',
        openPositions: '20',
        jobIndustry: 'Technology',
        externalLink: '',
        emailApplication: '',
        expreienceLevel: 'internship',
        educationLevel: 'Associate',
        datePosted: '',
        location: 'Addis Abeba',
        jobTitle: 'Sales',
        applicationDeadline: '',
        requiredSkills: ['angular', 'react'],
        postedTime: '29 min ago',
        jobDescription:
            'Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.'
    },
    {
        id: 9,
        compName: 'Yes Company',
        salaryRange: '40 - 50',
        jobType: 'Part Time',
        openPositions: '20',
        jobIndustry: 'Technology',
        externalLink: '',
        emailApplication: '',
        expreienceLevel: 'internship',
        educationLevel: 'Associate',
        datePosted: '',
        location: 'Addis Abeba',
        jobTitle: 'Sales',
        applicationDeadline: '',
        requiredSkills: ['angular', 'react'],
        postedTime: '29 min ago',
        jobDescription:
            'Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.'
    }
];
export default jobData; */
/* const jobData = () => {
    const [jobsData, setJobsData] = useState<string[]>([]);
    useEffect(() => {
        fetchJobs().then((res: any) => {
            setJobsData(res.documents);
            console.log(res);
        });
    }, []);

    return jobsData;
};
export default jobData; */
