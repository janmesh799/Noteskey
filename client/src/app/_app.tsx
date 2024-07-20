// pages/_app.tsx
import React from "react";
import { AppProps } from "next/app";
import ReduxProvider from "@/components/ReduxProvider/ReduxProvider";
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ReduxProvider>
      <Component {...pageProps} />
    </ReduxProvider>
  );
};

export default MyApp;
