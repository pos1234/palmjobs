import React from 'react';
import emailjs from '@emailjs/browser';
emailjs.init('QyQ9efsZzemYUKqOu');
export const SendJobPostedEmail = (userEmail: string, jobTitle: string, jobId: string, userName: string) => {
  const formData = {
    userEmail,
    jobTitle,
    jobId
  }
  try {
    fetch(`${process.env.NEXT_PUBLIC_VERIFY}/api/email/posted`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    }).then((res: any) => {
      console.log('sent');

    })
  } catch (err) {
    console.log(err);
  }
  /*  const templateParams = {
    htmlMessage: `
        <div>
          <div style="padding: 12px; border-left: 4px solid #00A82D; margin-bottom: 2rem">
            <p>Greetings from Palm Jobs!</p>
            <p>
              We're excited to let you know that your job listing for the position of ${jobTitle} is now live on our platform. 
              We understand how vital it is to find the right talent, and we're here to make sure that happens.
            </p>
            <p>Here's what you can expect:</p>
            <p>- Quality Candidates: Our platform attracts skilled and dedicated job seekers ready to make an impact.</p>
            <p>- Real-time Updates: Receive instant notifications when a candidate applies to ensure you never miss out.</p>
            <p>- Easy Management: Access your dashboard anytime to manage applications, view profiles, and connect with potential hires.</p>
          </div>
          <div style="display: flex; column-gap: 1rem; flex-wrap: wrap">
            <p>To view or edit your job post.</p>
            <a href="${jobLink}" style="padding: 1rem; width: 7rem; border-radius: 50px; border: none; color: white; background: #00A82D; text-decoration: none; text-align: center">
              View Job
            </a>
          </div>
        </div>
      `,
    toEmail: userEmail,
    to_name: userName,
    emailSubject: 'Your Job Post is Live and Shining!',
    isHTML: true
  };
  emailjs.send('service_b5f7kkq', 'template_5lhc001', templateParams).then(
    function (response) {
      console.log('Email sent successfully!', response.status, response.text); 
    },
    function (error) {
      console.log('Email failed to send!', error);
    }
  ); */
};

/* export const SendJobAppliedEmail = (userEmail: string, jobTitle: string, jobLink: string, userName: string,companyName:string) => {
    const templateParams = {
        htmlMessage: `
        <div>
          <div style="padding: 12px; border-left: 4px solid #00A82D; margin-bottom: 2rem">
            <p>Good day from Palm Jobs!</p>
            <p>
              We're delighted to confirm that your application for the position ${jobTitle} at ${companyName} has been successfully submitted.
            </p>
            <p>What's next?</p>
            <p>- Stay Alert: Keep an eye on your inbox for any communication from the employer.</p>
            <p>- Update & Shine: Ensure your profile is up-to-date with your latest achievements and experiences.</p>
            <p>- Explore More: While you wait feel free to browse other exciting opportunities on our platform.</p>
            <p>Remember, each job application is a step closer to finding where you truly belong. Just like nature, there's a place and purpose for every individual. We're rooting for you!</p>
            <p>Wishing you all the best in your career journey,</p>
            <p>The Palm Jobs Team</p>
            </div>
          <div style="display: flex; column-gap: 1rem; flex-wrap: wrap">
            <a href="${jobLink}" style="padding: 1rem; width: 7rem; border-radius: 50px; border: none; color: white; background: #00A82D; text-decoration: none; text-align: center">
              Find Jobs
            </a>
          </div>
        </div>
      `,
        toEmail: userEmail,
        to_name: userName,
        emailSubject: 'Application Sent! Your Next Adventure Begins...',
        isHTML: true
    };
    emailjs.send('service_b5f7kkq', 'template_5lhc001', templateParams).then(
        function (response) {
            console.log('Email sent successfully!', response.status, response.text);
        },
        function (error) {
            console.log('Email failed to send!', error);
        }
    );
}; */
export const SendJobAppliedEmail = (userEmail: string, jobTitle: string,/*  userName: string, */ companyName: string) => {
  const formData = {
    userEmail,
    jobTitle,
    companyName
  }
  try {
    fetch(`${process.env.NEXT_PUBLIC_VERIFY}/api/email/applied`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    }).then((res: any) => {
      console.log('sent');

    })
  } catch (err) {
    console.log(err);
  }
};
