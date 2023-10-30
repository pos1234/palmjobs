import { updatePassword } from '@/lib/services';
import { useState } from 'react';
import { NextPageContext } from 'next/types';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toast } from 'react-toastify';
import Slider from '@/components/Slider';
import Link from 'next/link';
import { useRouter } from 'next/router';
interface myQueryParams {
    userId: string;
    secret: string;
}
interface MyPageProps {
    queryParams: myQueryParams;
}
export const getServerSideProps = async (context: NextPageContext) => {
    const { query } = context;
    const queryParams = {
        userId: query.userId as string,
        secret: query.secret as string
    };
    return {
        props: {
            queryParams
        }
    };
};
const sendReset = ({ queryParams }: MyPageProps) => {
    const router = useRouter();
    const loadingIn = '/images/loading.svg';
    const logo = '/images/logo.svg';
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfrimPassword] = useState('');
    const [hide, setHide] = useState(true);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const handleReset = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (password == '') {
            setPasswordError('Please Enter Password');
        } else if (password.length < 8) {
            setPasswordError('Password must be more than 8 charachters');
        } else if (confirmPassword == '') {
            setPasswordError('Please Confirm Password');
        } else if (password !== confirmPassword) {
            setPasswordError('Password does not match');
        } else {
            setLoading(true);
            const userId = queryParams.userId.toString();
            const secret = queryParams.secret.toString();
            updatePassword(userId, secret, password)
                .then((res) => {
                    toast.success('Password Updated Successfully');
                    setLoading(false);
                    setPassword('');
                    setConfrimPassword('');
                    router.push('/account/')
                })
                .catch((error) => {
                    setLoading(false);
                    toast.error('Password Not Updated');
                    console.log(error.message);
                });
        }
    };
    /*  const changeHide = () => {
        setHide(!hide);
    }; */
    return (
        /*  <form onSubmit={handleReset}>
            <input
                type={hide ? 'password' : 'text'}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
            />
            <input
                type={hide ? 'password' : 'text'}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setConfrimPassword(e.currentTarget.value)}
            />
            <button type="submit">update password</button>
            <button onClick={changeHide}>{hide ? 'unhide' : 'hide'}</button>
        </form> */
        <div className="grid grid-cols-12 overflow-y-auto  sm:pb-5 h-screen">
            <div className="col-span-12 md:col-span-6 order-2 md:order-1 flex items-center bg-skillColor rounded-tr-[5.75rem] rounded-br-[5.75rem] ">
                <div className="loginCoursel w-full  lg:pt-[15%] flex item-center justify-center md:h-[45%] lg:h-[75%] xl:h-[80%]">
                    <Slider />
                </div>
            </div>
            <form
                onSubmit={handleReset}
                className="col-span-12  order-1 md:order-2 flex flex-col gap-y-5 md:px-5 lg:px-10 xl:px-20 md:col-span-6 employerBack"
            >
                <div className="flex justify-center mt-20 sm:mt-28">
                    <Link href="/">
                        <img src={logo} className=" w-[15rem]" />
                    </Link>
                </div>
                <p className="col-span-12 font-frhW text-frhS text-center text-[#0E121D]">Reset your password</p>
                <p className="col-span-12 float-left font-thW text-smS mt-5 mb-0 leading-shL">New Password</p>
                <div className="col-span-12 flex">
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        type={visible ? 'text' : 'password'}
                        placeholder="Enter password"
                        className={
                            passwordError
                                ? 'col-span-12 focus:outline-0 flex focus:ring-orange-500 focus:border-0 border-[1px] border-red-500 w-full rounded-full h-12 pl-5 text-addS'
                                : 'col-span-12 focus:outline-0 flex focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS'
                        }
                    />
                    <span onClick={() => setVisible(!visible)} className="flex items-center -ml-10 text-stone-400 cursor-pointer">
                        {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </span>
                </div>
                <p className="col-span-12 float-left font-thW text-smS mt-5 mb-0 leading-shL">Confirm Password</p>
                <input
                    value={confirmPassword}
                    onChange={(e) => setConfrimPassword(e.currentTarget.value)}
                    type={visible ? 'text' : 'password'}
                    placeholder="Enter password"
                    className={
                        passwordError
                            ? 'col-span-12 focus:outline-0 flex focus:ring-orange-500 focus:border-0 border-[1px] border-red-500 w-full rounded-full h-12 pl-5 text-addS sm:col-span-10'
                            : 'col-span-12 focus:outline-0 flex focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS sm:col-span-10'
                    }
                />
                {passwordError && <p className="col-span-12 pt-3 text-[13px] text-red-500 text-left">{passwordError}</p>}
                <div className="col-span-12 grid grid-cols-12 justify-items-end pr-2 lg:col-span-10">
                    {loading && (
                        <img
                            src={loadingIn}
                            className="mt-5 col-span-12 text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full rounded-full"
                        />
                    )}
                    {!loading && (
                        <button
                            type="submit"
                            className="mt-5 col-span-12 text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full rounded-full"
                        >
                            Continue
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};
export default sendReset;
