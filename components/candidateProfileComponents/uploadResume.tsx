import React, { useEffect, useState } from 'react';
import { MiddleWare } from '@/lib/middleware';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { getResumeName } from '@/lib/services';
import { FileUploader } from 'react-drag-drop-files';
const FileUploadForm = (props: any) => {
    const pdfIcon = '/images/pdfIcon.svg';
    const { addResume, updateResume, resumeId } = MiddleWare();
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
        console.log(err);
    };
    const sizeError = (err: any) => {
        setErrorMessage(err);
        console.log(err);
    };
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
                    <div className="w-28 h-10 bg-white relative rounded border cursor-pointer border-orange-300 border-opacity-25 justify-start items-center flex  text-center">
                        <div className="cursor-pointer absolute z-0 top-3 w-full">
                            <div className="text-orange-600 text-xs font-normal uppercase">Replace</div>
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
                    <div className="w-28 h-10 bg-white relative rounded border cursor-pointer border-orange-300 border-opacity-25 justify-start items-center flex  text-center">
                        <div className="cursor-pointer absolute z-0 top-3 w-full">
                            <div className="text-orange-600 text-xs font-normal uppercase">Select file</div>
                        </div>
                    </div>
                    {errorMessage && <div className="text-red-500 text-xs">{errorMessage}</div>}
                </FileUploader>
            )}
        </>
    );
};

export default FileUploadForm;
