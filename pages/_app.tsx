/* import { UserProvider } from '@/lib/context';
 */ import { GlobalContextProvider } from '@/contextApi/userData';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
                toastStyle={{
                    /* height: '60px',
                    width: '250px', */ // default width for desktop
                    padding: '5%',
                    borderRadius: '15px'
                }}
            />
            <GlobalContextProvider>
                <Component {...pageProps} />
            </GlobalContextProvider>
        </>
    );
}
