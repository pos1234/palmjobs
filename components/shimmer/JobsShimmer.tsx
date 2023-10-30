import React from 'react';
import SingleJobShimmer from './SingleJobShimmer';

const JobsShimmer = () => {
    return (
        <div className="flex mt-20 gap-x-10 xl:pr-96">
            <div className="flex flex-col gap-y-5 max-md:w-full">
                <SingleJobShimmer />
                <SingleJobShimmer />
            </div>
            <div className="flex flex-col gap-y-3 grow hidden md:flex">
                <div className="flex flex-col gap-3 p-3">
                    <div className="flex gap-x-2 ">
                        <div className="w-24 h-24 rounded-2xl bg-gray-300 rounded animate-pulse col-span-12"></div>
                        <div className="flex flex-col gap-2 justify-center w-full">
                            <div className="text-neutral-900 text-xl font-medium leading-7">
                                <div className="h-4 bg-gray-300 rounded animate-pulse w-40"></div>
                            </div>
                            <div className="text-stone-300 text-lg font-normal leading-relaxed">
                                <div className="h-4 bg-gray-300 rounded animate-pulse w-36"></div>
                            </div>
                            <div className="text-neutral-900 text-opacity-70 text-xl font-normal leading-7">
                                <div className="h-4 bg-gray-300 rounded animate-pulse w-32"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 justify-center w-full flex-wrap mt-5">
                        <div className="w-[20%] h-20 rounded-2xl bg-gray-300 rounded animate-pulse"></div>
                        <div className="w-[20%] h-20 rounded-2xl bg-gray-300 rounded animate-pulse"></div>
                        <div className="w-[20%] h-20 rounded-2xl bg-gray-300 rounded animate-pulse"></div>
                        <div className="w-[20%] h-20 rounded-2xl bg-gray-300 rounded animate-pulse"></div>
                    </div>
                    <div className="flex w-full">
                        <div className="w-1/2 text-neutral-900 text-xl font-medium leading-7">
                            <div className="h-16 rounded-full bg-gray-300 rounded animate-pulse col-span-12"></div>
                        </div>
                        <div className="w-1/2 text-stone-300 text-lg font-normal leading-relaxed">
                            <div className="h-16 rounded-full bg-gray-300 rounded animate-pulse"></div>
                        </div>
                    </div>
                    <div className="h-32 flex flex-col gap-y-3 mt-5">
                        <div className="text-neutral-900 text-xl font-medium leading-7">
                            <div className="h-4 bg-gray-300 rounded animate-pulse w-96"></div>
                        </div>
                        <div className="text-stone-300 text-lg font-normal leading-relaxed">
                            <div className="h-4 bg-gray-300 rounded animate-pulse w-60"></div>
                        </div>
                        <div className="text-neutral-900 text-opacity-70 text-xl font-normal leading-7">
                            <div className="h-4 bg-gray-300 rounded animate-pulse w-40"></div>
                        </div>
                    </div>
                    <div className="w-full text-stone-300 text-lg font-normal leading-relaxed">
                        <div className="h-16 rounded-full bg-gray-300 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobsShimmer;
