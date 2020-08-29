const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@Components': path.resolve(__dirname, 'src/common/components'),
      '@Themes': path.resolve(__dirname, 'src/common/themes'),
      '@Assets': path.resolve(__dirname, 'src/common/assets'),
      '@Pages': path.resolve(__dirname, 'src/pages'),
    },
  },
};
