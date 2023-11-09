import { useState } from 'react';
import { Register, defineRole, sendEmailVerification } from '@/lib/accountBackend';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toast } from 'react-toastify';
import Notification from '../Notification';
const RegisterComponent = (props: any) => {
    const loadingIn = '/images/loading.svg';
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [retypedPassword, setRetypedPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [checkError, setCheckError] = useState('');
    const [openNotify, setOpenNotify] = useState(false)
    const [register, setRegister] = useState({
        email: '',
        password: '',
        firstName: props.name,
        lastName: ''
    });
    function validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const handleRegister = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        setFirstNameError('');
        setLastNameError('');
        if (register.firstName == '') {
            setFirstNameError('please provide First Name');
        } else if (register.lastName == '') {
            setLastNameError('please provide Last Name');
        } else if (register.email == '') {
            setEmailError('please provide email');
        } else if (register.password == '') {
            setPasswordError('please provide password');
        } else if (retypedPassword == '') {
            setPasswordError('please Confirm password');
        } else if (register.password !== retypedPassword) {
            setPasswordError("password doesn't match");
        } else if (register.password.length < 8) {
            setPasswordError('password must be more than 8 charachters');
        } else if (!checked) {
            setCheckError('Please Agree to Terms and Condition');
        } else {
            if (validateEmail(register.email)) {
                setLoading(true);
                const fullName = register.firstName + ' ' + register.lastName;
                Register(register.email, register.password, fullName)
                    .then((res) => {
                        defineRole(res.$id, props.role, fullName);
                    })
                    .catch((error) => {
                        console.log(error);
                        setLoading(false);
                        if (error.code == 409) {
                            toast.error('User with the same email already exists');
                        } else {
                            toast.error(error.message);
                        }
                    })
                    .then(() => {
                        sendEmailVerification(register.email, register.password)
                            .then((res) => {
                                setOpenNotify(true)
                                setRegister({
                                    email: '',
                                    password: '',
                                    firstName: '',
                                    lastName: ''
                                });
                                setRetypedPassword('');
                                setLoading(false);
                            })
                            .catch((error) => {
                                setLoading(false);
                                toast.error(error);
                                console.log(error);
                            });
                    });
            } else {
                setEmailError('Invalid Email');
                setLoading(false);
            }
        }
    };
    return (
        <>
            <form onSubmit={handleRegister} className="w-full pl-5 grid grid-cols-12 text-left pr-2 md:pr-0 gap-x-5">
                <div className="col-span-12 sm:col-span-6">
                    <p className="col-span-6 font-thW text-smS mt-5 mb-2 leading-shL">First name</p>
                    <input
                        value={register.firstName}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setRegister({ ...register, firstName: e.currentTarget.value })}
                        type="text"
                        placeholder="Enter First Name"
                        className={
                            firstNameError
                                ? 'col-span-12 focus:outline-0 focus:ring-orange-500 focus:border-0 border-[1px] border-red-500 w-full rounded-full h-12 pl-5 text-addS'
                                : 'col-span-12 focus:outline-0 focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS'
                        }
                    />
                    {firstNameError && <p className="col-span-12 pt-3 text-[13px] text-red-500">{firstNameError}</p>}
                </div>
                <div className="col-span-12 sm:col-span-6">
                    <p className="col-span-10 font-thW text-smS mt-5 mb-2 leading-shL sm:col-span-6">Last name</p>
                    <input
                        value={register.lastName}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setRegister({ ...register, lastName: e.currentTarget.value })}
                        type="text"
                        placeholder="Enter Last Name"
                        className={
                            lastNameError
                                ? 'col-span-12 focus:outline-0 focus:ring-orange-500 focus:border-0 border-[1px] border-red-500 w-full rounded-full h-12 pl-5 text-addS'
                                : 'col-span-12 focus:outline-0 focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS'
                        }
                    />
                    {lastNameError && <p className="col-span-12 pt-3 text-[13px] text-red-500">{lastNameError}</p>}
                </div>
                <p className="col-span-10 font-thW text-smS mt-5 mb-2 leading-shL">Email Address</p>
                <input
                    value={register.email}
                    onChange={(e) => setRegister({ ...register, email: e.currentTarget.value })}
                    type="text"
                    placeholder="Enter your Email"
                    className={
                        emailError
                            ? 'col-span-12 focus:outline-0 focus:ring-orange-500 focus:border-0 border-[1px] border-red-500 w-full rounded-full h-12 pl-5 text-addS'
                            : 'col-span-12 focus:outline-0 focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS'
                    }
                />
                {emailError && <p className="col-span-12 pt-3 text-[13px] text-red-500">{emailError}</p>}
                <div className="col-span-12 sm:col-span-6 flex flex-col">
                    <p className="col-span-6 font-thW text-smS mt-5 mb-2 leading-shL">Password</p>
                    <div className="flex ">
                        <input
                            value={register.password}
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setRegister({ ...register, password: e.currentTarget.value })}
                            type={visible ? 'text' : 'password'}
                            placeholder="Enter Your Password"
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
                </div>
                <div className="col-span-12 sm:col-span-6">
                    <p className="col-span-10 font-thW text-smS mt-5 mb-2 leading-shL sm:col-span-6">Confirm Password</p>
                    <input
                        value={retypedPassword}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setRetypedPassword(e.currentTarget.value)}
                        type={visible ? 'text' : 'password'}
                        placeholder="Retype password"
                        className={
                            passwordError
                                ? 'col-span-12 focus:outline-0 focus:ring-orange-500 focus:border-0 border-[1px] border-red-500 w-full rounded-full h-12 pl-5 text-addS'
                                : 'col-span-12 focus:outline-0 focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS'
                        }
                    />
                </div>
                {passwordError && <p className="col-span-12 pt-3 text-[13px] text-red-500">{passwordError}</p>}
                <div className="col-span-12 mt-5">
                    <input
                        onChange={(e) => setChecked(e.currentTarget.checked)}
                        type="checkbox"
                        className="pl-5 text-addS max-h-[1rem]"
                    />
                    <span className="font-addW text-addS leading-addL pl-2">To continue please accept our Terms and Conditions. Thanks!</span>
                    {checkError && <p className="col-span-12 pt-3 text-[13px] text-red-500">{checkError}</p>}
                </div>
                <div className="col-span-12 grid grid-cols-12 justify-items-end pr-2">
                    {loading && (
                        <div className="mt-5 col-start-7 col-end-13 text-textW h-16 w-full rounded-full">
                            <img src={loadingIn} className="self-end text-textW h-16 w-full xl:w-56 rounded-full" />
                        </div>
                    )}
                    {!loading && (
                        <button
                            type="submit"
                            className="mt-5 col-start-7 col-end-13 text-textW bg-gradient-to-r from-gradientFirst to-gradientSecond h-16 w-full rounded-full"
                        >
                            Continue
                        </button>
                    )}
                </div>
            </form>

            {openNotify && (
                <Notification
                    openNotify={openNotify}
                    setOpenNotify={setOpenNotify}
                    successText="success"
                    successWord="Email Verfication has been sent"
                />
            )}

        </>
    );
};

export default RegisterComponent;
