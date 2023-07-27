import { signIn } from '@/lib/services';
import { useState } from 'react';
const Login = () => {
    const [login, setLogin] = useState({
        email: '',
        password: ''
    });
    const handlelogin = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        // console.log(e.target);
        const sign = signIn(login.email, login.password);
    };
    return (
        <form style={{ margin: '10%' }} onSubmit={handlelogin}>
            <input
                type="email"
                placeholder="email"
                onChange={(e: React.FormEvent<HTMLInputElement>) => setLogin({ ...login, email: e.currentTarget.value })}
            />
            <br />{' '}
            <input
                type="password"
                placeholder="password"
                onChange={(e: React.FormEvent<HTMLInputElement>) => setLogin({ ...login, password: e.currentTarget.value })}
            />
            <br />
            <br /> <button type="submit">sign In</button>
        </form>
    );
};
export default Login;
