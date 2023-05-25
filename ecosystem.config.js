module.exports = {
  apps: [
    {
      name: "frontend",
      script: "node_modules/react-scripts/scripts/start.js",
      cwd: "./frontend",
      args: "",
      watch: ".",
      interpreter: "none",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
