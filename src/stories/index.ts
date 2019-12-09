import 'src/_config/install';
import configI18nSelector from './config-i18n-selector';

configI18nSelector('fa');

function importAll(requireContext: __WebpackModuleApi.RequireContext) {
  requireContext.keys().forEach(requireContext);
}

importAll(require.context('src', true, /\.stories\.tsx?$/));
