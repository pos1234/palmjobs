import React, { useState, ReactNode } from 'react'
import TextInput, { SubmitButton } from './TextInput';
import RadioInput from './RadioInput';
import { createSalarySurvey } from '@/lib/employerBackend';
import { toast } from 'react-toastify';
const FlexDiv = ({ children }: { children: ReactNode }) => {
    return <div className='flex flex-wrap gap-x-5'>
        {children}
    </div>
}
const HeadLines = (props: any) => {
    return <p className='font-[600] text-[24px] text-gradientFirst'>{props.text}</p>
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
    const [gender, setGender] = useState('');
    const [ageRange, setAgeRange] = useState('18-24')
    const [jobTitle, setJobTitle] = useState('')
    const [sector, setSector] = useState('Private')
    const [industry, setIndustry] = useState('Agriculture')
    const [employmentStatus, setEmploymentStatus] = useState('Full Time')
    const [yearsInCurrentPostion, setYearsInCurrentPostion] = useState('')
    const [yearsInProfessionalPosition, setYearsInProfessionalPosition] = useState('')
    const [location, setLocation] = useState('Addis Ababa')
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
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const handleCheckboxChange = (value: string) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter((val) => val !== value));
        } else {
            setSelectedValues([...selectedValues, value]);
        }
    };
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
        } /* else if (employmentStatus == '') {
            setErrorCode(6);
            setErrorMessage('Please Select Employment Status');
        } */ else if (yearsInCurrentPostion == '') {
            setErrorCode(7);
            setErrorMessage('Please Add Years In Current Position');
        } else if (yearsInProfessionalPosition == '') {
            setErrorCode(8);
            setErrorMessage('PleaseAdd Years In Professional Position ');
        } /* else if (location == '') {
            setErrorCode(9);
            setErrorMessage('Please Add Location');
        } */ else if (monthlySalary == '') {
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
                JSON.stringify(selectedValues),
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
        <form className='w-full h-full py-10 pl-5 flex flex-col gap-8' onSubmit={handleSubmit}>
            <p className='flex font-[600] text-[27px]'>Salary Survey</p>
            <HeadLines text='Basic Information' />
            <div className='flex flex-col justify-between gap-5'>
                <div className='flex flex-col gap-5'>
                    <p className='font-[600] text-[18px]'>Gender</p>
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
                <div className='flex flex-col gap-5'>
                    <p className='font-[600] text-[18px]'>Age Range</p>
                    <FlexDiv>
                        <select className='pl-5 w-96 bg-white rounded-xl border border-gray-200 focus:ring-gradientFirst focus:border-0 cursor-pointer' onChange={(e) => setAgeRange(e.currentTarget.value)}>
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
            <div className='flex flex-col gap-4'>
                <div className='gap-5 flex flex-col'>
                    <p className='font-[600] text-[18px]'>Current Job Title</p>
                    <TextInput setFunction={setJobTitle} value={jobTitle} errorMessage={errorCode == 3 ? errorMessage : ''} placeHolder="add job title" />
                </div>
                <div className='gap-5 flex flex-col'>
                    <p className='font-[600] text-[18px]'>Employment Sector</p>
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
                </div>
                <div className='gap-5 flex flex-col'>
                    <p className='font-[600] text-[18px]'>Industry</p>
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
                </div>
                <div className='gap-5 flex flex-col'>
                    <p className='font-[600] text-[18px]'>Employment Status</p>
                    <FlexDiv>
                        <select className='h-12 pl-5 bg-white rounded-xl border border-gray-200 focus:ring-gradientFirst focus:border-0 cursor-pointer md:w-96' onChange={(e) => setEmploymentStatus(e.currentTarget.value)}>
                            <option value="Full Time">Full Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Contract">Contract</option>
                            <option value="Freelance">Freelance</option>
                        </select>
                        {/* <RadioInput
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
                        /> */}
                        {errorMessage && errorCode == 6 && <p className="text-red-500 w-full text-[13px] mt-2">{errorMessage}</p>}
                    </FlexDiv>
                </div>
                <div className='gap-5 flex flex-col'>
                    <p className='font-[600] text-[18px]'>Number of Years in Current Postion</p>
                    <input value={yearsInCurrentPostion} className='h-12 pl-5 bg-white rounded-xl border border-gray-200 focus:ring-gradientFirst focus:border-0 w-full md:w-96 hideIncrease' type='number' onChange={(e) => {
                        if (e.currentTarget.value.length <= 2) {
                            setYearsInCurrentPostion(e.currentTarget.value)
                        }

                    }} />
                    {errorMessage && errorCode == 7 && <p className="text-red-500 text-[13px] w-full mt-2">{errorMessage}</p>}
                </div>
                <div className='gap-5 flex flex-col'>
                    <p className='font-[600] text-[18px]'>Number of Years in Professional Feild</p>
                    <input value={yearsInProfessionalPosition} className='h-12 pl-5 bg-white rounded-xl border border-gray-200 focus:ring-gradientFirst focus:border-0 w-full md:w-96 hideIncrease' type='number' onChange={(e) => {
                        if (e.currentTarget.value.length <= 2) {
                            setYearsInProfessionalPosition(e.currentTarget.value)
                        }
                    }} />
                    {errorMessage && errorCode == 8 && <p className="text-red-500 text-[13px] w-full mt-2">{errorMessage}</p>}
                </div>
                <div className='gap-5 flex flex-col'>
                    <p className='font-[600] text-[18px]'>Location of Employment</p>
                    <select className='h-12 pl-5 bg-white rounded-xl border border-gray-200 focus:ring-gradientFirst focus:border-0 cursor-pointer md:w-96' onChange={(e) => setEmploymentStatus(e.currentTarget.value)}>
                        <option value="Addis Ababa">Addis Ababa</option>
                        <option value="Dire Dawa">Dire Dawa</option>
                        <option value="Mekelle">Mekelle</option>
                        <option value="Gondar">Gondar</option>
                        <option value="Awasa">Awasa</option>
                        <option value="Dessie">Dessie</option>
                        <option value="Jimma">Jimma</option>
                        <option value="Jijiga">Jijiga</option>
                        <option value="Shashamane">Shashamane</option>
                        <option value="Arba Minch">Arba Minch</option>
                        <option value="Hosaena">Hosaena</option>
                        <option value="Sodo">Sodo</option>
                        <option value="Adama">Adama</option>
                        <option value="Bishoftu">Bishoftu</option>
                    </select>
                </div>
            </div>
            <HeadLines text="Salary and Compensation" />
            <div className='gap-4 flex flex-col'>
                <div className='gap-5 flex flex-col'>
                    <p className='font-[600] text-[18px]'>Monthly Salary</p>
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
                </div>
                <div className='gap-5 flex flex-col'>
                    <p className='font-[600] text-[18px]'>Additional Monthly Allowances and Bonuses <span className='font-[400] text-sm'>(if any)</span> </p>
                    <input className='h-12 pl-5 bg-white rounded-xl border border-gray-200 focus:ring-gradientFirst focus:border-0 w-full md:w-96' type='number' onChange={(e) => setBonus(e.currentTarget.value)} />
                </div>
                <div className='gap-5 flex flex-col'>
                    <p className='font-[600] text-[18px]'>Benefits Included <span className='font-[400] text-sm'>(Check all that apply)</span> </p>
                    <FlexDiv>
                        <div className='flex flex-col flex-wrap gap-5'>
                            <CheckBoxInput radioName="Benefit"
                                radioText="Health Insurance"
                                radioValue="Health Insurance"
                                setFunction={handleCheckboxChange} />
                            <CheckBoxInput radioName="Benefit"
                                radioText="Retirement Plan"
                                radioValue="Retirement Plan"
                                setFunction={handleCheckboxChange} />
                            <CheckBoxInput radioName="Benefit"
                                radioText="Housing Allowance"
                                radioValue="Housing Allowance"
                                setFunction={handleCheckboxChange} />
                            <CheckBoxInput radioName="Benefit"
                                radioText="Transportation Allowance"
                                radioValue="Transportation Allowance"
                                setFunction={handleCheckboxChange} />
                        </div>
                        <div className='flex flex-col flex-wrap gap-5'>
                            <CheckBoxInput radioName="Benefit"
                                radioText="Meal Allowance"
                                radioValue="Meal Allowance"
                                setFunction={handleCheckboxChange} />
                            <CheckBoxInput radioName="Benefit"
                                radioText="Education Allowance"
                                radioValue="Education Allowance"
                                setFunction={handleCheckboxChange} />
                            <CheckBoxInput radioName="Benefit"
                                radioText="Other"
                                radioValue="Other"
                                setFunction={handleCheckboxChange} />
                        </div>
                    </FlexDiv>
                </div>
            </div>
            <HeadLines text="Educational Background" />
            <div className='gap-4 flex flex-col'>
                <div className='gap-5 flex flex-col'>
                    <p className='font-[600] text-[18px]'>Highest Level of Education Completed</p>
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
                </div>
                <div className='gap-5 flex flex-col'>
                    <p className='font-[600] text-[18px]'>Field of Study</p>
                    <TextInput setFunction={setFieldOfStudy} errorMessage={errorCode == 12 ? errorMessage : ''} value={fieldOfStudy} placeHolder="add field of study" />
                </div>
                <div className='gap-5 flex flex-col'>
                    <p className='font-[600] text-[18px]'>Additional Insights <span className='font-[400] text-sm'>(optional)</span> </p>
                    <textarea
                        placeholder='Any other comments or insights about your role and compensation?'
                        className='resize-none w-11/12 rounded-xl h-40 focus:ring-gradientFirst focus:border-0' onChange={(e) => setAdditionalInsight(e.currentTarget.value)}>
                    </textarea>
                </div>
                <div className='gap-5 flex flex-col'>
                    <div className='font-[600] text-[18px]' title="Interested in the final salary report? Provide your email to get it upon release - its's optional! We respect your privacy: your email is just for the report and won't be shared or used for marketing">Leave your email below to get updates <span className='font-[400] text-sm'> (optional)</span>
                        <p className='text-[12px] w-96 text-gray-400'>Interested in the final salary report? Provide your email to get it upon release - its's optional! We respect your privacy: your email is just for the report and won't be shared or used for marketing.</p>
                    </div>
                    <input
                        type='email'
                        placeholder="add your email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.currentTarget.value)}
                        className="h-12 pl-5 bg-white rounded-xl border border-gray-200 focus:ring-gradientSecond focus:border-0 w-full md:w-96" />
                    {/*                     <TextInput setFunction={setEmailAddress} value={emailAddress} placeHolder="add your email" />
 */}                </div>
            </div>
            <div className='flex justify-between items-center w-full gap-5 max-md:flex-col xl:pr-14 pb-24'>
                <button type='reset' className='w-full sm:w-[247px] h-[56px] rounded-[12px] bg-[#F4F4F4]' >Clear</button>
                <div className='flex max-sm:w-full'>
                    <div className='w-full md:w-52'>
                        <SubmitButton loading={loading} buttonText="Submit" />
                    </div>
                </div>
            </div>
        </form >
    )
}

export default SalarySurvey
