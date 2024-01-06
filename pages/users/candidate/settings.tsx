import ChangePassword from '@/components/ChangePassword';
import Navigation from '@/components/Navigation';
import { candidateAuth } from '@/components/withAuth';
import { useGlobalContext } from '@/contextApi/userData';
import React from 'react';

const Settings = () => {
    const { userData } = useGlobalContext()
    return (
        <div className="px-3 lg:px-16 overflow-hidden">
            <Navigation />
            <div className="flex justify-center pt-10 flex-wrap">
                <p className='text-gray-600 py-5 w-full flex justify-center'>{userData && userData.email}</p>
                <ChangePassword class="pt-5 pb-10 flex w-full sm:w-1/2" />
            </div>
        </div>
    );
};

export default candidateAuth(Settings);
