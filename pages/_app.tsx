import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'

import {
  SaleorAuthProvider,
  useAuthChange,
  useSaleorAuthClient,
} from "@saleor/auth-sdk/react";

import { useAuthenticatedApolloClient } from "@saleor/auth-sdk/react/apollo";

import * as Constant from '@/lib/constant'

export default function App({ Component, pageProps }: AppProps) {
  const saleorAuth = useSaleorAuthClient({
    saleorApiUrl: Constant.SaleorURL,
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  });

  const { apolloClient, reset, refetch } = useAuthenticatedApolloClient({
    url: Constant.SaleorURL,
    fetchWithAuth: saleorAuth.saleorAuthClient.fetchWithAuth,
  });

  useAuthChange({
    onSignedOut: () => reset(),
    onSignedIn: () => refetch(),
  });

  return (
    <SaleorAuthProvider {...saleorAuth}>
      <ApolloProvider client={apolloClient}>
        <main className='flex min-h-screen flex-col items-center justify-between p-24' >
          <Component {...pageProps} />
        </main>
      </ApolloProvider>
    </SaleorAuthProvider>
  )
}
