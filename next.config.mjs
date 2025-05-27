/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/ask',
  //       destination: 'http://35.220.240.126:8092/ask',
  //     }
  //   ]
  // }

};

export default nextConfig;
