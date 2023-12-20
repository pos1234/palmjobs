import { useEffect, useState } from 'react';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import { updateCertificates } from '@/backend/candidateBackend';
import FormModal from './FormModal';
import { DeleteConfirmation, SubmitButton } from '../TextInput';
import CloseIcon from '@mui/icons-material/Close';
const CertificateDetails = (props: any) => {
    return (
        <div
            key={props.keys}
            className="w-full flex gap-3 bg-lightGreen rounded-xl p-5"
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
const Certificate = (props: any) => {
    const [userDetail, setUserDetail] = useState<any>(props.userDetail)
    const [openCertificate, setOpenCertificate] = useState(false);
    const [editOneCertificate, setEditOneCertificate] = useState(false);
    const [displayCertificate, setDisplayCertificate] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [certificateArray, setCertificateArray] = useState<any[]>([]);
    const [certificateIndex, setCertificateIndex] = useState(Number);
    const [loadings, setLoadings] = useState(false)
    const [certificateData, setCertificateData] = useState({
        name: '',
        issuedBy: '',
        year: ''
    });
    const [errorCode, setErrorCode] = useState(0);
    const [errorMessage, setErrorMessage] = useState('')
    const convertToString = (str: any) => {
        return JSON.stringify(str);
    };
    const maximumCertificates = 2;
    const indexCertificate = (index: number) => {
        setCertificateIndex(index);
        setCertificateData(certificateArray[index]);
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
                            certificates: converted,
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
    const addCertificate = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setErrorMessage('');
        setErrorCode(0)
        if (certificateData.name == '') {
            setErrorCode(1);
            setErrorMessage('please enter certificate name')
        } else if (certificateData.issuedBy == '') {
            setErrorCode(2);
            setErrorMessage('please enter issued by')
        } else if (certificateData.year == '') {
            setErrorCode(3);
            setErrorMessage('please enter year issued')
        } else {
            setLoadings(true);
            const updatedCertificateArray = [...certificateArray, certificateData];
            updateCertificates(convertToString(updatedCertificateArray)).then((res: any) => {
                setLoadings(false);
                updateLocal(updatedCertificateArray)
                toast.success('Successfully Added Certificate');
                setErrorMessage('')
                setCertificateData({
                    name: '',
                    issuedBy: '',
                    year: ''
                })
                setOpenCertificate(false)
                setCertificateArray(updatedCertificateArray);
                /* const certificate = JSON.parse(res.certificates);
                setCertificateArray(certificate); */
                setErrorCode(0);

            }).catch((error: any) => {
                toast.error(`Certificate Not Added ${error}`);
                setLoadings(false);
                setErrorCode(0);
                setErrorMessage('')
            });
        }
    };
    const editCertificate = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (certificateData.name == '') {
            setErrorCode(1);
            setErrorMessage('please enter certificate name')
        } else if (certificateData.issuedBy == '') {
            setErrorCode(2);
            setErrorMessage('please enter issued by')
        } else if (certificateData.year == '') {
            setErrorCode(3);
            setErrorMessage('please enter year issued')
        } else {
            setLoadings(true);
            certificateArray[certificateIndex] = certificateData;
            const response = updateCertificates(convertToString(certificateArray));
            response
                .then((res) => {
                    setLoadings(false);
                    setOpenCertificate(false)
                    setEditOneCertificate(false)
                    setErrorCode(0);
                    setErrorMessage('')
                    toast.error('Certificate Saved Successfully');
                    setCertificateData({
                        name: '',
                        issuedBy: '',
                        year: ''
                    })
                    updateLocal(certificateArray)
                })
                .catch((error) => {
                    console.log(error);
                    setErrorCode(0);
                    setErrorMessage('')
                    toast.error('Certificate Not Saved ');
                    setLoadings(false);
                });
        }
    };
    const deleteCertificate = (index: number) => {
        certificateArray.splice(index, 1);
        const result = updateCertificates(convertToString(certificateArray));
        result
            .then((res) => {
                updateLocal(certificateArray)
                toast.success('Successfully Deleted Certificate');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Certificate Not Deleted');
            });
    };
    const userData = async () => {
        if (userDetail) {
            const result = JSON.parse(userDetail.certificates)
            setCertificateArray(result || []);
        }
    }
    useEffect(() => {
        userData()
    }, [])
    useEffect(() => {
        if (openCertificate == false) {
            setEditOneCertificate(false);
            setDisplayCertificate(false);
            setConfirmDelete(false);
        }
    }, [openCertificate]);
    return (
        <div className="rounded-xl p-6 border-2 w-full md:w-1/2">
            <div className="flex flex-wrap gap-5">
                <div className="w-full flex justify-between">
                    <p className=" font-fhW text-fhS leading-fhL flex gap-2 items-center">
                        <img src='/icons/certificate.svg' className='w-5' />
                        Certificates
                    </p>
                    <div>
                        <EditIcon
                            onClick={() => setOpenCertificate(true)}
                            sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                            className="w-7 h-7 p-1.5 cursor-pointer"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap gap-5 w-full">
                    {certificateArray &&
                        certificateArray.map((item, index) => (
                            <CertificateDetails key={index} certificateName={item.name} givenBy={item.issuedBy} givenDate={item.year} />
                        ))}
                </div>
                {certificateArray.length == 0 && (
                    <div className='w-full flex flex-col justify-center items-center gap-5'>
                        <p className="font-smW text-smS leading-smL text-lightGrey" > You haven't added certifications, yet.</p>
                        <button className='bg-black text-textW px-16 py-3 rounded-xl cursor-pointer' onClick={() => setOpenCertificate(true)}>Add Certificate</button>
                    </div>
                )}
            </div>
            <FormModal
                tipText='Adding certifications can greatly enhance your profile. Be sure to include the full name of the certificate, the issuing organization, and the date you received it. This information showcases your commitment to professional development and can be a deciding factor for potential employers.'
                text='Certificate' icon={<img src='/icons/certificate.svg' className='w-7' />}
                addText='Add Certificate' openModal={openCertificate} setOpenModal={setOpenCertificate}>
                <div className='w-full flex flex-wrap'>
                    {!editOneCertificate && !displayCertificate && certificateArray.length !== 0 && (
                        <div className="w-full flex flex-wrap gap-3 pr-3">
                            {certificateArray &&
                                !editOneCertificate &&
                                certificateArray.map((item, index) => (
                                    <div
                                        key={index}
                                        className="w-full flex justify-between border-2 rounded-2xl p-3 h-auto"
                                    >
                                        <div className='flex w-full flex-wrap gap-2'>
                                            <div className='flex w-full justify-between'>
                                                <div className='flex gap-2'>
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
                                                </div>
                                                <div className="flex flex-col">
                                                    <EditIcon
                                                        onClick={() => {
                                                            setEditOneCertificate(true);
                                                            indexCertificate(index);
                                                        }}
                                                        sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                                        className="w-6 h-6 p-1.5 mr-2 cursor-pointer"
                                                    />
                                                    <CloseIcon
                                                        onClick={() => {
                                                            setConfirmDelete(true);
                                                            setCertificateIndex(index);
                                                        }}
                                                        sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                                        className="w-6 h-6 p-1.5 mr-2 mt-5 cursor-pointer"
                                                    />
                                                </div>
                                            </div>
                                            <div className='w-full px-3'>
                                                {confirmDelete && certificateIndex == index && <DeleteConfirmation
                                                    setConfirmDelete={setConfirmDelete}
                                                    deleteItem={() => deleteCertificate(index)}
                                                />

                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                    {(displayCertificate || editOneCertificate || certificateArray.length == 0) && (
                        <form onSubmit={editOneCertificate == true ? editCertificate : addCertificate} className="gap-5 flex flex-col w-full">
                            <div className='flex flex-col gap-2'>
                                <p className="font-fhW text-smS leading-shL">Certificate Name</p>
                                <input
                                    value={certificateData.name}
                                    type="text"
                                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                        setCertificateData({ ...certificateData, name: e.currentTarget.value })
                                    }
                                    placeholder="Add Certificate Name"
                                    className={`h-12 pl-5 bg-textW rounded-xl focus:border-gradientSecond border-[1px] focus:border-[1px] focus:ring-0 w-full lg:w-96 ${errorCode == 1 ? 'border-orange-500' : 'border-gray-200'}`}
                                />
                                {errorCode == 1 && <p className='text-orange-500'>{errorMessage}</p>}
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className="font-fhW text-smS leading-shL">Certificate Issued By</p>
                                <input
                                    value={certificateData.issuedBy}
                                    type="text"
                                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                        setCertificateData({ ...certificateData, issuedBy: e.currentTarget.value })
                                    }
                                    placeholder="Certificate Issued By"
                                    className={`h-12 pl-5 bg-white rounded-xl border-[1px] focus:ring-0 focus:border-gradientSecond w-full lg:w-96 ${errorCode == 2 ? 'border-orange-500' : 'border-gray-200'}`}
                                />
                                {errorCode == 2 && <p className='text-orange-500'>{errorMessage}</p>}
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className="font-fhW text-smS leading-shL">Year Issued</p>
                                <input
                                    value={certificateData.year}
                                    type="date"
                                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                        const selectedDate = e.currentTarget.value;
                                        if (selectedDate <= new Date().toISOString().split('T')[0])
                                            setCertificateData({ ...certificateData, year: selectedDate });
                                    }}
                                    placeholder="Year Issued"
                                    className={`h-12 pl-5 bg-white rounded-xl border-[1px] focus:ring-0 focus:border-gradientSecond w-full lg:w-96 appearNone ${errorCode == 3 ? 'border-orange-500' : 'border-gray-200'}`}
                                    max={new Date().toISOString().split('T')[0]}
                                />
                                {errorCode == 3 && <p className='text-orange-500'>{errorMessage}</p>}
                            </div>
                            <div className='w-full flex mt-5 '>
                                <div className='w-full md:w-52'>
                                    <SubmitButton loading={loadings} buttonText="Save" />
                                </div>
                            </div>
                        </form>
                    )}
                    {!displayCertificate && !editOneCertificate && certificateArray.length !== 0 && certificateArray.length <= maximumCertificates && (
                        <div className='w-full pt-10 flex md:justify-end'>
                            <button
                                onClick={() => setDisplayCertificate(true)}
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
export default Certificate;
