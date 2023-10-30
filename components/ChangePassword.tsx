import { changePassword } from '@/lib/services';
import React, { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toast } from 'react-toastify';
const RequiredTextLabel = (props: any) => {
    return (
        <div>
            <span className="text-neutral-900 text-opacity-70 text-lg font-medium leading-loose md:text-xl">{props.text} </span>
            <span className={props.req == 'nReq' ? 'hidden' : 'text-orange-600 text-2xl font-medium leading-loose'}>*</span>
        </div>
    );
};
const ChangePassword = () => {
    const loadingIn = '/images/loading.svg';
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfrimPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visibleOld, setVisibleOld] = useState(false);
    const handleReset = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (oldPassword == '') {
            setOldPasswordError('Please provide old password');
        } else if (password == '') {
            setPasswordError('Please Enter Password');
        } else if (password.length < 8) {
            setPasswordError('Password must be more than 8 charachters');
        } else if (confirmPassword == '') {
            setPasswordError('Please Confirm Password');
        } else if (password !== confirmPassword) {
            setPasswordError('Password does not match');
        } else {
            setLoading(true);
            changePassword(password, oldPassword)
                .then((res) => {
                    toast.success('Password Updated Successfully');
                    setLoading(false);
                    setPassword('');
                    setConfrimPassword('');
                    setOldPassword('');
                    setOldPasswordError('');
                    setPasswordError('');
                })
                .catch((error) => {
                    setLoading(false);
                    toast.error('Password Not Updated');
                    console.log(error.message);
                });
        }
    };
    return (
        <div className="pt-5 pb-10 bg-textW grid grid-cols-12 max-sm:px-5 sm:pl-10 xl:pr-28 xl:px-20">
            <form
                onSubmit={handleReset}
                className="col-span-12  order-1 md:order-2 flex flex-col gap-y-2 md:px-5 lg:px-10 xl:px-20 md:col-span-6 xl:col-span-9"
            >
                <p className="col-span-12 font-frhW  text-[#0E121D] text-[1.5rem] xl:text-frhS">Change your password</p>
                <RequiredTextLabel text="Old Password" />
                <div className="col-span-12 flex">
                    <input
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.currentTarget.value)}
                        type={visibleOld ? 'text' : 'password'}
                        placeholder="Enter password"
                        className={
                            oldPasswordError
                                ? 'col-span-12 focus:outline-0 flex focus:ring-orange-500 focus:border-0 border-[1px] border-red-500 w-full rounded-full h-12 pl-5 text-addS'
                                : 'col-span-12 focus:outline-0 flex focus:ring-gradientSecond focus:border-0 border-[1px] w-full rounded-full h-12 pl-5 text-addS'
                        }
                    />
                    <span onClick={() => setVisibleOld(!visibleOld)} className="flex items-center -ml-10 text-stone-400 cursor-pointer">
                        {visibleOld ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </span>
                </div>
                {oldPasswordError && <p className="col-span-12 pt-3 text-[13px] text-red-500 text-left">{oldPasswordError}</p>}
                <RequiredTextLabel text="New Password" />
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
                            Reset
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
