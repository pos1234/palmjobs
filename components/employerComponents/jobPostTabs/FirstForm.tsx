import React, { useEffect, useState } from 'react'
import { RequiredTextLabel } from './RequiredTextLabel';
import TextInput, { SubmitButton } from '@/components/TextInput';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditLocationAltOutlinedIcon from '@mui/icons-material/EditLocationAltOutlined';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import { postFirstTab, updateFirstTab } from '@/lib/employerBackend';
import { toast } from 'react-toastify';

const FirstForm = (props: any) => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobTitleError, setJobTitleError] = useState('');
    const [remote, setRemote] = useState(false);
    const [hybrid, setHybrid] = useState(false);
    const [location, setLocation] = useState('');
    const [locationError, setLocationError] = useState('');
    const [addLocation, setAddLocation] = useState(true);
    const [openPositions, setOpenPositions] = useState<number>(1);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (props.editedData) {
            setJobTitle(props.editedData.jobTitle);
            setOpenPositions(props.editedData.openPositions);
            console.log(props.editedData.jobLocation.toLowerCase());

            if (props.editedData.jobLocation.toLowerCase() == 'remote') {
                setRemote(true);
                setHybrid(false);
                setAddLocation(false);
            }
            if (props.editedData.jobLocation.toLowerCase() == 'hybrid') {
                setRemote(false);
                setHybrid(true);
                setAddLocation(false);
            }
            if (props.editedData.jobLocation.toLowerCase() !== 'hybrid' && props.editedData.jobLocation.toLowerCase() !== 'remote') {
                setRemote(false);
                setHybrid(false);
                setAddLocation(true);
                setLocation(props.editedData.jobLocation);
            }
        }
    }, [props.editedData])
    const handleFirstSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (props.first && !props.second && !props.third && !props.fourth) {
            setJobTitleError('');
            if (jobTitle == '') {
                setJobTitleError('Job Titile is required');
            } else if (addLocation && location == '') {
                setLocationError('Please Provide Location');
            } else {
                if (props.postingJobId) {
                    setLoading(true);
                    updateFirstTab(jobTitle, openPositions.toString(), location, props.postingJobId)
                        .then((res: any) => {
                            setLoading(false);
                            toast.success('Saved as Draft');
                            props.setFourth(false);
                            props.setThird(false);
                            props.setSecond(true);
                            props.setFirst(false);
                            props.setChooseJob(false);
                        })
                        .catch((error) => {
                            setLoading(false);
                            toast.error(`Draft Not Saved ${error}`);
                            console.log(error);
                        });
                } else {
                    setLoading(true);
                    postFirstTab(jobTitle, openPositions.toString(), location)
                        .then((res: any) => {
                            props.setPostingJobId(res.$id);
                            setLoading(false);
                            toast.success('Saved as Draft');
                            props.setFourth(false);
                            props.setThird(false);
                            props.setSecond(true);
                            props.setFirst(false);
                            props.setChooseJob(false);
                        })
                        .catch((error) => {
                            setLoading(false);
                            toast.error(`Draft Not Saved ${error}`);
                            console.log(error);
                        });
                }
            }
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 1) {
            setOpenPositions(value);
        }
    };
    return (
        <form
            onSubmit={handleFirstSubmit}
            className={props.first ? 'col-span-12 pt-5 space-y-3 ' : 'hidden'}
        >
            <div className="text-neutral-900  font-semibold leading-10 text-xl md:text-3xl">Provide Basic Information</div>
            <RequiredTextLabel text="Job Title" />
            <TextInput errorMessage={jobTitleError} placeHolder="Job Position" value={jobTitle} setFunction={setJobTitle} />
            <RequiredTextLabel text="How many open roles ?" />
            <div className="flex gap-x-5 items-center mt-3">
                <div
                    onClick={() => {
                        if (openPositions > 1) setOpenPositions(openPositions - 1);
                    }}
                    className="text-gradientFirst rounded-xl p-0.5 flex items-center justify-center cursor-pointer border-2 border-stone-300 active:border-gradientFirst"
                >
                    <RemoveIcon />
                </div>
                <input
                    type="number"
                    value={openPositions}
                    onChange={handleInputChange}
                    className="border-2 w-16 py-2 text-center rounded-3xl hideIncrease focus:border-gradientFirst focus:ring-0"
                />
                <div
                    onClick={() => setOpenPositions(openPositions + 1)}
                    className="text-gradientFirst rounded-xl p-0.5 flex items-center justify-center cursor-pointer border-2 border-stone-300 active:border-gradientFirst"
                >
                    <AddIcon />
                </div>
            </div>
            <RequiredTextLabel text="Which option best describe this job's location ?" />
            <div className="flex bg-forBack  p-2 gap-x-5 w-full lg:w-1/2">
                <div
                    onClick={() => {
                        setLocation('');
                        setAddLocation(true);
                        setRemote(false);
                        setHybrid(false);
                    }}
                    className={
                        addLocation
                            ? 'flex flex-col rounded-md relative bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW cursor-pointer w-36 pl-3 py-2 h-20'
                            : 'hover:bg-skillColor hover:text-gradientFirst flex flex-col relative bg-textW cursor-pointer w-36 pl-3 py-2 h-20'
                    }
                >
                    <EditLocationAltOutlinedIcon className="-ml-2" />
                    <p className="absolute bottom-0">Add Location</p>
                </div>
                <div
                    onClick={() => {
                        setAddLocation(false);
                        setRemote(true);
                        setHybrid(false);
                        setLocation('Remote');
                    }}
                    className={
                        remote
                            ? 'flex rounded-md flex-col relative bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW cursor-pointer w-36 pl-3 py-2 h-20'
                            : 'hover:bg-skillColor hover:text-gradientFirst flex flex-col relative bg-textW cursor-pointer w-36 pl-3 py-2 h-20'
                    }
                >
                    <SettingsRemoteIcon className="-ml-2" />
                    <p className="absolute bottom-0">Remote</p>
                </div>
                <div
                    onClick={() => {
                        setAddLocation(false);
                        setRemote(false);
                        setHybrid(true);
                        setLocation('Hybrid');
                    }}
                    className={
                        hybrid
                            ? 'flex rounded-md flex-col relative bg-gradient-to-r from-gradientFirst to-gradientSecond text-textW cursor-pointer w-36 pl-3 py-2 h-20'
                            : 'hover:bg-skillColor hover:text-gradientFirst flex flex-col relative bg-textW cursor-pointer w-36 pl-3 py-2 h-20'
                    }
                >
                    <GroupWorkIcon className="-ml-2" />
                    <p className="absolute bottom-0">Hybrid</p>
                </div>
            </div>
            {addLocation == true && (
                <>
                    <RequiredTextLabel text="Address" />
                    <TextInput placeHolder="Job Address" errorMessage={locationError} value={location} setFunction={setLocation} />
                </>
            )}
            <div className="flex pt-10 justify-end">
                <div className='w-full col-span-12 flex md:justify-end mt-10'>
                    <div className='w-full md:w-80'>
                        <SubmitButton loading={loading} buttonText="Continue" />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default FirstForm