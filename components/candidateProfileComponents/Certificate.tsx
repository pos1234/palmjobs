import { useEffect, useState } from 'react';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmModal from '../ConfirmModal';
import { MiddleWare } from '@/lib/middleware';
import WorkHitory from './CertificateEducationComponent/WorkHistory';
import Education from './CertificateEducationComponent/Education';
const CertificateDetails = (props: any) => {
    return (
        <div
            /* key={props.keys} */
            className="col-span-12  grid grid-cols-12 bg-lightGreen rounded-2xl p-5 sm:max-md:col-span-6 md:max-lg:col-span-4 lg:col-span-11"
        >
            <div className="col-span-2">
                <WorkspacePremiumIcon sx={{ color: 'green' }} className="mt-2" />
            </div>
            <div className="col-span-10">
                <p className="font-dfvW text-dfvS leading-dfvL">{props.certificateName}</p>
                <p className="font-fhW text-fhS leading-fhL text-lightGrey">{props.givenBy}</p>
                <p className="text-smRs mt-2">
                    <CalendarTodayIcon sx={{ fontSize: '0.8rem', marginTop: '-0.3rem' }} />
                    <span className="text-stone-700 ml-2">{props.givenDate}</span>
                </p>
            </div>
        </div>
    );
};
const Certificate = () => {
    const loadingIn = '/images/loading.svg';
    const [openCertificate, setOpenCertificate] = useState(false);
    const [editOneCertificate, setEditOneCertificate] = useState(false);
    const [displayCertificate, setDisplayCertificate] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const maximumCertificates = 5;
    const {
        certificateArray,
        addCertificate,
        editCertificate,
        deleteCertificate,
        editedCertificate,
        setEditedCertificate,
        loadings,
        certificateData,
        setCertificateData,
        certificateIndex,
        setCertificateIndex,
        setCertificateEdit
    } = MiddleWare();
    const indexCertificate = (index: number) => {
        setCertificateEdit(true);
        setCertificateIndex(index);
        setEditedCertificate(certificateArray[index]);
    };
    useEffect(() => {
        if (openCertificate == false) {
            setEditOneCertificate(false);
            setDisplayCertificate(false);
            setConfirmDelete(false);
        }
    }, [openCertificate]);
    return (
        <div className="col-span-12 grid grid-cols-12 gap-y-4 gap-x-3 mt-0 pb-1">
            <div className="col-span-12 bg-textW rounded-3xl py-5  pt-8 flex lg:col-span-4 flex-col lg:pl-14">
                <div className="grid grid-cols-12 ">
                    <div className="col-span-7 lg:col-span-8">
                        <p className=" font-fhW text-fhS leading-fhL pl-1">
                            <WorkspacePremiumIcon sx={{ color: '#00A82D', marginRight: '0.5rem' }} />
                            Certificates
                        </p>
                    </div>
                    <div className="col-span-5 lg:col-span-4 text-right md:pr-5">
                        <p className="font-fhW text-fhS leading-fhL pl-1 lg:pl-5">
                            <EditIcon
                                onClick={() => setOpenCertificate(true)}
                                sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                className="w-7 h-7 p-1.5 mr-2 cursor-pointer"
                            />
                        </p>
                    </div>
                    <div className="col-span-12 grid grid-cols-12 mt-6 sm:max-md:gap-x-3 md:max-lg:gap-x-2 gap-y-4">
                        {certificateArray &&
                            certificateArray.map((item, index) => (
                                <CertificateDetails key={index} certificateName={item.name} givenBy={item.issuedBy} givenDate={item.year} />
                            ))}
                    </div>

                    {certificateArray.length == 0 && (
                        <p className="font-smW text-smS leading-smL text-lightGrey col-span-12 pl-10 italic mt-3 lg:mt-5">
                            You haven't added certifications, yet.
                        </p>
                    )}
                </div>
            </div>
            <WorkHitory />
            <Education />
            {openCertificate && (
                <ConfirmModal
                    isOpen={openCertificate}
                    handleClose={() => {
                        setOpenCertificate(!openCertificate);
                    }}
                >
                    <div className="mx-2 pb-10 w-full pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-5 md:pl-8 md:w-2/3 lg:w-1/2 md:mx-0">
                        <div className="col-span-12 grid grid-cols-12 mt-5 sm:gap-y-5 xl:gap-y-2">
                            <div className="col-span-12 grid grid-cols-12 ">
                                <p className="font-thW text-frhS leading-shL text-modalTitle col-span-10 md:col-span-11">
                                    <WorkspacePremiumIcon sx={{ color: '#00A82D', marginRight: '0.5rem' }} />
                                    Certificates
                                    <span className="float-right text-smS text-fadedText">
                                        {certificateArray.length} / {maximumCertificates}
                                    </span>
                                </p>
                                <div className="col-span-2 md:col-span-1 grid pr-2 justify-items-end md:justify-items-center">
                                    <button onClick={() => setOpenCertificate(!openCertificate)}>
                                        <CloseIcon
                                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                            className="w-8 h-8 p-2 "
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {editOneCertificate === true && (
                            <form onSubmit={editCertificate} className="col-span-11 grid grid-cols-12 xl:pl-8">
                                <div className="col-span-12 md:col-span-7 pr-2 md:pl-2">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Certificate Name</p>
                                    <input
                                        value={editedCertificate.name}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedCertificate({ ...editedCertificate, name: e.currentTarget.value })
                                        }
                                        placeholder="Add Certificate Name"
                                        className="focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-7 pr-2 md:pl-2">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Certificate Issued By</p>
                                    <input
                                        value={editedCertificate.issuedBy}
                                        type="text"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                            setEditedCertificate({ ...editedCertificate, issuedBy: e.currentTarget.value })
                                        }
                                        placeholder="Certificate Issued By"
                                        className="focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-5 pr-2 md:pl-2">
                                    <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Year Issued</p>
                                    <input
                                        value={editedCertificate.year}
                                        type="date"
                                        onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                            const selectedDate = e.currentTarget.value;
                                            if (selectedDate <= new Date().toISOString().split('T')[0])
                                                setEditedCertificate({ ...editedCertificate, year: selectedDate });
                                        }}
                                        placeholder="Year Issued"
                                        className="focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS appearNone"
                                        max={new Date().toISOString().split('T')[0]}
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
                                            className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:col-start-8 xl:col-end-12 xl:mt-5 rounded-full"
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                            </form>
                        )}
                        {!editOneCertificate && !displayCertificate && (
                            <div className="col-span-11 gap-4 grid grid-cols-12 mt-6 sm:max-md:gap-x-3 md:max-lg:gap-x-2 gap-y-4">
                                {certificateArray &&
                                    !editOneCertificate &&
                                    certificateArray.map((item, index) => (
                                        <div
                                            key={index}
                                            className="col-span-12 grid grid-cols-12 border-2 rounded-2xl p-5 sm:max-md:col-span-6 lg:col-span-6"
                                        >
                                            <div className="col-span-2">
                                                <WorkspacePremiumIcon sx={{ color: 'green' }} className="mt-2" />
                                            </div>
                                            <div className="col-span-9">
                                                <p className="font-dfvW text-dfvS leading-dfvL">{item.name}</p>
                                                <p className="font-fhW text-fhS leading-fhL text-lightGrey">{item.issuedBy}</p>
                                                <p className="text-smRs mt-2">
                                                    <CalendarTodayIcon sx={{ fontSize: '0.8rem', marginTop: '-0.3rem' }} />
                                                    <span className="text-fadedText ml-1">{item.year}</span>
                                                </p>
                                            </div>
                                            <div className="col-span-1">
                                                <EditIcon
                                                    onClick={() => {
                                                        setEditOneCertificate(true);
                                                        indexCertificate(index);
                                                    }}
                                                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                                    className="w-6 h-6 p-1.5 mr-2 cursor-pointer"
                                                />
                                                <DeleteIcon
                                                    onClick={() => {
                                                        setConfirmDelete(true);
                                                        setCertificateIndex(index);
                                                    }}
                                                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                                    className="w-6 h-6 p-1.5 mr-2 mt-5 cursor-pointer"
                                                />
                                            </div>
                                            {confirmDelete && certificateIndex == index && (
                                                <div className="col-span-12 border-2 p-2 border-red-800 rounded-2xl">
                                                    <p>Are you Sure you want to delete?</p>
                                                    <button
                                                        onClick={() => setConfirmDelete(false)}
                                                        className="mt-3 rounded-[20%] bg-lightGreen text-red-500 py-0.5 px-1"
                                                    >
                                                        No
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            deleteCertificate(index);
                                                            setConfirmDelete(false);
                                                        }}
                                                        className="bg-lightGreen rounded-[20%] text-green-800 py-0.5 px-1 ml-5"
                                                    >
                                                        Yes
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        )}
                        {(displayCertificate || certificateArray.length == 0) && (
                            <div className="col-span-11 gap-4 grid grid-cols-12 sm:max-md:gap-x-3 md:max-lg:gap-x-2 gap-y-4">
                                <form onSubmit={addCertificate} className="col-span-12 grid grid-cols-12 xl:pl-8">
                                    <div className="col-span-12 md:col-span-7 pr-2 md:pl-2">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Certificate Name</p>
                                        <input
                                            value={certificateData.name}
                                            type="text"
                                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                setCertificateData({ ...certificateData, name: e.currentTarget.value })
                                            }
                                            placeholder="Add Certificate Name"
                                            className="focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-7 pr-2 md:pl-2">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Certificate Issued By</p>
                                        <input
                                            value={certificateData.issuedBy}
                                            type="text"
                                            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                                setCertificateData({ ...certificateData, issuedBy: e.currentTarget.value })
                                            }
                                            placeholder="Certificate Issued By"
                                            className="focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-5 pr-2 md:pl-2">
                                        <p className="font-fhW text-smS mt-5 mb-2 leading-shL">Year Issued</p>
                                        <input
                                            value={certificateData.year}
                                            type="date"
                                            onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                                const selectedDate = e.currentTarget.value;
                                                if (selectedDate <= new Date().toISOString().split('T')[0])
                                                    setCertificateData({ ...certificateData, year: selectedDate });
                                            }}
                                            placeholder="Year Issued"
                                            className="focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS appearNone"
                                            max={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                    <div className="col-span-12 grid justify-items-end pr-3 mt-5 ">
                                        {loadings == true ? (
                                            <img
                                                src={loadingIn}
                                                className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:w-56 rounded-full"
                                            />
                                        ) : (
                                            <button
                                                type="submit"
                                                className="self-end text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full xl:col-start-8 xl:col-end-12 xl:mt-5 rounded-full"
                                            >
                                                Save
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        )}
                        {!displayCertificate && !editOneCertificate && certificateArray.length !== 0 && certificateArray.length <= 3 && (
                            <div className="col-span-12 flex justify-end pr-3 mt-5 sm:mt-10 gap-x-5 gap-y-5 sm:gap-y-0 xl:gap-x-0">
                                <button
                                    onClick={() => setDisplayCertificate(true)}
                                    className="ml-full bg-lightGreen text-green-700 h-16 w-full xl:w-56 rounded-full col-span-12 sm:col-span-6 xl:col-span-7"
                                >
                                    Add new
                                </button>
                            </div>
                        )}
                    </div>
                </ConfirmModal>
            )}
        </div>
    );
};
export default Certificate;
