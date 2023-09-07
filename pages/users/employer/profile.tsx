import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/lib/context';
import { MiddleWare } from '@/lib/middleware';
import dynamic from 'next/dynamic';
import { accountData, deleteProfileImage, getProfilePicture } from '@/lib/services';
import skillsData from '@/lib/skillData';

interface Data {
    word: string;
}
const Profile = () => {
    const router = useRouter();
    const [linkedAdd, setLinkedAdd] = useState(false);
    const [callAdd, setCallAdd] = useState(false);
    const [addAdress, setAddAdress] = useState(false);
    const [addEmployee, setAddEmployee] = useState(false);
    const [addSectors, setAddSectors] = useState(false);
    const [addWebLink, setAddWebLink] = useState(false);
    const [profileImage, setProfileImage] = useState<any>();
    const [imageTrue, setImageTrue] = useState(false);
    const userData: any = accountData();
    const items: Data[] = skillsData;
    const {
        firstLetter,
        file,
        image,
        deleteProfilePicture,
        addSuggestedSkill,
        changeUserName,
        editedName,
        setEditedName,
        editName,
        setEditName,
        phone,
        call,
        setCall,
        setPhone,
        addPhone,
        deletePhone,
        address,
        setAddress,
        location,
        setLocation,
        addAddress,
        deleteAddress,
        employee,
        setEmployee,
        nEmployee,
        setNemployee,
        addNEmployee,
        deleteNemployee,
        sectorValue,
        setSectorValue,
        sector,
        setSector,
        addNewSector,
        deleteNewSector,
        website,
        setWebsite,
        webLink,
        setWebLink,
        addWeb,
        deleteWeb,
        updateProfilePictures,
        uploadProfilePictures
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

    useEffect(() => {
        const cand = !(role == '' || role == 'employer') ? true : false;
        if ((!user && !loading) || cand) {
            router.push('/account/signIn');
        }
    }, [user, loading, role]);

    const handleEditorData = (data: any) => {
        // setWorkHistoryData({ ...workHistoryData, jobDescription: data });
        //console.log(workHistoryData.jobDescription);
    };

    const editUserName = () => {
        setEditName(true);
    };
    const updatePic = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.currentTarget.files) {
            const fileList = Array.from(e.currentTarget.files);

            // Maximum file size in bytes (e.g., 5MB)
            const maxSize = 1 * 1024 * 1024;

            // Allowed file extensions
            const allowedExtensions = ['.jpg', '.jpeg', '.png'];

            // Filter files based on size and extension
            const filteredFiles = fileList.filter((file) => {
                // Check file size
                if (file.size > maxSize) {
                    console.log(`File ${file.name} exceeds the maximum size limit.`);

                    return false;
                }
                // Check file extension
                const fileExtension = `.${file.name.split('.').pop()}`;
                if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
                    console.log(`File ${file.name} has an invalid extension.`);

                    return false;
                }

                return updateProfilePictures(e.currentTarget.files && e.currentTarget.files[0]);
            });
        }
    };
    const uploadPic = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.currentTarget.files) {
            const fileList = Array.from(e.currentTarget.files);
            const maxSize = 1 * 1024 * 1024;
            const allowedExtensions = ['.jpg', '.jpeg', '.png'];
            const filteredFiles: any = fileList.filter((file) => {
                if (file.size > maxSize) {
                    console.log(`File ${file.name} exceeds the maximum size limit.`);
                    return false;
                }
                const fileExtension = `.${file.name.split('.').pop()}`;
                if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
                    console.log(`File ${file.name} has an invalid extension.`);
                    return false;
                }

                return uploadProfilePictures(e.currentTarget.files && e.currentTarget.files[0]);
            });
        }
    };
    return (
        <>
            {image ? (
                <>
                    <img src={image} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    <input value={file} type="file" onChange={updatePic} />
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
                    <input type="file" onChange={uploadPic} />
                </>
            )}
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
            {location && (
                <>
                    <p>{location}</p>
                    <button onClick={deleteAddress}>delete</button>
                </>
            )}
            <br />
            {!location && !addAdress && <button onClick={() => setAddAdress(true)}>Location +</button>}
            {!location && addAdress && (
                <form onSubmit={addAddress}>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.currentTarget.value);
                        }}
                    />
                    <button type="submit">sumbit</button>
                </form>
            )}
            <br />
            {employee && (
                <>
                    <p>{employee}</p>
                    <button onClick={deleteNemployee}>delete</button>
                </>
            )}
            <br />
            {!employee && !addEmployee && <button onClick={() => setAddEmployee(true)}>number of Employees +</button>}
            {!employee && addEmployee && (
                <form onSubmit={addNEmployee}>
                    {/*  <input type="text" /> */}
                    <select
                        value={nEmployee}
                        onChange={(e) => {
                            setNemployee(e.currentTarget.value);
                        }}
                    >
                        <option value="0 - 100">0 - 100</option>
                        <option value="101 - 200">101 - 200</option>
                        <option value="201 - 500">201 - 500</option>
                        <option value="501 - 1000">501 - 1000</option>
                        <option value="1000 >">1000 &gt;</option>
                    </select>
                    <button type="submit">sumbit</button>
                </form>
            )}
            <br />
            {sectorValue && (
                <>
                    <p>{sectorValue}</p>
                    <button onClick={deleteNewSector}>delete</button>
                </>
            )}
            <br />
            {!sectorValue && !addSectors && <button onClick={() => setAddSectors(true)}>Sector +</button>}
            {!sectorValue && addSectors && (
                <form onSubmit={addNewSector}>
                    <select
                        value={sector}
                        onChange={(e) => {
                            setSector(e.currentTarget.value);
                        }}
                    >
                        <option value="Industry">Industry</option>
                        <option value="Agricalture">Agricalture</option>
                        <option value="Technology">Technology</option>
                        <option value="Business">Business</option>
                        <option value="Medical">Medical</option>
                    </select>
                    <button type="submit">sumbit</button>
                </form>
            )}

            {webLink && (
                <>
                    <p>{webLink}</p>
                    <button onClick={deleteWeb}>delete</button>
                </>
            )}
            <br />
            {!webLink && !addWebLink && <button onClick={() => setAddWebLink(true)}>Website link +</button>}
            {!webLink && addWebLink && (
                <form onSubmit={addWeb}>
                    <input
                        type="text"
                        value={website}
                        onChange={(e) => {
                            setWebsite(e.currentTarget.value);
                        }}
                    />
                    <button type="submit">sumbit</button>
                </form>
            )}
            <br />
        </>
    );
};
export default Profile;
