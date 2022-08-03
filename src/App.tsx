import { i18n } from '@lingui/core';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { RtlSupportProvider } from 'src/core/rtl/RtlSupportProvider';
import { SnackbarProvider } from 'src/core/snackbar';
import { GlobalStyles } from 'src/core/styles/GlobalStyles';
import { rtlTheme } from 'src/core/theme';
import { ConfirmProvider } from 'src/shared/confirm-provider';
import { MDXProvider } from 'src/shared/mdx-provider/MDXProvider';
import { AppRouter } from './AppRouter';
import { environment } from './relay';

const App: React.FC = () => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <HelmetProvider>
        <RtlSupportProvider>
          <ThemeProvider theme={rtlTheme}>
            <GlobalStyles />
            <CssBaseline />
            <SnackbarProvider>
              <ConfirmProvider>
                <MDXProvider>
                  <Helmet
                    defaultTitle={i18n._('Performance Review')}
                    titleTemplate={i18n._('%s - Performance Review')}
                  />
                  <AppRouter />
                </MDXProvider>
              </ConfirmProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </RtlSupportProvider>
      </HelmetProvider>
    </RelayEnvironmentProvider>
  );
};

export default App;
