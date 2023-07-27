import { sendRecovery } from '@/lib/services';
import { useState } from 'react';
const sendReset = () => {
    const [email, setEmail] = useState('');
    const handleReset = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        /* signIn(email).then((res)=>{
                console.log(res);
            }) */
        //console.log(login);
        console.log(email);
        sendRecovery(email).then((res) => console.log(res));
    };
    return (
        <form style={{ margin: '10%' }} onSubmit={handleReset}>
            <input
                type="email"
                placeholder="enter email"
                onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
            />
            <br />
            <br />
            <button type="submit">reset password</button>
        </form>
    );
};
export default sendReset;
