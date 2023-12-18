import { GlobalContextProvider } from '@/contextApi/userData';
import { JobPostContextProvider } from '@/contextApi/jobPostData'
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
                    padding: '5%',
                    borderRadius: '15px'
                }}
            />
            <GlobalContextProvider>
                <JobPostContextProvider>
                    <Component {...pageProps} />
                </JobPostContextProvider>
            </GlobalContextProvider>
        </>
    );
}
