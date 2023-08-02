import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/lib/context';
import { MiddleWare } from '@/lib/middleware';
import dynamic from 'next/dynamic';
const MyEditor = dynamic(() => import('./Edit'), {
    ssr: false
});
interface Data {
    word: string;
}
const sendReset = () => {
    const router = useRouter();
    const [displayCertificate, setDisplayCertificate] = useState(false);
    const [displayEducation, setDisplayEducation] = useState(false);
    const [displayWorkHisotry, setDisplayWorkHistory] = useState(false);
    const items: Data[] = [{ word: 'react' }, { word: 'react-Native' }, { word: 'react.js' }, { word: 'Angular' }, { word: 'banana' }];
    const {
        firstLetter,
        headline,
        setHeadline,
        description,
        setDescription,
        skill,
        setSkill,
        file,
        setFile,
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
 */        addSuggestedSkill,
        deleteSkill,
        certificateEdit,
        setCertificateEdit,
        certificateIndex,
        setCertificateIndex,
        editedCertificate,
        setEditedCertificate,
        educationIndex,
        setEducationIndex,
        education,
        setEducation,
        EditEducation,
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
        deleteEducation
    } = MiddleWare();
    const { loading, user, role } = useUser();
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Data[]>([]);
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
        console.log(workHistoryArray[index]);
        setWorkEdit(true);
        setWorkIndex(index);
        setEditedWork(workHistoryArray[index]);
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

    return (
        <>
            {image ? (
                <>
                    <img src={image} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    <form onSubmit={updateProfilePicture}>
                        <input type="file" onChange={(e) => setFile(e.currentTarget.files)} />
                        <button type="submit">update profile</button>
                    </form>{' '}
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
                            color: 'white'
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
            <form style={{ margin: '10%' }} onSubmit={clickMe} /* onSubmit={addSkills} */>
                <div>
                    {/* value={skill}
                    type="text"
                    onChange={(e: React.FormEvent<HTMLInputElement>) => setSkill(e.currentTarget.value)} */}
                    <input type="text" placeholder="Search..." value={searchTerm} onChange={handleInputChange} />
                    <ul>
                        {suggestions &&
                            suggestions.map((suggestion) => (
                                <li
                                    key={suggestion.word}
                                    onClick={() => handleSuggestionClick(suggestion) /* () => handleSuggestionClick(suggestion) */}
                                >
                                    {suggestion.word}
                                </li>
                            ))}
                    </ul>
                </div>
                <button type="submit">save skill</button>
            </form>
            {array.map((item, index) => (
                <button style={{ marginRight: '10px' }} key={index}>
                    {item} <span onClick={() => deleteSkill(index)}>X</span>{' '}
                </button>
            ))}
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
                                        type="text"
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
                        type="text"
                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            setCertificateData({ ...certificateData, year: e.currentTarget.value })
                        }
                    />
                    <br />
                    <br />
                    <button type="submit">save certificate</button>
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
                                            <p>{item.jobDescription}</p>
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
                                    <p>Description</p>
                                    <textarea
                                        value={editedWork.jobDescription}
                                        required
                                        onChange={(e) => setEditedWork({ ...editedWork, jobDescription: e.currentTarget.value })}
                                    />
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
                        <td>
                            {workEdit && (
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
                                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />{' '}
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
                                    <p>Descriptions</p>
                                    {/* <MyEditor /> */}
                                    {/* <textarea
                                        value={workHistoryData.jobDescription}
                                        required
                                        onChange={(e) => setWorkHistoryData({ ...workHistoryData, jobDescription: e.currentTarget.value })}
                                    /> */}
                                    <br />
                                    <button type="submit">save certificates</button>
                                </form>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* projects */}
            <button onClick={showEducation}>Education</button>
            <table>
                <tbody>
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
                </tbody>
            </table>
            {/* <Downshift
                onChange={(selection) => alert(selection ? `You selected ${selection.value}` : 'Selection Cleared')}
                itemToString={(item) => (item ? item.value : '')}
            >
                {({
                    getInputProps,
                    getItemProps,
                    getLabelProps,
                    getMenuProps,
                    isOpen,
                    inputValue,
                    highlightedIndex,
                    selectedItem,
                    getRootProps
                }) => (
                    <div>
                        <label {...getLabelProps()}>Enter a fruit</label>
                        <div style={{ display: 'inline-block' }} {...getRootProps({}, { suppressRefError: true })}>
                            <input {...getInputProps()} />
                        </div>
                        <ul {...getMenuProps()}>
                            {isOpen
                                ? items
                                      .filter((item) => !inputValue || item.value.includes(inputValue))
                                      .map((item, index) => (
                                          <li
                                              {...getItemProps({
                                                  key: item.value,
                                                  index,
                                                  item,
                                                  style: {
                                                      backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                                                      fontWeight: selectedItem === item ? 'bold' : 'normal'
                                                  }
                                              })}
                                          >
                                              {item.value}
                                          </li>
                                      ))
                                : null}
                        </ul>
                    </div>
                )}
            </Downshift> */}
        </>
    );
};
export default sendReset;
