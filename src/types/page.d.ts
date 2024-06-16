import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type BasePageProps = {
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: (page: ReactElement) => ReactNode;
};
