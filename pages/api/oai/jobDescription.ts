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
                    content: `Imagine you are a seasoned HR professional at a reputable company. Your task is to create a compelling job description for a new position within the organization. Please generate a detailed job description based on the provided information. MAKE SURE that the text is grammatically correct. Please provide the text in HTML using only h2, h3, ul, li, p and b tags. The text must be from 300-500 words and each section must not have more than 7 bullet points. start of by writing a short briefing, then responsibilities and requirements, benefits. Don't include the job title in your response as we include it by default.`
                },
                {
                    role: 'user',
                    content: `${jobTitle ? 'Job title: ' + jobTitle : ''}
                    
                    ${skills ? 'Skills: ' + skills : ''}
                    
                    ${yearsOfExperience ? 'Years of experience: ' + yearsOfExperience + ' years' : ''}`
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
