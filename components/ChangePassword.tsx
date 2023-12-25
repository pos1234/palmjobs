import { changePassword } from '@/backend/accountBackend';
import React, { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toast } from 'react-toastify';
import { SubmitButton } from './TextInput';
const RequiredTextLabel = (props: any) => {
    return (
        <div>
            <span className="text-neutral-900 text-opacity-70 font-medium leading-loose">{props.text} </span>
            <span className={props.req == 'nReq' ? 'hidden' : 'text-orange-600 font-medium leading-loose'}>*</span>
        </div>
    );
};
const ChangePassword = (props: any) => {
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
        <div className={props.class}>
            <form
                onSubmit={handleReset}
                className="flex flex-col gap-y-2 w-full sm:w-2/3"
            >
                <p className="font-frhW  text-[#0E121D] text-[1rem] xl:text-[1.2rem]">Change your password</p>
                <RequiredTextLabel text="Old Password" />
                <div className="flex">
                    <input
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.currentTarget.value)}
                        type={visibleOld ? 'text' : 'password'}
                        placeholder="Enter password"
                        className={`focus:outline-0 flex border-[1px] w-full rounded-lg h-10 pl-5 text-addS focus:border-0 ${oldPasswordError ? 'border-red-500' : 'focus:ring-gradientSecond'}`}
                    />
                    <span onClick={() => setVisibleOld(!visibleOld)} className="flex items-center -ml-10 text-stone-400 cursor-pointer">
                        {visibleOld ? <VisibilityIcon sx={{ fontSize: '1.2rem' }} /> : <VisibilityOffIcon sx={{ fontSize: '1.2rem' }} />}
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
                        className={`focus:outline-0 flex border-[1px] w-full rounded-lg h-10 pl-5 text-addS focus:border-0 ${passwordError ? 'border-red-500' : 'focus:ring-gradientSecond'}`}
                    />
                    <span onClick={() => setVisible(!visible)} className="flex items-center -ml-10 text-stone-400 cursor-pointer">
                        {visible ? <VisibilityIcon sx={{ fontSize: '1.2rem' }} /> : <VisibilityOffIcon sx={{ fontSize: '1.2rem' }} />}
                    </span>
                </div>
                <p className="col-span-12 float-left font-thW text-smS mt-5 mb-0 leading-shL">Confirm Password</p>
                <input
                    value={confirmPassword}
                    onChange={(e) => setConfrimPassword(e.currentTarget.value)}
                    type={visible ? 'text' : 'password'}
                    placeholder="Enter password"
                    className={`focus:outline-0 flex border-[1px] w-full rounded-lg h-10 pl-5 text-addS focus:border-0 ${passwordError ? 'border-red-500' : 'focus:ring-gradientSecond'}`}
                />
                {passwordError && <p className="col-span-12 pt-3 text-[13px] text-red-500 text-left">{passwordError}</p>}
                <div className="w-full flex justify-end mt-10">
                    <div className='w-full md:w-60'>
                        <SubmitButton loading={loading} buttonText={'Update'} />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
