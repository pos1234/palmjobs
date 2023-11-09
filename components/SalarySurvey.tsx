import React, { useState, ReactNode } from 'react'
import TextInput from './TextInput';
import RadioInput from './RadioInput';
import { createSalarySurvey } from '@/lib/employerBackend';
import { toast } from 'react-toastify';
const FlexDiv = ({ children }: { children: ReactNode }) => {
    return <div className='flex flex-wrap gap-x-5 gap-y-2 mb-5 mt-2'>
        {children}
    </div>
}
const HeadLines = (props: any) => {
    return <p className='text-xl font-bold mb-3'>{props.text}</p>
}
const CheckBoxInput = (props: any) => {
    return (
        <div className="flex items-center gap-x-2">
            <input
                onChange={(e) => props.setFunction(e.currentTarget.value)}
                type="checkbox"
                checked={props.checked}
                value={props.radioValue}
                name={props.radioName}
                className="form-checkbox text-gradientFirst ring-green-500 cursor-pointer"
            />
            <span className="text-neutral-900 text-opacity-40 text-lg font-medium ">{props.radioText}</span>
        </div>
    );
};
const SalarySurvey = () => {
    const loadingIn = '/images/loading.svg';
    const [gender, setGender] = useState('');
    const [ageRange, setAgeRange] = useState('18-24')
    const [jobTitle, setJobTitle] = useState('')
    const [sector, setSector] = useState('Private')
    const [industry, setIndustry] = useState('Agriculture')
    const [employmentStatus, setEmploymentStatus] = useState('')
    const [yearsInCurrentPostion, setYearsInCurrentPostion] = useState('')
    const [yearsInProfessionalPosition, setYearsInProfessionalPosition] = useState('')
    const [location, setLocation] = useState('')
    const [monthlySalary, setMonthlySalary] = useState('')
    const [bonus, setBonus] = useState('');
    const [benefitsIncluded, setBenefitsIncluded] = useState('')
    const [educationLevel, setEducationLevel] = useState('High School')
    const [fieldOfStudy, setFieldOfStudy] = useState('')
    const [additionalInsight, setAdditionalInsight] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [currency, setCurrency] = useState('Birr');
    const [errorMessage, setErrorMessage] = useState('')
    const [errorCode, setErrorCode] = useState(0)
    const [loading, setLoading] = useState(false)
    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setErrorMessage('');
        if (gender == '') {
            setErrorCode(1);
            setErrorMessage('Please Choose Gender');
        } else if (ageRange == '') {
            setErrorCode(2);
            setErrorMessage('Please Select Age Range');
        } else if (jobTitle == '') {
            setErrorCode(3);
            setErrorMessage('Please Add Job Title');
        } else if (sector == '') {
            setErrorCode(4);
            setErrorMessage('Please Select Sector');
        } else if (industry == '') {
            setErrorCode(5);
            setErrorMessage('Please Select Industry');
        } else if (employmentStatus == '') {
            setErrorCode(6);
            setErrorMessage('Please Select Employment Status');
        } else if (yearsInCurrentPostion == '') {
            setErrorCode(7);
            setErrorMessage('Please Add Years In Current Position');
        } else if (yearsInProfessionalPosition == '') {
            setErrorCode(8);
            setErrorMessage('PleaseAdd Years In Professional Position ');
        } else if (location == '') {
            setErrorCode(9);
            setErrorMessage('Please Add Location');
        } else if (monthlySalary == '') {
            setErrorCode(10);
            setErrorMessage('Please Add Monthly Salary ');
        } else if (educationLevel == '') {
            setErrorCode(11);
            setErrorMessage('Please Select Education Level');
        } else if (fieldOfStudy == '') {
            setErrorCode(12);
            setErrorMessage('Please Add Field Of Study');
        } else {
            setLoading(true)
            createSalarySurvey(
                gender,
                ageRange,
                jobTitle,
                sector,
                industry,
                employmentStatus,
                yearsInCurrentPostion,
                yearsInProfessionalPosition,
                location,
                monthlySalary.toString(),
                bonus,
                benefitsIncluded,
                educationLevel,
                fieldOfStudy,
                additionalInsight,
                emailAddress,
            ).then((res) => {
                setLoading(false);
                toast.success('Successfully Submited Form')
            }).catch((error) => {
                setLoading(false);
                toast.error('Form Not Submitted')
            })
        }
    }
    return (
        <form className='w-full h-full py-10' onSubmit={handleSubmit}>
            <p className='flex justify-center my-5 font-bold text-3xl text-gradientFirst'>Salary Survey</p>
            <HeadLines text='Basic Information' />
            <div className='flex justify-between'>
                <div className='flex flex-col'>
                    <p>Gender</p>
                    <FlexDiv>
                        <RadioInput
                            radioName="gender"
                            radioText="Male"
                            radioValue="Male"
                            setFunction={setGender}
                        />
                        <RadioInput
                            radioName="gender"
                            radioText="Female"
                            radioValue="Female"
                            setFunction={setGender}
                        />
                        {errorMessage && errorCode == 1 && <p className="text-red-500 w-full text-[13px] mt-2">{errorMessage}</p>}

                    </FlexDiv>
                </div>
                <div className='flex flex-col'>
                    <p>Age Range</p>
                    <FlexDiv>
                        <select className='h-12 pl-5 bg-white rounded-xl border border-gray-200 focus:ring-gradientFirst focus:border-0 cursor-pointer' onChange={(e) => setAgeRange(e.currentTarget.value)}>
                            <option value="18-24">18-24</option>
                            <option value="25-34">25-34</option>
                            <option value="35-44">35-44</option>
                            <option value="45-54">45-54</option>
                            <option value="55-64">55-64</option>
                            <option value="65+">65+</option>
                        </select>
                    </FlexDiv>
                    {errorMessage && errorCode == 2 && <p className="text-red-500 w-full text-[13px] mt-2">{errorMessage}</p>}

                </div>


            </div>
            <HeadLines text="Employment Information" />
            <p className='mb-3'>Current Job Title</p>
            <TextInput setFunction={setJobTitle} value={jobTitle} errorMessage={errorCode == 3 ? errorMessage : ''} placeHolder="add job title" />
            <p className='mt-7'>Employment Sector</p>
            <FlexDiv>
                <select className='h-12 pl-5 bg-white rounded-xl border border-gray-200 focus:ring-gradientFirst focus:border-0 cursor-pointer' onChange={(e) => setSector(e.currentTarget.value)}>
                    <option value="Private">Private</option>
                    <option value="Public">Public</option>
                    <option value="Non-Governmental Organization (NGO)">Non-Governmental Organization (NGO)</option>
                    <option value="Self-Employed">Self-Employed</option>
                    <option value="Informal Sector">Informal Sector</option>
                    <option value="Other">Other</option>
                </select>
                {errorMessage && errorCode == 4 && <p className="text-red-500 w-full text-[13px] mt-2">{errorMessage}</p>}
            </FlexDiv>
            <p>Industry</p>
            <FlexDiv>
                <select className='h-12 pl-5 bg-white rounded-xl border border-gray-200 focus:ring-gradientFirst focus:border-0 cursor-pointer md:w-96' onChange={(e) => setIndustry(e.currentTarget.value)}>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Construction">Construction</option>
                    <option value="Education">Education</option>
                    <option value="Finance">Finance</option>
                    <option value="HealthCare">HealthCare</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Mining">Mining</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Retail">Retail</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Other">Other</option>
                </select>
                {errorMessage && errorCode == 5 && <p className="text-red-500 w-full text-[13px] mt-2">{errorMessage}</p>}
            </FlexDiv>
            <p>Employment Status</p>
            <FlexDiv>
                <RadioInput
                    radioName="employmentStatus"
                    radioText="Full Time"
                    radioValue="Full Time"
                    setFunction={setEmploymentStatus}
                />
                <RadioInput
                    radioName="employmentStatus"
                    radioText="Part-Time"
                    radioValue="Part-Time"
                    setFunction={setEmploymentStatus}
                />
                <RadioInput
                    radioName="employmentStatus"
                    radioText="Contract"
                    radioValue="Contract"
                    setFunction={setEmploymentStatus}
                />
                <RadioInput
                    radioName="employmentStatus"
                    radioText="Freelance"
                    radioValue="Freelance"
                    setFunction={setEmploymentStatus}
                />
                {errorMessage && errorCode == 6 && <p className="text-red-500 w-full text-[13px] mt-2">{errorMessage}</p>}
            </FlexDiv>
            <p>Number of Years in Current Postion</p>
            <input value={yearsInCurrentPostion} className='h-12 mt-5 mb-3 pl-5 bg-white rounded-xl border border-gray-200 focus:ring-gradientFirst focus:border-0 w-full md:w-96 hideIncrease' type='number' onChange={(e) => {
                if (e.currentTarget.value.length <= 2) {
                    setYearsInCurrentPostion(e.currentTarget.value)
                }

            }} />
            {errorMessage && errorCode == 7 && <p className="text-red-500 text-[13px] w-full mt-2">{errorMessage}</p>}
            <p className='mb-3 mt-2'>Number of Years in Professional Feild</p>
            <input value={yearsInProfessionalPosition} className='h-12 pl-5 bg-white rounded-xl border border-gray-200 focus:ring-gradientFirst focus:border-0 w-full md:w-96 hideIncrease' type='number' onChange={(e) => {
                if (e.currentTarget.value.length <= 2) {
                    setYearsInProfessionalPosition(e.currentTarget.value)
                }
            }} />
            {errorMessage && errorCode == 8 && <p className="text-red-500 text-[13px] w-full mt-2">{errorMessage}</p>}
            <p className='mb-5 mt-2'>Location of Employment</p>
            <TextInput setFunction={setLocation} value={location} errorMessage={errorCode == 9 ? errorMessage : ''} placeHolder="add location" />
            <span className='flex h-5'></span>
            <HeadLines text="Salary and Compensation" />
            <p className='mb-3'>Monthly Salary</p>
            <div className='flex gap-x-3'>
                <input className='h-12 pl-5 bg-white rounded-xl border border-gray-200 focus:ring-gradientFirst focus:border-0 w-full md:w-96 hideIncrease' type='number' onChange={(e) => setMonthlySalary(e.currentTarget.value)} />
                <select className='h-12 pl-5 bg-white rounded-xl border border-gray-200 focus:ring-gradientFirst focus:border-0 cursor-pointer' onChange={(e) => setCurrency(e.currentTarget.value)}>
                    <option value="Birr">Birr</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="CNY">CNY</option>
                    <option value="Other">Other</option>
                </select>

            </div>
            {errorMessage && errorCode == 10 && <p className="text-red-500 text-[13px] w-full mt-2">{errorMessage}</p>}
            <p className='my-5'>Additional Monthly Allowances and Bonuses (if any)</p>
            <input className='h-12 pl-5 bg-white rounded-xl border border-gray-200 focus:ring-gradientFirst focus:border-0 w-full md:w-96' type='number' onChange={(e) => setBonus(e.currentTarget.value)} />
            <p className='my-5 mt-5'>Benefits Included (Check all that apply)</p>
            <FlexDiv>
                <div className='flex flex-col flex-wrap gap-3'>
                    <CheckBoxInput radioName="Benefit"
                        radioText="Health Insurance"
                        radioValue="Health Insurance"
                        setFunction={setBenefitsIncluded} />
                    <CheckBoxInput radioName="Benefit"
                        radioText="Retirement Plan"
                        radioValue="Retirement Plan"
                        setFunction={setBenefitsIncluded} />
                    <CheckBoxInput radioName="Benefit"
                        radioText="Housing Allowance"
                        radioValue="Housing Allowance"
                        setFunction={setBenefitsIncluded} />
                    <CheckBoxInput radioName="Benefit"
                        radioText="Transportation Allowance"
                        radioValue="Transportation Allowance"
                        setFunction={setBenefitsIncluded} />
                </div>
                <div className='flex flex-col flex-wrap gap-3'>
                    <CheckBoxInput radioName="Benefit"
                        radioText="Meal Allowance"
                        radioValue="Meal Allowance"
                        setFunction={setBenefitsIncluded} />
                    <CheckBoxInput radioName="Benefit"
                        radioText="Education Allowance"
                        radioValue="Education Allowance"
                        setFunction={setBenefitsIncluded} />
                    <CheckBoxInput radioName="Benefit"
                        radioText="Other"
                        radioValue="Other"
                        setFunction={setBenefitsIncluded} />
                </div>
            </FlexDiv>
            <HeadLines text="Educational Background" />
            <p className='mb-5'>Highest Level of Education Completed</p>
            <FlexDiv>
                <select className='h-12 pl-5 bg-white rounded-xl border border-gray-200 focus:ring-gradientFirst focus:border-0 cursor-pointer md:w-96' onChange={(e) => setEducationLevel(e.currentTarget.value)}>
                    <option value="High School">High School</option>
                    <option value="Diploma/Certificate" className='hover:bg-red-500 cursor-pointer'>Diploma/Certificate</option>
                    <option value="Associate's Degree">Associate's Degree</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="Doctorate">Doctorate</option>
                </select>
                {errorMessage && errorCode == 11 && <p className="text-red-500 text-[13px] w-full mt-2">{errorMessage}</p>}

            </FlexDiv>
            <p className='mb-3'>Field of Study</p>
            <TextInput setFunction={setFieldOfStudy} errorMessage={errorCode == 12 ? errorMessage : ''} value={fieldOfStudy} placeHolder="add field of study" />
            <p className='my-5'>Additional Insights (optional)</p>
            <textarea placeholder='message here' className='w-11/12 rounded-xl h-40 focus:ring-gradientFirst focus:border-0' onChange={(e) => setAdditionalInsight(e.currentTarget.value)}>
            </textarea>
            <p className='my-5'>Leave your email below to get updates</p>
            <TextInput setFunction={setEmailAddress} value={emailAddress} placeHolder="add your email" />
            <div className='flex justify-around w-full flex-wrap gap-y-5 mt-10 pb-10'>
                <button type='reset' className='bg-fadedText border-2 px-8 py-3 border-gray-500 rounded-full text-gray-700 cursor-pointer' >Clear</button>
                {!loading && <button type='submit' className='bg-gradientFirst px-8 py-3 rounded-full text-textW cursor-pointer'>Submit Survey</button>}
                {loading &&
                    <img src={loadingIn} className='w-2/5 h-14 bg-green-500 rounded-full' />
                }
            </div>

        </form >
    )
}

export default SalarySurvey
