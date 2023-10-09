import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';

import { useState } from 'react';
import Link from 'next/link';
import ForgotPassword from '@/components/account/ForgotPassword';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getAccount, getRole, signIn, signOut } from '@/lib/services';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import RegisterComponent from '@/components/account/Register';
import Slider from '@/components/Slider';

const Login = () => {
    const router = useRouter();
    const logo = '/images/logo.svg';
    const google = '/images/google.svg';
    const facebook = '/images/facebook.svg';
    const [register, setRegister] = useState(false);
    const [registerForm, setRegisterForm] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('');
    const [getJob, setGetJob] = useState(false);
    const [hireTalent, setHireTalent] = useState(false);
    const [login, setLogin] = useState({
        email: '',
        password: ''
    });
    const loadingIn = '/images/loading.svg';
    function validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const handlelogin = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setEmailError(' ');
        setPasswordError(' ');
        if (login.email == '') {
            setEmailError('please provide email');
        }
        if (login.email == '') {
            setPasswordError('please provide password');
        } else {
            if (validateEmail(login.email)) {
                setLoading(true);
                const sign = signIn(login.email, login.password);
                sign.then(async (res) => {
                    setLoading(false);
                    toast.success('Successfully LoggedIn');
                    const loggedIn = await getAccount();
                    if (loggedIn !== 'failed') {
                        const role = await getRole(loggedIn.$id);
                        if (role.documents[0].userRole == 'candidate') {
                            router.push('/users/candidate/profile');
                        }
                        if (role.documents[0].userRole == 'employer') {
                            router.push('/users/employer');
                        }
                    }
                    if (loggedIn == 'failed') {
                        router.push('/account');
                    }
                    /* const role = getRole();
                    role.then((rep) => {
                        if (rep.documents[0].userRole === 'candidate') router.push('/jobs');
                        if (rep.documents[0].userRole === 'employer') router.push('/users/employer');
                    }); */
                }).catch((error) => {
                    console.log(error.message);
                    setLoading(false);
                    toast.error(error.message);
                }); // Email is valid, proceed with form submission or other logic
            } else {
                setEmailError('Invalid Email');
                // Email is invalid, display an error message or take appropriate action
            }
        }
    };
    return (
        <>
            <ToastContainer />
            <div className="grid grid-cols-12 overflow-y-auto  sm:pb-5 h-screen">
                <div className="col-span-12  flex items-center bg-skillColor rounded-tr-[5.75rem] rounded-br-[5.75rem] order-2 max-md:mt-10 md:col-span-6 md:order-1">
                    <div
                        className={
                            forgotPassword || (register && !registerForm)
                                ? 'loginCoursel w-full  lg:pt-[15%] flex item-center justify-center md:h-[45%] lg:h-[75%] xl:h-[80%]'
                                : 'loginCoursel w-full  lg:pt-[15%] flex item-center justify-center md:h-[40%] lg:h-[60%] xl:h-[65%]'
                        }
                    >
                        <Slider />
                    </div>
                </div>
                <div className="col-span-12  order-1 md:order-2 text-center flex flex-col gap-y-5 items-center md:px-5 lg:px-10 xl:px-20 md:col-span-6 employerBack">
                    <div className={forgotPassword == false ? 'flex justify-center' : 'flex justify-center mt-20 sm:mt-28'}>
                        <Link href="/">
                            <img src={logo} className=" w-[15rem]" />
                        </Link>
                    </div>
                    {forgotPassword == false && (
                        <p className="font-shW text-shS md:text-dshS">
                            Connect. <br /> Grow. <span className="text-gradientFirst">Succeed.</span>
                        </p>
                    )}
                    {forgotPassword == false && (
                        <div className="bg-skillColor w-80 h-14 rounded-full p-2 grid grid-cols-12">
                            <button
                                className={
                                    register == false
                                        ? 'col-span-6 bg-gradientFirst text-textW rounded-full cursor-pointer'
                                        : 'col-span-6 text-gradientFirst rounded-full cursor-pointer'
                                }
                                onClick={() => {
                                    setRegister(false);
                                    setRegisterForm(false);
                                }}
                            >
                                Login
                            </button>
                            <button
                                className={
                                    register == true
                                        ? 'col-span-6 bg-gradientFirst text-textW rounded-full cursor-pointer'
                                        : 'col-span-6 text-gradientFirst rounded-full cursor-pointer'
                                }
                                onClick={() => setRegister(true)}
                            >
                                Register
                            </button>
                        </div>
                    )}
                    {!register && forgotPassword == false && (
                        <p className="text-midRS font-midRW leading-midRL text-[#5B5B5B]">
                            Building bridges, paving pathways. Dive into Palm Jobs.
                        </p>
                    )}
                    {registerForm && (
                        <p className="text-left text-midRS font-midRW leading-midRL text-[#5B5B5B] text-left">
                            <span className="text-smS inline-block mb-1">You're almost there! {name}</span> <br />
                        </p>
                    )}
                    {register && !registerForm && (
                        <>
                            <div className="text-center mt-5">
                                <p className="text-left text-fhS font-dfhW  leading-midRL text-[#141417] pl-2 sm:text-dfhS sm:font-addW">
                                    &#128075; Hi
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.currentTarget.value)}
                                        type="text"
                                        className="outline-0 ml-2 border-0 border-b-2 border-dashed border-[#141417] w-40 focus:ring-0 focus:ring-b-0 focus:outline-0 mb-3 sm:mb-0"
                                    />
                                    ! Tell us why you're here.
                                </p>
                            </div>
                            <div className="bg-[#ffa06e0d] w-full lg:max-xl:bg-red-500 grid grid-cols-12 py-3 px-2 gap-x-3 gap-y-5 md:gap-y-0 md:gap-x-5 xl:gap-x-10">
                                <div
                                    onClick={() => {
                                        setGetJob(true);
                                        setHireTalent(false);
                                    }}
                                    className={
                                        getJob
                                            ? 'col-span-12 rounded-2xl text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond flex gap-x-3 text-left p-3 h-[5rem] items-left sm:h-[7rem] sm:col-span-6 sm:flex-col sm:justify-between'
                                            : 'col-span-12 text-[#141417] hover:rounded-2xl hover:text-textW cursor-pointer hover:bg-gradient-to-r hover:from-gradientFirst hover:to-gradientSecond bg-textW flex gap-x-3 text-left p-3 h-[5rem] items-left sm:h-[7rem] sm:col-span-6 sm:flex-col sm:justify-between'
                                    }
                                >
                                    <BusinessCenterOutlinedIcon />
                                    <p>Get a job</p>
                                </div>
                                <div
                                    onClick={() => {
                                        setGetJob(false);
                                        setHireTalent(true);
                                    }}
                                    className={
                                        hireTalent
                                            ? 'col-span-12 rounded-2xl text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond flex gap-x-3 text-left p-3 h-[5rem] items-left sm:h-[7rem] sm:col-span-6 sm:flex-col sm:justify-between'
                                            : 'col-span-12 text-[#141417] hover:rounded-2xl hover:text-textW cursor-pointer hover:bg-gradient-to-r hover:from-gradientFirst hover:to-gradientSecond bg-textW flex gap-x-3 text-left p-3 h-[5rem] items-left sm:h-[7rem] sm:col-span-6 sm:flex-col sm:justify-between'
                                    }
                                >
                                    <PersonAddAltOutlinedIcon />
                                    <p>Hire talent</p>
                                </div>
                            </div>
                            <div className="w-full grid grid-cols-12 justify-items-end pr-2">
                                {!getJob && !hireTalent && (
                                    <div className="mt-5 col-start-7 col-end-13 text-textW bg-gradientSecond flex items-center justify-center h-16 w-full rounded-full">
                                        Continue
                                    </div>
                                )}
                                {(getJob || hireTalent) && (
                                    <button
                                        onClick={() => setRegisterForm(true)}
                                        className="mt-5 col-start-7 col-end-13 text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full rounded-full"
                                    >
                                        Continue
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                    {(register == false || registerForm == true) && forgotPassword == false && (
                        <div className="w-full p-2 grid gap-x-2 grid-cols-12 gap-y-4 lg:gap-y-0">
                            <button className="col-span-12 border-2 rounded-full cursor-pointer py-[0.93rem] text-addS text-fadedText flex justify-evenly items-center sm:col-start-4 sm:col-end-10 md:max-lg:col-span-12">
                                <p> Sign in with Google</p> <img src={google} alt="google" className="w-[2rem] h-[2rem] inline ml-3" />
                            </button>
                            {/* <button className="text-addS text-fadedText col-span-12 border-2 rounded-full cursor-pointer py-[0.93rem] flex justify-evenly items-center sm:col-span-6 md:max-lg:col-span-12">
                                Sign in with Facebook <img src={facebook} alt="google" className="w-[2rem] h-[2rem] inline ml-3 -mt-1" />
                            </button> */}
                        </div>
                    )}
                    {registerForm && <RegisterComponent name={name} role={getJob ? 'candidate' : 'employer'} />}
                    {!register && forgotPassword == false && (
                        <>
                            <form className="w-full pl-5 grid grid-cols-12 text-left pr-2 md:pr-0" onSubmit={handlelogin}>
                                <p className="col-span-10 font-thW text-smS mt-5 mb-2 leading-shL">Email Address</p>
                                <input
                                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                        setLogin({ ...login, email: e.currentTarget.value })
                                    }
                                    type="text"
                                    placeholder="Enter Email"
                                    className={
                                        emailError
                                            ? 'col-span-12 focus:outline-0 focus:ring-orange-500 focus:border-0 border-[1px] border-red-500 w-full rounded-full h-12 pl-5 text-addS sm:col-span-10'
                                            : 'col-span-12 focus:outline-0 focus:ring-orange-500 focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS sm:col-span-10'
                                    }
                                />
                                {emailError && <p className="col-span-12 pt-3 text-[13px] text-red-500">{emailError}</p>}
                                <p className="col-span-10 font-thW text-smS mt-5 mb-2 leading-shL">Password</p>
                                <input
                                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                        setLogin({ ...login, password: e.currentTarget.value })
                                    }
                                    type={visible ? 'text' : 'password'}
                                    placeholder="Enter password"
                                    className={
                                        passwordError
                                            ? 'col-span-12 focus:outline-0 flex focus:ring-orange-500 focus:border-0 border-[1px] border-red-500 w-full rounded-full h-12 pl-5 text-addS sm:col-span-10'
                                            : 'col-span-12 focus:outline-0 flex focus:ring-orange-500 focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS sm:col-span-10'
                                    }
                                />
                                <span
                                    onClick={() => setVisible(!visible)}
                                    className="flex items-center -ml-10 text-stone-400 cursor-pointer"
                                >
                                    {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </span>
                                {passwordError && <p className="col-span-12 pt-3 text-[13px] text-red-500">{passwordError}</p>}
                                <div
                                    onClick={() => setForgotPassword(true)}
                                    className="col-span-12 flex justify-end sm:pr-32 md:pr-20 lg:pr-24"
                                >
                                    <span className="font-addW text-addS mt-5 mb-2 leading-addL cursor-pointer text-gradientFirst">
                                        Forgot Password?
                                    </span>
                                </div>
                                {!loading && (
                                    <button className="mt-5 col-span-10 text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full rounded-full">
                                        Login
                                    </button>
                                )}
                                {loading && (
                                    <div className="mt-5 col-span-10 text-textW h-16 w-full rounded-full">
                                        <img src={loadingIn} className="self-end text-textW h-16 w-full xl:w-56 rounded-full" />
                                    </div>
                                )}
                            </form>
                        </>
                    )}
                    {register && (
                        <div className="w-full flex gap-x-3 mt-2 px-2 sm:px-0 max-lg:mb-8">
                            <div className="bg-gradientFirst inline h-2 w-full rounded-2xl"></div>
                            {/*  <div className="bg-gradientFirst inline h-2 w-full rounded-2xl"></div> */}
                            <div
                                className={
                                    registerForm == true
                                        ? 'bg-gradientFirst inline h-2 w-full rounded-2xl'
                                        : 'bg-fadedText inline h-2 w-full rounded-2xl'
                                }
                            ></div>
                        </div>
                    )}
                    {forgotPassword && <ForgotPassword setFunction={setForgotPassword} />}
                </div>
            </div>
        </>
    );
};
export default Login;
