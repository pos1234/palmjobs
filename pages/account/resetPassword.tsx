import { updatePassword } from '@/lib/services';
import { useState } from 'react';
import { NextPageContext } from 'next/types';
interface myQueryParams {
    userId: string;
    secret: string;
}
interface MyPageProps {
    queryParams: myQueryParams;
}
export const getServerSideProps = async (context: NextPageContext) => {
    const { query } = context;
    const queryParams = {
        userId: query.userId as string,
        secret: query.secret as string
    };
    return {
        props: {
            queryParams
        }
    };
};
const sendReset = ({ queryParams }: MyPageProps) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfrimPassword] = useState('');
    const [hide, setHide] = useState(true);
    const handleReset = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        /* signIn(email).then((res)=>{
                console.log(res);
            }) */
        //console.log(login);
        if (password == confirmPassword) {
            console.log('they are equal');
            const userId = queryParams.userId.toString();
            const secret = queryParams.secret.toString();

            updatePassword(userId, secret, password).then((res) => console.log(res));
        } else {
            console.log('they are not equal');
        }
    };
    const changeHide = () => {
        setHide(!hide);
    };
    return (
        <form onSubmit={handleReset}>
            <input
                type={hide ? 'password' : 'text'}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
            />
            <input
                type={hide ? 'password' : 'text'}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setConfrimPassword(e.currentTarget.value)}
            />
            <button type="submit">update password</button>
            <button onClick={changeHide}>{hide ? 'unhide' : 'hide'}</button>
        </form>
    );
};
export default sendReset;
