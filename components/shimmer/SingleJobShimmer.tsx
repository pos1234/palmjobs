import React from 'react';

const SingleJobShimmer = () => {
    return (
        <div className="flex flex-col gap-3 border-2 rounded-2xl p-3">
            <div className="flex gap-x-2">
                <div className="w-40 h-24 rounded-2xl bg-gray-300 rounded animate-pulse col-span-12"></div>
                <div className="flex flex-col gap-2 justify-center w-full">
                    <div className="text-neutral-900 text-xl font-medium leading-7">
                        <div className="h-4 bg-gray-300 rounded animate-pulse col-span-12"></div>
                    </div>
                    <div className="text-stone-300 text-lg font-normal leading-relaxed">
                        <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                    <div className="text-neutral-900 text-opacity-70 text-xl font-normal leading-7">
                        <div className="h-4 bg-gray-300 rounded animate-pulse w-20"></div>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 justify-center w-full flex-wrap">
                <div className="text-neutral-900 w-20 text-xl font-medium leading-7">
                    <div className="h-4 bg-gray-300 rounded animate-pulse col-span-12"></div>
                </div>
                <div className="text-stone-300 w-20 text-lg font-normal leading-relaxed">
                    <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="text-neutral-900 text-opacity-70 text-xl font-normal leading-7">
                    <div className="h-4 bg-gray-300 rounded animate-pulse w-20"></div>
                </div>
            </div>
            <div className="flex flex-col gap-2 justify-center w-full">
                <div className="text-neutral-900 text-xl font-medium leading-7">
                    <div className="h-4 bg-gray-300 rounded animate-pulse col-span-12"></div>
                </div>
                <div className="text-stone-300 text-lg font-normal leading-relaxed">
                    <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="text-neutral-900 text-opacity-70 text-xl font-normal leading-7">
                    <div className="h-4 bg-gray-300 rounded animate-pulse w-20"></div>
                </div>
            </div>
        </div>
    );
};
export default SingleJobShimmer;
