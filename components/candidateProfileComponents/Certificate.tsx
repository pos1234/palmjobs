import { useEffect, useState } from 'react';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { getUserDetail, updateCertificates } from '@/lib/candidateBackend';
import FormModal from './FormModal';
import { SubmitButton } from '../TextInput';
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
const Certificate = () => {
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
    const convertToArray = (str: any) => {
        if (str != '') return JSON.parse(str);
        else return '';
    };
    const maximumCertificates = 2;
    const indexCertificate = (index: number) => {
        setCertificateIndex(index);
        setCertificateData(certificateArray[index]);
    };
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
            certificateArray.push(certificateData);
            setLoadings(true);
            updateCertificates(convertToString(certificateArray)).then((res: any) => {
                setLoadings(false);
                setOpenCertificate(false)
                toast.success('Successfully Added Certificate');
                const certificate = JSON.parse(res.certificates);
                setCertificateArray(certificate);
                setErrorCode(0);
                setErrorMessage('')
                setCertificateData({
                    name: '',
                    issuedBy: '',
                    year: ''
                });
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
                    toast.success('Certificate Saved Successfully');
                    setCertificateData({
                        name: '',
                        issuedBy: '',
                        year: ''
                    })
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
                toast.success('Successfully Deleted Certificate');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Certificate Not Deleted');
            });
    };
    const userData = async () => {
        const userInfo = await getUserDetail()
        const certificate = convertToArray(userInfo.certificates) || [];
        setCertificateArray(certificate || '');
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
                    <p className=" font-fhW text-fhS leading-fhL">
                        <WorkspacePremiumIcon sx={{ color: '#00A82D', marginRight: '0.5rem' }} />
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
                        <button className='bg-black text-textW px-16 w-2/3 py-3 rounded-xl cursor-pointer' onClick={() => setOpenCertificate(true)}>Add Certificate</button>
                    </div>
                )}
            </div>
            <FormModal
                tipText='Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos architecto dolore sint tenetur dolores, repellendus autem temporibus modi officia soluta. Facilis, dignissimos? Error, assumenda. Laborum, animi hic. Ab, doloremque id.'
                text='Certificate' icon={<WorkspacePremiumIcon />}
                addText='Add Certificate' openModal={openCertificate} setOpenModal={setOpenCertificate}>
                {!editOneCertificate && !displayCertificate && certificateArray.length !== 0 && (
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
                {(displayCertificate || editOneCertificate || certificateArray.length == 0) && (
                    <form onSubmit={editOneCertificate == true ? editCertificate : addCertificate} className="gap-5 flex flex-col w-full md:items-center">
                        <div className='flex flex-col gap-2'>
                            <p className="font-fhW text-smS leading-shL">Certificate Name</p>
                            <input
                                value={certificateData.name}
                                type="text"
                                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                    setCertificateData({ ...certificateData, name: e.currentTarget.value })
                                }
                                placeholder="Add Certificate Name"
                                className={`h-12 pl-5 bg-white rounded-xl border  focus:ring-gradientSecond focus:border-0 w-full md:w-96 ${errorCode == 1 ? 'border-orange-500' : 'border-gray-200'}`}
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
                                className={`h-12 pl-5 bg-white rounded-xl border  focus:ring-gradientSecond focus:border-0 w-full md:w-96 ${errorCode == 2 ? 'border-orange-500' : 'border-gray-200'}`}
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
                                className={`h-12 pl-5 bg-white rounded-xl border  focus:ring-gradientSecond focus:border-0 w-full md:w-96 appearNone ${errorCode == 3 ? 'border-orange-500' : 'border-gray-200'}`}
                                max={new Date().toISOString().split('T')[0]}
                            />
                            {errorCode == 3 && <p className='text-orange-500'>{errorMessage}</p>}
                        </div>
                        <div className='w-full flex md:justify-end'>
                            <div className='w-full md:w-96'>
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
            </FormModal>
        </div>
    );
};
export default Certificate;
