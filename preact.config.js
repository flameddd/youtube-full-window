export default (config, env, helpers) => {
  const postCSSLoader = helpers.getLoadersByName(config, 'postcss-loader')[1]
  postCSSLoader.loader.options.plugins = [
    require("tailwindcss")("./tailwind.config.js"),
    require("autoprefixer"),
  ].concat(postCSSLoader.loader.options.plugins);

  if (process.env.GITHUB_PAGES) {
    config.output.publicPath = `/${process.env.GITHUB_PAGES}/`;

    const ghEnv = process.env.GITHUB_PAGES
      && JSON.stringify(`${process.env.GITHUB_PAGES}`);

    const { plugin } = helpers.getPluginsByName(config, 'DefinePlugin')[0];
    Object.assign(
      plugin.definitions,
      { ['process.env.GITHUB_PAGES']: ghEnv }
    );
  }

};