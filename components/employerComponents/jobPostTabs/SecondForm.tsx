import React from 'react'
import { RequiredTextLabel, RequredExp, RadioInput } from './RequiredTextLabel';
import { postSecondTab } from '@/backend/employerBackend';
import { toast } from 'react-toastify';
import { SubmitButton } from '@/components/TextInput';
import { useJobPostContext } from '@/contextApi/jobPostData';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const expData = ['0-2 years', '3-5 years', '6-8 years', '9-10 years', '10+ years'];
const SecondForm = (props: any) => {
    const { secondTabData, setSecondTabData, postingJobId, jobPostTabs, setPostingTabs } = useJobPostContext()
    const handleSecondSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setSecondTabData({
            ...secondTabData, loading: true
        })
        postSecondTab(secondTabData.workType, secondTabData.expRequired, secondTabData.minSalary, secondTabData.maxSalary, secondTabData.currency, postingJobId)
            .then((res: any) => {
                setSecondTabData({
                    ...secondTabData, loading: false
                })
                setPostingTabs({
                    ...jobPostTabs,
                    second: false,
                    third: true
                })
                toast.success('Saved as Draft');
            })
            .catch((error: any) => {
                setSecondTabData({
                    ...secondTabData, loading: false
                })
                toast.error(`Draft Not Saved ${error}`);
                console.log(error);
            });
    }
    const handleBack = () => {
        setPostingTabs({
            ...jobPostTabs,
            second: false,
            first: true
        })
    }
    return (
        <form
            onSubmit={handleSecondSubmit}
            className='col-span-12 pt-5 space-y-4 '
        >
            <div className="text-neutral-900 text-xl font-semibold leading-10">Job Details</div>
            <RequiredTextLabel text="What is the job type" />
            <div className="flex gap-x-4 flex-wrap gap-y-3">
                <RadioInput radioName="jobType" radioText="Internship" radioValue="Internship" dataDistruct={secondTabData} change={'workType'} setFunction={setSecondTabData} />
                <RadioInput
                    radioName="jobType"
                    radioText="Full-Time"
                    checked={secondTabData.workType === '' || secondTabData.workType === 'Full-Time'}
                    radioValue="Full-Time"
                    dataDistruct={secondTabData} change={'workType'} setFunction={setSecondTabData}
                />
                <RadioInput radioName="jobType" radioText="Part-Time" radioValue="Part-Time" dataDistruct={secondTabData} change={'workType'} setFunction={setSecondTabData} />
                <RadioInput radioName="jobType" radioText="Contract" radioValue="Contract" dataDistruct={secondTabData} change={'workType'} setFunction={setSecondTabData} />
            </div>
            <RequiredTextLabel text="What experience level is required?" />
            <div className="flex gap-x-3 gap-y-3 flex-wrap mt-3 xl:pr-60">
                {expData.map((item: any, index: number) => {
                    return <RequredExp text={item} key={index} value={secondTabData.expRequired} dataDistruct={secondTabData} change={'expRequired'} setFuntioner={setSecondTabData} />;
                })}
            </div>
            <RequiredTextLabel text="What is the pay?" req="nReq" />
            <div className="flex flex-wrap gap-5 xl:pr-10">
                <select
                    value={secondTabData.currency}
                    style={{ maxHeight: '200px' }}
                    onChange={(e) => setSecondTabData(e.currentTarget.value)}
                    className="form-select h-12 max-h-[20px] overflow-y-scroll pl-5 bg-white rounded-xl border oveflow-y-auto cursor-pointer border-gray-200 focus:ring-gradientFirst focus:border-0"
                >
                    <option value="etb">ETB</option>
                    <option value="usd">USD </option>
                    <option value="euro">EURO</option>
                    <option value="gpb">GBP</option>
                    <option value="rnp">RMB</option>
                </select>
                <input
                    type="number"
                    onChange={(e) => {
                        setSecondTabData({
                            ...secondTabData, minSalary: e.currentTarget.value
                        });
                    }}
                    placeholder="Minimum"
                    className="pl-5 w-40 rounded-xl border border-gray-200 focus:ring-gradientFirst focus:border-0 hideIncrease"
                />
                <input
                    type="number"
                    onChange={(e) => {
                        setSecondTabData({
                            ...secondTabData, maxSalary: e.currentTarget.value
                        });
                    }}
                    placeholder="Maximum"
                    className="pl-5 w-40 rounded-xl border border-gray-200 focus:ring-gradientFirst focus:border-0 hideIncrease"
                />
            </div>
            <div className="flex pt-10 justify-between gap-5 max-sm:flex-wrap">
                <div onClick={handleBack} className='w-full cursor-pointer md:w-60 flex items-center justify-center w-full rounded-xl bg-[#FAFAFA] h-14'>
                    <ArrowBackIcon sx={{ fontSize: '1rem' }} /> <span className='ml-2'>Back</span>
                </div>
                <div className='w-full md:w-60'>
                    <SubmitButton loading={secondTabData.loading} buttonText="Continue" />
                </div>
            </div>
        </form>
    )
}

export default SecondForm