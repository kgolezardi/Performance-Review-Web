module.exports = {
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-storysource',
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    '@storybook/addon-backgrounds/register',
    'storybook-addon-selector',
  ],
  stories: ['../src/**/*.stories.[tj](s|sx)'],
};
