import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/lib/context';
import { MiddleWare, PostJob } from '@/lib/middleware';
import dynamic from 'next/dynamic';

import { accountData, deleteProfileImage, getProfilePicture, postJobs } from '@/lib/services';
import skillsData from '@/lib/skillData';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
});
interface Data {
    word: string;
}
const Profile = () => {
    const router = useRouter();
    const [compName, setCompName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [category, setCategory] = useState('');
    const [openRoles, setOpenRoles] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('');
    const [reqExp, setReqExp] = useState('');
    const [skillsArray, setSkillsArray] = useState<string[]>([]);
    const [skills, setSkills] = useState('');
    const [salary, setSalary] = useState('');
    const [jobDes, setJobDes] = useState('');
    const [deadline, setDeadline] = useState('');
    const [gender, setGender] = useState('');
    const [educationLevel, setEducationLevel] = useState('');
    const [email, setEmail] = useState('');
    const [externalLink, setExternalLink] = useState('');
    const addSuggestedSkill = async (suggesteSkill: string) => {
        skillsArray.push(suggesteSkill);
        setSkills('');
        console.log(skillsArray);
    };
    const deleteSkill = (index: number) => {
        const newArray = skillsArray.filter((item, i) => i !== index);
        setSkillsArray(newArray);
        /*         updateSkills(newArray, documentId);
         */
    };
    const [salaryOption, setSalaryOption] = useState('Range');
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [yearlyOption, setYearlyOption] = useState('Month');
    const [applicationType, setApplicationType] = useState('');
    const [preview, setPreview] = useState(false);
    const userData: any = accountData();
    const items: Data[] = skillsData;
    /* const {
        compName,
        setCompName,
        jobTitle,
        setJobTitle,
        category,
        setCategory,
        openRoles,
        setOpenRoles,
        location,
        setLocation,
        jobType,
        setJobType,
        reqExp,
        setReqExp,
        skills,
        setSkills,
        skillsArray,
        setSkillsArray,
        addSuggestedSkill,
        deleteSkill,
        salary,
        setSalary,
        jobDes,
        setJobDes,
        deadline,
        setDeadline,
        gender,
        setGender,
        educationLevel,
        setEducationLevel,
        email,
        setEmail,
        externalLink,
        setExternalLink,

        postAjob
    } = PostJob(); */
    const { loading, user, role } = useUser();
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Data[]>([]);

    useEffect(() => {
        if (salaryOption == 'Range') {
            const minMax = minSalary + ' - ' + maxSalary;
            setSalary(minMax + ' per ' + yearlyOption);
        } else if (salaryOption == 'Starting amount' || 'Exact amount' || 'Maximum amount') {
            setSalary(minSalary + ' per ' + yearlyOption);
        } else {
            setSalary('');
        }
    }, [salary, minSalary, maxSalary, yearlyOption]);
    const handleEditorData = (data: any) => {
        setJobDes(data);
        //console.log(workHistoryData.jobDescription);
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setSearchTerm(inputValue);
        const filteredSuggestions = items.filter((data) => data.word.toLowerCase().includes(inputValue.toLowerCase()));
        setSuggestions(filteredSuggestions);
    };
    const handleSuggestionClick = (suggestion: Data) => {
        setSearchTerm('');
        addSuggestedSkill(suggestion.word);
        setSearchTerm('');
        setSuggestions([]);
    };
    const clickMe = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        addSuggestedSkill(searchTerm);
        setSearchTerm('');
    };
    /* useEffect(() => {
        console.log('by email ' + email);
        console.log('by external ' + externalLink);
    }, [email, externalLink]); */
    useEffect(() => {
        const cand = !(role == '' || role == 'employer') ? true : false;
        if ((!user && !loading) || cand) {
            router.push('/account/signIn');
        }
    }, [user, loading, role]);
    const handlePost = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setSkills(JSON.stringify(skillsArray));
        const abebe = postJobs(
            jobTitle,
            category,
            openRoles,
            location,
            jobType,
            reqExp,
            skills,
            salary,
            jobDes,
            deadline,
            gender,
            educationLevel,
            email,
            externalLink
        );
        abebe.then((res) => {
            setCompName('');
            setJobTitle('');
            setCategory('');
            setOpenRoles('');
            setLocation('');
            setJobType('');
            setReqExp('');
            setSkillsArray([]);
            setSkills('');
            setSalary('');
            setJobDes('');
            setDeadline('');
            setGender('');
            setEducationLevel('');
            setEmail('');
            setExternalLink('');
            setSalary('');
            setMaxSalary('');
            setMinSalary('');
        });
    };
    return (
        <>
            <form onSubmit={handlePost}>
                <p>job title</p>
                <input type="text" onChange={(e) => setJobTitle(e.currentTarget.value)} />
                <p>job sector</p>
                <select onChange={(e) => setCategory(e.currentTarget.value)}>
                    <option value="medicine">medicine</option>
                    <option value="It">It</option>
                    <option value="Industries">Industries</option>
                </select>
                <p>Open Roles</p>
                <input type="number" onChange={(e) => setOpenRoles(e.currentTarget.value)} />
                <p>job Location</p>
                <input type="text" onChange={(e) => setLocation(e.currentTarget.value)} />
                <p>job Type</p>
                Internship <input type="radio" name="jobType" value="internship" onChange={(e) => setJobType(e.currentTarget.value)} />
                FullTime <input type="radio" name="jobType" value="FullTime" onChange={(e) => setJobType(e.currentTarget.value)} />
                Part Time <input type="radio" name="jobType" value="Part Time" onChange={(e) => setJobType(e.currentTarget.value)} />
                Remote
                <input type="radio" name="jobType" value="Remote" onChange={(e) => setJobType(e.currentTarget.value)} />
                Contract
                <input type="radio" name="jobType" value="Contract" onChange={(e) => setJobType(e.currentTarget.value)} />
                <p>What experience level is required</p>
                <button type="button" onClick={() => setReqExp('No experience')}>
                    + No experience
                </button>
                <button type="button" onClick={() => setReqExp('under 1 year')}>
                    + Under year
                </button>
                <button type="button" onClick={() => setReqExp('1 year')}>
                    + 1 year
                </button>
                <button type="button" onClick={() => setReqExp('2 year')}>
                    + 2 year
                </button>
                <button type="button" onClick={() => setReqExp('3 year')}>
                    + 3 year
                </button>
                <button type="button" onClick={() => setReqExp('4 year')}>
                    + 4 year
                </button>
                <button type="button" onClick={() => setReqExp('5 year')}>
                    + 5 year
                </button>
                <button type="button" onClick={() => setReqExp('6 year')}>
                    + 6 year
                </button>
                <button type="button" onClick={() => setReqExp('7 year')}>
                    + 7 year
                </button>
                <button type="button" onClick={() => setReqExp('8 year')}>
                    + 8 year
                </button>
                <button type="button" onClick={() => setReqExp('9 year')}>
                    + 9 year
                </button>
                <button type="button" onClick={() => setReqExp('10+ year')}>
                    + 10+ year
                </button>
                {reqExp && <button type="button">{reqExp}</button>}
                <div>
                    <input type="text" placeholder="Search..." value={searchTerm} onChange={handleInputChange} />
                    <ul>
                        {suggestions &&
                            suggestions.map((suggestion) => (
                                <li key={suggestion.word} onClick={() => handleSuggestionClick(suggestion)}>
                                    {suggestion.word}
                                </li>
                            ))}
                    </ul>
                    {skillsArray &&
                        skillsArray.map((item: string, index: number) => (
                            <button type="button" style={{ marginRight: '10px' }} key={index}>
                                {item} <span onClick={() => deleteSkill(index)}>X</span>{' '}
                            </button>
                        ))}
                </div>
                <select onChange={(e) => setSalaryOption(e.currentTarget.value)}>
                    <option value="Range">Range</option>
                    <option value="Starting amount">Starting amount</option>
                    <option value="Maximum amount">Maximum amount</option>
                    <option value="Exact amount">Exact amount</option>
                </select>
                <input
                    type="number"
                    placeholder={
                        salaryOption == 'Range' || salaryOption == 'Starting amount'
                            ? 'minimum value'
                            : salaryOption == 'Exact amount'
                            ? 'Exact amount'
                            : 'Maximum amount'
                    }
                    onChange={(e) => setMinSalary(e.currentTarget.value)}
                />
                {salaryOption == 'Range' && (
                    <input type="number" placeholder="maximum value" onChange={(e) => setMaxSalary(e.currentTarget.value)} />
                )}
                <select onChange={(e) => setYearlyOption(e.currentTarget.value)}>
                    <option value="Month">Month</option>
                    <option value="Year">Year</option>
                </select>
                <p>job Description</p>
                <ReactQuill
                    theme="snow"
                    value={jobDes}
                    onChange={(e) => {
                        const inputValue = e;
                        /*                         if (inputValue.length < coverMaxCharacters) {
                         */ setJobDes(inputValue);
                        /* } */
                    }}
                />
                {/*  <MyEditor onEditorData={handleEditorData} /> */}
                <p>job Deadline</p>
                <input type="date" onChange={(e) => setDeadline(e.currentTarget.value)} />
                <p>Preffered Gender</p>
                Male
                <input type="radio" name="gender" value="Male" onChange={(e) => setGender(e.currentTarget.value)} /> <br />
                Female
                <input type="radio" name="gender" value="Female" onChange={(e) => setGender(e.currentTarget.value)} /> <br />
                Both Male / Female
                <input type="radio" name="gender" value="Male / Female" onChange={(e) => setGender(e.currentTarget.value)} /> <br />
                <p>Level of Education</p>
                <select onChange={(e) => setEducationLevel(e.currentTarget.value)}>
                    <option value="Anyone">Anyone</option>
                    <option value="High School Diploma">High School Diploma</option>
                    <option value="Vocational Training/Certificate">Vocational Training/Certificate</option>
                    <option value="Associate Degrer">Associate Degrer</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Postgraduate Certificate/Diploma">Postgraduate Certificate/Diploma</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="Professional Degree">Professional Degree</option>
                    <option value="Doctorate (PhD)">Doctorate (PhD)</option>
                    <option value="Post-Doctorate">Post-Doctorate</option>
                </select>
                <p>How do you want to receive Applications</p>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <button type="button" onClick={() => setApplicationType('internall')}>
                                    Internally
                                </button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setApplicationType('external');
                                        setEmail('');
                                    }}
                                >
                                    Add External Link
                                </button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setApplicationType('email');
                                        setExternalLink('');
                                    }}
                                >
                                    By Email
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {applicationType == 'external' && (
                    <>
                        <p>job externalLink</p>
                        <input type="text" onChange={(e) => setExternalLink(e.currentTarget.value)} />
                    </>
                )}
                {applicationType == 'email' && (
                    <>
                        <p>job email</p>
                        <input type="email" onChange={(e) => setEmail(e.currentTarget.value)} />
                    </>
                )}
                <button type="button" onClick={() => setPreview(true)}>
                    view preview
                </button>
                <button type="submit">submit</button>
                {preview && (
                    <div>
                        <button type="button" onClick={() => setPreview(false)}>
                            X
                        </button>
                        <p>{userData.name}</p>
                        <p>{jobTitle}</p>
                        <p>{category}</p>
                        <p>{openRoles}</p>
                        <p>{location}</p>
                        <p>{jobType}</p>
                        <p>{reqExp}</p>
                        {skills &&
                            JSON.parse(skills).map((item: string, index: number) => {
                                return (
                                    <button type="button" key={index}>
                                        {item}
                                    </button>
                                );
                            })}
                        {/* <p>{skills}</p> */}
                        <p>{salary}</p>
                        {/* <div style={{ paddingLeft: '20px' }}>{parse(jobDes)}</div> */}
                        <p>{deadline}</p>
                        <p>{gender}</p>
                        <p>{educationLevel}</p>
                        <p>{email}</p>
                        <p>{externalLink}</p>
                    </div>
                )}
            </form>
        </>
    );
};

export default Profile;
