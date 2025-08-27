/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',        // when someone visits "/"
        destination: '/da', // redirect them to "/da"
        permanent: true,    // true = 308 redirect, false = 307 redirect
      },
    ]
  },
};

export default nextConfig;
