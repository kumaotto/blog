import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import type { AppProps } from "next/app";
import "../styles/globals.scss";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex-grow'>
        <Header />
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
