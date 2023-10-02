import React from 'react';

const EmployerJobShimmer = () => {
    return (
        <div className=" flex flex-col gap-y-3 col-span-12 pl-3">
            <div className="text-neutral-900 text-xl font-medium leading-7">
                <div className="h-4 bg-gray-300 rounded animate-pulse w-10/12 md:w-2/3"></div>
            </div>
            <div className="text-stone-300 text-lg font-normal leading-relaxed">
                <div className="h-4 bg-gray-300 rounded animate-pulse w-8/12 md:w-1/2"></div>
            </div>
            <div className="text-neutral-900 text-opacity-70 text-xl font-normal leading-7 md:w-1/2">
                <div className="h-4 bg-gray-300 rounded animate-pulse w-6/12 md:w-2/3"></div>
            </div>
        </div>
    );
};

export default EmployerJobShimmer;
