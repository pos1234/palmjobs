// This code is for v4 of the openai package: npmjs.com/package/openai
import openai from '@/lib/openai';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function jobDescription(req: NextApiRequest, res: NextApiResponse) {
    const jobTitle = req.query.j;
    const skills = req.query.s;
    const yearsOfExperience = req.query.y;

    // Check if the request is coming from the correct domain
    if (!process?.env?.APP_BASE_DOMAIN || !req?.headers?.host?.endsWith(process?.env?.APP_BASE_DOMAIN)) {
        res.status(400).json({ error: 'Invalid domain' });
        return;
    }

    if (!jobTitle || typeof jobTitle !== 'string' || !skills || typeof skills !== 'string') {
        res.status(400).json({ error: 'Missing job title or skills' });
        return;
    }
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: `As an expert in HR, could you please generate a comprehensive job description based on the following criteria? Use HTML tags such as h2 for Briefing, h3 for Responsibilities, Qualifications, and Benefits, as well as ul and li for bullet points. Keep the word count between 300-500 words and limit each section to no more than 7 bullet points.

- Start with a Briefing section enclosed in <h2> tags.
- Follow with a Responsibilities section. Use <h3> tags for the section title and <ul> and <li> tags for bullet points.
- Next, include a Qualifications section using <h3> tags for the section title and <ul> and <li> tags for bullet points. Make sure to incorporate industry-specific keywords.


Exclude the job title; it will be added automatically. Ensure all text is grammatically correct.
`
                },
                {
                    role: 'user',
                    content: `${jobTitle ? 'Job title: ' + jobTitle : ''}
                    
                    ${skills ? 'Skills: ' + skills : ''}
                    
                    ${yearsOfExperience ? 'Years of experience: ' + yearsOfExperience : ''}`
                }
            ],
            temperature: 0,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });
        res.status(200).json({ content: response?.choices?.[0]?.message?.content });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to process your request.' });
    }
}
