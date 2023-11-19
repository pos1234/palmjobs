import { useEffect, useState } from 'react';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { getUserDetail, updateWorkHistory } from '@/lib/candidateBackend';
import ElementWithIcon from './CertificateEducationComponent/ElementWithIcon'
import { toast } from 'react-toastify';
import FormModal from './FormModal';
import { DeleteConfirmation, SubmitButton } from '../TextInput';
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
});
const WorkHitory = () => {
    const [openWork, setOpenWork] = useState(false);
    const [displayWorkHistory, setDisplayWorkHistory] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [workHistoryArray, setWorkHistoryArray] = useState<any[]>([]);
    const [workIndex, setWorkIndex] = useState(Number);
    const [workEdit, setWorkEdit] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [loadings, setLoadings] = useState(false);
    const [errorCode, setErrorCode] = useState(0);
    const [errorMessage, setErrorMessage] = useState('')
    const [workHistoryData, setWorkHistoryData] = useState({
        title: '',
        companyName: '',
        startDate: '',
        endDate: '',
        jobDescription: ''
    });
    const maxWorkHistoryTitle = 20;
    const convertToString = (str: any) => {
        return JSON.stringify(str);
    };
    const editWorkHistory = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (workHistoryData.title == '') {
            setErrorCode(1);
            setErrorMessage('please enter title');
        } else if (workHistoryData.companyName == '') {
            setErrorCode(2);
            setErrorMessage('please enter company name');
        } else if (workHistoryData.startDate == '') {
            setErrorCode(3);
            setErrorMessage('please enter start date');
        } else if (workHistoryData.jobDescription == '') {
            setErrorCode(4);
            setErrorMessage('please enter job description');
        } else {
            setLoadings(true);
            workHistoryArray[workIndex] = workHistoryData;
            const response = updateWorkHistory(convertToString(workHistoryArray));
            response
                .then((res) => {
                    setLoadings(false);
                    setOpenWork(false)
                    setWorkHistoryData({
                        title: '',
                        companyName: '',
                        startDate: '',
                        endDate: '',
                        jobDescription: ''
                    });
                    toast.success('Work Hitory Saved Successfully');
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Work Hitory Not Saved');
                    setLoadings(false);
                });
        }
    };
    const addWorkHistory = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (workHistoryData.title == '') {
            setErrorCode(1);
            setErrorMessage('please enter title');
        } else if (workHistoryData.companyName == '') {
            setErrorCode(2);
            setErrorMessage('please enter company name');
        } else if (workHistoryData.startDate == '') {
            setErrorCode(3);
            setErrorMessage('please enter start date');
        } else if (workHistoryData.jobDescription == '') {
            setErrorCode(4);
            setErrorMessage('please enter job description');
        } else {
            setLoadings(true);
/*             workHistoryArray.push(workHistoryData);
 */            const updatedWrokHitoryArray = [...workHistoryArray, workHistoryData];
            updateWorkHistory(convertToString(updatedWrokHitoryArray)).then((res: any) => {
                setLoadings(false);
                setOpenWork(false);
                setErrorCode(0);
                setErrorMessage('')
                setWorkHistoryData({
                    title: '',
                    companyName: '',
                    startDate: '',
                    endDate: '',
                    jobDescription: ''
                });
                toast.success('Work Hitory Added Successfully');
                const work = JSON.parse(res.workHistory);
                setWorkHistoryArray(work);

            })
                .catch((error) => {
                    console.log(error);
                    setErrorCode(0);
                    setErrorMessage('')
                    toast.error('Work Hitory Not Added');
                    setLoadings(false);
                });
        }
    };
    const deleteWorkHistory = (index: number) => {
        workHistoryArray.splice(index, 1);
        updateWorkHistory(convertToString(workHistoryArray)); setWorkEdit(false);
    };
    const convertToArray = (str: any) => {
        if (str != '') return JSON.parse(str);
        else return '';
    };
    const editWork = (index: number) => {
        setWorkEdit(true);
        setWorkIndex(index);
        setWorkHistoryData(workHistoryArray[index]);
    };
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };
    const userData = async () => {
        const userInfo = await getUserDetail()
        if (userInfo !== null) {
            const workhistory = convertToArray(userInfo.workHistory) || [];
            setWorkHistoryArray(workhistory || '');
        }

    }
    useEffect(() => {
        userData()
    }, [])
    useEffect(() => {
        if (openWork == false) {
            setDisplayWorkHistory(false);
            setConfirmDelete(false);
        }
    }, [openWork]);
    return (
        <div className="w-full rounded-xl p-6 border-2 flex flex-col">
            <div className="w-full flex justify-between">
                <p className="font-fhW text-fhS leading-fhL flex gap-2 items-center">
                    <img src='/icons/suitCase.svg' className='w-6' />
                    {/*                     <BusinessCenterIcon sx={{ color: '#00A82D', marginRight: '0.5rem' }} />
 */}                    Work History
                </p>
                <EditIcon
                    onClick={() => setOpenWork(!openWork)}
                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                    className="w-7 h-7 p-1.5 mr-2 cursor-pointer"
                />
            </div>
            {workHistoryArray.length == 0 && (
                <div className='w-full flex flex-col justify-center items-center gap-5 mt-5'>
                    <p className="font-smW text-smS leading-smL text-lightGrey" >Add relevant work expreience.</p>
                    <button className='bg-black text-textW px-16 py-3 rounded-xl cursor-pointer' onClick={() => setOpenWork(true)}>Add Work History</button>
                </div>
            )}
            <div className="w-full mt-10 flex flex-col gap-5">
                {workHistoryArray &&
                    workHistoryArray.map((item, index) => (
                        <ElementWithIcon
                            key={index}
                            title={item.title}
                            companyName={item.companyName}
                            startDate={item.startDate}
                            endDate={item.endDate}
                            workDescription={item.jobDescription}
                        />
                    ))}

            </div>
            <FormModal tipText='Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos architecto dolore sint tenetur dolores, repellendus autem temporibus modi officia soluta. Facilis, dignissimos? Error, assumenda. Laborum, animi hic. Ab, doloremque id.'
                text='Work History' icon={<img src='/icons/suitCase.svg' className='w-7' />
                }
                addText='Add Wrok History' openModal={openWork} setOpenModal={setOpenWork}>
                <div className='max-lg:w-full max-lg:pr-2 h-full'>
                    {workHistoryArray.length !== 0 &&
                        !displayWorkHistory &&
                        !workEdit &&
                        workHistoryArray.map((item, index) => (
                            <div key={index} className="col-span-11 grid grid-cols-12 pb-5 md:mb-5 sm:max-md:gap-x-2 ">
                                <div className="col-span-3 sm:col-span-2 flex items-center justify-center md:col-span-2 lg:col-span-2">
                                    <div className="w-16 h-16 bg-skillColor flex items-center justify-center rounded-[1rem]">
                                        <BusinessCenterOutlinedIcon
                                            sx={{
                                                color: '#00A82D',
                                                height: '1.5rem'
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-6 grid grid-cols-12 sm:col-span-7  lg:col-span-8 ">
                                    <p className="col-span-12 text-fhS font-fhW leading-fhL flex items-center md:text-shS md:font-smRW">
                                        {item.title}
                                    </p>
                                    <div className="font-bigW text-smRS leading-smL text-fadedText col-span-12 grid-cols-12 grid pt-2">
                                        <div className="col-span-12 xl:col-span-5">{item.companyName}</div>
                                        <div className="col-span-12 max-sm:text-[13px] xl:col-span-7">
                                            <CalendarTodayIcon sx={{ marginRight: '0.5rem', fontSize: '0.9rem' }} />
                                            {item.startDate} - {item.endDate}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-3 flex flex-col justify-end items-end gap-y-3  pr-1 md:col-span-2">
                                    <EditIcon
                                        onClick={() => {
                                            editWork(index);
                                            setWorkEdit(true);
                                        }}
                                        sx={{ color: '#1D8560', background: '#E5ECEC', borderRadius: '50%' }}
                                        className="w-7 h-7 p-1.5 cursor-pointer"
                                    />
                                    <DeleteIcon
                                        onClick={() => {
                                            setConfirmDelete(true);
                                            setWorkIndex(index);
                                        }}
                                        sx={{ color: '#1D8560', background: '#E5ECEC', borderRadius: '50%' }}
                                        className="w-7 h-7 p-1.5 cursor-pointer"
                                    />
                                </div>
                                {confirmDelete && workIndex == index && <DeleteConfirmation
                                    setConfirmDelete={setConfirmDelete}
                                    deleteItem={() => deleteWorkHistory(index)}
                                />/* (
                                    <div className="mt-3 col-span-12 border-2 p-2 border-red-800 rounded-xl flex">
                                        <p>Are you Sure you want to delete?</p>
                                        <button
                                            onClick={() => setConfirmDelete(false)}
                                            className="ml-3 rounded-[20%] bg-lightGreen text-red-500 py-0.5 px-1"
                                        >
                                            No
                                        </button>
                                        <button
                                            onClick={() => {
                                                deleteWorkHistory(index);
                                                setConfirmDelete(false);
                                            }}
                                            className="bg-lightGreen rounded-[20%] text-green-800 py-0.5 px-1 ml-5"
                                        >
                                            Yes
                                        </button>
                                    </div>
                                ) */}
                                <div className="col-span-12 ml-2 block h-0.5 bg-fadedText mt-2 md:h-[0.5px] md:ml-3"></div>
                            </div>
                        ))}

                    {(workEdit || displayWorkHistory || workHistoryArray.length == 0) && (
                        <form className="gap-5 flex flex-col w-full" onSubmit={workEdit == true ? editWorkHistory : addWorkHistory}>
                            <div className="flex flex-col gap-2">
                                <p className="font-fhW text-smS leading-shL">Title</p>
                                <input
                                    value={workHistoryData.title}
                                    type="text"
                                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                        const inputValue = e.currentTarget.value;
                                        if (inputValue.length <= maxWorkHistoryTitle) {
                                            setWorkHistoryData({ ...workHistoryData, title: inputValue });
                                        }
                                    }}
                                    placeholder="Add Title"
                                    className={`focus:ring-gradientSecond focus:border-0 border-2 rounded-xl h-12 pl-5 text-addS ${errorCode == 1 ? 'border-orange-500' : 'border-gray-200'}`}
                                />
                                {errorCode == 1 && <p className='text-orange-500'>{errorMessage}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-fhW text-smS leading-shL">Company Name</p>
                                <input
                                    value={workHistoryData.companyName}
                                    type="text"
                                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                        setWorkHistoryData({ ...workHistoryData, companyName: e.currentTarget.value })
                                    }
                                    placeholder="Add Company Name"
                                    className={`focus:ring-gradientSecond focus:border-0 border-2 w-full rounded-xl h-12 pl-5 text-addS ${errorCode == 2 ? 'border-orange-500' : 'border-gray-200'}`}
                                />
                                {errorCode == 2 && <p className='text-orange-500'>{errorMessage}</p>}
                            </div>
                            <div className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    className="focus:ring-gradientSecond focus:border-0 border-[1px] rounded-xl h-4 pl-5 text-addS"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />
                                <span className="font-fhW text-smS pl-2 leading-shL">I currently work here</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-fhW text-smS leading-shL">Start Date</p>
                                <input
                                    value={workHistoryData.startDate}
                                    type="date"
                                    onChange={(e) => setWorkHistoryData({ ...workHistoryData, startDate: e.currentTarget.value })}
                                    className={`focus:ring-gradientSecond focus:border-0 pr-3 border-2 w-full rounded-xl h-12 pl-5 text-addS ${errorCode == 1 ? 'border-orange-500' : 'border-gray-200'}`}
                                />
                                {errorCode == 3 && <p className='text-orange-500'>{errorMessage}</p>}
                            </div>
                            {!isChecked && (
                                <div className="flex flex-col gap-2">
                                    <p className="font-fhW text-smS leading-shL">End Date</p>
                                    <input
                                        max={new Date().toISOString().split('T')[0]}
                                        value={workHistoryData.endDate}
                                        type="date"
                                        onChange={(e) =>
                                            isChecked
                                                ? setWorkHistoryData({ ...workHistoryData, endDate: 'present' })
                                                : setWorkHistoryData({ ...workHistoryData, endDate: e.currentTarget.value })
                                        }
                                        className="focus:ring-gradientSecond focus:border-0 pr-3 border-[1px] w-full rounded-xl h-12 pl-5 text-addS"
                                    />
                                </div>
                            )}
                            <div className="mb-20 sm:mb-16">
                                <p className="font-fhW text-smS leading-shL">Job Description {workHistoryData.jobDescription.length} </p>
                                <ReactQuill
                                    className="h-28 text-addS"
                                    placeholder="Add Description"
                                    theme="snow"
                                    value={workHistoryData.jobDescription}
                                    onChange={(e) => {
                                        if (e.length <= 800) {
                                            setWorkHistoryData({ ...workHistoryData, jobDescription: e })
                                        }
                                    }
                                    }
                                />
                            </div>
                            <div className='w-full flex '>
                                <div className='w-full md:w-52'>
                                    <SubmitButton loading={loadings} buttonText="Save" />
                                </div>
                            </div>
                        </form>
                    )}
                </div>
                {!displayWorkHistory && !workEdit && workHistoryArray.length !== 0 && workHistoryArray.length <= 2 && (
                    <div className='w-full pt-10 flex md:justify-end'>
                        <button
                            onClick={() => setDisplayWorkHistory(true)}
                            className="bg-black rounded-xl text-textW h-14 w-full md:w-1/2"
                        >
                            Add new
                        </button>
                    </div>
                )}
            </FormModal>
        </div>
    );
};
export default WorkHitory;
