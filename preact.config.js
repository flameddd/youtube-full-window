export default (config, env, helpers) => {
  const postCSSLoader = helpers.getLoadersByName(config, 'postcss-loader')[1]
  postCSSLoader.loader.options.plugins = [
    require("tailwindcss")("./tailwind.config.js"),
    require("autoprefixer"),
  ].concat(postCSSLoader.loader.options.plugins);
};