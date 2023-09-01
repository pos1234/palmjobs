import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/lib/context';
import { MiddleWare, PostJob } from '@/lib/middleware';
import skillsData from '@/lib/skillData';

import {
    accountData,
    fetchActivePostedJobs,
    fetchAppliedCandidates,
    fetchClosedPostedJobs,
    fetchPausedPostedJobs,
    fetchPostedJobs,
    fetchSinglePostedJobs,
    signOut,
    updateJobStatus,
    updateJobs
} from '@/lib/services';
import dynamic from 'next/dynamic';
interface Data {
    word: string;
}

const Jobs = () => {
    const { loading, user, role } = useUser();
    const router = useRouter();
    const [postedDetails, setPostedDetails] = useState<any>();
    const [pausedDetails, setPausedDetails] = useState<any>();
    const [closedDetails, setClosedDetails] = useState<any>();
    const [editedJobs, setEditedJobs] = useState<any>();
    const [editJob, setEditJob] = useState(false);
    const [jobStat, setJobStat] = useState('');
    const [jobId, setJobId] = useState('');
    const [sure, setSure] = useState(false);
    const [active, setActive] = useState(true);
    const [paused, setPaused] = useState(false);
    const [closed, setClosed] = useState(false);
    /* start */
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
        //console.log(skillsArray);
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
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Data[]>([]);
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
    /* end */

    useEffect(() => {
        const cand = !(role == '' || role == 'employer') ? true : false;
        if ((!user && !loading) || cand) {
            router.push('/account/signIn');
        }
    }, [user, loading, role]);
    useEffect(() => {
        const jobDetail = fetchActivePostedJobs(user);
        jobDetail.then((res) => setPostedDetails(res.documents));
        const pausedDetail = fetchPausedPostedJobs(user);
        pausedDetail.then((res) => setPausedDetails(res.documents));
        const closedDetail = fetchClosedPostedJobs(user);
        closedDetail.then((res) => setClosedDetails(res.documents));
    }, [user]);
    const updateJob = (id: string) => {
        const getJob = fetchSinglePostedJobs(id);
        getJob.then((res) => {
            setJobTitle(res.documents[0].jobTitle);
            setCategory(res.documents[0].jobIndustry);
            setOpenRoles(res.documents[0].openPositions);
            setLocation(res.documents[0].jobLocation);
            setJobType(res.documents[0].jobType);
            setReqExp(res.documents[0].expreienceLevel);
            setSkillsArray(res.documents[0].requiredSkills && JSON.parse(res.documents[0].requiredSkills));
            setSkills(res.documents[0].requiredSkills);
            setSalary(res.documents[0].salaryRange);
            setJobDes(res.documents[0].jobDescription);
            setDeadline(res.documents[0].applicationDeadline);
            setGender(res.documents[0].prefferedGender);
            setEducationLevel(res.documents[0].educationLevel);
            /*         setEmail(res.documents[0].emailApplication && res.documents[0].emailApplication);
            setExternalLink(res.documents[0].externalLink && res.documents[0].externalLink); */
            /*  setMaxSalary(res.documents[0].);
            setMinSalary(res.documents[0].); */
        });
        setEditJob(true);
    };
    const updatePost = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        // console.log(jobId);

        setSkills(JSON.stringify(skillsArray));
        const rsults = updateJobs(
            jobId,
            jobTitle,
            category,
            openRoles,
            location,
            jobType,
            reqExp,
            skills,
            salary,
            deadline,
            gender,
            educationLevel
        );
        rsults.then((res) => {
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
            /*    setEmail('');
            setExternalLink('');
            setSalary('');
            setMaxSalary('');
            setMinSalary(''); */
        });
    };

    return (
        <>
            <div>
                <div>
                    <ul style={{ listStyle: 'none', display: 'flex' }}>
                        <li
                            onClick={() => {
                                setActive(true);
                                setPaused(false);
                                setClosed(false);
                            }}
                        >
                            Active
                        </li>
                        <li
                            style={{ padding: '0 20px' }}
                            onClick={() => {
                                setActive(false);
                                setPaused(true);
                                setClosed(false);
                            }}
                        >
                            Paused
                        </li>
                        <li
                            onClick={() => {
                                setActive(false);
                                setPaused(false);
                                setClosed(true);
                            }}
                        >
                            Closed
                        </li>
                    </ul>
                </div>
                {active && (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>job title</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {postedDetails &&
                                    postedDetails.map((item: any, index: number) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.jobTitle}</td>
                                                <td>
                                                    <select
                                                        onChange={(e) => {
                                                            setJobStat(e.currentTarget.value);
                                                            setSure(true);
                                                            setJobId(item.$id);
                                                        }}
                                                    >
                                                        <option value="Active">Active</option>
                                                        <option value="Pause">Pause</option>
                                                        <option value="Colose">Close</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setJobStat('Delete');
                                                            setSure(true);
                                                            setJobId(item.$id);
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            updateJob(item.$id);
                                                            setJobId(item.$id);
                                                        }}
                                                    >
                                                        Edit Job
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                        {sure && jobStat !== 'Active' && (
                            <div>
                                <p>
                                    Are you sure you want to
                                    {jobStat == 'Pause' ? (
                                        <span> Pause</span>
                                    ) : jobStat == 'Delete' ? (
                                        <span> Delete </span>
                                    ) : (
                                        <span> Close</span>
                                    )}
                                    This job
                                </p>
                                <button onClick={() => setSure(false)}>No</button>
                                <button onClick={() => updateJobStatus(jobId, jobStat)}>Yes</button>
                            </div>
                        )}
                    </>
                )}
                {paused && (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>job title</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pausedDetails &&
                                    pausedDetails.map((item: any, index: number) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.jobTitle}</td>
                                                <select
                                                    onChange={(e) => {
                                                        setJobStat(e.currentTarget.value);
                                                        setSure(true);
                                                        setJobId(item.$id);
                                                    }}
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Close">Close</option>
                                                </select>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                        {sure && jobStat !== 'Pause' && (
                            <div>
                                <p>
                                    Are you sure you want to
                                    {jobStat == 'Active' ? <span> Activate</span> : <span> Close</span>}
                                    This job
                                </p>
                                <button onClick={() => setSure(false)}>No</button>
                                <button onClick={() => updateJobStatus(jobId, jobStat)}>Yes</button>
                            </div>
                        )}
                    </>
                )}
                {closed && (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>job title</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {closedDetails &&
                                    closedDetails.map((item: any, index: number) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.jobTitle}</td>
                                                <select
                                                    onChange={(e) => {
                                                        setJobStat(e.currentTarget.value);
                                                        setSure(true);
                                                        setJobId(item.$id);
                                                    }}
                                                >
                                                    <option value="Active">Active</option>
                                                </select>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                        {sure && jobStat !== 'Pause' && (
                            <div>
                                <p>
                                    Are you sure you want to
                                    {jobStat == 'Close' && <span> Activate</span>}
                                    This job
                                </p>
                                <button onClick={() => setSure(false)}>No</button>
                                <button onClick={() => updateJobStatus(jobId, jobStat)}>Yes</button>
                            </div>
                        )}
                    </>
                )}
                {editJob && (
                    <div>
                        <form onSubmit={updatePost}>
                            <p>job title</p>
                            <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.currentTarget.value)} />
                            <p>job sector</p>
                            <select value={category} onChange={(e) => setCategory(e.currentTarget.value)}>
                                <option value="medicine">medicine</option>
                                <option value="It">It</option>
                                <option value="Industries">Industries</option>
                            </select>
                            <p>Open Roles</p>
                            <input value={openRoles} type="number" onChange={(e) => setOpenRoles(e.currentTarget.value)} />
                            <p>job Location</p>
                            <input value={location} type="text" onChange={(e) => setLocation(e.currentTarget.value)} />
                            <p>job Type</p>
                            Internship
                            <input
                                type="radio"
                                checked={jobType == 'internship'}
                                name="jobType"
                                value="internship"
                                onChange={(e) => setJobType(e.currentTarget.value)}
                            />
                            FullTime{' '}
                            <input
                                type="radio"
                                checked={jobType == 'FullTime'}
                                name="jobType"
                                value="FullTime"
                                onChange={(e) => setJobType(e.currentTarget.value)}
                            />
                            Part Time
                            <input
                                type="radio"
                                checked={jobType == 'Part Time'}
                                name="jobType"
                                value="Part Time"
                                onChange={(e) => setJobType(e.currentTarget.value)}
                            />
                            Remote
                            <input
                                type="radio"
                                checked={jobType == 'Remote'}
                                name="jobType"
                                value="Remote"
                                onChange={(e) => setJobType(e.currentTarget.value)}
                            />
                            Contract
                            <input
                                type="radio"
                                checked={jobType == 'Contract'}
                                name="jobType"
                                value="Contract"
                                onChange={(e) => setJobType(e.currentTarget.value)}
                            />
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
                            <br />
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
                                            {item} <span onClick={() => deleteSkill(index)}>X</span>
                                        </button>
                                    ))}
                            </div>
                            {/*  <select onChange={(e) => setSalaryOption(e.currentTarget.value)}>
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
                        </select> */}
                            {/* <p>job Description</p>
                        <MyEditor onEditorData={handleEditorData} /> */}
                            <p>job Deadline</p>
                            <input type="date" value={deadline} onChange={(e) => setDeadline(e.currentTarget.value)} />
                            <p>Preffered Gender</p>
                            Male
                            <input
                                checked={gender == 'Male'}
                                type="radio"
                                name="gender"
                                value="Male"
                                onChange={(e) => setGender(e.currentTarget.value)}
                            />
                            <br />
                            Female
                            <input
                                checked={gender == 'Female'}
                                type="radio"
                                name="gender"
                                value="Female"
                                onChange={(e) => setGender(e.currentTarget.value)}
                            />
                            <br />
                            Both Male / Female
                            <input
                                checked={gender == 'Male / Female'}
                                type="radio"
                                name="gender"
                                value="Male / Female"
                                onChange={(e) => setGender(e.currentTarget.value)}
                            />
                            <br />
                            <p>Level of Education</p>
                            <select value={educationLevel} onChange={(e) => setEducationLevel(e.currentTarget.value)}>
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
                            {/* <p>How do you want to receive Applications</p>
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
                        </table> */}
                            {/*  {applicationType == 'external' && (
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
                        )} */}
                            {/*  <button type="button" onClick={() => setPreview(true)}>
                            view preview
                        </button> */}
                            <br />
                            <button type="submit">Update</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default Jobs;
