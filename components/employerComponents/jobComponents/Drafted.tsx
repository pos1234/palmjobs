import { deleteDraftedJobs, fetchDraftedJobs, } from '@/backend/employerBackend';
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
        <div className="col-span-12 flex justify-between px-3 py-3 bg-textW border-2 rounded-lg" key={props.id}>
            <div className="flex flex-col justify-center">
                <div className="flex flex-col">
                    <p className="text-darkBlue font-midRW text-midRS sm:font-fhW ">{props.jobTitle}</p>
                    <p className="text-fadedText rounded-xl md:hidden">
                        <PinDropOutlinedIcon sx={{ fontSize: '1rem' }}
                            className="mr-1 " /> {props.jobLocation}
                    </p>
                </div>
                {props.jobLocation && (
                    <ul className="mt-5 text-[11px] flex gap-x-3 col-span-12 md:text-[0.8rem] md:mt-1 md:gap-x-5">
                        <li className="hidden md:bg-textW md:text-fadedText md:flex md:p-0 flex items-center">
                            <PinDropOutlinedIcon
                                sx={{ fontSize: '1rem' }}
                                className="mr-1 "
                            />
                            {props.jobLocation}
                        </li>
                    </ul>
                )}
            </div>
            <div className="flex items-center">

                <button
                    onClick={() => {
                        props.setEditedJobId(props.id);
                    }}
                    className=" h-10 w-32 px-5 hover:text-gradientFirst cursor-pointer hover:underline"
                >
                    Continue
                </button>
                <button>
                    <DeleteIcon
                        onClick={() => {
                            handleDelete(props.id);
                        }}
                        sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                        className="w-7 h-7 p-1.5 mr-2 cursor-pointer"
                    />
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
            <div className='max-h-[30rem] overflow-y-auto p-1 xl:p-3 mt-7 flex flex-col gap-4 thinScrollBar'>
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
            </div>

        </>
    );
};

export default Drafted;
