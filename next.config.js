/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    async rewrites() {
        return [
          {
            source: '/accounts/:slug*',
            destination: 'https://api.enron.network/cosmos/auth/v1beta1/accounts/:slug*'
          },
          {
            source: '/broadcast',
            destination: 'https://api.enron.network/cosmos/tx/v1beta1/txs'
          },
          {
            source: '/rewards/:slug*',
            destination: 'https://api.enron.network/cosmos/distribution/v1beta1/delegators/:slug*/rewards'
          },
        ]
      },
};


// https://api.enron.network/cosmos/auth/v1beta1/accounts/