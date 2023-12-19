/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['cloud.appwrite.io', 'palmjobs.et', 'palm-delta.vercel.app']
    }
};

module.exports = nextConfig;
