import Head from 'next/head';
import React from 'react';

const srp = () => {
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://mbmarin.datgate.com/content/themes/dh5-child-clean/reactapps/srp/index.srp.js"
        ></script>
      </Head>
      <div id="root"></div>
    </>
  );
};

export default srp;
