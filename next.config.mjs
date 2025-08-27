/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/da',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['aavatto.com'], // 👈 Add this line
  },
};

export default nextConfig;