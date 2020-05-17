import React from 'react';
import { ConfirmProvider } from 'src/shared/confirm-provider';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { GlobalStyles } from 'src/core/styles/GlobalStyles';
import { MDXProvider } from 'src/shared/mdx-provider/MDXProvider';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { RtlSupportProvider } from 'src/core/rtl/RtlSupportProvider';
import { SnackbarProvider } from 'src/core/snackbar';
import { rtlTheme } from 'src/core/theme';

import { AppRouter } from './AppRouter';
import { environment } from './relay';

const App: React.FC = () => {
  return (
    <RelayEnvironmentProvider environment={environment}>
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
    </RelayEnvironmentProvider>
  );
};

export default App;
