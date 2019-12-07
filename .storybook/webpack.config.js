module.exports = function({ config }) {
  // ad hoc approach to find eslint webpack rule based on value of current value of config
  // maybe break if storybook upgraded
  const eslintRule = config.module.rules.find(rule => {
    return String(rule.test) === String(/\.(js|mjs|jsx|ts|tsx)$/) && rule.enforce === 'pre';
  });

  // fixing eslint webpack rule and disable import/first eslint rule
  const baseConfig = eslintRule.use[0].options.baseConfig;
  baseConfig.rules = baseConfig.rules || {};
  baseConfig.rules['import/first'] = 'off';

  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: { parser: 'typescript' },
      },
    ],
    enforce: 'pre',
  });

  return config;
};
