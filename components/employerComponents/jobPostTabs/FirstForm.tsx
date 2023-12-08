import React from 'react'
import { RequiredTextLabel } from './RequiredTextLabel';
import { SubmitButton, TextInputRelated } from '@/components/TextInput';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditLocationAltOutlinedIcon from '@mui/icons-material/EditLocationAltOutlined';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import { postFirstTab, updateFirstTab } from '@/backend/employerBackend';
import { toast } from 'react-toastify';
import { useJobPostContext } from '@/contextApi/jobPostData';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const FirstForm = (props: any) => {
    const { firstTabData, setFirstTabData, postingJobId, setPostingJobId, jobPostTabs, setPostingTabs } = useJobPostContext()
    const handleFirstSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setFirstTabData({
            ...firstTabData, jobTitleError: ''
        })
        if (firstTabData.jobTitle == '') {
            setFirstTabData({
                ...firstTabData, jobTitleError: 'Job Titile is required'
            })
        } else if (firstTabData.addLocation && firstTabData.location == '') {
            setFirstTabData({
                ...firstTabData, locationError: 'Please Provide Location'
            })
        } else {
            if (postingJobId !== '') {
                setFirstTabData({
                    ...firstTabData, loading: true
                })
                updateFirstTab(firstTabData.jobTitle, firstTabData.openPositions.toString(), firstTabData.location, postingJobId)
                    .then((res: any) => {
                        setFirstTabData({
                            ...firstTabData, loading: false
                        })
                        toast.success('Updated Successfully');
                        setPostingTabs({
                            ...jobPostTabs,
                            first: false,
                            second: true
                        })
                    })
                    .catch((error) => {
                        setFirstTabData({
                            ...firstTabData, loading: false
                        })
                        toast.error(`Not Updated ${error}`);
                        console.log(error);
                    });
            } else {
                setFirstTabData({
                    ...firstTabData, loading: true
                })
                postFirstTab(firstTabData.jobTitle, firstTabData.openPositions.toString(), firstTabData.location)
                    .then((res: any) => {
                        setFirstTabData({
                            ...firstTabData, loading: false
                        })
                        setPostingJobId(res.$id);
                        toast.success('Saved as Draft');
                        setPostingTabs({
                            ...jobPostTabs,
                            first: false,
                            second: true
                        })
                    })
                    .catch((error) => {
                        setFirstTabData({
                            ...firstTabData, loading: false
                        })
                        toast.error(`Draft Not Saved ${error}`);
                        console.log(error);
                    });
            }
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 1) {
            setFirstTabData({ ...firstTabData, openPositions: value });
        }
    };
    const handleLocationTab = (text: string) => {
        if (text == '1') {
            setFirstTabData({
                ...firstTabData,
                location: '',
                addLocation: true,
                remote: false,
                hybrid: false
            })
        }
        if (text == '2') {
            setFirstTabData({
                ...firstTabData,
                location: 'Remote',
                addLocation: false,
                remote: true,
                hybrid: false
            })
        }
        if (text == '3') {
            setFirstTabData({
                ...firstTabData,
                location: 'Hybrid',
                addLocation: false,
                remote: false,
                hybrid: true
            })
        }
    }
    const handleBack = () => {
        setPostingTabs({
            ...jobPostTabs,
            first: false,
            chooseJob: true
        })
    }
    return (
        <form
            onSubmit={handleFirstSubmit}
            className='col-span-12 pt-5 space-y-4'
        >
            <div className="text-neutral-900  font-semibold leading-10 text-xl">Provide Basic Information</div>
            <RequiredTextLabel text="Job Title" />
            <TextInputRelated
                errorMessage={firstTabData.jobTitleError}
                placeHolder="Job Position"
                value={firstTabData.jobTitle}
                setFunction={setFirstTabData}
                change={'jobTitle'}
                dataDistruct={firstTabData} />
            <RequiredTextLabel text="How many open roles?" />
            <div className="flex gap-x-5 items-center mt-3">
                <div
                    onClick={() => {
                        if (firstTabData.openPositions > 1) setFirstTabData({ ...firstTabData, openPositions: firstTabData.openPositions - 1 });
                    }}
                    className="text-gradientFirst rounded-full p-0.5 flex items-center justify-center cursor-pointer border-[1px] border-stone-300 active:border-gradientFirst"
                >
                    <RemoveIcon />
                </div>
                <input
                    type="number"
                    value={firstTabData.openPositions}
                    onChange={handleInputChange}
                    className="border-[1px] border-gray-300 w-16 py-1 text-center rounded-full hideIncrease focus:border-gradientFirst focus:ring-0"
                />
                <div
                    onClick={() => setFirstTabData({ ...firstTabData, openPositions: firstTabData.openPositions + 1 })}
                    className="text-gradientFirst rounded-full p-0.5 flex items-center justify-center cursor-pointer border-[1px] border-stone-300 active:border-gradientFirst"
                >
                    <AddIcon />
                </div>
            </div>
            <RequiredTextLabel text="Which option best describe this job's location?" />
            <div className="flex bg-forBack  p-2 gap-x-5 w-full lg:w-1/2">
                <div
                    onClick={() => handleLocationTab('1')}
                    className={`flex flex-col justify-between rounded-md w-36 pl-3 py-2 h-20 ${firstTabData.addLocation ? 'bg-gradientFirst text-textW' : 'border-[1px] hover:bg-gradientFirst cursor-pointer rounded-md hover:border-b-4 hover:border-b-black buttonBounce hover:text-textW'}`}
                >
                    <EditLocationAltOutlinedIcon className="-ml-2" />
                    <p >Add Location</p>
                </div>
                <div
                    onClick={() => handleLocationTab('2')}
                    className={`flex flex-col justify-between rounded-md w-36 pl-3 py-2 h-20 ${firstTabData.remote ? 'bg-gradientFirst text-textW' : 'border-[1px] hover:bg-gradientFirst cursor-pointer rounded-md hover:border-b-4 hover:border-b-black buttonBounce hover:text-textW'}`}
                >
                    <SettingsRemoteIcon className="-ml-2" />
                    <p >Remote</p>
                </div>
                <div
                    onClick={() => handleLocationTab('3')}
                    className={`flex flex-col justify-between rounded-md w-36 pl-3 py-2 h-20 ${firstTabData.hybrid ? 'bg-gradientFirst text-textW' : 'border-[1px] hover:bg-gradientFirst cursor-pointer rounded-md hover:border-b-4 hover:border-b-black buttonBounce hover:text-textW'}`}
                >
                    <GroupWorkIcon className="-ml-2" />
                    <p>Hybrid</p>
                </div>
            </div>
            {
                firstTabData.addLocation == true && (
                    <>
                        <RequiredTextLabel text="Address" />
                        <TextInputRelated
                            placeHolder="Job Address"
                            errorMessage={firstTabData.locationError}
                            value={firstTabData.location}
                            setFunction={setFirstTabData}
                            change={'location'}
                            dataDistruct={firstTabData} />
                    </>
                )
            }

            <div className="flex pt-10 justify-between gap-5 max-sm:flex-wrap">
                <div onClick={handleBack} className='w-full cursor-pointer md:w-60 flex items-center justify-center w-full rounded-xl bg-[#FAFAFA] h-14'>
                    <ArrowBackIcon sx={{ fontSize: '1rem' }} /> <span className='ml-2'>Back</span>
                </div>
                <div className='w-full md:w-60'>
                    <SubmitButton loading={firstTabData.loading} buttonText="Continue" />
                </div>
            </div>
        </form >
    )
}

export default FirstForm