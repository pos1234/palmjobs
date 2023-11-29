import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
const SearchBar = (props: any) => {
    return (
        <div className={`w-full flex flex-col gap-2 ${props.home == true ? 'sm:items-start' : 'sm:items-center'}`}>
            <div className='flex items-center gap-3 max-sm:w-full'>
                <div className="w-full h-full max-h-[5rem] flex gap-1 items-center h-[40px]">
                    <div className='relative flex items-center max-sm:w-full h-[40px] sm:w-5/6'>
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
                    </div>
                    <div className='relative flex items-center max-sm:hidden h-[40px] w-2/6'>
                        <PlaceOutlinedIcon className="text-[1.3rem] text-stone-400 absolute left-3 " />
                        <input
                            name="search location"
                            value={props.addressHolder}
                            onChange={(e) => {
                                props.setAddressHolder(e.currentTarget.value);
                            }}
                            className="h-full w-full bg-gray-100  px-10 py-3 rounded-r-full border-2 border-gray-100 outline-none focus:border-gradientFirst focus:ring-0 focus:outline-none"
                            placeholder="Where"
                        />
                    </div>
                </div>
                <div onClick={props.setTheSearchTerm} className='cursor-pointer bg-green-500 p-2 rounded-full text-textW'>
                    <img src='/icons/search.svg' className='w-5' alt='search icon' />
                </div>
            </div>

        </div>
    )
}

export default SearchBar