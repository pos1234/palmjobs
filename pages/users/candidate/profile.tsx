import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/lib/context';
import { MiddleWare } from '@/lib/middleware';
import parse from 'html-react-parser';
import dynamic from 'next/dynamic';
import { accountData, deleteProfileImage, getProfilePicture } from '@/lib/services';
import skillsData from '@/lib/skillData';
const MyEditor = dynamic(() => import('../../../components/Edit'), {
    ssr: false
});
const EditContent = dynamic(() => import('../../../components/Edit'), {
    ssr: false
});
interface Data {
    word: string;
}
type myState = number | null;
const Profile = () => {
    const router = useRouter();
    const [displayCertificate, setDisplayCertificate] = useState(false);
    const [displayEducation, setDisplayEducation] = useState(false);
    const [displayWorkHisotry, setDisplayWorkHistory] = useState(false);
    const [displayProject, setDisplayProject] = useState(false);
    const [linkedAdd, setLinkedAdd] = useState(false);
    const [callAdd, setCallAdd] = useState(false);
    const [githubAdd, setGithubAdd] = useState(false);
    const userData: any = accountData();
    const items: Data[] = skillsData;
    /*     const items: Data[] = [{ word: 'react' }, { word: 'react-Native' }, { word: 'react.js' }, { word: 'Angular' }, { word: 'banana' }];
     */ const {
        firstLetter,
        headline,
        setHeadline,
        description,
        setDescription,
        skill,
        setSkill,
        file,
        setFile,
        projectFile,
        setProjectFile,
        profilePictureId,
        setProfilePictureId,
        array,
        setArray,
        certificateArray,
        setCertificateArray,
        certificateData,
        setCertificateData,
        image,
        setImage,
        isChecked,
        setIsChecked,
        workHistoryArray,
        setWorkHistoryArray,
        workHistoryData,
        setWorkHistoryData,
        editedWork,
        setEditedWork,
        workIndex,
        setWorkIndex,
        workEdit,
        setWorkEdit,
        uploadProfilePicture,
        updateProfilePicture,
        deleteProfilePicture,
        handleBio,
        /*         addSkills,
         */ addSuggestedSkill,
        deleteSkill,
        certificateEdit,
        setCertificateEdit,
        certificateIndex,
        setCertificateIndex,
        projectIndex,
        setProjectIndex,
        projectEdit,
        setProjectEdit,
        projectsArray,
        setProjectsArray,
        projectData,
        setProjectData,
        editedProject,
        setEditedProject,
        editedCertificate,
        setEditedCertificate,
        educationIndex,
        setEducationIndex,
        education,
        setEducation,
        EditEducation,
        addProject,
        editProject,
        deleteProject,
        setEditEducation,
        educationArray,
        setEducationArray,
        EditedEducation,
        setEditedEducation,
        addCertificate,
        editCertificate,
        deleteCertificate,
        addWorkHistory,
        editWorkHistory,
        deleteWorkHistory,
        addEducation,
        editEducations,
        deleteEducation,
        changeUserName,
        editedName,
        setEditedName,
        editName,
        setEditName,
        github,
        setGithub,
        linkedIn,
        linked,
        setLinked,
        setLinkedIn,
        addLinkedIn,
        deleteLinkedIn,
        addGithub,
        deleteGithub,
        githubLink,
        setGithubLink,
        addResume,
        resume,
        setResume,
        resumeId,
        inputResume,
        setInputResume,
        phone,
        call,
        setCall,
        setPhone,
        addPhone,
        deletePhone
    } = MiddleWare();
    const { loading, user, role } = useUser();
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Data[]>([]);
    const [approveDeleteSkill, setApproveDeleteSkill] = useState<myState>(null);
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
    const showCertificate = () => {
        setDisplayCertificate(!displayCertificate);
    };
    const showProject = () => {
        setDisplayProject(!displayProject);
    };
    const showEducation = () => {
        setDisplayEducation(!displayEducation);
    };
    const showWorkHistory = () => {
        setDisplayWorkHistory(!displayWorkHisotry);
    };
    useEffect(() => {
        const cand = !(role == '' || role == 'candidate') ? true : false;
        if ((!user && !loading) || cand) {
            router.push('/account/signIn');
        }
    }, [user, loading, role]);
    const editWork = (index: number) => {
        //console.log(workHistoryArray[index]);
        setWorkEdit(true);
        setWorkIndex(index);
        setEditedWork(workHistoryArray[index]);
    };
    const indexProjects = (index: number) => {
        //console.log(workHistoryArray[index]);
        setProjectEdit(true);
        setProjectIndex(index);
        setEditedProject(projectsArray[index]);
    };
    const indexEducation = (index: number) => {
        setEditEducation(true);
        setEducationIndex(index);

        //console.log(educationArray[index]);
        setEditedEducation(educationArray[index]);
        // console.log(EditedEducation);
    };
    const indexCertificate = (index: number) => {
        setCertificateEdit(true);
        setCertificateIndex(index);
        setEditedCertificate(certificateArray[index]);
    };
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };
    const handleEditorData = (data: any) => {
        setWorkHistoryData({ ...workHistoryData, jobDescription: data });
        //console.log(workHistoryData.jobDescription);
    };
    const sureDeleteSkill = (index: number) => {
        setApproveDeleteSkill(index);
    };
    const projectImage = (id: string) => {
        const { href } = getProfilePicture(id);
        return href;
    };
    const editUserName = () => {
        setEditName(true);
    };
    return (
        <>
            {userData && !editName && (
                <h1>
                    {userData.name}
                    <button onClick={editUserName}>edit</button>
                </h1>
            )}
            {editName && (
                <form onSubmit={changeUserName}>
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => {
                            setEditedName(e.currentTarget.value);
                        }}
                    />
                    <button type="submit">sumbit</button>
                </form>
            )}
            <h1>{userData && userData.email}</h1>
            {linkedIn && (
                <>
                    <p>{linkedIn}</p>
                    <button onClick={deleteLinkedIn}>delete</button>
                </>
            )}
            {!linkedIn && !linkedAdd && <button onClick={() => setLinkedAdd(true)}>LinkedIn +</button>}
            {!linkedIn && linkedAdd && (
                <form onSubmit={addLinkedIn}>
                    <input
                        type="text"
                        value={linked}
                        onChange={(e) => {
                            setLinked(e.currentTarget.value);
                        }}
                    />
                    <button type="submit">sumbit</button>
                </form>
            )}{' '}
            <br />
            {phone && (
                <>
                    <p>{phone}</p>
                    <button onClick={deletePhone}>delete</button>
                </>
            )}
            {!phone && !callAdd && <button onClick={() => setCallAdd(true)}>Phone +</button>}
            {!phone && callAdd && (
                <form onSubmit={addPhone}>
                    <input
                        type="text"
                        value={call}
                        onChange={(e) => {
                            setCall(e.currentTarget.value);
                        }}
                    />
                    <button type="submit">sumbit</button>
                </form>
            )}
            <br />
            <br />
            {github && (
                <>
                    <p>{github}</p>
                    <button onClick={deleteGithub}>delete</button>
                </>
            )}
            {!github && !githubAdd && <button onClick={() => setGithubAdd(true)}>Github +</button>}
            {!github && githubAdd && (
                <form onSubmit={addGithub}>
                    <input
                        type="text"
                        value={githubLink}
                        onChange={(e) => {
                            setGithubLink(e.currentTarget.value);
                        }}
                    />
                    <button type="submit">sumbit</button>
                </form>
            )}
            {!resumeId && !inputResume && <button onClick={() => setInputResume(true)}>upload resume</button>}
            {!resumeId && inputResume && (
                <form onSubmit={addResume}>
                    <input
                        type="file"
                        onChange={(e) => {
                            setResume(e.currentTarget.files);
                        }}
                    />
                    <button type="submit">sumbit</button>
                </form>
            )}
            {image ? (
                <>
                    <img src={image} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    <form onSubmit={updateProfilePicture}>
                        <input type="file" onChange={(e) => setFile(e.currentTarget.files)} />
                        <button type="submit">update profile</button>
                    </form>
                    <button onClick={deleteProfilePicture}>delete profile</button>
                </>
            ) : (
                <>
                    <p
                        style={{
                            background: 'red',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            textAlign: 'center',
                            fontSize: '2rem',
                            color: 'white',
                            textTransform: 'uppercase'
                        }}
                    >
                        {firstLetter}
                    </p>
                    <form onSubmit={uploadProfilePicture}>
                        <input type="file" onChange={(e) => setFile(e.currentTarget.files)} />
                        <button type="submit">add Profile</button>
                    </form>{' '}
                </>
            )}
            <form style={{ margin: '10%' }} onSubmit={handleBio}>
                <input
                    value={headline}
                    required
                    type="text"
                    onChange={(e: React.FormEvent<HTMLInputElement>) => setHeadline(e.currentTarget.value)}
                />
                <br />
                <textarea value={description} required onChange={(e) => setDescription(e.currentTarget.value)} />
                <br />
                <button type="submit">save bio</button>
            </form>
            <form style={{ margin: '10%' }} onSubmit={clickMe}>
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
                </div>
                <button type="submit">save skill</button>
            </form>
            {array.map((item, index) => (
                <button style={{ marginRight: '10px' }} key={index}>
                    {item} <span onClick={() => sureDeleteSkill(index)}>X</span>{' '}
                </button>
            ))}
            {approveDeleteSkill != null && (
                <div>
                    <p>Are you sure you want to delete skill {array[approveDeleteSkill]} ?</p>
                    <button onClick={() => setApproveDeleteSkill(null)}>No</button>
                    <button
                        onClick={() => {
                            deleteSkill(approveDeleteSkill);
                            setApproveDeleteSkill(null);
                        }}
                    >
                        Yes
                    </button>
                </div>
            )}
            <br />
            {/* <button onClick={handleLogout}>logout</button> <br/><br/> */}
            <table>
                <tbody>
                    <tr>
                        <td>
                            <ul>
                                {certificateArray &&
                                    certificateArray.map((item, index) => (
                                        <li key={index}>
                                            <h2>{item.name}</h2>
                                            <p>{item.issuedBy}</p>
                                            <p>{item.year}</p>
                                            <button onClick={() => indexCertificate(index)}>edit</button>
                                        </li>
                                    ))}
                            </ul>
                        </td>
                        <td>
                            {certificateEdit && (
                                <form style={{ margin: '10%' }} onSubmit={editCertificate}>
                                    <p>Certificate Name</p>
                                    <input
                                        required
                                        value={editedCertificate.name}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedCertificate({ ...editedCertificate, name: e.currentTarget.value })
                                        }
                                    />
                                    <br />
                                    <br />
                                    <p>Certificate Issued By</p>
                                    <input
                                        required
                                        value={editedCertificate.issuedBy}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedCertificate({ ...editedCertificate, issuedBy: e.currentTarget.value })
                                        }
                                    />
                                    <br />
                                    <br />
                                    <p>year Issued</p>
                                    <input
                                        required
                                        value={editedCertificate.year}
                                        type="date"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedCertificate({ ...editedCertificate, year: e.currentTarget.value })
                                        }
                                    />
                                    <br />
                                    <br />
                                    <button type="submit">update certificate</button>
                                    <button type="button" onClick={deleteCertificate}>
                                        delete certificate
                                    </button>
                                </form>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            <br /> <br />
            <button onClick={showCertificate}>add certificate</button>
            {displayCertificate && (
                <form style={{ margin: '10%' }} onSubmit={addCertificate}>
                    <p>Certificate Name</p>
                    <input
                        required
                        value={certificateData.name}
                        type="text"
                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            setCertificateData({ ...certificateData, name: e.currentTarget.value })
                        }
                    />
                    <br />
                    <br />
                    <p>Certificate Issued By</p>
                    <input
                        required
                        value={certificateData.issuedBy}
                        type="text"
                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            setCertificateData({ ...certificateData, issuedBy: e.currentTarget.value })
                        }
                    />
                    <br />
                    <br />
                    <p>year Issued</p>
                    <input
                        required
                        value={certificateData.year}
                        type="date"
                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            setCertificateData({ ...certificateData, year: e.currentTarget.value })
                        }
                    />
                    <br />
                    <br />
                    <button type="submit">save certificate</button>
                </form>
            )}
            <br />
            <table>
                <tbody>
                    <tr>
                        <td>
                            <ul>
                                {projectsArray &&
                                    projectsArray.map((item, index) => (
                                        <li key={index}>
                                            {item.thumbnailId && <img src={projectImage(item.thumbnailId)} width={50} height={50} />}
                                            <h2>{item.thumbnailId}</h2>
                                            <h2>{item.name}</h2>
                                            <p>{item.description}</p>
                                            {item.url && (
                                                <a target="_blank" href={item.url}>
                                                    {item.url}
                                                </a>
                                            )}
                                            <button onClick={() => indexProjects(index)}>edit</button>
                                        </li>
                                    ))}
                            </ul>
                        </td>
                        <td>
                            {projectEdit && (
                                <form style={{ margin: '10%' }} onSubmit={editProject}>
                                    <p>Project Name</p>
                                    <input
                                        required
                                        value={editedProject.name}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedProject({ ...editedProject, name: e.currentTarget.value })
                                        }
                                    />
                                    <br />
                                    <br />
                                    <p>Description</p>
                                    <textarea
                                        value={editedProject.description}
                                        required
                                        onChange={(e) => setEditedProject({ ...editedProject, description: e.currentTarget.value })}
                                    />

                                    <br />
                                    <br />
                                    <p>Project URL</p>
                                    <input
                                        required
                                        value={editedProject.url}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedProject({ ...editedProject, url: e.currentTarget.value })
                                        }
                                    />
                                    <br />
                                    <br />
                                    <button type="submit">update project</button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            deleteProject();
                                            deleteProfileImage(editedProject.thumbnailId);
                                        }}
                                    >
                                        delete project
                                    </button>
                                </form>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
            <button onClick={showProject}>add Projects</button>
            {displayProject && (
                <form style={{ margin: '10%' }} onSubmit={addProject}>
                    <p>Project Name</p>
                    <input
                        required
                        value={projectData.name}
                        type="text"
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setProjectData({ ...projectData, name: e.currentTarget.value })}
                    />
                    <br />
                    <br />
                    <p>Description</p>
                    <textarea
                        value={projectData.description}
                        onChange={(e) => setProjectData({ ...projectData, description: e.currentTarget.value })}
                    />

                    <br />
                    <br />
                    <p>Project URL</p>
                    <input
                        value={projectData.url}
                        type="text"
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setProjectData({ ...projectData, url: e.currentTarget.value })}
                    />
                    <br />
                    <input type="file" onChange={(e) => setProjectFile(e.currentTarget.files)} />

                    <br />
                    <button type="submit">save project</button>
                </form>
            )}
            <br /> <br />
            <table>
                <tbody>
                    <tr>
                        <td>
                            <ul>
                                {workHistoryArray &&
                                    workHistoryArray.map((item, index) => (
                                        <details key={index}>
                                            <summary>
                                                <h2>{item.title}</h2>
                                                <p>{item.companyName}</p>
                                                <button onClick={() => editWork(index)}>edit</button>
                                            </summary>
                                            <p>{item.startDate}</p>
                                            {item.endDate && <p>{item.endDate}</p>}
                                            <div style={{ paddingLeft: '2rem' }}>{parse(item.jobDescription)}</div>
                                        </details>
                                    ))}
                            </ul>
                        </td>
                        <td>
                            {workEdit && (
                                <form style={{ margin: '10%' }} onSubmit={editWorkHistory}>
                                    <p>title</p>
                                    <input
                                        required
                                        value={editedWork.title}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedWork({ ...editedWork, title: e.currentTarget.value })
                                        }
                                    />
                                    <br />
                                    <br />
                                    <p>Company Name</p>
                                    <input
                                        required
                                        value={editedWork.companyName}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedWork({ ...editedWork, companyName: e.currentTarget.value })
                                        }
                                    />
                                    <br />
                                    <br />
                                    <br />
                                    <p>Start Date</p>
                                    <input
                                        required
                                        value={editedWork.startDate}
                                        type="date"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedWork({ ...editedWork, startDate: e.currentTarget.value })
                                        }
                                    />
                                    <br />
                                    <br />
                                    {editedWork.endDate && (
                                        <div>
                                            <p>End Date</p>
                                            <input
                                                required
                                                value={editedWork.endDate}
                                                type="date"
                                                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                    setEditedWork({ ...editedWork, endDate: e.currentTarget.value })
                                                }
                                            />
                                            <br />
                                        </div>
                                    )}
                                    <br />
                                    {/*                                     <p>Descriptionsl</p>
                                     */}
                                    {/*                                     <EditContent onEditorData={handleEditorData} />
                                     */}{' '}
                                    {/* <textarea
                                        value={editedWork.jobDescription}
                                        required
                                        onChange={(e) => setEditedWork({ ...editedWork, jobDescription: e.currentTarget.value })}
                                    /> */}
                                    <br />
                                    <button type="submit">update work History</button>
                                    <button type="button" onClick={deleteWorkHistory}>
                                        delete work History
                                    </button>
                                </form>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            <br /> <br />
            <button onClick={showWorkHistory}>work history</button>
            <table>
                <tbody>
                    <tr>
                        <td>
                            {displayWorkHisotry && (
                                <form style={{ margin: '10%' }} onSubmit={addWorkHistory}>
                                    <p>title</p>
                                    <input
                                        required
                                        value={workHistoryData.title}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setWorkHistoryData({ ...workHistoryData, title: e.currentTarget.value })
                                        }
                                    />
                                    <br />
                                    <br />
                                    <p>Company Name</p>
                                    <input
                                        required
                                        value={workHistoryData.companyName}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setWorkHistoryData({ ...workHistoryData, companyName: e.currentTarget.value })
                                        }
                                    />
                                    <br />
                                    <br />
                                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                                    <span>i currently work here</span>
                                    <br />
                                    <br />
                                    <p>Start Date</p>
                                    <input
                                        required
                                        value={workHistoryData.startDate}
                                        type="date"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setWorkHistoryData({ ...workHistoryData, startDate: e.currentTarget.value })
                                        }
                                    />
                                    <br />
                                    <br />
                                    {!isChecked && (
                                        <div>
                                            <p>End Date</p>
                                            <input
                                                required
                                                value={workHistoryData.endDate}
                                                type="date"
                                                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                    setWorkHistoryData({ ...workHistoryData, endDate: e.currentTarget.value })
                                                }
                                            />
                                            <br />
                                        </div>
                                    )}
                                    <br />
                                    <p>Description</p>
                                    <MyEditor onEditorData={handleEditorData} />
                                    {/* <textarea
                                        value={workHistoryData.jobDescription}
                                        required
                                                                                onChange={(e) => setWorkHistoryData({ ...workHistoryData, jobDescription: e.currentTarget.value })}

                                    /> */}
                                    <br />
                                    <button type="submit">save certificate</button>
                                </form>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* projects */}
            <button onClick={showEducation}>Education</button>
            {displayEducation && (
                <form style={{ margin: '10%' }} onSubmit={addEducation}>
                    <p>Level of Education</p>
                    <select
                        required
                        value={education.educationLevel}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setEducation({ ...education, educationLevel: e.currentTarget.value })
                        }
                    >
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
                    <p>Field of Study/Major</p>
                    <input
                        type="text"
                        required
                        value={education.fieldStudy}
                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            setEducation({ ...education, fieldStudy: e.currentTarget.value })
                        }
                    />
                    <p>University/Institution</p>
                    <input
                        type="text"
                        required
                        value={education.university}
                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            setEducation({ ...education, university: e.currentTarget.value })
                        }
                    />
                    <br />
                    <br />
                    <p>year Issued</p>
                    <input
                        required
                        value={education.yearIssued}
                        type="date"
                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            setEducation({ ...education, yearIssued: e.currentTarget.value })
                        }
                    />
                    <br />
                    <br />
                    <button type="submit">save certificate</button>
                </form>
            )}
            <table>
                <tbody>
                    <tr>
                        <td>
                            <ul>
                                {educationArray &&
                                    educationArray.map((item, index) => (
                                        <li key={index}>
                                            <h2>{item.educationLevel}</h2>
                                            <p>{item.fieldStudy}</p>
                                            <p>{item.university}</p>
                                            <p>{item.yearIssued}</p>
                                            <button onClick={() => indexEducation(index)}>edit</button>
                                        </li>
                                    ))}
                            </ul>
                        </td>
                        <td>
                            {EditEducation && (
                                <form style={{ margin: '10%' }} onSubmit={editEducations}>
                                    <p>Level of Education</p>
                                    <select
                                        required
                                        value={EditedEducation.educationLevel}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                            setEditedEducation({ ...EditedEducation, educationLevel: e.currentTarget.value })
                                        }
                                    >
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
                                    <p>Field of Study/Major</p>
                                    <input
                                        type="text"
                                        required
                                        value={EditedEducation.fieldStudy}
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedEducation({ ...EditedEducation, fieldStudy: e.currentTarget.value })
                                        }
                                    />
                                    <p>University/Institution</p>
                                    <input
                                        type="text"
                                        required
                                        value={EditedEducation.university}
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedEducation({ ...EditedEducation, university: e.currentTarget.value })
                                        }
                                    />
                                    <br />
                                    <br />
                                    <p>year Issued</p>
                                    <input
                                        required
                                        value={EditedEducation.yearIssued}
                                        type="date"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedEducation({ ...EditedEducation, yearIssued: e.currentTarget.value })
                                        }
                                    />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <button type="submit">update certificate</button>
                                    <button type="button" onClick={deleteCertificate}>
                                        delete certificate
                                    </button>
                                </form>
                            )}
                        </td>
                    </tr>
                </tbody>
                {/*  <tbody>
                    <tr>
                        <td>
                            {educationArray &&
                                educationArray.map((item, index) => (
                                    <details key={index}>
                                        <summary>
                                            <h2>{item.degree}</h2>
                                            <button onClick={() => indexEducation(index)}>edit</button>
                                        </summary>
                                        <p>{item.school}</p>
                                        <p>{item.graduationYear}</p>
                                    </details>
                                ))}
                        </td>
                        <td>
                            {displayEducation && (
                                <form style={{ margin: '10%' }} onSubmit={addEducation}>
                                    <p>degree</p>
                                    <input
                                        required
                                        value={education.degree}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEducation({ ...education, degree: e.currentTarget.value })
                                        }
                                    />
                                    <br />
                                    <br />
                                    <p>School</p>
                                    <input
                                        required
                                        value={education.school}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEducation({ ...education, school: e.currentTarget.value })
                                        }
                                    />
                                    <br />
                                    <br />
                                    <br />
                                    <p>graduation Year</p>
                                    <input
                                        required
                                        value={education.graduationYear}
                                        type="date"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEducation({ ...education, graduationYear: e.currentTarget.value })
                                        }
                                    />
                                    <br />
                                    <br />
                                    <button type="submit">save education</button>
                                </form>
                            )}
                        </td>
                        <td>
                            {EditEducation && (
                                <form style={{ margin: '10%' }} onSubmit={editEducations}>
                                    <p>title</p>
                                    <input
                                        required
                                        value={EditedEducation.degree}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedEducation({ ...EditedEducation, degree: e.currentTarget.value })
                                        }
                                    />
                                    <br />
                                    <br />
                                    <p>Company Name</p>
                                    <input
                                        required
                                        value={EditedEducation.school}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedEducation({ ...EditedEducation, school: e.currentTarget.value })
                                        }
                                    />
                                    <br />
                                    <br />
                                    <br />
                                    <p>Start Date</p>
                                    <input
                                        required
                                        value={EditedEducation.graduationYear}
                                        type="date"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedEducation({ ...EditedEducation, graduationYear: e.currentTarget.value })
                                        }
                                    />
                                    <br />
                                    <br />
                                    <button type="submit">update education</button>
                                    <button type="button" onClick={deleteEducation}>
                                        delete education
                                    </button>
                                </form>
                            )}
                        </td>
                    </tr>
                </tbody> */}
            </table>
        </>
    );
};
export default Profile;
