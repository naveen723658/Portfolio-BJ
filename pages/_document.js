import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="/css/bootstrap.min.css"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="/css/font-awesome.min.css"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="/css/elegant-icons.css"
          type="text/css"
        />
        {/* <link
          rel="stylesheet"
          href="/css/owl.carousel.min.css"
          type="text/css"
        /> */}
        {/* <link
          rel="stylesheet"
          href="/css/magnific-popup.css"
          type="text/css"
        /> */}
        {/* <link
          rel="stylesheet"
          href="/css/slicknav.min.css"
          type="text/css"
        /> */}
        <link rel="stylesheet" href="/css/style.css" type="text/css" />
      </Head>
      <body>
        <Main />
        <NextScript />

        {/* <script src="/js/jquery-3.3.1.min.js"></script> */}
        <script src="/js/bootstrap.min.js"></script>
        {/* <script src="/js/jquery.magnific-popup.min.js"></script> */}
        {/* <script src="/js/mixitup.min.js"></script> */}
        {/* <script src="/js/masonry.pkgd.min.js"></script> */}
        {/* <script src="/js/jquery.slicknav.js"></script> */}
        {/* <script src="/js/owl.carousel.min.js"></script> */}
        {/* <script src="/js/main.js"></script> */}
      </body>
    </Html>
  );
}
