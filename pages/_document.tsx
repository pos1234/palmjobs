import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <title>Palm Jobs: Job Search and Employment Opportunities in Ethiopia | NGO, International Companies, and More</title>
            <meta
                name="description"
                content="Discover a myriad of job listings and employment opportunities in Ethiopia on Palm Jobs. Whether you're seeking careers in NGO sectors, vacancies at Safaricom Ethiopia, or exploring other recruitment possibilities, our extensive job search engine simplifies your journey towards landig the ideal job. Browse jobs, submit your resume, and step into a world of endless career possibilities today."
            />
            <meta
                name="keywords"
                content="job search engine, jobs, job listings, jobs in ethiopia, employment opportunity, safaricom ethiopia vacancy, NGO jobs, online job sites,resumes, salaries, simple hire,job search, indeed, jobs,search engine for jobs, search jobs, career, employment, work, find jobs, rss job feed xml"
            />
            {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" /> */}
            <body>
                <div id="portal-root"></div>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
