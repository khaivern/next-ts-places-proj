/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_USER: 'user',
    MONGO_PASS: 1234,
    MONGO_CLUSTER: 'cluster0',
    MONGO_DATABASE: 'optional-project'
  },
  images: {
    domains: ['picsum.photos']
  }
}

module.exports = nextConfig
