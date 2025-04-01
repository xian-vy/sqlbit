const config = {
    webpack: function (config) {
      Object.assign(config.module, {
        noParse: [/alasql/]
      });
      config.plugins.push(
        new config.webpack.DefinePlugin({
          'self.__BUILD_TIME__': JSON.stringify(new Date().toISOString())
        })
      );
      return config;
    },
  };
  export default config;