module.exports = {
  async headers() {
    return [
      {
        // Set cookies to be sent in cross-site requests
        source: '/(.*)',
        headers: [
          {
            key: 'Set-Cookie',
            value: 'cookie_name=value; SameSite=None; Secure',
          },
        ],
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [`@svgr/webpack`],
    });

    return config;
  },
  env: {
    API_URL: process.env.API_URL,
  },
};
