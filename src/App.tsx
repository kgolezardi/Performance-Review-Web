import React from 'react';
import { ConfirmProvider } from 'src/shared/confirm-provider';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { GlobalStyles } from 'src/core/styles/GlobalStyles';
import { MDXProvider } from 'src/shared/mdx-provider/MDXProvider';
import { RtlSupportProvider } from 'src/core/rtl/RtlSupportProvider';
import { SnackbarProvider } from 'src/core/snackbar';
import { rtlTheme } from 'src/core/theme';

import { AppRouter } from './AppRouter';
import { RelayEnvironmnetContextProvider } from './relay/RelayEnvironmentContext';

const App: React.FC = () => {
  return (
    <RelayEnvironmnetContextProvider>
      <RtlSupportProvider>
        <ThemeProvider theme={rtlTheme}>
          <GlobalStyles />
          <CssBaseline />
          <SnackbarProvider>
            <ConfirmProvider>
              <MDXProvider>
                <AppRouter />
              </MDXProvider>
            </ConfirmProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </RtlSupportProvider>
    </RelayEnvironmnetContextProvider>
  );
};

export default App;
