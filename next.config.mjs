const config = {
    webpack: function (config, { webpack }) {
      Object.assign(config.module, {
        noParse: [/alasql/]
      });
      config.plugins.push(
        new webpack.DefinePlugin({
          'self.__BUILD_TIME__': JSON.stringify(new Date().toISOString())
        })
      );
      return config;
    },
  };
  export default config;