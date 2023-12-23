import React from 'react'
import ConfirmModal from '../ConfirmModal';
import RadioInput from '../RadioInput';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
const Filter = (props: any) => {
    return (
        <ConfirmModal isOpen={props.openFilter} handleClose={() => props.setOpenfilter(!props.openFilter)}>
            <div className="mx-2 pb-10 pl-5 bg-textW rounded-2xl grid grid-cols-12 pt-10 md:pl-8 md:w-2/3 lg:w-1/2 md:mx-0">
                <div className="col-span-12 grid grid-cols-12">
                    <div className="col-span-12 grid grid-cols-12">
                        <p className="font-thW text-frhS leading-shL text-modalTitle col-span-10 md:col-span-11">
                            <TuneIcon sx={{ color: '#00A82D', marginRight: '0.5rem', fontSize: '2rem' }} /> Filter
                        </p>
                        <div className="col-span-2 md:col-span-1 grid pr-2 justify-items-end md:justify-items-center">
                            <button onClick={() => props.setOpenfilter(!props.openFilter)}>
                                <CloseIcon
                                    sx={{ color: 'green', background: '#E5ECEC', borderRadius: '50%' }}
                                    className="w-8 h-8 p-2 "
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 flex flex-col gap-y-2 pt-3">
                    <p className="text-neutral-700 text-xl font-medium leading-7 mt-3 mb-1">Date Posted</p>
                    <div className="flex gap-x-4 flex-wrap gap-y-3">
                        <RadioInput radioName="datePosted" radioText="Any time" radioValue="Any time"
                            setFunction={props.setDatePosted}
                            checked={props.datePosted == 'Any time' ? true : false}
                        />
                        <RadioInput
                            radioName="datePosted"
                            radioText="Past 24hrs"
                            radioValue="Past 24hrs"
                            setFunction={props.setDatePosted}
                            checked={props.datePosted == 'Past 24hrs' ? true : false}
                        />
                        <RadioInput
                            radioName="datePosted"
                            radioText="Past week"
                            radioValue="Past week"
                            setFunction={props.setDatePosted}
                            checked={props.datePosted == 'Past week' ? true : false}
                        />
                        <RadioInput
                            radioName="datePosted"
                            radioText="Past month"
                            radioValue="Past month"
                            setFunction={props.setDatePosted}
                            checked={props.datePosted == 'Past month' ? true : false}
                        />
                    </div>
                    <p className="text-neutral-700 text-xl font-medium leading-7 mt-3 mb-1">Year of Experience</p>
                    <div className="flex gap-x-4 flex-wrap gap-y-3">
                        <RadioInput radioName="expLevel" radioText="0-2 years" radioValue="0-2 years" setFunction={props.setExpLevel}
                            checked={props.expLevel == "0-2 years" ? true : false} />
                        <RadioInput radioName="expLevel" radioText="3-5 years" radioValue="3-5 years" setFunction={props.setExpLevel}
                            checked={props.expLevel == "3-5 years" ? true : false} />
                        <RadioInput radioName="expLevel" radioText="5-7 years" radioValue="5-7 years" setFunction={props.setExpLevel}
                            checked={props.expLevel == "5-7 years" ? true : false} />
                        <RadioInput radioName="expLevel" radioText="8-10 years" radioValue="8-10 years" setFunction={props.setExpLevel}
                            checked={props.expLevel == "8-10 years" ? true : false} />
                        <RadioInput radioName="expLevel" radioText="10+ years" radioValue="10+ years" setFunction={props.setExpLevel}
                            checked={props.expLevel == "10+ years" ? true : false} />
                    </div>
                    <p className="text-neutral-700 text-xl font-medium leading-7 mt-3 mb-1">Job Type</p>
                    <div className="flex gap-x-4 flex-wrap gap-y-3">
                        <RadioInput
                            radioName="jobType"
                            radioText="Internship"
                            radioValue="Internship"
                            setFunction={props.setJobType}
                            checked={props.jobType == "Internship" ? true : false}
                        />
                        <RadioInput
                            radioName="jobType"
                            radioText="Full Time"
                            radioValue="Full Time"
                            setFunction={props.setJobType}
                            checked={props.jobType == "Full Time" ? true : false}
                        />
                        <RadioInput
                            radioName="jobType"
                            radioText="Part Time"
                            radioValue="Part Time"
                            setFunction={props.setJobType}
                            checked={props.jobType == "Part Time" ? true : false}
                        />
                        <RadioInput
                            radioName="jobType"
                            radioText="Remote"
                            radioValue="Remote"
                            setFunction={props.setJobType}
                            checked={props.jobType == "Remote" ? true : false}
                        />
                        <RadioInput
                            radioName="jobType"
                            radioText="Contract"
                            radioValue="Contract"
                            setFunction={props.setJobType}
                            checked={props.jobType == "Contract" ? true : false}
                        />
                    </div>
                </div>
                <div className=" flex gap-x-7 items-end justify-items-end mt-10 col-span-11 md:col-start-3 md:col-end-12 xl:col-start-5 xl:col-end-12">
                    <div
                        onClick={props.handleReset}
                        className="w-full rounded-xl cursor-pointer text-fadedText border-2 flex  h-[3.5rem] items-center justify-center"
                    >
                        Reset
                    </div>
                    <div
                        onClick={() => {
/*                             props.handleFilter();
 */                            props.setOpenfilter(false);
                            props.handleDate(props.datePosted)
                        }}
                        className="w-full bg-black text-textW cursor-pointer from-gradientFirst to-gradientSecond rounded-xl h-[3.5rem] flex items-center justify-center"
                    >
                        Find Result
                    </div>
                </div>
            </div>
        </ConfirmModal>
    )
}

export default Filter