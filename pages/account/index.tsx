import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import { useState } from 'react';
import Link from 'next/link';
import ForgotPassword from '@/components/account/ForgotPassword';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getAccount, googleRegister, googleSignIn, signIn, getRole } from '@/backend/accountBackend';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import RegisterComponent from '@/components/account/Register';
import Slider from '@/components/Slider';
import { SubmitButton, TextInputRelated } from '@/components/TextInput';
import { useGlobalContext } from '@/contextApi/userData';
import localforage from "localforage";

const Login = () => {
    const router = useRouter();
    const logo = '/images/logo.svg';
    const google = '/images/google.svg';
    const [register, setRegister] = useState(false);
    const [registerForm, setRegisterForm] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [visible, setVisible] = useState(false);
    const [getJob, setGetJob] = useState(false);
    const [hireTalent, setHireTalent] = useState(false);
    const [checked, setChecked] = useState(false);
    const [checkError, setCheckError] = useState('');
    const [login, setLogin] = useState({
        email: '',
        password: ''
    });
    const { userData, setUserData } = useGlobalContext()
    function validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const handlelogin = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        if (login.email == '') {
            setEmailError('please provide email');
        } else if (login.password == '') {
            setPasswordError('please provide password');
        } else {
            if (validateEmail(login.email)) {
                setLoading(true);
                const sign = signIn(login.email, login.password);
                sign.then(async (res) => {
                    setLoading(false);
                    if (res == null) {
                        toast.error('Please Verify Email')
                    } else {
                        toast.success("Welcome back! You're successfully logged in.");
                        const loggedIn = await getAccount();
                        if (loggedIn !== 'failed') {
                            setUserData(loggedIn)
                            localforage.setItem('userData', loggedIn).then(() => {
                            });
                            typeof window !== 'undefined' && router.push('/jobs');
                        }
                    }
                }).catch((error) => {
                    console.log(error.message);
                    setLoading(false);
                    toast.error(error.message);
                });
            } else {
                setEmailError('Invalid Email');
            }
        }
    };
    const handleGoogleLogin = () => {
        googleSignIn()
    }
    const handleGoogleRegister = () => {
        if (getJob == true) {
            googleRegister('candidate')
        }
        if (hireTalent == true) {
            googleRegister('employer')
        }
    }
    return (
        <>
            <div className="flex max-md:flex-wrap overflow-y-auto sm:pb-5 ">
                <div className="w-full h-screen md:w-1/2 flex flex-col max-md:gap-10 items-center max-md:mt-10 order-2 md:order-1 ">
                    <div className='md:fixed md:w-1/2 accountBack h-full'>
                        <div className={'w-full flex justify-center mt-10 sm:mt-28'}>
                            <Link href="/">
                                <img src={logo} className=" w-[15rem]" />
                            </Link>
                        </div>
                        <div
                            className={'loginCoursel w-full lg:pt-[5%] flex justify-center md:h-[45%] lg:h-[75%] xl:h-[50%]'}
                        >
                            <Slider />
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center flex-wrap px-5 sm:px-20 md:px-10 lg:px-24 xl:px-32 pt-16">
                    <div className='flex flex-col gap-5'>
                        <div className="font-shW w-full text-center text-shS md:text-dshS h-10">
                            Connect. Grow. <span className="text-gradientFirst">Succeed.</span>
                        </div>
                        {forgotPassword == false && (
                            <div className='flex justify-center w-full overflow-hidden h-fit'>
                                <div className="bg-[#FAFAFA] w-full rounded-lg h-16 p-2 flex">
                                    <button
                                        className={
                                            register == false
                                                ? 'w-1/2 bg-gradientFirst text-textW rounded-lg cursor-pointer'
                                                : 'w-1/2 rounded-lg cursor-pointer'
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
                                                ? 'w-1/2 bg-gradientFirst text-textW rounded-lg cursor-pointer'
                                                : 'w-1/2 rounded-lg cursor-pointer'
                                        }
                                        onClick={() => setRegister(true)}
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {!register && forgotPassword == false && (
                        <p className="lg:text-midRS flex justify-center text-center my-3 font-midRW leading-midRL text-[#5B5B5B]">
                            Building bridges, paving pathways. Dive into Palm Jobs.
                        </p>
                    )}
                    {register && !registerForm && (
                        <p className="lg:text-midRS flex justify-center text-center my-3 font-midRW leading-midRL text-[#5B5B5B]">
                            Please choose one of these to continue.
                        </p>
                    )}
                    {register && !registerForm && (
                        <>

                            <div className="bg-[#FAFAFA] w-full flex p-2 rounded-lg gap-2 max-sm:flex-wrap sm:h-[8rem]">
                                <div
                                    onClick={() => {
                                        setGetJob(true);
                                        setHireTalent(false);
                                    }}
                                    className={
                                        getJob
                                            ? 'w-full rounded-lg text-textW bg-gradient-to-r from-gradientFirst rounded-lg to-gradientSecond flex gap-x-3 text-left p-3 h-[5rem] items-left sm:h-[7rem] sm:flex-grow sm:flex-col sm:justify-between'
                                            : 'w-full text-[#141417] rounded-lg hover:text-textW cursor-pointer hover:bg-gradient-to-r hover:from-gradientFirst hover:to-gradientSecond bg-textW flex gap-x-3 text-left p-3 h-[5rem] items-left sm:h-[7rem] sm:w-flex-grow sm:flex-col sm:justify-between'
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
                                            ? 'w-full rounded-lg text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond flex gap-x-3 text-left p-3 h-[5rem] items-left sm:h-[7rem] sm:flex-grow sm:flex-col sm:justify-between'
                                            : 'w-full text-[#141417] rounded-lg hover:text-textW cursor-pointer hover:bg-gradient-to-r hover:from-gradientFirst hover:to-gradientSecond bg-textW flex gap-x-3 text-left p-3 h-[5rem] items-left sm:h-[7rem] sm:flex-grow sm:flex-col sm:justify-between'
                                    }
                                >
                                    <PersonAddAltOutlinedIcon />
                                    <p>Hire talent</p>
                                </div>
                            </div>
                            <div className="w-full">
                                <input
                                    onChange={(e) => setChecked(e.currentTarget.checked)}
                                    type="checkbox"
                                    className="text-addS h-4 rounded-sm focus:ring-gradientSecond focus:bg-gradientFirst checked:bg-gradientFirst active:bg-gradientFirst"
                                />
                                <span className="font-addW text-addS leading-addL pl-2">To continue please accept our Terms and Conditions. Thanks!</span>
                                {checkError && <p className="col-span-12 pt-3 text-[13px] text-red-500">{checkError}</p>}
                            </div>
                            <div className="w-full flex justify-end">
                                {!getJob && !hireTalent && (
                                    <div className="bg-gray-100 text-gray-600 flex items-center justify-center h-16 w-full sm:w-60 rounded-lg">
                                        Continue
                                    </div>
                                )}
                                {(getJob || hireTalent) && (
                                    <button
                                        onClick={() => {
                                            if (!checked) {
                                                setCheckError('Please agree to terms and conditions.');
                                            }
                                            if (checked) {
                                                setCheckError('');
                                                setRegisterForm(true)
                                            }
                                        }}
                                        className="bg-black text-textW flex items-center justify-center h-16 w-full sm:w-60 rounded-lg"
                                    >
                                        Continue
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                    {(register == false || registerForm == true) && forgotPassword == false && (
                        <div className="w-full justify-center flex mt-3">
                            {
                                registerForm == false && <button type='button' onClick={() => handleGoogleLogin()} className="w-full border-2 px-3 rounded-lg cursor-pointer h-11 text-addS flex items-center">
                                    <img src={google} alt="google" className="w-[1rem] h-[1rem] inline ml-3" /> <p className='flex-grow text-center'> Continue with Google</p>
                                </button>
                            }
                            {
                                registerForm == true && <button type='button' onClick={() => handleGoogleRegister()} className="w-full border-2 px-3 rounded-lg cursor-pointer h-11 text-addS flex items-center">
                                    <img src={google} alt="google" className="w-[1rem] h-[1rem] inline ml-3" /> <p className='flex-grow text-center'>Continue with Google</p>
                                </button>
                            }
                        </div>
                    )}
                    {registerForm && <RegisterComponent role={getJob ? 'candidate' : 'employer'} />}
                    {!register && forgotPassword == false && (
                        <form className="w-full flex justify-center flex-wrap gap-5" onSubmit={handlelogin}>
                            <div className=' w-full flex flex-wrap gap-3'>
                                <p className="font-thW text-smS leading-shL">Email Address</p>
                                <TextInputRelated placeHolder="Enter Email" value={login.email} change={"email"} dataDistruct={login} setFunction={setLogin} errorMessage={emailError} class="w-full" />
                            </div>
                            <div className='flex flex-wrap w-full flex flex-wrap gap-3'>
                                <p className="w-full font-thW text-smS text-left leading-shL">Password</p>
                                <input
                                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                                        setLogin({ ...login, password: e.currentTarget.value })
                                    }
                                    type={visible ? 'text' : 'password'}
                                    placeholder="Enter password"
                                    className={`h-12 pl-5 bg-white rounded-lg border focus:ring-gradientFirst focus:border-0 w-full ${passwordError ? 'border-red-500' : 'border-gray-200'}`}
                                />
                                <span
                                    onClick={() => setVisible(!visible)}
                                    className="flex items-center -ml-10 text-stone-400 cursor-pointer"
                                >
                                    {visible ? <VisibilityIcon sx={{ fontSize: '1.2rem' }} /> : <VisibilityOffIcon sx={{ fontSize: '1.2rem' }} />}
                                </span>
                            </div>
                            {passwordError && <p className="col-span-12 pt-3 text-[13px] text-red-500">{passwordError}</p>}

                            <div className='w-full col-span-10 flex md:justify-end mt-5'>
                                <div className='w-full md:w-60 pt-5'>
                                    <SubmitButton loading={loading} buttonText="Login" />
                                </div>
                            </div>
                            <div
                                onClick={() => setForgotPassword(true)}
                                className="w-full flex justify-end"
                            >
                                <span className="font-addW text-addS leading-addL cursor-pointer text-gradientFirst">
                                    Forgot Password?
                                </span>
                            </div>
                        </form>
                    )}
                    {forgotPassword && <ForgotPassword setFunction={setForgotPassword} />}
                </div>
            </div>
        </>

    );
};
export default Login;
