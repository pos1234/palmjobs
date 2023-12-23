import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const { userEmail } = req.body;
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_ID);
    const msg = {
        to: userEmail, // Change to your recipient
        from: process.env.NEXT_PUBLIC_PALM_EMAIL, // Change to your verified sender
        templateId: process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_SALARY_SURVEY,
        dynamic_template_data: {
            findJobUrl: `${process.env.NEXT_PUBLIC_VERIFY}/jobs`
        }
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
            return res.json({ status: true });
        })
        .catch((error: any) => {
            console.error(error);
        });
    return res.json({ status: true });
};

export default handler;
