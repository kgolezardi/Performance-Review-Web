import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { AppRouter } from 'src/AppRouter';
import { RtlSupportProvider } from 'src/core/rtl/RtlSupportProvider';
import { SnackbarProvider } from 'src/core/snackbar';
import { GlobalStyles } from 'src/core/styles/GlobalStyles';
import { rtlTheme } from 'src/core/theme';
import { environment } from 'src/relay';
import { MDXProvider } from 'src/shared/mdx-provider/MDXProvider';

const App: React.FC = () => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <RtlSupportProvider>
        <ThemeProvider theme={rtlTheme}>
          <GlobalStyles />
          <CssBaseline />
          <SnackbarProvider>
            <MDXProvider>
              <AppRouter />
            </MDXProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </RtlSupportProvider>
    </RelayEnvironmentProvider>
  );
};

export default App;
