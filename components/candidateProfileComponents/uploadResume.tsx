import React, { useEffect, useState } from 'react';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { getResumeName } from '@/backend/candidateBackend';
import { FileUploader } from 'react-drag-drop-files';
import { deleteResume, getUserDetail, updateResumeId, uploadResume } from '@/backend/candidateBackend';
import { toast } from 'react-toastify';
import { useGlobalContext } from '@/contextApi/userData';
const FileUploadForm = (props: any) => {
    const { userDetail } = useGlobalContext()
    const pdfIcon = '/images/pdfIcon.svg';
    const [resumeId, setResumeId] = useState('');
    const [fileName, setFileName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false)
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
        setLoading(true)
        const resultResume = uploadResume(file);
        resultResume
            .then((res: any) => {
                setResumeId(res.$id);
                const response = updateResumeId(res.$id);
                response
                    .then((rem) => {
                        toast.success('Resume Added Successfully');
                        setLoading(false)
                    })
                    .catch((error) => {
                        toast.error('Resume Not Added');
                        setLoading(false)
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            });
    };
    const updateResume = (file: any) => {
        const results = deleteResume(resumeId);
        const resultResume = uploadResume(file);
        setLoading(true)
        resultResume
            .then((res: any) => {
                setResumeId(res.$id);
                const response = updateResumeId(res.$id);
                response
                    .then((rem) => {
                        toast.success('Replaced Successfully');
                        setLoading(false)

                    })
                    .catch((error) => {
                        toast.error('Resume Not Replaced');
                        setLoading(false)
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            });
    };
    const userData = async () => {
/*         const userInfo = await getUserDetail()
 */        userDetail && setResumeId(userDetail.resumeId || '');
    }
    useEffect(() => {
        userData()
    }, [userDetail])
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

                    <div className="w-44 h-14 bg-black text-textW relative rounded border cursor-pointer border-gradientFirst border-opacity-25 justify-start items-center flex  text-center">
                        <div className="cursor-pointer absolute z-0 h-full w-full w-full flex items-center justify-center">
                            {loading && <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gradientFirst animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>}
                            {loading && <span>Loading...</span>}
                            {!loading && <div className=" text-xs font-normal uppercase">Replace</div>
                            }
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
