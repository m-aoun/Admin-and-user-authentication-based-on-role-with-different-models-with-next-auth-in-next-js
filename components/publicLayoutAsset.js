import Head from 'next/head';
import Script from 'next/script';

const PublicLayoutAsset = () => {
  return (
    <>
      {/* jQuery and Plugins */}
      <Script src="/assets/js/jquery.js" strategy="beforeInteractive" />
      <Script src="/assets/js/popper.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/bootstrap.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/owl.js" strategy="beforeInteractive" />
      <Script src="/assets/js/wow.js" strategy="beforeInteractive" />
      <Script src="/assets/js/validation.js" strategy="beforeInteractive" />
      <Script src="/assets/js/jquery.fancybox.js" strategy="beforeInteractive" />
      <Script src="/assets/js/appear.js" strategy="beforeInteractive" />
      <Script src="/assets/js/scrollbar.js" strategy="beforeInteractive" />
      <Script src="/assets/js/jquery.nice-select.min.js" strategy="beforeInteractive" />

      {/* Main JS */}
      <Script src="/assets/js/script.js" strategy="beforeInteractive" />
    </>
  );
};

export default PublicLayoutAsset;
