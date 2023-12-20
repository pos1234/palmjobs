import React, { useEffect, useState } from 'react'
import { ProfilePic } from '../JobImage';
import { deleteProfilePicture, getCandidateDocument, updateProfileId, uploadProfilePictures } from '@/backend/candidateBackend';
import DeleteIcon from '@mui/icons-material/Delete';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { toast } from 'react-toastify';
import { getAccount } from '@/backend/accountBackend';
import { deleteEmployerProfilePicture, getEmployerDocument, updateEmployerProfileId } from '@/backend/employerBackend';
const ProfilePicture = () => {
    const loadingIn = '/images/loading.svg';
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileId, setProfileId] = useState('')
    const [profileError, setProfileError] = useState('');
    const [file, setFile] = useState<any>();
    const [firstLetter, setFirstLetter] = useState('')
    const getProfilePic = async () => {
        if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
                localforage.getItem('userDetail').then((value: any) => {
                    setProfileId(value.profilePictureId)
                })
            });
        }
   /*      const promise = await getCandidateDocument()
        promise && promise.documents[0] && promise.documents[0].profilePictureId && setProfileId(promise.documents[0].profilePictureId)
    */ }
    useEffect(() => {
        getProfilePic()
        if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
                localforage.getItem('userData').then((value: any) => {
                    setFirstLetter(value.name.charAt(0))
                })
            });
        }
        /* getAccount().then((res: any) => {
            res && res.name && setFirstLetter(res.name.charAt(0))
        }) */
    }, [])
    const updateLocal = (value: any) => {
        if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
                localforage.getItem('userDetail')
                    .then((existingData: any) => {
                        // Modify the existing data
                        const updatedData = {
                            // Update the specific properties you want to change
                            ...existingData,
                            profilePictureId: value,
                        };
                        // Set the updated data back to the same key
                        return localforage.setItem('userDetail', updatedData);
                    })
                    .then(() => {
                    })
                    .catch((err) => {
                        console.error(`Error updating item: ${err}`);
                    });
            });
        }
    }
    const imageUploadChecker = (functionName: any, uploadedFile: any) => {
        if (uploadedFile) {
            const fileList = Array.from(uploadedFile);
            const maxSize = 1 * 1024 * 1024;
            const allowedExtensions = ['.jpg', '.jpeg', '.png'];
            const filteredFiles = fileList.filter((file: any) => {
                if (file.size > maxSize) {
                    setProfileError('File size must be <1 mb');
                    return false;
                }
                const fileExtension = `.${file.name.split('.').pop()}`;
                if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
                    setProfileError('Invalid file extenstion');
                    return false;
                }
                setProfileError(' ');
                setProfileLoading(true);
                functionName(uploadedFile && uploadedFile[0]).then((res: any) => {
                    setProfileLoading(false);
                    setProfileId(res.$id)
                    updateProfileId(res.$id)
                    updateLocal(res.$id)
                    toast.success('Image Upload Successful')
                });
            });
        }
    };
    const updatePic = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        deleteProfilePicture(profileId).then((res) => {
            imageUploadChecker(uploadProfilePictures, e.currentTarget.files);
        })
    };
    const uploadPic = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        imageUploadChecker(uploadProfilePictures, e.currentTarget.files);
    };
    const handleDelete = () => {
        deleteProfilePicture(profileId).then((res) => {
            updateLocal('')
        })
    }
    return (
        <div className="relative flex flex-col justify-center">
            <div className="profilePictureContainer w-28 h-28 rounded-full border-8 border-textW cursor-pointer">
                {profileId ? (
                    <>
                        {!profileLoading && (
                            <>
                                {profileId && <ProfilePic id={profileId} className="w-40 h-40 col-span-2 rounded-3xl cursor-pointer" />}
                                <DeleteIcon
                                    onClick={() => {
                                        handleDelete
                                        setProfileId('')
                                    }}
                                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                    className="w-7 h-7 p-1.5 mr-0 absolute right-0 top-0 mr-[1rem] mt-3 cursor-pointer"
                                />
                                <div className="uploadProfile">
                                    <label htmlFor="photo-upload" className="custom-file-upload">
                                        <div className="img-wrap img-upload">
                                            <CameraAltOutlinedIcon className="text-black" />
                                        </div>
                                        <input id="photo-upload" type="file" value={file} onChange={updatePic} />
                                    </label>
                                </div>
                            </>
                        )}
                        {profileLoading && (
                            <div className="w-28 h-28 col-span-2 rounded-3xl cursor-pointer">
                                <img src={loadingIn} className="flex items-center justify-centerh-16 w-1/2" />
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {!profileLoading && !profileId && (
                            <>
                                <p className="cursor-pointer h-full w-full bg-gradientFirst text-textW flex justify-center items-center text-[3rem] font-frhW">
                                    {firstLetter.toLocaleUpperCase()}
                                </p>
                                <div className="uploadProfile">
                                    <label htmlFor="photo-upload" className="custom-file-upload">
                                        <div className="img-wrap img-upload">
                                            <CameraAltOutlinedIcon className="text-textW" />
                                        </div>
                                        <input id="photo-upload" type="file" onChange={uploadPic} />
                                    </label>
                                </div>
                            </>
                        )}
                        {profileLoading && (
                            <div className="w-28 h-28 col-span-2 rounded-3xl cursor-pointer">
                                <img src={loadingIn} className="flex items-center justify-centerh-16 w-1/2" />
                            </div>
                        )}
                    </>
                )}
            </div>
            {profileError && <p className="text-red-500 pt-3 pl-2 text-[12px]">{profileError}</p>}
        </div>
    )
}
export const EmployerProfilePicture = () => {
    const loadingIn = '/images/loading.svg';
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileId, setProfileId] = useState('')
    const [profileError, setProfileError] = useState('');
    const [file, setFile] = useState<any>();
    const [firstLetter, setFirstLetter] = useState('')
    const imageUploadChecker = (functionName: any, uploadedFile: any) => {
        if (uploadedFile) {
            const fileList = Array.from(uploadedFile);
            const maxSize = 1 * 1024 * 1024;
            const allowedExtensions = ['.jpg', '.jpeg', '.png'];
            const filteredFiles = fileList.filter((file: any) => {
                if (file.size > maxSize) {
                    setProfileError('File size must be <1 mb');
                    return false;
                }
                const fileExtension = `.${file.name.split('.').pop()}`;
                if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
                    setProfileError('Invalid file extenstion');
                    return false;
                }
                setProfileError(' ');
                functionName(uploadedFile && uploadedFile[0]).then((res: any) => {
                    setProfileLoading(false);
                    setProfileId(res.$id)
                    updateEmployerProfileId(res.$id)
                    toast.success('Image Upload Successful')
                });
            });
            return filteredFiles;
        }
    };
    const updatePic = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setProfileLoading(true);
        deleteEmployerProfilePicture(profileId).then((res) => {
            imageUploadChecker(uploadProfilePictures, e.currentTarget.files);

        })
    };
    const uploadPic = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setProfileLoading(true);
        imageUploadChecker(uploadProfilePictures, e.currentTarget.files);
    };
    const getProfilePic = async () => {
        const promise = await getEmployerDocument()
        promise && promise.documents[0] && promise.documents[0].profilePictureId && setProfileId(promise.documents[0].profilePictureId)
    }
    useEffect(() => {
        getProfilePic()
        getAccount().then((res: any) => {
            res && res.name && setFirstLetter(res.name.charAt(0))
        })
    }, [])
    return <div className="col-span-12 relative md:col-span-4 xl:col-span-4">
        <div className="profilePictureContainer w-28 h-28 col-span-2 rounded-3xl cursor-pointer">
            {profileId ? (
                <>
                    {!profileLoading && (
                        <>
                            <ProfilePic id={profileId} className="w-28 h-28 col-span-2 rounded-3xl cursor-pointer" />
                            <DeleteIcon
                                onClick={() => {
                                    deleteEmployerProfilePicture(profileId)
                                    setProfileId('')
                                }}
                                sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                className="w-7 h-7 p-1.5 mr-0 absolute right-0 top-0 -mr-[0.7rem] mt-3 cursor-pointer"
                            />
                            <div className="uploadProfile">
                                <label htmlFor="photo-upload" className="custom-file-upload">
                                    <div className="img-wrap img-upload">
                                        <CameraAltOutlinedIcon className="text-black" />
                                    </div>
                                    <input id="photo-upload" type="file" value={file} onChange={updatePic} />
                                </label>
                            </div>
                        </>
                    )}
                    {profileLoading && (
                        <div className="w-28 h-28 col-span-2 rounded-3xl cursor-pointer">
                            <img src={loadingIn} className="flex items-center justify-centerh-16 w-1/2" />
                        </div>
                    )}
                </>
            ) : (
                <>
                    {!profileLoading && (
                        <>
                            <p className="w-28 h-28 col-span-2 rounded-3xl cursor-pointer bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW flex text-center justify-center text-[5rem] font-frhW">
                                {firstLetter}
                            </p>
                            <div className="uploadProfile">
                                <label htmlFor="photo-upload" className="custom-file-upload">
                                    <div className="img-wrap img-upload">
                                        <CameraAltOutlinedIcon className="text-textW" />
                                    </div>
                                    <input id="photo-upload" type="file" onChange={uploadPic} />
                                </label>
                            </div>
                        </>
                    )}
                    {profileLoading && (
                        <div className="w-28 h-28 col-span-2 rounded-3xl cursor-pointer">
                            <img src={loadingIn} className="flex items-center justify-centerh-16 w-1/2" />
                        </div>
                    )}
                </>
            )}
        </div>
        {profileError && <p className="text-gradientFirst pt-3 pl-2 text-[12px]">{profileError}</p>}
    </div>
}
export default ProfilePicture