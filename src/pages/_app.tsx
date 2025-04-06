import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import MainLayout from "@/components/MainLayout"; 

export default function App({ Component, pageProps }: AppProps) {
  let title = pageProps.title? pageProps.title : "My Platform";
  let description = pageProps.description
    ? pageProps.description 
    : "My Platfrom Description";
    let image = pageProps.image ? pageProps.image : "https://my-domain/meta.svg";
    let url = pageProps.url ? pageProps.url : "https://my-domain.com";
  return (
    <>
    <Head>
        <title>{title}</title> {}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
        />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta property="og:type" content="article" />
        <meta property="fb:app_id" content="fb-id" /> {}

        {/* SEO for WEB */}
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="url" content={url} />
        <meta name="image" content={image} />
        <meta name="image:secure" content={image} />

        {/* SEO for Facebook */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta property="og:image:secure" content={image} />

        {/* SEO for Twitter */}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:image:secure" content={image} />
       </Head>

      <MainLayout name={Component.displayName}>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
}

