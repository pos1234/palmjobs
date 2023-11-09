import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';

const SearchBar = (props: any) => {
    return (
        <div className="w-full flex flex-col sm:items-center gap-2">
            <div className='flex items-center gap-3 max-sm:w-full'>
                <div className="w-full h-full max-h-[5rem] flex gap-1 items-center">
                    <div className='relative flex items-center max-sm:w-full'>
                        <SearchIcon className="text-[1.3rem] text-stone-400 absolute ml-3" />
                        <input
                            name="search text"
                            value={props.searchWord}
                            onChange={(e) => {
                                props.setSearchWord(e.currentTarget.value);
                            }}
                            className="h-full w-full bg-gray-100 max-sm:rounded-full rounded-l-full pl-10 px-3 py-3 border-2 border-gray-100 focus:border-gradientFirst outline-none focus:ring-0 focus:outline-none"
                            placeholder="What"
                        />
                        {
                            props.single !== true && <div
                                onClick={() => props.setOpenfilter(true)}
                                className="sm:hidden absolute right-3 text-darkBlue flex items-center justify-center md:justify-start xl:pl-5 xl:justify-end xl:col-span-2"
                            >
                                <TuneIcon sx={{ fontSize: '1.5rem' }} className="cursor-pointer hover:text-gradientFirst" />
                            </div>
                        }
                    </div>
                    <div className='relative flex items-center max-sm:hidden'>
                        <PinDropOutlinedIcon className="text-[1.3rem] text-stone-400 absolute left-3 " />
                        <input
                            name="search location"
                            value={props.addressHolder}
                            onChange={(e) => {
                                props.setAddressHolder(e.currentTarget.value);
                            }}
                            className="h-full w-full bg-gray-100  px-10 py-3 rounded-r-full border-2 border-gray-100 outline-none focus:border-gradientFirst focus:ring-0 focus:outline-none"
                            placeholder="Where"
                        />
                        {
                            props.single !== true && <div
                                onClick={() => props.setOpenfilter(true)}
                                className="absolute right-3 text-darkBlue flex items-center justify-center md:justify-start xl:pl-5 xl:justify-end xl:col-span-2"
                            >
                                <TuneIcon sx={{ fontSize: '1.5rem' }} className="cursor-pointer hover:text-gradientFirst" />
                            </div>
                        }
                    </div>
                </div>
                <div onClick={props.setTheSearchTerm} className='bg-green-500 p-2 rounded-full text-textW'>
                    <SearchIcon sx={{ fontSize: '1.5rem' }} className="cursor-pointer" />
                </div>
            </div>
            <div className='w-full flex justify-center h-8 mt-2'>
                <div className='flex gap-5 w-full md:w-1/2'>
                    {props.datePosted && <div className="min-w-36 h-8 font-adW text-adS leading-adL bg-skillColor text-center flex px-7 pr-3 items-center rounded-xl text-gradientFirst">
                        <p> {props.datePosted}</p>
                        <p className="ml-5 ">
                            <CloseIcon
                                sx={{ color: 'green' }}
                                className="h-7 cursor-pointer p-1"
                                onClick={() => {
                                    props.setDatePosted('')
                                    props.setPostedDateHolder('')
                                }}
                            />
                        </p>
                    </div>}
                    {props.expLevel && <div className="min-w-36 h-8 font-adW text-adS leading-adL bg-skillColor text-center flex px-7 pr-3 items-center rounded-xl text-gradientFirst">
                        <p> {props.expLevel}</p>
                        <p className="ml-5 ">
                            <CloseIcon
                                sx={{ color: 'green' }}
                                className="h-7 cursor-pointer p-1"
                                onClick={() => {
                                    props.setExpLevel('')
                                    props.setExpLevelHolder('')
                                }}
                            />
                        </p>
                    </div>}
                    {props.jobType && <div className="min-w-36 h-8 font-adW text-adS leading-adL bg-skillColor text-center flex px-7 pr-3 items-center rounded-xl text-gradientFirst">
                        <p> {props.jobType}</p>
                        <p className="ml-5 ">
                            <CloseIcon
                                sx={{ color: 'green' }}
                                className="h-7 cursor-pointer p-1"
                                onClick={() => {
                                    props.setJobType('')
                                    props.setJobTypeHolder('')
                                }}
                            />
                        </p>
                    </div>}

                </div>
            </div>
        </div>
    )
}

export default SearchBar