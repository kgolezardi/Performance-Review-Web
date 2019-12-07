import { i18n } from '@lingui/core';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import React from 'react';
import { RtlSupportProvider } from 'src/core/rtl/RtlSupportProvider';
import { rtlTheme } from 'src/core/theme/themes';
import { GlobalStyles } from 'src/core/styles/GlobalStyles';

const App: React.FC = () => {
  return (
    <RtlSupportProvider>
      <ThemeProvider theme={rtlTheme}>
        <GlobalStyles />
        <CssBaseline />
        <div>{i18n._('Performance Review')}</div>
      </ThemeProvider>
    </RtlSupportProvider>
  );
};

export default App;
