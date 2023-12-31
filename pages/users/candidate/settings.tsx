import ChangePassword from '@/components/ChangePassword';
import Navigation from '@/components/Navigation';
import { candidateAuth } from '@/components/withAuth';
import React from 'react';

const Settings = () => {
    return (
        <div className="px-3 lg:px-16 overflow-hidden">
            <Navigation />
            <div className="flex justify-center pt-10">
                <ChangePassword class="pt-5 pb-10 flex w-full sm:w-1/2"/>
            </div>
        </div>
    );
};

export default candidateAuth(Settings);
