import '@storybook/addon-storysource/register';
import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';
import '@storybook/addon-backgrounds/register';
import { register } from 'storybook-addon-selector/register';

register('Language', 'storybook/language', 'languages', 'Change language', 'globe');
