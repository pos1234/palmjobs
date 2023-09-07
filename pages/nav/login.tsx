import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ReactChild, ReactElement, useState } from 'react';
import { ReactNode } from 'react';

const Login = () => {
    const logo = '/images/logo.svg';
    const google = '/images/google.svg';
    const facebook = '/images/facebook.svg';
    const [register, setRegister] = useState(false);
    const [registerForm, setRegisterForm] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const renderCustomIndicator = (
        clickHandler: (e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void,
        isSelected: boolean,
        index: number,
        label: string
    ): React.ReactNode => {
        return (
            <div style={{ display: 'inline-block' }} className="float-left">
                <span
                    key={index}
                    onClick={clickHandler}
                    onKeyDown={clickHandler}
                    className={
                        isSelected
                            ? 'w-5 h-5 bg-gradient-to-r from-gradientFirst to-gradientSecond cursor-pointer rounded-full'
                            : 'w-5 h-5 bg-textW rounded-full cursor-pointer'
                    }
                    style={{ display: 'inline-block', marginRight: '1rem' }}
                />
            </div>
        );
    };
    const profile = '/images/profile.svg';

    return (
        <>
            <div className="grid grid-cols-12 overflow-y-auto  sm:pb-5 h-screen">
                <div className="col-span-12 md:col-span-6 order-2 md:order-1 flex items-center bg-skillColor rounded-tr-[5.75rem] rounded-br-[5.75rem] ">
                    <div className="loginCoursel w-full  lg:pt-[15%] flex item-center justify-center md:h-[40%] lg:h-[60%] xl:h-[65%]">
                        <Carousel
                            renderIndicator={renderCustomIndicator}
                            showStatus={false}
                            showArrows={false}
                            autoPlay={true}
                            interval={9000}
                            showThumbs={false}
                            className="flex flex-col px-10 pt-10 w-full"
                        >
                           
                            <div className="w-full text-left flex flex-col mb-20">
                                <p className="text-zinc-900 text-[1.7rem] pb-5 font-medium max-h-[18rem] overflow-hidden md:text-[1.2rem] lg:text-[1.5rem] xl:text-[1.8rem]">
                                    “It’s a huge benefit to the client, to be able to quickly hire a talented, vetted person. And the costs
                                    at YES are low, which means the client pays less and I earn more.”
                                </p>
                                <div className="grid grid-cols-12">
                                    <img src={profile} className="w-full h-full col-span-2" />
                                    <div className="col-span-10 flex flex-col justify-center pl-5">
                                        <p className="text-neutral-900 text-xl font-medium leading-7">John Doe</p>
                                        <p className="text-stone-300 text-lg font-normal leading-relaxed">Marketing Manager</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full text-left flex flex-col mb-20">
                                <p className="text-zinc-900 text-[1.7rem] pb-5 font-medium max-h-[18rem] overflow-hidden md:text-[1.2rem] lg:text-[1.5rem] xl:text-[1.8rem]">
                                    “It’s a huge benefit to the client, to be able to quickly hire a talented, vetted person. And the costs
                                    at YES are low, which means the client pays less and I earn more.”
                                </p>
                                <div className="grid grid-cols-12">
                                    <img src={profile} className="w-full h-full col-span-2" />
                                    <div className="col-span-10 flex flex-col justify-center pl-5">
                                        <p className="text-neutral-900 text-xl font-medium leading-7">John Doe</p>
                                        <p className="text-stone-300 text-lg font-normal leading-relaxed">Marketing Manager</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full text-left flex flex-col mb-20">
                                <p className="text-zinc-900 text-[1.7rem] pb-5 font-medium max-h-[18rem] overflow-hidden md:text-[1.2rem] lg:text-[1.5rem] xl:text-[1.8rem]">
                                    “It’s a huge benefit to the client, to be able to quickly hire a talented, vetted person. And the costs
                                    at YES are low, which means the client pays less and I earn more.”
                                </p>
                                <div className="grid grid-cols-12">
                                    <img src={profile} className="w-full h-full col-span-2" />
                                    <div className="col-span-10 flex flex-col justify-center pl-5">
                                        <p className="text-neutral-900 text-xl font-medium leading-7">John Doe</p>
                                        <p className="text-stone-300 text-lg font-normal leading-relaxed">Marketing Manager</p>
                                    </div>
                                </div>
                            </div>
                        </Carousel>
                    </div>
                </div>
                <div className="col-span-12  order-1 md:order-2 text-center flex flex-col gap-y-5 items-center md:px-5 lg:px-10 xl:px-20 md:col-span-6">
                    <div className={forgotPassword == false ? 'flex justify-center' : 'flex justify-center mt-20 sm:mt-28'}>
                        <img src={logo} className=" w-[15rem]   " />
                        {/* xl:w-[28.5rem] */}
                    </div>
                    {forgotPassword == false && (
                        <p className="font-shW text-shS md:text-dshS">
                            Right Fit! <br /> The Perfect Job on <span className="text-gradientFirst">YES</span>
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
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim suscipit autem.
                        </p>
                    )}
                    {registerForm && (
                        <p className="text-left text-midRS font-midRW leading-midRL text-[#5B5B5B] text-left">
                            <span className="text-smS inline-block mb-1">You're almost there!</span> <br />
                        </p>
                    )}

                    {register && !registerForm && (
                        <>
                            <div className="text-center mt-5">
                                <p className="text-left text-fhS font-dfhW  leading-midRL text-[#141417] pl-2 sm:text-dfhS sm:font-addW">
                                    &#128075; Hi
                                    <input
                                        type="text"
                                        className="ml-2 border-b-2 border-dashed border-[#141417] w-40 active:border-0 focus:outline-0 mb-3 sm:mb-0"
                                    />
                                    ! Tell us why you're here.
                                </p>
                            </div>
                            <div className="bg-[#ffa06e0d] w-full lg:max-xl:bg-red-500 grid grid-cols-12 py-3 px-2 gap-x-3 gap-y-5 md:gap-y-0 md:gap-x-5 xl:gap-x-10">
                                <div className="col-span-12 bg-textW flex gap-x-3 text-left p-3 h-[5rem] items-left sm:h-[7rem] sm:col-span-6 sm:flex-col sm:justify-between">
                                    <BusinessCenterOutlinedIcon />
                                    <p className="text-[#141417]">Get a job</p>
                                </div>
                                <div className="col-span-12 bg-textW flex gap-x-3 text-left p-3 h-[5rem] items-left sm:h-[7rem] sm:col-span-6 sm:flex-col sm:justify-between">
                                    <PersonAddAltOutlinedIcon />
                                    <p className="text-[#141417]">Hire talent</p>
                                </div>
                            </div>
                            <div className="w-full grid grid-cols-12 justify-items-end pr-2">
                                <button
                                    onClick={() => setRegisterForm(true)}
                                    className="mt-5 col-start-7 col-end-13 text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full rounded-full"
                                >
                                    Continue
                                </button>
                            </div>
                        </>
                    )}
                    {(register == false || registerForm == true) && forgotPassword == false && (
                        <div className="w-full p-2 grid gap-x-2 grid-cols-12 gap-y-4 lg:gap-y-0">
                            <button className="col-span-12 border-2 rounded-full cursor-pointer py-[0.93rem] text-addS text-fadedText flex justify-evenly items-center sm:col-span-6 md:max-lg:col-span-12">
                                <p> Sign in with Google</p> <img src={google} alt="google" className="w-[2rem] h-[2rem] inline ml-3" />
                            </button>
                            <button className="text-addS text-fadedText col-span-12 border-2 rounded-full cursor-pointer py-[0.93rem] flex justify-evenly items-center sm:col-span-6 md:max-lg:col-span-12">
                                Sign in with Facebook <img src={facebook} alt="google" className="w-[2rem] h-[2rem] inline ml-3 -mt-1" />
                            </button>
                        </div>
                    )}

                    {registerForm && (
                        <>
                            <div className="w-full pl-5 grid grid-cols-12 text-left pr-2 md:pr-0 gap-x-5">
                                <div className="col-span-12 sm:col-span-6">
                                    <p className="col-span-6 font-thW text-smS mt-5 mb-2 leading-shL">First name</p>
                                    <input
                                        type="text"
                                        placeholder="Enter First Name"
                                        className="col-span-12 border-[1px] w-full rounded-full h-12 pl-5 text-addS sm:col-span-12"
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6">
                                    <p className="col-span-10 font-thW text-smS mt-5 mb-2 leading-shL sm:col-span-6">Last name</p>
                                    <input
                                        type="text"
                                        placeholder="Enter Last Name"
                                        className="col-span-12 border-[1px] w-full rounded-full h-12 pl-5 text-addS sm:col-span-6"
                                    />
                                </div>
                                <p className="col-span-10 font-thW text-smS mt-5 mb-2 leading-shL">Email Address</p>
                                <input
                                    type="text"
                                    placeholder="Enter your Email"
                                    className="col-span-12 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                />
                                <p className="col-span-10 font-thW text-smS mt-5 mb-2 leading-shL">Password</p>
                                <input
                                    type="text"
                                    placeholder="Enter Your Password"
                                    className="col-span-12 border-[1px] w-full rounded-full h-12 pl-5 text-addS"
                                />
                                <div className="col-span-12 mt-5">
                                    <input type="checkbox" placeholder="Project Name" className="pl-5 text-addS" />
                                    <span className="font-addW text-addS leading-addL pl-2">
                                        I agree to the Terms of Service and Privacy Policy
                                    </span>
                                </div>
                                <div className="col-span-12 grid grid-cols-12 justify-items-end pr-2">
                                    <button className="mt-5 col-start-7 col-end-13 text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full rounded-full">
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {!register && forgotPassword == false && (
                        <>
                            <div className="w-full pl-5 grid grid-cols-12 text-left pr-2 md:pr-0">
                                <p className="col-span-10 font-thW text-smS mt-5 mb-2 leading-shL">Email Address</p>
                                <input
                                    type="text"
                                    placeholder="Enter Email"
                                    className="col-span-12 border-[1px] w-full rounded-full h-12 pl-5 text-addS sm:col-span-10"
                                />
                                <p className="col-span-10 font-thW text-smS mt-5 mb-2 leading-shL">Password</p>
                                <input
                                    type="text"
                                    placeholder="Enter password"
                                    className="col-span-12 border-[1px] w-full rounded-full h-12 pl-5 text-addS sm:col-span-10"
                                />
                                <div className="col-span-5 mt-5">
                                    <input type="checkbox" placeholder="Project Name" className="pl-5 text-addS" />
                                    <span className="font-addW text-addS leading-addL pl-2">Remember me</span>
                                </div>
                                <div onClick={() => setForgotPassword(true)} className="col-span-7 text-right mt-5 sm:col-span-5">
                                    <span className="font-addW text-addS mt-5 mb-2 leading-addL cursor-pointer text-gradientFirst">
                                        Forgot Password?
                                    </span>
                                </div>
                                <button className="mt-5 col-span-10 text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full rounded-full">
                                    Login
                                </button>
                                <p className="col-span-10 text-center font-addW text-addS mt-5 mb-2 leading-addL cursor-pointer">
                                    Looking For talents <span className="font-thW underline text-gradientFirst">Start Here</span>
                                </p>
                            </div>
                        </>
                    )}
                    {register && (
                        <div className="w-full flex gap-x-3 mt-2 px-2 sm:px-0">
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
                    {forgotPassword && (
                        <div className="w-full grid grid-cols-12 gap-y-3 pl-5 pr-3 sm:pr-0 sm:max-md:px-40 md:pl-0 lg:pl-20">
                            <p className="col-span-12 font-frhW text-frhS text-[#0E121D]">Reset your password</p>
                            <p className="col-span-6 text-left font-thW text-smS mt-5 mb-2 leading-shL">Email Address</p>
                            <input
                                type="text"
                                placeholder="Enter your Email"
                                className="col-span-12 border-[1px] rounded-full h-12 pl-5 text-addS lg:col-span-10"
                            />
                            <div className="col-span-12 grid grid-cols-12 justify-items-end pr-2 lg:col-span-10">
                                <button className="mt-5 col-span-12 text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full rounded-full">
                                    Continue
                                </button>
                            </div>
                            <div className="col-span-12 grid grid-cols-12 justify-items-end pr-2 lg:col-span-10">
                                <button
                                    onClick={() => setForgotPassword(false)}
                                    className="mt-5 col-span-12 bg-[#F8F8F8] text-darkBlue h-16 w-full rounded-full"
                                >
                                    Return to Login
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
export default Login;
