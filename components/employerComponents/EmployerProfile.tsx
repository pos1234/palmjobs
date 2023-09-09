import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { MiddleWare } from '@/lib/middleware';
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
});
const TextInput = (props: any) => {
    return (
        <input
            placeholder={props.placeHolder}
            value={props.value}
            onChange={(e) => props.setFunction(e.currentTarget.value)}
            className="w-96 h-12 pl-5 bg-white rounded-3xl border border-gray-200"
        />
    );
};
const RequiredTextLabel = (props: any) => {
    return (
        <div>
            <span className="text-neutral-900 text-opacity-70 text-lg font-medium leading-loose md:text-xl">{props.text} </span>
            <span className={props.req == 'nReq' ? 'hidden' : 'text-orange-600 text-2xl font-medium leading-loose'}>*</span>
        </div>
    );
};

const EmployerProfile = () => {
    const [companyName, setCompanyName] = useState('');
    const [compDescription, setComDescription] = useState('');
    const [profileError, setProfileError] = useState('');
    const {file, image, deleteProfilePicture, updateProfilePictures, uploadProfilePictures } = MiddleWare();

    const imageUploadChecker = (functionName: any, uploadedFile: any) => {
        if (uploadedFile) {
            const fileList = Array.from(uploadedFile);
            const maxSize = 1 * 1024 * 1024;
            const allowedExtensions = ['.jpg', '.jpeg', '.png'];
            const filteredFiles = fileList.filter((file: any) => {
                if (file.size > maxSize) {
                    console.log(`File ${file.name} exceeds the maximum size limit.`);
                    setProfileError('File size must be <1 mb');
                    return false;
                }
                const fileExtension = `.${file.name.split('.').pop()}`;
                if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
                    console.log(`File ${file.name} has an invalid extension.`);
                    setProfileError('Invalid file extenstion');
                    return false;
                }
                setProfileError(' ');
                return functionName(uploadedFile && uploadedFile[0]);
            });
        }
    };
    const updatePic = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        imageUploadChecker(updateProfilePictures, e.currentTarget.files);
    };
    const uploadPic = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        imageUploadChecker(uploadProfilePictures, e.currentTarget.files);
    };
    return (
        <div className="pt-5 pl-10 pb-10 bg-textW  xl:pr-28 xl:px-20">
            <div className="col-span-12 pt-5 space-y-3 mb-3">
                <div className="col-span-12 relative md:col-span-4 xl:col-span-4">
                    <div className="profilePictureContainer w-40 h-40 col-span-2 rounded-3xl cursor-pointer">
                        {image ? (
                            <>
                                <img src={image} className="w-40 h-40 col-span-2 rounded-3xl cursor-pointer" />
                                <DeleteIcon
                                    onClick={deleteProfilePicture}
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
                        ) : (
                            <>
                                <p className="w-40 h-40 col-span-2 rounded-3xl cursor-pointer bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW flex text-center justify-center text-[5rem] font-frhW">
                                    {/* {firstLetter} */} A
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
                    </div>
                    {profileError && <p className="text-gradientFirst pt-3 pl-2 text-[12px]">{profileError}</p>}
                </div>
                <div className="text-neutral-900 text-3xl font-semibold leading-10">Create employer account</div>
                <RequiredTextLabel text="Your Company Name?" />
                <TextInput placeHolder="company name" value={companyName} setFunction={setCompanyName} />
                <RequiredTextLabel text="Your Company's Industry?" />
                <TextInput placeHolder="industry" value={companyName} setFunction={setCompanyName} />
                <RequiredTextLabel text="Your Company's number of employees?" />
                <TextInput placeHolder="Number of employee" value={companyName} setFunction={setCompanyName} />
                <RequiredTextLabel text="Your Phone Number?" />
                <TextInput placeHolder="phone number" value={companyName} setFunction={setCompanyName} />
            </div>
            <RequiredTextLabel text="Company Description ?" req="nReq" />
            <div className="pb-20 mr-2 mt-5 xl:mr-64">
                <ReactQuill
                    className="h-28 text-addS"
                    value={compDescription}
                    onChange={(e) => setComDescription(e)}
                    placeholder="Add Description"
                />
            </div>
            <div className="flex justify-end pt-5">
                <div className="text-textW bg-gradient-to-r flex items-center from-gradientFirst to-gradientSecond justify-center cursor-pointer h-16 w-5/12 rounded-full lg:w-3/12">
                    Save
                </div>
            </div>
        </div>
    );
};
export default EmployerProfile;