import React, { useContext } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { usePrinting } from 'src/shared/utils/usePrinting';

export type PrintingContextType = boolean;

export const PrintingContext = React.createContext<PrintingContextType>(false);

export function usePrintingContext(): PrintingContextType {
  return useContext(PrintingContext);
}

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function PrintingContextProvider(props: Props) {
  const printing = usePrinting();

  return <PrintingContext.Provider value={printing}>{props.children}</PrintingContext.Provider>;
}
