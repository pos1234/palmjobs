import React, { useEffect, useState } from 'react'
import { RequiredTextLabel } from './RequiredTextLabel';
import { fetchSinglePostedJobs, postThirdTab } from '@/lib/employerBackend';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import { SubmitButton } from '@/components/TextInput';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
});
const salaryRangeData = [{ name: 'Range' }, { name: 'Starting amount' }, { name: 'Maximum amount' }, { name: 'Exact amount' }];
const salaryPerData = [{ name: 'Per Month' }, { name: 'Per Hour' }, { name: 'Per Year' }];
const ThirdForm = (props: any) => {
    const [loading, setLoading] = useState(false)
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [currency, setCurrency] = useState('etb');
    const [salary, setSalary] = useState('');
    const [salaryRange, setSalaryRange] = useState(salaryRangeData[0]);
    const [salaryRangeError, setSalaryRangeError] = useState('');
    const [salaryPer, setSalaryPer] = useState(salaryPerData[0]);
    const [jobDesc, setJobDesc] = useState('');
    const [jobDescError, setJobDescError] = useState('');
    const [loadingAi, setLoadingAi] = useState(false)
    useEffect(() => {
        if (props.editedData) {
            props.editedData.minSalary && setMinSalary(props.editedData.minSalary);
            props.editedData.maxSalary && setMaxSalary(props.editedData.maxSalary);
            props.editedData.jobDescription && setJobDesc(props.editedData.jobDescription);

        }
        console.log('3rd submit', props.postingJobId);
    }, [props.editedData])
    const handleThirdSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (!props.second && props.third && !props.fourth) {
            setSalaryRangeError('');
            if (jobDesc == '') {
                setJobDescError('Job Description is required');
            } else {
                setLoading(true);
                postThirdTab(minSalary, maxSalary, currency, jobDesc, props.postingJobId)
                    .then((res: any) => {
                        props.setFourth(true);
                        props.setThird(false);
                        toast.success('Saved as Draft');
                        setLoading(false)
                    })
                    .catch((error) => {
                        toast.error('Draft Not Saved');
                        console.log(error);
                    });
            }
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
            setJobDesc(res.content);
            setLoadingAi(false)
        } catch (error) {
            setLoadingAi(false)
            console.error('Error generating job description', error);
        }
    };
    const handleAIJobDescription = () => {
        setLoadingAi(true)
        props.postingJobId && fetchSinglePostedJobs(props.postingJobId).then((res: any) => {
            const { jobTitle, requiredSkills, yearsOfExperience } = res && res.documents && res.documents[0];
            generateJobDescription({ jobTitle: jobTitle, skills: requiredSkills, yearsOfExperience: yearsOfExperience }).then((res) => {
                console.log(res);

            })
        })
    }
    return (
        <form
            onSubmit={handleThirdSubmit}
            className={props.third ? 'col-span-12 pt-5  space-y-4 ' : 'hidden'}
        >
            {/*  {!profileFilled && ( */}
            <>
                <div className="text-neutral-900 text-xl font-semibold leading-10">
                    Add Compensation and Description
                </div>
                <RequiredTextLabel text="What is the pay ?" req="nReq" />
                <div className="flex flex-wrap gap-5 xl:pr-10">
                    <select
                        value={currency}
                        style={{ maxHeight: '200px' }}
                        onChange={(e) => setCurrency(e.currentTarget.value)}
                        className="form-select h-12 max-h-[20px] overflow-y-scroll pl-5 bg-white rounded-xl border oveflow-y-auto cursor-pointer border-gray-200 focus:ring-gradientFirst focus:border-0"
                    >
                        <option value="etb">ETB</option>
                        <option value="usd">USD</option>
                        <option value="euro">EURO</option>
                        <option value="gpb">GBP</option>
                        <option value="rnp">RMB</option>
                    </select>
                    <input
                        type="number"
                        onChange={(e) => {
                            setMinSalary(e.currentTarget.value);
                        }}
                        placeholder="Minimum"
                        className="pl-5 w-40 rounded-xl border border-gray-200 focus:ring-gradientFirst focus:border-0 hideIncrease"
                    />
                    <input
                        type="number"
                        onChange={(e) => {
                            setMaxSalary(e.currentTarget.value);
                        }}
                        placeholder="Maximum"
                        className="pl-5 w-40 rounded-xl border border-gray-200 focus:ring-gradientFirst focus:border-0 hideIncrease"
                    />
                </div>
                <div className='flex justify-between'>
                    <RequiredTextLabel text="Job Description ?" />
                    <button onClick={handleAIJobDescription} disabled={loadingAi ? true : false} type="button"
                        className={`w-60 cursor-pointer bg-gradient-to-r from-[#00A82D] to-[#0CBC8B] text-textW gap-2 h-10 flex items-center justify-center rounded-lg
                    ${loadingAi ? '' : 'hover:border-b-4 hover:border-b-black buttonBounce'}`}>
                        {loadingAi && <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gradientFirst animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>}
                        {loadingAi && <span>Loading...</span>}
                        {!loadingAi && <><AutoAwesomeIcon sx={{ fontSize: '1.2rem' }} />
                            <span className='text-sm'>Generate</span></>}
                    </button>
                    {/* <div onClick={handleAIJobDescription} className='w-60 cursor-pointer bg-black text-textW gap-2 h-10 flex items-center justify-center rounded-lg
                    hover:border-b-4 hover:border-b-gradientFirst buttonBounce
                    '>
                        <AutoAwesomeIcon sx={{ fontSize: '1.2rem' }} />
                        <span className='text-sm'>Generate</span>
                    </div> */}
                </div>
                <div className="pb-20 mr-2 relative xl:mr-64">
                    <ReactQuill
                        className="h-60 text-addS"
                        value={jobDesc}
                        onChange={(e) => setJobDesc(e)}
                        placeholder="Add Description"
                    />
                    {jobDescError && <p className="text-red-500 absolute bottom-3 text-[13px] ">{jobDescError}</p>}
                </div>
            </>
            {/*  )} */}
            {/*             {profileFilled && <EmployerProfile setFilled={setProfileFilled} />}
 */}            <div className="flex justify-between max-md:flex-col max-md:gap-y-8">
                <div
                    onClick={props.handleBack}
                    className={
                        props.second || props.third || props.fourth
                            ? 'text-gradientFirst border border-gray-300 flex items-center justify-center cursor-pointer h-14 rounded-xl max-md:order-2 w-full md:w-5/12 lg:w-60'
                            : 'opacity-0'
                    }
                >
                    <ArrowBackOutlinedIcon sx={{ fontSize: '1.2rem' }} /> &nbsp; Back
                </div>
                <div className="flex justify-end">
                    <div className='w-full col-span-12 flex md:justify-end'>
                        <div className='w-full md:w-60'>
                            <SubmitButton loading={loading} buttonText="Continue" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ThirdForm