module.exports = {
  apps: [
    {
      name: "survey",
      script: "./server.js",
      env: {
        PORT: 8001,
        NODE_ENV: "production",
      },
    },
  ],
};
