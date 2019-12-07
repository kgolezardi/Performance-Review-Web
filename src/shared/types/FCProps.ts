import { ReactNode } from 'react';

export type FCProps<Props> = Props extends { children: any } ? Props : Props & { children?: ReactNode };
