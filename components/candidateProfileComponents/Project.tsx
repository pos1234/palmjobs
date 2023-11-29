import { useEffect, useState } from 'react';
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
import { deletePictures, getUserDetail, updateProjects, uploadProfilePictures } from '@/backend/candidateBackend';
import { toast } from 'react-toastify';
import { ProfilePic } from '../JobImage';
import FormModal from './FormModal';
import { DeleteConfirmation, SubmitButton } from '../TextInput';
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
});
const Project = () => {
    const [openProject, setOpenProject] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [projectIndex, setProjectIndex] = useState(Number);
    const [projectEdit, setProjectEdit] = useState<boolean>(false);
    const [projectsArray, setProjectsArray] = useState<any[]>([]);
    const [projectFile, setProjectFile] = useState<File | null>(null);
    const [loadings, setLoadings] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [fileName, setFileName] = useState('');
    const fileTypes = ['jpeg', 'png', 'jpg'];
    const [errorCode, setErrorCode] = useState(0)
    const [projectData, setProjectData] = useState({
        projectName: '',
        detail: '',
        url: '',
        thumbnailId: ''
    });
    const handleProjectImage = (files: any) => {
        setProjectFile(files);
        setFileName(files.name);
        setErrorMessage('');
    };
    const displayError = (err: any) => {
        setErrorMessage(err);
    };
    const sizeError = (err: any) => {
        setErrorMessage(err);
    };
    const addProject = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (projectData.projectName == "") {
            setErrorCode(1);
            setErrorMessage('please enter project name')
        } else {
            setLoadings(true);
            if (projectFile) {
                const { $id } = await uploadProfilePictures(projectFile);
                const result = updateProjects(projectData.projectName, projectData.url, projectData.detail, $id);
                result
                    .then((res: any) => {
                        setLoadings(false);
                        toast.success('Project Added Successfully');
                        const project = JSON.parse(res.projects);
                        setProjectsArray(project);
                        setProjectData({
                            projectName: '',
                            detail: '',
                            url: '',
                            thumbnailId: ''
                        });
                        setProjectFile(null);
                    })
                    .catch((error: any) => {
                        console.log(error);
                        toast.error(`Project Not Added ${error}`);
                        setLoadings(false);
                    });
            }
            if (!projectFile) {
                const result = updateProjects(projectData.projectName, projectData.url, projectData.detail, '');
                result
                    .then((res: any) => {
                        setLoadings(false);
                        setOpenProject(false)
                        toast.success('Project Added Successfully');
                        const project = JSON.parse(res.projects);
                        setProjectsArray(project);
                        setProjectData({
                            projectName: '',
                            detail: '',
                            url: '',
                            thumbnailId: ''
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error(`Project Not Added ${error}`);
                        setLoadings(false);
                    });
            }
        }

    };
    const editProject = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (projectData.projectName == "") {
            setErrorCode(1);
            setErrorMessage('please enter project name')
        } else {
            setLoadings(true);
            updateProjects(projectData.projectName, projectData.url, projectData.detail, projectData.thumbnailId)
                .then((res) => {
                    setLoadings(false);
                    projectsArray.pop();
                    projectsArray.push(projectData);
                    setOpenProject(false)
                    toast.success('Successfully Saved Project');
                    setProjectData({
                        projectName: '',
                        detail: '',
                        url: '',
                        thumbnailId: ''
                    });
                })

                .catch((error) => {
                    toast.error(`Project Not Saved ${error}`);
                    setLoadings(false);
                });
        }
    };
    const deleteProject = () => {
        updateProjects('', '', '', '')
            .then((res) => {
                setProjectsArray([]);
                toast.success('Successfully Removed Project');
            })
            .catch((error) => {
                toast.error(`Project Not Removed ${error}`);
            });
    };
    const convertToArray = (str: any) => {
        if (str != '') return JSON.parse(str);
        else return '';
    };
    const userData = async () => {
        const userInfo = await getUserDetail()
        if (userInfo) {
            const projects = convertToArray(userInfo.projects) || [];
            setProjectsArray(projects || '');
        }
    }
    useEffect(() => {
        userData()
    }, [])
    const handleEditClick = () => {
        if (projectsArray.length !== 0) {
            setProjectEdit(true)
            setOpenProject(true);
            setProjectData(projectsArray[0])
        }
        if (projectsArray.length == 0) {
            setOpenProject(true);
        }

    }
    return (
        <div className=" p-6 border-2 gap-5 flex flex-col rounded-xl flex flex-wrap w-full lg:w-1/3 lg:flex-grow">
            <div className="w-full flex justify-between">
                <p className="font-fhW text-fhS leading-fhL">
                    <AttachFileIcon sx={{ color: '#00A82D', marginRight: '0.5rem', rotate: '40deg' }} />
                    Projects
                </p>
                <div className="flex gap-3">
                    {
                        projectsArray.length !== 0 && <DeleteIcon
                            onClick={() => {
                                setConfirmDelete(true);
                            }}
                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                            className="w-7 h-7 p-1.5 cursor-pointer"
                        />
                    }
                    <EditIcon
                        onClick={() => handleEditClick()}
                        sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                        className="w-7 h-7 p-1.5 cursor-pointer"
                    />
                </div>
            </div>
            {projectsArray && projectsArray.length == 0 && (
                <div className='w-full flex flex-col justify-center items-center gap-5 mt-5'>
                    <p className="font-smW text-smS leading-smL text-lightGrey" >Add relevant Project.</p>
                    <button onClick={() => {
                        setOpenProject(true);
                    }} className='bg-black text-textW px-16 py-3 rounded-xl cursor-pointer' >Add Project</button>
                </div>
            )}
            <div className="w-full flex">
                {projectsArray !== null &&
                    projectsArray.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-7 items-center justify-center min-h-[200px] w-full"
                        >
                            {item.thumbnailId && (
                                <div>
                                    <ProfilePic id={item.thumbnailId} className="w-36 h-36 rounded-xl" />
                                </div>
                            )}
                            <div className="flex flex gap-10 justify-between">
                                <div>
                                    <p className="text-shS font-shW leading-shL flex">{item.projectName}</p>
                                    <div dangerouslySetInnerHTML={{ __html: item.detail }} className=" text-lightGrey pt-3 pr-3" />
                                </div>
                                <div className="flex items-end">
                                    {item.link !== '' && (
                                        <a className="text-gradientFirst" target="_blank" href={item.link}>
                                            <InsertLinkOutlinedIcon sx={{ marginTop: '-0.1rem' }} />
                                            <span className="underline mt-5 pl-3">Project Link</span>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {confirmDelete && projectIndex == index && <DeleteConfirmation
                                setConfirmDelete={setConfirmDelete}
                                deleteItem={() => deleteProject()}
                            />}
                        </div>
                    ))}
            </div>
            <FormModal tipText='Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos architecto dolore sint tenetur dolores, repellendus autem temporibus modi officia soluta. Facilis, dignissimos? Error, assumenda. Laborum, animi hic. Ab, doloremque id.'
                text='Project' icon={<AttachFileIcon />}
                addText='Add Project' openModal={openProject} setOpenModal={setOpenProject}>
                <div className='w-full h-full'>
                    {(projectEdit || projectsArray.length == 0) && (
                        <form className="flex flex-col gap-5 w-full " onSubmit={projectEdit ? editProject : addProject}>
                            <div className='h-64 overflow-y-auto pr-2 thinScrollBar'>
                                <div className='flex flex-col gap-2'>
                                    <p className="font-fhW text-smS leading-shL">Project Name</p>
                                    <input
                                        value={projectData.projectName}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setProjectData({ ...projectData, projectName: e.currentTarget.value })
                                        }
                                        placeholder="Project Name"
                                        className={`focus:ring-gradientSecond focus:border-0 border-2 w-full rounded-xl h-12 pl-5 text-addS ${errorCode == 1 ? 'border-orange-500' : 'border-gray-200'}`}
                                    />
                                    {errorCode == 1 && <p className='text-orange-500'>{errorMessage}</p>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="font-fhW text-smS leading-shL">Project Link</p>
                                    <input
                                        value={projectData.url}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setProjectData({ ...projectData, url: e.currentTarget.value })
                                        }
                                        placeholder="Project Link"
                                        className="focus:ring-gradientSecond focus:border-0 border-2 w-full border-gray-200 rounded-xl h-12 pl-5 text-addS"
                                    />
                                </div>
                                {
                                    projectsArray.length == 0 &&
                                    <div className='flex flex-col w-full overflow-x-hidden'>
                                        <p className="font-fhW text-smS leading-shL">Project Thumbnail</p>
                                        <FileUploader
                                            multiple={false}
                                            maxSize={1}
                                            onSizeError={sizeError}
                                            onTypeError={displayError}
                                            handleChange={handleProjectImage}
                                            classes="col-span-12 py-5 mt-2 bg-white rounded-xl shadow border border-gray-200 flex flex-col items-center gap-y-3 justify-center lg:max-xl:px-5"
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
                                            <div className="w-28 h-10 bg-white relative rounded border cursor-pointer border-gradientFirst border-opacity-25 justify-start items-center flex  text-center">
                                                <div className="cursor-pointer absolute z-0 top-3 w-full">
                                                    <div className="text-gradientFirst text-xs font-normal uppercase">Select file</div>
                                                </div>
                                            </div>
                                            {errorCode !== 1 && errorMessage && <div className="text-red-500 text-xs">{errorMessage}</div>}
                                        </FileUploader>
                                    </div>
                                }
                                <div className="flex flex-col gap-2">
                                    <p className="font-fhW text-smS leading-shL">Description</p>
                                    <ReactQuill
                                        theme="snow"
                                        value={projectData.detail}
                                        onChange={(e) => {
                                            if (e.length <= 200) {
                                                setProjectData({ ...projectData, detail: e })
                                            }
                                        }}
                                        placeholder="Add description...."
                                        className="h-28 text-addS "
                                    />
                                </div>
                            </div>
                            <div className='w-full col-span-12 flex mt-16 sm:mt-10'>
                                <div className='w-full md:w-52'>
                                    <SubmitButton loading={loadings} buttonText="Save" />
                                </div>
                            </div>

                        </form>
                    )}
                </div>
            </FormModal>
        </div>
    );
};
export default Project;
{
}
