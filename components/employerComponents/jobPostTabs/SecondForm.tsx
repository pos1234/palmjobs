import React, { useEffect, useState } from 'react'
import { RequiredTextLabel, RequredExp } from './RequiredTextLabel';
import RadioInput from '@/components/RadioInput';
import { postSecondTab } from '@/lib/employerBackend';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { toast } from 'react-toastify';
import Skills from '../Skills';
import { SubmitButton } from '@/components/TextInput';
const expData = ['0-2 years', '3-5 years', '6-8 years', '9-10 years', '10+ years'];
const SecondForm = (props: any) => {
    const [worktype, setWorkType] = useState('Full Time');
    const [expRequired, setExpRequired] = useState('0-2 years');
    const [skillArray, setSkillArray] = useState<any>([]);
    const [skillError, setSkillError] = useState('');
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (props.editedData) {
            props.editedData.jobType && setWorkType(props.editedData.jobType);
            props.editedData.expreienceLevel && setExpRequired(props.editedData.expreienceLevel);
            const parsedSkills = JSON.parse(props.editedData.requiredSkills);
            props.editedData.requiredSkills && setSkillArray(parsedSkills);
        }
    }, [props.editedData])
    const generateJobDescription = async ({
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

/*             setJobDesc(res.content);
 */        } catch (error) {
            console.error('Error generating job description', error);
        }
    };
    const handleSecondSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (props.second && !props.third && !props.fourth) {
            if (skillArray.length == 0) {
                setSkillError('Please provide required skills');
            } else {
                setLoading(true);
                postSecondTab(worktype, expRequired, JSON.stringify(skillArray), props.postingJobId)
                    .then((res: any) => {
                        setLoading(false);
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
                    .catch((error) => {
                        setLoading(false);
                        toast.error(`Draft Not Saved ${error}`);
                        console.log(error);
                    });
            }
        }
    };
    return (
        <form
            onSubmit={handleSecondSubmit}
            className={props.second ? 'col-span-12 pt-5 space-y-3 ' : 'hidden'}
        >
            <div className="text-neutral-900 text-3xl font-semibold leading-10">Technology Details</div>
            <RequiredTextLabel text="What is the job type" />
            <div className="flex gap-x-4 flex-wrap gap-y-3">
                <RadioInput radioName="jobType" radioText="Internship" radioValue="Internship" setFunction={setWorkType} />
                <RadioInput
                    radioName="jobType"
                    radioText="Full Time"
                    checked={worktype === '' || worktype === 'Full Time'}
                    radioValue="Full Time"
                    setFunction={setWorkType}
                />
                <RadioInput radioName="jobType" radioText="Part Time" radioValue="Part Time" setFunction={setWorkType} />
                <RadioInput radioName="jobType" radioText="Consultancy" radioValue="Consultancy" setFunction={setWorkType} />
            </div>
            <RequiredTextLabel text="What experience level is required ?" />
            <div className="flex gap-x-3 gap-y-3 flex-wrap mt-3 xl:pr-60">
                {expData.map((item: any, index: number) => {
                    return <RequredExp text={item} key={index} value={expRequired} setFuntioner={setExpRequired} />;
                })}
            </div>
            <RequiredTextLabel text="Required Skills ?" />
            <Skills array={skillArray} setArray={setSkillArray} />
            {skillError && <p className="text-red-500 text-[13px]">{skillError}</p>}
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
                        <div className='w-full md:w-80'>
                            <SubmitButton loading={loading} buttonText="Continue" />
                        </div>
                    </div>
                </div>
                {/* {loading && (
                    <img
                        src={loadingIn}
                        className="text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 w-5/12 rounded-xl w-full md:w-5/12 rounded-xl lg:w-3/12"
                    />
                )}
                {!loading && !profileFilled && (
                    <button
                        type="submit"
                        className="text-textW bg-gradient-to-r self-end flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 w-full md:w-5/12 rounded-xl lg:w-3/12"
                    >
                        Save and Continue
                    </button>
                )} */}
            </div>
        </form>
    )
}

export default SecondForm