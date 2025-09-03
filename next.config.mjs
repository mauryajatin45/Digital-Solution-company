/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['aavatto.com'],
    remotePatterns: [new URL('https://thumbs.dreamstime.com/b/digital-marketing-media-website-ad-email-social-network-seo-digital-marketing-media-website-ad-email-social-network-seo-video-124276305.jpg')],
  },
};

export default nextConfig;