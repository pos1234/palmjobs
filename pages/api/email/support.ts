import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const { toEmail, fromEmail, subject, fullName, email, phone, message } = req.body;
    const messageSent = `FullName: ${fullName} \r\n
                    Email:${email}\r\n
                    Phone:${phone}\r\n
                    AdditionalMessage:${message}\r\n
                    `;
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_ID);
    const msg = {
        to: toEmail, // Change to your recipient
        from: fromEmail, // Change to your verified sender
        subject: subject,
        text: 'and easy to do anywhere, even with Node.js',
        html: messageSent.replace(/\r\n/g, '<br>')
    };
    sgMail
        .send(msg)
        .then(() => {
            return res.json({ status: true });
        })
        .catch((error: any) => {
            console.error(error);
        });
};

export default handler;
