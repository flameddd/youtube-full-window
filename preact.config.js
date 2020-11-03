// tailwindcss purgecss
const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: [
    './src/**/*.html',
    './src/**/*.jsx',
    './src/**/*.js',
  ],

  // This is the function used to extract class names from your templates
  defaultExtractor: content => {
    // Capture as liberally as possible, including things like `h-(screen-1.5)`
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []

    // Capture classes within other delimiters like .block(class="w-1/2") in Pug
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []

    return broadMatches.concat(innerMatches)
  }
})


export default (config, env, helpers) => {
  config.node.process = true // fix "process is not defined"

  const postCSSLoader = helpers.getLoadersByName(config, 'postcss-loader')[1]
  postCSSLoader.loader.options.plugins = [
    require("tailwindcss")("./tailwind.config.js"),
    require("autoprefixer"),
    ...process.env.NODE_ENV === 'production'
      ? [purgecss]
      : []
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