import { Register, defineRole, sendEmailVerification } from '@/lib/services';
import { useState } from 'react';
const RegisterUi = () => {
    const [register, setRegister] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });
    const handleRegister = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        const fullName = register.firstName + ' ' + register.lastName;
        // console.log(fullName);

        // console.log(e.target);
        Register(register.email, register.password, fullName)
            .then((res) => {
                console.log(res);
                defineRole(res.$id, 'employer');
            })
            .then(() => sendEmailVerification(register.email, register.password));

        //console.log(login);
    };
    return (
        <form style={{ margin: '5%' }} onSubmit={handleRegister}>
            <p>first Name</p>
            <input
                type="text"
                onChange={(e: React.FormEvent<HTMLInputElement>) => setRegister({ ...register, firstName: e.currentTarget.value })}
            />
            <p>last Name</p>
            <input
                type="text"
                onChange={(e: React.FormEvent<HTMLInputElement>) => setRegister({ ...register, lastName: e.currentTarget.value })}
            />
            <p>email</p>
            <input
                type="email"
                onChange={(e: React.FormEvent<HTMLInputElement>) => setRegister({ ...register, email: e.currentTarget.value })}
            />
            <p>password</p>
            <input
                type="password"
                onChange={(e: React.FormEvent<HTMLInputElement>) => setRegister({ ...register, password: e.currentTarget.value })}
            />
            <br />
            <button type="submit">register</button>
        </form>
    );
};
export default RegisterUi;
