import { useEffect, useState } from 'react';
import { MiddleWare } from '@/lib/middleware';
import { deleteProfileImage, getProfilePicture } from '@/lib/services';
import ConfirmModal from '../ConfirmModal';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EditIcon from '@mui/icons-material/Edit';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import dynamic from 'next/dynamic';
import { FileUploader } from 'react-drag-drop-files';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
});
const Project = () => {
    const [openProject, setOpenProject] = useState(false);
    const loadingIn = '/images/loading.svg';
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [displayProject, setDisplayProject] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [fileName, setFileName] = useState('');
    const fileTypes = ['jpeg', 'png', 'jpg'];

    const handleProjectImage = (files: any) => {
        setProjectFile(files);
        setFileName(files.name);
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
    const {
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
        projectFile,
        setProjectFile,
        addProject,
        editProject,
        deleteProject,
        loadings,
        openProjectModal,
        setOpenProjectModal
    } = MiddleWare();
    const projectImage = (id: string) => {
        const { href } = getProfilePicture(id);
        return href;
    };
    const indexProjects = (index: number) => {
        setProjectEdit(true);
        setProjectIndex(projectsArray[0].thumbnailId);
        setEditedProject(projectsArray[0]);
    };

    return (
        <div className="col-span-12 pt-7 grid grid-cols-12 bg-textW rounded-3xl pb-8 lg:pl-10">
            <div className="col-span-8 md:col-span-3">
                <p className="font-fhW text-fhS leading-fhL pl-1 col-span-12 lg:pl-5">
                    <AttachFileIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem', rotate: '40deg' }} />
                    Projects
                </p>
            </div>

            <div className="col-span-12 mt-6 grid grid-cols-12 gap-y-5">
                {projectsArray !== null &&
                    projectsArray.map((item, index) => (
                        <div
                            key={index}
                            className="col-span-12 border-b-2 pb-5 grid grid-cols-12 sm:max-md:pl-2 mt-5 sm:pb-0 sm:border-b-0 md:pl-2 md:col-span-12 md:max-lg:pr-6 lg:col-span-7 lg:pl-5 xl:col-span-6"
                        >
                            {item.thumbnailId && (
                                <div className="col-span-12 sm:col-span-4 pr-1 py-1 grid justify-items-center sm:justify-items-start">
                                    <img src={projectImage(item.thumbnailId)} className="w-48 h-48 rounded-3xl" />
                                </div>
                            )}
                            <div className="col-span-12 sm:col-span-8 pt-3 pl-3">
                                <div className="grid grid-cols-12  h-full">
                                    <div className="col-span-10">
                                        <p className="text-shS font-shW leading-shL flex">{item.projectName}</p>
                                        <div dangerouslySetInnerHTML={{ __html: item.detail }} className=" text-lightGrey pt-3 pr-3" />
                                    </div>
                                    <div className="text-right col-span-2 flex flex-col items-end gap-y-3">
                                        <EditIcon
                                            onClick={() => {
                                                setProjectEdit(true);
                                                indexProjects(index);
                                                setOpenProject(true);
                                                setOpenProjectModal(true);
                                            }}
                                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                            className="w-7 h-7 p-1.5 mr-2 cursor-pointer"
                                        />
                                        <DeleteIcon
                                            onClick={() => {
                                                setConfirmDelete(true);
                                            }}
                                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                            className="w-7 h-7 p-1.5 mr-2 cursor-pointer"
                                        />
                                    </div>
                                    <div className="col-span-12 flex items-center">
                                        {item.link !== '' && (
                                            <a className="text-gradientFirst" target="_blank" href={item.link}>
                                                <InsertLinkOutlinedIcon sx={{ marginTop: '-0.1rem' }} />
                                                <span className="underline mt-5 pl-3">{item.link}</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {confirmDelete && projectIndex == index && (
                                <div className="col-span-12 border-2 p-2 border-red-800 rounded-2xl flex gap-x-4">
                                    <p>Are you Sure you want to delete?</p>
                                    <button
                                        onClick={() => setConfirmDelete(false)}
                                        className="rounded-[20%] bg-lightGreen text-red-500 py-0.5 px-1"
                                    >
                                        No
                                    </button>
                                    <button
                                        onClick={() => {
                                            setConfirmDelete(false);
                                            deleteProject();
                                            item.thumbnailId && deleteProfileImage(item.thumbnailId);
                                        }}
                                        className="bg-lightGreen rounded-[20%] text-green-800 py-0.5 px-1"
                                    >
                                        Yes
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
            </div>

            {projectsArray && projectsArray.length == 0 && (
                <p className="font-smW text-smS leading-smL text-lightGrey col-span-12 pl-2 pt-4 lg:pt-0 lg:pl-5">
                    Add your best project to showcase your strengths and impact.
                </p>
            )}
            {projectsArray && projectsArray.length == 0 && (
                <button
                    onClick={() => {
                        setOpenProject(true);
                        setDisplayProject(true);
                        setOpenProjectModal(true);
                    }}
                    className="text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-80 rounded-[3.75rem] mt-6 md:w-60 lg:w-80 lg:mt-5 lg:ml-6"
                >
                    Add Projects
                </button>
            )}
            {openProject && openProjectModal && (
                <ConfirmModal
                    isOpen={openProject}
                    handleClose={() => {
                        setOpenProject(!openProject);
                        setProjectEdit(false);
                    }}
                >
                    <div className="mx-2 max-sm:h-full max-sm:overflow-y-scroll pb-10 w-full pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-10 md:pl-8 md:w-2/3 lg:w-1/2 md:mx-0 ">
                        <div className="col-span-12 grid grid-cols-12">
                            <div className="col-span-12 grid grid-cols-12">
                                <p className="font-thW text-frhS leading-shL text-modalTitle col-span-10 md:col-span-11">
                                    <AttachFileIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem', rotate: '40deg' }} /> Project
                                </p>
                                <div className="col-span-2 md:col-span-1 grid pr-2 justify-items-end md:justify-items-center">
                                    <button onClick={() => setOpenProject(!openProject)}>
                                        <CloseIcon
                                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                            className="w-8 h-8 p-2 "
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {projectsArray.length == 0 && displayProject && (
                            <form className="col-span-12 grid grid-cols-12 gap-x-2 max-md:pr-3 md:px-10" onSubmit={addProject}>
                                <div className="col-span-12 sm:col-span-6">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Project Name</p>
                                    <input
                                        value={projectData.name}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setProjectData({ ...projectData, name: e.currentTarget.value })
                                        }
                                        placeholder="Project Name"
                                        className="focus:ring-orange-500 focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                    />
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Project Link</p>
                                    <input
                                        value={projectData.url}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setProjectData({ ...projectData, url: e.currentTarget.value })
                                        }
                                        placeholder="Project Link"
                                        className="focus:ring-orange-500 focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                    />
                                </div>

                                <div className="col-span-12 pt-5 sm:col-span-6 ">
                                    <p className="font-fhW text-smS leading-shL">Project Thumbnail</p>
                                    <FileUploader
                                        multiple={false}
                                        maxSize={1}
                                        onSizeError={sizeError}
                                        onTypeError={displayError}
                                        handleChange={handleProjectImage}
                                        classes="col-span-12 py-5 mt-2 bg-white rounded-3xl shadow border border-gray-200 flex flex-col items-center gap-y-3 justify-center lg:max-xl:px-5"
                                        name="file"
                                        types={fileTypes}
                                    >
                                        <div className="text-gray-200">
                                            <CloudUploadOutlinedIcon className="text-[3rem]" />
                                        </div>
                                        <div className="text-black text-xs font-normal">
                                            {fileName ? fileName : <p>Select a file or drag and drop here</p>}
                                        </div>

                                        <div className="w-64 text-center text-black text-opacity-40 text-xs font-normal">
                                            JEPG, JPG or PNG, file size no more than 1MB
                                        </div>
                                        <div className="w-28 h-10 bg-white relative rounded border cursor-pointer border-orange-300 border-opacity-25 justify-start items-center flex  text-center">
                                            <div className="cursor-pointer absolute z-0 top-3 w-full">
                                                <div className="text-orange-600 text-xs font-normal uppercase">Select file</div>
                                            </div>
                                        </div>
                                        {errorMessage && <div className="text-red-500 text-xs">{errorMessage}</div>}
                                    </FileUploader>
                                </div>

                                <div className="col-span-12">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Description</p>
                                    <ReactQuill
                                        theme="snow"
                                        value={projectData.description}
                                        onChange={(e) => setProjectData({ ...projectData, description: e })}
                                        placeholder="Add description...."
                                        className="h-28 text-addS "
                                    />
                                </div>
                                <div className="col-span-12 grid justify-items-end mt-20">
                                    {loadings == true ? (
                                        <img
                                            src={loadingIn}
                                            className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                        />
                                    ) : (
                                        <button
                                            type="submit"
                                            className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                            </form>
                        )}

                        {projectEdit && projectsArray.length !== 0 && (
                            <form className="col-span-12 grid grid-cols-12 gap-x-2 pr-10" onSubmit={editProject}>
                                <div className="col-span-12 sm:col-span-6">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Project Name</p>

                                    <input
                                        value={editedProject.projectName}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedProject({ ...editedProject, projectName: e.currentTarget.value })
                                        }
                                        placeholder="Project Name"
                                        className="focus:ring-orange-500 focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <div>
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Project Link</p>

                                        <input
                                            value={editedProject.link}
                                            type="text"
                                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                setEditedProject({ ...editedProject, link: e.currentTarget.value })
                                            }
                                            placeholder="Project Link"
                                            className="focus:ring-orange-500 focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Description</p>
                                    <ReactQuill
                                        theme="snow"
                                        value={editedProject.detail}
                                        onChange={(e) => setEditedProject({ ...editedProject, detail: e })}
                                        placeholder="Add description...."
                                        className="h-28 text-addS "
                                    />
                                </div>
                                <div className="col-span-12 grid justify-items-end mt-20">
                                    {loadings == true ? (
                                        <img
                                            src={loadingIn}
                                            className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                        />
                                    ) : (
                                        <button
                                            type="submit"
                                            className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>
                </ConfirmModal>
            )}
        </div>
    );
};
export default Project;
{
}
