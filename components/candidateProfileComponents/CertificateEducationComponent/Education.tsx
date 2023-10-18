import { useEffect, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmModal from '@/components/ConfirmModal';
import { MiddleWare } from '@/lib/middleware';
const Education = () => {
    const loadingIn = '/images/loading.svg';
    const [openEducation, setOpenEducation] = useState(false);
    const [displayEducation, setDisplayEducation] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [selected, setSelected] = useState(false);
    const {
        educationArray,
        EditEducation,
        setEditEducation,
        addEducation,
        editEducations,
        deleteEducation,
        EditedEducation,
        setEditedEducation,
        loadings,
        educationIndex,
        setEducationIndex,
        education,
        setEducation
    } = MiddleWare();
    const indexEducation = (index: number) => {
        setEditEducation(true);
        setEducationIndex(index);
        setEditedEducation(educationArray[index]);
    };
    useEffect(() => {
        if (openEducation == false) {
            setEditEducation(false);
            setDisplayEducation(false);
            setConfirmDelete(false);
        }
    }, [openEducation]);
    return (
        <div className="col-span-12 grid grid-cols-12 pt-7 rounded-3xl bg-textW lg:col-start-5 lg:col-end-13 lg:pl-7 pb-10">
            <div className="col-span-8 md:col-span-3 md:col-span-4 lg:col-span-6 xl:col-span-5">
                <p className="font-fhW text-fhS leading-fhL pl-1 col-span-12">
                    <SchoolOutlinedIcon sx={{ color: '#00A82D', marginRight: '0.5rem' }} />
                    Education
                    {/* <EditIcon
                        onClick={() => setOpenEducation(true)}
                        sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                        className="w-7 h-7 p-1.5 ml-5 hidden md:inline-block cursor-pointer"
                    /> */}
                </p>
            </div>
            <div className="col-span-4 flex justify-end md:col-span-8 md:pr-4 lg:col-span-6 xl:col-span-7">
                <EditIcon
                    onClick={() => setOpenEducation(true)}
                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                    className="w-7 h-7 p-1.5 mr-2 cursor-pointer"
                />
            </div>
            <div className="col-span-12 mt-8">
                {educationArray &&
                    educationArray.map((item, index) => (
                        <div key={index} className="col-span-12 grid grid-cols-12 pb-5 md:mb-5">
                            <div className="col-span-12 pb-3 border-b-2 mr-2 max-lg:ml-1 grid grid-cols-12 lg:mr-7 lg:ml-1">
                                <div className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1">
                                    <div className="w-14 h-14 bg-skillColor flex items-center justify-center rounded-[1rem]">
                                        <SchoolIcon
                                            sx={{
                                                color: '#00A82D',
                                                height: '1.5rem'
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-9 grid grid-cols-12 pl-2 sm:col-span-11 sm:max-lg:pl-4 md:col-span-11 lg:pl-5">
                                    <p className="col-span-12 text-fhS font-fhW leading-fhL flex items-center md:text-shS md:font-smRW">
                                        {item.educationLevel}
                                    </p>
                                    <div className="font-bigW text-smRS max-sm:text-[14px] leading-smL text-fadedText col-span-12 grid-cols-12 grid pt-2">
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
            {educationArray.length == 0 && (
                <p className="font-smW text-smS leading-smL text-lightGrey col-span-12 pl-2 pt-4 lg:pt-7">Add your education.</p>
            )}
            {openEducation && (
                <ConfirmModal isOpen={openEducation} handleClose={() => setOpenEducation(!openEducation)}>
                    <div className="mx-2 pb-10 w-full pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-5 md:pl-8 md:w-2/3 lg:w-1/2 md:mx-0">
                        <div className="col-span-12 grid grid-cols-12 mt-5 sm:gap-y-5 xl:gap-y-2">
                            <div className="col-span-12 grid grid-cols-12 ">
                                <p className="font-thW text-frhS leading-shL text-modalTitle col-span-10 md:col-span-11">
                                    <SchoolOutlinedIcon sx={{ color: '#00A82D', marginRight: '0.5rem' }} />
                                    Education
                                </p>
                                <div className="col-span-2 md:col-span-1 grid pr-2 justify-items-end md:justify-items-center">
                                    <button onClick={() => setOpenEducation(!openEducation)}>
                                        <CloseIcon
                                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                            className="w-8 h-8 p-2 "
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className="col-span-12 xl:pl-8 mt-5">
                                <p className="text-dfhS font-fhW text-modalTitle leading-shL">Add a Degree</p>
                            </div>
                        </div>
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
                        {(displayEducation || educationArray.length == 0) && (
                            <form className="col-span-11 grid grid-cols-12 xl:pl-8" onSubmit={addEducation}>
                                <div className="col-span-12 md:col-span-7 pr-2 md:pl-2 cursor-pointer">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Level of Education</p>
                                    <div className="relative border-2 rounded-full" /* onClick={() => setSelected(!selected)} */>
                                        <select
                                            className="w-full rounded-full appearance-none px-4 p-3 focus:ring-gradientSecond focus:border-0 cursor-pointer"
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
                                        {/* <div className="absolute top-3 right-4">
                                            {selected ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </div> */}
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
                                        className="focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                    />
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
                                        className="focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                    />
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
                                        className="focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS appearNone"
                                    />
                                </div>

                                <div className="col-span-12 grid justify-items-end pr-3 mt-5">
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
                        {!displayEducation && !EditEducation && educationArray.length !== 0 && educationArray.length < 3 && (
                            <div className="col-span-12 flex justify-end pr-3 mt-5 sm:mt-10 gap-x-5 gap-y-5 sm:gap-y-0 xl:gap-x-0">
                                <button
                                    onClick={() => setDisplayEducation(true)}
                                    className="ml-full bg-lightGreen text-green-700 h-16 w-full xl:w-56 rounded-full col-span-12 sm:col-span-6 xl:col-span-7"
                                >
                                    Add new
                                </button>
                            </div>
                        )}
                        {EditEducation && (
                            <form className="col-span-11 grid grid-cols-12 xl:pl-8" onSubmit={editEducations}>
                                <div className="col-span-12 md:col-span-7 pr-2 md:pl-2 cursor-pointer">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Level of Education</p>
                                    <div className="relative border-2 rounded-full" /* onClick={() => setSelected(!selected)} */>
                                        <select
                                            className="w-full rounded-full appearance-none px-4 p-3 focus:ring-gradientSecond focus:border-0 cursor-pointer"
                                            value={EditedEducation.educationLevel}
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                                setEditedEducation({ ...EditedEducation, educationLevel: e.currentTarget.value })
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
                                        {/* <div className="absolute top-3 right-4">
                                            {selected ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </div> */}
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-5 pr-2 md:pl-2">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Field of Study/Major</p>
                                    <input
                                        type="text"
                                        value={EditedEducation.fieldStudy}
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedEducation({ ...EditedEducation, fieldStudy: e.currentTarget.value })
                                        }
                                        placeholder="Enter Field of Study/Major"
                                        className="focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-7 pr-2 md:pl-2">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">University / Institution</p>
                                    <input
                                        type="text"
                                        value={EditedEducation.university}
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedEducation({ ...EditedEducation, university: e.currentTarget.value })
                                        }
                                        placeholder="Enter Your University / Institution"
                                        className="focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-5 pr-2 md:pl-2">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Graduation year</p>
                                    <input
                                        max={new Date().toISOString().split('T')[0]}
                                        value={EditedEducation.yearIssued}
                                        type="date"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedEducation({ ...EditedEducation, yearIssued: e.currentTarget.value })
                                        }
                                        placeholder="Year Issued"
                                        className="focus:ring-orange-500 focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS appearNone"
                                    />
                                </div>
                                <div className="col-span-12 grid justify-items-end pr-3 mt-5">
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
export default Education;
