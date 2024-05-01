module.exports = {
  apps: [
    {
      name: "kmc-be",
      script: "build/index.js",
      env: {
        NODE_ENV: "stage",
      },
      env_file: "./.env",
    },
  ],
};