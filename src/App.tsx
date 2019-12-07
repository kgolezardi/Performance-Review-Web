import { i18n } from '@lingui/core';
import React from 'react';
import { RtlSupportProvider } from 'src/core/rtl/RtlSupportProvider';

const App: React.FC = () => {
  return (
    <RtlSupportProvider>
      <div>{i18n._('Performance Review')}</div>
    </RtlSupportProvider>
  );
};

export default App;
