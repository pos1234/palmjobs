import { sendRecovery } from '@/backend/accountBackend';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { SubmitButton } from '../TextInput';
const ForgotPassword = (props: any) => {
    const loadingIn = '/images/loading.svg';
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);
    function validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const handleReset = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (email == '') {
            setEmailError('Email is Required');
        } else {
            if (validateEmail(email)) {
                setEmailError('');
                setLoading(true);
                sendRecovery(email)
                    .then((res) => {
                        setLoading(false);
                        toast.success('Recovery Email Sent check your email');
                        setEmail('');
                    })
                    .catch((error) => {
                        console.log(error.message);
                        setLoading(false);
                        toast.error('Failed to send recovery email');
                    });
            } else {
                setEmailError('Email is Not Valid');
            }
        }
    };
    return (
        <form onSubmit={handleReset} className="w-full grid grid-cols-12 gap-y-3 pl-5 pr-3 sm:pr-0 sm:max-md:px-40 md:pl-0 lg:pl-20">
            <p className="col-span-12 font-frhW text-frhS text-[#0E121D]">Reset your password</p>
            <p className="col-span-6 text-left font-thW text-smS mt-5 mb-2 leading-shL">Email Address</p>
            <input
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                type="text"
                placeholder="Enter your Email"
                className={
                    emailError
                        ? 'col-span-12 focus:outline-0 focus:ring-orange-500 focus:border-0 border-[1px] border-red-500 w-full rounded-xl h-12 pl-5 text-addS sm:col-span-10'
                        : 'col-span-12 focus:outline-0 focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-xl h-12 pl-5 text-addS sm:col-span-10'
                }
            />
            {emailError && <p className="col-span-12 pt-3 text-[13px] text-red-500 text-left">{emailError}</p>}
            <div className="col-span-12 grid grid-cols-12 justify-items-end pr-2 lg:col-span-10">
                <div className='w-full col-span-12 flex md:justify-end'>
                    <div className='w-full pt-5'>
                        <SubmitButton loading={loading} buttonText="Continue" />
                    </div>
                </div>
                {/* {loading && (
                    <img
                        src={loadingIn}
                        className="mt-5 col-span-12 text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full rounded-xl"
                    />
                )}
                {!loading && (
                    <button
                        type="submit"
                        className="mt-5 col-span-12 text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full rounded-xl"
                    >
                        Continue
                    </button>
                )} */}
            </div>
            <div className="col-span-12 grid grid-cols-12 justify-items-end pr-2 lg:col-span-10">
                <button
                    type="button"
                    onClick={() => props.setFunction(false)}
                    className="mt-5 col-span-12 bg-[#F8F8F8] text-darkBlue h-16 w-full rounded-xl"
                >
                    Return to Login
                </button>
            </div>
        </form>
    );
};

export default ForgotPassword;
