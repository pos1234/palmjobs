import { useEffect, useState } from 'react';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmModal from '@/components/ConfirmModal';
import { MiddleWare } from '@/lib/middleware';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false
});
const ElementWithIcon = (props: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDescription = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <div className="grid grid-cols-12 pb-5 cursor-pointer md:mb-5 sm:max-md:gap-x-2 " onClick={toggleDescription}>
                <div className="col-span-12 pb-3 border-b-2 mr-2 max-lg:ml-1 grid grid-cols-12 lg:mr-1 lg:ml-7">
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1">
                        <div className="w-14 h-14 bg-skillColor flex items-center justify-center rounded-[1rem]">
                            <BusinessCenterOutlinedIcon
                                sx={{
                                    color: '#FE5E0A',
                                    height: '1.5rem'
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-span-8 grid grid-cols-12 pl-2 sm:col-span-10 sm:max-lg:pl-4 md:col-span-10 lg:pl-5">
                        <p className="col-span-12 text-fhS font-fhW leading-fhL flex items-center md:text-shS md:font-smRW">
                            {props.title}
                        </p>
                        <div className=" font-bigW text-smRS leading-smL text-fadedText col-span-12 grid-cols-12 pt-2 hidden sm:grid">
                            <div className="col-span-6"> {props.companyName}</div>
                            <div className="col-span-6">
                                <CalendarTodayIcon sx={{ marginRight: '0.5rem', fontSize: '0.9rem' }} />
                                {props.startDate} - {props.endDate}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 flex items-center justify-end pr-1 sm:col-span-1 md:col-span-1 ">
                        {isOpen ? (
                            <KeyboardArrowUpIcon
                                sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                className="w-7 h-7 p-1.5 "
                            />
                        ) : (
                            <KeyboardArrowDownIcon
                                sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                className="w-7 h-7 p-1.5 "
                            />
                        )}
                    </div>
                    <div className="col-span-12 pl-2 text-[14px] font-bigW text-smRS leading-smL sm:hidden text-fadedText grid grid-cols-12 pt-2">
                        <div className="col-span-6"> {props.companyName}</div>
                        <div className="col-span-6 ">
                            <CalendarTodayIcon sx={{ marginRight: '0.5rem', fontSize: '0.9rem' }} />
                            {props.startDate} - {props.endDate}
                        </div>
                    </div>
                    {isOpen && (
                        <div className="col-span-12 ">
                            <div
                                className="font-smW text-smS leading-smL text-lightGrey col-span-12 pt-4 lg:pt-7 pl-1"
                                dangerouslySetInnerHTML={{ __html: props.workDescription }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
const WorkHitory = () => {
    const loadingIn = '/images/loading.svg';

    const [openWork, setOpenWork] = useState(false);
    const [displayWorkHistory, setDisplayWorkHistory] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const maxWorkHistoryTitle = 20;
    const maxWorkHistoryCompany = 20;
    const maxWorkHistoryStartDate = 20;
    const maxWorkHistoryEndDate = 20;
    const maxWorkHistoryDescription = 580;
    const {
        workHistoryArray,
        workHistoryData,
        setWorkHistoryData,
        workIndex,
        editedWork,
        setEditedWork,
        setWorkIndex,
        workEdit,
        setWorkEdit,
        editWorkHistory,
        addWorkHistory,
        deleteWorkHistory,
        loadings,
        isChecked,
        setIsChecked
    } = MiddleWare();
    useEffect(() => {
        if (openWork == false) {
            setWorkEdit(false);
            setDisplayWorkHistory(false);
            setConfirmDelete(false);
        }
    }, [openWork]);
    const editWork = (index: number) => {
        setWorkEdit(true);
        setWorkIndex(index);
        setEditedWork(workHistoryArray[index]);
    };
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };
    return (
        <div className="col-span-12 rounded-3xl bg-textW grid grid-cols-12 py-8 md:pr-5 lg:col-span-8">
            <div className="col-span-6">
                <p className="font-fhW text-fhS leading-fhL pl-1 col-span-12 lg:pl-7 xl:pl-9">
                    <BusinessCenterIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem' }} />
                    Work History
                </p>
            </div>
            <div className="col-span-6 grid justify-items-end">
                <EditIcon
                    onClick={() => setOpenWork(!openWork)}
                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                    className="w-7 h-7 p-1.5 mr-2 cursor-pointer"
                />
            </div>
            <div className="col-span-12 mt-10">
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
            {openWork && (
                <ConfirmModal isOpen={openWork} handleClose={() => setOpenWork(!openWork)}>
                    <div className="mx-2 pb-10 w-full overflow-scroll h-[100%] pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-10 md:pl-8 md:w-2/3 lg:w-1/2 md:mx-0 overflow-x-hidden">
                        <div className="col-span-12 grid grid-cols-12 ">
                            <div className="col-span-12 grid grid-cols-12 mb-5">
                                <p className="font-thW text-frhS leading-shL text-modalTitle col-span-10 md:col-span-11">
                                    <BusinessCenterIcon sx={{ color: '#FE5E0A', marginRight: '0.5rem' }} />
                                    Work History
                                </p>
                                <div className="col-span-2 md:col-span-1 grid pr-2 justify-items-end md:justify-items-center">
                                    <button onClick={() => setOpenWork(!openWork)}>
                                        <CloseIcon
                                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                            className="w-8 h-8 p-2 "
                                        />
                                    </button>
                                </div>
                            </div>
                            {workHistoryArray &&
                                !displayWorkHistory &&
                                !workEdit &&
                                workHistoryArray.map((item, index) => (
                                    <div key={index} className="col-span-11 grid grid-cols-12 pb-5 md:mb-5 sm:max-md:gap-x-2 ">
                                        <div className="col-span-3 sm:col-span-2 flex items-center justify-center md:col-span-2 lg:col-span-2">
                                            <div className="w-16 h-16 bg-skillColor flex items-center justify-center rounded-[1rem]">
                                                <BusinessCenterOutlinedIcon
                                                    sx={{
                                                        color: '#FE5E0A',
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
                                        {confirmDelete && workIndex == index && (
                                            <div className="mt-3 col-span-12 border-2 p-2 border-red-800 rounded-2xl flex">
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
                                        )}
                                        <div className="col-span-12 ml-2 block h-0.5 bg-fadedText mt-2 md:h-[0.5px] md:ml-3"></div>
                                    </div>
                                ))}
                            {workEdit && (
                                <form className="col-span-11 grid grid-cols-12" onSubmit={editWorkHistory}>
                                    <div className="col-span-12 md:col-span-6 pr-2 md:pl-2">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Title</p>
                                        <input
                                            value={editedWork.title}
                                            type="text"
                                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                setEditedWork({ ...editedWork, title: e.currentTarget.value })
                                            }
                                            placeholder="Add Title"
                                            className="focus:ring-orange-500 focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-6 pr-2 md:pl-2">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Company Name</p>
                                        <input
                                            value={editedWork.companyName}
                                            type="text"
                                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                setEditedWork({ ...editedWork, companyName: e.currentTarget.value })
                                            }
                                            placeholder="Add Company Name"
                                            className="focus:ring-orange-500 focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-6 pr-2 md:pl-2">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Start Date</p>
                                        <input
                                            value={editedWork.startDate}
                                            type="date"
                                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                setEditedWork({ ...editedWork, startDate: e.currentTarget.value })
                                            }
                                            className="focus:ring-orange-500 focus:border-0 pr-3 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                        />
                                    </div>
                                    {editedWork.endDate && (
                                        <div className="col-span-12 md:col-span-6 pr-2 md:pl-2">
                                            <p className="font-fhW text-smS mt-5 mb-2 leading-shL">End Date</p>
                                            <input
                                                max={new Date().toISOString().split('T')[0]}
                                                value={editedWork.endDate}
                                                type="date"
                                                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                    setEditedWork({ ...editedWork, endDate: e.currentTarget.value })
                                                }
                                                className="focus:ring-orange-500 focus:border-0 pr-3 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                            />
                                        </div>
                                    )}
                                    <div className="col-span-12 pr-2 max-md:mb-10 md:pl-2">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Job Description</p>
                                        <ReactQuill
                                            className="h-28 text-addS"
                                            placeholder="Add Description"
                                            theme="snow"
                                            value={editedWork.jobDescription}
                                            onChange={(e) => setEditedWork({ ...editedWork, jobDescription: e })}
                                        />
                                    </div>
                                    <div className="col-span-12 grid justify-items-end pr-3 mt-10 md:mt-16">
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
                            {(displayWorkHistory || workHistoryArray.length == 0) && (
                                <form className="col-span-11 grid grid-cols-12" onSubmit={addWorkHistory}>
                                    <div className="col-span-12 md:col-span-6 pr-2 md:pl-2">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Title</p>
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
                                            className="focus:ring-orange-500 focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-6 pr-2 md:pl-2">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Company Name</p>
                                        <input
                                            value={workHistoryData.companyName}
                                            type="text"
                                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                setWorkHistoryData({ ...workHistoryData, companyName: e.currentTarget.value })
                                            }
                                            placeholder="Add Company Name"
                                            className="focus:ring-orange-500 focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                        />
                                    </div>
                                    <div className="col-span-12 pr-2 md:pl-2 flex items-center mt-3">
                                        <input
                                            type="checkbox"
                                            className="focus:ring-orange-500 focus:border-0 border-[1px] rounded-xl h-4 pl-5 text-addS"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                        <span className="font-fhW text-smS pl-2 leading-shL">I currently work here</span>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 pr-2 md:pl-2">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Start Date</p>
                                        <input
                                            value={workHistoryData.startDate}
                                            type="date"
                                            onChange={(e) => setWorkHistoryData({ ...workHistoryData, startDate: e.currentTarget.value })}
                                            className="focus:ring-orange-500 focus:border-0 pr-3 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                        />
                                    </div>
                                    {!isChecked && (
                                        <div className="col-span-12 md:col-span-6 pr-2 md:pl-2">
                                            <p className="font-fhW text-smS mt-5 mb-2 leading-shL">End Date</p>
                                            <input
                                                max={new Date().toISOString().split('T')[0]}
                                                value={workHistoryData.endDate}
                                                type="date"
                                                onChange={(e) =>
                                                    isChecked
                                                        ? setWorkHistoryData({ ...workHistoryData, endDate: 'present' })
                                                        : setWorkHistoryData({ ...workHistoryData, endDate: e.currentTarget.value })
                                                }
                                                className="focus:ring-orange-500 focus:border-0 pr-3 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                            />
                                        </div>
                                    )}
                                    <div className="col-span-12 pr-2 max-md:mb-10 md:pl-2">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Job Description</p>
                                        <ReactQuill
                                            className="h-28 text-addS"
                                            placeholder="Add Description"
                                            theme="snow"
                                            value={workHistoryData.jobDescription}
                                            onChange={(e) => setWorkHistoryData({ ...workHistoryData, jobDescription: e })}
                                        />
                                    </div>

                                    <div className="col-span-12 grid justify-items-end pr-3 mt-10 md:mt-16">
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
                        {!displayWorkHistory && !workEdit && workHistoryArray.length !== 0 && workHistoryArray.length <= 3 && (
                            <div className="col-span-12 flex justify-end pr-3 mt-10 md:mt-5 xl:mt-0">
                                <button
                                    onClick={() => setDisplayWorkHistory(true)}
                                    className="text-green-700 bg-lightGreen h-16 w-full xl:w-56 rounded-full "
                                >
                                    Add Job
                                </button>
                            </div>
                        )}
                    </div>
                </ConfirmModal>
            )}
        </div>
    );
};
export default WorkHitory;
