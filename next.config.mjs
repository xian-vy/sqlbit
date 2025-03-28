const config = {
    webpack: function (config) {
      Object.assign(config.module, {
        noParse: [/alasql/]
      });
      return config;
    },
  };
  export default config;