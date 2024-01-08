import { useState } from 'react';
import { Register, defineRole, sendEmailVerification } from '@/backend/accountBackend';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toast } from 'react-toastify';
import Notification from '../Notification';
import { SubmitButton } from '../TextInput';

const RegisterComponent = (props: any) => {
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
    const getPasswordStrength = () => {
        const password = register.password;
        const hasMinLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);
        const strengthValue =
            (hasMinLength ? 1 : 0) +
            (hasUppercase ? 1 : 0) +
            (hasLowercase ? 1 : 0) +
            (hasDigit ? 1 : 0) +
            (hasSpecialChar ? 1 : 0);
        const normalizedStrength = strengthValue / 5;
        return normalizedStrength;
    };
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
            setFirstNameError('Please provide First Name');
        } else if (register.lastName == '') {
            setLastNameError('Please provide Last Name');
        } else if (register.email == '') {
            setEmailError('Please provide email');
        } else if (register.password == '') {
            setPasswordError('Please provide password');
        } else if (retypedPassword == '') {
            setPasswordError('Please Confirm password');
        } else if (register.password !== retypedPassword) {
            setPasswordError("Password doesn't match");
        } else if (getPasswordStrength() !== 1) {
        } else {
            if (validateEmail(register.email)) {
                setLoading(true);
                const fullName = register.firstName + ' ' + register.lastName;
                Register(register.email, register.password, fullName)
                    .then((res) => {
                        defineRole(res.$id, props.role, fullName).then((res) => {
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
                    }).catch((error) => {
                        console.log(error);
                        setLoading(false);
                        if (error.code == 409) {
                            toast.error('User with the same email already exists');
                        } else {
                            toast.error(error.message);
                        }
                    })

            } else {
                setEmailError('Invalid Email');
                setLoading(false);
            }
        }
    };
    const getColorClass = (score: number) => {
        if (score <= 0.2) {
            return "bg-red-500";
        } else if (score <= 0.6) {
            return "bg-yellow-500";
        } else if (score >= 0.8 && score < 1) {
            return "bg-green-300";
        } else if (score == 1) {
            return "bg-green-500";
        } else {
            return "bg-green-500";
        }
    };
    return (
        <>
            <form onSubmit={handleRegister} className="w-full flex gap-5 flex-wrap text-left mt-5 md:pr-0 gap-x-5">
                <div className='w-full gap-5 flex max-sm:flex-col md:flex-col xl:flex-row'>
                    <div className='flex-grow'>
                        <p className="font-thW text-smS mb-2 leading-shL">First name</p>
                        <input
                            value={register.firstName}
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setRegister({ ...register, firstName: e.currentTarget.value })}
                            type="text"
                            placeholder="Enter First Name"
                            className={
                                firstNameError
                                    ? 'col-span-12 focus:outline-0 focus:ring-orange-500 focus:border-0 border-[1px] border-red-500 w-full rounded-lg h-12 pl-5 text-addS'
                                    : 'col-span-12 focus:outline-0 focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-lg h-12 pl-5 text-addS'
                            }
                        />
                        {firstNameError && <p className="col-span-12 pt-3 text-[13px] text-red-500">{firstNameError}</p>}
                    </div>
                    <div className='flex-grow'>
                        <p className=" font-thW text-smS mb-2 leading-shL sm:col-span-6">Last name</p>
                        <input
                            value={register.lastName}
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setRegister({ ...register, lastName: e.currentTarget.value })}
                            type="text"
                            placeholder="Enter Last Name"
                            className={
                                lastNameError
                                    ? 'col-span-12 focus:outline-0 focus:ring-orange-500 focus:border-0 border-[1px] border-red-500 w-full rounded-lg h-12 pl-5 text-addS'
                                    : 'col-span-12 focus:outline-0 focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-lg h-12 pl-5 text-addS'
                            }
                        />
                        {lastNameError && <p className="col-span-12 pt-3 text-[13px] text-red-500">{lastNameError}</p>}
                    </div>
                </div>
                <div className='w-full'>
                    <p className="font-thW text-smS mb-2 leading-shL">Email Address</p>
                    <input
                        value={register.email}
                        onChange={(e) => setRegister({ ...register, email: e.currentTarget.value })}
                        type="text"
                        placeholder="Enter your Email"
                        className={
                            emailError
                                ? 'col-span-12 focus:outline-0 focus:ring-orange-500 focus:border-0 border-[1px] border-red-500 w-full rounded-lg h-12 pl-5 text-addS'
                                : 'col-span-12 focus:outline-0 focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-lg h-12 pl-5 text-addS'
                        }
                    />
                    {emailError && <p className=" pt-3 text-[13px] text-red-500">{emailError}</p>}
                </div>
                <div className='w-full gap-5 flex max-sm:flex-col md:flex-col xl:flex-row'>
                    <div className='flex-grow'>
                        <p className="font-thW text-smS mb-2 leading-shL">Password</p>
                        <div className="flex ">
                            <input
                                value={register.password}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setRegister({ ...register, password: e.currentTarget.value })}
                                type={visible ? 'text' : 'password'}
                                placeholder="Enter Your Password"
                                className={
                                    passwordError
                                        ? 'focus:outline-0 flex focus:ring-orange-500 focus:border-0 border-[1px] border-red-500 w-full rounded-lg h-12 pl-5 text-addS'
                                        : 'focus:outline-0 flex focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-lg h-12 pl-5 text-addS'
                                }
                            />
                            <span onClick={() => setVisible(!visible)} className="flex items-center -ml-10 text-stone-400 cursor-pointer">
                                {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </span>
                        </div>
                    </div>
                    <div className='flex-grow'>
                        <p className=" font-thW text-smS mb-2 leading-shL">Confirm Password</p>
                        <input
                            value={retypedPassword}
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setRetypedPassword(e.currentTarget.value)}
                            type={visible ? 'text' : 'password'}
                            placeholder="Retype password"
                            className={
                                passwordError
                                    ? 'col-span-12 focus:outline-0 focus:ring-orange-500 focus:border-0 border-[1px] border-red-500 w-full rounded-lg h-12 pl-5 text-addS'
                                    : 'col-span-12 focus:outline-0 focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-lg h-12 pl-5 text-addS'
                            }
                        />
                    </div>

                </div>
                <div className='w-full'>
                    <p className='text-sm text-gray-500'>The Password must contain at least 8 charachters. It must include atleast 1 number, 1 special charachter, uppercase and lowercase letters.</p>
                </div>
                <div className='w-full'>
                    <div className='bg-gray-100 w-full'>
                        <div style={{ width: `${getPasswordStrength() * 100}%` }}
                            className={`flex h-2 rounded-[3px] flex-col whitespace-nowrap transition-all duration-500 ease-in-out ${getColorClass(
                                getPasswordStrength()).toString()}`}
                        ></div>
                    </div>
                </div>
                {passwordError && <p className="text-[13px] w-full text-red-500">{passwordError}</p>}
                <div className='w-full flex md:justify-end'>
                    <div className='w-full md:w-60 pt-5'>
                        <SubmitButton loading={loading} buttonText="Continue" />
                    </div>
                </div>
            </form>
            <Notification
                openNotify={openNotify}
                setOpenNotify={setOpenNotify}
                successText="success"
                successWord="Email Verfication has been sent"
            />

        </>
    );
};

export default RegisterComponent;
