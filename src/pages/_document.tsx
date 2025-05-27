import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/logo.png" />
        {/* or .png/.svg if you’re using those */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
