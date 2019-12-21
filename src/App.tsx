import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { AppRouter } from 'src/AppRouter';
import { RtlSupportProvider } from 'src/core/rtl/RtlSupportProvider';
import { GlobalStyles } from 'src/core/styles/GlobalStyles';
import { rtlTheme } from 'src/core/theme';
import { environment } from 'src/relay';
import { SnackbarProvider } from 'src/core/snackbar';

const App: React.FC = () => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <RtlSupportProvider>
        <ThemeProvider theme={rtlTheme}>
          <GlobalStyles />
          <CssBaseline />
          <SnackbarProvider>
            <AppRouter />
          </SnackbarProvider>
        </ThemeProvider>
      </RtlSupportProvider>
    </RelayEnvironmentProvider>
  );
};

export default App;
