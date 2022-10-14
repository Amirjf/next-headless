import Head from 'next/head';
import Script from 'next/script';
import React from 'react';

const srp = () => {
  return (
    <>
      <Script src="https://www.nissansalem.com/content/themes/dh5-child-clean//reactapps/srp/index.srp.js"></Script>
      <div id="root"></div>
    </>
  );
};
export default srp;
