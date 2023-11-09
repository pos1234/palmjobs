import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import { getUserDetail, updateEducation } from '@/lib/candidateBackend';
import FormModal from './FormModal';
import { SubmitButton } from '../TextInput';
const Education = () => {
    const loadingIn = '/images/loading.svg';
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
            educationArray.push(education);
            setLoadings(true);
            const result = updateEducation(convertToString(educationArray));
            result
                .then((res: any) => {
                    setLoadings(false);
                    setOpenEducation(false)
                    toast.success('Education Added Successfully');
                    const educate = JSON.parse(res.educations);
                    setEducationArray(educate);
                    setErrorCode(0);
                    setErrorMessage('')
                    setEducation({
                        educationLevel: '',
                        fieldStudy: '',
                        university: '',
                        yearIssued: ''
                    });
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
                    setErrorCode(0);
                    setErrorMessage('')
                    setEducation({
                        educationLevel: '',
                        fieldStudy: '',
                        university: '',
                        yearIssued: ''
                    });
                    toast.success('Education Saved Successfully');
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
            })
            .catch((error) => {
                toast.error('Education Not Removed');
            });
        setEditEducation(false);
    };
    const convertToArray = (str: any) => {
        if (str != '') return JSON.parse(str);
        else return '';
    };
    const userData = async () => {
        const userInfo = await getUserDetail()
        const education = convertToArray(userInfo.educations) || [];
        setEducationArray(education || '');
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
        <div className=" flex flex-col p-6 rounded-xl border-2 w-full md:w-auto">
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
                        <div key={index} className="flex grid-cols-12 pb-5 md:mb-5">
                            <div className="border-b-2 flex gap-5 pb-5">
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
            {educationArray.length == 0 && (<div className='flex flex-col justify-center items-center gap-5'>
                <p className="font-smW text-smS leading-smL text-lightGrey">Add your education and Degrees.</p>
                <button className='bg-black text-textW px-16 w-2/3 py-3 rounded-xl'>Add Education</button>
            </div>)}
            <FormModal tipText='Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos architecto dolore sint tenetur dolores, repellendus autem temporibus modi officia soluta. Facilis, dignissimos? Error, assumenda. Laborum, animi hic. Ab, doloremque id.'
                text='Education' icon={<SchoolOutlinedIcon />}
                addText='Add Education' openModal={openEducation} setOpenModal={setOpenEducation}>
                {!displayEducation && !EditEducation && (
                    <div className="col-span-11 gap-4 grid grid-cols-12 mt-6 sm:max-md:gap-x-3 md:max-lg:gap-x-2 gap-y-4">
                        {educationArray &&
                            !EditEducation &&
                            educationArray.map((item, index) => (
                                <div key={index} className="col-span-11 grid grid-cols-12 pb-5 md:mb-5 sm:max-md:gap-x-2 ">
                                    <div className="col-span-3 sm:col-span-2 flex items-center justify-center md:col-span-2 lg:col-span-2">
                                        <div className="w-16 h-16 bg-skillColor flex items-center justify-center rounded-[1rem]">
                                            <SchoolIcon
                                                sx={{
                                                    color: '#00A82D',
                                                    height: '1.5rem'
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-6 grid grid-cols-12 sm:col-span-7  lg:col-span-8 ">
                                        <p className="col-span-12 text-fhS font-fhW leading-fhL flex items-center md:text-shS md:font-smRW">
                                            {item.educationLevel}
                                        </p>
                                        <div className="font-bigW text-smRS leading-smL text-fadedText col-span-12 grid-cols-12 grid pt-2">
                                            <div className="col-span-12 xl:col-span-5">{item.fieldStudy}</div>
                                            <div className="col-span-12 xl:col-span-5">{item.university}</div>
                                            <div className="col-span-12 max-sm:text-[13px] xl:col-span-7">
                                                <CalendarTodayIcon sx={{ marginRight: '0.5rem', fontSize: '0.9rem' }} />
                                                {item.yearIssued}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-3 flex flex-col justify-end items-end gap-y-3  pr-1 md:col-span-2">
                                        <EditIcon
                                            onClick={() => {
                                                setEditEducation(true);
                                                indexEducation(index);
                                            }}
                                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                            className="w-6 h-6 p-1.5 mr-2 cursor-pointer"
                                        />
                                        <DeleteIcon
                                            onClick={() => {
                                                setConfirmDelete(true);
                                                setEducationIndex(index);
                                            }}
                                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                            className="w-6 h-6 p-1.5 mr-2 mt-5 cursor-pointer"
                                        />
                                    </div>
                                    {confirmDelete && educationIndex == index && (
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
                                                    deleteEducation(index);
                                                    setConfirmDelete(false);
                                                }}
                                                className="bg-lightGreen rounded-[20%] text-green-800 py-0.5 px-1"
                                            >
                                                Yes
                                            </button>
                                        </div>
                                    )}
                                    <div className="col-span-12 ml-2 block h-0.5 bg-fadedText mt-2 md:h-[0.5px] md:ml-3"></div>
                                </div>
                            ))}
                    </div>
                )}
                {(displayEducation || EditEducation || educationArray.length == 0) && (
                    <form className="col-span-11 grid grid-cols-12 xl:pl-8" onSubmit={EditEducation == true ? editEducations : addEducation}>
                        <div className="col-span-12 md:col-span-7 pr-2 md:pl-2 cursor-pointer">
                            <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Level of Education</p>
                            <div className="relative border-2 rounded-full" >
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
                        <div className="col-span-12 md:col-span-5 pr-2 md:pl-2">
                            <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Field of Study/Major</p>
                            <input
                                type="text"
                                value={education.fieldStudy}
                                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                    setEducation({ ...education, fieldStudy: e.currentTarget.value })
                                }
                                placeholder="Enter Field of Study/Major"
                                className={`focus:ring-gradientSecond focus:border-0 border-2 w-full rounded-xl h-12 pl-5 text-addS ${errorCode == 1 ? 'border-orange-500' : 'border-gray-200'}`}
                            />
                            {errorCode == 1 && <p className='text-orange-500'>{errorMessage}</p>}
                        </div>
                        <div className="col-span-12 md:col-span-7 pr-2 md:pl-2">
                            <p className="font-fhW text-smS mt-5 mb-2 leading-shL">University / Institution</p>
                            <input
                                type="text"
                                value={education.university}
                                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                    setEducation({ ...education, university: e.currentTarget.value })
                                }
                                placeholder="Enter Your University / Institution"
                                className={`focus:ring-gradientSecond focus:border-0 border-2 w-full rounded-full h-12 pl-5 text-addS ${errorCode == 2 ? 'border-orange-500' : 'border-gray-200'}`}
                            />
                            {errorCode == 2 && <p className='text-orange-500'>{errorMessage}</p>}
                        </div>
                        <div className="col-span-12 md:col-span-5 pr-2 md:pl-2">
                            <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Graduation year</p>
                            <input
                                max={new Date().toISOString().split('T')[0]}
                                value={education.yearIssued}
                                type="date"
                                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                    setEducation({ ...education, yearIssued: e.currentTarget.value })
                                }
                                placeholder="Year Issued"
                                className={`focus:ring-gradientSecond focus:border-0 border-2 w-full rounded-full h-12 pl-5 text-addS appearNone ${errorCode == 3 ? 'border-orange-500' : 'border-gray-200'}`}
                            />
                            {errorCode == 3 && <p className='text-orange-500'>{errorMessage}</p>}
                        </div>

                        <div className='w-full col-span-12 flex md:justify-end mt-10'>
                            <div className='w-full md:w-96'>
                                <SubmitButton loading={loadings} buttonText="Save" />
                            </div>
                        </div>
                    </form>
                )}
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
            </FormModal>
        </div>
    );
};
export default Education;
