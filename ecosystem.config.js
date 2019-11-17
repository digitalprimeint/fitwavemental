module.exports = {
    apps: [{
      name: "fitwave-mental",
      script: "./index.js",
      watch: false,
      env: {
        "PLUGDO_GLOBAL_ENV": "prod",
        "PORT": 6263
      }
    }]
  }