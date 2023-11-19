import React, { useEffect, useState } from 'react';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { getResumeName } from '@/lib/candidateBackend';
import { FileUploader } from 'react-drag-drop-files';
import { deleteResume, getUserDetail, updateResumeId, uploadResume } from '@/lib/candidateBackend';
import { toast } from 'react-toastify';
const FileUploadForm = (props: any) => {
    const pdfIcon = '/images/pdfIcon.svg';
    const [resumeId, setResumeId] = useState('');
    const [fileName, setFileName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        const name = getResumeName(resumeId);
        resumeId &&
            name.then((res) => {
                setFileName(res.name);
            });
    }, [resumeId]);
    const fileTypes = ['pdf', 'doc', 'docx'];
    const handleChange = (files: any) => {
        addResume(files);
        setErrorMessage('');
    };
    const updateTheCv = (files: any) => {
        updateResume(files);
        setErrorMessage('');
    };
    const displayError = (err: any) => {
        setErrorMessage(err);
    };
    const sizeError = (err: any) => {
        setErrorMessage(err);
    };
    const addResume = (file: any) => {
        const resultResume = uploadResume(file);
        resultResume
            .then((res: any) => {
                setResumeId(res.$id);
                const response = updateResumeId(res.$id);
                response
                    .then((rem) => {
                        toast.success('Resume Added Successfully');
                    })
                    .catch((error) => {
                        toast.error('Resume Not Added');
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const updateResume = (file: any) => {
        const results = deleteResume(resumeId);
        const resultResume = uploadResume(file);
        resultResume
            .then((res: any) => {
                setResumeId(res.$id);
                const response = updateResumeId(res.$id);
                response
                    .then((rem) => {
                        toast.success('Replaced Successfully');
                    })
                    .catch((error) => {
                        toast.error('Resume Not Replaced');
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const userData = async () => {
        const userInfo = await getUserDetail()
        userInfo && setResumeId(userInfo.resumeId || '');
    }
    useEffect(() => {
        userData()
    }, [])
    return (
        <>
            {resumeId ? (
                <FileUploader
                    multiple={false}
                    maxSize={1}
                    onSizeError={sizeError}
                    onTypeError={displayError}
                    handleChange={updateTheCv}
                    classes={
                        props.view
                            ? 'hidden'
                            : 'col-span-12 mt-7 h-72 bg-white rounded-3xl shadow border border-gray-200 flex flex-col items-center gap-y-3 justify-center'
                    }
                    name="file"
                    types={fileTypes}
                >
                    <div className="text-gray-200">
                        <img src={pdfIcon} />
                    </div>
                    <div className="text-black text-xs font-normal">{fileName ? fileName : <p>Select a file or drag and drop here</p>}</div>

                    <div className="w-64 text-center text-black text-opacity-40 text-xs font-normal">
                        PDF, DOCX or DOC, file size no more than 1MB
                    </div>
                    <div className="w-28 h-10 bg-black text-textW relative rounded border cursor-pointer border-gradientFirst border-opacity-25 justify-start items-center flex  text-center">
                        <div className="cursor-pointer absolute z-0 top-3 w-full">
                            <div className=" text-xs font-normal uppercase">Replace</div>
                        </div>
                    </div>
                    {errorMessage && <div className="text-red-500 text-xs">{errorMessage}</div>}
                </FileUploader>
            ) : (
                <FileUploader
                    multiple={false}
                    maxSize={1}
                    onSizeError={sizeError}
                    onTypeError={displayError}
                    handleChange={handleChange}
                    classes={
                        props.view
                            ? 'hidden'
                            : 'col-span-12 mt-7 h-72 bg-white rounded-3xl shadow border border-gray-200 flex flex-col items-center gap-y-3 justify-center'
                    }
                    name="file"
                    types={fileTypes}
                >
                    <div className="text-gray-200">
                        <CloudUploadOutlinedIcon className="text-[3rem]" />
                    </div>
                    <div className="text-black text-xs font-normal">{fileName ? fileName : <p>Select a file or drag and drop here</p>}</div>

                    <div className="w-64 text-center text-black text-opacity-40 text-xs font-normal">
                        PDF, DOCX or DOC, file size no more than 1MB
                    </div>
                    <div className="w-28 h-10 bg-black text-textW relative rounded border cursor-pointer border-gradientFirst border-opacity-25 justify-start items-center flex  text-center">
                        <div className="cursor-pointer absolute z-0 top-3 w-full">
                            <div className=" text-xs font-normal uppercase">Select file</div>
                        </div>
                    </div>
                    {errorMessage && <div className="text-red-500 text-xs">{errorMessage}</div>}
                </FileUploader>
            )}
        </>
    );
};

export default FileUploadForm;
