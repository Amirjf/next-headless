import Head from 'next/head';
import Script from 'next/script';
import React from 'react';

const srp = () => {
  return (
    <>
      <Script src="https://nissansalem.datgate.com/content/reactpress/apps/next/srp/index.js"></Script>
      <div id="root"></div>
    </>
  );
};

export default srp;
