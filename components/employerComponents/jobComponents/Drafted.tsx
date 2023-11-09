import { deleteDraftedJobs,  fetchDraftedJobs, } from '@/lib/employerBackend';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployerJobShimmer from '../../shimmer/EmpJobShimmer';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
const DraftedJobs = (props: any) => {
    const handleDelete = (id: any) => {
        deleteDraftedJobs(id).then((res) => {
            toast.success('Successfully Removed');
            fetchDraftedJobs().then((res: any) => {
                props.setterFuntion(res.documents);
            });
        });
    };
    return (
        <div className="col-span-12 grid grid-cols-12 py-3 bg-textW" key={props.id}>
            <div className="col-span-12 pl-5 grid grid-cols-12 md:col-span-10 lg:col-span-8">
                <div className="col-span-10 pl-1">
                    <p className="text-darkBlue font-midRW text-midRS sm:font-fhW sm:text-frhS">{props.jobTitle}</p>
                    <p className="text-fadedText rounded-full md:hidden">
                        <PinDropOutlinedIcon sx={{ fontSize: '1.2rem', marginTop: '-0.2rem' }} /> {props.jobLocation}
                    </p>
                </div>
                {props.jobLocation && (
                    <ul className="mt-5 text-[11px] flex gap-x-3 col-span-12 md:text-[0.8rem] md:mt-1 md:gap-x-5">
                        <li className="hidden md:bg-textW md:text-fadedText md:flex md:p-0">
                            <PinDropOutlinedIcon
                                sx={{ fontSize: '1.2rem', marginTop: '-0.2rem' }}
                                className="text-[0.9rem] -mt-0.5 mr-1 md:text-[1.2rem]"
                            />
                            {props.jobLocation}
                        </li>
                    </ul>
                )}
            </div>
            <div className="col-span-12 flex items-center max-lg:border-b-2 max-lg:pb-5 max-lg:mx-3 md:col-span-12 md:max-lg:pt-10 lg:justify-center lg:col-span-4 lg:px-10 gap-x-4 xl:col-span-3">
                <button>
                    <DeleteIcon
                        onClick={() => {
                            handleDelete(props.id);
                        }}
                        sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                        className="w-7 h-7 p-1.5 mr-2 cursor-pointer"
                    />
                </button>
                <button
                    onClick={() => {
                        props.setEditedJobId(props.id);
                    }}
                    className=" h-[3.5rem] w-2/3 bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW rounded-full cursor-pointer md:full"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};
const Drafted = (props: any) => {
    const [draftedJobs, setDraftedJobs] = useState<any>();
    const [allLoading, setAllLoading] = useState(false);
    const [editedJobId, setEditedJobId] = useState('');
    const getDraftJobs = async () => {
        setAllLoading(true);
        const result = await fetchDraftedJobs();
        if (result && result.documents) {
            setDraftedJobs(result.documents);
            setAllLoading(false);
        }
    };
    useEffect(() => {
        getDraftJobs();
    }, []);
    const handleFullEdit = () => {
        if (editedJobId) {
            props.setJobId(editedJobId);
        }
    };
    useEffect(() => {
        handleFullEdit();
    }, [editedJobId]);
    return (
        <>
            {allLoading && (
                <div className="flex flex-col gap-y-10 pt-5">
                    <EmployerJobShimmer />
                    <EmployerJobShimmer />
                </div>
            )}
            {!allLoading &&
                draftedJobs &&
                draftedJobs.map((item: any, index: number) => {
                    return (
                        <DraftedJobs
                            setEditedJobId={setEditedJobId}
                            key={index}
                            setterFuntion={setDraftedJobs}
                            jobTitle={item.jobTitle}
                            jobLocation={item.jobLocation}
                            id={item.$id}
                        />
                    );
                })}
        </>
    );
};

export default Drafted;
