import React, { useState } from 'react'
import { RequiredTextLabel } from './RequiredTextLabel';
import { postThirdTab } from '@/backend/employerBackend';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import { SubmitButton } from '@/components/TextInput';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useJobPostContext } from '@/contextApi/jobPostData';
import { SkillsSecond } from '../Skills';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
});
const ThirdForm = (props: any) => {
    const { thirdTabData, setThirdTabData, postingJobId, jobPostTabs, setPostingTabs } = useJobPostContext()
    const [loadingAi, setLoadingAi] = useState(false)
    const handleThirdSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setThirdTabData({
            ...thirdTabData, jobDescError: 'Job Description is required'
        })
        setThirdTabData({
            ...thirdTabData, skillError: 'Please provide required skills'
        })

        if (thirdTabData.jobDesc == '') {
            setThirdTabData({
                ...thirdTabData, jobDescError: 'Job Description is required'
            })
        } else if (thirdTabData.skillArray.length == 0) {
            setThirdTabData({
                ...thirdTabData, skillError: 'Please provide required skills'
            })
        } else {
            setThirdTabData({
                ...thirdTabData, loading: true
            })
            postThirdTab(thirdTabData.jobDesc, JSON.stringify(thirdTabData.skillArray), postingJobId)
                .then((res: any) => {
                    toast.success('Saved as Draft');
                    setThirdTabData({
                        ...thirdTabData, loading: false
                    })
                    setPostingTabs({
                        ...jobPostTabs,
                        third: false,
                        fourth: true
                    })
                })
                .catch((error) => {
                    toast.error('Draft Not Saved');
                    console.log(error);
                });
        }
    };
    const generateJobDescription = async ({ jobTitle, skills, yearsOfExperience }: Record<'jobTitle' | 'skills' | 'yearsOfExperience', string>) => {
        console.log('Generating job description...', `${window.location.hostname}/api/oai/jobDescription`);
        try {
            if (typeof window === 'undefined') return;
            const url = new URL(`${window.location.origin}/api/oai/jobDescription`);
            if (jobTitle) {
                url.searchParams.append('j', jobTitle);
            }
            if (skills) {
                url.searchParams.append('s', skills);
            }
            if (yearsOfExperience) {
                url.searchParams.append('y', yearsOfExperience);
            }

            const res: { content: string } = await fetch(url.toString()).then((res) => res.json());
            setThirdTabData({
                ...thirdTabData, jobDesc: res.content
            })
            setLoadingAi(false)
        } catch (error) {
            setLoadingAi(false)
            console.error('Error generating job description', error);
        }
    };
    const handleAIJobDescription = () => {
        /* setLoadingAi(true)
        props.postingJobId && fetchSinglePostedJobs(props.postingJobId).then((res: any) => {
            const { jobTitle, requiredSkills, yearsOfExperience } = res && res.documents && res.documents[0];
            generateJobDescription({ jobTitle: jobTitle, skills: requiredSkills, yearsOfExperience: yearsOfExperience }).then((res) => {
                console.log(res);
    
            })
        }) */
    }
    const handleBack = () => {
        setPostingTabs({
            ...jobPostTabs,
            third: false,
            second: true
        })
    }
    return (
        <form onSubmit={handleThirdSubmit} className='col-span-12 pt-5  space-y-4 '>
            <>
                <div className="text-neutral-900 text-xl font-semibold leading-10">
                    Add Skills and Description
                </div>
                <div className='w-full flex justify-between'>
                    <p className='font-[600] text-[14px]'>Generate the job description and required skills with AI</p>
                    <button onClick={handleAIJobDescription} disabled={loadingAi ? true : false} type="button"
                        className={`w-60 cursor-pointer bg-black text-textW gap-2 h-10 flex items-center justify-center rounded-lg
                    ${loadingAi ? '' : 'hover:bg-gradient-to-r hover:from-[#00A82D] hover:to-[#0CBC8B] hover:border-b-4 hover:border-b-black buttonBounce'}`}>
                        {loadingAi && <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gradientFirst animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>}
                        {loadingAi && <span>Loading...</span>}
                        {!loadingAi && <><AutoAwesomeIcon sx={{ fontSize: '1.2rem' }} />
                            <span className='text-sm'>Draft with AI</span></>}
                    </button>
                </div>
                <RequiredTextLabel text="Job Description?" />
                <div className="pb-20 mr-2 relative xl:mr-64">
                    <ReactQuill
                        className="h-60 text-addS"
                        value={thirdTabData.jobDesc}
                        onChange={(e) => setThirdTabData({
                            ...thirdTabData, jobDesc: e
                        })}
                        placeholder="Add Description"
                    />
                    {thirdTabData.jobDescError && <p className="text-red-500 absolute bottom-3 text-[13px] ">{thirdTabData.jobDescError}</p>}
                </div>
                <RequiredTextLabel text="Required Skills?" />
                <SkillsSecond array={thirdTabData.skillArray} setArray={setThirdTabData} dataDistruct={thirdTabData} change={'skillArray'} />
                {thirdTabData.skillError && <p className="text-red-500 text-[13px]">{thirdTabData.skillError}</p>}
            </>
            <div className="flex pt-10 justify-between gap-5 max-sm:flex-wrap">
                <div onClick={handleBack} className='w-full cursor-pointer md:w-60 flex items-center justify-center w-full rounded-xl bg-[#FAFAFA] h-14'>
                    <ArrowBackIcon sx={{ fontSize: '1rem' }} /> <span className='ml-2'>Back</span>
                </div>
                <div className='w-full md:w-60'>
                    <SubmitButton loading={thirdTabData.loading} buttonText="Continue" />
                </div>
            </div>
        </form>
    )
}

export default ThirdForm