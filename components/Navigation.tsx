import React, { useState } from 'react';
import { signOut } from '@/lib/services';
import styles from '@/styles/navigation.module.css';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const Navigation = (props: any) => {
    const logo = '/images/logo.svg';
    return (
        <div>
            <div className="grid grid-cols-12 pt-3  md:border-b-2">
                <div className="col-span-6 md:col-span-2">
                    <img src={logo} alt="palmjobs logo" className=" h-16 md:h-20" />
                </div>
                <div className="hidden md:col-span-7 md:grid md:pt-6 md:grid-cols-12 lg:col-span-5 xl:col-span-4">
                    <p className="text-bigS font-bigW leading-bigL lg:text-left text-textR col-span-4 lg:col-span-4 xl:col-span-4">
                        Find a Job
                    </p>
                    <p className="text-bigS font-bigW leading-bigL text-textR col-span-5 lg:col-span-5 xl:col-span-5">Build Resume</p>
                    <p className="text-bigS font-bigW leading-bigL text-textR col-span-3 lg:col-span-3 xl:col-span-3 ">my jobs</p>
                </div>
                <div className="grid grid-cols-12 pt-3 md:pt-0 col-span-6 md:col-span-3 md:max-lg:justify-items-end lg:col-span-5 xl:col-span-6">
                    <div className="col-span-6 md:col-span-12 lg:col-span-7 md:pt-5">
                        <p className="text-right pt-1 text-fhS leading-fhL font-fhW text-textR md:max-lg:text-left md:text-dfhS md:leading-dfhL md:font-bigW md:pr-3 lg:-mt-1">
                            Sign in
                        </p>
                    </div>
                    <div className="hidden justify-items-end col-span-3 lg:grid md:col-span-12 lg:col-span-5 ">
                        <button className="text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-56 rounded-xl md:max-lg:mt-4 md:w-32 md:max-lg:h-12  lg:w-40 xl:w-56">
                            <BorderColorIcon sx={{ fontSize: '1.2rem', marginRight: '0.2rem' }} /> Hire Talent
                        </button>
                    </div>
                    <div onClick={() => props.viewFuntion(!props.view)} className="col-span-6 grid justify-items-center md:hidden">
                        <div className={styles['hamburger-menu']}>
                            <div className={styles['bar']}></div>
                            <div className={styles['bar']}></div>
                            <div className={styles['bar']}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden justify-items-end col-span-3 md:max-lg:grid md:col-span-12 lg:col-span-5 ">
                <button className="text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-56 rounded-xl md:max-lg:mt-4 md:w-32 md:max-lg:h-12  lg:w-40 xl:w-56">
                    <BorderColorIcon sx={{ fontSize: '1.2rem', marginRight: '0.2rem' }} /> Hire Talent
                </button>
            </div>
        </div>
    );
};

export default Navigation;
{
    /* <button type="button" onClick={signOut}>
            logout
        </button> */
}
