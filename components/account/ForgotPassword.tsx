import { sendRecovery } from '@/backend/accountBackend';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { SubmitButton } from '../TextInput';
const ForgotPassword = (props: any) => {
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
        <form onSubmit={handleReset} className="w-full flex flex-col gap-y-3 pt-20 ">
            <p className="font-frhW text-frhS text-[#0E121D]">Reset your password</p>
            <p className="text-left font-thW text-smS mt-5 mb-2 leading-shL">Email Address</p>
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
            <div className='flex items-center gap-3 max-md:flex-wrap mt-10 w-full'>
                <div className='w-full md:flex-grow order-2 md:order-2'>
                    <SubmitButton loading={loading} buttonText="Continue" />
                </div>
                <div className="w-full md:flex-grow order-2 md:order-1">
                    <button
                        type="button"
                        onClick={() => props.setFunction(false)}
                        className="bg-[#F8F8F8] text-darkBlue h-14 w-full rounded-lg"
                    >
                        Return to Login
                    </button>
                </div>
            </div>

        </form>
    );
};

export default ForgotPassword;
