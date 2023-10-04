import React from 'react';

const candidateProfileShimmer = () => {
    return (
        <div className="pt-8 xl:pl-48 xl:pr-16 md:mt-20">
            <div className="flex flex-col gap-y-3 grow hidden md:flex">
                <div className="flex flex-col gap-3 p-3">
                    <div className="flex gap-x-2 ">
                        <div className="w-40 h-40 rounded-2xl bg-gray-300 rounded animate-pulse col-span-12"></div>
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
                    <div className="flex gap-2 w-full flex-wrap mt-5">
                        <div className="w-[14%] h-14 rounded-full bg-gray-300 rounded animate-pulse"></div>
                        <div className="w-[14%] h-14 rounded-full bg-gray-300 rounded animate-pulse"></div>
                    </div>
                    <div className="h-32 flex flex-col gap-y-3 mt-5">
                        <div className="text-neutral-900 text-xl font-medium leading-7">
                            <div className="h-4 bg-gray-300 rounded animate-pulse w-40"></div>
                        </div>
                        <div className="text-stone-300 text-lg font-normal leading-relaxed">
                            <div className="h-4 bg-gray-300 rounded animate-pulse w-60"></div>
                        </div>
                        <div className="text-neutral-900 text-opacity-70 text-xl font-normal leading-7">
                            <div className="h-4 bg-gray-300 rounded animate-pulse w-96"></div>
                        </div>
                    </div>
                    <div className="h-32 flex flex-col gap-y-3">
                        <div className="text-neutral-900 text-xl font-medium leading-7">
                            <div className="h-4 bg-gray-300 rounded animate-pulse w-40"></div>
                        </div>
                        <div className="text-stone-300 text-lg font-normal leading-relaxed">
                            <div className="h-4 bg-gray-300 rounded animate-pulse w-60"></div>
                        </div>
                        <div className="text-neutral-900 text-opacity-70 text-xl font-normal leading-7">
                            <div className="h-4 bg-gray-300 rounded animate-pulse w-96"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default candidateProfileShimmer;
