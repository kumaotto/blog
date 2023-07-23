import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import type { AppProps } from "next/app";
import "../styles/globals.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as gtag from 'libs/gtag'

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.page_view(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

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
