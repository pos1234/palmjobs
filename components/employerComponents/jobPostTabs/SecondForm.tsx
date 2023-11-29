import React, { useEffect, useState } from 'react'
import { RequiredTextLabel, RequredExp, RadioInput } from './RequiredTextLabel';
import { postSecondTab } from '@/backend/employerBackend';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { toast } from 'react-toastify';
import Skills from '../Skills';
import { SubmitButton } from '@/components/TextInput';
import { useJobPostContext } from '@/contextApi/jobPostData';

const expData = ['0-2 years', '3-5 years', '6-8 years', '9-10 years', '10+ years'];


const SecondForm = (props: any) => {
    const { secondTabData, setSecondTabData } = useJobPostContext()
    /*  useEffect(() => {
         if (props.editedData) {
             props.editedData.jobType && setWorkType(props.editedData.jobType);
             props.editedData.expreienceLevel && setExpRequired(props.editedData.expreienceLevel);
             const parsedSkills = JSON.parse(props.editedData.requiredSkills);
             props.editedData.requiredSkills && setSkillArray(parsedSkills);
         }
     }, [props.editedData]) */
    /*  const generateJobDescription = async ({
         jobTitle,
         skills,
         yearsOfExperience
     }: Record<'jobTitle' | 'skills' | 'yearsOfExperience', string>) => {
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
          } catch (error) {
             console.error('Error generating job description', error);
         }
     }; */
    const handleSecondSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (props.second && !props.third && !props.fourth) {
            setSecondTabData({
                ...secondTabData, loading: true
            })
            postSecondTab(secondTabData.workType, secondTabData.expRequired, secondTabData.minSalary, secondTabData.maxSalary, secondTabData.currency, props.postingJobId)
                .then((res: any) => {
                    setSecondTabData({
                        ...secondTabData, loading: false
                    })
                    props.setFourth(false);
                    props.setThird(true);
                    props.setSecond(false);
                    /* generateJobDescription({
                        jobTitle,
                        skills: skillArray.join(', '),
                        yearsOfExperience: expRequired
                    }); */

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
    }

    return (
        <form
            onSubmit={handleSecondSubmit}
            className='col-span-12 pt-5 space-y-4 '
        >
            <div className="text-neutral-900 text-xl font-semibold leading-10">Technology Details</div>
            <RequiredTextLabel text="What is the job type" />
            <div className="flex gap-x-4 flex-wrap gap-y-3">
                <RadioInput radioName="jobType" radioText="Internship" radioValue="Internship" dataDistruct={secondTabData} change={'workType'} setFunction={setSecondTabData} />
                <RadioInput
                    radioName="jobType"
                    radioText="Full Time"
                    checked={secondTabData.workType === '' || secondTabData.workType === 'Full Time'}
                    radioValue="Full Time"
                    dataDistruct={secondTabData} change={'workType'} setFunction={setSecondTabData}
                />
                <RadioInput radioName="jobType" radioText="Part Time" radioValue="Part Time" dataDistruct={secondTabData} change={'workType'} setFunction={setSecondTabData} />
                <RadioInput radioName="jobType" radioText="Consultancy" radioValue="Consultancy" dataDistruct={secondTabData} change={'workType'} setFunction={setSecondTabData} />
            </div>
            <RequiredTextLabel text="What experience level is required ?" />
            <div className="flex gap-x-3 gap-y-3 flex-wrap mt-3 xl:pr-60">
                {expData.map((item: any, index: number) => {
                    return <RequredExp text={item} key={index} value={secondTabData.expRequired} dataDistruct={secondTabData} change={'expRequired'} setFuntioner={setSecondTabData} />;
                })}
            </div>
            <RequiredTextLabel text="What is the pay ?" req="nReq" />
            <div className="flex flex-wrap gap-5 xl:pr-10">
                <select
                    value={secondTabData.currency}
                    style={{ maxHeight: '200px' }}
                    onChange={(e) => setSecondTabData(e.currentTarget.value)}
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
            <div className="flex pt-10 justify-between max-md:flex-col max-md:gap-y-8">
                <div
                    onClick={props.handleBack}
                    className={
                        props.second || props.third || props.fourth
                            ? 'text-gradientFirst border border-gray-300 flex items-center justify-center cursor-pointer h-14 rounded-xl max-md:order-2 w-full md:w-5/12 lg:w-3/12'
                            : 'opacity-0'
                    }
                >
                    <ArrowBackOutlinedIcon sx={{ fontSize: '1.2rem' }} /> &nbsp; Back
                </div>
                <div className="flex justify-end">
                    <div className='w-full col-span-12 flex md:justify-end'>
                        <div className='w-full md:w-60'>
                            <SubmitButton loading={secondTabData.loading} buttonText="Continue" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default SecondForm