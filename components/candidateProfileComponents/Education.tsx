import { useEffect, useState } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import { updateEducation } from '@/backend/candidateBackend';
import FormModal from './FormModal';
import CloseIcon from '@mui/icons-material/Close';
import { DeleteConfirmation, SubmitButton } from '../TextInput';
const Education = (props: any) => {
    /*     const { userDetail } = useGlobalContext()
     */
    const [userDetail, setUserDetail] = useState(props.userDetail)
    const [openEducation, setOpenEducation] = useState(false);
    const [displayEducation, setDisplayEducation] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [educationArray, setEducationArray] = useState<any[]>([]);
    const [educationIndex, setEducationIndex] = useState(Number);
    const [EditEducation, setEditEducation] = useState(false);
    const [loadings, setLoadings] = useState(false);
    const [errorCode, setErrorCode] = useState(0);
    const [errorMessage, setErrorMessage] = useState('')
    const [education, setEducation] = useState({
        educationLevel: 'High School Diploma',
        fieldStudy: '',
        university: '',
        yearIssued: ''
    });
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
                            educations: converted,
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
    const indexEducation = (index: number) => {
        setEditEducation(true);
        setEducationIndex(index);
        setEducation(educationArray[index]);
    };
    const addEducation: any = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (education.fieldStudy == "") {
            setErrorCode(1);
            setErrorMessage('please eneter field of study')
        } else if (education.university == "") {
            setErrorCode(2);
            setErrorMessage('please eneter university')
        } else if (education.yearIssued == "") {
            setErrorCode(3);
            setErrorMessage('please eneter year issued')
        } else {
/*             educationArray.push(education);
 */            setLoadings(true);
            const updatedEducationArray = [...educationArray, education];
            const result = updateEducation(convertToString(updatedEducationArray));
            result
                .then((res: any) => {
                    setLoadings(false);
                    setOpenEducation(false)
                    toast.success('Education Added Successfully');
                    const educate = JSON.parse(res.educations);
                    setEducationArray(educate);
                    setEditEducation(false);
                    setDisplayEducation(false);
                    setConfirmDelete(false);
                    setErrorCode(0);
                    setErrorMessage('')
                    setEducation({
                        educationLevel: '',
                        fieldStudy: '',
                        university: '',
                        yearIssued: ''
                    });
                    updateLocal(updatedEducationArray)
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Education Not Added');
                    setLoadings(false);
                    setErrorCode(0);
                    setErrorMessage('')
                });
        }
    };
    const editEducations = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (education.fieldStudy == "") {
            setErrorCode(1);
            setErrorMessage('please eneter field of study')
        } else if (education.university == "") {
            setErrorCode(2);
            setErrorMessage('please eneter university')
        } else if (education.yearIssued == "") {
            setErrorCode(3);
            setErrorMessage('please eneter year issued')
        } else {
            setLoadings(true);
            educationArray[educationIndex] = education;
            const result = updateEducation(convertToString(educationArray));
            result
                .then((res: any) => {
                    setLoadings(false);
                    setOpenEducation(false)
                    setEditEducation(false);
                    setDisplayEducation(false);
                    setConfirmDelete(false);
                    setErrorCode(0);
                    setErrorMessage('')
                    setEducation({
                        educationLevel: '',
                        fieldStudy: '',
                        university: '',
                        yearIssued: ''
                    });
                    toast.success('Education Saved Successfully');
                    updateLocal(educationArray)
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Education Not Saved');
                    setLoadings(false);
                    setErrorCode(0);
                    setErrorMessage('')
                });
        }
    };
    const deleteEducation = (index: number) => {
        educationArray.splice(index, 1);
        updateEducation(convertToString(educationArray))
            .then((res) => {
                toast.success('Successfully Removed Education');
                updateLocal(educationArray)
            })
            .catch((error) => {
                toast.error('Education Not Removed');
            });
        setEditEducation(false);
    };
    const userData = async () => {
        /*         const userInfo = await getUserDetail()
         */        /* if (userDetail) {
const education = convertToArray(userDetail.educations) || [];
setEducationArray(education || '');
} */
        if (userDetail) {
            const result = JSON.parse(userDetail.educations)
            userDetail && setEducationArray(result || []);
        }
    }
    useEffect(() => {
        userData()
    }, [])
    useEffect(() => {
        if (openEducation == false) {
            setEditEducation(false);
            setDisplayEducation(false);
            setConfirmDelete(false);
        }
    }, [openEducation]);
    return (
        <div className=" flex flex-col p-6 rounded-xl border-2 w-full lg:w-auto">
            <div className="flex justify-between">
                <p className="font-fhW text-fhS leading-fhL pl-1 col-span-12">
                    <SchoolOutlinedIcon sx={{ color: '#00A82D', marginRight: '0.5rem' }} />
                    Education
                </p>
                <EditIcon
                    onClick={() => setOpenEducation(true)}
                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                    className="w-7 h-7 p-1.5 mr-2 cursor-pointer"
                />
            </div>
            <div className="mt-8">
                {educationArray &&
                    educationArray.map((item, index) => (
                        <div key={index} className="flex pb-5 md:mb-5">
                            <div className="border-b-2 flex gap-5 pb-5 w-full">
                                <div className="w-14 h-14 bg-gray-100 flex items-center justify-center rounded-[1rem]">
                                    <SchoolIcon
                                        sx={{
                                            color: '#00A82D',
                                            height: '1.5rem'
                                        }}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <p className="text-fhS font-fhW leading-fhL flex items-center md:text-shS md:font-smRW">
                                        {item.educationLevel}
                                    </p>
                                    <div className="font-bigW text-smRS max-sm:text-[14px] leading-smL text-fadedText flex flex-wrap gap-5 mt-1">
                                        <div className="col-span-6 sm:col-span-4">{item.fieldStudy}</div>
                                        <div className="col-span-6 sm:col-span-4">{item.university}</div>
                                        <div className="col-span-12  sm:col-span-4">
                                            <CalendarTodayIcon sx={{ marginRight: '0.5rem', fontSize: '0.9rem' }} />
                                            {item.yearIssued}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            {educationArray.length == 0 && (<div className='flex flex-col justify-center items-center gap-5 mt-5'>
                <p className="font-smW text-smS leading-smL text-lightGrey">Add your education and Degrees.</p>
                <button className='bg-black text-textW px-16 py-3 rounded-xl' onClick={() => setOpenEducation(true)}>Add Education</button>
            </div>)}
            <FormModal tipText='Showcase your academic accomplishments by detailing your education level, field of study, alma mater, and graduation year. This information enriches your profile, highlighting your qualifications and knowledge base to potential employers.'
                text='Education' icon={<SchoolOutlinedIcon />}
                addText='Add Education' openModal={openEducation} setOpenModal={setOpenEducation}>
                <div className='w-full pr-2'>
                    <div className='w-full flex flex-wrap gap-2'>
                        {!displayEducation && !EditEducation && (
                            <div className="w-full flex flex-wrap gap-2">
                                {educationArray &&
                                    !EditEducation &&
                                    educationArray.map((item, index) => (
                                        <div key={index} className="w-full flex flex-wrap p-3 gap-2 border-b-[1px]">
                                            <div className='w-full flex gap-3 items-center'>
                                                <div className=" h-full pt-2">
                                                    <SchoolIcon
                                                        sx={{
                                                            color: '#00A82D',
                                                            height: '1.5rem'
                                                        }}
                                                    />
                                                </div>
                                                <div className='flex justify-between flex-grow'>
                                                    <div className="flex flex-col gap-2 flex-wrap">
                                                        <p className="text-[20px] font-fhW leading-fhL flex items-center">
                                                            {item.educationLevel}
                                                        </p>
                                                        <div className="font-bigW text-[14px] flex flex-wrap leading-smL flex gap-3 sm:gap-4 text-fadedText">
                                                            <div>{item.fieldStudy}</div>
                                                            <div>{item.university}</div>
                                                            <div className="text-[13px] flex items-center">
                                                                <CalendarTodayIcon sx={{ marginRight: '0.5rem', fontSize: '0.9rem' }} />
                                                                {item.yearIssued}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col justify-end items-end gap-y-3">
                                                        <EditIcon
                                                            onClick={() => {
                                                                setEditEducation(true);
                                                                indexEducation(index);
                                                            }}
                                                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                                            className="w-6 h-6 p-1.5 mr-2 cursor-pointer"
                                                        />
                                                        <CloseIcon
                                                            onClick={() => {
                                                                setConfirmDelete(true);
                                                                setEducationIndex(index);
                                                            }}
                                                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                                            className="w-6 h-6 p-1.5 mr-2 mt-5 cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='w-full px-3'>
                                                {confirmDelete && educationIndex == index && <DeleteConfirmation
                                                    setConfirmDelete={setConfirmDelete}
                                                    deleteItem={() => deleteEducation(index)}
                                                />}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                        {(displayEducation || EditEducation || educationArray.length == 0) && (
                            <form className="flex flex-col gap-5 w-full" onSubmit={EditEducation == true ? editEducations : addEducation}>
                                <div className='h-80 overflow-y-auto pr-2 thinScrollBar'>
                                    <div className="flex flex-col gap-2 cursor-pointer">
                                        <p className="font-fhW text-smS leading-shL">Level of Education</p>
                                        <div className="relative" >
                                            <select
                                                className="w-full rounded-xl appearance-none px-4 p-3 focus:ring-gradientSecond focus:border-0 cursor-pointer"
                                                value={education.educationLevel}
                                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                                    setEducation({ ...education, educationLevel: e.currentTarget.value })
                                                }
                                            >
                                                <option value="High School Diploma">High School Diploma</option>
                                                <option value="Vocational Training/Certificate">Vocational Training/Certificate</option>
                                                <option value="Associate Degree">Associate Degree</option>
                                                <option value="Bachelor's Degree">Bachelor's Degree</option>
                                                <option value="Postgraduate Certificate/Diploma">Postgraduate Certificate/Diploma</option>
                                                <option value="Master's Degree">Master's Degree</option>
                                                <option value="Professional Degree">Professional Degree</option>
                                                <option value="Doctorate (PhD)">Doctorate (PhD)</option>
                                                <option value="Post-Doctorate">Post-Doctorate</option>
                                            </select>

                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="font-fhW text-smS leading-shL">Field of Study/Major</p>
                                        <input
                                            type="text"
                                            value={education.fieldStudy}
                                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                setEducation({ ...education, fieldStudy: e.currentTarget.value })
                                            }
                                            placeholder="Enter Field of Study/Major"
                                            className={`focus:ring-gradientSecond border-[1px] focus:border-0 w-full rounded-xl h-12 pl-5 text-addS ${errorCode == 1 ? 'border-orange-500' : 'border-gray-200'}`}
                                        />
                                        {errorCode == 1 && <p className='text-orange-500'>{errorMessage}</p>}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="font-fhW text-smS leading-shL">University / Institution</p>
                                        <input
                                            type="text"
                                            value={education.university}
                                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                setEducation({ ...education, university: e.currentTarget.value })
                                            }
                                            placeholder="Enter Your University / Institution"
                                            className={`focus:ring-gradientSecond focus:border-0 border-2 w-full rounded-xl h-12 pl-5 text-addS ${errorCode == 2 ? 'border-orange-500' : 'border-gray-200'}`}
                                        />
                                        {errorCode == 2 && <p className='text-orange-500'>{errorMessage}</p>}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="font-fhW text-smS leading-shL">Graduation year</p>
                                        <input
                                            max={new Date().toISOString().split('T')[0]}
                                            value={education.yearIssued}
                                            type="date"
                                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                setEducation({ ...education, yearIssued: e.currentTarget.value })
                                            }
                                            placeholder="Year Issued"
                                            className={`focus:ring-gradientSecond focus:border-0 border-2 w-full rounded-xl h-12 pl-5 text-addS appearNone ${errorCode == 3 ? 'border-orange-500' : 'border-gray-200'}`}
                                        />
                                        {errorCode == 3 && <p className='text-orange-500'>{errorMessage}</p>}
                                    </div>
                                </div>
                                <div className='w-full col-span-12 flex '>
                                    <div className='w-full md:w-52'>
                                        <SubmitButton loading={loadings} buttonText="Save" />
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                    {!displayEducation && !EditEducation && educationArray.length !== 0 && educationArray.length < 3 && (
                        <div className='w-full pt-10 flex md:justify-end'>
                            <button
                                onClick={() => setDisplayEducation(true)}
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
export default Education;
