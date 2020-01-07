module.exports = {
  chainWebpack: config => {
    config
      .plugin(`html`)
      .tap(args => {
        args[0].title = `US Population Over Time`;
        return args;
      });
  }
};