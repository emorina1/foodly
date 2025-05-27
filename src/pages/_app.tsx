import "../styles/globals.css"; // fixed relative path
import type { AppProps } from "next/app";
import Head from "next/head";
import { MainLayout } from "../components/MainLayout"; // adjust if needed

export default function App({ Component, pageProps }: AppProps) {
  const title = pageProps.title || "Cake Shop";
  const description = pageProps.description || "My Platform Description";
  const image = pageProps.image || "https://my-domain.com/meta.svg";
  const url = pageProps.url || "https://my-domain.com";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta name="description" content={description} />
        <meta name="image" content={image} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:url" content={url} />
      </Head>

      <MainLayout name={Component.displayName || title}>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
}
