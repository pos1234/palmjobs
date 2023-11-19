import React, { useEffect, useState } from 'react'
import { RequiredTextLabel } from './RequiredTextLabel';
import { postThirdTab } from '@/lib/employerBackend';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import { SubmitButton } from '@/components/TextInput';
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
    useEffect(() => {
        if (props.editedData) {
            props.editedData.minSalary && setMinSalary(props.editedData.minSalary);
            props.editedData.maxSalary && setMaxSalary(props.editedData.maxSalary);
            props.editedData.jobDescription && setJobDesc(props.editedData.jobDescription);

        }
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
    return (
        <form
            onSubmit={handleThirdSubmit}
            className={props.third ? 'col-span-12 pt-5  space-y-1.5 ' : 'hidden'}
        >
            {/*  {!profileFilled && ( */}
            <>
                <div className="text-neutral-900 text-[1.3rem] font-semibold leading-10 md:text-[1.6rem]">
                    Add Compensation and Description
                </div>
                <RequiredTextLabel text="What is the pay ?" req="nReq" />
                <div className="flex flex-wrap gap-5 xl:pr-10">
                    <select
                        value={currency}
                        style={{ maxHeight: '200px' }}
                        onChange={(e) => setCurrency(e.currentTarget.value)}
                        className="form-select h-12 max-h-[20px] overflow-y-scroll pl-5 bg-white rounded-3xl border oveflow-y-auto cursor-pointer border-gray-200 focus:ring-gradientFirst focus:border-0"
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
                <RequiredTextLabel text="Job Description ?" />
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
 */}            <div className="flex pt-10 justify-between max-md:flex-col max-md:gap-y-8">
                <div
                    onClick={props.handleBack}
                    className={
                        props.second || props.third || props.fourth
                            ? 'text-gradientFirst border border-gray-300 flex items-center justify-center cursor-pointer h-16 rounded-xl max-md:order-2 w-full md:w-5/12 lg:w-3/12'
                            : 'opacity-0'
                    }
                >
                    <ArrowBackOutlinedIcon sx={{ fontSize: '1.2rem' }} /> &nbsp; Back
                </div>
                <div className="flex justify-end">
                    <div className='w-full col-span-12 flex md:justify-end'>
                        <div className='w-full md:w-80'>
                            <SubmitButton loading={loading} buttonText="Continue" />
                        </div>
                    </div>
                </div>
                {/* {loading && (
                    <img
                        src={loadingIn}
                        className="text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 rounded-xl w-full md:w-5/12 lg:w-3/12"
                    />
                )}
                {!profileFilled && !loading && (
                    <button
                        type="submit"
                        className="text-textW bg-gradient-to-r self-end flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 rounded-xl  w-full md:w-5/12 lg:w-3/12"
                    >
                        Save and Continue
                    </button>
                )} */}
            </div>
        </form>
    )
}

export default ThirdForm