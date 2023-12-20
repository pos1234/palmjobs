import { useEffect, useState } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { updateWorkHistory } from '@/backend/candidateBackend';
import ElementWithIcon from './CertificateEducationComponent/ElementWithIcon'
import { toast } from 'react-toastify';
import FormModal from './FormModal';
import { DeleteConfirmation, SubmitButton } from '../TextInput';
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
});
const WorkHitory = (props: any) => {
    /*     const { userDetail } = useGlobalContext()
     */
    const [userDetail, setUserDetail] = useState(props.userDetail)
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
    const updateLocal = (value: any) => {
        if (typeof window !== 'undefined') {
            import('localforage').then((localforage) => {
                localforage.getItem('userDetail')
                    .then((existingData: any) => {
                        // Modify the existing data
                        const converted = JSON.stringify(value)
                        const updatedData = {
                            // Update the specific properties you want to change
                            ...existingData,
                            workHistory: converted,
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
                    updateLocal(workHistoryArray)
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
                updateLocal(updatedWrokHitoryArray)
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
        updateLocal(workHistoryArray)
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
        /*         const userInfo = await getUserDetail()
         */        /* if (userDetail) {
const workhistory = convertToArray(userDetail.workHistory) || [];
setWorkHistoryArray(workhistory || '');
} */
        if (userDetail) {
            const result = JSON.parse(userDetail.workHistory)
            userDetail && setWorkHistoryArray(result || []);
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
                    Work History
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
            <FormModal tipText="Your work history is your professional footprint. For each role, clearly state your job title, the company name, and your start date. If you're currently employed there, tick the 'I currently work here' box. Remember, precise details and dates reflect your reliability and attention to detail, traits highly valued by employers."
                text='Work History' icon={<img src='/icons/suitCase.svg' className='w-7' />
                }
                addText='Add Wrok History' openModal={openWork} setOpenModal={setOpenWork}>
                <div className='w-full pr-2'>
                    <div className='w-full flex flex-wrap gap-2'>
                        {workHistoryArray.length !== 0 &&
                            !displayWorkHistory &&
                            !workEdit &&
                            workHistoryArray.map((item, index) => (
                                <div key={index} className="w-full flex flex-wrap p-3 gap-2 border-b-[1px]">
                                    <div className='w-full flex gap-3 items-center'>
                                        <div className=" h-full pt-2">
                                            <img src="/icons/briefCase.svg" alt="" className='w-9' />
                                        </div>
                                        <div className='flex justify-between flex-grow'>
                                            <div className="flex flex-col gap-2">
                                                <p className="text-[20px] font-fhW leading-fhL flex items-center">
                                                    {item.title}
                                                </p>
                                                <div className="font-bigW text-[14px] leading-smL flex gap-4 text-fadedText">
                                                    <div>{item.companyName}</div>
                                                    <div className="text-[13px] flex items-center">
                                                        <CalendarTodayIcon sx={{ marginRight: '0.5rem', fontSize: '0.9rem' }} />
                                                        {item.startDate} - {item.endDate}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-end items-end gap-y-3">
                                                <EditIcon
                                                    onClick={() => {
                                                        editWork(index);
                                                        setWorkEdit(true);
                                                    }}
                                                    sx={{ color: '#1D8560', background: '#E5ECEC', borderRadius: '50%' }}
                                                    className="w-7 h-7 p-1.5 cursor-pointer"
                                                />
                                                <CloseIcon
                                                    onClick={() => {
                                                        setConfirmDelete(true);
                                                        setWorkIndex(index);
                                                    }}
                                                    sx={{ color: '#1D8560', background: '#E5ECEC', borderRadius: '50%' }}
                                                    className="w-7 h-7 p-1.5 cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full px-3'>
                                        {confirmDelete && workIndex == index && <DeleteConfirmation
                                            setConfirmDelete={setConfirmDelete}
                                            deleteItem={() => deleteWorkHistory(index)}
                                        />}
                                    </div>
                                </div>
                            ))}
                        {(workEdit || displayWorkHistory || workHistoryArray.length == 0) && (
                            <form className="gap-5 flex flex-col w-full" onSubmit={workEdit == true ? editWorkHistory : addWorkHistory}>
                                <div className='h-80 overflow-y-auto flex flex-col gap-4 pr-2 thinScrollBar'>
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
                                            className={`focus:border-gradientSecond border-[1px] focus:border-[1px] focus:ring-0 rounded-xl h-12 pl-5 text-addS ${errorCode == 1 ? 'border-orange-500' : 'border-gray-200'}`}
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
                                            className={`focus:border-gradientSecond border-[1px] focus:border-[1px] focus:ring-0 w-full rounded-xl h-12 pl-5 text-addS ${errorCode == 2 ? 'border-orange-500' : 'border-gray-200'}`}
                                        />
                                        {errorCode == 2 && <p className='text-orange-500'>{errorMessage}</p>}
                                    </div>
                                    <div className="flex gap-2 items-center pl-2">
                                        <input
                                            type="checkbox"
                                            className="focus:ring-gradientSecond focus:bg-gradientFirst checked:bg-gradientFirst active:bg-gradientFirst focus:border-0 h-4 rounded-sm text-addS"
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
                                            className={`focus:border-gradientSecond border-[1px] focus:border-[1px] focus:ring-0 pr-3 border-2 w-full rounded-xl h-12 pl-5 text-addS ${errorCode == 1 ? 'border-orange-500' : 'border-gray-200'}`}
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
                                                className="focus:border-gradientSecond border-[1px] focus:border-[1px] focus:ring-0 pr-3 border-[1px] w-full rounded-xl h-12 pl-5 text-addS"
                                            />
                                        </div>
                                    )}
                                    <div className="mb-20 sm:mb-16">
                                        <p className="font-fhW text-smS leading-shL mb-3">Job Description </p>
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
                </div>
            </FormModal>
        </div>
    );
};
export default WorkHitory;
